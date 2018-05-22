<template>
    <modal name="signup-popup"
            width="60%"
            height="auto"
            @before-close="$emit('popupclose')">

        <div class="container">
            <div class="login-picture"></div>
            <div class="login-form">
                <div class="first-header">
                    <img class="logo-orange" src="../assets/logo-orange.png">
                    <p class="tagline">Log In to keep track of your trips</p>
                    <button class="fb-button" @click="continuewithfb()" :disabled="fetchlock" />
                </div>
                <div class="second-header">
                    <div class="separator"></div>
                    <p class="or">or</p>
                    <div class="separator"></div>
                </div>
                <form v-on:submit.prevent="signupnormal">
                <div class="third-header">
                    <div class="form-control">
                        <span v-show="signup.email.hasError">{{ signup.email.errorMsg }}</span>
                        <input type="email" name="" placeholder="Email"
                            class="form-field" v-model="signup.email.value"
                            v-bind:class="{error: signup.email.hasError}">
                    </div>
                    <div class="form-control">
                        <span v-show="signup.password.hasError">{{ signup.password.errorMsg }}</span>
                        <input type="password" name="" placeholder="Password"
                            class="form-field" v-model="signup.password.value"
                            v-bind:class="{error: signup.password.hasError}">
                    </div>
                    <div class="form-control">
                        <span v-show="signup.password2.hasError">{{ signup.password2.errorMsg }}</span>
                        <input type="password" name="" placeholder="Re-type Password"
                            class="form-field" v-model="signup.password2.value"
                            v-bind:class="{error: signup.password2.hasError}">
                    </div>
                    <div class="form-control">
                        <span v-show="signup.fname.hasError">{{ signup.fname.errorMsg }}</span>
                        <input type="text" name="" placeholder="Full Name"
                            class="form-field" v-model="signup.fname.value"
                            v-bind:class="{error: signup.fname.hasError}">
                    </div>
                </div>
                <div class="fourth-header">
                    <button :disabled="fetchlock">SIGN UP</button>
                    <p>
                        Have an account? <a href="" class="login">Log In</a>
                    </p>
                </div>
                </form>
                <div class="close" @click="$modal.hide('signup-popup')">
                    Close
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
var validateEmail = (email) => {
    var re = /\S+@\S+/
    return re.test(String(email).toLowerCase())
}

var validateRequired = (input) => {
    return input.trim().length > 0
}

var validate2password = (pass1, pass2) => {
    return pass1 === pass2
}

export default {
    name: 'App',
    props: ['visible'],
    watch: {
        visible (newVal, oldVal) {
            if (newVal) this.$modal.show('signup-popup')
        }
    },
    data () {
        return {
            fetchlock: false,
            signup: {
                password: {
                    value: '',
                    hasError: false,
                    errorMsg: ''
                },
                password2: {
                    value: '',
                    hasError: false,
                    errorMsg: ''
                },
                fname: {
                    value: '',
                    hasError: false,
                    errorMsg: ''
                },
                email: {
                    value: '',
                    hasError: false,
                    errorMsg: ''
                }
            }
        }
    },
    methods: {
        continuewithfb () {
            this.$store.dispatch('FB_SIGNIN')
                .then(_ => { this.$modal.hide('signup-popup') })
        },
        signupnormal (e) {
            this.fetchlock = true
            let validate = true
            Object.keys(this.$data.signup).forEach(obj => {
                let item = this.$data.signup[obj]
                this.$set(this.signup[obj], 'hasError', false)
                this.$set(this.signup[obj], 'errorMsg', '')
                if (!validateRequired(item.value)) {
                    validate = false
                    this.$set(this.signup[obj], 'hasError', true)
                    this.$set(this.signup[obj], 'errorMsg', 'field is required')
                }
                if (validate && obj === 'email' && !validateEmail(item.value)) {
                    validate = false
                    this.$set(this.signup.email, 'hasError', true)
                    this.$set(this.signup.email, 'errorMsg', 'email is not accepted')
                }
                if (validate && obj === 'password' && !validate2password(item.value, this.$data.signup.password2.value)) {
                    validate = false
                    this.$set(this.signup.password, 'hasError', true)
                    this.$set(this.signup.password, 'errorMsg', 'password not the same')
                    this.$set(this.signup.password2, 'hasError', true)
                    this.$set(this.signup.password2, 'errorMsg', 'password not the same')
                }
            })
            if (!validate) return 0
            let data = Object.keys(this.$data.signup).reduce(
                (accu, obj) => {
                    accu[obj] = this.$data.signup[obj].value
                    return accu
                }, {}
            )
            this.$store.dispatch('CREATE_USER', data)
                .then(_ => {
                    this.fetchlock = false
                    this.$modal.hide('signup-popup')
                }).catch(({ message }) => {
                    this.fetchlock = false
                    console.log(message)
                })
        }
    }
}
</script>

<style scoped>
.container {
    height: 680px;
    display: flex;
    font-family: Avenir;
}
.login-picture {
    width: 50%;
    flex-grow: 1;
    background-size: cover;
    background-image: url(../assets/login-bg.jpg);
}
.login-form {
    width: 50%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
}
.logo-orange {
    width: 137px;
    height: 56px;
}
.first-header {
    margin-top: 0px
}
.fb-button {
    background-size: cover;
    background-image: url(../assets/fb-img.png);
    width: 278px;
    height: 45px;
    margin-top: 40px;
}
.tagline {
    margin-top: 20px;
    font-size: 14px;
}
.second-header {
    margin-top: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
}
.or {
    height: 2px;
    margin: 0;
    width: 13px;
    font-family: Avenir;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
.separator {
    margin: 0 20px;
    width: 30px;
    height: 2px;
    opacity: .4;
    margin-top: 10px;
    border-bottom: solid 0.3px #000000;
}
.third-header {
    height: 340px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
}
.form-control {
    width: 278px;
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}
.form-control span {
    font-style: normal;
    color: #e74c3c;
    margin-bottom: 5px;
}
.form-control span:before {
    content: '*';
    margin-right: 10px;
}
.form-field {
    width: 278px;
    height: 40px;
    font-family: Avenir;
    font-size: 13px;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    outline: none;
    padding: 15px 15px;
}
button {
    width: 127px;
    height: 36px;
    background-color: #ff9c2e;
}
.fourth-header {
    font-family: Avenir;
    font-size: 14px;
    letter-spacing: .8px;
    margin: 5px 0px;
}
.login {
    color: #8dbfca;
    text-decoration: none;
    font-weight: 600;
}
.close {
    position: absolute;
    top: 30px;
    right: 40px;
    cursor: pointer;
}
.error {
    border: 1px solid #e74c3c;
}
</style>
