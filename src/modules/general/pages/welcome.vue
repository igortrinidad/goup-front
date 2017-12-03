<template lang="html">
    <div class="container m-t-30 text-center">

        <img src="../../../assets/logos/LOGOS-02.png"style="width: 130px">

        <div class="flags">
            <img
                class="m-r-5 country-flag"
                src="../../../assets/img/brazil.png"
                width="32px"
                @click="setLanguage('pt')"
                :class="{ 'country-selected' : language ===  'pt' }"
            >
            <img
                class="m-r-5 country-flag"
                src="../../../assets/img/united-kingdom.png"
                width="32px"
                @click="setLanguage('en')"
                :class="{ 'country-selected' : language ===  'en' }"
            >
        </div>

        <!-- SE A LOCALIZAÇÃO NAO ESTIVER DISPONÍVEL -->
        <div class="" v-if="!getUserLastGeoLocation.location_granted">

            <h1>{{translations.title}}</h1>

            <p>{{translations.non_location}}</p>
            <button class="btn btn-primary m-t-20" @click="getUserLocation()">{{translations.button_grant_location}}</button>
            
        </div>

        <!-- SE A LOCALIZAÇÃO ESTIVER DISPONÍVEL -->
        <div class="m-t-20" v-if="getUserLastGeoLocation.location_granted">

            <div class="swiper-container swiper-gallery" ref="galleryPhotos">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <p class="f-14 f-300">{{translations.first_swiper}}</p>
                    </div>
                    <div class="swiper-slide">
                        <p class="f-14 f-300">{{translations.second_swiper}}</p>
                    </div>
                    <div class="swiper-slide">
                        <p class="f-14 f-300">{{translations.third_swiper}}</p>
                    </div>
                    <div class="swiper-slide">
                        <p class="f-14 f-300">{{translations.fourth_swiper}}</p>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>

            <p class="f-300 f-13 m-t-20">{{translations.login_message}}</p>
            <router-link to="/login" tag="button" class="btn btn-primary btn-block">{{translations.login_button}}</router-link>

            <!-- TERMS AND PRIVACY -->
            <span>
                <p class="f-13 f-300 m-t-10">
                    {{translations.terms.first}}
                    <router-link :to="{name: 'general.terms'}">
                        {{translations.terms.terms_button}}
                    </router-link>
                    {{translations.terms.and}}
                    <router-link :to="{name: 'general.privacy'}">
                        {{translations.terms.privacy_button}}
                    </router-link>
                </p>
            </span>
            <!-- TERMS AND PRIVACY -->

        </div>




    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import moment from 'moment';
    import * as translations from '@/translations/pages/welcome';

    export default {
        name: 'welcome',
        components: {
        },
        data() {
            return {
                interactions: {
                }
            }
        },
        computed: {
            ...mapGetters(['getUserLastGeoLocation', 'isLogged', 'language', 'getCities', 'getCategories']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },
        mounted() {

            if(this.isLogged){
                this.$router.push('/explorer');
            }

            this.initSwiperGallery();

        },
        methods: {

            ...mapActions(['setLoading', 'setUserLastGeolocation', 'setLanguage']),

            getUserLocation: function(){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                var userLastGeoLocation = {
                    location_granted: false,
                    lat: null,
                    lng: null,
                    time: null
                }

                navigator.geolocation.getCurrentPosition(
                    //Success
                    function(position){

                        userLastGeoLocation.lat = position.coords.latitude;
                        userLastGeoLocation.lng = position.coords.longitude;
                        userLastGeoLocation.location_granted = true;
                        userLastGeoLocation.time = moment().format('DD/MM/YYYY HH:mm:ss');

                        localStorage.setItem('user_last_geo_location', JSON.stringify(userLastGeoLocation));

                        that.setLoading({is_loading: false, message: ''});

                        that.setUserLastGeolocation();
                        that.initSwiperGallery();


                    },
                    //On Error
                    function(error){

                        errorNotify('', 'Não foi possível habilitar a localização, confira as configurações do dispositivo.')
                        window.console.log('Não foi possível localizar o usuário, ou o usuário não permitiu.');
                        localStorage.setItem('user_last_geo_location', JSON.stringify(userLastGeoLocation));

                        that.setLoading({is_loading: false, message: ''})


                    }, 
                    //options
                    { enableHighAccuracy: true }

                );
            },

            initSwiperGallery() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',
                    })
                }, 400);
            },

        }
    }
</script>

<style scoped>


    .flags{
        position: absolute;
        top: 17px;
        right: 10px;
        cursor: pointer;
    }

    .country-flag{
        filter: grayscale(90%);
    }

    .country-selected{
        filter: grayscale(0%);
    }

</style>
