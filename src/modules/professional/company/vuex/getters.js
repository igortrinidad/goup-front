// http://vuex.vuejs.org/en/getters.html
import { isEmpty } from 'lodash'


export const currentCompany = (state) => {

    return state.currentCompany
}

// return all professional companies
export const professionalCompanies = (state, rootState) => {

    return rootState.currentUser.companies
}

//Check if profissional is a company admin
export const isCompanyAdmin = (state, rootState) => (company_id) => {

    let companies = rootState.currentUser.companies

    let is_admin = false

    if(companies.length){
        companies.filter((company) => {
            if(company.id === company_id && company.pivot && company.pivot.is_confirmed){
                is_admin = company.pivot.is_admin
            }
        })
    }

    return is_admin ? true : false
}

//Check if profissional is a company admin
export const isCompanyProfessional = (state, rootState) => (company_id) => {

    let companies = rootState.currentUser.companies

    let is_company_professional = false
    if(companies.length){
        companies.filter((company) => {

            if(company.id === company_id && company.pivot && company.pivot.is_confirmed){
                is_company_professional = company.pivot.is_confirmed
            }
        })
    }

    return is_company_professional ? true : false
}


export const selectedCategory = ({ selectedCategory }) => selectedCategory

export const selectedProfessional = ({ selectedProfessional }) => selectedProfessional

export const monthSchedules = ({ month_schedules }) => month_schedules

export const selectedDaySchedules = ({ selected_day_schedules }) => selected_day_schedules

export const calendarView = ({ calendar_view }) => calendar_view

export const categoryCalendarSettings = ({ category_calendar_settings }) => category_calendar_settings


