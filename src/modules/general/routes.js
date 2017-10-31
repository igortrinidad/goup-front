import Index from './pages/index.vue'
import About from './pages/about.vue'
import NewInvite from './pages/new-invite.vue'
import appLayout from './layout/main'
import notFound from './pages/404.vue'
import Forbidden from './pages/403.vue'
import SignupChooser from './pages/signup-chooser.vue'

import Contact from './pages/contact.vue'
import Privacy from './pages/privacy.vue'
import InviteCheck from './pages/invite-check.vue'
import Terms from './pages/terms.vue'
import Plans from './pages/plans.vue'
import Errors from './pages/errors.vue'
import ResetPass from './pages/reset-pass.vue'

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
                name: 'general.index',
                path: '',
                component: Index,
                meta: { requiresAuth: false },
            },
            {
                name: 'general.about',
                path: 'sobre',
                component: About,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.new-invite',
                path: '/convidar',
                component: NewInvite,
                meta: { requiresAuth: false },
            },
            {
                name: 'landing.signup.chooser',
                path: '/cadastrar',
                component: SignupChooser,
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
                name: 'landing.privacy',
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
                name: 'landing.plans',
                path: '/planos',
                component: Plans,
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
        path: '*',
        component: notFound
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
    }
]
