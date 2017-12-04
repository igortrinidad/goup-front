<template lang="html">
    <div class="container m-t-30 text-center">

        <!-- SE A LOCALIZAÇÃO NAO ESTIVER DISPONÍVEL -->
        <div class="m-t-20" v-if="!interactions.location_granted && !interactions.loading_location">

            <img src="../../../assets/logos/LOGOS-02.png"style="width: 130px">

            <h3 class="m-t-20">{{translations.title}}</h3>

            <p class="f-14 f-300 m-t-20">{{translations.non_location}}</p>
            <button class="btn btn-primary m-t-20" @click="getUserLocation()">{{translations.button_grant_location}}</button>

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
        </div>

        <!-- SE O USER NÃO TIVER LOGAD -->
        <div class="" v-if="interactions.location_granted && !interactions.loading_location">

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

            <img src="../../../assets/logos/LOGOS-02.png"style="width: 130px">

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

        <!-- Pulse Loading -->
        <div class="text-center" style="margin-top: 200px" v-if="interactions.loading_location">
            <span class="pulse">
                <i class="ion-navigate"></i>
            </span>

            <!-- <p class="f-13 f-300">{{translations.loading_location}}</p> -->
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
                    loading_location: true,
                    location_granted: true,
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

            var userLastGeoLocation = window.checkUserLastLocation();

            console.log(userLastGeoLocation);
            console.log(this.isLogged);

            //Usuário ainda nao tem localização
            if(!userLastGeoLocation){
                this.interactions.location_granted = false;
                this.interactions.loading_location = false;
                this.initSwiperGallery();

            }

            //Usuário ainda nao tem localização
            if(!userLastGeoLocation && this.isLogged || !userLastGeoLocation && !this.isLogged){
                this.interactions.location_granted = false;
                this.interactions.loading_location = false;
                this.initSwiperGallery();

            }

            //Usuário esta logado e é valido
            if(this.isLogged && userLastGeoLocation == 'is_valid'){
                this.$router.push('/explorer');
                this.interactions.loading_location = false;
                return
            } else if(!this.isLogged && userLastGeoLocation == 'is_valid') {
                this.interactions.loading_location = false;
            }

            //Usuário esta logado e  é INvalido
            if(this.isLogged && userLastGeoLocation == 'is_invalid'){
                this.interactions.loading_location = false;
                this.getUserLocation();
            } else if(!this.isLogged && userLastGeoLocation == 'is_invalid'){
                this.interactions.loading_location = false;
                this.getUserLocation();
            }

            this.initSwiperGallery();

        },
        methods: {

            ...mapActions(['setLoading', 'setUserLastGeolocation', 'setLanguage']),

            getUserLocation: function(){
                let that = this

                that.interactions.loading_location = true;

                var newUserLastGeoLocation = {
                    location_granted: false,
                    lat: null,
                    lng: null,
                    time: null
                }

                navigator.geolocation.getCurrentPosition(
                    //Success
                    function(position){

                        newUserLastGeoLocation.lat = position.coords.latitude;
                        newUserLastGeoLocation.lng = position.coords.longitude;
                        newUserLastGeoLocation.location_granted = true;
                        that.interactions.location_granted = true;
                        that.interactions.loading_location = false;
                        newUserLastGeoLocation.time = moment().format('DD/MM/YYYY HH:mm:ss');

                        localStorage.setItem('user_last_geo_location', JSON.stringify(newUserLastGeoLocation));


                        that.setUserLastGeolocation();
                        that.initSwiperGallery();

                        if(that.isLogged){
                            that.$router.push('/explorer');
                        }


                    },
                    //On Error
                    function(error){

                        errorNotify('', 'Não foi possível habilitar a localização, confira as configurações do dispositivo.')
                        window.console.log('Não foi possível localizar o usuário, ou o usuário não permitiu.');
                        localStorage.setItem('user_last_geo_location', JSON.stringify(newUserLastGeoLocation));
                        that.interactions.loading_location = false;


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

    /* Pulse */
    .pulse {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 40px;
        width: 60px; height: 60px;
        cursor: pointer;
        box-shadow: 0 0 0 rgba(255,255,255, 0.4);
        animation: pulse 2s infinite;
        position: absolute;
        left: calc(50% - 30px);
        top: calc(50% - 30px);
        margin-top: -20px;
    }

    @-webkit-keyframes pulse {
      0% {
          -webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);
          color: rgba(255, 255, 255, 0.4);
      }
      70% {
          -webkit-box-shadow: 0 0 0 10px rgba(255,255,255, 0);
          color: rgba(255, 255, 255, 0);
      }
      100% {
          -webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0);
          color: rgba(255, 255, 255, 0);
      }
    }
    @keyframes pulse {
      0% {
          -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);
          box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);
          color: rgba(255, 255, 255, 0.4);

      }
      70% {
          -moz-box-shadow: 0 0 0 10px rgba(255,255,255, 0);
          box-shadow: 0 0 0 10px rgba(255,255,255, 0);
          color: rgba(255, 255, 255, 0);

      }
      100% {
          -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0);
          box-shadow: 0 0 0 0 rgba(255,255,255, 0);
          color: rgba(255, 255, 255, 0);
      }
    }

</style>
