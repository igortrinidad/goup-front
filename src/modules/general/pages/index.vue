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
                    <h1 class="text-center m-b-30" v-show="!places.length">
                        {{ translations.end_list }}
                    </h1>

                    <!-- Cards -->
                    <div class="cards" v-if="places.length">

                        <!-- FIRST PLACE -->
                        <div id="card-animated" class="card m-0" ref="cardAnimated">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ places[0].avatar })` }">
                                <!-- Current Action -->
                                <span class="card-action up" v-show="interactions.up">
                                    {{ translations.up }}
                                </span>
                                <span class="card-action down" v-show="interactions.down">
                                    {{ translations.down }}
                                </span>
                                <span class="card-action skip" v-show="interactions.skip">
                                    {{ translations.skip }}
                                </span>
                                <!-- / Current Action -->

                                <div class="ch-content">
                                    <h3 class="title f-700 t-overflow">{{ places[0].name }}</h3>
                                    <p class="title f-700 t-overflow" style="margin-bottom: 0px;"><i class="ion-ios-location m-r-5"></i> {{ places[0].city }} - {{places[0].state}}</p>
                                    <p class="title f-700 t-overflow" style="margin-top: 0px; margin-bottom: -5px;"><i class="ion-android-calendar m-r-5"></i>
                                        {{ places[0].best_day }}
                                    </p>
                                </div>

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information"
                                    :to="{ name: 'general.places.show', params: { place_slug: places[0].slug } }"
                                >
                                </router-link>

                            </div>
                            <!-- / Card Header -->
                        </div>
                        <!-- / FIRST PLACE -->

                        <!-- SECOND PLACE -->
                        <div class="card m-0" v-if="places.length > 1">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ places[1].avatar })` }">
                                <div class="ch-content">
                                    <h3 class="title f-700 t-overflow">{{ places[1].name }}</h3>
                                    <p class="title f-700 t-overflow" style="margin-bottom: 0px;"><i class="ion-ios-location m-r-5"></i> {{ places[1].city }} - {{places[1].state}}</p>
                                    <p class="title f-700 t-overflow" style="margin-top: 0px; margin-bottom: -5px;"><i class="ion-android-calendar m-r-5"></i>
                                        {{ places[1].best_day }}
                                    </p>
                                </div>
                                <span class="icon-information ion-ios-information">
                                </span>
                            </div>
                            <!-- / Card Header -->
                        </div>
                        <!-- SECOND PLACE -->

                    </div>
                    <!-- Cards -->

                    <!-- Actions -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="actions">
                                <div v-if="!places.length">
                                    <span class="action" @click="getPlaces()">
                                        <span class="ion-refresh f-default"></span>
                                    </span>
                                </div>
                                <div v-if="places.length">
                                    <span class="action" @click="getPlaces()">
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
    import PlaceModel from '@/models/Place'

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
                    up: false,
                    down: false,
                    skip: false
                },
                starting: true,
                placeholder: true,
                places: [],
                active: false,
                top: 0,
                left: 0
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
            this.getPlaces()
        },


        methods: {

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.places.length) {
                    setTimeout(() => {
                        that.hammerCards = new Hammer(that.$refs.cardAnimated)
                        that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL })
                        that.hammerCards.on('panleft panright panup pandown tap press', function(ev) {
                            that.animateCurrentCard(ev)
                        })

                        $('#card-animated').bind('touchend', function(ev) {
                            that.touchend()
                        })

                    }, 200)
                }
            },

            touchend(top) {
                let that = this
                // Não passou da distancia minima para nenhum lado. Volta a posição inicial
                if (that.top > -75 && that.top < 75) {

                    // SKIP
                    if (that.left > 75) {
                        $('#card-animated').transition({ x: that.left, opacity: 0 }, 300, () => that.resetPosition())
                    } else {
                        $('#card-animated').transition({ x: 0, y: 0 }, 300)
                    }

                } else {
                    // UP
                    if (that.top < -75) {
                        // Chamar a funcao para dar like aqui
                        $('#card-animated').transition({ y: -200, opacity: 0 }, 300, () => that.resetPosition())
                    }

                    // DOWN
                    if (that.top > 75) {
                        // Chamar a funcao para dar ignore aqui
                        $('#card-animated').transition({ y: 200, opacity: 0 }, 300, () => that.resetPosition())
                    }
                }
            },

            resetPosition() {
                this.top = 0
                this.interactions.up = false
                this.interactions.down = false
                this.interactions.skip = false
                this.places.splice(0, 1)
                $(this.$refs.cardAnimated).transition({ x: 0, y: 0, opacity: 1 }, 0)
            },

            animateCurrentCard(e) {

                let that = this

                if (!e.isFinal) {
                    const top = e.deltaY
                    const left = e.deltaX

                    that.top = top
                    that.left = left

                    $('#card-animated').transition({ x: left, y: top }, 0)

                    if (top > -75 && top < 75) {
                        that.interactions.up = false
                        that.interactions.down = false

                        if (left > 75) {
                            that.interactions.skip = true
                        } else {
                            that.interactions.skip = false
                        }

                    } else {
                        if (e.deltaY < -75) {
                            that.interactions.up = true
                            that.interactions.down = false
                            that.interactions.skip = false
                            return
                        }
                        if(e.deltaY > 75) {
                            that.interactions.up = false
                            that.interactions.down = true
                            that.interactions.skip = false
                            return
                        }
                    }
                }
            },

            goUp() {
                this.interactions.up = true
                this.interactions.down = false
                this.interactions.skip = false
                $('#card-animated').transition({ x: 0, y: -100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            goDown() {
                this.interactions.up = false
                this.interactions.down = true
                this.interactions.skip = false
                $('#card-animated').transition({ x: 0, y: 100, opacity: 0 }, 1000, () => this.resetPosition())
            },

            skip() {
                this.interactions.up = false
                this.interactions.down = false
                this.interactions.skip = true
                $('#card-animated').transition({ x: 100, y: 0, opacity: 0 }, 1000, () => this.resetPosition())
            },

            getPlaces() {
                let that = this

                if (that.starting) {

                    that.starting = false

                    if (localStorage.getItem('places')) {
                        that.places = JSON.parse(localStorage.getItem('places'))
                    } else {
                        that.places = [ PlaceModel, PlaceModel, PlaceModel ]
                        localStorage.setItem('places', JSON.stringify(this.places))
                    }

                } else {
                    that.places.push(PlaceModel)
                    localStorage.removeItem('places')
                    localStorage.setItem('places', JSON.stringify(that.places))
                }

                that.places.forEach((place) => {
                    place.photos = _.orderBy(place.photos, ['is_cover'], ['desc'])
                })

                this.mountHammer()

                console.log(that.places);


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

    @media (max-width: 360px) {
        .cards{ height: 330px}
    }

    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .card .card-header.cover { position: relative; }

    .cards #card-animated{ z-index: 99999; }

    .fadeInLeft{
        transition: 0.1s;
    }

    .icon-information {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 30px;
        color: #fff;
        z-index: 7;
    }

    .card .card-header .ch-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: left;
        padding: 10px;
        color: #fff !important;
    }
</style>
