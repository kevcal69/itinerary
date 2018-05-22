<template>
    <div class="container">
        <div class="overlay"></div>
        <div class="hero-container">
            <div class="logo">
                <img src="../assets/logo_hero.png">
            </div>
            <div class="tagline">
                <p>Share amazing places with people around the world.</p>
                <p>{{ tagline }}</p>
            </div>
            <div class="searchbar">
                <input type="" name="" placeholder="Where do you want to go?" class="search-input">
                <button class="search-button">SEARCH TRIPS</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data () {
        return {
            tagline: 'Share. Dream. Plan. Explore.'
        }
    }
}
</script>

<style scoped>
.container {
    z-index: -1;
}
.hero-container {
    position: relative;
    padding-top: 200px;
    margin-top: -64px;
    height: 671px;
    background: rgba(0, 0, 0, .21);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-family: Avenir;
}
.overlay {
    width: 100%;
    height: 671px;
    position: absolute;
    top: 0px;
    background: black;
    background-size: cover;
    background-image: url(../assets/bg-hero.jpg);
    pointer-events: none;
}
.logo {
    margin-bottom: 5px;
    height: 66px;
    width: 150px;
    margin-right: 65px;
}
.logo img {
    height: 84px;
}
.tagline {
    margin-top: 40px;
    font-size: 24px;
    text-align: center;
    padding: 5px;
    font-family: Avenir;
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;

}
.searchbar {
    padding-top: 5px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;

}
.search-input {
    max-width: 512px;
    width: 70%;
    height: 48px;
    background-color: #ffffff;
    border: solid 1px #ffffff;
    outline: none;
    font-size: 13px;
    padding: 5px 20px;
}
.search-button {
    width: 164px;
    max-width: 30%;
    height: 48px;
    outline: none;
    border: none;
    color: white;
    background-color: #ff9c2e;
    font-size: 14px;
}
</style>
