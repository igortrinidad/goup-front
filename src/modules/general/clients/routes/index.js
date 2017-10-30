
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
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
        path: 'clients',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.clients.show',
                path: 'cliente/:id',
                component: Show,
                meta: {requiresAuth: false}
            },
        ]
    }
]
