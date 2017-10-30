

// get current ENVRONMENT
export const currentEnv = ({ env }) => env

//Loader getter
export const loader = ({ loader }) => loader

export const disableLoader = ({ disable_loader }) => disable_loader

//Compares the required role with current user role
export const checkRole = ({Auth}) => (role) => {
    return Auth.user.role === role
}
// Returns the user current role
export const userRole = ({Auth}) => Auth.user && Auth.user.role


export const userProgress = ({Auth}) => {
    let user = Auth.user

    let percent = Math.round((user.current_xp / (user.level * 100)) * 100)

    let to_next_level = (user.level * 100) - user.current_xp

    let current_level_xp = user.level * 100

    return {
        percent,
        to_next_level,
        current_xp: user.current_xp,
        total_xp: user.total_xp,
        current_level: user.level,
        current_level_xp
    }
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
export const AuthToken = ({ Auth }) => Auth.token.token
