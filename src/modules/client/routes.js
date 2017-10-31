import ClientLayout from './layout/main.vue'
import ClientIndex from './components/index.vue'
import notFound from './components/404.vue'
import {routes as auth} from './auth'
import {routes as dashboard} from './dashboard'
import {routes as companies} from './companies'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.


export default [

    ...auth,
    {
        path: '/cliente',
        component: ClientLayout,
        meta: {requiresAuth: false},
        children: [
            ...dashboard,
            ...companies
        ]
    },
    {
        path: '/cliente/*',
        component: notFound
    },
    {

        name: 'client.404',
        path: '/cliente/not-found',
        component: notFound
    },
]
