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
        path: 'event',
        component: Main,
        meta: {requiresAuth: true},
        children: [
            {
                name: 'events.create',
                path: '/create',
                component: Create,
            },
            {
                name: 'events.list',
                path: '/ranking',
                component: List,
            },
            {
                name: 'events.edit',
                path: '/edit/:id',
                component: Edit,
            },
            {
                name: 'events.show',
                path: '/:event_slug',
                component: Show,
            },
        ]
    }
]
