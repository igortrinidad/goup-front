import store from '../store'
import axios from 'axios'
import {apiUrl, firebaseConfig} from '../config'
import firebase from 'firebase'

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();
import router from '../router'

var notificationAudio = new Audio(require('../assets/audio/notification.mp3'))

import * as translations from '../translations/notifications/request'

export function initFcmPushNotifications() {

    /*
    * Mobile
     */
    if (window.cordova) {

        //Aguarda até o device estar pronto
        document.addEventListener("deviceready", () => {

            if (typeof(FCMPlugin) !== 'undefined') {


                //Fetch token
                FCMPlugin.getToken(function (token) {
                    //Store the token on vuex
                    store.dispatch('setFcmTokenMobile', token)

                    if (!store.getters.isLogged) {
                        //console.log('o usuario nao esta logado')
                    }

                    //Wait until user is logged
                    store.watch(
                        (state) => {
                            return store.getters.isLogged
                        },
                        (val, oldVal) => {
                            if (val) {
                                //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                                //console.log('o usuario esta logado')
                                if (store.getters.isLogged) {

                                    if (store.getters.currentUser.role == 'client' && store.getters.currentUser.fcm_token_mobile != token) {
                                        storeUserFcmToken(token, true)
                                        //console.log('token armazenado no db')
                                    }

                                }
                            }
                        },
                        {
                            deep: true
                        }
                    );

                });

                //Token refresh
                FCMPlugin.onTokenRefresh(function (token) {

                    //Store the token on vuex
                    store.dispatch('setFcmTokenMobile', token)

                    if (!store.getters.isLogged) {
                        //console.log('o usuario nao esta logado')
                    }

                    //Wait until user is logged
                    store.watch(
                        (state) => {
                            return store.getters.isLogged
                        },
                        (val, oldVal) => {
                            if (val) {
                                //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                                //console.log('o usuario esta logado')
                                if (store.getters.isLogged) {

                                    if (store.getters.currentUser.role == 'client' && store.getters.currentUser.fcm_token_mobile != token) {
                                        storeUserFcmToken(token, true)
                                        //console.log('token armazenado no db')
                                    }

                                }
                            }
                        },
                        {
                            deep: true
                        }
                    );
                });

                FCMPlugin.onNotification(function (data) {

                    if (data.wasTapped) {
                        //Notificação recebida com o app fechado ou em segundo plano e tocada pelo usuario
                        //console.log(data);
                        notificationHandler(data)

                    } else {

                        //Notificação recebida com o app em primeiro plano (app aberto)
                        //console.log(data);
                        notificationHandler(data)
                    }
                });
            }
        }, false);
    }

    /*
    * Browser
     */
    if (!window.cordova && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('../static/build/js/firebase-messaging-sw.js').then((registration) => {
                // Successfully registers service worker
                console.log('ServiceWorker registration successful');
                messaging.useServiceWorker(registration);
            })
                .then(() => {
                    // Requests user browser permission
                    //return messaging.requestPermission();
                    if (store.getters.isLogged) {
                        return requestPermission()

                    }else{
                        //Wait until user is logged
                        store.watch(
                            (state) => {
                                return store.getters.isLogged
                            },
                            (val, oldVal) => {
                                if (val) {

                                    return requestPermission()
                                }
                            },
                            {
                                deep: true
                            }
                        );
                    }
                })
                .catch((err) => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

}

function storeUserFcmToken(token, mobile = true) {
    axios.defaults.headers.common.Authorization = store.getters.AuthToken

    axios.post(`${apiUrl}/auth/fcm_token`, {token: token, is_mobile: mobile})
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function notificationHandler(payload) {

    console.log(payload)

    //Increment notification badge
    if (store.getters.currentUser.role == 'client'){
        store.dispatch('incrementClientUnreadNotifications', 1)
    }

    if (store.getters.currentUser.role == 'professional'){
        store.dispatch('incrementProfessionalUnreadNotifications', 1)
    }

    //Notification with button
    if (payload.button_label && payload.button_action) {
        iziToast.show({
            icon: 'icon-contacts',
            title: payload.title ? payload.title : '',
            message: payload.content,
            position: 'topCenter',
            image: payload.icon,
            imageWidth: 70,
            color: '#FFF',
            timeout: 0,
            layout: 2,
            buttons: [
                [`<button>Ok</button>`, function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');
                }, false],
                [`<button class="btn-notification">${payload.button_label}</button>`, function (instance, toast) {
                    router.push(payload.button_action)
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');
                }, true] // true to focus
            ],
            drag: false
        });
    }

    //Simple notification
    if (!payload.button_label || !payload.button_action) {
        iziToast.show({
            icon: 'icon-contacts',
            title: payload.title ? payload.title : '',
            message: payload.content,
            position: 'topCenter',
            image: payload.icon,
            imageWidth: 70,
            color: '#FFF',
            timeout: 0,
            layout: 2,
            buttons: [
                [`<button>Ok</button>`, function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');
                }, true]
            ],
            drag: false,
        });
    }
}

function handleTranslations() {
    const language = localStorage.getItem('language')

    if (language === 'en' || !language) {
        return translations.en
    }
    if (language === 'pt') {
        return translations.pt
    }
}

function requestPermission(){

    if (Notification.permission == "granted") {
        return getFcmToken()
    }

    return new Promise((resolve, reject) => {
        const managePermissionResult = result => {
            if (result === 'granted') {
                return getFcmToken()
            } else if (result === 'denied') {
                return reject();
            } else {
                return reject();
            }
        };

        iziToast.show({
            icon: 'icon-contacts',
            title: `${handleTranslations().title}`,
            message: `${handleTranslations().message}`,
            position: 'topCenter',
            image: '/static/assets/img/logos/LOGOS-05.png',
            imageWidth: 70,
            color: 'dark',
            backgroundColor: '#5A298D',
            titleColor: '#fff',
            messageColor: '#fff',
            timeout: 0,
            layout: 2,
            buttons: [
                [`<button class="btn-notification">${handleTranslations().buttons.notNow}</button>`, function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');
                }, false],
                [`<button class="btn btn-primary transparent">${handleTranslations().buttons.enable}</button>`, function (instance, toast) {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                    }, toast, 'close', 'btn2');

                    const permissionPromise = Notification.requestPermission(result => {
                        if (permissionPromise) {
                            return;
                        }
                        managePermissionResult(result);
                    });

                    if (permissionPromise) {
                        permissionPromise.then(managePermissionResult);
                    }

                }, true]
            ],
            drag: false
        });

    });

}

function getFcmToken(){
    messaging.getToken().then((token) => {

        console.log(token)

        store.dispatch('setFcmTokenBrowser', token)

        if(store.getters.isLogged){
            if (store.getters.currentUser.role == 'user' && store.getters.currentUser.fcm_token_browser != token) {
                storeUserFcmToken(token, false)
            }
        }else{
            store.watch(
                (state) => {
                    return store.getters.isLogged
                },
                (val, oldVal) => {
                    if (val) {
                        //o usuario esta logado, verificar se o token é igual para atualizar ou nao
                        if (store.getters.isLogged) {

                            if (store.getters.currentUser.role == 'user' && store.getters.currentUser.fcm_token_browser != token) {
                                storeUserFcmToken(token, false)
                            }
                        }
                    }
                },
                {
                    deep: true
                }
            );
        }

    }).then(() => {

        return messaging.onMessage(function (payload) {
            //Play notification audio
            notificationAudio.play()

            notificationHandler(payload.data)
        });
    })

}

