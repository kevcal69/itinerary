<template>
    <div class="container">
        <header>
            <h2>Top destinations to visit</h2>
            <h3>We help you plan the best getaway trip</h3>
        </header>
        <div class="content">
            <div class="card" v-for="trip in trips" :key="trip.id">
                <destinationcard
                    :imgsrc="trip.img"
                    :place="trip.place"
                    :description="trip.description"/>
            </div>
            <footer>
                <button>DISCOVER MORE</button>
            </footer>
        </div>
    </div>
</template>

<script>
import destination from '../fixtures/trips.json'
export default {
    name: 'the-topdestination',
    data () {
        return {
            trips: destination
        }
    },
    components: {
        destinationcard: require('./the-destinationcard.vue').default
    }
}
</script>

<style scoped>
.container {
    width: 940px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(200, 200, 200, 0.5);
}
header {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h2 {
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
}
h3 {
    font-family: Avenir;
    font-size: 20px;
    font-weight: 300;
}
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.card {
    margin: 20px 20px;
}
footer {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
footer button {
    width: 164px;
    height: 48px;
    background-color: #ff9c2e;
    color: white;
    font-family: Avenir;
    font-size: 14px;
}
</style>
