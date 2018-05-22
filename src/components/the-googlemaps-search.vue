<template>
    <div class="container">
        <div>
            <div class="form-field">
                <input type="text" @focus="showMap=true" :ref="searchName" :value="searchValue" class="field" placeholder="Search for the location" />
                <span class="close" v-show="showMap" @click="showMap=false">x close</span>
            </div>
        </div>
        <transition name="fade">
            <div class="map" v-show="showMap">
                <div class="google-map" :ref="mapName"></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'google-map-search',
    props: ['name'],
    data: function () {
        return {
            mapName: this.name + '-map',
            searchName: this.name + '-search',
            showInput: false,
            showMap: false,
            searchValue: ''
        }
    },
    mounted: function () {
        /* eslint-disable */
        const element = this.$refs[this.mapName]
        element.style.width = `${this.$parent.$el.clientWidth}px`
        const options = {
            zoom: 14,
            center: new google.maps.LatLng(51.501527, -0.1921837)
        }
        const geocoder = new google.maps.Geocoder();
        const map = new google.maps.Map(element, options)
        google.maps.event.addListenerOnce(map, 'tilesloaded', () => {this.showInput = true});
        var input = this.$refs[this.searchName]
        var searchBox = new google.maps.places.SearchBox(input)
        map.addListener('bounds_changed', function () {
          searchBox.setBounds(map.getBounds())
        });
        var markers = []
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', () => {
            var places = searchBox.getPlaces()
            if (places.length == 0) {
                return;
            }

            markers.forEach(function(marker) {
                marker.setMap(null)
            });
            markers = []
            var bounds = new google.maps.LatLngBounds()
            var mplace = ''
            places.forEach(function(place) {
                if (!place.geometry) {
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                }
                mplace = `${place.formatted_address}`;

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }))
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            })
            this.$emit('updatelocation', {
                lat: markers[0].position.lat(), lng: markers[0].position.lng(),
                place: mplace})
            map.fitBounds(bounds);
        })
        google.maps.event.addListener(map, "click", (event) => {
            var lat = event.latLng.lat()
            var lng = event.latLng.lng()
            var pos = new google.maps.LatLng(lat, lng)
            markers.forEach(function(marker) {
                marker.setMap(null)
            })
            markers = []
            markers.push(new google.maps.Marker({
                map: map,
                position: pos
            }))
            geocoder.geocode({latLng: pos}, (responses) => {
                if (responses && responses.length > 0) {
                    let place = responses[0].formatted_address
                    this.searchValue = place;
                    this.$emit('updatelocation', {lat, lng, place})
                } else {
                    marker.formatted_address = 'Cannot determine address at this location.'
                }
            })
        })
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
.form-control {
    margin-top: 20px;
}
.form-field {
    width: 100%;
    position: relative;
}
.form-field .field {
    width: 100%;
    background-color: #ffffff;
    border: solid 1px #d6d6d6;
    height: 48px;
    padding-left: 20px !important;
}
.form-field .close {
    position: absolute;
    right: 20px;
    font-family: 'Avenir';
    color: #e74c3c;
    cursor: pointer;
}
</style>
