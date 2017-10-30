import * as TYPES from './mutations-types'


export const setCurrentCompany = ({ commit }, company) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_CURRENT_COMPANY, {
        company
    })
}

export const acceptCompanySolicitation = ({ commit, rootState }, company_id) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ACCEPT_CURRENT_SOLICITATION, {
        rootState, company_id
    })
}

export const setSelectedCategory = ({ commit }, category) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_CATEGORY, {
        category
    })
}

export const setSelectedProfessional = ({ commit }, professional) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_PROFESSIONAL, {
        professional
    })
}

export const setMonthSchedules = ({ commit }, schedules) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_MONTH_SCHEDULES, {
        schedules
    })
}

export const setSelectedDaySchedules = ({ commit }, schedules) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_SELECTED_DAY_SCHEDULES, {
        schedules
    })
}

export const addOnMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_MONTH_SCHEDULES, {
        schedule
    })
}

export const addOnSelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const removeFromMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_MONTH_SCHEDULES, {
        schedule
    })
}

export const removeFromSelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const setCalendarView = ({ commit }, view) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_CALENDAR_VIEW, {
        view
    })
}

export const addOnCompanyMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_COMPANY_MONTH_SCHEDULES, {
        schedule
    })
}

export const addOnCompanySelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_COMPANY_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const removeFromCompanyMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_COMPANY_MONTH_SCHEDULES, {
        schedule
    })
}

export const removeFromCompanySelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_COMPANY_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const updateProfessionalCompanies = ({ commit, rootState }, companies) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.UPDATE_PROFESSIONAL_COMPANIES, {
        rootState, companies
    })
}

export const setCategoryCalendarSettings = ({ commit }, category_calendar_settings) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_CATEGORY_CALENDAR_SETTINGS, {
        category_calendar_settings
    })
}


