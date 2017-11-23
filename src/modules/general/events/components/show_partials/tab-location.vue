<template>
    <div>
        <div class="m-t-30 text-center">
            <h3 class="m-t-0 m-b-30">{{ translations.tabs.location }}</h3>

            <div v-if="place.address.full_address">
                <span>{{ place.address.full_address }}</span>
            </div>

            <div class="m-t-30 rounded">
                <GmapMap
                    :center="{ lat: place.lat, lng: place.lng }"
                    :zoom="map.zoom"
                    :options="map.options"
                    style="width: 100%; height: 300px"
                >

                    <GmapMarker
                        :position="{ lat: place.lat, lng: place.lng }"
                        :title="place.name"
                        :clickable="true"
                        :icon="map.icon"
                    >
                    </GmapMarker>

                </GmapMap>
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
            place: {
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
                    icon: 'https://s3.amazonaws.com/isaudavel-assets/img/MAP+ICON-02.png',
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
            ...mapGetters(['checkLanguage']),

            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
        },

        methods: {

        }
    }
</script>

<style scoped>
    .rounded {
        border-radius: 20px;
        overflow: hidden !important;
        position: relative;
        z-index: 1000;
    }
</style>
