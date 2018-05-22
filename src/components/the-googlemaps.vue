<template>
    <div class="container">
        <transition name="fade">
            <div class="google-map" :ref="mapName"></div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'google-map',
    props: ['name', 'lat', 'lng', 'place'],
    data: function () {
        return {
            mapName: this.name + '-map'
        }
    },
    mounted: function () {
        /* eslint-disable */
        const element = this.$refs[this.mapName]
        var pos = new google.maps.LatLng(this.lat, this.lng)
        const options = {
            zoom: 14,
            center: pos
        }
        const map = new google.maps.Map(element, options)
        google.maps.event.addListenerOnce(map, 'tilesloaded', () => {this.showInput = true});
        let marker = new google.maps.Marker({
            map: map,
            title: this.place,
            position: pos
        })
        map.panTo(marker.getPosition());
        map.setZoom(14);
        /* eslint-enable */
    }
}
</script>

<style scoped>
.container {
    position: relative;
}
.google-map {
    width: 700px;
    height: 600px;
    margin: 0 auto;
    background: gray;
}
</style>
