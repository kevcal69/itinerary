<template>
    <div class="container">
        <div class="user">
            <div class="avatar" v-bind:style="{ 'background-image': 'url(' + commentUser.avatarUrl + ')' }"></div>
            <div class="info">
                <div class="name">{{ commentUser.displayName }}</div>
                <div class="when">{{ whenDisplay }}</div>
            </div>
        </div>
        <div class="content">
            {{ this.content }}
        </div>
        <div class="heart">
            <img src="../assets/Icons/favorite.png" @click="addFavorites"/> <span>{{ favcounts }}</span>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var dbref

export default {
    name: 'comment',
    props: ['id', 'commentUser', 'when', 'content', 'itineraryId'],
    computed: {
        ...mapState(['user']),
        whenDisplay () {
            let date = new Date(this.when)

            return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        },
        favcounts () {
            return this.favoritesRef.length
        }
    },
    methods: {
        addFavorites () {
            this.$firebaseRefs.favoritesRef.set({
                [this.user.uid]: true
            })
        }
    },
    firebase () {
        dbref = firebase.database()
        return {
            favoritesRef: {
                source: dbref.ref(`itinerary/publish/${this.itineraryId}/comments/${this.id}/favorites/`),
                anArray: true
            }
        }
    }
}
</script>

<style scoped>
.container {
    border: solid 1px #d6d6d6;
    width: 100%;
    padding: 25px 35px 15px 35px;
    display: flex;
    flex-direction: column;
    margin: 50px 0px;
}
.user {
    display: flex;
}
.avatar {
    border: 1px solid black;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 1;
    margin-right: 20px;
}
.name {
    font-family: Avenir;
    font-size: 16px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #f39c12;
}
.when {
    font-family: Avenir;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(0, 0, 0, .4);
    margin-top: 5px;
}
.content {
    margin: 20px 0px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
}
.heart {
    display: flex;
}
.heart img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
.heart span {
    font-family: Avenir;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgba(0, 0, 0, .4);
}
</style>
