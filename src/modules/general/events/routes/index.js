
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

const Show = (resolve) => {
    require.ensure(['../components/show'], () => {
        resolve(require('../components/show')) // eslint-disable-line global-require
    })
}

const CreateEdit = (resolve) => {
    require.ensure(['../components/create-edit'], () => {
        resolve(require('../components/create-edit')) // eslint-disable-line global-require
    })
}



export default [
    {
        path: 'eventos',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.events.list',
                path: '',
                component: List,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.events.show',
                path: 'eventos/:event_id',
                component: Show,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.events.create',
                path: 'editar',
                component: CreateEdit,
                meta: {requiresAuth: false}
            },
        ]
    }
]
