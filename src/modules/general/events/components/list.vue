<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <div class="main">

                <!-- CATEGORIES -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <label>{{ translations.categories }}</label>
                        <div class="swiper-container" ref="categorySlider">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide label transparent m-5 cursor-pointer"
                                    :class="{
                                        'label-default': currentCategory !== category,
                                        'label-primary': currentCategory === category
                                    }"
                                    v-for="(category, $index) in categories"
                                    :key="$index">
                                    {{ category[`name_${language}`] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Categories Filters -->
                <!--Cities-->
                <div class="row m-t-10">
                    <div class="col-sm-12 text-center">

                        <label>{{ translations.nearCities }}</label>
                        <p v-if="!cities.length">Nenhuma cidade próxima.</p>
                        <div class="swiper-container" ref="citiesSlider">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide label transparent m-5 cursor-pointer"
                                    v-for="(city, $index) in cities"
                                    :key="$index"
                                    :class="{ 'cursor-pointer': currentCity != city.id, 'label-success':currentCity == city.id }"
                                >
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

                <div class="container">
                    <div class="row text-center">
                        <button
                            type="button"
                            class="btn btn-xs btn-primary transparent m-t-30"
                            @click.prevent="handleModalVisibility">
                            {{ translations.more_filters }}
                        </button>
                    </div>


                    <div class="row m-t-30">

                        <div class="col-sm-12">
                            <h4 v-if="!events.length && !interactions.is_loading" class="text-center">
                                {{translations.noEvents}}
                            </h4>
                        </div>

                        <!-- Events -->
                        <div class="col-sm-12" v-for="(event, indexEvents) in events">
                            <router-link
                                tag="div"
                                class="card m-b-10 p-0"
                                style="height: 100px;"
                                :key="indexEvents"
                                :to="{ name: 'general.events.show', params: { event_slug: event.slug } }"
                            >

                                <div class="card-body p-5">
                                    <!-- Place Thumbnail -->
                                    <div class="picture-circle rounded absolute" :style="{ backgroundImage: `url(${ event.cover })` }">
                                        <div class="event-ranking">
                                            <small>
                                                <i class="ion-podium"></i> {{ event.rank_position }}º
                                            </small>
                                            <small class="divider">
                                                <i class="ion-ios-star"></i> {{ event.favorited_count }}
                                            </small>
                                        </div>
                                    </div>

                                    <!-- /Place Thumbnail -->

                                    <div class="ext-padding">
                                        <h4 class="m-0 m-b-0 f-700 t-overflow">{{ event.name }}</h4>
                                        <small class="d-block f-12 m-t-15">
                                            <strong>{{ event.city.name }} - {{ event.city.state }}</strong>
                                        </small>

                                        <small class="d-block f-14 m-t-5">
                                            <span class="label label-xs label-primary">{{ handleDistance(event.distance) }}</span>
                                        </small>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <!-- /Events -->

                    </div>

                </div>

                <!-- Modal Filter -->
                <div class="modal" id="modal-filter" tabindex="-1" role="dialog" aria-labelledby="modal-filter" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button
                                    type="button"
                                    class="btn btn-primary transparent btn-close"
                                    data-dismiss="modal"
                                >
                                    <i class="ion-close-round"></i>
                                </button>
                                <h3 class="title text-center">{{ translations.filters }}</h3>
                            </div>
                            <div class="modal-body text-primary">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="label label-primary" @click.prevent="applyFilters">Aplicar filtros</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Modal Filter -->
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import { cleanPlaceModel } from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import * as translations from '@/translations/events/list'
    import moment from 'moment'
    import vueSlider from 'vue-slider-component'

    export default {
        name: 'general-events-list',

        components: {
            mainHeader,
            vueSlider,
        },

        data () {
            return {
                interactions:{
                    changeLocation: false,
                    showFilters: false,
                    is_loading: true,
                },
                placeholder: true,
                events: [],
                categories: [],
                currentCategory: {},
                currentLocation:{
                    lat:-23.5505199,
                    lng:-46.63330940000003,
                    city: 'São Paulo',
                    state: 'SP',
                    newLocation: ''
                },
                radius: 80,
                cities:[],
                currentCity: null,
                processStyle: {backgroundColor: "#48C3D1"},
                tooltipStyle: {backgroundColor: "#48C3D1", borderColor: "#48C3D1"}
            }
        },

        computed: {
            ...mapGetters(['checkLanguage', 'language']),

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

            this.getCategories()


        },

        methods: {
            ...mapActions(['setLoading']),


            changeCurrentCategory(category) {
                this.currentCategory = category
                this.getEvents()
            },

            getCategories() {
                let that = this

                if(!JSON.parse(localStorage.getItem('categories'))){

                    that.$http.get(`event/categories/${that.language}`)
                        .then(function (response) {
                            that.categories = response.data.categories
                            that.currentCategory = that.categories[0]
                            that.categorySwiper()
                            localStorage.setItem('categories', JSON.stringify(that.categories));
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                } else {
                    that.categories = JSON.parse(localStorage.getItem('categories'));
                    that.currentCategory = that.categories[0];
                    that.categorySwiper();
                }


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
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getEvents() {
                let that = this

                that.events = [];
                that.interactions.is_loading = true;

                that.$http.post('event/rank/list', {
                    language: that.language,
                    category_id: that.currentCategory.id,
                    lat: that.currentLocation.lat,
                    lng: that.currentLocation.lng,
                    radius: that.radius,
                    city_id: that.currentCity,
                })
                    .then(function (response) {
                        that.events = response.data.events
                        that.currentCity = response.data.current_city
                        that.interactions.is_loading = false;
                    }).catch(function (error) {
                    that.interactions.is_loading = false;
                });

            },

            applyFilters(){
                this.getEvents()

                $('#modal-filter').modal('hide')
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

                that.setLoading({is_loading: true, message: 'Aguardando localização'})

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(that.navigatorSuccess, that.navigatorError);
                } else {
                    errorNotify('', that.translations.location.notSupported);
                }
            },

            navigatorSuccess(position) {
                let that = this

                that.currentLocation.lat = position.coords.latitude
                that.currentLocation.lng = position.coords.longitude

                that.setLoading({is_loading: false, message: ''})

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

            setNewLocation(place){
                let that = this
                that.currentLocation.lat = place.geometry.location.lat()
                that.currentLocation.lng = place.geometry.location.lng()

                place.address_components.map((current) =>{
                    current.types.map((type) => {
                        if(type == 'administrative_area_level_1'){
                            that.currentLocation.state = current.short_name
                        }
                        if(type == 'administrative_area_level_2'){
                            that.currentLocation.city  = current.short_name
                        }
                    })
                })

                that.interactions.changeLocation = false
                that.getEvents()
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

            handleModalVisibility(){
                $('#modal-filter').modal('show')
            },

            formatLabel(value){
                return `${value} km`
            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

            handleRadius(val){
                this.radius = val
                this.getEvents()
            },


            categorySwiper() {
                let that = this

                setTimeout(() => {

                    let currentIndex = JSON.parse(localStorage.getItem('category_index'))

                    that.swiperTabs = new Swiper(that.$refs.categorySlider, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: currentIndex ? currentIndex : 0,
                        loop: false,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            that.changeCurrentCategory(that.categories[swiper.realIndex])
                            localStorage.setItem('category_index', swiper.realIndex)
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
        }
    }
</script>

<style scoped>

    /*  */

    .modal-footer {
        border-radius: 0;
        bottom:0px;
        position:absolute;
        width:100%;
    }
    .text-white{
        color: white;
    }

    /* Event Card */
    .picture-circle.absolute {
        position: absolute;
        top: 50%; left: 5px;
        width: 90px;
        height: 90px;
        display: block;
        margin-top: -46px;
        border-radius: 6px !important
    }

    .event-ranking {
        position: absolute;
        bottom: -2px; left: 0; right: 0;
        background-color: rgba(255, 75, 137, .95);
        border: 2px solid #FF4B89;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 6px 6px;
        height: 25px;
        font-weight: 700;

    }

    .event-ranking small {
        width: 50%;
        text-align: center;
    }
    .event-ranking .divider {
        border-left: 1px solid rgba(255, 255, 255, 0.7);
    }

    .ext-padding {
        padding-left: 95px;
    }

</style>
