<template>
    <div class="main">
        <div class="container">
            <div class="card">
                <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">
                </div>
                <div class="card-body">
                    <h4 class="title f-600">{{ company.name }}</h4>
                    <span class="label label-info">{{ company.city }} - {{ company.state }}</span>
                    <p>{{ company.description }}</p>
                </div>
            </div>
        </div>

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
