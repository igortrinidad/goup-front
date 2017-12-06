<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div
            class="picture-circle border-picture-eletric-blue"
            :class="{ 'picture-circle-l': currentEvent === 0, 'picture-circle-m': currentEvent > 0 }"
            :style="{ backgroundImage: `url(${ user.avatar })` }"
        >
        </div>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">

                    <!-- No Events -->
                    <div class="m-t-30" v-if="!events.length">
                        <h3 class="text-center">{{ translations.no_events }}</h3>
                    </div>
                    <!-- / No Events -->

                    <!-- Swiper Events Vertical -->
                    <div class="m-t-30" v-if="events.length">
                        <div class="swiper-container swiper-vertical" ref="swiperVertical">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="event in events" style="height: 338px;">
                                    <div class="card m-b-0">
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
                    <!-- / Swiper Events Vertical -->

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
                events: [],
                currentEvent: 0
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

                that.initSwiperVertical()
            },

            initSwiperVertical() {
                let that = this

                setTimeout(function () {
                    that.swiperVertical = new Swiper(that.$refs.swiperVertical, {
                        direction: 'vertical',
                        spaceBetween: 10,
                        centeredSlides: true,
                        onSlideChangeEnd: swiper => {
                            that.currentEvent = swiper.realIndex
                        },
                    });
                }, 200);

            }

        }
    }
</script>

<style scoped>
    .swiper-container.swiper-vertical {
        overflow: visible !important;
    }
    .swiper-container.swiper-vertical .swiper-wrapper {
        align-items: center;
    }

    .picture-circle {
        position: fixed;
        top: 10px;
        z-index: 10;
    }

    .picture-circle-l { left: calc(50% - 50px) }
    .picture-circle-m { left: calc(50% - 43px) }
</style>
