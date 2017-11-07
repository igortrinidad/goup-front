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

const UserConfig = (resolve) => {
    require.ensure(['../components/dashboard/app-config'], () => {
        resolve(require('../components/dashboard/app-config')) // eslint-disable-line global-require
    })
}

const UserEditProfile = (resolve) => {
    require.ensure(['../components/dashboard/edit-profile'], () => {
        resolve(require('../components/dashboard/edit-profile')) // eslint-disable-line global-require
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
                name: 'general.user.settings.configs',
                path: '/settings/configs',
                component: UserConfig,
                meta: {requiresAuth: false}
            },
            {
                name: 'general.user.settings.edit',
                path: '/settings/edit-profile',
                component: UserEditProfile,
                meta: {requiresAuth: false}
            }
        ]
    }
]
