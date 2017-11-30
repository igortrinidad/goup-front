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
                                    'label-primary': currentCategory === category}"

                                    v-for="(category, $index) in categories"
                                    :key="$index">
                                    {{ category[`name_${language}`] }}
                                    <i :class="{
                                        'm-l-5': true,
                                        'ion-ios-circle-outline': currentCategory !== category,
                                        'ion-ios-circle-filled': currentCategory === category
                                        }">
                                    </i>
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
                                <div class="swiper-slide label transparent m-5 cursor-pointer"
                                     v-for="(city, $index) in cities"
                                     :key="$index"
                                     :class="{'cursor-pointer': currentCity != city.id, 'label-success':currentCity == city.id}">
                                         <span v-if="currentCity == city.id">
                                             {{city.name}} - {{city.state}}
                                         </span>
                                        <span v-if="currentCity != city.id">
                                            {{city.name}} - {{city.state}}
                                            <span class="text-white">|</span>
                                            <span class="f-primary">{{handleDistance(city.distance)}}</span>
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
                            <h4 v-if="!events.length" class="text-center">{{translations.noEvents}}</h4>
                        </div>

                        <div class="col-sm-12" v-for="event in events">
                            <div class="card m-b-10">
                                <div class="card-body card-padding">

                                    <!-- Place Thumbnail -->
                                    <div class="picture-circle picture-circle-m m-t-10 rounded" :style="{ backgroundImage: `url(${ event.cover })` }">
                                    </div>
                                    <!-- /Place Thumbnail -->

                                    <!-- Place Category -->
                                    <span class="label label-primary transparent place-category">

                                        {{ checkLanguage === 'en' ? event.category.name_en : event.category.name_pt }}
                                    </span>
                                    <!-- /Place Category -->

                                    <!-- Place Ranking -->
                                    <span class="label label-primary transparent place-ranking">
                                        <i class="ion-podium m-r-5"></i>
                                        {{ event.rank_position }}º
                                    </span>
                                    <!-- Place Ranking -->

                                    <!-- Title And Location -->
                                    <div class="text-center">
                                        <h4 class="f-700">
                                            {{ event.name }}
                                        </h4>
                                        <span class="icon-favorite">
                                            <i class="ion-ios-star f-primary"></i> {{event.favorited_count}}
                                        </span>
                                        <div class="border-inside-card text-center">
                                            <i class="ion-ios-location"></i>
                                            <small class="d-block">{{ event.city.name }} - {{ event.city.state }}</small>
                                            <p><small>Distância aproximada: {{handleDistance(event.distance)}}</small></p>
                                        </div>
                                    </div>
                                    <!-- /Title And Location -->
                                </div>
                            </div>
                        </div>
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
                    showFilters: false
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
                radius: 40,
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

            if(!window.cordova){
                this.locationRequest()
            }

            if(window.cordova){
                this.geolocationInit();
                this.getLocation()
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

                that.$http.get(`event/categories/${that.language}`)
                    .then(function (response) {
                        that.categories = response.data.categories
                        that.currentCategory = that.categories[0]
                        that.categorySwiper()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
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
                    }).catch(function (error) {
                    console.log(error)
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

            getLocationByCoordinates(){

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
                            that.getNearByCities()

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
                    that.swiperTabs = new Swiper(that.$refs.categorySlider, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: 0,
                        loop: false,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            that.changeCurrentCategory(that.categories[swiper.realIndex])
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

    .place-category,
    .place-ranking { position: absolute; top: 52px; }

    .place-category { left: 10px; }
    .place-ranking { right: 10px; }

    .modal-footer {
        border-radius: 0;
        bottom:0px;
        position:absolute;
        width:100%;
    }
    .text-white{
        color: white;
    }
</style>
