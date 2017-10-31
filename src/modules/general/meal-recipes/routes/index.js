
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
        path: 'receitas',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.meal-recipes.list',
                path: '',
                component: List,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.meal-recipes.show',
                path: 'receita/:slug',
                component: Show,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.meal-recipes.create',
                path: 'nova-receita',
                component: CreateEdit,
                meta: {requiresAuth: true}
            },
            {
                name: 'landing.meal-recipes.edit',
                path: 'editar-receita',
                component: CreateEdit,
                meta: {requiresAuth: true}
            },
        ]
    }
]
