import Index from './pages/index.vue'
import About from './pages/about.vue'
import appLayout from './layout/main'
import notFound from './pages/404.vue'
import Forbidden from './pages/403.vue'

import Terms from './pages/terms.vue'
import Errors from './pages/errors.vue'



// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    {
        name: '',
        path: '/',
        component: appLayout,
        meta: {requiresAuth: false},
        children: [
            {
                name: 'landing.index',
                path: '',
                component: Index,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.about',
                path: 'sobre',
                component: About,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.invite.check',
                path: '/convite/:email',
                component: InviteCheck,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.errors',
                path: '/erros',
                component: Errors,
                meta: { requiresAuth: false }
            },
            {
                name: 'landing.terms',
                path: '/termos-de-uso',
                component: Terms,
                meta: { requiresAuth: false }
            },
        ]
    },
    {
        path: '*',
        component: notFound
    },
    {
        name: 'landing.404',
        path: '/not-found',
        component: notFound
    },
    {
        name: 'landing.403',
        path: '/403',
        component: Forbidden
    }
]
