// Client companies
export const clientCompanies = ({ companies }) => companies


export const isCompanyClient = (state) => (company_id) => {

    let is_company_client = false

    if(state.companies.length){
        state.companies.filter((company) => {

            if(company.id === company_id && company.pivot && company.pivot.is_confirmed){
                is_company_client = company.pivot.is_confirmed
            }
        })
    }

    return is_company_client ? true : false
}

export const checkCompanyRelation = (state) => (company_id) => {

    let relation = {}

    if(state.companies.length){
        state.companies.filter((company) => {

            if(company.id === company_id && company.pivot){
                relation = company.pivot
            }
        })
    }

    return relation
}

export const clientMonthSchedules = ({ month_schedules }) => month_schedules

export const clientSelectedDaySchedules = ({ selected_day_schedules }) => selected_day_schedules
export const currentClient = ({ currentClient }) => currentClient

export const checkPermission = (state, getters, rootState) => (permission) => {

    let currentCompanyId = getters.currentCompany.id
    let has_subscription = rootState.Auth.user.role === 'professional' && rootState.Auth.user.subscription ? true : false
    let check = false

    if(rootState.Auth.user.role === 'client'){
        check = true;
    }

    if(rootState.Auth.user.role === 'professional' && rootState.Client.currentClient.companies.length){

        rootState.Client.currentClient.companies.filter((company) => {

            if(company.id === currentCompanyId && company.pivot && company.pivot.is_confirmed){

                check = company.pivot[permission] ? true : false

            }
        })
    }

    if(rootState.Auth.user.role === 'professional' && has_subscription && rootState.Client.currentClient.professionals.length){

        rootState.Client.currentClient.professionals.filter((professional) => {

            if(professional.id === rootState.Auth.user.id && professional.pivot && professional.pivot.is_confirmed){

                check = professional.pivot[permission] ? true : false

            }
        })
    }

    return check
}

export const clientUnreadedNotifications = ({ unreaded_notifications }) => unreaded_notifications
