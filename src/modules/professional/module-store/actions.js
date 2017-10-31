import * as TYPES from './mutations-types'

export const setProfessionalUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.SET_PROFESSIONAL_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}

export const incrementProfessionalUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.INCREMENT_PROFESSIONAL_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}


export const decrementProfessionalUnreadNotifications = ({ commit, rootState }, readed_notifications) => {

    commit(TYPES.DECREMENT_PROFESSIONAL_UNREAD_NOTIFICATIONS, {
        rootState, readed_notifications
    })
}

