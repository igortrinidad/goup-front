import * as TYPES from './mutation-types'
import moment from 'moment';

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

export const setUserLastGeolocation = ({ commit }) => {

    var userLastGeoLocation = JSON.parse(localStorage.getItem('user_last_geo_location'));

    //Se a localização for encontrada na localstorage e for válida (menor que 3 horas) retorna a localização
    if(userLastGeoLocation && moment().subtract(3, 'hours').isBefore(moment(userLastGeoLocation.time, 'DD/MM/YYYY HH:mm:ss'))){
        
        window.console.log('Localização encontrada na localStorage e é anterior a 3 horas. (válida)');

    }

    //Se a localização for encontrada na localStorage e NAO for valida (maior que 3 horas) tenta buscar a localização
    //Se não conseguir, retornar a localização que já encontrou
    if(userLastGeoLocation && moment().subtract(3, 'hours').isAfter(moment(userLastGeoLocation.time, 'DD/MM/YYYY HH:mm:ss'))){


        window.console.log('Localização é anterior à 3 horas. (inválida)');


            navigator.geolocation.getCurrentPosition(
                //Success
                function(position){

                    userLastGeoLocation.lat = position.coords.latitude;
                    userLastGeoLocation.lng = position.coords.longitude;
                    userLastGeoLocation.location_granted = true;
                    userLastGeoLocation.time = moment().format('DD/MM/YYYY HH:mm:ss');

                    localStorage.setItem('user_last_geo_location', JSON.stringify(userLastGeoLocation));

                    window.console.log(userLastGeoLocation);
                    window.console.log('Achou a localização, retornando dados e salvando na localStorage');

                },
                //On Error
                function(error){

                    window.console.log('Não foi possível localizar o usuário, ou o usuário não permitiu.');


                }, 
                //options
                { enableHighAccuracy: true }

            );


    //Se não encontrar, retornará o objeto vazio que será utilizado para direcionar o user para a página welcome: '/'
    } 

    if(!userLastGeoLocation){

        window.console.log('Localização ainda não foi salva ou não foi permitida');

        userLastGeoLocation = {
            location_granted: false,
            lat: null,
            lng: null,
            time: null
        }
    }

    commit(TYPES.SET_USER_LAST_GEOLOCATION, {
        userLastGeoLocation
    })
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




