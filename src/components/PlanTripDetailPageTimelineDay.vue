<template>
    <div class="container">
        <div class="activity" v-for="(activity, index) in myActivities" :key="index + day + 'act-index'">
            <div class="date">
                <span v-show="index==0">
                    {{ activity.dateFormatted }}
                </span>
            </div>
            <div class="timeline">
                <div class="circle">
                </div>
                <div class="line" v-show="!hideLine"></div>
            </div>
            <div class="content">
                <h2>{{ activity.title }}</h2>
                <h3>{{ activity.start }} to {{ activity.end }}</h3>
                <h4>{{ activity.address }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'plan-trip-details-timeline-day',
    props: ['activities', 'day', 'hideLine'],
    data () {
        return {
            myActivities: this.activities
        }
    },
    created () {
        let locations = this.myActivities.map(obj => {
            return new Promise((resolve, reject) => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.location.lat},${obj.location.lng}&key=AIzaSyDegpbgUabQfFtQFippXNIm6mR4uZuXxx4`)
                    .then(resolve)
            })
        })
        Promise.all(locations).then((response) => {
            this.myActivities = this.myActivities.map((obj, index) => {
                return Object.assign({}, {address: response[index].data.results[0].formatted_address}, obj)
            })
        })
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}
.date {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 300;
    display: flex;
    justify-content: flex-end;
    width: 100px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
.activity {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 120px;
}
.timeline {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
}
.timeline .circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ff9c2e;
    border: solid 5px #ddebf1;
}
.timeline .line {
    width: 3px;
    height: 100%;
    border: solid 2px #ddebf1;
}
.content h2 {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    margin: 0px;
}
.content h3 {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #e74c3c;
    margin: 5px;
}
.content h4 {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    margin: 5px;
}
</style>
