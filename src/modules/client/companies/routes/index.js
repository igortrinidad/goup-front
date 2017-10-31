
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */

const ShowCompany = (resolve) => {
    require.ensure(['../show'], () => {
        resolve(require('../show')) // eslint-disable-line global-require
    })
}

export default [
    {
        name: 'client.companies.show',
        path: 'companies/show/:company_id',
        component: ShowCompany,
        meta: { requiresAuth: true },
    }
]
