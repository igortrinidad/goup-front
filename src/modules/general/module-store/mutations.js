import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_SELECTED_COMPANY](state, payload) {
        state.selectedPlace = payload.place
    },

    [TYPES.SET_SELECTED_COMPANY_RATING](state, payload) {
        state.selectedPlace.current_rating = payload.new_ratings.current_rating
        state.selectedPlace.total_rating = payload.new_ratings.total_rating
    },

    [TYPES.ADD_SELECTED_COMPANY_NEW_RATING](state, payload) {
        state.selectedPlace.last_ratings.unshift(payload.rating)
    },

    [TYPES.ADD_SELECTED_COMPANY_NEW_RECOMENDATION](state, payload) {
        state.selectedPlace.last_recomendations.unshift(payload.recomendation)
    },

}
