
/**
 * Components are lazy-loaded
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Login = (resolve) => {
    require.ensure(['../components/login'], () => {
        resolve(require('../components/login')) // eslint-disable-line global-require
    })
}

const Logout = (resolve) => {
    require.ensure(['../components/logout'], () => {
        resolve(require('../components/logout')) // eslint-disable-line global-require
    })
}

const Signup = (resolve) => {
    require.ensure(['../components/signup'], () => {
        resolve(require('../components/signup')) // eslint-disable-line global-require
    })
}

export default [
    {
        name: 'general.auth.login',
        path: '/login',
        component: Login,
        meta: { requiresAuth: false, preventsLogged: true },
    },
    {
        name: 'general.auth.signup',
        path: '/cadastro',
        component: Signup,
        meta: { requiresAuth: false, preventsLogged: true },
    },
    {
        name: 'general.auth.logout',
        path: '/logout',
        component: Logout,
        meta: { requiresAuth: true, needRole: true, role: 'general' },
    },
]
