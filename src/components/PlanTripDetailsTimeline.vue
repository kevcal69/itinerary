<template>
    <div class="timeline-container">
        <TimelineDay v-for="(activities, index) in timelinedata"
            :activities="activities" :day="index"
            :key="index + 'timelineday'" :hideLine="lastIndexTimelineData == index" />
    </div>
</template>

<script>
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default {
    name: 'plan-trip-details-timeline',
    props: ['activity'],
    components: {
        TimelineDay: require('./PlanTripDetailPageTimelineDay.vue').default
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            myActivity: this.activity
        }
    },
    computed: {
        timelinedata () {
            if (!this.activity.dayactvities) return []
            let days = this.activity.dayactvities
            console.log(this.activity)
            let startDate = new Date(this.activity.fromDate)
            let a = days.map((day) => {
                return day.actvities.map((act) => {
                    let newDate = new Date(startDate)
                    newDate.setDate(newDate.getDate() + day.id)
                    return {
                        title: act.title,
                        dateFormatted: months[newDate.getMonth()] + ' ' + newDate.getDate(),
                        location: act.location,
                        start: act.start_time + (act.start_isam ? ' AM ' : ' PM '),
                        end: act.end_time + (act.end_isam ? ' AM ' : ' PM ')
                    }
                })
            })
            return a
        },
        lastIndexTimelineData () {
            return this.timelinedata.length - 1
        }
    }
}
</script>

<style scoped>
.timeline-container {
    margin-top: 60px;
}
</style>
