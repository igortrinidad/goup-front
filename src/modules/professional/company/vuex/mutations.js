// https://vuex.vuejs.org/en/mutations.html

import * as TYPES from './mutations-types'
import {localStorageSetItem} from '../../../../utils/local'
import { findIndex } from 'lodash'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_CURRENT_COMPANY](state, payload) {
        state.currentCompany = payload.company

        localStorageSetItem('current_company', payload.company.id)
    },

    [TYPES.ACCEPT_CURRENT_SOLICITATION](state, {company_id, rootState}) {

        let companies = rootState.Auth.user.companies

        if(companies.length){
            companies.filter((company) => {

                if(company.id === company_id){
                    company.pivot.is_confirmed = true
                }
            })
        }

        localStorageSetItem('user', {user: rootState.Auth.user})
    },

    [TYPES.SET_SELECTED_CATEGORY](state, payload) {
        state.selectedCategory = payload.category
    },

    [TYPES.SET_SELECTED_PROFESSIONAL](state, payload) {
        state.selectedProfessional = payload.professional
    },

    [TYPES.SET_MONTH_SCHEDULES](state, payload) {
        state.month_schedules = payload.schedules
    },

    [TYPES.SET_SELECTED_DAY_SCHEDULES](state, payload) {
        state.selected_day_schedules = payload.schedules
    },

    [TYPES.ADD_ON_MONTH_SCHEDULES](state, payload) {

        const professional_index = findIndex(state.month_schedules, {professional_id: payload.schedule.professional_id})
        if(professional_index > -1){
            const schedule_index = findIndex(state.month_schedules[professional_index].schedules, {id: payload.schedule.id})

            if(schedule_index > -1){

                state.month_schedules[professional_index].schedules.splice(schedule_index, 1)
                state.month_schedules[professional_index].schedules.splice(schedule_index, 0, payload.schedule)

            }else{

                state.selected_day_schedules.push(payload.schedule)
            }
        }

    },

    [TYPES.ADD_ON_SELECTED_DAY_SCHEDULES](state, payload) {

        const professional_index = findIndex(state.selected_day_schedules, {id: payload.schedule.professional_id})


        if(professional_index > -1){

            const schedule_index = findIndex(state.selected_day_schedules[professional_index].schedules, {id: payload.schedule.id})

            if(schedule_index > -1){

                state.selected_day_schedules[professional_index].schedules.splice(schedule_index, 1)
                state.selected_day_schedules[professional_index].schedules.splice(schedule_index, 0, payload.schedule)

            }else{

                state.selected_day_schedules[professional_index].schedules.push(payload.schedule)
            }
        }
    },

    [TYPES.REMOVE_FROM_MONTH_SCHEDULES](state, payload) {

        const professional_index = findIndex(state.month_schedules, {professional_id: payload.schedule.professional_id})

       if(professional_index > -1){
           const schedule_index = findIndex(state.month_schedules[professional_index].schedules, {id: payload.schedule.id})

           state.month_schedules[professional_index].schedules.splice(schedule_index, 1)
       }

    },

    [TYPES.REMOVE_FROM_SELECTED_DAY_SCHEDULES](state, payload) {
        const professional_index = findIndex(state.selected_day_schedules, {id: payload.schedule.professional_id})

        if(professional_index > -1) {
            const schedule_index = findIndex(state.selected_day_schedules[professional_index].schedules, {id: payload.schedule.id})

            state.selected_day_schedules[professional_index].schedules.splice(schedule_index, 1)
        }

    },

    [TYPES.SET_CALENDAR_VIEW](state, payload) {

        state.calendar_view = payload.view

    },

    [TYPES.ADD_ON_COMPANY_MONTH_SCHEDULES](state, payload) {

        const company_index = findIndex(state.month_schedules, {company_id: payload.schedule.company_id, category_id: payload.schedule.category_id})

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

    [TYPES.ADD_ON_COMPANY_SELECTED_DAY_SCHEDULES](state, payload) {

        const company_index = findIndex(state.selected_day_schedules, {id: payload.schedule.company_id, category_id: payload.schedule.category_id })

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

    [TYPES.REMOVE_FROM_COMPANY_MONTH_SCHEDULES](state, payload) {

        const company_index = findIndex(state.month_schedules, {company_id: payload.schedule.company_id, category_id: payload.schedule.category_id})

        if(company_index > -1) {
            const schedule_index = findIndex(state.month_schedules[company_index].schedules, {id: payload.schedule.id})

            state.month_schedules[company_index].schedules.splice(schedule_index, 1)
        }

    },

    [TYPES.REMOVE_FROM_COMPANY_SELECTED_DAY_SCHEDULES](state, payload) {
        const company_index = findIndex(state.selected_day_schedules, {id: payload.schedule.company_id, category_id: payload.schedule.category_id})

        if(company_index > -1) {
            const schedule_index = findIndex(state.selected_day_schedules[company_index].schedules, {id: payload.schedule.id})

            state.selected_day_schedules[company_index].schedules.splice(schedule_index, 1)
        }

    },

    [TYPES.UPDATE_PROFESSIONAL_COMPANIES](state, {companies, rootState}) {

        rootState.Auth.user.companies = companies


        localStorageSetItem('user', {user: rootState.Auth.user})
    },

    [TYPES.SET_CATEGORY_CALENDAR_SETTINGS](state, payload) {
        state.category_calendar_settings = payload.category_calendar_settings
    },
}
