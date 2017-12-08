const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const Categories = (resolve) => {
    require.ensure(['../components/categories'], () => {
        resolve(require('../components/categories')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: 'secret',
        component: Main,
        meta: {requiresAuth: true},
        children: [
            {
                name: 'secret.categories',
                path: '/secret/categories',
                component: Categories,
                meta: {requiresAuth: true}
            },
        ]
    }
]
