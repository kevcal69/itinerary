// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted'
import SocialSharing from 'vue-social-sharing'
import contenteditableDirective from 'vue-contenteditable-directive'
import App from './App'
import router from './router'
import store from './store'
import clipboard from './utilities/clipboard'

Vue.config.productionTip = false

// Initialize Firebase
// to be move on a specific config file
var config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
}
Vue.use(VModal, { dialog: true })
Vue.use(contenteditableDirective)
Vue.use(VueFire)
Vue.use(Toasted)
Vue.use(SocialSharing)

let app
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        store.commit('SET_USER', user)
        store.dispatch('USER_FOUND', user)
        store.commit('SET_PROVIDER', user.providerData[0].providerId)
    } else if (!user && store.getters.isAuthenticated) {
        // store.commit('UNSET_USER')
        store.dispatch('SIGNOUT', user)
    }
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            clipboard,
            components: { App },
            template: '<App/>'
        })
    }
})
