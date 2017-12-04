<template>

    <div class="first-container">

        <main-header
            :title="'home'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <pulse
            v-if="interactions.is_loading && interactions.finished_loading_category"
            :icon="'ion-ios-refresh-empty'"
        />

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">

                <div class="container" v-show="!interactions.finished_loading_category" :class="{'cat-is-selected' : currentCategory}">

                    <p class="f-14 f-300 text-center m-t-10">{{translations.select_category}}</p>

                    <div class="row p-10">
                        <div class="col-xs-6 card-cat-col" v-for="category in getCategories">
                            <div class="card-cat text-center"
                                @click="selectCategory(category)"
                                :class="{
                                    'card-cat-selected' : currentCategory && currentCategory == category,
                                    'card-cat-non-selected' : currentCategory && currentCategory != category,
                                }">
                                <div class="p-10">
                                    <img :src="category.photo" width="70%">
                                    <p class="f-default">{{category['name_' + language]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="container" v-if="interactions.finished_loading_category">


                    <h4 class="text-center m-b-30 m-t-30" v-show="!events.length && !interactions.is_loading">
                        {{ translations.end_list }}
                    </h4>

                    <!-- Cards -->
                    <div class="cards m-t-20" v-if="events.length && !interactions.is_loading">

                        <!-- FIRST PLACE -->
                        <div id="card-animated" class="card m-0" ref="cardAnimated">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ events[0].cover })` }">
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
                                <span class="card-action save" v-show="interactions.favorite">
                                    {{ translations.favorite }}
                                </span>
                                <!-- / Current Action -->

                                <div class="ch-content">
                                    <h3 class="title f-700 t-overflow">{{ events[0].name }} ({{ events[0].category.name_pt }})</h3>
                                    <p class="title f-700 t-overflow" style="margin-bottom: 0px;"><i class="ion-ios-location m-r-5"></i> {{ events[0].city.name }} - {{events[0].city.state}}</p>
                                </div>

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information"
                                    v-if="events[0].slug"
                                    :to="{ name: 'general.events.show', params: { event_slug: events[0].slug } }"
                                >
                                </router-link>

                               <span class="icon-favorite">
                                    <i class="ion-ios-star f-primary"></i> {{events[0].favorited_count}}
                               </span>

                            </div>
                            <!-- / Card Header -->
                        </div>
                        <!-- / FIRST PLACE -->

                        <!-- SECOND PLACE -->
                        <div class="card m-0" v-if="events.length > 1">
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ events[1].cover })` }">
                                <div class="ch-content">
                                    <h3 class="title f-700 t-overflow">{{ events[1].name }}</h3>
                                    <p class="title f-700 t-overflow" style="margin-bottom: 0px;"><i class="ion-ios-location m-r-5"></i> {{ events[1].city.name }} - {{events[1].city.state}}</p>
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
                    <div class="row" style="margin-top: -10px;">
                        <div class="col-sm-12">
                            <div class="actions">

                                <div v-if="events.length && isLogged || interactions.is_loading">
                                    <span class="action skip" @click="skip()">
                                        <span class="ion-ios-rewind f-default"></span>
                                    </span>

                                    <span class="action xl down"  @click="goDown()">
                                        <span class="ion-chevron-down f-red "></span>
                                    </span>

                                    <span class="action xl up" @click="goUp()">
                                        <span class="ion-chevron-up f-green"></span>
                                    </span>

                                    <span class="action favorite" @click="favorite()">
                                        <span class="ion-ios-star f-primary"></span>
                                    </span>
                                </div>

                                <div v-if="!isLogged">
                                   <p><strong>{{translations.makeLogin}}</strong></p>

                                    <router-link type="button" class="btn btn-block btn-primary" :to="{name: 'general.auth.login'}">{{ translations.goToLogin }}</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / Actions -->

                    <!--Cities-->
                    <div class="row m-t-20">
                        <div class="col-sm-12 text-center">

                            <label>{{ translations.nearCities }}</label>
                            <p v-if="!getCities.length">{{ translations.noCity }}</p>
                            <div class="swiper-container" ref="citiesSlider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide label transparent m-5 cursor-pointer"
                                         v-for="(city, $index) in getCities"
                                         :key="$index"
                                         :class="{'cursor-pointer': currentCity != city, 'label-primary':currentCity == city}">
                                         <span v-if="currentCity == city">
                                             {{city.name}} - {{city.state}}
                                         </span>
                                        <span v-if="currentCity != city">
                                            {{city.name}} - {{city.state}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Cities-->

                    <router-link
                        :to="{name: 'general.events.create'}"
                        class="btn btn-primary btn-block m-t-20"
                        v-if="!interactions.is_loading"
                    >
                        {{translations.add_event}} {{ interactions.is_loading }}
                    </router-link>

                </div>


            </div>
        </transition>

    </div>

</template>

<script>
    import Hammer from 'hammerjs'
    import { transition } from 'jquery.transit'
    import { mapGetters, mapActions } from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import pulse from '@/components/pulse.vue'

    import { cleanPlaceModel } from '@/models/Place'

    import * as translations from '@/translations/explorer/show'
    import moment from 'moment'

    import bus from '@/utils/event-bus';

    export default {
        name: 'landing',

        components: {
            mainHeader,
            pulse
        },

        data () {
            return {
                interactions: {
                    up: false,
                    down: false,
                    skip: false,
                    favorite: false,
                    is_loading: true,
                    finished_loading_category: false,
                },
                starting: true,
                placeholder: true,
                events: [],
                active: false,
                top: 0,
                left: 0,
                currentLocation:{
                    lat:-23.5505199,
                    lng:-46.63330940000003,
                    city: 'São Paulo',
                    state: 'SP',
                    newLocation: ''
                },
                currentCity: null,
                currentCategory: null
            }
        },

        computed: {

            ...mapGetters(['language', 'isLogged', 'currentUser', 'getUserLastGeoLocation', 'getCities', 'getCategories']),

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

            var that = this;

            this.setCities();

            bus.$on('refresh_explorer', function(){
                that.currentCategory = null;
                that.interactions.finished_loading_category = false;
                that.interactions.is_loading = true;
            });

        },

        destroyed(){
            bus.$off('refresh_explorer');
        },


        methods: {

            ...mapActions(['setCities']),

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.events.length) {
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
                if (that.top > -75 && that.top < 75 && that.left > -75 && that.left < 75) {
                    $('#card-animated').transition({ x: 0, y: 0 }, 300)
                } else {
                    // UP
                    if (that.top < -75) {
                        $('#card-animated').transition({ y: -200, opacity: 0 }, 300, () => that.resetPosition())
                    }
                    // DOWN
                    if (that.top > 75) {
                        $('#card-animated').transition({ y: 200, opacity: 0 }, 300, () => that.resetPosition())
                    }
                    // Skip
                    if (that.left > 75) {
                        $('#card-animated').transition({ x: 300, opacity: 0 }, 300, () => that.resetPosition())
                    }
                    // Favorite
                    if (that.left < -75) {
                        $('#card-animated').transition({ x: -300, opacity: 0 }, 300, () => that.resetPosition())
                    }
                }
            },

            resetPosition() {

                let interaction = _.cloneDeep(this.interactions)
                interaction.user_id = this.currentUser.id
                interaction.event_id =  this.events[0].id

                this.handleInteraction(interaction)

                // Reset Global Top And Left
                this.top = 0
                this.left = 0

                // Reset Interactions
                this.interactions.up = false
                this.interactions.down = false
                this.interactions.skip = false
                this.interactions.favorite = false


                // Remove From Array
                this.events.splice(0, 1)
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

                    if (top > -75 && top < 75 && left > -75 && left < 75) {
                        // Do nothing just reset position
                        that.interactions.up = false
                        that.interactions.down = false
                        that.interactions.favorite = false
                        that.interactions.skip = false
                    } else {
                        // UP
                        if (top < -75) {
                            that.interactions.up = true
                            that.interactions.down = false
                            that.interactions.favorite = false
                            that.interactions.skip = false
                            return
                        }
                        // DOWN
                        if(top > 75) {
                            that.interactions.up = false
                            that.interactions.down = true
                            that.interactions.favorite = false
                            that.interactions.skip = false
                            return
                        }
                        // FAVORITE
                        if (left > 75 && (top > -75 && top < 75)) {
                            that.interactions.up = false
                            that.interactions.down = false
                            that.interactions.favorite = true
                            that.interactions.skip = false
                            return
                        }
                        // SKIP
                        if (left < -75 && (top > -75 && top < 75)) {
                            that.interactions.up = false
                            that.interactions.down = false
                            that.interactions.favorite = false
                            that.interactions.skip = true
                            return
                        }
                    }
                }
            },

            // Button Action UP
            goUp() {
                this.interactions.up = true

                $('#card-animated').transition({ x: 0, y: -100, opacity: 0 }, 1000, () => this.resetPosition())
            },
            // Button Action DOWN
            goDown() {
                this.interactions.down = true
                $('#card-animated').transition({ x: 0, y: 100, opacity: 0 }, 1000, () => this.resetPosition())
            },
            // Button Action FAVORITE
            favorite() {
                this.interactions.favorite = true
                $('#card-animated').transition({ x: 100, y: 0, opacity: 0 }, 1000, () => this.resetPosition())
            },
            // Button Action SKIP
            skip() {
                this.interactions.skip = true
                $('#card-animated').transition({ x: -100, y: 0, opacity: 0 }, 1000, () => this.resetPosition())
            },


            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

            citiesSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperTabs = new Swiper(that.$refs.citiesSlider, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: 0,
                        loop: false,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            that.currentCity = that.getCities[swiper.realIndex]
                            that.getEvents();
                        },
                        breakpoints: {
                            350: {
                                slidesPerView: 2,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })

                }, 100)
            },

            getEvents() {
                let that = this

                that.$http.post('event/explorer/list', {
                    language: that.language,
                    lat: that.getUserLastGeoLocation.lat,
                    lng: that.getUserLastGeoLocation.lng,
                    city_id: that.currentCity.id,
                    category_id: that.currentCategory.id,
                })
                    .then(function (response) {

                        that.events = response.data.events
                        that.interactions.is_loading = false;

                        /*
                        if (that.starting) {

                            that.starting = false

                            if (localStorage.getItem('events')) {
                                that.events = JSON.parse(localStorage.getItem('events'))
                            } else {
                                localStorage.setItem('events', JSON.stringify(that.events))
                            }

                        } else {
                            localStorage.removeItem('events')
                            localStorage.setItem('events', JSON.stringify(that.events))
                        }
                        */
                        //Inicia o hammer
                        that.mountHammer();


                    }).catch(function (error) {
                    console.log(error)
                    that.interactions.is_loading = false;
                });

            },

            handleInteraction(interaction) {
                let that = this
                that.$http.post('event/interaction/store', interaction)
                    .then(function (response) {

                     console.log(response)

                    }).catch(function (error) {
                    console.log(error)
                });

            },

            selectCategory: function(category){
                let that = this

                that.currentCategory = category;

                setTimeout(function() {
                    that.interactions.finished_loading_category = true;
                }, 1400);


                setTimeout(function() {
                    that.currentCity = that.getCities[0];
                    that.citiesSwiper();
                    that.getEvents();
                }, 1500);


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

    .card-placeholder{
        height: 388px;
        background-color: #FFF;
        border-radius: 5px;
        margin-top: 20px;
    }

    @media (max-width: 360px) {
        .cards{ height: 330px}
        .card-placeholder{ height: 330px}
    }

    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .card .card-header.cover {
        position: relative;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .cards #card-animated{ z-index: 10; }

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

    .icon-favorite {
        position: absolute;
        top: 0px;
        left: 10px;
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

    .card-cat-col{
        padding-right: 10px;
        padding-left: 10px;
        margin-top: 20px;
    }

    .card-cat{
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;

    }

    .fadeout-500 {
        -webkit-animation: fadeOut 500ms;
        -moz-animation: fadeOut 500ms;
        animation: fadeOut 500ms;
    }

    .card-cat:hover:not(.card-cat-selected), .card-cat:active{
        animation: pulse 1.6s infinite;
    }

    .card-cat-non-selected{
        z-index: 5;
    }

    .cat-is-selected{
        animation: fade-out linear 1.5s;
        animation-iteration-count: 1;
    }

    @keyframes fade-out{
      0% {
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
}



    .card-cat-selected{
        -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0.8);
        box-shadow: 0 0 0 0 rgba(255,255,255, 0.8);
        z-index: 1000;
        animation: card-cat-selected-animation linear 1s;
        animation-iteration-count: 1;
        transform-origin: 50% 50%;
        -webkit-animation: card-cat-selected-animation linear 1s;
        -webkit-animation-iteration-count: 1;
        -webkit-transform-origin: 50% 50%;
        -moz-animation: card-cat-selected-animation linear 1s;
        -moz-animation-iteration-count: 1;
        -moz-transform-origin: 50% 50%;
        -o-animation: card-cat-selected-animation linear 1s;
        -o-animation-iteration-count: 1;
        -o-transform-origin: 50% 50%;
        -ms-animation: card-cat-selected-animation linear 1s;
        -ms-animation-iteration-count: 1;
        -ms-transform-origin: 50% 50%;
    }

@keyframes card-cat-selected-animation{
  0% {
    transform:  rotate(0deg) scaleX(1.00) scaleY(1.00) ;
  }
  10% {
    transform:  rotate(-3deg) scaleX(0.90) scaleY(0.90) ;
  }
  20% {
    transform:  rotate(-3deg) scaleX(0.90) scaleY(0.90) ;
  }
  30% {
    transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  40% {
    transform:  rotate(-3deg) scaleX(1.10) scaleY(1.10) ;
  }
  50% {
    transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  60% {
    transform:  rotate(-3deg) scaleX(1.10) scaleY(1.10) ;
  }
  70% {
    transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  80% {
    transform:  rotate(-2deg) scaleX(1.10) scaleY(1.10) ;
  }
  90% {
    transform:  rotate(2deg) scaleX(1.00) scaleY(1.00) ;
  }
  100% {
    transform:  rotate(0deg) scaleX(1.00) scaleY(1.00) ;
  }
}


@-webkit-keyframes card-cat-selected-animation {
  0% {
    -webkit-transform:  rotate(0deg) scaleX(1.00) scaleY(1.00) ;
  }
  10% {
    -webkit-transform:  rotate(-3deg) scaleX(0.90) scaleY(0.90) ;
  }
  20% {
    -webkit-transform:  rotate(-3deg) scaleX(0.90) scaleY(0.90) ;
  }
  30% {
    -webkit-transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  40% {
    -webkit-transform:  rotate(-3deg) scaleX(1.10) scaleY(1.10) ;
  }
  50% {
    -webkit-transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  60% {
    -webkit-transform:  rotate(-3deg) scaleX(1.10) scaleY(1.10) ;
  }
  70% {
    -webkit-transform:  rotate(3deg) scaleX(1.10) scaleY(1.10) ;
  }
  80% {
    -webkit-transform:  rotate(-2deg) scaleX(1.10) scaleY(1.10) ;
  }
  90% {
    -webkit-transform:  rotate(2deg) scaleX(1.00) scaleY(1.00) ;
  }
  100% {
    -webkit-transform:  rotate(0deg) scaleX(1.00) scaleY(1.00) ;
  }
}



        @-webkit-keyframes pulse {
          0% {
            -webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0.8);
          }
          70% {
              -webkit-box-shadow: 0 0 0 10px rgba(255,255,255, 0);
          }
          100% {
              -webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0);
          }
        }
        @keyframes pulse {
          0% {
            -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0.8);
            box-shadow: 0 0 0 0 rgba(255,255,255, 0.8);
          }
          70% {
              -moz-box-shadow: 0 0 0 10px rgba(255,255,255, 0);
              box-shadow: 0 0 0 10px rgba(255,255,255, 0);
          }
          100% {
              -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0);
              box-shadow: 0 0 0 0 rgba(255,255,255, 0);
          }
        }

</style>
