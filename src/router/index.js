import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import HomePage from '@/components/HomePage'
import PlanTrip from '@/components/PlanTripPage'
import PlanTripDetailPage from '@/components/PlanTripDetailPage'
import ProfileDetailPage from '@/components/ProfileDetailPage'
import ProfileEditDetailPage from '@/components/ProfileEditDetailPage'
import FAQsPage from '@/components/FAQsPage'
import TermsOfUsePage from '@/components/TermsOfUse'
import PrivacyPolicyPage from '@/components/PrivacyPolicy'
import ContactUsPage from '@/components/ContactUsPage'
import ExplorePage from '@/components/ExploreItineraries'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/plan-your-trip',
            name: 'plantrip',
            component: PlanTrip,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/itirenary-detail-page/:id',
            name: 'plantripdetailpage',
            component: PlanTripDetailPage,
            props: true,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: ProfileDetailPage,
            props: true,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/edit-profile/:id',
            name: 'editprofile',
            component: ProfileEditDetailPage,
            props: true,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/explore',
            name: 'explore',
            component: ExplorePage,
            props: true,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/faqs',
            name: 'faqs',
            component: FAQsPage
        },
        {
            path: '/termsofuse',
            name: 'termsofuse',
            component: TermsOfUsePage
        },
        {
            path: '/privcypolicy',
            name: 'privacypolicy',
            component: PrivacyPolicyPage
        },
        {
            path: '/contactus',
            name: 'contactus',
            component: ContactUsPage
        }
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let authRequired = to.matched.some(record => record.meta.authRequired)
    if (authRequired && !currentUser) next('/')
    else next()
})

export default router
