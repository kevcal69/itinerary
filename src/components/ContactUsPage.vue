<template>
    <div class="container">
        <main>
            <div class="overlay">
                <h2>Contact Us?</h2>
                <h4>Interested in becoming a partner or have some questions for us?</h4>
                <h4>Send a line below</h4>
                <div class="form">
                    <div class="label">NAME</div>
                    <input type="text" name="name">
                </div>
                <div class="form">
                    <div class="label">EMAIL</div>
                    <input type="email" name="email">
                </div>
                <div class="form">
                    <div class="label">MESSAGE</div>
                    <textarea></textarea>
                </div>
                <button>SEND A MESSAGE</button>
            </div>
        </main>
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
    background: url('../assets/footerimg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 900px;
    position: relative;

}
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
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
    font-size: 18px;
    width: 500px;
    text-align: center;
    color: rgba(255, 255, 255, .7);
    margin: 5px 0px;
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
.form {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0px;
}
.form .label {
    height: 20px;
    color: rgba(255, 255, 255, .8);
    font-size: 16px;
    width: 100%;
}
.form input, .form textarea {
    width: 100%;
    padding: 10px 5px;
}
.form textarea {
    height: 250px;
}
</style>
