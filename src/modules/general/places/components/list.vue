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
                    <h1>RANKING DE LOCAIS</h1>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'general-places-list',

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

</style>
