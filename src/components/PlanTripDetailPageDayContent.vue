<template>
    <div>
        <header class="header-day">Day {{ dayNum }} - {{ dayDate }}</header>
        <main>
            <template v-for="(activity, i) in myActivities" >
                <section :key="i+'section-day1' + day">
                    <img :src="activity.firstImage" v-if="activity.firstImage">
                </section>
                <section class="content" :key="i+'section-day2' + day">
                    <div class="title">
                        {{ activity.title }}
                    </div>
                    <div class="time-budget">
                        {{ activity.start }} to {{ activity.end }} <span class="dot">.</span> ${{ activity.budget }}
                    </div>
                    <div class="location" @click="showGMaps($event, i)">
                        {{ activity.place }}
                    </div>
                    <div>
                        <p class="description">
                            {{ activity.description }}
                        </p>
                    </div>
                </section>
                <section class="content" :key="i+'section-day2.2' + day" v-show="activity.transpo">
                    <div class="title">
                        How to get there
                    </div>
                    <div>
                        <p class="description">
                            {{ activity.transpo }}
                        </p>
                    </div>
                </section>
                <section :key="i+'section-day3' + day">
                    <img v-for="(img, i) in activity.otherImages" :src="img" :key="i+'imgs'" />
                </section>
                <modal :name="'google-maps-dayloc' + dayNum + i"
                    width="700px"
                    height="600px"
                    :key="i+'section-day4' + day">
                    <GoogleMaps :name="'google-maps-dayloc' + dayNum + i"
                        :lat="activity.location.lat"
                        :lng="activity.location.lng"
                        :place="activity.place"/>
                </modal>
            </template>
        </main>
    </div>
</template>

<script>
var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
]
export default {
    name: 'plan-trip-details-day-content',
    props: ['activities', 'day', 'date'],
    components: {
        GoogleMaps: require('./the-googlemaps.vue').default
    },
    data () {
        return {
            myActivities: this.activities
        }
    },
    computed: {
        dayNum () {
            return this.day + 1
        },
        dayDate () {
            let d = new Date(this.date)
            d.setDate(d.getDate() + this.day)
            var day = d.getDate()
            var monthIndex = d.getMonth()
            var year = d.getFullYear()

            return monthNames[monthIndex] + ' ' + day + ', ' + year
        }
    },
    methods: {
        showGMaps (e, index) {
            let modalname = `google-maps-dayloc${this.dayNum}${index}`
            this.$modal.show(modalname)
        }
    },
    mounted () {
        this.myActivities = this.myActivities.map((act) => {
            var obj = Object.assign({}, act)
            if (obj.photo) {
                obj.firstImage = obj.photo.shift()
                obj.otherImages = obj.photo
            }
            return obj
        })
    }
}
</script>

<style scoped>
.header-day {
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: 50px 0px;
}
img {
    width: 100%;
    margin: 10px 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .7);
}
.title {
    font-family: Avenir;
    font-size: 28px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    height: 42px;
    letter-spacing: normal;
}
.description {
    font-size: 16px;
    font-weight: 500;
    line-height: 3.13;
}
.content {
    margin: 50px 0px;
}
.time-budget {
    font-size: 18px;
    font-weight: 300;
    line-height: 1;
    color: #f39c12;
    margin: 0px;
    margin-bottom: 10px;
}
.location {
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
    line-height: 1;
    margin: 0px;
    color: #95a5a6;
}
.dot {
    margin: 0px;
    font-size: 48px;
    line-height: 10px;
}
</style>
