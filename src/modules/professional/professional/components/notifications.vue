<template>
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Notificações'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">

            <!-- No Notifications -->
            <div class="row" v-if="!notifications.length && !placeholder">
                <div class="col-sm-12" >
                    <div class="card">
                        <div class="card-body card-padding">
                            <p class="f-300 text-center m-0">Você não possui notificações</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- / No Notifications -->

            <card-placeholder v-if="placeholder" :onlyHeader="true" :circleImage="true" :cols="'col-sm-12'"></card-placeholder>

            <div class="pull-right m-b-10">
                <button
                    type="button"
                    class="btn btn-info btn-xs p-5 p-l-10 p-r-10"
                    @click.prevent="markAllNotificationAsReaded"
                    v-if="notifications.length && !placeholder"
                    :disabled="!has_unreaded_messages">
                    <i class="ion-checkmark-round m-r-5"></i>
                    Marcar tudo como lido
                </button>
            </div>

            <div class="row" v-if="notifications.length && !placeholder">
                <div class="col-sm-12" v-for="(notification, notificationIndex) in notifications">
                    <div class="card m-b-10 m-t-0">
                        <div :class="{
                                'card-header ch-alt p-15 text-center' : true,
                                'readed': notification.is_readed,
                            }"
                        >
                            <em class="f-300 f-12" v-if="notification.created_at">{{ notification.created_at | moment('DD/MM/YYYY HH:mm:ss')  }}</em>
                            <div class="picture-circle picture-circle-xs m-t-10" v-if="notification.from" :style="`background-image:url('${ notification.from.avatar }')`"></div>
                            <h4 class="f-300 m-t-10 m-b-10" v-if="notification.title">{{ notification.title }}</h4>
                            <p class="f-300 m-t-10 m-b-10" v-html="notification.content"></p>

                            <div  class="m-t-10 m-b-10" v-if="notification.button_label && notification.button_action">
                                <router-link
                                    tag="button"
                                    :to="notification.button_action"
                                    class="btn btn-primary btn-sm"
                                >
                                    {{notification.button_label}}
                                </router-link>
                            </div>

                            <button
                                type="button"
                                class="btn btn-info btn-xs p-5 p-l-10 p-r-10"
                                @click.prevent="markNotificationAsReaded(notification, notificationIndex)"
                                v-if="!notification.is_readed"
                            >
                                <i class="ion-checkmark-round m-r-5"></i>
                                Marcar como lido
                            </button>
                            <p class="text-sm-center text-info" v-if="notification.is_readed"><i class="ion-checkmark-round"></i> Lido em  <span v-if="notification.readed_at">{{ notification.readed_at | moment('DD/MM/YYYY HH:mm:ss')  }}</span></p>

                        </div>
                    </div>
                </div>
            </div>
            <!-- / Notifications -->

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="notifications.length && !placeholder">
                    <div class="text-center clearfix">
                        <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->

        </div>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import {mapActions} from 'vuex'
    import moment from 'moment'

    import cleanNotificationModel from '@/models/Notification'

    export default {
        name: 'client-notifications',
        components: {
            mainHeader,
            cardPlaceholder,
            pagination: require('@/components/pagination.vue'),
        },
        data() {
            return {
                notifications: [],
                pagination: {},
                placeholder: true,
                has_unreaded_messages: false
            }
        },
        mounted() {
            this.getNotifications()
        },
        methods: {

            ...mapActions(['setLoading', 'decrementProfessionalUnreadNotifications']),

            getNotifications() {
                let that = this

                that.$http.get('professional/notification/list')
                    .then(function (response) {

                        that.notifications = response.data.notifications
                        that.pagination = response.data.pagination

                        that.has_unreaded_messages = that.notifications.filter((notification) => !notification.is_readed).length ? true : false

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            navigate(page) {
                let that = this
                that.placeholder = true

                that.$http.get(`professional/notification/list?page=${page}`)
                    .then(function (response) {

                        that.notifications = response.data.notifications
                        that.pagination = response.data.pagination

                        that.has_unreaded_messages = that.notifications.filter((notification) => !notification.is_readed).length ? true : false

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            markNotificationAsReaded(notification, index) {
                let that = this

                that.$http.get(`professional/notification/mark_readed/${notification.id}`)
                    .then(function (response) {

                        that.notifications.splice(index, 1)
                        that.notifications.splice(index, 0, response.data.notification)

                        that.decrementProfessionalUnreadNotifications(1);


                    })
                    .catch(function (error) {
                        console.log(error)

                    });
            },

            markAllNotificationAsReaded() {
                let that = this

                that.$swal({
                    title: '',
                    text: 'Deseja marcar todas as mensagens como lidas?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {
                    that.setLoading({is_loading: true, message: ''})

                    that.$http.get('professional/notification/mark_all_readed')
                        .then(function (response) {

                            that.notifications.map((notification) => {
                                if(!notification.is_readed){
                                    notification.is_readed = true
                                    notification.readed_at = moment().format('YYYY-MM-DD HH:mm:ss')
                                }
                            })

                            that.has_unreaded_messages = that.notifications.filter((notification) => !notification.is_readed).length ? true : false

                            that.decrementProfessionalUnreadNotifications(response.data.readed_notifications);

                            successNotify('', 'Todas as mensagens foram marcadas como lidas.')
                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {
                            console.log(error)
                            that.setLoading({is_loading: false, message: ''})
                        });

                }).catch(function () {

                })
            }
        }
    }
</script>

<style scoped>
    .card-header:before {
        content: '\f3e1';
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:10px; right: 10px;
        width: 30px; height: 30px;
        border-radius: 50%;
        background: rgba(255, 204, 95, 1);
        color: #383938;
        font-size: 22px;
        transition: .3s;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;

    }
    .ch-alt.readed {
        background-color: #fff !important;
        transition: ease 2s;
    }
    .card-header.readed:before {
        animation: ring 4s .1s ease-in-out forwards;
        transform-origin: 50% 4px;
    }

    @keyframes ring {
        0% { transform: rotate(0); }
        1% { transform: rotate(30deg); }
        3% { transform: rotate(-28deg); }
        5% { transform: rotate(34deg); }
        7% { transform: rotate(-32deg); }
        9% { transform: rotate(30deg); }
        11% { transform: rotate(-28deg); }
        13% { transform: rotate(26deg); }
        15% { transform: rotate(-24deg); }
        17% { transform: rotate(22deg); }
        19% { transform: rotate(-20deg); }
        21% { transform: rotate(18deg); }
        23% { transform: rotate(-16deg); }
        25% { transform: rotate(14deg); }
        27% { transform: rotate(-12deg); }
        29% { transform: rotate(10deg); }
        31% { transform: rotate(-8deg); }
        33% { transform: rotate(6deg); }
        35% { transform: rotate(-4deg); }
        37% { transform: rotate(2deg); }
        39% { transform: rotate(-1deg); }
        41% { transform: rotate(1deg); }

        43% { transform: rotate(0); }
        100% { transform: rotate(0); opacity: 0; }
    }

</style>
