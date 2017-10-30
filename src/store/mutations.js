// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_LOADING](state, payload) {
        state.loader = payload.options
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
