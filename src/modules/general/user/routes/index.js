const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const Settings = (resolve) => {
    require.ensure(['../components/settings'], () => {
        resolve(require('../components/settings')) // eslint-disable-line global-require
    })
}

const About = (resolve) => {
    require.ensure(['../components/dashboard/about'], () => {
        resolve(require('../components/dashboard/about')) // eslint-disable-line global-require
    })
}

const Show = (resolve) => {
    require.ensure(['../components/show'], () => {
        resolve(require('../components/show')) // eslint-disable-line global-require
    })
}


const UserEditProfile = (resolve) => {
    require.ensure(['../components/dashboard/edit-profile'], () => {
        resolve(require('../components/dashboard/edit-profile')) // eslint-disable-line global-require
    })
}

const UserFavorites = (resolve) => {
    require.ensure(['../components/favorites'], () => {
        resolve(require('../components/favorites')) // eslint-disable-line global-require
    })
}

const UserEvents = (resolve) => {
    require.ensure(['../components/events'], () => {
        resolve(require('../components/events')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: 'user',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'general.user.settings',
                path: '/settings/:settings_saved?',
                component: Settings,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.user.settings.about',
                path: '/settings/about',
                component: About,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.user.settings.edit',
                path: '/settings/edit-profile',
                component: UserEditProfile,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.user.favorites',
                path: '/favorites',
                component: UserFavorites,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.user.events',
                path: '/events',
                component: UserEvents,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.user.show',
                path: ':user_slug',
                component: Show,
                meta: {requiresAuth: true}
            },
        ]
    }
]
