<template>
    <div class="container">
        <header v-if="hideHeader == false">
            <h2>Featured itinenaries</h2>
            <h3>We keep a virtual diary of your trips for you to share and reminisce.</h3>
        </header>
        <div class="content">
            <div class="card" v-for="itirenary in itirenaries" :key="itirenary.id">
                <featuredcard class="items"
                    :imgsrc="itirenary.imgsrc"
                    :id="itirenary.id"
                    :countryState="itirenary.countryState"
                    :title="itirenary.title"
                    :description="itirenary.description"
                    :favCount="itirenary.favCount"
                    :user="itirenary.user"
                    :key="itirenary.id"/>
            </div>
        </div>
    </div>
</template>

<script>
// import itirenaries from '../fixtures/itirenaries.json'
export default {
    name: 'the-topdestination',
    props: ['itirenaries', 'hideHeader'],
    // data () {
    //     return {
    //         itirenaries: itirenaries
    //     }
    // },
    components: {
        featuredcard: require('./the-featuredcard.vue').default
    }
}
</script>

<style scoped>
.container {
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
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
    margin: 20px 10px;
    min-width: 367px;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
}
footer {
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
