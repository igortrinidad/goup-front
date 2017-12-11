import * as TYPES from './mutation-types'
import moment from 'moment';
import store from '../store'

export const setEnv = ({ commit }, env) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.SET_ENV, env)
}



export const setLoading = ({ commit }, options) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_LOADING, {
        options
    })
}

export const setLanguage = ({ commit }, language) => {

    localStorage.setItem('language', language);

    commit(TYPES.SET_LANGUAGE, {
        language
    })
}

export const setCities = ({ commit }) => {


    var userLastGeoLocation = JSON.parse(localStorage.getItem('user_last_geo_location'));

    if(!userLastGeoLocation){
        return false
    }

    window.$vueinstance.$http.post(`city/near_by_location`, {
        lat: userLastGeoLocation.lat,
        lng: userLastGeoLocation.lng,
        radius: 100
    })
        .then(function (response) {
            var cities = response.data.cities

            localStorage.setItem('cities', JSON.stringify(cities));

            commit(TYPES.SET_CITIES, {
                cities
            })

        })
        .catch(function (error) {
            console.log(error)
        });


}

export const setCategories = ({ commit }) => {


    var categories = JSON.parse(localStorage.getItem('categories'));

    //Se não encontrar categorias salvas
    if(!categories || !categories.length){
        window.$vueinstance.$http.get(`event/categories/${localStorage.getItem('language')}`)
            .then(function (response) {
               var categories = response.data.categories

               localStorage.setItem('categories', JSON.stringify(categories));

                commit(TYPES.SET_CATEGORIES, {
                    categories
                })

            })
            .catch(function (error) {
                console.log(error)
            });

    //Se encontrar categorias salvas
    } else {

        var userLastGeoLocation = JSON.parse(localStorage.getItem('user_last_geo_location'));

        //Se a localização for encontrada na localstorage e for válida (menor que 3 horas) retorna a localização
        if(window.checkUserLastLocation() == 'is_valid'){


           commit(TYPES.SET_CATEGORIES, {
                categories
            })

        } else {

            window.$vueinstance.$http.get(`event/categories/${localStorage.getItem('language')}`)
                .then(function (response) {
                   var categories = response.data.categories

                   localStorage.setItem('categories', JSON.stringify(categories));

                    commit(TYPES.SET_CATEGORIES, {
                        categories
                    })

                })
                .catch(function (error) {
                    console.log(error)
                });
        }

    }


}

export const setUserLastGeolocation = ({ commit }) => {



    var userLastGeoLocation = JSON.parse(localStorage.getItem('user_last_geo_location'));

    //Se a localização for encontrada na localstorage e for válida (menor que 3 horas) retorna a localização
    if(window.checkUserLastLocation() == 'is_valid'){

        window.console.log('Localização encontrada na localStorage e é anterior a 3 horas. (válida)');

        if (store.getters.isLogged) {
            store.dispatch('setCities');
        }
        store.dispatch('setCategories');

    }

    //Se a localização for encontrada na localStorage e NAO for valida (maior que 3 horas) tenta buscar a localização
    //Se não conseguir, retornar a localização que já encontrou
    if(window.checkUserLastLocation() == 'is_invalid'){


        window.console.log('Localização é anterior à 3 horas. (inválida)');


            navigator.geolocation.getCurrentPosition(
                //Success
                function(position){

                    userLastGeoLocation.lat = position.coords.latitude;
                    userLastGeoLocation.lng = position.coords.longitude;
                    userLastGeoLocation.location_granted = true;
                    userLastGeoLocation.time = moment().format('DD/MM/YYYY HH:mm:ss');

                    localStorage.setItem('user_last_geo_location', JSON.stringify(userLastGeoLocation));

                    window.console.log('Achou a localização, retornando dados e salvando na localStorage');

                    if (store.getters.isLogged) {
                        store.dispatch('setCities');
                    }
                    store.dispatch('setCategories');

                    commit(TYPES.SET_USER_LAST_GEOLOCATION, {
                        userLastGeoLocation
                    })

                },
                //On Error
                function(error){

                    window.console.log('Não foi possível localizar o usuário, ou o usuário não permitiu.');

                    var geolocation_attempts = JSON.parse(localStorage.getItem('geolocation_attempts'));

                    if(!geolocation_attempts){
                        localStorage.setItem('geolocation_attempts', 1);
                    } else {
                        localStorage.setItem('geolocation_attempts', geolocation_attempts++);
                    }

                    //Shut user out to enable or check geolocation
                    if(geolocation_attempts == 10){

                        userLastGeoLocation = {
                            location_granted: false,
                            lat: null,
                            lng: null,
                            time: null
                        }

                        commit(TYPES.SET_USER_LAST_GEOLOCATION, {
                            userLastGeoLocation
                        })

                        localStorage.setItem('user_last_geo_location', userLastGeoLocation);

                    }

                },
                //options
                { enableHighAccuracy: true }

            );


    //Se não encontrar, retornará o objeto vazio que será utilizado para direcionar o user para a página welcome: '/'
    }

    if(window.checkUserLastLocation() == false){

        window.console.log('Localização ainda não foi salva ou não foi permitida');

        userLastGeoLocation = {
            location_granted: false,
            lat: null,
            lng: null,
            time: null
        }

        commit(TYPES.SET_USER_LAST_GEOLOCATION, {
            userLastGeoLocation
        })
    }

    
}

export const updateUserGeolocation = ({ commit }) => {

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

            commit(TYPES.UPDATE_USER_GEOLOCATION, {
                userLastGeoLocation
            })

            window.console.log('Localização atualizada com sucesso');


        },
        //On Error
        function(error){

            window.console.log('Não foi possível localizar o usuário, ou o usuário não permitiu.');

        },

        //options
        { enableHighAccuracy: true }

    );


}

export const disableLoader = ({ commit }, option) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.DISABLE_LOADER, {
        option
    })
}

export const setFcmTokenMobile = ({ commit }, token) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.SET_FCM_TOKEN_MOBILE, token)
}

export const setFcmTokenBrowser = ({ commit }, token) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.SET_FCM_TOKEN_BROWSER, token)
}

export const handleUserInteraction = ({ commit }, payload ) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.HANDLE_USER_INTERACTION, payload)
}

export const addNewEvent = ({ commit }, event ) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_NEW_EVENT, event)
}







