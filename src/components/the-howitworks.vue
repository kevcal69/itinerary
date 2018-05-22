<template>
    <div class="container">
        <header>How it Works</header>
        <main>
            <div class="step">
                <img src="../assets/icons/htw_step1.png">
                <h4>STEP 1</h4>
                <div class="label-tag">Create your trip using our <span class="text-hightlight">itinerary planner</span>.</div>
            </div>
            <div class="step">
                <img src="../assets/icons/htw_step2.png">
                <h4>STEP 2</h4>
                <div class="label-tag"><span class="text-hightlight">Save</span> it and <span class="text-hightlight">share</span> the plan to your phone</div>
            </div>
            <div class="step">
                <img src="../assets/icons/htw_step3.png">
                <h4>STEP 3</h4>
                <div class="label-tag"><span class="text-hightlight">Navigate</span> through our entire trip, one place at a time</div>
            </div>
        </main>
        <footer>
            <button class="search-button">CREATE A NEW ITINERARY</button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'the-howitworks'
}
</script>

<style scoped>
.container {

}
img {
    width: 128px;
    height: 128px;
    margin-bottom: 30px;
}
header {
    height: 60px;
    font-family: Georgia;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0px;
    min-height: 300px;
    text-align: center;
}
.step {
    width: 367px;
    min-height: 300px;
}
h4 {
    margin: 10px 0px;
    font-family: Avenir;
    font-size: 22px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: 2px;
    text-align: center;
}
.label-tag {
    font-family: Avenir;
    font-size: 16px;
    font-weight: 450;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: normal;
    margin: 0px;
    height: 150px;
    min-height: 150px;
    padding: 0px 60px;
}
footer {
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-button {
    width: 250px;
    height: 48px;
    outline: none;
    border: none;
    color: white;
    background-color: #ff9c2e;
    font-size: 14px;
}
</style>
