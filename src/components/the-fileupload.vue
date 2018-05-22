<template>
    <div class="container">
        <input type="file" v-show="false" ref="file" @change="uploadImage" accept="image/jpg">
        <div class="progress-bar" :style="{width: width}">
        </div>
        <div class="file-upload" @click="trigger" :class="{ uploading : (isUpload || !canUpload) }">
            <img src="../assets/Icons/img_icon.png" width="36" height="36">
            <div v-if="isUpload">Uploading....</div>
            <div v-else>Click or drag to add photos</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'file-upload',
    props: ['uploading', 'allowUpload', 'progress'],
    computed: {
        width () {
            return this.progress + '%'
        },
        isUpload () {
            return this.uploading
        },
        canUpload () {
            return this.allowUpload || true
        }
    },
    methods: {
        uploadImage (e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) {
                return
            }
            this.$emit('imageupload', files[0])
        },
        trigger () {
            this.$refs.file.click()
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
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
.progress-bar {
    height: 5px;
    transition: width .5s;
    background-color: #2980b9;
}
</style>
