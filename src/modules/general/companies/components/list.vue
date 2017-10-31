<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Procurar empresas'"
            :cursor="false" :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <!-- Categories Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(category, $index) in categories"
                    :key="$index"
                >
                    {{ category.name }}
                </div>
            </div>
            <div class="swiper-button-prev">
                <i class="ion-ios-arrow-left"></i>
            </div>
            <div class="swiper-button-next">
                <i class="ion-ios-arrow-right"></i>
            </div>
        </div>
        <!-- Categories Tabs -->


        <div class="container m-t-30">

            <div class="text-center">
                <h4 class="f-300 f-14" v-if="!interactions.showSelectPlace">
                    <b>{{located_count}}</b> Empresas localizadas de: <b class="f-400"></b>
                    <b>{{ currentCategory.slug === 'all' ? 'Todas as categorias' : currentCategory.name }}</b>
                    próximos a:

                </h4>
                 <div class="container" v-if="!interactions.showSelectPlace">
                    <span class="d-block f-300 f-18 m-t-10"><i class="icon ion-ios-location-outline m-r-10 f-20"></i>{{userCity}}</span>
                    <button class="btn btn-default btn-sm" @click="interactions.showSelectPlace = true">Alterar localização</button>
                </div>

                <div class="form-group" v-if="interactions.showSelectPlace">
                    <label>Informe um endereço, local ou cidade</label>
                    <GmapAutocomplete
                        class="form-control"
                        :select-first-on-enter="true"
                        @place_changed="setNewAdress"
                        placeholder="Digite um local, endereço ou cidade para pesquisar"
                        :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                    >
                    </GmapAutocomplete>
                    <button class="btn btn-default btn-sm" @click="interactions.showSelectPlace = false">Cancelar</button>
                </div>

            </div>

            <div class="form-group search" v-if="!interactions.showSelectPlace">
                <span class="search-label d-block m-b-5 text-center"><!-- Pesquisa por profissinoais --></span>
                <label class="input-group">
                    <input type="text" class="form-control" v-model="interactions.search" placeholder="Procure pelo nome" value="" @keyup.enter="getCompaniesByLocation()">
                    <span class="input-group-addon btn btn-light" name="span" @click="getCompaniesByLocation()"><i class="ion-ios-search f-20"></i></span>
                </label>
            </div>
        </div>


        <div class="container">

            <!-- Placeholder -->
            <card-placeholder v-if="placeholder" :circleImage="true">
            </card-placeholder>
            <!-- Placeholder -->

            <div class="row" v-if="!placeholder">
                <div
                    class="col-sm-4 col-xs-12"
                    v-for="(company, $index) in companies"
                    :to="{ name: 'landing.companies.show', params: { company_slug: company.slug, company_id: company.id } }"
                    :key="company.id"
                    style="position: relative"
                >
                    <div class="card">
                        <router-link
                            tag="div" class="cursor-pointer"
                            :to="{ name: 'landing.companies.show', params: { company_slug: company.slug, company_id: company.id } }">
                            <div class="card-header ch-alt text-center">
                                <div class="picture-circle picture-circle-m" :style="`background-image:url('${ company.avatar }')`"></div>
                                <h3 class="f-300 m-b-0">{{company.name}}</h3>
                            </div>
                        </router-link>

                        <div class="card-body card-padding text-center">

                            <p class="m-b-0 f-300">Especialidades</p>
                            <div class="list-cats">
                                <span class="label label-primary f-300 f-14 m-t-5 m-r-5" v-for="(category, $indexCategory) in company.categories">
                                    {{ category.name }}
                                </span>
                            </div>
                            <span v-show="!company.categories.length">Nenhuma especialidade cadastrada</span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5">
                                Avaliação
                                <rating-simple
                                    :value.sync="company.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>

                            <span class="d-block f-300 f-14" v-if="company.distance_km">
                                <i class="icon ion-arrow-expand m-r-10 f-20"></i>{{company.distance_km}} km
                            </span>
                            <span class="d-block f-300 f-14">
                                <i class="icon ion-ios-location-outline m-r-10 f-20"></i>{{company.city}} - {{company.state}}
                            </span>

                            <router-link
                                tag="button"
                                :to="{ name: 'landing.companies.show', params: { company_slug: company.slug, company_id: company.id } }"
                                class="btn btn-primary btn-sm m-t-10"
                            >Ver empresa</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="container m-t-10 m-b-10" v-if="companies.length > LoadmoreCount">
            <div class="row">
                <div :class="{ 'col-sm-6 col-xs-6': LoadmoreCount > 5, 'col-sm-12': LoadmoreCount <= 5 }" v-if="companies.length > LoadmoreCount">
                    <button @click="handleLoadMore()" type="button" class="btn btn-primary btn-block text-uppercase f-300 f-14" name="button">
                        <i class="ion-ios-refresh-outline m-r-5 f-20" :class="{ 'loading-more': loadingMore }"></i>Carregar Mais
                    </button>
                </div>
                <div :class="companies.length > LoadmoreCount ? 'col-sm-6 col-xs-6' : 'col-sm-12'" v-if="LoadmoreCount > 5">
                    <button @click="goTop()" type="button" class="btn btn-primary btn-block text-uppercase f-300 f-14" name="button">
                        <i class="ion-ios-arrow-thin-up m-r-5 f-20"></i>Subir
                    </button>
                </div>
            </div>

        </div>

        <div class="text-center" v-if="!companies.length">
            <span class="d-block m-t-30 f-300">
                <i class="d-block ion-sad-outline f-24"></i>
                Nenhuma empresa ou profissional encontrado.
            </span>
        </div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import companyObj from '@/models/Company'
    import Categories from '@/models/Categories'
    import Professional from '@/models/Professional'
    import axios from 'axios';

    export default {
        name: 'landing-companies-list',
        components:{
            mainHeader,
            cardPlaceholder,
            ratingSimple: require('@/components/rating-simple.vue')
        },
        data() {
            return{
                view: {
                    list: false
                },
                placeholder: true,
                interactions: {
                    showSelectPlace: false,
                },
                userCity: '',
                currentCategory: {},
                companies: [],
                loadingMore: false,
                LoadmoreCount: 5,
                categories: [],
                geolocation: {
                    watchId: '',
                    latitude: -23.555877,
                    longitude: -46.691593,
                },
                located_count: 0,
            }
        },

        mounted() {
            this.getCategories();

            if(window.cordova){
                this.geolocationInit();
            }

            this.getLocationByCoordinates();
            this.placeholder = true
        },
        methods:{

            getCategories(){
                let that = this
                that.$http.get(`company/category/list`)
                    .then(function (response) {

                     that.categories = response.data
                     that.initSwiperTabs();
                     that.currentCategory = that.categories[0]

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            geolocationInit: function(){
                let that = this
                // onSuccess Callback
                //   This method accepts a `Position` object, which contains
                //   the current GPS coordinates
                //
                function onSuccess(position) {
                    that.geolocation.latitude = position.coords.latitude;
                    that.geolocation.longitude =  position.coords.longitude;

                    that.getCompaniesByLocation()
                    navigator.geolocation.clearWatch(watchID);

                    that.getLocationByCoordinates();
                }
                // onError Callback receives a PositionError object
                //
                function onError(error) {
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
                }
                // Options: throw an error if no update is received every 30 seconds.
                //
                var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
            },

            getLocationByCoordinates: function(){
                let that = this
                var geocoder = new google.maps.Geocoder;

                var latlng = new google.maps.LatLng(that.geolocation.latitude, that.geolocation.longitude);

                geocoder.geocode({
                        'latLng': latlng
                }, function (results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results) {
                            let city = ''
                            let state = ''

                            results[1].address_components.map((current) =>{
                                current.types.map((type) => {
                                    //state
                                    if(type == 'administrative_area_level_1'){
                                        state = current.short_name
                                    }

                                    //City
                                    if(type == 'administrative_area_level_2'){
                                        city = current.short_name
                                    }
                                })
                            })

                            that.userCity = `${city} - ${state}`

                        } else {
                            alert('Cidade não localizada');
                        }
                    } else {

                    }
                });

            },


            handleCurrentCategory(index) {

                this.currentCategory = this.categories[index]
                this.getCompaniesByLocation()

            },
            handleLoadMore() {
                this.loadingMore = true
                setTimeout(() => {
                    this.loadingMore = false
                    this.LoadmoreCount += 5
                }, 1000)
            },

            goTop() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500)
            },

            initSwiperTabs() {
                setTimeout(() => {
                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 7,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            this.handleCurrentCategory(swiper.realIndex)
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 100)
            },

            onRefresh: function() {
                let that = this
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                        this.getCompaniesByLocation()
                    }, 1000)
                })
            },

            getCompaniesByLocation(){
                let that = this

                that.placeholder = true
                if(that.$route.query.latitude && that.$route.query.longitude){
                    that.geolocation.latitude = that.$route.query.latitude
                    that.geolocation.longitude = that.$route.query.longitude
                    that.getLocationByCoordinates();
                }

                that.$http.post('company/search/location', {category: that.currentCategory.slug, lat: that.geolocation.latitude, lng: that.geolocation.longitude, search: that.interactions.search})
                    .then(function (response) {
                        that.located_count = response.data.count
                        that.companies = response.data.data
                        setTimeout(() => {
                            that.placeholder = false
                        }, 200)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setNewAdress(place) {

                let that = this
                if (place.geometry !== undefined) {

                    that.geolocation.latitude = place.geometry.location.lat()
                    that.geolocation.longitude = place.geometry.location.lng()

                    that.getCompaniesByLocation();
                    that.getLocationByCoordinates();
                    that.interactions.showSelectPlace = false;
                }
            },

        }
    }
</script>

<style scoped>
    .tabs{ top: -1px; }
    .first-container { padding-bottom: 0; }
    /* Wrapper Filter */
    .wrapper.filter {
        background: #88c657;
        margin-top: -20px;
    }
    /* Set background imagem as a cover */
    .cover {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    /* default inputsearch */
    .search .form-control {
        border-width: 1px; border-right: 0;
        transition: none;
        font-weight: 300;
    }
    .search .form-control:focus { border-right: 0; transition: none; }
    .search .form-control:focus + .btn.btn-light { border-color: #383938; transition: none; }
    .search .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }

    /* List Cats */
    @media (min-width: 767px) {
        .list-cats { height: 30px; overflow: hidden; }
    }

    .loading-more {
        position: relative;
        display: inline-block;
        animation-name: loadmore;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }
    @keyframes loadmore {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
    }
</style>
