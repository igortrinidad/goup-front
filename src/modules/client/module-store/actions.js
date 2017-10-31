import * as TYPES from './mutations-types'
import {cloneDeep} from 'lodash'

export const setClientCompanies = ({ commit }, companies) => {

    commit(TYPES.SET_CLIENT_COMPANIES, {
        companies
    })
}

export const addClientCompany = ({ commit }, company) => {

    company = cloneDeep(company)

    commit(TYPES.ADD_CLIENT_COMPANY, {
        company
    })
}

export const removeClientCompany = ({ commit }, company_id) => {

    commit(TYPES.REMOVE_CLIENT_COMPANY, {
        company_id
    })
}

export const setClientMonthSchedules = ({ commit }, schedules) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_CLIENT_MONTH_SCHEDULES, {
        schedules
    })
}

export const setClientSelectedDaySchedules = ({ commit }, schedules) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_CLIENT_SELECTED_DAY_SCHEDULES, {
        schedules
    })
}

export const addOnClientMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_CLIENT_MONTH_SCHEDULES, {
        schedule
    })
}

export const addOnClientSelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_ON_CLIENT_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const removeFromClientMonthSchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_CLIENT_MONTH_SCHEDULES, {
        schedule
    })
}

export const removeFromClientSelectedDaySchedules = ({ commit }, schedule) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_FROM_CLIENT_SELECTED_DAY_SCHEDULES, {
        schedule
    })
}

export const setCurrentClient = ({ commit }, client) => {

    commit(TYPES.SET_CURRENT_CLIENT, {
        client
    })
}

export const setClientTotalXp = ({ commit, rootState }, points) => {

    commit(TYPES.SET_CLIENT_TOTAL_XP, {
        rootState, points
    })
}

export const incrementClientTotalXp = ({ commit, rootState }, points) => {

    commit(TYPES.INCREMENT_CLIENT_TOTAL_XP, {
        rootState, points
    })
}

export const setClientUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.SET_CLIENT_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}

export const incrementClientUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.INCREMENT_CLIENT_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}


export const decrementClientUnreadNotifications = ({ commit, rootState }, readed_notifications) => {

    commit(TYPES.DECREMENT_CLIENT_UNREAD_NOTIFICATIONS, {
        rootState, readed_notifications
    })
}



