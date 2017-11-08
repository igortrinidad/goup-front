<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">
                <div class="container">
                    <h1>Show</h1>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'general-places-show',

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
