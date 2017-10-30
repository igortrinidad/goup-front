<template>
    <div>

        <div class="container-fluid m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/map.png" alt="">
                <h3 class="f-300 m-b-30">Mapa</h3>
            </div>
            <div class="wrapper-map" style="margin: 0 -15px" v-if="company.address_is_available">
                <GmapMap
                :center="{ lat: company.lat, lng: company.lng }"
                :zoom="map.zoom"
                :options="map.options"
                style="width: 100%; height: 500px"
                >

                <GmapMarker :position="{ lat: company.lat, lng: company.lng }" title="company.name" :clickable="true" :icon="map.icon">
                </GmapMarker>

            </GmapMap>
            </div>
            <div class="text-center" v-if="!company.address_is_available">
                <span class="f-300 f-danger" >Endereço não disponível</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'landing-company-map',
        props: {
            company: {
                type: Object
            }
        },
        data(){
            return {
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
        mounted(){

        },
        methods: {}
    }
</script>

<style scoped>


</style>
