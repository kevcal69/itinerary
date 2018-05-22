<template>
    <div class="container">
        <header class="header">
            <h1 class="h1">Explore Itineraries</h1>
            <h3 class="h3">We keep a virtual diary of your trips for you to share and reminisce</h3>

            <div class="searchbar">
                <input type="" name="" placeholder="Where do you want to go?" class="search-input"/>
                <button class="search-button" ref="filterbtn" @click="showFilters=!showFilters"><img src="../assets/Icons/filter.png" height="16px" width="16px">Filter</button>
                <div class="filters" ref="filterRef" v-show="showFilters">
                    <div class="filter-headers">
                        <div class="filter-header-items">Seasons</div>
                        <div class="filter-header-items">Length of Stay</div>
                    </div>
                    <div class="filter-items">
                        <div class="filter-item">
                            <select>
                                <option>Summer</option>
                                <option>Fall</option>
                                <option>Winter</option>
                                <option>Spring</option>
                            </select>
                        </div>
                        <div class="filter-item">
                            <select>
                                <option>1 day</option>
                                <option>1-5 days</option>
                                <option>1-7 days</option>
                                <option>More than 7 days</option>
                            </select>
                        </div>
                    </div>
                    <div class="filter-headers">
                        <div class="filter-header-items">Destinations</div>
                    </div>
                    <div class="filter-items">
                        <div class="filter-item">
                            <input type="checkbox" name="" id="destination-1"/>
                            <label for="destination-1">Africa</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="2"/>
                            <label for="destination-2">Australia/Oceana</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="3"/>
                            <label for="destination-3">Antartica</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="4"/>
                            <label for="destination-4">Europe</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="5"/>
                            <label for="destination-5">Asia</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="6"/>
                            <label for="destination-6">Americas</label>
                        </div>
                    </div>
                    <div class="filter-headers">
                        <div class="filter-header-items">Activities</div>
                    </div>
                    <div class="filter-items">
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-1"/>
                            <label for="activities-1">Adventure and Outdoors</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-2"/>
                            <label for="activities-2">Rest and Relaxation</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-3"/>
                            <label for="activities-3">Arts and Culture</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-4"/>
                            <label for="activities-4">Romantic</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-5"/>
                            <label for="activities-5">Family Friend</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-6"/>
                            <label for="activities-6">Shopping</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-7"/>
                            <label for="activities-7">Food Crawling</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-8"/>
                            <label for="activities-8">Sight Seeing</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-9"/>
                            <label for="activities-9">Nightlife</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-10"/>
                            <label for="activities-10">Sports</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" name="" id="activities-11"/>
                            <label for="activities-11">Religion and Spirituality</label>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div>
                <h3 class="h3">Most Favorited</h3>
                <MostFavorited
                    :itirenaries="mostFavoritesItineraries"
                    :hideHeader="true"/>
            </div>

        </main>
    </div>
</template>
<script>
import firebase from 'firebase'

var dbref

export default {
    name: 'explore-itinerary',
    components: {
        MostFavorited: require('./the-featureditirenary.vue').default
    },
    data () {
        return {
            showFilters: false
        }
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
    methods: {
        documentClick (e) {
            let el = this.$refs.filterbtn
            let flref = this.$refs.filterRef
            let target = e.target
            if ((el !== target && !el.contains(target)) &&
                    (flref !== target && !flref.contains(target))) {
                this.showFilters = false
            }
        }
    },
    firebase () {
        return {
            mostFavorites: {
                source: dbref.ref('itinerary/publish/').orderByChild('favcount').limitToFirst(6)
            }
        }
    },
    created () {
        document.addEventListener('click', this.documentClick)
    },
    destroyed () {
        document.removeEventListener('click', this.documentClick)
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
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.header {
    height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
}
.h1 {
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
.h3 {
    margin: 5px 0px;
    font-family: 'Avenir';
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
.searchbar {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    position: relative;
}
.search-input {
    max-width: 512px;
    width: 70%;
    height: 48px;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    outline: none;
    font-size: 13px;
    padding: 5px 20px;
}
.search-button {
    width: 164px;
    max-width: 30%;
    height: 48px;
    outline: none;
    border: none;
    color: rgba(0, 0, 0, .8);
    border: solid 1px #d6d6d6;
    border-left: none;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-button img {
    transform: rotate(90deg);
    margin: 0px 5px;
}
.filters {
    z-index: 2;
    width: 432px;
    height: 506px;
    background-color: #fff;
    position: absolute;
    padding-left: 20px;
    top: 50px;
    left: 50%;
    box-shadow: 2px 2px 4px 0 #c8c8c880;
    padding-top: 50px;
}
.filter-headers {
    height: 20px;
    line-height: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.filter-headers {
    height: 20px;
    line-height: 20px;
    width: 100%;
    margin: 20px 0px 5px 0px;
    display: flex;
    justify-content: space-around;
}
.filter-header-items:only-child {
    margin-right: auto;
    margin-left: 20px;
}
.filter-header-items {
    line-height: 20px;
    width: 180px;
    height: 100%;
    font-family: Avenir;
    font-size: 12px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.filter-items {
    margin: 5px 0px;
    min-height: 20px;
    line-height: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.filter-item {
    line-height: 50px;
    width: 180px ;
    min-height: 30px;
    font-family: Avenir;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    display: flex;
    align-items: center;
}
.filter-item select {
    width: 108px;
    height: 36px;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    outline: none;
}
.filter-item:nth-last-child(1):nth-child(odd) {
    margin-right: auto;
    margin-left: 16px;
}
.filter-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
}
.filter-item label {
    color: rgba(0, 0, 0, .8);
    font-family: Avenir;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
main {
    z-index: 1;
}
main .h3 {
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
</style>
