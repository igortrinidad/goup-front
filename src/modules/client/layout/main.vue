<template>
    <div>
        <main-loader></main-loader>

        <main-header></main-header>

        <router-view></router-view>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import mainLoader from '@/components/main-loader.vue'

    export default{
        name: 'client-layout',
        components:{
            mainHeader,
            mainLoader,
        },
        data(){
            return{

            }
        }
    }
</script>

<style>
    @import '../../../../assets/css/template_standart.css';
    @import '../../../../assets/css/helpers.css';
    @import '../../../../assets/css/general.css';
    @import '../../../../assets/css/custom.css';
</style>
