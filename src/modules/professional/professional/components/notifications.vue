<template lang="html">
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

            <card-placeholder v-if="placeholder" :onlyHeader="true" :circleImage="true"></card-placeholder>

            <div class="row" v-if="notifications.length && !placeholder">
                <div class="col-sm-12" v-for="(notification, notificationIndex) in notifications">
                    <div class="card m-b-10 m-t-0 cursor-pointer" @click="markNotificationAsRead(notification, notificationIndex)">
                        <div class="card-header ch-alt p-15 text-center" :class="{
                                'readed': notification.was_readed,
                                'not-readed': !notification.was_readed,
                            }"
                        >
                            <em class="f-300 f-12">{{ notification.created_at }}</em>
                            <div class="picture-circle picture-circle-xs m-t-10" :style="`background-image:url('${ notification.from.avatar }')`"></div>
                            <p class="f-300 m-t-10 m-b-10">{{ notification.from.full_name }}, {{ notification.content }}</p>

                        </div>
                    </div>
                </div>
            </div>
            <!-- / Notifications -->

        </div>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    import NotificationModel from '@/models/Notification'

    export default {
        name: 'client-notifications',
        components: {
            mainHeader,
            cardPlaceholder
        },
        data() {
            return {
                notifications: [],
                placeholder: true
            }
        },
        mounted() {
            this.getNotifications()
        },
        methods: {

            markNotificationAsRead(notification, index) {
                let that = this

                // a abordagem vai ser diferente quando for pegar as notificacoes da api
                that.notifications[index].was_readed = true
            },

            getNotifications() {
                let that = this

                that.notifications = NotificationModel
                // na response do get diminuir o tempo do timeout para 200
                setTimeout(() => {
                    that.placeholder = false
                }, 2000);
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

    .not-readed{
        background-color: RGBA(204, 204, 204, 1.00) !important;
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
