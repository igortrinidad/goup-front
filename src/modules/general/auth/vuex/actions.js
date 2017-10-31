import * as TYPES from './mutations-types'
import { localStorageSetItem, localStorageRemoveItem } from '../../../../utils/local'
import { setToken as httpSetToken } from '../../../../plugins/http'


export const authSetToken = ({ commit }, token) => {

    /**
     * Sets the token to the local storage
     * for auto-login purpose
     */
    localStorageSetItem('token', { token })

    //Remove unused auth plugin token
    //localStorageRemoveItem('default-auth-token')

    /**
     * Set the Axios Authorization header with the token
     */
    httpSetToken(token)

    /**
     * Commit the mutation
     */
    commit(TYPES.SET_TOKEN, {
        token,
    })
}

export const authSetUser = ({ commit }, user) => {
    /**
     * Sets the user to the local storage
     * for auto-login purpose
     */
    localStorageSetItem('user', { user })

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_USER, {
        user,
    })
}

//Set user avatar
export const setUserAvatar = ({ commit }, avatar) => {

    commit(TYPES.SET_AVATAR, {
        avatar,
    })
}
