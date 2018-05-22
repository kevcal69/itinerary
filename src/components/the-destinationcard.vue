<template>
    <div class="container">
        <div class="img" v-bind:style="{ 'background-image': 'url(' + imgsrc + ')' }">
        </div>
        <div class="place">{{ place }}</div>
        <div class="description">{{ description }}</div>
    </div>
</template>

<script>
export default {
    name: 'the-destinationcard',
    props: ['imgsrc', 'place', 'description']
}
</script>

<style scoped>
.container {
    width: 247px;
    height: 431px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    box-shadow: none;
}
.img {
    width: 100%;
    height: 331px;
    background-size: cover;
    margin-bottom: 30px;
}
.place {
    height: 27px;
    font-family: Avenir;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}
.description {
    height: 32px;
    width: 209px;
    text-align: center;
    font-family: Avenir;
    font-size: 12px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
