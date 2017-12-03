<template>

</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'general-auth-logout',
        data(){
            return {}
        },
        created(){
            this.logout()
        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser']),

            logout: function () {
                this.authSetToken(null) // this is a Vuex action
                this.authSetUser({}) // this is a Vuex action

                window.clearAndMaintain();

                if(window.cordova){
                    window.cookies.clear();
                }

                this.$router.push('/')

            }
        }
    }
</script>
