// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_LOADING](state, payload) {
        state.loader = payload.options
    },

    [TYPES.SET_LANGUAGE](state, payload) {

        state.language = payload.language
    },

    [TYPES.SET_CITIES](state, payload) {

        state.cities = payload.cities
    },

    [TYPES.SET_CATEGORIES](state, payload) {

        state.categories = payload.categories
    },

    [TYPES.SET_USER_LAST_GEOLOCATION](state, payload) {
        
        state.user_last_geolocation = payload.userLastGeoLocation
    },

    [TYPES.SET_ENV](state, payload) {
        state.env = payload
    },

    [TYPES.DISABLE_LOADER](state, payload) {
        state.disable_loader = payload.option
    },

    [TYPES.SET_FCM_TOKEN_MOBILE](state, token) {
        state.fcm_token_mobile = token
    },

    [TYPES.SET_FCM_TOKEN_BROWSER](state, token) {
        state.fcm_token_browser = token
    },
}
