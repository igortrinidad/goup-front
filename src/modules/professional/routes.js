import {routes as auth} from './auth'
import {routes as company} from './company'
import {routes as professional} from './professional'
import dashboarLayout from './layout/main'
import notFound from './components/404.vue'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    ...auth,
    {
        path: '/dashboard',
        component: dashboarLayout,
        meta: {requiresAuth: true, needRole: true, role: 'admin'},
        children: [
            ...company,
            ...professional,
        ]
    },

    {
        path: '/dashboard/*',
        component: notFound
    },
    {

        name: 'dashboard.404',
        path: '/dashboard/not-found',
        component: notFound
    },
]
