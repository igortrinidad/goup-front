import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
import {routes as generalRoutes} from '../modules/general'
import {routes as professionalRoutes} from '../modules/professional'
import {routes as clientRoutes} from '../modules/client'
import store from '../store'
import { sync } from 'vuex-router-sync'

Vue.use(Router)

const routes = [...generalRoutes, ...professionalRoutes, ...clientRoutes]

const router = new Router({
    routes,
    linkActiveClass: 'active',
})

/**
 * Before a route is resolved we check for
 * the token if the route is marked as
 * requireAuth.
 */
router.beforeEach(beforeEach)

sync(store, router)

export default router
