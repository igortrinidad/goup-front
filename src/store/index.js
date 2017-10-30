import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import modules from './modules'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules,
    getters,
    strict: process.env.NODE_ENV !== 'production',
})
