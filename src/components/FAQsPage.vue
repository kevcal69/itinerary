<template>
    <div class="container">
        <main>
            <div class="header">
                <h2>Frequently Asked Questions</h2>
                <h4>We know you have questions about PlanIt. So we’ve answered some of them here!</h4>
            </div>
            <div class="questions">
                <h5>What is PlanIt?</h5>
                <p>PlanIt is a free platform which gives you the freedom to create and explore travel itineraries at your fingertips! Set forth on a quest by creating your own itineraries from scratch and make your dreams of traveling come true. Share extraordinary adventures to the world by creating personalized day-by-day plans and uploading those awesome shots from your trip. Discover beautiful places by exploring itineraries from PlanIt’s community of travelers, finding yourself the right adventure. Share. Dream. Plan. Explore. This is PlanIt.</p>
            </div>
            <div class="questions">
                <h5>How do I create itineraries on PlanIt?</h5>
                <p>To create an itinerary, you need to first create an account on the website to access PlanIt’s rich content, offerings, and features which includes the itinerary creation platform. Once you’re logged in, click on the Create your itinerary tab on the navigation bar. You will be welcomed with the template for the title panel as well as the duration options. Edit the title panel and and choose how many days the itinerary will be. You can then proceed to the itinerary creation proper. Here you can edit and fill out the necessary info for each activity on the selected day/s such as the location, name of the place, the budget, some pictures, and many more as well as add or delete activities. After all is done, you can click Publish itinerary at the bottom of the page and PlanIt will generate your itinerary. It’s easy and simply, right?</p>
            </div>
            <div class="questions">
                <h5>What’s on the Top Destinations page?</h5>
                <p>The top destinations featured on the website are based on the most frequently used destinations by users on their published itineraries. Each top destination will provide areas of interest which you can select and use for creating your itinerary. The page also showcases the most recently published itineraries of the selected destination.</p>
            </div>
            <div class="questions">
                <h5>What is PlanIt?</h5>
                <p>PlanIt is a free platform which gives you the freedom to create and explore travel itineraries at your fingertips! Set forth on a quest by creating your own itineraries from scratch and make your dreams of traveling come true. Share extraordinary adventures to the world by creating personalized day-by-day plans and uploading those awesome shots from your trip. Discover beautiful places by exploring itineraries from PlanIt’s community of travelers, finding yourself the right adventure. Share. Dream. Plan. Explore. This is PlanIt.</p>
            </div>
            <div class="questions">
                <h5>How do I share itineraries?</h5>
                <p>To share your created itineraries, you simply have to go to your profile page, navigate through your created itineraries and click on the Share icon. PlanIt offers you the flexibility to either download your itinerary in PDF format or share it across your social media platforms such as Facebook, Twitter, and Google+.   </p>
            </div>
            <div class="questions">
                <h5>How can I talk to the PlanIt team?</h5>
                <p>You can reach us through our Contact Us page. Simply click on the link found on the navigation bar if you are logged in or down below at the footer of the website. Or you can feel free to shoot us an e-mail through dev.planit@gmail.com!</p>
            </div>
        </main>
        <footer>
            <div class="overlay">
                <h2>Still got unanswered question?</h2>
                <h4>Contact us Directly</h4>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'faqs'
}
</script>

<style scoped>
.container {
    width: 100%;
    background-color: #0d2e3e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
main {
    width: 80%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 70px;
}
main .header {
    padding-top: 70px;
    text-align: center;
}
main .header h2 {
    font-size: 32px;
    font-family: "Georgia";
}
main .header h4 {
    font-size: 22px;
    font-family: "Avenir";
    color: rgba(0, 0, 0, .5);
    font-weight: 500;
}
main .questions {
    font-family: "Avenir";
    width: 70%;
    margin: 20px 0px;
}
main .questions h5 {
    font-size: 20px;
    margin: 5px 0px;
    color: #f39c12;
}
main .questions p {
    font-size: 18px;
    line-height: 20px;
    text-align: justify;
}
footer {
    width: 80%;
    height: 500px;
    background: url('../assets/footerimg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.overlay h2 {
    font-size: 32px;
    font-family: "Georgia";
    color: #fff;
    margin: 20px;
}
.overlay h4 {
    font-size: 24px;
    color: rgba(255, 255, 255, .7);
}
.overlay button {
    width: 180px;
    height: 50px;
    font-family: "Avenir";
    background-color: #f39c12;
    border: none;
    color: #fff;
    font-size: 16px;
}
</style>
