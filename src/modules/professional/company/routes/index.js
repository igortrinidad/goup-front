
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const List = (resolve) => {
    require.ensure(['../components/list'], () => {
        resolve(require('../components/list')) // eslint-disable-line global-require
    })
}

const DashboardCompany = (resolve) => {
    require.ensure(['../components/dashboard'], () => {
        resolve(require('../components/dashboard')) // eslint-disable-line global-require
    })
}

const EditCalendar = (resolve) => {
    require.ensure(['../components/calendar/edit'], () => {
        resolve(require('../components/calendar/edit')) // eslint-disable-line global-require
    })
}

const ShowCalendar = (resolve) => {
    require.ensure(['../components/calendar/show'], () => {
        resolve(require('../components/calendar/show')) // eslint-disable-line global-require
    })
}

const ShowCalendarDay = (resolve) => {
    require.ensure(['../components/calendar/show-day'], () => {
        resolve(require('../components/calendar/show-day')) // eslint-disable-line global-require
    })
}

const ShowCalendarSchedule = (resolve) => {
    require.ensure(['../components/calendar/schedule-show'], () => {
        resolve(require('../components/calendar/schedule-show')) // eslint-disable-line global-require
    })
}

const ShowCalendarSingleSchedule = (resolve) => {
    require.ensure(['../components/calendar/single-schedule-show'], () => {
        resolve(require('../components/calendar/single-schedule-show')) // eslint-disable-line global-require
    })
}

const ShowCompanyClient = (resolve) => {
    require.ensure(['../components/client/index'], () => {
        resolve(require('../components/client/index')) // eslint-disable-line global-require
    })
}

const ShowCompanyProfessional = (resolve) => {
    require.ensure(['../components/professional/index'], () => {
        resolve(require('../components/professional/index')) // eslint-disable-line global-require
    })
}

const ShowProfessionalCalendar = (resolve) => {
    require.ensure(['../components/calendar/professional'], () => {
        resolve(require('../components/calendar/professional')) // eslint-disable-line global-require
    })
}

const Create = (resolve) => {
    require.ensure(['../components/create'], () => {
        resolve(require('../components/create')) // eslint-disable-line global-require
    })
}

const CreateEditPlan = (resolve) => {
    require.ensure(['../components/plans/create-edit'], () => {
        resolve(require('../components/plans/create-edit')) // eslint-disable-line global-require
    })
}

const Edit = (resolve) => {
    require.ensure(['../components/edit'], () => {
        resolve(require('../components/edit')) // eslint-disable-line global-require
    })
}

const Calendar = (resolve) => {
    require.ensure(['../components/calendar'], () => {
        resolve(require('../components/calendar')) // eslint-disable-line global-require
    })
}

const Insights = (resolve) => {
    require.ensure(['../components/calendar/insights'], () => {
        resolve(require('../components/calendar/insights')) // eslint-disable-line global-require
    })
}

const InsightsInvoices = (resolve) => {
    require.ensure(['../components/invoices/insights'], () => {
        resolve(require('../components/invoices/insights')) // eslint-disable-line global-require
    })
}



export default [
    {
        path: 'empresas',
        component: Main,
        meta: {requiresAuth: true},
        children: [
            {
                name: 'admin.companies.list',
                path: '',
                component: List,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.show',
                path: 'mostrar/:company_id',
                component: DashboardCompany,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.show.single-schedule',
                path: 'mostrar/:company_id/single-schedule/:single_schedule_id',
                component: ShowCalendarSingleSchedule,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.show.schedule',
                path: 'mostrar/:company_id/schedule/:schedule_id',
                component: ShowCalendarSchedule,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.client.show',
                path: 'mostrar/:company_id/gerenciar-cliente/:client_id',
                component: ShowCompanyClient,
                meta: {requiresAuth: true}
            },

            {
                name: 'admin.companies.professional.show',
                path: 'mostrar/:company_id/gerenciar-profissional/:professional_id',
                component: ShowCompanyProfessional,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.professional',
                path: 'mostrar/:company_id/agenda/:category_slug/:professional_id',
                component: ShowProfessionalCalendar,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.create',
                path: 'adicionar',
                component: Create,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.edit',
                path: 'editar/:company_id',
                component: Edit,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.plans.create-edit',
                path: 'planos/:company_id/editar',
                component: CreateEditPlan,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.invoices.insights',
                path: 'planos/:company_id/insights',
                component: InsightsInvoices,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.insights',
                path: 'insights-agendamentos/:company_id',
                component: Insights,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.show',
                path: 'mostrar/:company_id/:category_slug',
                component: ShowCalendar,
                meta: {requiresAuth: true}
            },
            {
                name: 'admin.companies.calendar.show.day',
                path: 'mostrar/:company_id/:category_slug/:day',
                component: ShowCalendarDay,
                meta: {requiresAuth: true}
            },

            {
                name: 'admin.companies.calendar.edit',
                path: 'editar/:company_id/:category_slug',
                component: EditCalendar,
                meta: {requiresAuth: true}
            },
        ]
    }
]
