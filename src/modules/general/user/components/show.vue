<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div
            class="picture-circle picture-circle-l border-picture-eletric-blue"
            :style="{ backgroundImage: `url(${ user.avatar })` }"
        >
        </div>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">


                    <div class="row m-t-30">

                        <div class="col-sm-12" v-if="!events.length">
                            <h3 class="text-center">{{ translations.no_events }}</h3>
                        </div>

                        <div class="col-sm-12" v-for="event in events">
                            <div class="card">
                                <!-- Card Header -->
                                <div class="card-header cover" :style="{ backgroundImage: `url(${ event.avatar })`}">
                                    <div class="ch-content">
                                        <h3 class="title f-700 t-overflow">{{ event.name }}</h3>
                                        <p class="title f-700 t-overflow" style="margin-bottom: 0px;"><i class="ion-ios-location m-r-5"></i>
                                            {{ event.city.name }} - {{event.city.state}}
                                        </p>
                                    </div>
                                    <span class="icon-information ion-ios-information">
                                    </span>
                                </div>
                                <!-- / Card Header -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { cleanPlaceModel } from '@/models/Place'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'
    import UserModel from '@/models/User'

    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {},
                events: []
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'language']),

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
            $('.navbar.navbar-default').addClass('transparent')
            this.getUser()
        },

        beforeDestroy() {
            $('.navbar.navbar-default').removeClass('transparent')
        },

        methods: {

            getUser() {
                let that = this

                console.log(that.$route.params);
                that.user = UserModel
                that.getUserEvents()
            },

            getUserEvents() {
                let that = this
                let event = cleanPlaceModel()

                event.name = 'Party',
                event.slug = 'party',
                event.avatar = 'https://s3.amazonaws.com/goup-assets/img/categories/party.png'

                that.events = [ event, event ]
            }

        }
    }
</script>

<style scoped>
    .picture-circle {
        position: fixed;
        top: 10px;
        left: calc(50% - 50px);
        z-index: 10;
    }
</style>
