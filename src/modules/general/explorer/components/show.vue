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

                    <!--Cities-->
                    <div class="row m-t-10">
                        <div class="col-sm-12 text-center">

                            <label>{{ translations.nearCities }}</label>
                            <p v-if="!cities.length && !interactions.is_loading">{{ translations.noCity }}</p>
                            <div class="swiper-container" ref="citiesSlider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide label transparent m-5 cursor-pointer"
                                         v-for="(city, $index) in cities"
                                         :key="$index"
                                         :class="{'cursor-pointer': currentCity != city.id, 'label-success':currentCity == city.id}">
                                         <span v-if="currentCity == city.id">
                                             {{city.name}} - {{city.state}}
                                         </span>
                                        <span v-if="currentCity != city.id">
                                            {{city.name}} - {{city.state}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Cities-->


                    <h4 class="text-center m-b-30 m-t-30" v-show="!events.length && !interactions.is_loading">
                        {{ translations.end_list }}
                    </h4>

                    <!-- Cards -->
                    <div class="cards m-t-30" v-if="events.length">

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
                                    <h3 class="title f-700 t-overflow">{{ events[0].name }}</h3>
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
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="actions">

                                <div v-if="events.length && isLogged">
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
    import elements from '@/components/elements.vue'
    import { cleanPlaceModel } from '@/models/Place'

    import * as translations from '@/translations/pages/index'
    import moment from 'moment'
    import {language} from "../../../../store/getters";

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
                    skip: false,
                    favorite: false,
                    is_loading: true,
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
                cities: []
            }
        },

        computed: {

            ...mapGetters(['language', 'language', 'isLogged', 'currentUser']),

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

            if(!window.cordova){
                this.locationRequest()
            }

            var last_location = localStorage.getItem('last_location_getted')


            if( window.cordova && moment().add(1, 'days').isAfter(moment('DD/MM/YYYY HH:mm:ss', last_location)) || window.cordova && !last_location  ){

                //this.geolocationInit();
                this.getLocation()

            } else {

                console.log('local_storage found');
                that.currentLocation.lat = localStorage.getItem('user_lat');
                that.currentLocation.lng = localStorage.getItem('user_lng');

                that.getLocationByCoordinates(false);

                that.cities = JSON.parse(localStorage.getItem('cities'));
                that.citiesSwiper();

            }
        },


        methods: {

            ...mapActions(['setLoading']),

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

                // Update localStorage
                /*localStorage.removeItem('events')
                localStorage.setItem('events', JSON.stringify(this.events))*/
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

            locationRequest() {
                let that = this
                let checkToAsk = parseInt(localStorage.getItem('location-request'))
                let now = moment().unix()

                if(!checkToAsk || now > checkToAsk){
                    navigator.permissions.query({name:'geolocation'}).then(function(result) {
                        if (result.state === 'granted') {
                            //get current location
                            that.getLocation()
                        } else if (result.state === 'prompt') {

                            //Request user permission
                            iziToast.show({
                                icon: 'icon-contacts',
                                title: `${that.translations.location.notification.title}`,
                                message: `${that.translations.location.notification.message}`,
                                position: 'topCenter',
                                image: '/static/assets/img/logos/LOGOS-05.png',
                                imageWidth: 70,
                                color: 'dark',
                                backgroundColor: '#561F9F',
                                titleColor: '#fff',
                                messageColor: '#fff',
                                timeout: 0,
                                layout: 2,
                                buttons: [
                                    [`<button class="btn-notification">${that.translations.location.notification.buttons.notNow}</button>`, function (instance, toast) {
                                        instance.hide({
                                            transitionOut: 'fadeOutUp',
                                        }, toast, 'close', 'btn2');

                                        localStorage.setItem('location-request', moment().add(1, 'hour').unix())

                                        infoNotify('', that.translations.location.permissionDenied)
                                        that.getEvents()

                                    }, false],
                                    [`<button class="btn btn-primary transparent">${that.translations.location.notification.buttons.enable}</button>`, function (instance, toast) {
                                        instance.hide({
                                            transitionOut: 'fadeOutUp',
                                        }, toast, 'close', 'btn2');

                                        if(checkToAsk){
                                            localStorage.removeItem('location-request')
                                        }

                                        that.getLocation()

                                    }, true]
                                ],
                                drag: false
                            });
                        }

                    });
                }else{
                    that.getEvents()
                }

            },

            getLocation(){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(that.navigatorSuccess, that.navigatorError);
                } else {
                    errorNotify('', that.translations.location.notSupported);
                }
            },

            navigatorSuccess(position) {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.currentLocation.lat = position.coords.latitude
                that.currentLocation.lng = position.coords.longitude

                that.getLocationByCoordinates()

            },

            navigatorError() {
                this.setLoading({is_loading: false, message: ''})
                errorNotify('', this.translations.location.unavailable);
            },

            geolocationInit: function(){
                let that = this
                function onSuccess(position) {
                    that.currentLocation.lat = position.coords.latitude;
                    that.currentLocation.lng =  position.coords.longitude;

                    navigator.geolocation.clearWatch(watchID);

                    that.getLocationByCoordinates();
                }

                // onError Callback receives a PositionError object
                function onError(error) {
                    console.log(error)
                    errorNotify('', that.translations.location.unavailable);
                }

                // Options: throw an error if no update is received every 30 seconds.
                var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
            },

            getLocationByCoordinates(get_cities = true){

                let that = this

                let geocoder = new google.maps.Geocoder;

                let latlng = new google.maps.LatLng(that.currentLocation.lat, that.currentLocation.lng);

                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {

                        if (results) {

                            results[0].address_components.map((current) =>{
                                current.types.map((type) => {
                                    if(type == 'administrative_area_level_1'){
                                        that.currentLocation.state = current.short_name
                                    }
                                    if(type == 'administrative_area_level_2'){
                                        that.currentLocation.city  = current.short_name
                                    }
                                })
                            })

                            console.log(`lat: ${that.currentLocation.lat} | lng: ${that.currentLocation.lng}`)
                            console.log(`Current location: ${that.currentLocation.city} - ${that.currentLocation.state}`)

                            that.getEvents()

                            if(get_cities){
                                that.getNearByCities()
                            }

                        } else {
                            errorNotify('', that.translations.location.unavailable);
                        }
                    }
                });

            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

            getNearByCities() {
                let that = this

                that.$http.post(`city/near_by_location`, {
                    lat: that.currentLocation.lat,
                    lng: that.currentLocation.lng,
                    radius: that.radius
                })
                    .then(function (response) {
                        that.cities = response.data.cities
                        that.citiesSwiper()

                        localStorage.setItem('cities', JSON.stringify(that.cities));

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
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
                            that.currentCity = that.cities[swiper.realIndex].id
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
                    lat: that.currentLocation.lat,
                    lng: that.currentLocation.lng,
                    city_id: that.currentCity,
                })
                    .then(function (response) {

                        that.events = response.data.events
                        that.currentCity = response.data.current_city
                        that.interactions.is_loading = false;
                        /*if (that.starting) {

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


                        if(that.isLogged){
                            that.mountHammer()
                        }
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
</style>
