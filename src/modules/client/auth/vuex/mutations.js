// https://vuex.vuejs.org/en/mutations.html

import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_TOKEN] (state, value) {
        state.token = value
    },
    [TYPES.SET_USER](state, payload) {
        state.user = payload.user
    },
    [TYPES.SET_AVATAR](state, payload) {
        state.user.avatar = payload.avatar
    },
}
