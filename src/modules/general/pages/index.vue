<template>

    <div class="first-container">

        <main-header
            :title="'home'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">
                <div class="container">
                    <h1 class="text-center m-b-30" v-show="!companies.length">
                        {{ translations.end_list }}
                    </h1>

                    <!-- Cards -->
                    <div class="cards" v-if="companies.length">
                        <div
                            v-for="(company, index) in companies"
                            ref="card"
                            :class="{ 'card card-rounded m-0': true, 'animated': index === 0 }"
                        >
                            <!-- Card Header -->
                            <div class="card-header cover">

                                <!-- Swiper Photos -->
                                <div class="swiper-container swiper-card-cover" ref="swiperCardCover">
                                    <div class="swiper-wrapper">
                                        <div
                                            class="swiper-slide"
                                            v-for="(photo, index) in company.photos"
                                            :key="index"
                                            :style="{ backgroundImage: `url(${ photo.photo_url })` }"
                                        >
                                        </div>
                                    </div>
                                    <div class="swiper-scrollbar"></div>
                                </div>

                                <div class="swiper-button-prev transparent"></div>
                                <div class="swiper-button-next transparent"></div>
                                <!-- Swiper Photos -->

                                <div class="card-header-container">

                                    <!-- Current Action -->
                                    <div v-if="index === 0">
                                        <span class="card-action liked" v-show="interactions.liked">
                                            <i class="ion-chevron-up m-r-5"></i>{{ translations.liked }}
                                        </span>
                                        <span class="card-action ignored" v-show="interactions.ignored">
                                            <i class="ion-chevron-down m-r-5"></i>{{ translations.ignored }}
                                        </span>
                                    </div>
                                    <!-- / Current Action -->

                                    <div class="ch-content">
                                        <h3 class="title f-700 t-overflow m- 0m-b-5">{{ company.name }}</h3>
                                        <p class="title f-700 t-overflow m-0"><i class="ion-ios-location m-r-5"></i> {{ company.city }} - {{company.state}}</p>
                                        <p class="title f-700 t-overflow m-0"><i class="ion-android-calendar m-r-5"></i>
                                            {{ checkLanguage === 'en' ? company.great_day_en : company.great_day_pt }}
                                        </p>
                                    </div>

                                </div>

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information"
                                    v-show="!interactions.liked && !interactions.ignored"
                                    :to="{ name: 'general.places.show', params: { place_slug: company.slug } }"
                                >
                                </router-link>

                            </div>
                            <!-- / Card Header -->
                        </div>
                    </div>
                    <!-- Cards -->

                    <!-- Actions -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="actions">
                                <div v-if="!companies.length">
                                    <span class="action" @click="getCompanies()">
                                        <span class="ion-refresh f-default"></span>
                                    </span>
                                </div>
                                <div v-if="companies.length">
                                    <span class="action" @click="getCompanies()">
                                        <span class="ion-funnel f-default"></span>
                                    </span>

                                    <span class="action xl"  @click="goDown()">
                                        <span class="ion-chevron-down f-red "></span>
                                    </span>

                                    <span class="action xl" @click="goUp()">
                                        <span class="ion-chevron-up f-green"></span>
                                    </span>

                                    <span class="action" @click="skip()">
                                        <span class="ion-ios-fastforward f-default"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / Actions -->

                </div>
            </div>
        </transition>

    </div>

</template>

<script>
    import Hammer from 'hammerjs'
    import { transition } from 'jquery.transit'
    import { mapGetters } from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import elements from '@/components/elements.vue'
    import CompanyModel from '@/models/Company'

    import * as translations from '@/translations/pages/index'

    export default {
        name: 'landing',

        components: {
            mainHeader,
            elements,
        },

        data () {
            return {
                interactions: {
                    liked: false,
                    ignored: false,
                    skiped: false
                },
                placeholder: true,
                companies: [],
                active: false,
                top: 0,
            }
        },

        computed: {

            ...mapGetters(['checkLanguage']),

            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getCompanies()
        },


        methods: {

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperCardCover = new Swiper(that.$refs.swiperCardCover, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar'
                    })
                }, 200);
            },

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.companies.length) {
                    setTimeout(() => {
                        that.hammerCards = new Hammer(that.$refs.card[0])
                        that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL })
                        that.hammerCards.on('panleft panright panup pandown tap press', function(ev) {
                            that.animateCurrentCard(ev)
                        })
                        $(that.$refs.card[0]).bind('touchend', function(ev) {
                            that.touchend()
                        })
                    }, 200)
                }
            },

            touchend(top) {
                let that = this

                // Não passou da distancia minima para nenhum lado. Volta a posição inicial
                if (that.top > -75 && that.top < 75) {
                    $('.card.animated').transition({ x: 0, y: 0 }, 300)
                } else {

                    // Like
                    if (that.top < -75) {
                        // Chamar a funcao para dar like aqui
                        $('.card.animated').transition({ y: -200, opacity: 0 }, 300, () => that.resetPosition())
                    }

                    // Ignore
                    if (that.top > 75) {
                        // Chamar a funcao para dar ignore aqui
                        $('.card.animated').transition({ y: 200, opacity: 0 }, 300, () => that.resetPosition())
                    }
                }
            },

            resetPosition() {
                this.top = 0
                this.interactions.liked = false
                this.interactions.ignored = false
                this.companies.splice(0, 1)
                $(this.$refs.card[0]).transition({ x: 0, y: 0, opacity: 1 }, 0)
                if (this.companies.length === 2) {
                    this.getCompanies()
                }
            },

            animateCurrentCard(e) {

                let that = this

                if (!e.isFinal) {
                    const top = e.deltaY
                    const left = e.deltaX

                    this.top = top
                    $('.card.animated').transition({ x: left, y: top }, 0)

                    if (top > -75 && top < 75) {
                        that.interactions.liked = false
                        that.interactions.ignored = false
                    } else {
                        if (e.deltaY < -75) {
                            that.interactions.liked = true
                            that.interactions.ignored = false
                        }
                        if(e.deltaY > 75) {
                            that.interactions.liked = false
                            that.interactions.ignored = true
                        }
                    }
                }
            },

            goUp() {
                this.interactions.liked = true
                this.interactions.ignored = false
                this.interactions.skiped = false
                $('.card.animated').transition({ x: 0, y: -100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            goDown() {
                this.interactions.liked = false
                this.interactions.ignored = true
                this.interactions.skiped = false
                $('.card.animated').transition({ x: 0, y: 100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            skip() {
                this.interactions.liked = false
                this.interactions.ignored = false
                this.interactions.skiped = true
                $('.card.animated').transition({ x: 100, y: 0, opacity: 0 }, 1000, () => this.resetPosition())
            },

            getCompanies() {
                this.companies = [CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel, CompanyModel]

                this.companies.forEach((company) => {
                    company.photos = _.orderBy(company.photos, ['is_cover'], ['desc'])
                })

                this.mountHammer()
                this.initSwiper()
            },
        }
    }
</script>

<style scoped>
    .cards {
        position: relative;
        height: 388px;
    }
    .cards .card .card-header .card-header-container {
        position: absolute;
        top: 0; left: 0;
        bottom: 0; right: 0;
        width: 100%; height: 100%;
        z-index: 10;
    }
    .swiper-card-cover {
        position: absolute;
        top: 0; left: 0;
        bottom: 0; right: 0;
        width: 100%; height: 100%;
        z-index: 1;
        border-radius: 20px;
    }
    .swiper-card-cover .swiper-slide {
        height: 100%;
        width: 100%;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 20px;
        position: relative;
        z-index: 1;
    }

    @media (max-width: 360px) {
        .swiper-card-cover .swiper-slide { height: 330px; }
    }

    .swiper-pagination { width: 100%; }

    @media (max-width: 360px) {
        .cards{ height: 330px}
    }

    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .card .card-header.cover { position: relative; }

    .cards .card:nth-child(1)   { z-index: 9999; }
    .cards .card:nth-child(2)   { z-index: 9; }

    .fadeInLeft{
        transition: 0.1s;
    }

    .icon-information {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 30px;
        color: #fff;
        z-index: 100;
    }
</style>
