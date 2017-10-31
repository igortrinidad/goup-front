import * as TYPES from './mutations-types'
import {cloneDeep} from 'lodash'

export const setUserUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.SET_USER_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}

export const incrementUserUnreadNotifications = ({ commit, rootState }, unreaded_notifications) => {

    commit(TYPES.INCREMENT_USER_UNREAD_NOTIFICATIONS, {
        rootState, unreaded_notifications
    })
}


export const decrementUserUnreadNotifications = ({ commit, rootState }, readed_notifications) => {

    commit(TYPES.DECREMENT_USER_UNREAD_NOTIFICATIONS, {
        rootState, readed_notifications
    })
}



