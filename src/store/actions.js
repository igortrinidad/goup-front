import * as TYPES from './mutations-types'

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




