var moment = require('moment');

// get current ENVRONMENT
export const currentEnv = ({ env }) => env

//Loader getter
export const loader = ({ loader }) => loader

export const disableLoader = ({ disable_loader }) => disable_loader

// get current language
export const language = (state) => {
    
    const language = !_.isEmpty(state.language) ? state.language : localStorage.getItem('language')

    if (language === 'en' || !language || language == "undefined") {
        localStorage.setItem('language', 'en');
        return 'en'
    }
    if (language === 'pt') {
        return 'pt'
    }
}


export const getUserLastGeoLocation = (state) => {

    return state.user_last_geolocation;

}

export const getCities = (state) => {

    return state.cities;

}

export const getCategories = (state) => {

    return state.categories;

}

//check if is iOS
export const checkIOS = () => {
    const cordova = window.cordova

    if(cordova){
        return cordova.platformId == 'ios' ? true : false
    }

    if(!cordova){
        return false
    }

}

// get current token
export const AuthToken = ({ Auth }) => Auth.token
