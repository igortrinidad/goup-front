<template>
    <div class="container first-container text-center">
        <h1 class="f-700">Admin 404</h1>
        <h1 class="text-muted">Not found :(</h1>

        <div class="row m-t-20">
            <router-link to="/dashboard" class="btn btn-success">Voltar para Dashboard</router-link>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'admin-404',
        data(){
            return {}
        },
        mounted(){

        },
        methods: {}
    }
</script>
