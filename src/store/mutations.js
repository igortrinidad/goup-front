// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_LOADING](state, payload) {
        state.loader = payload.options
    },

    [TYPES.SET_LANGUAGE](state, payload) {

        state.language = payload.language
    },

    [TYPES.SET_CITIES](state, payload) {

        state.cities = payload.cities
    },

    [TYPES.SET_CATEGORIES](state, payload) {

        state.categories = payload.categories
    },

    [TYPES.SET_USER_LAST_GEOLOCATION](state, payload) {

        state.user_last_geolocation = payload.userLastGeoLocation
    },

    [TYPES.UPDATE_USER_GEOLOCATION](state, payload) {

        state.user_last_geolocation = payload.userLastGeoLocation
    },

    [TYPES.SET_ENV](state, payload) {
        state.env = payload
    },

    [TYPES.DISABLE_LOADER](state, payload) {
        state.disable_loader = payload.option
    },

    [TYPES.SET_FCM_TOKEN_MOBILE](state, token) {
        state.fcm_token_mobile = token
    },

    [TYPES.SET_FCM_TOKEN_BROWSER](state, token) {
        state.fcm_token_browser = token
    },

    [TYPES.HANDLE_USER_INTERACTION](state, {city_id, category_id}) {

        let category = _.find(state.categories, {id: category_id})
        category.events_count = category.events_count - 1
        localStorage.setItem('categories', JSON.stringify(state.categories));

        let city = _.find(state.cities, {id: city_id})
        city.categories[category_id] =  city.categories[category_id] - 1
        localStorage.setItem('cities', JSON.stringify(state.cities));
    },


    [TYPES.ADD_NEW_EVENT](state, event) {
        let city = _.find(state.cities, {id: event.city.id})

        if(!city){
            let new_city = event.city

            let categories = []
            state.categories.map((category) => {
                categories[category.id] = 0
            })
            new_city. categories = categories

            state.cities.push(new_city)

            new_city.categories[event.category_id] =  new_city.categories[event.category_id] +1


            localStorage.setItem('cities', JSON.stringify(state.cities));
        }

        if(city){
            city.categories[event.category_id] =  city.categories[event.category_id] + 1
            localStorage.setItem('cities', JSON.stringify(state.cities));
        }

    },
}
