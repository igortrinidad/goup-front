<template>

    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Eventos'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- Search & Location -->
        <div class="container m-t-20 text-center">

            <div class="row">
                <div class="col-sm-12" v-if="isLogged">
                    <router-link :to="{name: 'landing.events.create'}" tag="button" class="btn f-20 btn-light btn-block f-300">
                        <span><i class="ion-ios-plus-outline m-r-5"></i>Criar evento</span>
                    </router-link>
                </div>
                <div class="col-sm-12" v-if="!isLogged">
                    <div class="alert alert-info f-400 m-t-20">
                        <span class="close" data-dismiss="alert" aria-label="close"><i class="ion-ios-close-outline"></i></span>
                        <span>Que tal criar um evento? Faça login e começe agora!</span>
                    </div>
                </div>
            </div>

            <div class="row m-t-20">
                <div class="col-sm-6 col-xs-12">
                    <div class="form-group search">
                        <label class="search-label d-block m-b-10 text-center">Nome do evento</label>
                        <input type="text" class="form-control" v-model="interactions.search" placeholder="Procure pelo nome" value="" @keyup.enter="getEvents()">
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12">
                    <label class="search-label d-block m-b-10 text-center">Localização</label>
                    <GmapAutocomplete
                        class="form-control"
                        :select-first-on-enter="true"
                        @place_changed="setNewAdress"
                        placeholder="Procure pela cidade"
                        :options="{language: 'pt-BR',types: ['(cities)'], componentRestrictions: { country: 'br' }}"
                    >
                    </GmapAutocomplete>
                </div>
            </div>

            <button
                type="button"
                class="btn btn-success btn-block p-5 p-l-10 p-r-10 m-t-20"
                data-target="#modal-modalities"
                data-toggle="modal"
            >
                Alterar modalidades
            </button>

            <button class="btn btn-info btn-block p-5 p-l-10 p-r-10 m-t-20" @click="getEvents()">Pesquisar</button>

        </div>
        <!-- / Search & Location -->

        <!-- List Events -->
        <div class="container m-t-30">
            <p v-if="events.length" class="text-center"> Exibindo <strong>{{events.length}}</strong> {{events.length > 1 ? 'eventos' : 'evento'}} de <strong>{{pagination.total}}</strong>  {{pagination.total > 1 ? 'eventos' : 'evento'}} localizados.</p>

            <card-placeholder v-if="placeholder" :headerFullImage="true">
            </card-placeholder>

            <div class="row" v-if="!placeholder">
                <p class="text-center" v-if="!events.length">Nenhum evento localizado.</p>
                <div class="col-sm-4 col-xs-12" v-for="event in events">
                    <!-- Card Event -->
                    <router-link tag="div" :to="{ name: 'landing.events.show', params: { event_id: event.id } }" class="card m-b-10 cursor-pointer">

                        <!--  Card Event Header-->
                        <div class="card-header ch-alt text-center card-picture-header" :style="`background-image:url('${ event.avatar }')`">
                            <div class="hover">
                                <i class="ion-ios-plus-empty"></i>
                            </div>
                        </div>
                        <!-- / Card Event Header -->

                        <!-- Card Event Body -->
                        <div class="card-body card-padding">
                            <div class="row row-event">
                                <!-- Event Date -->
                                <div class="col-xs-3 event-col">
                                    <div class="event-date text-center">
                                        <div class="event-date-header">
                                            <span class="f-700 f-12" v-if="event.date">{{ event.date | moment('YYYY') }}</span>
                                        </div>
                                        <div class="event-date-body">
                                            <span class="f-700 f-16">{{ event.date | moment('DD') }}</span>
                                            <span class="f-300">{{ event.date | moment('MMM') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- / Event Date -->
                                <div class="col-xs-9 event-col">
                                    <div class="list-cats">
                                        <span
                                            class="label label-info f-300 f-14 m-t-5 m-r-5" v-if="event.modality">
                                            {{ event.modality.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h3 class="f-300">{{ event.name }}</h3>
                            <!-- location -->
                            <div class="m-t-10">
                                <span class="d-block f-300 f-14">
                                    <i class="icon ion-ios-location-outline m-r-10 f-20"></i>{{ event.city }} - {{ event.state }}
                                </span>
                            </div>
                            <!-- / location -->
                        </div>
                        <!-- / Card Event Body -->
                    </router-link>
                    <!-- / Card Event -->
                </div>
            </div>
        </div>
        <!-- / List Events -->

        <!--Paginação-->
        <div class="row" v-show="events.length">
            <div class="col-sm-12">
                <div class="text-center">
                    <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                </div>
            </div>
        </div>
        <!--Paginação-->

        <!-- Modal Modalidades -->
        <div class="modal" id="modal-modalities" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Escolha as modalidades de eventos</h4>
                    </div>
                    <div class="modal-body">

                        <div class="filters">
                            <div class="tag-list m-t-20">
                                <div class="border-inside-card text-center">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label class="search-label d-block m-b-10 text-center">Modalidades</label>
                                            <span class="label f-14 label-primary m-t-5 m-r-5 p-5 cursor-pointer" v-for="(modality, modalityIndex) in modalities"
                                                  @click="selectModality(modality)"
                                                  :class="{'label-primary':selectedModalities.indexOf(modality) < 0,  'label-info': selectedModalities.indexOf(modality) > -1}">
                                                {{modality.name}} <i class="ion-close" v-if="selectedModalities.indexOf(modality) > -1"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-inside-card text-center m-t-20" v-if="selectedModalities.length">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label class="search-label d-block m-b-10 text-center">Submodalidades</label>
                                            <span
                                                class="label f-14 label-primary m-t-5 m-r-5 p-5 cursor-pointer"
                                                v-for="(submodality, modalityIndex) in subModalities"
                                                @click="selectSubModality(submodality)"
                                                v-if="checkModalitiesAndSubmodality(submodality.modality_id) > -1"
                                                :class="{'label-primary':selectedSubModalities.indexOf(submodality) < 0,  'label-success': selectedSubModalities.indexOf(submodality) > -1}"
                                            >
                                                {{submodality.name}} <i class="ion-close" v-if="selectedSubModalities.indexOf(submodality) > -1"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer borderless">
                        <button
                            class="btn btn-info"
                            data-dismiss="modal"
                            v-show="!hasModalitiesOrSubModalitiesSelected"
                        >
                            Fechar
                        </button>
                        <button
                            class="btn btn-info btn-modal-footer-big-text"
                            data-dismiss="modal"
                            v-show="hasModalitiesOrSubModalitiesSelected"
                            @click="getEvents()"
                        >
                            Fechar e aplicar modalidades na busca
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Modalidades -->

    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    import EventModel from '@/models/Event'

    export default {
        name: 'events-landing-list',
        components: {
            mainHeader,
            cardPlaceholder,
            pagination: require('@/components/pagination.vue'),
        },
        data() {
            return {
                interactions: {
                    search: '',
                    city: '',
                },
                placeholder: true,
                events: [],
                pagination: {},
                userCity: '',
                geolocation: {
                    watchId: '',
                    latitude: -23.555877,
                    longitude: -46.691593,
                },
                modalities: [],
                selectedModalities: [],
                modalitiesFiltered: [],

                subModalities:[],
                hasModalitiesOrSubModalitiesSelected: false,
                selectedSubModalities: [],
                subModalitiesFiltered: [],
                current_page: 0
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getModalities()
            this.getLocationByCoordinates();
            this.handleFilterHistory()
        },
        methods: {

            checkModalitiesAndSubmodality(modalityId) {
                return _.findIndex(this.selectedModalities,(modality) => modality.id === modalityId)
            },

            getModalities: function(){
                let that = this

                this.$http.get('modality/list').then(response => {

                    that.modalities = response.data
                    that.modalities.map((modality) => {
                        modality.submodalities.map((submodality) => {
                            that.subModalities.push(submodality)
                        })
                    })

                    if(that.modalitiesFiltered.length)
                    {
                        that.modalitiesFiltered.map((modality) => {
                            let selected_modality = _.find(that.modalities, {slug: modality})

                            if(selected_modality){
                                that.selectedModalities.push(selected_modality)
                            }
                        })
                    }

                    if(that.subModalitiesFiltered.length)
                    {
                        that.subModalitiesFiltered.map((submodality) => {
                            let selected_submodality = _.find(that.subModalities, {slug: submodality})

                            if(selected_submodality){
                                that.selectedSubModalities.push(selected_submodality)
                            }
                        })
                    }

                }, response => {
                    // error callback
                });
            },


            getEvents() {
                var that = this;

                that.placeholder = true
                that.$http.post('event/list', {
                    modalities: that.modalitiesFiltered,
                    submodalities: that.subModalitiesFiltered,
                    search: that.interactions.search,
                    latitude: that.geolocation.latitude,
                    longitude: that.geolocation.longitude,
                    city: that.interactions.city
                    })
                    .then(function (response) {
                        that.events = response.data.events
                        that.pagination = response.data.pagination

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);

                        //Save on localhostorage
                        let filters = {
                            modalities: that.modalitiesFiltered,
                            submodalities: that.subModalitiesFiltered,
                            search: that.interactions.search,
                            latitude: that.geolocation.latitude,
                            longitude: that.geolocation.longitude,
                            city: that.interactions.city,
                            current_page: 0,
                        }

                        localStorage.setItem('event-filters', JSON.stringify(filters))
                    })
                    .catch(function (error) {

                    });
            },

            navigate(page) {
                let that = this

                that.$http.post('event/list',
                    {
                        modalities: that.modalitiesFiltered,
                        submodalities: that.subModalitiesFiltered,
                        search: that.interactions.search,
                        latitude: that.geolocation.latitude,
                        longitude: that.geolocation.longitude,
                        city: that.interactions.city,
                        page: page
                    }
                )
                    .then(function (response) {
                        that.events = response.data.events
                        that.pagination = response.data.pagination

                        //Save on localhostorage
                        let filters = {
                            modalities: that.modalitiesFiltered,
                            submodalities: that.subModalitiesFiltered,
                            search: that.interactions.search,
                            latitude: that.geolocation.latitude,
                            longitude: that.geolocation.longitude,
                            city: that.interactions.city,
                            current_page: page,
                        }

                        localStorage.setItem('event-filters', JSON.stringify(filters))
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getLocationByCoordinates() {
                let that = this
                var geocoder = new google.maps.Geocoder;

                var latlng = new google.maps.LatLng(that.geolocation.latitude, that.geolocation.longitude);

                geocoder.geocode({
                        'latLng': latlng
                }, function (results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results) {
                            let city = ''
                            let state = ''

                            results[1].address_components.map((current) =>{
                                current.types.map((type) => {
                                    //state
                                    if(type == 'administrative_area_level_1'){
                                        state = current.short_name
                                    }

                                    //City
                                    if(type == 'administrative_area_level_2'){
                                        city = current.short_name
                                    }
                                })
                            })

                            that.userCity = `${city} - ${state}`

                        } else {
                            alert('Cidade não localizada');
                        }
                    } else {

                    }
                });

            },

            setNewAdress(place) {

                let that = this
                if (place.geometry !== undefined) {

                    that.geolocation.latitude = place.geometry.location.lat()
                    that.geolocation.longitude = place.geometry.location.lng()

                    that.getEvents();
                    that.getLocationByCoordinates();
                    that.interactions.city = place.formatted_address
                }
            },


            selectModality(selected){
                let that = this

                let modality_index = that.selectedModalities.indexOf(selected)
                if(modality_index < 0){
                    that.selectedModalities.push(selected)
                    that.hasModalitiesOrSubModalitiesSelected = true
                }else{
                    that.selectedModalities.splice(modality_index, 1)
                    if (!that.selectedSubModalities.length && !that.selectedModalities.length) {
                        that.hasModalitiesOrSubModalitiesSelected = false
                    }
                }

                that.handleSelectedModalities()
            },

            handleSelectedModalities(){
                let that = this

                let selectedModalities = _.reduce(that.selectedModalities, function(result, modality, key) {
                    result.push(modality.slug);
                    return result;
                }, []);

                that.modalitiesFiltered = selectedModalities
            },

            selectSubModality(selected){
                let that = this

                let submodality_index = that.selectedSubModalities.indexOf(selected)

                if(submodality_index < 0){
                    that.selectedSubModalities.push(selected)
                    that.hasModalitiesOrSubModalitiesSelected = true
                }else{
                    that.selectedSubModalities.splice(submodality_index, 1)
                    if (!that.selectedSubModalities.length && !that.selectedModalities.length) {
                        that.hasModalitiesOrSubModalitiesSelected = false
                    }
                }

                that.handleSelectedSubModalities()
            },

            handleSelectedSubModalities(){
                let that = this

                let selectedSubModalities = _.reduce(that.selectedSubModalities, function(result, modality, key) {
                    result.push(modality.slug);
                    return result;
                }, []);

                that.subModalitiesFiltered = selectedSubModalities

            },

            handleFilterHistory(){

                let that = this

                let filters = JSON.parse(localStorage.getItem('event-filters'))

                if (filters) {
                    that.modalitiesFiltered = filters.modalities
                    that.subModalitiesFiltered = filters.submodalities
                    that.latitude = filters.latitude
                    that.longitude = filters.longitude
                    that.interactions.search = filters.search
                    that.interactions.city = filters.city
                    that.current_page = filters.current_page

                }

                if(that.current_page){
                    that.navigate(that.current_page)
                }

                if(!that.current_page){
                    that.getEvents()
                }

            }

        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .card-picture-header {
        box-sizing: border-box;
        margin: 0 auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
        border: solid 1px #EBECEC;
    }

    .card-header { position: relative ; }

    /* Event Cats */
    .list-cats {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
    }

    .btn.btn-info.btn-modal-footer-big-text {
        width: auto !important
    }
</style>
