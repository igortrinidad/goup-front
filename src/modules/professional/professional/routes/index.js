
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const ProfileEdit = (resolve) => {
    require.ensure(['../components/profile-edit'], () => {
        resolve(require('../components/profile-edit')) // eslint-disable-line global-require
    })
}

const Dashboard = (resolve) => {
    require.ensure(['../components/dashboard'], () => {
        resolve(require('../components/dashboard')) // eslint-disable-line global-require
    })
}
const ShowCalendarDay = (resolve) => {
    require.ensure(['../components/calendar/show-day'], () => {
        resolve(require('../components/calendar/show-day')) // eslint-disable-line global-require
    })
}
const ShowDaySchedule = (resolve) => {
    require.ensure(['../components/calendar/schedule-show'], () => {
        resolve(require('../components/calendar/schedule-show')) // eslint-disable-line global-require
    })
}
const ShowDaySingleSchedule = (resolve) => {
    require.ensure(['../components/calendar/single-schedule-show'], () => {
        resolve(require('../components/calendar/single-schedule-show')) // eslint-disable-line global-require
    })
}

const Notifications = (resolve) => {
    require.ensure(['../components/notifications'], () => {
        resolve(require('../components/notifications')) // eslint-disable-line global-require
    })
}


export default [

    {
        name: 'admin.professional.dashboard',
        path: '/profissional/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        name: 'admin.professional.dashboard.calendar.day',
        path: '/profissional/dashboard/calendar/:day',
        component: ShowCalendarDay,
        meta: { requiresAuth: true },
    },
    {
        name: 'admin.professional.dashboard.schedule.show',
        path: '/profissional/dashboard/calendar/:day/:schedule_id',
        component: ShowDaySchedule,
        meta: { requiresAuth: true },
    },
    {
        name: 'admin.professional.dashboard.single-schedule.show',
        path: '/profissional/dashboard/calendar/:day/single-schedule/:single_schedule_id',
        component: ShowDaySingleSchedule,
        meta: { requiresAuth: true },
    },
    {
        name: 'professional.profile.edit',
        path: 'profissional/editar-perfil',
        component: ProfileEdit,
        meta: { requiresAuth: true },
    },
    {
        name: 'professional.notifications',
        path: 'profissional/notificacoes',
        component: Notifications,
        meta: { requiresAuth: true },
    },
]
