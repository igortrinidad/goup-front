
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

const Rating = (resolve) => {
    require.ensure(['../components/rating'], () => {
        resolve(require('../components/rating')) // eslint-disable-line global-require
    })
}


export default [
    {
        path: 'profissionais',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.professionals.list',
                path: '',
                component: List,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.professionals.show',
                path: 'perfil/:slug',
                component: Show,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.professionals.rating',
                path: 'avaliar/:professional_slug',
                component: Rating,
                meta: {requiresAuth: false}
            },
        ]
    }
]
