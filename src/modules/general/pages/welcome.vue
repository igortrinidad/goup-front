<template lang="html">
    <div class="container m-t-30 text-center">

        <!-- Pulse Loading -->
        <pulse  v-if="interactions.loading_location" :icon="'ion-navigate'" :msg="translations.loading_location"></pulse>

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
                    @click="bounceLanguage($event, 'pt')"
                    :class="{ 'country-selected' : language ===  'pt' }"
                >
                <img
                    class="m-r-5 country-flag"
                    src="../../../assets/img/united-kingdom.png"
                    width="32px"
                    @click="bounceLanguage($event, 'en')"
                    :class="{ 'country-selected' : language ===  'en' }"
                >
            </div>
        </div>

        <!-- SE O USER NÃO TIVER LOGADO -->
        <div class="" v-if="interactions.location_granted && !interactions.loading_location">

            <div class="flags">
                <img
                    class="m-r-5 country-flag"
                    src="../../../assets/img/brazil.png"
                    width="32px"
                    @click="bounceLanguage($event, 'pt')"
                    :class="{ 'country-selected' : language ===  'pt' }"
                >
                <img
                    class="m-r-5 country-flag"
                    src="../../../assets/img/united-kingdom.png"
                    width="32px"
                    @click="bounceLanguage($event, 'en')"
                    :class="{ 'country-selected' : language ===  'en' }"
                >
            </div>

            <img src="../../../assets/logos/LOGOS-02.png"style="width: 110px">

            <!-- SE A LOCALIZAÇÃO ESTIVER DISPONÍVEL -->
            <div class="m-t-30" v-if="interactions.location_granted">

                <div class="swiper-container swiper-gallery" ref="galleryPhotos">
                    <div class="swiper-wrapper text-center m-b-20">
                        <div class="swiper-slide">
                            <p class="f-14 f-300">{{translations.first_swiper}}</p>
                            <img class="img" height="220px" src="../../../assets/img/welcome_screens/welcome_screens-01.png" />
                        </div>
                        <div class="swiper-slide">
                            <p class="f-14 f-300">{{translations.second_swiper}}</p>
                            <img class="img" height="220px" src="../../../assets/img/welcome_screens/welcome_screens-02.png" />
                        </div>
                        <div class="swiper-slide">
                            <p class="f-14 f-300">{{translations.third_swiper}}</p>
                            <img class="img" height="220px" src="../../../assets/img/welcome_screens/welcome_screens-03.png" />
                        </div>
                        <div class="swiper-slide">
                            <p class="f-14 f-300">{{translations.fourth_swiper}}</p>
                            <img class="img" height="220px" src="../../../assets/img/welcome_screens/welcome_screens-04.png" />
                        </div>
                        <div class="swiper-slide">
                            <p class="f-14 f-300">{{translations.fifth_swiper}}</p>
                            <img class="img" height="220px" src="../../../assets/img/welcome_screens/welcome_screens-05.png" />
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
                        <router-link :to="{name: 'landing.terms'}">
                            {{translations.terms.terms_button}}
                        </router-link>
                        {{translations.terms.and}}
                        <router-link :to="{name: 'landing.privacy'}">
                            {{translations.terms.privacy_button}}
                        </router-link>
                    </p>
                </span>
                <!-- TERMS AND PRIVACY -->

            </div>
        </div>

    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import moment from 'moment';
    import * as translations from '@/translations/pages/welcome';

    import pulse from '@/components/pulse.vue'

    export default {
        name: 'welcome',
        components: {
            pulse
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
            var that = this;

            var userLastGeoLocation = window.checkUserLastLocation();

            //Usuário ainda nao tem localização
            if(!userLastGeoLocation){
                this.interactions.location_granted = false;
                this.interactions.loading_location = false;
                this.initSwiperGallery();
                return
            }

            //Usuário ainda nao tem localização
            if(!userLastGeoLocation && this.isLogged || !userLastGeoLocation && !this.isLogged){
                this.interactions.location_granted = false;
                this.interactions.loading_location = false;
                this.initSwiperGallery();
                return
            }

            //Usuário esta logado e é valido
            if(this.isLogged && userLastGeoLocation == 'is_valid'){
                this.$router.push('/explorer');
                this.interactions.loading_location = false;
                return
            } else if(!this.isLogged && userLastGeoLocation == 'is_valid') {
                this.interactions.loading_location = false;
            }

            //Esperar o device estar pronto para pegar a localização e não dar erro
            if(window.cordova){

                document.addEventListener("deviceready", function(){
                    //Usuário esta logado e  é INvalido
                    if(that.isLogged && userLastGeoLocation == 'is_invalid'){
                        that.getUserLocation();

                    //Usuário NAO esta logado e  é INvalido
                    } else if(!that.isLogged && userLastGeoLocation == 'is_invalid'){
                        that.getUserLocation();
                    }
                }, false);

            } else {

                //Usuário esta logado e  é INvalido
                if(that.isLogged && userLastGeoLocation == 'is_invalid'){
                    that.getUserLocation();

                //Usuário NAO esta logado e  é INvalido
                } else if(!that.isLogged && userLastGeoLocation == 'is_invalid'){
                    that.getUserLocation();
                }
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

                        newUserLastGeoLocation.time = moment().format('DD/MM/YYYY HH:mm:ss');

                        localStorage.setItem('user_last_geo_location', JSON.stringify(newUserLastGeoLocation));

                        that.interactions.location_granted = true;
                        that.interactions.loading_location = false;

                        //that.setUserLastGeolocation();
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
                    var swiperWelcome = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                    })
                }, 400);
            },

            bounceLanguage: function(event, language){

                setTimeout(function() {
                    $(event.target).addClass('bounce');
                }, 100);

                setTimeout(function() {
                    $(event.target).removeClass('bounce');
                }, 300);

                this.setLanguage(language);
                
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
