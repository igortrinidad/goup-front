
import Welcome from './pages/welcome.vue'
import NewInvite from './pages/new-invite.vue'
import appLayout from './layout/main'
import notFound from './pages/404.vue'
import Forbidden from './pages/403.vue'

import Contact from './pages/contact.vue'
import Privacy from './pages/privacy.vue'
import InviteCheck from './pages/invite-check.vue'
import Terms from './pages/terms.vue'
import Errors from './pages/errors.vue'
import ResetPass from './pages/reset-pass.vue'

import { routes as auth } from './auth'
import { routes as user } from './user'
import { routes as events } from './events'
import { routes as explorer } from './explorer'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [
    {
        name: '',
        path: '/',
        component: appLayout,
        meta: {requiresAuth: false},
        children: [
            ...explorer,
            ...auth,
            ...user,
            ...events,
            {
                name: 'general.welcome',
                path: '',
                component: Welcome,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.new-invite',
                path: '/convidar',
                component: NewInvite,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.invite.check',
                path: '/convite/:email',
                component: InviteCheck,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.contact',
                path: '/contato',
                component: Contact,
                meta: { requiresAuth: false }
            },
            {
                name: 'general.privacy',
                path: '/privacidade',
                component: Privacy,
                meta: { requiresAuth: false }
            },
            {
                name: 'landing.errors',
                path: '/erros',
                component: Errors,
                meta: { requiresAuth: false }
            },
            {
                name: 'general.terms',
                path: '/termos-de-uso',
                component: Terms,
                meta: { requiresAuth: false }
            },
            {
                name: 'landing.reset-pass',
                path: '/:usertype/recuperar-senha',
                component: ResetPass,
                meta: { requiresAuth: false }
            },
        ]
    },
    {
        name: 'general.404',
        path: '/not-found',
        component: notFound
    },
    {
        name: 'general.403',
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: notFound
    }
]
