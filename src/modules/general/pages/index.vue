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
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">
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

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information"
                                    :to="{ name: 'general.places.show', params: { place_slug: company.slug } }"
                                >
                                </router-link>
                            </div>
                            <!-- / Card Header -->
                            <div class="card-body card-padding">
                                <h3 class="title f-700 t-overflow text-center m-b-5">{{ company.name }}</h3>
                                <p class="title f-700 t-overflow m-t-0 m-b-0"><i class="ion-ios-location m-r-5"></i> {{ company.city }} - {{company.state}}</p>
                                <p class="title f-700 t-overflow m-t-0"><i class="ion-android-calendar m-r-5"></i> Quarta-feira</p>
                            </div>
                        </div>
                    </div>
                    <!-- Cards -->

                    <!-- Actions -->
                    <div class="row">
                        <div class="col-sm-12 m-t-30 text-center">
                            <button type="button" class="btn btn-default">{{ translations.filter }}</button>
                        </div>
                        <div class="col-sm-12">
                            <div class="actions">
                                <span class="action xl waves"  @click="goDown()" v-if="companies.length">
                                    <span class="ion-chevron-down f-red "></span>
                                </span>
                                <span class="action waves" @click="getCompanies()">
                                    <span class="ion-refresh f-default"></span>
                                </span>
                                <span class="action xl waves" @click="goUp()" v-if="companies.length">
                                    <span class="ion-chevron-up f-green"></span>
                                </span>
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
                },
                placeholder: true,
                companies: [],
                active: false,
                top: 0,
            }
        },

        computed: {
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
                $('.card.animated').transition({ x: 0, y: -100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            goDown() {
                this.interactions.liked = false
                this.interactions.ignored = true
                $('.card.animated').transition({ x: 0, y: 100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            getCompanies() {
                this.companies = [CompanyModel, CompanyModel, CompanyModel]
                this.mountHammer()
            },
        }
    }
</script>

<style scoped>
    .cards {
        position: relative;
        height: 388px;
    }

    @media (max-width: 340px) {
        .cards{ height: 300px}
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
        bottom: 0px;
        right: 10px;
        font-size: 30px;
        color: #fff;
    }
</style>
