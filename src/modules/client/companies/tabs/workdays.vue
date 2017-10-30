<template lang="html">
    <div class="container m-t-30">
        <h3 class="f-300 text-center">Horários fixos</h3>

        <div class="m-t-30 text-center">

        </div>


    </div>
</template>

<script>

    export default {
        name: 'workdays-tab',
        components: {
        },
        props: {
            company: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {},
            }
        },

        computed: {

        },

        mounted() {
        },

        methods: {

        }
    }
</script>

<style scoped>
</style>
