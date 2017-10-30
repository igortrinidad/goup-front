
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */


const Dashboard = (resolve) => {
    require.ensure(['../components/dashboard/index'], () => {
        resolve(require('../components/dashboard/index')) // eslint-disable-line global-require
    })
}

const HistoryEvaluations = (resolve) => {
    require.ensure(['../components/dashboard/partials/history-evaluations'], () => {
        resolve(require('../components/dashboard/partials/history-evaluations')) // eslint-disable-line global-require
    })
}

const ProfileEdit = (resolve) => {
    require.ensure(['../components/profile-edit'], () => {
        resolve(require('../components/profile-edit')) // eslint-disable-line global-require
    })
}

const ProfileShow = (resolve) => {
    require.ensure(['../components/profile-show'], () => {
        resolve(require('../components/profile-show')) // eslint-disable-line global-require
    })
}

const CalendarDay = (resolve) => {
    require.ensure(['../components/dashboard/calendar/calendar-day'], () => {
        resolve(require('../components/dashboard/calendar/calendar-day')) // eslint-disable-line global-require
    })
}

const ShowCalendarSchedule = (resolve) => {
    require.ensure(['../components/dashboard/calendar/schedule-show'], () => {
        resolve(require('../components/dashboard/calendar/schedule-show')) // eslint-disable-line global-require
    })
}
const ShowCalendarSingSchedule = (resolve) => {
    require.ensure(['../components/dashboard/calendar/single-schedule-show'], () => {
        resolve(require('../components/dashboard/calendar/single-schedule-show')) // eslint-disable-line global-require
    })
}

const Notifications = (resolve) => {
    require.ensure(['../components/notifications'], () => {
        resolve(require('../components/notifications')) // eslint-disable-line global-require
    })
}


export default [
    {
        name: 'client.dashboard',
        path: 'dashboard/:client_id',
        component: Dashboard,
        meta: { requiresAuth: true},
    },
    {
        name: 'client.dashboard.history.evaluations',
        path: 'dashboard/historico/:index_history',
        component: HistoryEvaluations,
        meta: { requiresAuth: true},
    },
    {
        name: 'client.profile.edit',
        path: 'editar-perfil',
        component: ProfileEdit,
        meta: { requiresAuth: true},
    },
    {
        name: 'client.profile.show',
        path: 'mostrar-perfil',
        component: ProfileShow,
        meta: { requiresAuth: true},
    },
    {
        name: 'client.notifications',
        path: 'notificacoes',
        component: Notifications,
        meta: { requiresAuth: true },
    },
    {
        name: 'client.dashboard.calendar.day',
        path: 'dashboard/calendar/:day',
        component: CalendarDay,
        meta: { requiresAuth: true},
    },
    {
        name: 'client.dashboard.calendar.show.schedule',
        path: 'dashboard/calendar/:day/schedule/:schedule_id',
        component: ShowCalendarSchedule,
        meta: {requiresAuth: true}
    },
    {
        name: 'client.dashboard.calendar.show.single-schedule',
        path: 'dashboard/calendar/:day/single-schedule/:single_schedule_id',
        component: ShowCalendarSingSchedule,
        meta: {requiresAuth: true}
    }
]
