<template>
    <div class="container" ref="detailPage">
        <header v-bind:style="{ 'background-image': 'url(' + itinerary.backgroundPhoto + ')' }">
            <div class="overlay">
            </div>
            <div class="actions">
                <div class="action" @click="bookmark">
                    <img src="../assets/Icons/bookmark.png">
                </div>
                <div class="action" @click="favorite">
                    <img src="../assets/Icons/like.png">
                </div>
                <div class="action share" @mouseover="showDropDown=true" @mouseleave="showDropDown=false">
                    <img src="../assets/Icons/share.png">
                    <div class="dropdown-action" v-show="showDropDown">
                        <div class="dropdown-item" @click="copyClipboard">Copy Link</div>
                        <div class="dropdown-item" @click="downloadpdf">Download as PDF</div>
                        <div class="dropdown-item">
                            <social-sharing :url="url"
                                :title="itinerary.title"
                                :description="itinerary.description"
                                hashtags="itirenary"
                                inline-template>
                                <network network="email">
                                    Send a copy to email
                                </network>
                            </social-sharing>
                        </div>
                        <div class="dropdown-item" @click="showSocialShare">Share on social media</div>
                    </div>
                </div>
            </div>
            <h2 class="top-layer">
               {{ itinerary.countryState }}
            </h2>
            <h1 class="top-layer">
                {{ itinerary.title }}
            </h1>
            <h3 class="top-layer">
                {{ itinerary.description }}
            </h3>
            <div class="user">
                <div class="avatar" v-bind:style="{ 'background-image': 'url(' + owner.avatar_url + ')' }"></div>
                <div class="info">
                    <div class="name">{{ owner.name }}</div>
                    <div class="rank">{{ owner.rank }}</div>
                </div>
            </div>
        </header>
        <main>
            <div class="timeline">
                <h1>Itinerary Overview</h1>
                <h2>We keep a virtual diary of your trips for you to share and reminisce.</h2>
            </div>
            <ActivityTimeline :activity="itinerary" />
            <PageContent :activities="itinerary" />
        </main>
        <footer>
            <h3>Comments</h3>
            <CommentSection :id="id"/>
        </footer>
        <modal name="social-share"
            width="300px"
            height="200px"
            >
            <social-sharing :url="url"
                          :title="itinerary.title"
                          :description="itinerary.description"
                          hashtags="itirenary"
                          inline-template>
                <div class="sharecontainer">
                    <network network="facebook">
                        <i class="fa fa-facebook"></i> Facebook
                    </network>
                    <network network="googleplus">
                        <i class="fa fa-google-plus"></i> Google +
                    </network>
                    <network network="twitter">
                        <i class="fa fa-twitter"></i> Twitter
                    </network>
                </div>
            </social-sharing>
        </modal>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'
import * as JSPDF from 'jspdf'
var domtoimage = require('dom-to-image')

var dbref

export default {
    name: 'plan-trip-detail-page',
    props: ['id'],
    components: {
        ActivityTimeline: require('./PlanTripDetailsTimeline.vue').default,
        PageContent: require('./PlanTripDetailPageContent.vue').default,
        CommentSection: require('./PlanTripDetailPageCommentSection').default
    },
    data () {
        return {
            owner: {
                avatar_url: 'https://picsum.photos/400/320',
                name: 'Dua Lipa',
                rank: 2
            },
            showDropDown: false,
            activity: {}
        }
    },
    computed: {
        ...mapState(['user']),
        url () {
            return window.location.href
        },
        owneruuid () {
            return this.itinerary.owneruid
        }
    },
    methods: {
        copyClipboard () {
            window.Clipboard.copy(window.location.href)
        },
        showSocialShare () {
            this.$modal.show('social-share')
        },
        downloadpdf () {
            this.showDropDown = false
            setTimeout(() => {
                domtoimage.toPng(this.$refs.detailPage)
                    .then(function (dataUrl) {
                        var i = new Image()
                        i.onload = function () {
                            var doc = new JSPDF('', 'mm', [i.width, i.height])
                            doc.addImage(dataUrl, 'JPEG', 0, 0, i.width, i.height)
                            doc.save('itinerary.pdf')
                        }
                        i.src = dataUrl
                    })
            }, 1000)
        },
        favorite () {
            this.$store.dispatch('FAVORITE', this.id)
        },
        bookmark () {
            dbref.ref('profile/' + this.user.uid + '/bookmark').set({
                [this.id]: true
            })
        }
    },
    firebase () {
        let vm = this
        return {
            itinerary: {
                source: dbref.ref('itinerary/publish/' + this.id),
                asObject: true,
                readyCallback (data) {
                    if (!data.exists()) {
                        vm.$router.push('/')
                    } else {
                        vm.activity = data.val()
                    }
                    vm.$bindAsObject(
                        'owner',
                        dbref.ref('profile/' + this.owneruuid),
                        null,
                        (userSnapshot) => {
                            let user = userSnapshot.val()
                            if (userSnapshot.exists()) {
                                vm.owner = {
                                    avatar_url: user.avatar,
                                    name: user.displayName,
                                    rank: user.status
                                }
                            }
                        })
                }
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        dbref = firebase.database()
        next()
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    margin-top: -64px;
    display: flex;
    background-color: #fff;
    align-items: center;
    flex-direction: column;
}
header {
    width: 100%;
    height: 677px;
    position: relative;
    border: solid 1px #979797;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    position: relative;
    background-color: #838383;
    -webkit-background-size: cover;
   -moz-background-size: cover;
   -o-background-size: cover;
   background-size: cover;
}
header .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, .4);
    top: 0;
    left: 0;
}
header h1 {
    height: 55px;
    min-width: 343px;
    font-family: Georgia;
    font-size: 48px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
header h2 {
    height: 27px;
    min-width: 343px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 5px;
    text-align: center;
}
header h1 div, header h2 div, header h3 div {
    outline: none;
}
header h3 {
    height: 27px;
    min-width: 343px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin-bottom: 70px;
}
header .top-layer {
    z-index: 3;
}
.user {
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
}
.avatar {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px 20px;
}
.name {
    min-width: 139px;
    height: 25px;
    font-family: Avenir;
    font-weight: 600px;
    letter-spacing: 1px;
    color: #f39c12;
    font-size: 18px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.rank {
    font-family: Avenir;
    font-size: 13px;
    font-weight: 100;
    width: 173px;
    height: 19px;
    opacity: .8;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.actions {
    position: absolute;
    top: 100px;
    right: calc(20px + 5%);
    font-family: Avenir;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    display: flex;
    align-items: center;
}
.actions .action {
    position: relative;
}
.actions img {
    width: 28px;
    height: 28px;
    margin-right: 28px;
}
.actions .action .dropdown-action{
    width: 200px;
    background-color: #fff;
    position: absolute;
    top: 42px;
    right: 10px;
    z-index: 3;
}
.actions .action .dropdown-action::after {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    content: ' ';
    border-bottom: 7px solid #fff;
    position: absolute;
    top: -7px;
    right: 20px;
}
.actions .action .dropdown-action .dropdown-item {
    height: 36px;
    font-family: Avenir;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: normal;
    text-align: left;
    color: #353b48;
    padding-left: 25px;
    box-shadow: 0 1px 1px 0 #f5f5f5;
    cursor: pointer;
}
.actions .action .dropdown-action .dropdown-item:hover {
    background-color: #ecf0f1;
}
main {
    width: 70%;
    max-width: 100%;
    padding: 100px;
    background-color: #fff;
}
main .timeline {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
main .timeline h1 {
    height: 36px;
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin: 5px 0px;
}
main .timeline h2 {
    height: 24px;
    width: 100%;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 300 !important;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin: 5px 0px;
}
footer {
    width: 940px;
    max-width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
footer h3 {
    font-family: Avenir;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.sharecontainer {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
</style>
