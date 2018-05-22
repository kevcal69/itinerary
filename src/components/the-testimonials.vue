<template>
    <div class="container">
        <header>Testimonials from our users</header>
        <main>
            <div class="card" v-for="testimonial in testimonials" :key="testimonial.id">
                <p class="content">"{{ testimonial.content }}"</p>
                <div class="user">
                    <div class="avatar" v-bind:style="{ 'background-image': 'url(' + testimonial.user.avatar_url + ')' }"></div>
                    <div class="info">
                        <div class="name">{{ testimonial.user.name }}</div>
                        <div class="status">{{ testimonial.user.status }}</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'the-sponsors',
    props: ['testimonials']
}
</script>

<style scoped>
.container {
    width: 100%;
    min-height: 260px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
}
header {
    width: 468px;
    font-family: Georgia;
    font-size: 32px;
    margin: 100px 0px 20px 0px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
}
main {
    width: 100%;
    display: flex;;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.card {
    width: 741px;
    max-width: 100%;
    min-height: 336px;
    background-color: #ffffff;
    box-shadow: 1px 2px 4px 0 rgba(200, 200, 200, 0.5);
    margin: 70px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #e74c3c;
}
p {
    text-align: center;
    width: 80%;
    min-height: 114px;
    font-family: Avenir;
    font-size: 24px;
    font-weight: normal;
    font-style: oblique;
    font-stretch: normal;
    line-height: 1.58;
}
.user {
    margin: 20px 0px;
    height: 50px;
    display: flex;
    align-items: center;
}
.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px 20px;
    text-align: left;
}
.name {
    height: 22px;
    font-family: Avenir;
    font-size: 16px;
    letter-spacing: 1px;
    color: #2c3e50;
    font-weight: 500;
}
.status {
    height: 10px;
    font-family: Avenir;
    font-size: 12px;
    font-weight: 300;
    color: #95a5a6;
}
</style>
