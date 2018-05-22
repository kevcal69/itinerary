<template>
    <div class="page">
        <Hero />
        <section class="first-content">
            <TopDestination />
        </section>
        <section class="second-content">
            <FeaturedItirenary :itirenaries="mostFavoritesItineraries" :hideHeader="false"/>
        </section>
        <section class="third-content">
            <HowItWorks />
        </section>
        <section class="fourth-content">
            <TheSponsors />
        </section>
        <section class="fifth-content">
            <TheTestimonial :testimonials="testimonials"/>
        </section>
    </div>
</template>

<script>
import firebase from 'firebase'
import testimonials from '../fixtures/testimonials.json'

var dbref

export default {
    name: 'HomePage',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            testimonials: testimonials
        }
    },
    components: {
        Hero: require('./the-hero').default,
        TopDestination: require('./the-topdestination').default,
        FeaturedItirenary: require('./the-featureditirenary').default,
        HowItWorks: require('./the-howitworks').default,
        TheSponsors: require('./the-sponsors').default,
        TheTestimonial: require('./the-testimonials').default
    },
    computed: {
        mostFavoritesItineraries () {
            return this.mostFavorites.map((obj) => {
                return {
                    id: obj['.key'],
                    description: obj.description,
                    title: obj.title,
                    favCount: obj.favCount,
                    imgsrc: obj.backgroundPhoto,
                    countryState: obj.countryState,
                    favorites: obj.favorites ? obj.favorites.length : 0
                }
            })
        }
    },
    firebase () {
        return {
            mostFavorites: {
                source: dbref.ref('itinerary/publish/').orderByChild('favcount').limitToFirst(6)
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        dbref = firebase.database()
        next()
    }
}
</script>

<style>
.page {
    z-index: 1;
}
.first-content {
    display: flex;
    justify-content: center;
    margin-top: -140px;
    z-index: 2;
    position: relative;
}
.text-hightlight {
    color: #e74c3c;
}
.second-content {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    z-index: 2;
    position: relative;
}
.third-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;
}
</style>
