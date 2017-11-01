<template>
    <div class="main">
        <h1 class="title m-t-30 m-b-30">{{ company.name }}</h1>
        <div
            class="picture-circle picture-circle-xl bordered-primary"
            :style="{ backgroundImage: `url(${ company.avatar  })`}"
        >
        </div>

        <hr>
            <div class="container">
                <elements></elements>
            </div>
        <hr>
        <router-link
            type="button"
            class="btn btn-primary"
            :to="{ name: 'general.auth.login' }"
            exact
        >
        Login
        </router-link>
    </div>
</template>

<script>
    import elements from '@/components/elements.vue'

    import CompanyModel from '@/models/Company'

    export default {
        name: 'landing',

        components: {
            elements
        },

        data () {
            return {
                placeholder: true,
                company: {}
            }
        },

        computed: {

        },

        mounted(){
            this.nextCompany()
        },

        methods: {
            nextCompany() {
                this.company = CompanyModel
            },
        }
    }
</script>

<style scoped>

</style>
