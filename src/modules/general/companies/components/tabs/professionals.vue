<template>

    <div class="">
        <div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/peoples.png" alt="">
                <h3 class="f-300">Profissionais</h3>
            </div>
        </div>

        <div class="col-sm-12"
            v-for="(professional, $index) in company.public_confirmed_professionals"
            :key="professional.id">
            <div class="card">
                <div class="card-header ch-alt text-center">
                    <div class="picture-circle picture-circle-m" :style="`background-image:url('${ professional.avatar }')`"></div>
                    <h3 class="f-300 m-b-0">{{professional.full_name}}</h3>
                </div>
                <div class="card-body card-padding text-center">

                    <p class="m-b-0 f-300">Especialidades</p>
                    <span
                        class="label label-primary f-300 f-14 m-t-5 m-r-5"
                        v-for="(category, $indexCategory)
                        in professional.categories"
                    >
                        {{ category.name }}
                    </span>

                    <span v-show="!professional.categories.length">Nenhuma especialidade cadastrada</span>

                    <span class="d-block f-300 f-14 m-t-10 m-b-5">
                        Avaliação
                        <rating-simple
                            :value.sync="professional.current_rating"
                            :max="5"
                            :size="1"
                            :align-class="'text-center'"
                        ></rating-simple>
                    </span>

                    <router-link
                        tag="button"
                        :to="{ name: 'landing.professionals.show', params: { slug: professional.slug } }"
                        class="btn btn-primary btn-block btn-sm"
                    >Ver perfil</router-link>

                </div>
            </div>
        </div>

        <div class="container m-t-30 m-b-20" v-if="!company.public_confirmed_professionals.length">
            <div class="text-center">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum profissional adicionado
                </span>
            </div>
        </div>

    </div>

</template>

<script>
    export default{
        name: 'landing-company-professionals',
        components: {
            ratingSimple: require('@/components/rating-simple.vue')
        },
        props: {
            company: {
                type: Object
            }
        },
        data(){
            return {}
        },
        mounted(){
        },
        methods: {

        }
    }
</script>

<style scoped>


</style>
