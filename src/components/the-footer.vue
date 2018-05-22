<template>
    <div class="container">
        <header>
            <img src="../assets/logo.png" class="logo">
        </header>
        <main>
            <div class="row">
                <div class="col">Home</div>
                <div class="col">My Account</div>
                <div class="col">FAQs</div>
            </div>
            <div class="row">
                <div class="col">About Us</div>
                <div class="col">Explore Itineraries</div>
                <div class="col">
                    <router-link :to="{name: 'termsofuse'}">
                        Terms of Use
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col">Top Destinations</div>
                <div class="col">My Itineraries</div>
                <div class="col">
                    <router-link :to="{name: 'privacypolicy'}">
                        Privacy Policy
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col">Partners</div>
            </div>
            <div class="row">
                <div class="col">
                    <router-link :to="{name: 'contactus'}">
                        Contact Us
                    </router-link>
                </div>
            </div>
        </main>
        <footer>
            <p>PlanIt © 2018 | All rights reserved</p>
            <div class="social">
                <img src="../assets/Icons/footer_fb.png">
                <img src="../assets/Icons/footer_twitter.png">
                <img src="../assets/Icons/footer_ig.png">
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'the-footer'
}
</script>

<style scoped>
.container {
    min-height: 328px;
    background-color: #0d2e3e;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 45px 5% 30px 5%;
}
header {
    height: 50px;
}
main {
    height: 200px;
    width: 100%;
    font-family: Avenir;
    font-size: 14px;
    color: #fff;
    margin-top: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.logo {
    width: 52px;
    height: 26px;
}
.row {
    height: 20px;
    margin: 8px 0px;
    display: flex;
}
.col {
    width: 172px;
}
.col a {
    text-decoration: none;
    color: #fff;
    text-align: center;
}
footer {
    margin-top: 20px;
    max-height: 120px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}
footer img {
    height: 36px;
    width: 36px;
    margin: 0px 20px 0px 20px;
}
footer p {
    height: 36px;
    display: flex;
    margin: 0px;
    color: #95a5a6;
    align-items: flex-end;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
</style>
