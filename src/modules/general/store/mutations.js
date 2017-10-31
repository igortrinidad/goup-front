import * as TYPES from './mutations-types'
import { findIndex } from 'lodash'
import {localStorageSetItem} from '../../../utils/local'

export default {

    [TYPES.SET_USER_UNREAD_NOTIFICATIONS](state, {unreaded_notifications, rootState}) {

       state.unreaded_notifications = unreaded_notifications
    },

    [TYPES.INCREMENT_USER_UNREAD_NOTIFICATIONS](state, {unreaded_notifications, rootState}) {

        state.unreaded_notifications = state.unreaded_notifications + unreaded_notifications
    },

    [TYPES.DECREMENT_USER_UNREAD_NOTIFICATIONS](state, {readed_notifications, rootState}) {

       state.unreaded_notifications = state.unreaded_notifications - readed_notifications
    },
}
