
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

const CompanyRating = (resolve) => {
    require.ensure(['../components/rating'], () => {
        resolve(require('../components/rating')) // eslint-disable-line global-require
    })
}

export default [
    {
        path: 'empresas',
        component: Main,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.companies.list',
                path: '',
                component: List,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.companies.company-rating',
                path: 'avaliar/:company_slug',
                component: CompanyRating,
                meta: {requiresAuth: false}
            },
            {
                name: 'landing.companies.show',
                path: 'perfil/:company_slug/:company_id',
                component: Show,
                meta: {requiresAuth: false}
            }
        ]
    }
]
