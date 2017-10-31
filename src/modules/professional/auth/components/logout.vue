<template>

</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'auth-logout',
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

                //Limpa a localStorage mas mantém o histórico de cidades
                localStorage.clear();
                
                if(window.cordova){
                    window.cookies.clear();   
                }

                this.$router.push('/')
            }
        }
    }
</script>
