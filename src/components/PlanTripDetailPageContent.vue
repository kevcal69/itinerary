<template>
    <div>
        <DayContent v-for="(act, index) in timeline" :activities="act"
            :date="activities.fromDate" :day="index" :key="index+'DayContent'"/>
    </div>
</template>

<script>
export default {
    name: 'plan-trip-details-content',
    props: ['activities'],
    components: {
        DayContent: require('./PlanTripDetailPageDayContent.vue').default
    },
    computed: {
        timeline () {
            if (!this.activities.dayactvities) return []
            let days = this.activities.dayactvities
            let a = days.map((day) => {
                return day.actvities.map((act) => {
                    return {
                        title: act.title,
                        location: act.location,
                        start: act.start_time + (act.start_isam ? 'AM' : 'PM'),
                        end: act.end_time + (act.end_isam ? 'AM' : 'PM'),
                        photo: act.photos,
                        description: act.description,
                        budget: act.budget,
                        place: act.place,
                        transpo: act.transpo
                    }
                })
            })
            return a
        }
    }
}
</script>
