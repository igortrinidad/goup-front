import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_SELECTED_COMPANY](state, payload) {
        state.selectedCompany = payload.company
    },

    [TYPES.SET_SELECTED_COMPANY_RATING](state, payload) {
        state.selectedCompany.current_rating = payload.new_ratings.current_rating
        state.selectedCompany.total_rating = payload.new_ratings.total_rating
    },

    [TYPES.ADD_SELECTED_COMPANY_NEW_RATING](state, payload) {
        state.selectedCompany.last_ratings.unshift(payload.rating)
    },

    [TYPES.ADD_SELECTED_COMPANY_NEW_RECOMENDATION](state, payload) {
        state.selectedCompany.last_recomendations.unshift(payload.recomendation)
    },

}
