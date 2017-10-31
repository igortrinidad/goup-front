<template lang="html">
    <div>
        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img class="img-icon" src="../../../../../assets/icons/infos.png" alt="">
                    <h3 class="f-300 text-center">Sobre o evento</h3>
                </div>
            </div>
        </div>

        <div class="container m-t-30">
            <div class="row">
                <!-- Event Base Informations -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header p-5 ch-alt">
                            <div class="row row-event m-t-0">
                                <!-- Event Date -->
                                <div class="col-xs-3 event-col">
                                    <div class="event-date text-center">
                                        <div class="event-date-header">
                                            <span class="f-700 f-12" v-if="event.date">{{ event.date | moment('YYYY') }}</span>
                                        </div>
                                        <div class="event-date-body">
                                            <span class="f-700 f-16" v-if="event.date">{{ event.date | moment('DD') }}</span>
                                            <span class="f-300" v-if="event.date">{{ event.date | moment('MMM') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- / Event Date -->
                                <div class="col-xs-9 event-col">
                                    <div class="event-name">
                                        <h3 class="f-300 m-0 t-overflow">{{ event.name }}</h3>
                                        <span>
                                            <i class="ion-ios-clock-outline f-20"></i>
                                            <span class="f-300">{{event.time}}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body card-padding text-center">

                            <!-- Toggle presence -->
                            <div class="text-center" v-if="isLogged">
                                <button name="button" class="btn btn-primary f-300">
                                    <i class="ion-checkmark-round" v-if="presence"></i>
                                    <span v-if="!presence" @click="confirmPresence()">Tenho interesse</span>
                                    <span v-if="presence" @click="cancelPresence()">Eu vou!</span>
                                </button>
                            </div>
                            <!-- / Toggle presence -->
                            <div class="alert alert-info text-center" v-if="!isLogged">
                                <span>Você precisa estar logado para comentar ou marcar presença no evento.</span>
                            </div>

                            <div class="m-t-15 f-300" v-html="event.description">
                            </div>

                            <div class="list-cats">
                                <label class="m-t-20">Modalide</label>
                                <span class="label label-info f-300 f-14 m-t-5 m-r-5">
                                    {{ event.modality.name }}
                                </span>
                                <br>
                                 <label class="m-t-20">Submodalides</label>
                                 <span class="label label-primary f-300 f-14 m-t-5 m-r-5" v-for="submodality in event.submodalities">
                                    {{ submodality.name }}
                                </span>
                            </div>

                            <hr>

                            <!-- Share Event -->
                            <h4 class="f-300">Compartilhar</h4>
                            <button type="button" class="btn btn-xs m-r-5 m-b-5 f-300 btn-facebook" @click="openShareFacebook()">
                                <i class="ion-social-facebook m-r-5 f-16"></i>
                                Facebook
                            </button>
                            <button type="button" class="btn btn-xs m-r-5 m-b-5 f-300 btn-whatsapp" @click="openShareWhatsapp()">
                                <i class="ion-social-whatsapp m-r-5 f-16"></i>
                                Whatsapp
                            </button>
                            <button type="button" class="btn btn-xs m-r-5 m-b-5 f-300 btn-success" @click="handleCopyLink()">
                                <i class="ion-ios-copy m-r-5 f-16"></i>
                                Copiar Link
                            </button>
                            <!-- / Share Event -->

                            <hr v-if="event.created_by_id == currentUser.id">



                            <router-link
                                tag="button"
                                :to="{name: 'landing.events.create', query:{edit: true, event_id: event.id}}"
                                class="btn btn-info btn-sm"
                                v-if="event.created_by_id == currentUser.id"
                            >
                                Editar evento
                            </router-link>

                        </div>
                    </div>
                </div>
                <!-- / Event Base Informations -->

                <!-- Event From Infos -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-p" :style="`background-image:url('${ event.from.avatar }')`">
                            </div>

                            <p class="f-300 f-12 m-t-10 m-b-5">Adicionado por:</p>
                            <h4 class="f-300 m-0">{{ event.from.full_name }}</h4>
                        </div>
                    </div>
                </div>
                <!-- / Event From Infos -->

                <!-- Event Details -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Informações</h4>
                        </div>
                        <div class="card-body p-t-5">
                            <ul class="list-group m-b-0">
                                <li class="list-group-item f-300">
                                    <i class="ion-social-usd-outline"></i>
                                    Valor <span class="badge badge-success">{{ event.value | formatCurrency }}</span>
                                </li>
                                <li class="list-group-item f-300">
                                    <i class="ion-ios-people-outline"></i>
                                    Data <span class="badge badge-success" v-if="event.date">{{ event.date | moment('DD/MM/YYYY') }}</span>
                                </li>
                                <li class="list-group-item f-300">
                                    <i class="ion-ios-people-outline"></i>
                                    Início <span class="badge badge-success">{{event.time}}</span>
                                </li>
                                <li class="list-group-item f-300">
                                    <i class="ion-ios-people-outline"></i>
                                    Participantes confirmados <span class="badge badge-success">{{ event.total_participants }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- / Event Details -->

                <!-- Event Map -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Mapa</h4>
                        </div>
                        <div class="card-body p-t-5">
                            <GmapMap
                                :center="{ lat: event.lat, lng: event.lng }"
                                :zoom="map.zoom"
                                :options="map.options"
                                style="width: 100%; height: 500px"
                            >
                            <GmapMarker :position="{ lat: event.lat, lng: event.lng }" title="company.name" :clickable="true" :icon="map.icon">
                            </GmapMarker>
                        </GmapMap>
                        </div>
                    </div>
                </div>
                <!-- / Event Map -->

                <!-- Event Photos -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Fotos</h4>
                        </div>
                        <div class="card-body p-t-5">
                            <div id="gallery" style="display:none;">
                                <img
                                    class="img-responsive"
                                    style="max-width: 100% !important"
                                    :alt="event.name"
                                    :src="photo.photo_url"
                                    v-for="(photo, photoIndex) in event.photos"
                                    :data-image="photo.photo_url"
                                    :data-description="event.name"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Event Photos -->

            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import EventModel from '@/models/Event'
    import moment from 'moment'
    import copyToClipboard from 'copy-text-to-clipboard'

    export default {
        name: 'event-tab-about',
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {
                },
                presence: false,
                map: {
                    mapevents: [],
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
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getParticipants()
        },
        methods: {

            // Confirm the presence to currentUser in event
            confirmPresence(user) {
                var that = this;

                this.$http.post(`event/participant/confirm`, {event_id: that.event.id, participant_id: that.currentUser.id}).then(response => {

                    that.presence = true;
                    successNotify('', 'Participação confirmada.');

                }, response => {
                    // error callback
                });
            },

            // Cancel the presence to currentUser in event
            cancelPresence(user) {
                var that = this;

                this.$http.post(`event/participant/cancel`, {event_id: that.event.id, participant_id: that.currentUser.id}).then(response => {

                    that.presence = false;
                    errorNotify('', 'Participação cancelada.');

                }, response => {
                    // error callback
                });
            },

            // Get participants to toggle interaction presence
            getParticipants() {
                let that = this
                this.$http.get(`event/participant/list/${that.$route.params.event_id}`).then(response => {
                    that.participants = response.data.data;
                    that.pagination = response.data.pagination;
                    that.navigate_url = `event/comment/list/${that.$route.params.event_id}`;

                    that.participants.map((participant) => {
                        if (participant.participant_id === that.currentUser.id) {
                            that.presence = true
                        }
                    })
                }, response => {
                    // error callback
                });

            },

            // Copy link to clipboard
            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/eventos/' + this.event.slug)
            },

            // Facebook share
            openShareFacebook() {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=151705885358217&href=https://isaudavel.com/eventos/${ that.event.slug }&display=popup&mobile_iframe=true`;
                    if(window.cordova){
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            var url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Evento compartilhado com sucesso!')
                            }
                        });
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }
            },

            // Whatsapp share
            openShareWhatsapp() {
                var that = this
                var url = `https://api.whatsapp.com/send?text=Encontrei o evento ${that.event.name} no iSaudavel, veja o abaixo: https://isaudavel.com/eventos/${ that.event.slug }`;
                window.open(url, '_system', null);
            },

        }
    }
</script>

/* Scoped Styles */
<style scoped>

    /* Event Cats */
    .event-name {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
        flex-flow: row wrap;
    }
</style>
