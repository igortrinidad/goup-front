import * as TYPES from './mutations-types'

export default {

    [TYPES.SET_PROFESSIONAL_UNREAD_NOTIFICATIONS](state, {unreaded_notifications, rootState}) {

        state.unreaded_notifications = unreaded_notifications
    },

    [TYPES.INCREMENT_PROFESSIONAL_UNREAD_NOTIFICATIONS](state, {unreaded_notifications, rootState}) {

        state.unreaded_notifications = state.unreaded_notifications + unreaded_notifications
    },

    [TYPES.DECREMENT_PROFESSIONAL_UNREAD_NOTIFICATIONS](state, {readed_notifications, rootState}) {

        state.unreaded_notifications = state.unreaded_notifications - readed_notifications
    },
}
