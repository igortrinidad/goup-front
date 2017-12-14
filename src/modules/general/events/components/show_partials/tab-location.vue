<template>
    <div class="card">
        <div class="card-body card-padding">
            <div class="m-t-30 text-center">

                <p class="f-20 f-700">
                    {{ event.place.name }}
                </p>

                <p class="">
                    <i class="ion-ios-location m-r-5"></i>
                    {{ `${ event.city.name } - ${ event.city.state }` }}
                </p>

                <div v-if="event.place.formatted_address">
                    <span>{{ event.place.formatted_address }}</span>
                </div>

                <div class="m-t-20">
                    <button class="btn btn-primary" @click="openMapsExternally()">{{ translations.open_maps }}</button>
                </div>

                <div class="row m-t-30">
                    <div class="col-sm-12">
                        <div class="rounded">
                            <GmapMap
                                :center="{ lat: event.place.geometry.location.lat, lng: event.place.geometry.location.lng }"
                                :zoom="map.zoom"
                                :options="map.options"
                                style="width: 100%; height: 300px"
                            >

                                <GmapMarker
                                    :position="{ lat: event.place.geometry.location.lat, lng: event.place.geometry.location.lng }"
                                    :title="event.place.name"
                                    :clickable="true"
                                    :icon="map.icon"
                                >
                                </GmapMarker>

                            </GmapMap>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/events/show'

    export default {
        name: 'general-places-show-tab-location',

        components: {
        },

        props: {
            event: {
                type: Object,
                required: true
            }
        },

        data () {
            return {
                placeholder: true,
                map: {
                    mapPlaces: [],
                    enabled: false,
                    zoom: 16,
                    autocomplete: '',
                    icon: 'https://s3.amazonaws.com/goup-assets/img/map_icon.svg',
                    options: {
                        scrollwheel: false,
                        styles: [
                            {
                                featureType: 'poi',
                                stylers: [{visibility: 'off'}]
                            },
                            {
                                featureType: 'transit',
                                elementType: 'labels.icon',
                                stylers: [{visibility: 'off'}]
                            }
                        ]
                    },
                }
            }
        },

        computed: {
            ...mapGetters(['language', 'checkIOS', 'getUserLastGeoLocation']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
        },

        methods: {
            openMapsExternally: function(){
                let that = this

                var url = `https://www.google.com/maps/dir/?api=1&origin=` + 
                that.getUserLastGeoLocation.lat + ',' +
                that.getUserLastGeoLocation.lng +
                '&destination=' + encodeURI(that.event.place.name) + 
                '&destination_place_id=' + that.event.place.place_id +
                '&travelmode=driving';

                window.open(url, '_system');

            },
        }
    }
</script>

<style scoped>
    .rounded {
        border-radius: 6px;
        overflow: hidden !important;
        position: relative;
        z-index: 10;
    }
</style>
