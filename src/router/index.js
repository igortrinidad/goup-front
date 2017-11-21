import Vue from 'vue'
import Router from 'vue-router'
import {routes as generalRoutes} from '../modules/general'
import store from '../store'
import { sync } from 'vuex-router-sync'
import beforeEach from './beforeEach'

Vue.use(Router)

const routes = [...generalRoutes]

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
