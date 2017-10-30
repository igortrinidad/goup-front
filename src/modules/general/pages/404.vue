<template>
    <div class="first-container">
        <div class="container text-center">
            <h1 class="f-700">Ops!</h1>
            <h1 class="text-muted">Não localizamos a página solicitada :(</h1>
            <small class="text-muted">404</small>

            <div class="row m-t-20">
                <router-link to="/" class="btn btn-success">Voltar para home</router-link>
            </div>

        </div>
    </div>
</template>

<script>
    export default{
        name: 'landing-404',
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
