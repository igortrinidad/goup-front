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

    if(!state.user_last_geolocation.lat){

        var user_from_localstorage = JSON.parse(localStorage.getItem('user_last_geo_location'));

        if(user_from_localstorage){
            return user_from_localstorage;
        }

    }
    
    return state.user_last_geolocation;

}

export const getCities = (state) => {

    if(!state.cities.length){

        var cities = JSON.parse(localStorage.getItem('cities'));

        if(cities){
            return cities;
        }

    }
    
    return state.cities;

}

export const getCategories = (state) => {

    if(!state.categories.length){

        var categories = JSON.parse(localStorage.getItem('categories'));

        if(categories){
            return categories;
        }

    }
    
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
