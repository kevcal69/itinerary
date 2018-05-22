<template>
    <div class="container" @click="goToDetails">
        <div class="card-overlay" v-bind:style="{ 'background-image': 'url(' + imgsrc + ')' }"></div>
        <div class="content">
            <div class="tagline">{{ countryState }}</div>
            <div class="title">{{ title }}</div>
            <div class="description">{{ description }}</div>
            <div class="user" v-if="user">
                <div class="avatar" v-bind:style="{ 'background-image': 'url(' + user.avatar_url + ')' }"></div>
                <div class="info">
                    <div class="name">{{ user.name }}</div>
                    <div class="rank">PlanIt Top Blogger, Rank {{ user.rank }}</div>
                </div>
            </div>
        </div>
        <div class="social">
            <div class="heart">
                <span>{{ favorites }}</span>
            </div>
            <div class="share"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'the-destinationcard',
    props: [
        'imgsrc', 'title', 'description',
        'user', 'countryState', 'id', 'favCount'
    ],
    methods: {
        goToDetails () {
            this.$router.push({name: 'plantripdetailpage', params: {id: this.id}})
        }
    },
    computed: {
        favorites () {
            return this.favCount ? this.favCount : 0
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    /*width: 367px;*/
    height: 337px;
    position: relative;
}
.card-overlay {
    width: 100%;
    /*width: 367px;*/
    height: 337px;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.content {
    padding: 20px;
    width: 100%;
    /*width: 367px;*/
    height: 337px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .59);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    flex-direction: column;
}
.tagline {
    margin: 50px 0px;
    height: 14px;
    opacity: 0.69;
    font-family: Avenir;
    font-size: 10px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1.7px;
    text-align: left;
}
.title {
    height: 27px;
    font-family: Georgia;
    font-weight: 300;
    font-size: 24px;
}
.description {
    height: 16px;
    opacity: 0.69;
    font-family: Avenir;
    font-size: 12px;
    font-weight: 300;
}
.user {
    margin: 50px 0px;
    height: 50px;
    display: flex;
    align-items: center;
}
.avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px 10px;
}
.name {
    width: 78px;
    height: 14px;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 900px;
    letter-spacing: 1px;
    color: #f39c12;
}
.rank {
    height: 10px;
    font-family: Avenir;
    font-size: 10px;
    font-weight: 300;
    opacity: .6;
}
.social {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #fff;
    display: flex;
    width: 90px;
    justify-content: space-between;
}
.heart {
    background-image: url(../assets/Icons/like.png);
    background-size: contain;
    height: 20px;
    width: 20px;
}
.heart span {
    margin-left: 30px;
    height: 20px;
    font-family: Avenir;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: normal;
    text-align: center;
}
.share {
    background-image: url(../assets/Icons/share.png);
    background-size: contain;
    height: 20px;
    width: 20px;
}
</style>
