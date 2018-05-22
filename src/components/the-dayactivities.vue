<template>
    <div class="container" v-show="isVisible">
        <header>
            <div class="title">
                Day {{ daynumber }}
            </div>
            <div class="nav-arrows flex-center-row">
                <span class="arrow arrow-left" v-on:click="$emit('prev')"></span>
                <span>{{ daynumber }}</span>
                <span class="arrow arrow-right" v-on:click="$emit('next')"></span>
            </div>
        </header>
        <main>
            <div class="activity" v-for="(activity, index) in data" :key="daynumber-index">
                <div class="form">
                    <div class="form-control">
                        <label>TITLE</label>
                        <div class="form-field">
                            <input type="text" v-model="activity.title" class="field" placeholder="Add a title" />
                            <span class="error" v-show="false">Error</span>
                        </div>
                    </div>
                    <div class="form-control">
                        <label>LOCATION</label>
                        <div class="form-field">
                            <GoogleMaps :name="'gmaps-' +index+daynumber" @updatelocation="getAddressData($event, index)" :key="'gmaps-' +index+daynumber"/>
                            <!-- <input type="text" name="" class="field" placeholder="Search for the location" /> -->
                            <span class="error" v-show="false">Error</span>
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Activities</label>
                        <div class="form-field">
                            <select class="field" v-model="activity.activity_type">
                                <option value="Outdoor">Outdoor</option>
                                <option value="Indoor">Indoor</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-control ">
                        <label>TIME</label>
                        <div class="form-group flex-center-row">
                            <div class="form-field time-field">
                                <input type="text" v-model="activity.start_time" class="field time" placeholder="Start time" />
                                <div class="meridiem flex-center-row">
                                    <span v-bind:style="{ color: activity.start_isam ? '#fff' : 'rgba(0, 0, 0, .23)'}" @click="activity.start_isam = true">AM</span>
                                    <span v-bind:style="{ color: !activity.start_isam ? '#fff' : 'rgba(255, 255, 255, .53)'}" @click="activity.start_isam = false">PM</span>
                                </div>
                            </div>
                            <div class="form-field time-field">
                                <input type="text" v-model="activity.end_time" class="field time" placeholder="End time" />
                                <div class="meridiem flex-center-row">
                                    <span v-bind:style="{ color: activity.end_isam ? '#fff' : 'rgba(0, 0, 0, .23)'}" @click="activity.end_isam = true">AM</span>
                                    <span v-bind:style="{ color: !activity.end_isam ? '#fff' : 'rgba(255, 255, 255, .53)'}" @click="activity.end_isam = false">PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Budget</label>
                        <div class="form-field budget-field">
                            <div class="meridiem flex-center-row">
                                <span>USD</span>
                            </div>
                            <input type="text" v-model="activity.budget" class="field budget" placeholder="0.00" />
                        </div>
                    </div>
                    <div class="form-control">
                        <label>DESCRIPTION</label>
                        <div class="form-field">
                            <textarea class="field" v-model="activity.description" placeholder="Narrate your experience of the place" ></textarea>
                            <span class="error" v-show="false">Error</span>
                        </div>
                    </div>
                    <div class="form-control">
                        <label>PHOTOS</label>
                        <div class="form-field">
                            <FileUpload @imageupload="updateValue($event, index)"
                                :progress="activity.progress" :uploading="activity.uploading"
                                />
                            <span class="error" v-show="false">Error</span>
                        </div>
                        <div class="photo-container">
                            <img v-for="(photo, i) in activity.photos" :src="photo" :key="'img' + i + index + daynumber">
                        </div>
                    </div>
                    <div class="form-control">
                        <label>HOW TO GET THERE</label>
                        <div class="form-field">
                            <textarea class="field" v-model="activity.transpo" placeholder="You can describe the mode of transportation you took, how long you travelled, the landmarks around the area of fellow travellers." ></textarea>
                            <span class="error" v-show="false">Error</span>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </main>
        <footer>
            <div class="add-activity">
                <button @click="add_activity" v-bind:class="{ buttonadd: cant_add_activity }">Add Activity</button>
            </div>
        </footer>
    </div>
</template>

<script>
import GUID from '../utilities/guid'
import firebase from 'firebase'

var storageRef

export default {
    name: 'thedayactivities',
    props: ['value', 'visible'],
    components: {
        FileUpload: require('./the-fileupload').default,
        GoogleMaps: require('./the-googlemaps-search').default
    },
    data () {
        return {
            day: 1,
            data: [{
                title: '',
                location: '',
                start_time: '',
                end_time: '',
                budget: '',
                place: '',
                activity_type: 'Outdoor',
                description: '',
                photos: [],
                uploading: false,
                start_isam: true,
                end_isam: true,
                transpo: '',
                notes: '',
                progress: 0
            }],
            files: [],
            cant_add_activity: true,
            isVisible: true
        }
    },
    computed: {
        daynumber () {
            return this.value.id + 1
        }
    },
    methods: {
        inputFilter (newFile, oldFile, prevent) {
            if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                return prevent()
            }
        },
        updateValue (file, index) {
            var filename = GUID()
            var metadata = {
                contentType: 'image/jpeg'
            }
            var vm = this
            var uploadTask = storageRef.child('itirenary/images/' + filename).put(file, metadata)
            vm.data = vm.data.map((obj, i) => {
                var newObj = Object.assign({}, obj)
                if (index === i) {
                    newObj.uploading = true
                }
                return newObj
            })
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    vm.data = vm.data.map((obj, i) => {
                        var newObj = Object.assign({}, obj)
                        if (index === i) {
                            newObj.progress = progress
                        }
                        return newObj
                    })
                },
                function (error) {
                    console.log(error)
                },
                function () {
                    vm.data = vm.data.map((obj, i) => {
                        var newObj = Object.assign({}, obj)
                        if (index === i) {
                            newObj.progress = 0
                            newObj.photos.push(uploadTask.snapshot.downloadURL)
                            newObj.uploading = false
                        }
                        return newObj
                    })
                })
        },
        add_activity () {
            if (this.cant_add_activity) return
            this.data.push({
                title: '',
                location: '',
                start_time: '',
                end_time: '',
                activity_type: 'Outdoor',
                budget: '',
                place: '',
                uploading: false,
                start_isam: true,
                end_isam: true,
                description: '',
                photos: [],
                transpo: '',
                notes: '',
                progress: 0
            })
            this.cant_add_activity = true
        },
        getAddressData (data, index) {
            data = JSON.stringify(data).replace('undefined', '')
            this.data = this.data.map((obj, i) => {
                var newObj = Object.assign({}, obj)
                if (index === i) {
                    let mdata = JSON.parse(data)
                    newObj.location = {lat: mdata.lat, lng: mdata.lng}
                    newObj.place = mdata.place
                }
                return newObj
            })
        }
    },
    watch: {
        data: {
            handler (val) {
                if (val[val.length - 1].transpo.length > 0) {
                    this.cant_add_activity = false
                } else {
                    this.cant_add_activity = true
                }

                var vdata = {
                    id: this.value.id, actvities: val
                }

                this.$emit('input', vdata)
            },
            deep: true
        },
        visible (val) {
            this.isVisible = val
        }
    },
    created () {
        storageRef = firebase.storage().ref()
    },
    mounted () {
        this.isVisible = this.visible
    }
}
</script>

<style scoped>
.container {
    width: 680px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
header {
    display: flex;
    justify-content: space-between;
}
.title {
    width: 100px;
    height: 36px;
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    position: relative;
}
.title:after {
    width: 20px;
    height: 20px;
    content: ' ';
    right: -40px;
    top: 8px;
    background-image: url(../assets/Icons/edit.png);
    background-size: 100% 100%;
    position: absolute;
}
.nav-arrows {
    width: 150px;
    height: 27px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
.arrow {
    background-image: url('../assets/Icons/arrow.png');
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 100% 100%;
    margin: 0px 20px;
}
.arrow-left {
    transform: rotate(360deg) scaleX(-1);
}
main {
    padding: 20px 0px;
}
.form-control {
    margin-top: 20px;
}
.form-field {
    width: 100%;

}
.form-field .field {
    width: 100%;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    height: 48px;
    padding-left: 20px !important;
    font-size: 12px;
}

.time-field {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 218px;
    margin-right: 25px;
}
.budget-field {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 450px;
    margin-right: 25px;
}
.time {
    width: 113px !important;
}
.budget {
    width: 347px !important;
}
.meridiem {
    color: #fff;
    width: 105px;
    height: 48px;
    background-color: #ff9c2e;
    border: solid 1px #ff9c2e;
    justify-content: space-evenly !important;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 200;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
.form-field textarea {
    padding-top: 20px !important;
    height: 183px !important;
    resize: none;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
.form-field .file-upload {
    width: 100%;
    height: 183px !important;
    background-color: #ffffff;
    border: dashed 1px #d6d6d6;
    font-family: Avenir;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #9e9e9e;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.uploading {
    pointer-events: none;
    background: rgba(0,0,0,.1) !important;
    color: #2980b9 !important;
}
.photo-container {
    display: flex;
    justify-content: flex-start;
    height: 100px;
}
.photo-container img {
    width: 70px;
    height: 70px;
    transition: height .2s, width .2s;
    margin-right: 20px;
}
.photo-container img:hover {
    width: 90px;
    height: 90px;
}
.transpo {
    width: 100%;
}
.add-transpo {
    font-family: Avenir;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #ff9c2e;

}
.transpo-btn {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
}
.transpo-btn button {
    color: #8e8e8e;
    width: 94px;
    height: 48px;
    border-radius: 2px;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    margin-right: 20px;
}
.transpo-btn button.active {
    background-color: #ff9c2e;
    color: #fff;
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
.buttonadd {
    background-color: #838383 !important;
    border: solid 1px #838383 !important;
}
</style>
