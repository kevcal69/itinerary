<template>
    <modal name="login-popup"
            width="60%"
            height="auto"
            @before-close="$emit('popupclose')">

        <div class="container">
            <div class="login-picture"></div>
            <div class="login-form">
                <div class="first-header">
                    <img class="logo-orange" src="../assets/logo-orange.png">
                    <p class="tagline">Log In to keep track of your trips</p>
                    <div class="fb-button" @click="continuewithfb()">
                    </div>
                </div>
                <div class="second-header">
                    <div class="separator"></div>
                    <p class="or">or</p>
                    <div class="separator"></div>
                </div>
                <form v-on:submit.prevent="loginnormal">
                <div class="third-header">
                    <div class="form-control">
                        <span v-show="login.email.hasError">{{ login.email.errorMsg }}</span>
                        <input type="email" name="" placeholder="Email"
                            class="form-field" v-model="login.email.value"
                            v-bind:class="{error: login.email.hasError}">
                    </div>
                    <div class="form-control">
                        <span v-show="login.password.hasError">{{ login.password.errorMsg }}</span>
                        <input type="password" name="" placeholder="Password"
                            class="form-field" v-model="login.password.value"
                            v-bind:class="{error: login.password.hasError}">
                    </div>
                </div>
                <div class="fourth-header">
                    <button>LOG IN</button>
                    <span class="othererror" v-show="otherError">{{ errorMsg }}</span>
                    <p>
                        New to PlanIt? <a href="" class="login">Sign Up</a>
                    </p>
                </div>
                </form>
                <div class="close" @click="$modal.hide('login-popup')">
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

export default {
    name: 'App',
    props: ['visible'],
    watch: {
        visible (newVal, oldVal) {
            if (newVal) this.$modal.show('login-popup')
        }
    },
    data () {
        return {
            errorMsg: '',
            login: {
                password: {
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
    computed: {
        otherError () {
            return this.errorMsg.length > 0
        }
    },
    methods: {
        continuewithfb () {
            this.$store.dispatch('FB_SIGNIN')
                .then(_ => { this.$modal.hide('login-popup') })
        },
        loginnormal (e) {
            let validate = true
            Object.keys(this.$data.login).forEach(obj => {
                let item = this.$data.login[obj]
                this.$set(this.login[obj], 'hasError', false)
                this.$set(this.login[obj], 'errorMsg', '')
                if (!validateRequired(item.value)) {
                    validate = false
                    this.$set(this.login[obj], 'hasError', true)
                    this.$set(this.login[obj], 'errorMsg', 'field is required')
                }
                if (validate && obj === 'email' && !validateEmail(item.value)) {
                    validate = false
                    this.$set(this.login.email, 'hasError', true)
                    this.$set(this.login.email, 'errorMsg', 'email is not accepted')
                }
            })
            if (!validate) return 0
            let data = Object.keys(this.$data.login).reduce(
                (accu, obj) => {
                    accu[obj] = this.$data.login[obj].value
                    return accu
                }, {}
            )
            this.$store.dispatch('LOGIN_USER', data)
                .then(_ => {
                    this.$modal.hide('login-popup')
                }).catch(({ message }) => {
                    this.errorMsg = 'Invalid Login No User Found'
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
    margin-top: 35px;
    height: 20px;
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
    height: 140px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
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
    margin: 10px 0px;
}
.othererror {
    margin: 5px 0px;
    color: #e74c3c;
}
button {
    width: 127px;
    height: 36px;
    outline: none;
    background-color: #ff9c2e;
}
.fourth-header {
    font-family: Avenir;
    font-size: 14px;
    letter-spacing: .8px;
    margin: 5px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
</style>
