<template>
    <div>
    <header class='header' v-bind:class="{ 'background-header': showbgheader}">
        <router-link to="/">
            <div id="logo">
                <img src="../assets/logo_hero.png">
            </div>
        </router-link>
        <div class="nav" v-if="isAuthenticated != true">
           <div class="item" @click="visibleSignUp = true">Sign Up</div>
           <div class="item" @click="visibleLogin = true">Log In</div>
        </div>
        <div class="nav" v-if="isAuthenticated">
            <div class="item">
                <router-link to="/">
                    Home
                </router-link>
            </div>
            <div class="item">
                <router-link :to="{name: 'explore'}">
                    Explore Itineraries
                </router-link>
            </div>
            <div class="item">
                <router-link :to="{name: 'plantrip'}">
                    Create your itinerary
                </router-link>
            </div>
            <div class="item">
                <router-link :to="{name: 'faqs'}">
                    FAQs
                </router-link>
            </div>
            <div class="item">
                <router-link :to="{name: 'contactus'}">
                    Contact Us
                </router-link>
            </div>
            <div class="item user-item" ref="dropdownTrigger" @click="dropdown=true" @blur="dropdown=false">
               <div class="avatar_url" v-bind:style="{ 'background-image': 'url(' + user.avatarUrl + ')' }"></div>
               <div class="name">Hi, {{ user__firstName }}</div>
               <div class="dropdown-trigger"></div>
               <div class="dropdown" v-show="dropdown">
                    <div @click="toProfile">
                        Profile
                    </div>
                   <div @click="signout()">Logout</div>
               </div>
            </div>
        </div>
    </header>
    <loginpopup :visible="visibleLogin" @popupclose="visibleLogin = false" />
    <signuppopup :visible="visibleSignUp" @popupclose="visibleSignUp = false" />
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'the-header',
    data () {
        return {
            visibleLogin: false,
            visibleSignUp: false,
            dropdown: false
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user__firstName']),
        ...mapState(['user']),
        showbgheader () {
            return ['homepage', 'plantripdetailpage'].indexOf(this.$route.name) < 0
        },
        currentUrl () {
            return this.$route.name
        }
    },
    methods: {
        toProfile () {
            this.dropdown = false
            this.$router.push({name: 'profile', params: {id: this.user.uid}})
        },
        signout () {
            this.$store.dispatch('SIGNOUT')
        },
        documentClick (e) {
            let el = this.$refs.dropdownTrigger
            let target = e.target

            if (el && el !== target && !el.contains(target)) {
                this.dropdown = false
            }
        }
    },
    components: {
        loginpopup: require('./the-login.vue').default,
        signuppopup: require('./the-signup.vue').default
    },
    created () {
        document.addEventListener('click', this.documentClick)
    },
    destroyed () {
        document.removeEventListener('click', this.documentClick)
    }

}
</script>

<style scoped>
.header {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    color: #fff;
    background-color: rgba(0, 0, 0, .1);
}
.background-header {
    background-color: #0d2e3e;
}
.nav {
    font-family: Avenir;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    padding-top: 10px;
    padding-right: 20px;
    max-width: 80%;
    width: 900px;
}
img {
    height: 32px;
}
.item {
    min-width: 50px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-start;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    align-items: left;
}
.item a {
    text-decoration: none;
    color: #fff;
    text-align: left;
}
.user-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    position: relative;
}
.user-item div {
    margin-right: 8px;
}
.dropdown {
    position: absolute;
    bottom: -70px;
    left: 0;
    color: rgba(0, 0, 0, .5);
    border-radius: 2px;
    background-color: #fff;
    width: 100%;
}
.dropdown div {
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding-left: 15px;
}
.dropdown div a {
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
}
.dropdown div:hover {
    color: rgba(0, 0, 0, .8);
    background-color: rgba(0, 0, 0, .2);
}
.avatar_url {
    width: 28px;
    height: 28px;
    border: solid 1.5px rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.dropdown-trigger {
    background-image: url('../assets/Icons/next.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: 12px;
    height: 12px;
    transform: rotate(-270deg);
}
.router-link-exact-active {
    color: #f0932b !important;
}
#logo img {
    width: 60px;
    height: 26px;
}
</style>
