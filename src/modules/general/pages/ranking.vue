<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <div class="main">
                <div class="container">
                    <h1>RANKING DE EMPRESAS</h1>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'general-ranking',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
            }
        },

        computed: {

        },

        mounted(){

        },

        methods: {

        }
    }
</script>

<style scoped>
    .cards {
        position: relative;
    }
    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .card.animated.leave {
        opacity: 0;
        transition: ease .4s;
    }

    .card.animated.transition { transition: ease .3s; }

    .cards .card:nth-child(1)   { z-index: 10; }
    .cards .card:nth-child(2)   { z-index: 9; }
    .cards .card:nth-child(3)   { z-index: 8; }
    .cards .card:nth-child(4)   { z-index: 7; }
    .cards .card:nth-child(5)   { z-index: 6; }
    .cards .card:nth-child(6)   { z-index: 5; }
    .cards .card:nth-child(7)   { z-index: 4; }
    .cards .card:nth-child(8)   { z-index: 3; }
    .cards .card:nth-child(9)   { z-index: 2; }
    .cards .card:nth-child(10)  { z-index: 1; }

</style>
