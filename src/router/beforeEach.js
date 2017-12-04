import store from '../store'
import {isEmpty} from 'lodash'
import {localStorageGetItem} from '../utils/local'
import bus from '@/utils/event-bus'

const needAuth = (auth, token) => auth !== undefined && auth && isEmpty(token)
const preventsLogged = prevents => prevents === true

const beforeEach = (to, from, next) => {
    
    var checkUserLastLocation = window.checkUserLastLocation();

    if(!checkUserLastLocation && to.path != '/'){
        next('/')
    }

    if(checkUserLastLocation == 'is_invalid' && to.path != '/' ){
        next('/')
    }


    let token = store.state.Auth.token
    const auth = to.meta.requiresAuth
    const prevents = to.meta.preventsLogged
    const needRole = to.meta.needRole
    const role = to.meta.role

    bus.$emit('close-menu');

    $('#side-menu-global-id').removeClass('active')

     store.dispatch('setLoading', {is_loading: false, message: ''})

    /**
     * If there's no token stored in the state
     * then check localStorage:
     */
    if (isEmpty(token)) {
        const localStoredToken = localStorageGetItem('token')
        const localStoredUser = localStorageGetItem('user')

        /**
         * Do we have token and user local stored?
         * If so then use it!
         */
        if (localStoredToken !== undefined &&
            localStoredToken !== null &&
            localStoredUser !== undefined &&
            localStoredUser !== null
        ) {
            store.dispatch('authSetToken', localStoredToken)
            store.dispatch('authSetUser', localStoredUser.user)
        }
    }

    //prevents user to access login / signup routes
     if ( store.getters.isLogged && preventsLogged(prevents)) {
         next('/')
     }

    //check user role
    if(needRole && store.getters.userRole != role){
        next({name: 'general.403'})
    }

    /**
     * If route doesn't require authentication
     * OR we have a token then let the route
     * be normally accessed.
     */
    if (!needAuth(auth, token)) {
        next()
    }

    /**
     * Otherwise  if authentication is required
     * AND the token is empty, then redirect to
     * login.
     */
    if (needAuth(auth, token)) {
        next({name: 'general.auth.login'})
    }

    $('html, body').stop().animate({ scrollTop: 0 }, 500, 'easeInOutExpo');


    //Hide all modals on change route
    $('.modal').modal('hide');
}

export default beforeEach
