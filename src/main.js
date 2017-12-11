import Vue from 'vue'
import App from './App.vue';
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import messages from './utils/validator/pt_BR';
import VeeValidate, {Validator} from 'vee-validate';
import {apiUrl, apiRootUrl, facebookClientId, googleClientId, googleMapsKey} from './config'
import VueSweetAlert from 'vue-sweetalert'
import * as VueGoogleMaps from 'vue2-google-maps';
import global_functions from './utils/global_functions'
import global_filters from './utils/global_filters'
import {changeConsole, logErroRequest} from './utils/log_errors'
import moment from 'moment'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import {initFcmPushNotifications} from './utils/push-notifications'
initFcmPushNotifications()

require('moment/locale/pt-br')

    //Define a linguagem do usuário;
    var language = localStorage.getItem('language');

    if(!language || language == "undefined"){
        language = 'en';
        var language = localStorage.setItem('language', language);
        store.dispatch('setLanguage', language);
    } else {
        store.dispatch('setLanguage', language);
    }

    global_functions();

    global_filters();

    if(process.env.NODE_ENV != 'development'){
        changeConsole()
    }

    store.dispatch('setEnv', process.env.NODE_ENV);


    //FACEBOOK SDK
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = `https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9&appId=${facebookClientId}`;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    Vue.use(require('vue-moment'), {moment});


    Vue.use(VueAwesomeSwiper)

    // Router
    Vue.router = router

    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = apiUrl;

    // Automatic loader
    Vue.axios.interceptors.request.use(function (config) {


        return config;
    }, function (error) {


        // Do something with request error
        return Promise.reject(error);

    });

    Vue.axios.interceptors.response.use(function (response) {

        //Check and store a refreshed  token
        const refreshedToken = _.get(response, 'headers.authorization')
        if (refreshedToken){
            store.dispatch('authSetToken', refreshedToken)
        }

        return response;

    }, function (error) {

        const { response } = error

        // If token is expired not provided or invalid, bad request, internal server error then redirect to login.
        if ([401, 403].indexOf(response.status) > -1) {

            if(process.env.NODE_ENV != 'development'){
                logErroRequest(response);
            }

            let url =  response.config.url

            store.dispatch('authSetToken', null)
            store.dispatch('authSetUser', {})

            //Limpa a localStorage mas mantém o histórico de cidades
            window.clearAndMaintain();

            if(window.cordova){
                window.cookies.clear();
            }

            warningNotify('Ops!', 'Não autorizado, por favor faça o login.')

            if(url.match(/auth/g)){
                router.push({ path: '/login' })
                return false
            }

            router.push({ path: '/' })
            return false

        }

        if ([404].indexOf(response.status) > -1) {

            if(process.env.NODE_ENV != 'development'){
                logErroRequest(response);
            }

        }

        if ([500].indexOf(response.status) > -1) {

            console.log(response);

            errorNotify('Ops!', 'Ocorreu algum erro em sua requisição, tente novamente mais tarde.')

            if(process.env.NODE_ENV != 'development'){
                logErroRequest(response);
            }
        }


        //return  response error
        return Promise.reject(response);


    });

    Validator.updateDictionary({
        pt_BR: {
            messages
        }
    });

    Vue.use(VeeValidate, {locale: 'pt_BR'});

    Vue.use(VueSweetAlert)

    Vue.use(VueGoogleMaps, {
        load: {
            key: googleMapsKey,
            v: 3,
            libraries: 'places',
        }
    });

    //Disable production tip
    Vue.config.productionTip = false

    //Mask watcher
    $.jMaskGlobals.watchDataMask = true;

    // Start
    var component = App;
    component.router = Vue.router;
    component.store = store
    window.$vueinstance = new Vue(component).$mount('#root');

    setTimeout(function() {
        store.dispatch('setUserLastGeolocation');
    }, 5000);

