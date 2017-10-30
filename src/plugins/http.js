import axios from 'axios'
import { apiUrl } from '../config'

const http = axios.create({
    baseURL: apiUrl
})

/**
 * Helper method to set the header with the token
 */
export function setToken(token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`
}


export default function install(Vue) {
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return http
            },
        },
    })
}
