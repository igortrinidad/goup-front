<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div
            class="picture-circle border-picture-eletric-blue"
            :class="{ 'picture-circle-l': verticalIndex === 0, 'picture-circle-m': verticalIndex > 0 }"
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
                                <div class="swiper-slide" v-for="(event, eventIndex) in events">
                                    <div class="card p-0" :class="{ 'top' : eventIndex < verticalIndex }">
                                        <!-- Card Header -->
                                        <div
                                            class="card-header cover p-5"
                                            :style="{
                                                backgroundImage: `url(${ event.cover })`,
                                                height: '150px',
                                                borderRadius: '6px 6px 0 0'
                                            }"
                                        >
                                            <span class="event-ranking">
                                                {{ event.rank_position }}º
                                            </span>
                                        </div>
                                        <!-- Card Body -->
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-5">{{ event.name }}</h4>
                                            <div style="opacity: .8;">
                                                <p class="m-b-5">{{ event.description }}</p>
                                                <span class="d-block m-0 f-12">
                                                    <strong>{{ event.city.name }} - {{ event.city.state }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                        <!-- Card Footer -->
                                        <div class="card-footer p-10">
                                            <div class="row">
                                                <div class="col-xs-8" style="opacity: .8;">
                                                    <small>
                                                        <i class="ion-location m-r-5"></i>{{ handleDistance(event.distance) }}
                                                    </small>
                                                    <small class="divider p-l-10 m-l-10">
                                                        <span v-show="event.value > 0">{{ event.value | formatCurrency }}</span>
                                                        <span v-show="event.value === 0">{{ translations.free }}</span>
                                                    </small>
                                                </div>
                                                <div class="col-xs-4 text-right">
                                                    <small class="f-primary">
                                                        <i class="ion-ios-star m-r-5"></i>{{ event.favorited_count }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
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
    import { cleanEventModel } from '@/models/Event'

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
                verticalIndex: 0
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
                let event = cleanEventModel()

                event.name = 'Party',
                event.slug = 'party',
                event.cover = 'https://s3.amazonaws.com/goup-assets/img/categories/party.png'
                event.city.name = 'Belo Horizonte'
                event.city.state = 'MG'
                event.value = 0
                event.distance = 59
                event.favorited_count = 1

                that.events = [ event, event, event, event, event ]

                that.initSwiperVertical()
            },

            initSwiperVertical() {
                let that = this

                setTimeout(function () {
                    that.swiperVertical = new Swiper(that.$refs.swiperVertical, {
                        direction: 'vertical',
                        slidesPerView: 1,
                        spaceBetween: 10,
                        onSlideChangeEnd: swiper => {
                            that.verticalIndex = swiper.realIndex
                        },
                    });
                }, 200);

            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

        }
    }
</script>

<style scoped>
    .swiper-container.swiper-vertical {
        overflow: visible !important;
        height: 255px;
    }
    .swiper-container.swiper-vertical .swiper-wrapper {
        align-items: center
    }

    .divider {
        border-left: 1px solid #dfdfdf;
    }

    .card { transition: ease .5s; }
    .card:before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        box-shadow: inset 0 0  0 rgba(0, 0, 0, .7);
        z-index: 10;
        border-radius: 6px;
        transition: ease .5s;
    }
    .card.top {
        transform: scale(.96);
        transition: ease .5s;
    }
    .card.top:before {
        box-shadow: inset 0 0  150px rgba(0, 0, 0, .7);
        transition: ease .5s;
    }

    .picture-circle {
        position: fixed;
        top: 10px;
        z-index: 10;
        transition: ease .1s;
    }

    .picture-circle-l { left: calc(50% - 50px) }
    .picture-circle-m { left: calc(50% - 43px) }
</style>
