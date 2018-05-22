<template>
    <div id="app">
        <Header />
        <router-view />
        <Footer />
        <v-dialog/>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {
        Header: require('./components/the-header.vue').default,
        Footer: require('./components/the-footer.vue').default
    }
}
</script>
