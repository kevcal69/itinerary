<template>
    <div class="container">
        <header>
            <div class="info">
                <div class="follows">Followed by {{followedBy}}</div>
                <div class="name">{{ profile.displayName }}</div>
                <div class="tag">@{{ profile.username }}</div>
                <div class="status">
                    {{ profile.status }}
                </div>
                <div class="following-status">
                    {{ followers }} Followers {{ following }} Following
                </div>
                <div class="actions">
                    <div class="follow" @click="followUser" v-if="!isMyProfile">
                        FOLLOW
                    </div>
                    <div class="follow" @click="editprofile" v-if="isMyProfile">
                        EDIT PROFILE
                    </div>
                </div>

            </div>
            <div class="avatar" v-bind:style="{ 'background-image': 'url(' + profile.avatar + ')' }">
            </div>
        </header>
        <main>
            <h2>Top Itineraries</h2>
            <div class="content">
                <ItirenaryCard class="items" v-for="itirenary in itirenaries"
                    :imgsrc="itirenary.imgsrc"
                    :id="itirenary.id"
                    :countryState="itirenary.countryState"
                    :title="itirenary.title"
                    :description="itirenary.description"
                    :user="itirenary.user"
                    :key="itirenary.id"/>
            </div>
        </main>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

var dbref

export default {
    name: 'profile-detail-page',
    props: ['id'],
    components: {
        ItirenaryCard: require('./the-featuredcard.vue').default
    },
    computed: {
        ...mapState(['user']),
        itirenaries () {
            return this.itinerary.map((obj) => {
                return {
                    id: obj['.key'],
                    description: obj.description,
                    title: obj.title,
                    imgsrc: obj.backgroundPhoto,
                    countryState: obj.countryState,
                    favorites: obj.favorites ? obj.favorites.length : 0
                }
            })
        },
        followers () {
            return this.profile.followers ? Object.keys(this.profile.followers).length : 0
        },
        following () {
            return this.profile.following ? Object.keys(this.profile.following).length : 0
        },
        followedBy () {
            if (this.followers === 0) {
                return 'None'
            }

            return Object.keys(this.profile.followers)
                .slice(0, 2)
                .map(obj => this.profile.followers[obj])
                .join(', ')
        },
        isMyProfile () {
            return this.user.uid === this.id
        }

    },
    methods: {
        followUser () {
            if (this.isMyProfile) {
                return
            }
            this.$firebaseRefs.profile.child('followers').set({
                [this.user.uid]: this.user.displayName
            })
            dbref.ref('profile/' + this.user.uid + '/following').set({
                [this.user.uid]: this.user.displayName
            })
        },
        editprofile () {
            this.$router.push({name: 'editprofile', params: {id: this.id}})
        }
    },
    firebase () {
        return {
            itinerary: {
                source: dbref.ref('itinerary/publish/').orderByChild('owneruid').equalTo(this.id),
                anArray: true
            },
            profile: {
                source: dbref.ref('profile/' + this.id),
                asObject: true
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        dbref = firebase.database()
        let id = to.params.id
        dbref.ref('profile/' + id).once('value')
            .then((snapshot) => {
                var val = snapshot.val()
                if (val) {
                    next()
                } else {
                    next(false)
                }
            })
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0px;
    justify-content: center;
    border: 1px solid black;
}
header {
    width: 100%;
    max-width: 780px;
    height: 450px;
    display: flex;
}
header .info {
    width: 80%;
    height: 100%;
    margin: 0px;
}
header .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: solid 10px #ddebf1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.follows {
    font-family: Avenir;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    margin: 10px 0px;
    color: rgba(0, 0, 0, .5);
}
.name {
    font-family: Georgia;
    font-size: 40px;
    width: 480px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: 10px 0px;
}
.tag {
    font-family: Avenir;
    font-size: 16px;
    font-weight: 900;
    font-style: oblique;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: normal;
    margin: 10px 0px;
    color: #f39c12;
}
.status {
    font-family: Avenir;
    font-size: 20px;
    width: 421px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    margin: 10px 0px 60px 0px;
}
.following-status {
    font-family: Avenir;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    margin: 10px 0px;
}
.follow {
    width: 124px;
    height: 48px;
    background-color: #ddebf1;
    border: solid 1.5px #ddebf1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Avenir;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
main {
    width: 100%;
    max-width: 780px;
    display: flex;
    flex-direction: column;
}
.items {
    margin: 50px 0px;
}
main h2 {
    font-family: Georgia;
    font-size: 28px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.07;
    letter-spacing: normal;
    text-align: left;
}
</style>
