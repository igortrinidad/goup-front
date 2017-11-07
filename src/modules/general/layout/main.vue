<template>
    <div>
        <!-- <main-loader></main-loader> -->

        <!-- <main-header :type="'logo'"></main-header> -->

        <router-view></router-view>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: 'landing-layout',
        components:{
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


    .fade-enter-active, .fade-leave-active {
      transition-property: opacity;
      transition-duration: .25s;
    }

    .fade-enter-active {
      transition-delay: .25s;
    }

    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>
