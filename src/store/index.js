import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
var provider = new firebase.auth.FacebookAuthProvider()
provider.setCustomParameters({
    'display': 'popup'
})

export default new Vuex.Store({
    state: {
        user: null
    },
    strict: debug,
    getters: {
        user__fullname (state) {
            return state.user != null && state.user.displayName
        },
        user__firstName (state) {
            return state.user != null && state.user.displayName.split(' ')[0]
        },
        isAuthenticated (state) {
            return state.user != null
        }
    },
    mutations: {
        SET_USER (state, user) {
            state.user = {
                displayName: user.displayName || 'No Name',
                avatarUrl: user.photoURL,
                'uid': user.uid
            }
        },
        UNSET_USER (state) {
            state.user = null
        },
        SET_PROVIDER (state, provider) {
            state.login_method = provider
        },
        SET_NAME (state, name) {
            Vue.set(state.user, 'displayName', name)
        }
    },
    actions: {
        SIGNOUT ({ commit }) {
            firebase.auth().signOut()
                .then(_ => {
                    window.location.reload()
                })
        },
        async CREATE_USER ({ commit }, user) {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((firebaseuser) => {
                    firebaseuser.updateProfile({
                        displayName: user.fname
                    }).then(_ => {
                        commit('SET_NAME', user.fname)
                        var dbref = firebase.database()
                        dbref.ref('profile/').push({
                            [user.uid]: {
                                follows: [],
                                status: 'New User',
                                following: [],
                                tag: ''
                            }})
                    })
                })
        },
        async FB_SIGNIN () {
            await firebase.auth().signInWithRedirect(provider)
        },
        async LOGIN_USER ({ commit }, { email, password }) {
            await firebase.auth()
                .signInWithEmailAndPassword(email, password)
        },
        USER_FOUND (context, user) {
            var dbref = firebase.database()
            var profile = dbref.ref('profile/' + user.uid)
            profile.once('value', function (snapshot) {
                if (!snapshot.exists()) {
                    dbref.ref('profile/').set({
                        [user.uid]: {
                            avatar: user.photoURL,
                            displayName: user.displayName,
                            email: user.email,
                            follows: [],
                            status: 'New User',
                            following: [],
                            tag: ''
                        }})
                } else {
                    var info = snapshot.val()
                    context.commit('SET_USER', {
                        'photoURL': info.avatar,
                        'displayName': info.displayName,
                        'email': info.email,
                        'status': info.status,
                        'uid': user.uid
                    })
                }
            })
        },
        FAVORITE ({commit, state}, uuid) {
            var dbref = firebase.database()
            var itinerary = dbref.ref('itinerary/publish/' + uuid)
            let uid = state.user.uid
            itinerary.transaction(function (iter) {
                if (iter) {
                    if (!iter.favorites) {
                        iter.favorites = {}
                    }
                    iter.favorites[uid] = state.user.displayName
                    iter['favCount'] = Object.keys(iter.favorites).length
                }
                return iter
            })
        }
    }
})
