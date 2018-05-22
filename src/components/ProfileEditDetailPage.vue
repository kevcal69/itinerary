<template>
    <div class="container">
        <header>
            <h1 class="title">Edit Profile</h1>
            <div class="avatar" v-bind:style="{ 'background-image': 'url(' + avatar + ')' }"></div>
            <div class="avatar-action">
                <input type="file" v-show="false" ref="file" @change="uploadImage" accept="image/jpg">
                <div class="upload" @click="triggerUpload">Upload New Photo</div>
                <div class="remove" @click="removePhoto">Remove Photo</div>
            </div>
        </header>
        <main>
            <div class="form-control">
                <label>Email Address</label>
                <div class="form-field">
                    <input type="text" class="field" placeholder="Email Add" v-model="email"/>
                </div>
            </div>
            <div class="form-control">
                <label>Username</label>
                <div class="form-field">
                    <input type="text" class="field" placeholder="Username" v-model="username"/>
                </div>
            </div>
            <div class="form-control">
                <label>Full Name</label>
                <div class="form-field">
                    <input type="text" class="field" placeholder="Full Name" v-model="displayName"/>
                </div>
            </div>
            <div class="form-control">
                <label>Short Bio</label>
                <div class="form-field">
                    <textarea class="field textarea" v-model="status"></textarea>
                </div>
            </div>
        </main>
        <footer class="footer">
            <div class="deactivate" @click="deactivate">Deactiviate Profile</div>
            <div class="setPassword" v-if="hasPassword" @click="setPassword">Set Password</div>
            <div class="buttons">
                <div class="button cancel" @click="cancelEdit">CANCEL</div>
                <div class="button update" @click="updateProfile">UPDATE PROFILE</div>
            </div>
        </footer>
        <modal name="password-confirm">
            <div class="cont">
                <div class="form-control">
                    <label>Set Password</label>
                    <div class="form-field">
                        <input type="Password" v-model="password" class="field" placeholder="New Password"/>
                    </div>
                </div>
                <div class="button cancel">Change Password</div>
            </div>
        </modal>
    </div>
</template>

<script>
import firebase from 'firebase'
import GUID from '../utilities/guid'
import { mapState } from 'vuex'

var dbref
var storageRef

export default {
    name: 'profile-edit-page',
    props: ['id'],
    computed: {
        ...mapState(['user']),
        ...mapState(['login_method']),
        hasPassword () {
            return this.login_method === 'password'
        }
    },
    data () {
        return {
            email: '',
            username: '',
            displayName: '',
            status: '',
            avatar: '',
            password: ''
        }
    },
    methods: {
        setPassword () {
            var user = firebase.auth().currentUser
            user.updatePassword(this.password)
        },
        updateProfile () {
            this.$modal.show('dialog', {
                title: 'Confirm!',
                text: 'You are saving this info',
                buttons: [{
                    title: 'Close'
                },
                {
                    title: 'YES',
                    handler: () => {
                        dbref.ref(`profile/${this.id}`).update({
                            displayName: this.displayName,
                            status: this.status,
                            email: this.email,
                            username: this.username
                        })
                        this.$modal.hide('dialog')
                        this.cancelEdit()
                    }
                }]
            })
        },
        deactivate () {
            this.$modal.show('dialog', {
                title: 'Confirm!',
                text: 'You are deactivating your account',
                buttons: [{
                    title: 'No'
                },
                {
                    title: 'YES',
                    handler: () => {
                        var user = firebase.auth().currentUser
                        user.delete().catch(() => {
                            this.$modal.show('dialog', {
                                title: 'Error!',
                                text: 'Needs fresh authentication. Please logout and login again.'
                            })
                        })
                    }
                }]
            })
        },
        cancelEdit () {
            this.$router.push({name: 'profile', params: {id: this.id}})
        },
        triggerUpload () {
            this.$refs.file.click()
        },
        uploadImage (e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) {
                return
            }
            var file = files[0]

            var filename = GUID()
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            }
            var vm = this
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('profile/avatar/' + filename).put(file, metadata)

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
                    vm.avatar = uploadTask.snapshot.downloadURL
                    dbref.ref(`profile/${vm.id}/avatar`).set(uploadTask.snapshot.downloadURL)
                })
        },
        removePhoto () {
            dbref.ref(`profile/${this.id}/avatar`).set(null)
            this.avatar = ''
        }
    },
    beforeRouteEnter (to, from, next) {
        dbref = firebase.database()
        storageRef = firebase.storage().ref()
        let id = to.params.id
        dbref.ref('profile/' + id).once('value')
            .then((snapshot) => {
                var val = snapshot.val()
                if (val) {
                    next()
                } else {
                    next(false)
                }
            })
    },
    firebase () {
        var vm = this
        return {
            profile: {
                source: dbref.ref('profile/' + this.id),
                asObject: true,
                readyCallback (data) {
                    var info = data.val()
                    vm.email = info.email
                    vm.username = info.username
                    vm.displayName = info.displayName
                    vm.status = info.status
                    vm.avatar = info.avatar
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0px;
    justify-content: center;
    border: 1px solid black;
}
header {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 780px;
    height: 420px;
    display: flex;
    flex-direction: column;
}
header .info {
    width: 80%;
    height: 100%;
    margin: 0px;
}
header .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: solid 10px #ddebf1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
header .title {
    font-family: Georgia;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 70px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
header .avatar-action {
    width: 350px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    font-family: Avenir;
    font-size: 14px;
}
header .avatar-action .upload {
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #f39c12;
}
header .avatar-action .remove {
    font-family: Avenir;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgba(0, 0, 0, .4);
}
main {
    width: 100%;
    max-width: 780px;
    display: flex;
    flex-direction: column;
    align-items: center;

}
main .form-control {
    flex-direction: row;
    align-items: center;
    color: rgba(0, 0, 0, .6);
    margin: 20px 0px;
}
main .form-control label {
    width: 150px;
    height: 19px;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
main .form-control .field {
    width: 550px;
    height: 36px;
}
.textarea {
    height: 88px !important;
}
.footer {
    width: 700px;
}
.deactivate {
    font-family: Avenir;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #e74c3c;
    marign-top: 20px;
}
.setPassword {
    font-family: Avenir;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin-top: 20px;
    text-align: left;
    color: #f39c12;
    marign-top: 20px;
}
.buttons {
    display: flex;
    width: 700px;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
}
.button {
    width: 147px;
    height: 48px;
    border: solid 1px #838383;
    line-height: 48px;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: center;
    margin: 0 20px;
}
.button.cancel {
    color: rgba(0, 0, 0, .6);
}
.button.update {
    color: #fff;
    background-color: #f39c12;
    border: none;
}
.cont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
}
.cont .form-control {
    width: 50%;
}
.cont .form-field {
    width: 100%;
}
.cont .field{
    width: 100%;
}
.cont .button {
    margin-top: 20px;
}
</style>
