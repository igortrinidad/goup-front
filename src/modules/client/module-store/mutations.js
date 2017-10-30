import * as TYPES from './mutations-types'
import { findIndex } from 'lodash'
import {localStorageSetItem} from '../../../utils/local'

export default {
    [TYPES.SET_CLIENT_COMPANIES](state, payload) {
        state.companies = payload.companies
    },

    [TYPES.ADD_CLIENT_COMPANY](state, payload) {

        const index = findIndex(state.companies, {id: payload.company.id})

        // check if already exists
        if(index > -1){
            // remove the old object
            state.companies.splice(index, 1)

            // add the new object in same index
            state.companies.splice(index, 0, payload.company)

        }else{
            //add the new company to list
            state.companies.unshift(payload.company)
        }
    },

    [TYPES.REMOVE_CLIENT_COMPANY](state, payload) {

        const index = findIndex(state.companies, {id: payload.company_id})

        // check if already exists
        if(index > -1){
            state.companies.splice(index, 1)
        }
    },

    [TYPES.SET_CLIENT_MONTH_SCHEDULES](state, payload) {
        state.month_schedules = payload.schedules
    },

    [TYPES.SET_CLIENT_SELECTED_DAY_SCHEDULES](state, payload) {
        state.selected_day_schedules = payload.schedules
    },

    [TYPES.ADD_ON_CLIENT_MONTH_SCHEDULES](state, payload) {

        const company_index = findIndex(state.month_schedules, {id: payload.schedule.company_id})

        if(company_index > -1){
            const schedule_index = findIndex(state.month_schedules[company_index].schedules, {id: payload.schedule.id})

            if(schedule_index > -1){

                state.month_schedules[company_index].schedules.splice(schedule_index, 1)
                state.month_schedules[company_index].schedules.splice(schedule_index, 0, payload.schedule)

            }else{

                state.month_schedules[company_index].schedules.push(payload.schedule)
            }
        }
    },

    [TYPES.ADD_ON_CLIENT_SELECTED_DAY_SCHEDULES](state, payload) {

        const company_index = findIndex(state.selected_day_schedules, {id: payload.schedule.company_id})

        if(company_index > -1){
            const schedule_index = findIndex(state.selected_day_schedules[company_index].schedules, {id: payload.schedule.id})

            if(schedule_index > -1){

                state.selected_day_schedules[company_index].schedules.splice(schedule_index, 1)
                state.selected_day_schedules[company_index].schedules.splice(schedule_index, 0, payload.schedule)

            }else{

                state.selected_day_schedules[company_index].schedules.push(payload.schedule)
            }
        }
    },

    [TYPES.REMOVE_FROM_CLIENT_MONTH_SCHEDULES](state, payload) {

        const company_index = findIndex(state.month_schedules, {id: payload.schedule.company_id})

        if(company_index > -1){

            const schedule_index = findIndex(state.month_schedules[company_index].schedules, {id: payload.schedule.id})

            state.month_schedules[company_index].schedules.splice(schedule_index, 1)
        }
    },

    [TYPES.REMOVE_FROM_CLIENT_SELECTED_DAY_SCHEDULES](state, payload) {
        const company_index = findIndex(state.selected_day_schedules, {id: payload.schedule.company_id})

        if(company_index > -1){
            const schedule_index = findIndex(state.selected_day_schedules[company_index].schedules, {id: payload.schedule.id})

            state.selected_day_schedules[company_index].schedules.splice(schedule_index, 1)
        }
    },

    [TYPES.SET_CURRENT_CLIENT](state, payload) {
        state.currentClient = payload.client
    },

    [TYPES.SET_CLIENT_TOTAL_XP](state, {points, rootState}) {

        let user = rootState.Auth.user

        if(user.role == 'client'){
           user.total_xp = points
        }

        localStorageSetItem('user', {user: rootState.Auth.user})
    },

    [TYPES.INCREMENT_CLIENT_TOTAL_XP](state, {points, rootState}) {

        let user = rootState.Auth.user

        if(user.role == 'client'){
           user.total_xp += points
        }

        localStorageSetItem('user', {user: rootState.Auth.user})
    },

    [TYPES.SET_CLIENT_UNREAD_NOTIFICATIONS](state, {unreaded_notifications, rootState}) {

       state.unreaded_notifications = unreaded_notifications
    },

    [TYPES.DECREMENT_CLIENT_UNREAD_NOTIFICATIONS](state, {readed_notifications, rootState}) {

       state.unreaded_notifications = state.unreaded_notifications - readed_notifications
    },
}
