<template>
    <div class="first-container">
        <div class="container">
            
            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4>Recebi um convite</h4>
                </div>
            
                <div class="card-body">
                    <h1>{{email}}</h1>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default{
        name: 'landing-404',
        data(){
            return {
                email: '',
            }
        },
        mounted(){
            this.email = this.$route.params.email;
        },
        methods: {}
    }
</script>

<style scoped>


</style>
