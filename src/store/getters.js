

// get current ENVRONMENT
export const currentEnv = ({ env }) => env

//Loader getter
export const loader = ({ loader }) => loader

export const disableLoader = ({ disable_loader }) => disable_loader

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

//check language defined
export const checkLanguage = () => {

    var language = localStorage.getItem('language');

    if(!language){
    	localStorage.setItem('language', 'en')
        return 'en';
    } else {
    	return language
    }

}

// get current token
export const AuthToken = ({ Auth }) => Auth.token.token
