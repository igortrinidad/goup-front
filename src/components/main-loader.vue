<template>
    <div class="loading-wrapper" v-if="loader.is_loading">
        <div class="loading-spinner">
            <pulse-loader :loading="true" :color="'#6EC058'" :size="'30px'" class="loader"></pulse-loader>
            <div v-if="loader.message !=''">
                <h3>{{loader.message}}</h3>
            </div>

            <div v-if="!loader.message">
                <h3 class="f-300" style="color: #5D5D5D">Carregando</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    export default{
        name: 'main-loader',
        components: {
            PulseLoader
        },
        data(){
            return {}
        },
        mounted(){
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['loader']),
        },
    }
</script>

<style>
    /*
    Loader
     */
    .loading-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        background-color: rgba(255, 255, 255, .9);
    }
    .loading-spinner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .loader{
        width: 159px;
        text-align: center;
    }
</style>
