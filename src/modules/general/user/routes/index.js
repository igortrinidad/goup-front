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

export default [
    {
        path: 'user',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'general.user.settings',
                path: '/settings',
                component: Settings,
                meta: {requiresAuth: false}
            }
        ]
    }
]
