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

const UserEditProfile = (resolve) => {
    require.ensure(['../components/dashboard/edit-profile'], () => {
        resolve(require('../components/dashboard/edit-profile')) // eslint-disable-line global-require
    })
}

const UserCreatePlace = (resolve) => {
    require.ensure(['../components/dashboard/create-place'], () => {
        resolve(require('../components/dashboard/create-place')) // eslint-disable-line global-require
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
                meta: {requiresAuth: false}
            },
            {
                name: 'general.user.settings.about',
                path: '/settings/about',
                component: About,
                meta: {requiresAuth: false}
            },
            {
                name: 'general.user.settings.edit',
                path: '/settings/edit-profile',
                component: UserEditProfile,
                meta: {requiresAuth: false}
            },
            {
                name: 'general.user.settings.createplace',
                path: '/settings/create-place',
                component: UserCreatePlace,
                meta: {requiresAuth: false}
            }
        ]
    }
]
