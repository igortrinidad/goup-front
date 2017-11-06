<template>
    <div class="">

        <main-header
            :title="'settings'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <div class="main">

        </div>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    export default {
        name: 'general-user-settings',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
                interactions: {}
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
