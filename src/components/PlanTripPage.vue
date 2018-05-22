<template>
    <div>
        <header v-bind:style="{ 'background-image': 'url(' + backgroundPhoto + ')' }">
            <div class="overlay"></div>
            <h2 class="top-layer">
               <div v-contenteditable:countryState="true"></div>
            </h2>
            <h1 class="top-layer">
                <div v-contenteditable:title="true"></div>
            </h1>
            <h3 class="top-layer">
                <div v-contenteditable:description="true"></div>
            </h3>
            <div class="add-cover-photo top-layer">
                <FileUpload
                        ref="upload-photo" @input="uploadPhoto"
                        :extensions="['jpg', 'gif', 'png', 'webp']"
                        >
                    Add a Cover Photo
                </FileUpload>

            </div>
        </header>
        <main>
            <transition name="fade">
            <div class="travel-period flex-center-col" v-if="addCalendar">
                <h3>Add Travel Period</h3>
                <div class="dates">
                    <div class="form-control">
                        <label>NUMBER OF DAYS</label>
                        <div class="form-field">
                            <input type="number" min="1"
                                v-model="daysnumber" name="" class="field number-days"
                                @change="fromdatechanged"/>
                            <span class="error" v-show="false">Error</span>
                        </div>
                    </div>
                    <div class="form-control">
                        <label>SELECT DATES</label>
                        <div class="form-group">
                            <div class="form-field date-form-field">
                                <datepicker
                                    input-class="field date-field" v-model="fromDate"
                                    format="M/dd/yy" @input="fromdatechanged"></datepicker>
                            </div>
                            <label>to</label>
                            <div class="form-field date-form-field date-to-disable">
                                <datepicker
                                    input-class="field date-field" v-model="toDate"
                                    format="M/dd/yy" @input="todatechanged"></datepicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-activity">
                    <button @click="add_activity">Add Activity</button>
                </div>
            </div>
            <div class="content" v-else>
                <TheDayActivity v-for="(activity, index) in actvities"
                    :key="activity.id" :visible="dateCursor == activity.id"
                    v-model="actvities[index]" @next="changeDays(1)" @prev="changeDays(-1)"/>
            </div>
            </transition>
        </main>
        <footer v-if="!addCalendar">
            <div class="footer-container">
                <button class="save-as-draft">SAVE AS DRAFT</button>
                <button class="publish-itirenary" @click="saveItinerary">PUBLISH ITINERARY</button>
                <div class="cancel">CANCEL</div>
            </div>
        </footer>
    </div>
</template>
<script>
import firebase from 'firebase'
import GUID from '../utilities/guid'
import { mapState } from 'vuex'

var storageRef
var dbref

export default {
    name: 'plantrip',
    data () {
        return {
            countryState: 'ADD COUNTRY OR STATE',
            title: 'Add an itinerary title',
            description: 'Describe your itinerary. Make it inviting, catchy and unique!',
            fromDate: '',
            backgroundPhoto: '',
            toDate: '',
            daysnumber: 1,
            dateCursor: 0,
            addCalendar: true,
            actvities: [{
                id: 0, actvities: []
            }]
        }
    },
    components: {
        datepicker: require('vuejs-datepicker'),
        FileUpload: require('vue-upload-component'),
        TheDayActivity: require('./the-dayactivities.vue').default
    },
    methods: {
        fromdatechanged () {
            var today = new Date(this.fromDate)
            var tomorrow = new Date(this.fromDate)
            tomorrow.setDate(today.getDate() + parseInt(this.daysnumber))
            this.toDate = tomorrow.toString()

            var olday = this.actvities.length
            var newday = this.daysnumber
            if (olday < newday) {
                for (let i = olday; i < newday; i++) {
                    this.actvities.push({id: i, actvities: []})
                }
            } else {
                this.actvities.splice(newday)
            }
        },
        todatechanged () {
            var today = new Date(this.toDate)
            var beforedate = new Date()
            beforedate.setDate(today.getDate() - this.daysnumber)
            this.toDate = beforedate.toString()
        },
        add_activity () {
            this.addCalendar = false
        },
        changeDays (value) {
            var cursor = this.dateCursor + value
            if (cursor < 0 || cursor === parseInt(this.daysnumber)) {
                return
            }
            this.dateCursor = cursor
        },
        uploadPhoto (value) {
            var file = value[0].file
            var filename = GUID()
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            }
            var vm = this
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('itirenary/images/' + filename).put(file, metadata)

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                function (error) {
                    console.log(error)
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    console.log(uploadTask.snapshot.downloadURL)
                    vm.backgroundPhoto = uploadTask.snapshot.downloadURL
                })
        },
        saveItinerary () {
            var data = {
                title: this.title,
                countryState: this.countryState,
                description: this.description,
                backgroundPhoto: this.backgroundPhoto,
                daysNumber: this.daysnumber,
                dayactvities: this.actvities,
                fromDate: this.fromDate,
                toDate: this.toDate,
                owneruid: this.user.uid
            }
            // var requiredFields = ['backgroundPhoto', 'title']
            var requiredFields = {
                'backgroundPhoto': 'Cover Photo',
                'title': 'Title',
                'countryState': 'Country/State is required'
            }
            var canSubmit = true
            Object.keys(requiredFields).forEach(fields => {
                if (!data[fields]) {
                    canSubmit = false
                    this.$toasted.show(`${requiredFields[fields]} is required`, {
                        position: 'top-right',
                        duration: 2000
                    })
                }
            })
            var actvitiesRequiredFields = {
                'title': 'Title',
                'location': 'Location',
                'start_time': 'Start Time',
                'end_time': 'End Time',
                'budget': 'Budget'
            }
            data.dayactvities.forEach((obj, i) => {
                let actvities = obj.actvities
                actvities.forEach((act, j) => {
                    Object.keys(actvitiesRequiredFields).forEach(fields => {
                        if (!act[fields] && canSubmit) {
                            canSubmit = false
                            this.$toasted.show(`${actvitiesRequiredFields[fields]} for Day ${i + 1}(activity ${j + 1}) is required`, {
                                position: 'top-right',
                                duration: 2000
                            })
                        }
                    })
                })
                if (actvities.length === 0) {
                    this.$toasted.show(`Please fill your activities`, {
                        position: 'top-right',
                        duration: 2000
                    })
                    canSubmit = false
                }
            })
            if (!canSubmit) {
                return
            }
            this.$modal.show('dialog', {
                title: 'Confirm!',
                text: 'You are publishing your itirenary. Is everything correct? Click YES to submit',
                buttons: [{
                    title: 'Close'
                },
                {
                    title: 'YES',
                    handler: () => {
                        let itirenary = dbref.ref('itinerary/publish').push(data, () => {
                            this.$modal.hide('dialog')
                            this.$router.push({
                                name: 'plantripdetailpage',
                                params: {id: itirenary.key}
                            })
                        })
                    }
                }]
            })
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created () {
        var today = new Date()
        var tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        this.fromDate = today.toString()
        this.toDate = tomorrow.toString()
        this.daysnumber = 1

        storageRef = firebase.storage().ref()
        dbref = firebase.database()
    }
}
</script>
<style scoped>
header {
    height: 577px;
    position: relative;
    background-color: #838383;
    border: solid 1px #979797;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #d1d1d1;
    position: relative;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
header .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, .4);
    top: 0;
    left: 0;
}
header h1 {
    height: 55px;
    min-width: 343px;
    font-family: Georgia;
    font-size: 48px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0, .2)
}
header h2 {
    height: 27px;
    min-width: 343px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 5px;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0, .2)
}
header h1 div, header h2 div, header h3 div {
    outline: none;
}
header h3 {
    height: 27px;
    min-width: 343px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0, .2)
}
header .top-layer {
    z-index: 3;
}
.add-cover-photo {
    position: absolute;
    bottom: 30px;
    right: 2%;
    font-family: Avenir;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-cover-photo:before {
    width: 48px;
    height: 48px;
    content: url(../assets/Icons/add_cover_photo_img.png);
    background-size: 100% 100%;
    margin-right: 40px;
}
main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-height: 850px;
}
.content {
    margin-top: 100px;
}
.travel-period {
    height: 300px;
}
.travel-period h3 {
    height: 41px;
    font-family: Georgia;
    font-size: 36px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.travel-period h3:before {
    width: 56px;
    height: 56px;
    content: url(../assets/Icons/calendar_icon.png);
    background-size: 100% 100%;
    margin-right: 40px;
}
.dates {
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.form-group label {
    width: 12px;
    height: 16px;
    font-family: Avenir;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #c1c1c1;
    margin: 0px 10px;
}
.date-form-field {
    .width: 100%;
    display: flex;
    position: relative;
    margin: 0px 5px;
    font-family: Avenir;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
.date-form-field:after {
    content: ' ';
    background-image: url(../assets/Icons/calendar_icon.png);
    width: 14px;
    height: 14px;
    background-size: 100% 100%;
    position: absolute;
    right: 15px;
    opacity: .9;
}
.number-days {
    width: 109px;
    margin-right: 58px;
    text-align: center;
}
.date-to-disable {
    /*pointer-events: none;*/
}
.add-activity {
    margin-top: 20px;
    max-width: 680px;
    width: 100%;
}
.add-activity button {
    width: 100%;
    height: 48px;
    background-color: #ff9c2e;
    border: solid 1px #ff9c2e;
    color: #fff;
    font-size: 14px;
    margin-bottom: 20px;
}
footer {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer-container {
    max-width: 680px;
    width: 100%;
}
footer .save-as-draft{
    width: 179px;
    height: 48px;
    border: solid 2px #ff9c2e;
    color: #ff9c2e;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin-right: 20px;
}
footer .publish-itirenary{
    width: 179px;
    height: 48px;
    border: solid 2px #ff9c2e;
    background-color: #ff9c2e;
    color: #fff;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin-right: 20px;
}
footer .cancel {
    height: 48px;
    width: 179px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: Avenir;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #9e9e9e;
}
</style>
