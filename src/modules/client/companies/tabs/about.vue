<template lang="html">
    <div class="container m-t-30">
        <h3 class="f-300 text-center">Sobre</h3>

        <div class="m-t-30 text-center">

        </div>

        <div class="card m-t-30">
            <div class="card-body card-padding text-center">

                <h5 class="f-300 f-16 m-t-20">Especialidades</h5>
                <span class="label label-primary p-10 m-5" v-for="category in company.categories">
                    {{ category.name }}
                </span>

                <div class="border-inside-card m-t-20">
                    <p class="f-300 m-0">
                        <strong>Telefone: </strong> {{ company.phone ? company.phone : 'Não informado' }}
                    </p>
                    <p class="f-300 m-0">
                        <strong>E-mail: </strong> {{ company.email ? company.email : 'Não informado' }}
                    </p>
                </div>

                <div class="border-inside-card m-t-20" v-if="company.description">
                    <p class="f-300 m-0">{{ company.description }}</p>
                </div>

            </div>
        </div>

        <h3 class="f-300 text-center">Avaliação</h3>
        <div class="card m-t-30">
            <div class="card-body card-padding text-center">
                <rating-simple
                    :value.sync="company.current_rating"
                    :max="5"
                    :size="3"
                    :align-class="'text-center'"
                ></rating-simple>
                <h4 class="f-300">{{company.current_rating}} de {{company.total_rating}} avaliações</h4>

                <router-link 
                    class="btn btn-primary btn-sm btn-block m-t-10" 
                    tag="button" 
                    :to="{ name: 'landing.companies.company-rating', params: {company_slug: company.slug}}">
                        Avaliar empresa
                </router-link>
                
            </div>
        </div>

        <h3 class="f-300 text-center">Localização</h3>

        <div class="card m-t-30" v-if="interactions.showMap">
            <div class="card-body">
                <GmapMap
                    :center="{ lat: company.lat, lng: company.lng }"
                    :zoom="map.zoom"
                    :options="map.options"
                    style="width: 100%; height: 500px"
                >
                    <!-- Places locations -->
                    <gmap-info-window
                        :options="map.infoOptions" :position="{ lat: company.lat, lng: company.lng }"
                        :content="`<h4>${ company.name }</h4>${ company.address.full_address }`"
                    >
                    </gmap-info-window>
                    <GmapMarker
                        v-for="place in map.mapPlaces"
                        :key="company.id"
                        :position="company.address.geolocation"
                        :title="company.name"
                        :clickable="true"
                        :icon="map.icon"
                        @click="center=company.address.geolocation"
                    >
                    </GmapMarker>
                </GmapMap>

            </div>

        </div>

        <button class="btn btn-primary btn-block" @click="interactions.showMap = !interactions.showMap" v-if="!interactions.showMap">Motrar mapa</button>

        <h3 class="f-300 text-center">Fotos</h3>
        <div class="card">
            <div class="card-body">
                <div id="gallery" style="display:none;">
                    <img
                        v-for="(photo, photoIndex) in company.photos"
                        :alt="photo.created_at | moment('DD/MM/YYYY')"
                        :src="photo.photo_url"
                        :data-image="photo.photo_ur"
                        :data-description="company.name"
                    >
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ratingSimple from '@/components/rating-simple.vue'

    export default {
        name: 'about-tab',
        components: {
            ratingSimple
        },
        props: {
            company: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {
                    showMap: false,
                },
                map: {
                    enabled: false,
                    zoom: 18,
                    autocomplete: '',
                    options: {
                        scrollwheel: false,
                        styles: [
                            {
                                featureType: 'poi.business',
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

        },

        mounted() {
            this.initGallery()
        },

        methods: {
            initGallery (){
                let that = this

                $("#gallery").unitegallery({
                    tiles_type:"justified"
                });
            },
        }
    }
</script>

<style scoped>
</style>
