<template>
    <div class="first-container">
        <div class="container text-center">
            <h1 class="f-700">403</h1>
            <h1 class="text-muted">Forbidden :(</h1>
            <h3>Você não tem permissão para acessar este recurso.</h3>

            <div class="row m-t-20">
                <router-link to="/" class="btn btn-success">Voltar para home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'landing-403',
        data(){
            return {}
        },
        mounted(){

        },
        methods: {}
    }
</script>

<style scoped>
    .btn-success, .btn-success:hover{
        color: #fff;
        background-color:  #8e44ad;
        border-color: #8e44ad
    }
</style>
