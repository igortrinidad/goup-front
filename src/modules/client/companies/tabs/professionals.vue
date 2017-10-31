<template lang="html">
    <div class="container m-t-30">
        <h3 class="f-300 text-center">Profissionais</h3>

        <div class="row m-t-30">

            <div class="col-sm-12" v-if="!company.public_confirmed_professionals.length">
                <p class="f-300 m-0 text-center">Nenhum profissional confirmado na empresa ainda.</p>
            </div>

            <div class="col-sm-3" v-for="professional in company.public_confirmed_professionals">
                <div class="card">
                    <div class="card-header ch-alt text-center">
                        <div
                            class="picture-circle picture-circle-p"
                            :style="`background-image:url('${ professional.avatar }')`"
                        >
                        </div>
                        <h4 :class="{
                                'f-300 m-t-20': true,
                                'm-0': professional.id !== company.owner_id,
                                'm-t-20 m-b-20': professional.id === company.owner_id
                            }"
                        >
                            {{ professional.name }}
                        </h4>
                        <span class="label label-info p-10 p-l-15 p-r-15 f-12" v-if="professional.id === company.owner_id">
                            Proprietário da empresa
                        </span>
                    </div>
                    <div class="card-body card-padding text-center">

                        <h5 class="f-300 f-16 m-t-20">Especialidades</h5>
                        <span class="label label-primary p-5 p-l-10 p-r-10 f-12 m-5" v-for="category in professional.categories">
                            {{ category.name }}
                        </span>

                        <h5 class="f-300 f-16 m-t-20">Avaliação do profissional</h5>
                        <rating-simple
                            :value.sync="professional.current_rating"
                            :max="5"
                            :size="1"
                            :align-class="'text-center'"
                        ></rating-simple>

                        <router-link class="btn btn-primary btn-sm btn-block m-t-10" tag="button" :to="{ name: 'landing.professionals.rating', params: {professional_slug: professional.slug}}">
                            Avaliar profissional
                        </router-link>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ratingSimple from '@/components/rating-simple.vue'

    export default {
        name: 'professionals-tab',
        components: {
            ratingSimple
        },
        props: {
            company: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {}
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
