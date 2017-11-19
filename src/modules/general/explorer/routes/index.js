const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const Show = (resolve) => {
    require.ensure(['../components/show'], () => {
        resolve(require('../components/show')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: '',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'general.index',
                path: '',
                component: Show,
                meta: {requiresAuth: false}
            }
        ]
    }
]
