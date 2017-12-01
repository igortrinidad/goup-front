<template>
    <div class="loading-wrapper" v-if="loader.is_loading">
        <div class="loading-box">
            <img class="loader" src="../assets/logos/LOGOS-06.png" alt="" width="150">
            <div v-if="loader.message !=''">
                <h3>{{loader.message}}</h3>
            </div>
            <div v-if="!loader.message">
                <h3 class="f-300" style="color: #fff; margin-top:0px; ">{{language == 'en' ? 'Loading': 'Carregando'}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default{
        name: 'main-loader',
        components: {
        },
        data(){
            return {}
        },
        mounted(){

        },
        computed: {
            ...mapGetters(['loader', 'language']),
        },
    }
</script>

<style>

    /*
    Loader
     */
    .loading-wrapper {
        position: fixed;
        top: 72;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        background-color: rgba(86, 31, 159, .6)
    }

    .loading-box {
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

    @-webkit-keyframes blink {
        0% {
            opacity:1;
        }
        50% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    @-moz-keyframes blink {
        0% {
            opacity:1;
        }
        50% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    .loader {
        -webkit-transition: all 1s ease-in-out;
        -moz-transition: all 1s ease-in-out;
        -o-transition: all 1s ease-in-out;
        -ms-transition: all 1s ease-in-out;
        transition: all 1s ease-in-out;

        -webkit-animation-direction: normal;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-name: blink;
        -webkit-animation-timing-function: ease-in-out;

        -moz-animation-direction: normal;
        -moz-animation-duration: 2s;
        -moz-animation-iteration-count: infinite;
        -moz-animation-name: blink;
        -moz-animation-timing-function: ease-in-out;
    }

</style>
