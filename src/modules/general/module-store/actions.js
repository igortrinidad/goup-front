import * as TYPES from './mutations-types'

export const setSelectedPlace = ({ commit }, place) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_COMPANY, {
        place
    })
}


export const setSelectedPlaceRating = ({ commit }, new_ratings) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_COMPANY_RATING, {
        new_ratings
    })
}

export const addSelectedPlaceNewRating = ({ commit }, rating) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_SELECTED_COMPANY_NEW_RATING, {
        rating
    })
}

export const addSelectedPlaceNewRecomendation = ({ commit }, recomendation) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_SELECTED_COMPANY_NEW_RECOMENDATION, {
        recomendation
    })
}
