import * as TYPES from './mutations-types'

export const setSelectedCompany = ({ commit }, company) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_COMPANY, {
        company
    })
}


export const setSelectedCompanyRating = ({ commit }, new_ratings) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_COMPANY_RATING, {
        new_ratings
    })
}

export const addSelectedCompanyNewRating = ({ commit }, rating) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_SELECTED_COMPANY_NEW_RATING, {
        rating
    })
}

export const addSelectedCompanyNewRecomendation = ({ commit }, recomendation) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_SELECTED_COMPANY_NEW_RECOMENDATION, {
        recomendation
    })
}
