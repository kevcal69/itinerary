<template>
    <div class="container">
        <div class="write-comment" v-if="isAuthenticated">
            <div class="avatar" v-bind:style="{ 'background-image': 'url(' + user.avatarUrl + ')' }"></div>
            <div class="comment-content"
                v-bind:class="{ 'comment-content-active': commentContentActive }"
                v-contenteditable:comment="true"
                @click="processCommentContent" @blur="processCommentContent"
                v-on:keyup.13="saveComment"
                ref="commentContent">
            </div>
        </div>
        <div class="comments" v-if="user">
            <Comments
                v-for="comment in commentRef"
                isAuthenticated="isAuthenticated"
                :commentUser="comment.user"
                :itineraryId="id"
                :id="comment['.key']"
                :when="comment.when"
                :content="comment.value"
                :favorites="comment.favorites"
                :key="comment['.key']">
                {{ comment }}
            </Comments>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

var dbref

export default {
    name: 'plan-trip-detail-page-comment-section',
    props: ['id', 'comments'],
    components: {
        Comments: require('./the-comment.vue').default
    },
    data () {
        return {
            comment: 'Write a comment',
            commentContentActive: false
        }
    },
    computed: {
        ...mapState(['user']),
        isAuthenticated () {
            return this.user != null
        }
    },
    methods: {
        processCommentContent () {
            if (this.comment.trim() === 'Write a comment') {
                this.comment = ''
                this.commentContentActive = true
            } else if (this.comment.trim().length === 0) {
                this.comment = 'Write a comment'
                this.commentContentActive = false
            }
        },
        saveComment (e) {
            if (this.comment.trim().length === 0 || e.shiftKey) {
                return
            }
            let comment = this.comment.trim()
            this.comment = ''
            this.$refs.commentContent.blur()
            let data = {
                value: comment,
                when: firebase.database.ServerValue.TIMESTAMP,
                user: this.user,
                favorites: []
            }
            this.$firebaseRefs.commentRef.push(data)
        }
    },
    firebase () {
        dbref = firebase.database()
        return {
            commentRef: {
                source: dbref.ref('itinerary/publish/' + this.id + '/comments'),
                anArray: true
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    margin-top: 10px;
}
.write-comment {
    width: 100%;
    display: flex;
    align-items: top;
    justify-content: center;
    border: solid 1px #d6d6d6;
    padding: 25px 35px 15px 35px;
}
.avatar {
    border: 1px solid black;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 1;
    margin-right: 20px;
}
.comment-content {
    font-family: "Avenir";
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    outline: none;
    padding-top: 10px;
    flex-grow: 1;
    min-height: 60px;
    width: 100%;
    color: rgba(0, 0, 0, .2);
}
.comment-content-active {
    color: rgba(0, 0, 0, .6);
}
.comments {
    margin-top: 10px;
    width: 100%;
}
</style>
