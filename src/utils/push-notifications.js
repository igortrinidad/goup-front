import store from '../store'
import axios from 'axios'
import {apiUrl, firebaseConfig} from '../config'
import firebase from 'firebase'

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();
import router from '../router'


export function initFcmPushNotifications() {

    console.log('aquiiii')

    // Mobile
    if (window.cordova) {

        //Aguarda até o device estar pronto
        document.addEventListener("deviceready", () => {

            if (typeof(FCMPlugin) !== 'undefined') {


                //Fetch token
                FCMPlugin.getToken(function (token) {
                    //Store the token on vuex
                    store.dispatch('setFcmTokenMobile', token)

                    if (!store.getters.isLogged) {
                        console.log('o usuario nao esta logado')
                    }

                    //Wait until user is logged
                    store.watch(
                        (state) =>{
                            return store.getters.isLogged
                        },
                        (val, oldVal)=>{
                            if(val){
                                //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                                console.log('o usuario esta logado')
                                if (store.getters.isLogged) {

                                    if (store.getters.currentUser.role == 'client' && store.getters.currentUser.fcm_token_mobile != token) {
                                        storeClientFcmToken(token, true)
                                        console.log('token armazenado no db')
                                    }

                                    /* if (store.getters.currentUser.role == 'professional' && store.getters.currentUser.fcm_token_mobile != token) {
                                         storeProfessionalFcmToken(token, true)
                                         console.log('token armazenado no db')
                                     }*/

                                }
                            }
                        },
                        {
                            deep:true
                        }
                    );

                });

                //Token refresh
                FCMPlugin.onTokenRefresh(function (token) {

                    //Store the token on vuex
                    store.dispatch('setFcmTokenMobile', token)

                    if (!store.getters.isLogged) {
                        console.log('o usuario nao esta logado')
                    }

                    //Store the token on vuex
                    store.dispatch('setFcmTokenMobile', token)

                    if (!store.getters.isLogged) {
                        console.log('o usuario nao esta logado')
                    }

                    //Wait until user is logged
                    store.watch(
                        (state) =>{
                            return store.getters.isLogged
                        },
                        (val, oldVal)=>{
                            if(val){
                                //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                                console.log('o usuario esta logado')
                                if (store.getters.isLogged) {

                                    if (store.getters.currentUser.role == 'client' && store.getters.currentUser.fcm_token_mobile != token) {
                                        storeClientFcmToken(token, true)
                                        console.log('token armazenado no db')
                                    }

                                    /* if (store.getters.currentUser.role == 'professional' && store.getters.currentUser.fcm_token_mobile != token) {
                                         storeProfessionalFcmToken(token, true)
                                         console.log('token armazenado no db')
                                     }*/

                                }
                            }
                        },
                        {
                            deep:true
                        }
                    );
                });

                FCMPlugin.onNotification(function (data) {

                    if (data.wasTapped) {
                        //Notificação recebida com o app fechado ou em segundo plano e tocada pelo usuario
                        console.log(data);
                        notificationHandler(data)

                    } else {

                        //Notificação recebida com o app em primeiro plano (app aberto)
                        console.log(data);
                        notificationHandler(data)
                    }
                });
            }
        }, false);
    }

    // Browser

    if (!window.cordova && 'serviceWorker' in navigator) {
        console.log('vai')
        window.addEventListener('load', () => {
            console.log('load')
            navigator.serviceWorker.register('../static/build/js/firebase-messaging-sw.js').then((registration) => {
                // Successfully registers service worker
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                messaging.useServiceWorker(registration);
            })
                .then(() => {
                    // Requests user browser permission
                    return messaging.requestPermission();
                })
                .then(() => {
                    // Gets token
                    return messaging.getToken();
                })
                .then((token) => {

                    store.dispatch('setFcmTokenBrowser', token)

                    if (!store.getters.isLogged) {
                        console.log('o usuario nao esta logado')
                    }

                    //Wait until user is logged
                    store.watch(
                        (state) =>{
                            return store.getters.isLogged
                        },
                        (val, oldVal)=>{
                            if(val){
                                //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                                console.log('o usuario esta logado')
                                if (store.getters.isLogged) {

                                    if (store.getters.currentUser.role == 'client' && store.getters.currentUser.fcm_token_browser != token) {
                                        storeClientFcmToken(token, false)
                                        console.log('token armazenado no db')
                                    }

                                    /*if (store.getters.currentUser.role == 'professional' && store.getters.currentUser.fcm_token__browser != token) {
                                        storeProfessionalFcmToken(token, false)
                                        console.log('token armazenado no db')
                                    }*/

                                }
                            }
                        },
                        {
                            deep:true
                        }
                    );

                }).then(() => {

                   return messaging.onMessage(function(payload) {
                       notificationHandler(payload.data)
                   });
                })
                .catch((err) => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

}

function storeClientFcmToken(token, mobile = true) {
    axios.defaults.headers.common.Authorization = `Bearer ${store.getters.AuthToken}`

    axios.post(`${apiUrl}/client/fcm_token`, {token: token, is_mobile: mobile})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function storeProfessionalFcmToken(token, mobile = true) {
    axios.defaults.headers.common.Authorization = `Bearer ${store.getters.AuthToken}`

    axios.post(`${apiUrl}/professional/fcm_token`, {oken: token, is_mobile: mobile})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function notificationHandler(payload){

    console.log(payload)

    //Notification with button
    if(payload.button_label && payload.button_action){
        iziToast.show({
            icon: 'icon-contacts',
            title: payload.title,
            message: payload.content,
            position: 'topCenter',
            image: payload.icon,
            imageWidth: 70,
            color: '#FFF',
            timeout:0,
            layout: 2,
            buttons: [
                [`<button class="btn-notification">${payload.button_label}</button>`, function (instance, toast) {
                    router.push(payload.button_action)
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');
                }, true], // true to focus
            ],
        });
    }

    //Simple notification
    if(!payload.button_label || !payload.button_action){
        iziToast.show({
            icon: 'icon-contacts',
            title: payload.title,
            message: payload.content,
            position: 'topCenter',
            image: payload.icon,
            imageWidth: 70,
            color: '#FFF',
            timeout:0,
            layout: 2
        });
    }
}
