<template lang="html">
    <div>
        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img class="img-icon" src="../../../../../assets/icons/peoples.png" alt="">
                    <h3 class="f-300 text-center">Lista de participantes</h3>

                    <div class="alert alert-info m-t-10">
                        Marque presença no evento. Caso este evento necessite inscrição ou pagamento, a inscrição e pagamento deverão ser realizados diretamente com os organizadores ou nas plataformas indicadas.
                    </div>
                </div>
            </div>

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
                <span>Você precisa estar logado para comentar ou confirmar interesse no evento.</span>
            </div>

            <div class="text-center m-t-30" v-if="!participants.length">
                <span class="f-300">Nenhum participante.</span>
            </div>
            <!-- List participants -->
            <div class="row row-event m-t-30">
                <div class="col-sm-3 col-xs-4 event-col" v-for="participant in participants">
                    <router-link tag="div" class="card m-b-10" :to="{ name: 'landing.clients.show', params: { id: participant.participant_id } }">
                        <div class="card-header ch-alt p-5 text-center">
                            <div class="picture-circle picture-circle-xs" :style="`background-image:url('${ participant.participant.avatar }')`"></div>
                            <h5 class="m-b-0">{{participant.participant.full_name}}</h5>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- / List participants -->
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import EventModel from '@/models/Event'

    export default {
        name: 'event-tab-participants',
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {},
                presence: false,
                participants: []
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getParticipants();
        },
        methods: {

            // Confirm the presence to currentUser in event
            confirmPresence(user) {
                var that = this;

                this.$http.post(`event/participant/confirm`, {event_id: that.event.id, participant_id: that.currentUser.id}).then(response => {
                    that.presence = true;
                    that.getParticipants()
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
                    that.getParticipants()
                    errorNotify('', 'Participação cancelada.');

                }, response => {
                    // error callback
                });
            },

            // Get event participants
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
        }
    }
</script>

<style scoped>
    /* Scoped Styles */
</style>
