<template>
    <div class="first-container">
        <div class="container">
            <h1>Client Index</h1>

            <div v-if="$auth.check('client')">
                <router-link class="btn btn-success" to="/">Home</router-link>
                <router-link class="btn btn-default" to="/cliente/logout">Logout</router-link>

                <div class="col-sm-12 m-t-20">
                    <p>User: {{currentUser.full_name}}</p>
                    <p>E-mail: {{currentUser.email}}</p>
                    <p>Role: {{currentUser.role}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'client-index',
        data () {
            return {

            }
        },
        computed:{
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            console.log(this.$auth.user())
            console.log(this.$auth.user().role)
        }
    }
</script>

<style scoped>
    .main {
        position: absolute;
        width: 400px;
        height: 300px;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
    }

    .m-t-30{
        margin-top: 30px;
    }
</style>
