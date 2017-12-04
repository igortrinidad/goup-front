const Main = (resolve) => {
    require.ensure(['../components/main'], () => {
        resolve(require('../components/main')) // eslint-disable-line global-require
    })
}

const Create = (resolve) => {
    require.ensure(['../components/create'], () => {
        resolve(require('../components/create')) // eslint-disable-line global-require
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

const Edit = (resolve) => {
    require.ensure(['../components/edit'], () => {
        resolve(require('../components/edit')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: 'user',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'general.events.create',
                path: '/create',
                component: Create,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.events.list',
                path: '/ranking',
                component: List,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.events.edit',
                path: '/event/edit/:id',
                component: Edit,
                meta: {requiresAuth: true}
            },
            {
                name: 'general.events.show',
                path: '/event/:event_slug',
                component: Show,
                meta: {requiresAuth: true}
            },
        ]
    }
]
