<template>

    <div class="">

        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/calendar.png" alt="">
                <h3 class="f-300">Agenda</h3>
                <small class="f-300">Escolha uma especialidade para ver os horários</small>
            </div>


            <div class="row m-t-10" v-if="isCompanyAdmin(currentCompany.id)">
                <div class="col-sm-12">
                    <router-link :to="{name: 'admin.companies.calendar.insights', params: {company_id: $route.params.company_id}}" class="btn f-20 btn-light btn-block f-300" name="button">
                        <span><i class="ion-stats-bars m-r-5"></i>Ver Insights</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container m-t-30">

            <card-placeholder
                v-if="placeholder"
                :onlyHeader="true"
                :onlyHeaderNoImage="true"
                :onlyHeaderOpened="true"
            >
            </card-placeholder>

            <!-- List Categories -->
            <div class="card" v-for="(category, indexCategory) in company.categories" v-if="!placeholder">
                <!-- Card Header -->
                <div class="card-header ch-alt cursor-pointer text-center">
                    <span class="f-300 f-22">{{ category.name }}</span>
                </div>
                <!-- /Card Header -->

                <!-- Card Body -->
                <div class="card-body card-padding" v-if="interactions.categoriesCardOpened.indexOf(category.id) < 0">
                    <div  class="m-t-5" v-if="selectProfessionalByCategory(category).length">

                        <div class="border-inside-card text-center f-300">
                            <h5 @click="interactions.professionalsListed.toggleSelected(category.id)" class="cursor-pointer">
                                <span v-if="interactions.professionalsListed.indexOf(category.id) < 0">
                                    Mostrar {{ selectProfessionalByCategory(category).length }}
                                    {{ selectProfessionalByCategory(category).length === 1 ? 'Profissional' : 'Profissionais' }}
                                    <i class="ion-ios-arrow-down m-l-5"></i>
                                </span>
                                <span v-if="interactions.professionalsListed.indexOf(category.id) > -1">
                                    Esconder {{ selectProfessionalByCategory(category).length === 1 ? 'Profissional' : 'Profissionais' }}
                                    <i class="ion-ios-arrow-up m-l-5"></i>
                                </span>
                            </h5>

                            <div class="row m-t-10 m-b-10" v-if="interactions.professionalsListed.indexOf(category.id) > -1">

                                <div class="col-md-6 col-xs-6 text-center m-b-10" v-for="professional in selectProfessionalByCategory(category)">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ professional.avatar }')`"></div>
                                    <h5>
                                        {{ professional.full_name }}
                                    </h5>
                                </div>

                            </div>
                            
                        </div>


                    </div>

                    <span class="f-300 f-danger m-t-20" v-if="!selectProfessionalByCategory(category).length">
                        Nenhum Profissional para:
                        {{ category.name }}
                    </span>
                    <div class="text-center m-t-25">
                        <button
                            type="button"
                            class="btn btn-xs btn-block btn-info m-t-10 f-16 f-300 p-5"
                            @click.prevent="selectCategoryShow(category)"
                        >
                            Visualizar agenda
                        </button>
                        <button
                            v-if="isCompanyAdmin(currentCompany.id)"
                            type="button"
                            class="btn btn-xs btn-block btn-success m-t-10 f-16 f-300 p-5"
                            @click.prevent="selectCategory(category)"
                            :disabled="!selectProfessionalByCategory(category).length"
                        >
                            Editar agenda
                        </button>
                    </div>
                </div>
                <!-- /Card Body -->
            </div>
            <!-- / List Categories -->

        </div>

    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default {
        name: 'company-calendar-tab',
        components: {
            cardPlaceholder
        },
        props: {
            company: {
                type: Object
            }
        },
        data() {
            return {
                interactions: {
                    categoriesCardOpened: [],
                    professionalsListed: []
                },
                placeholder: true
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'currentCompany', 'isCompanyAdmin']),
        },
        mounted() {
            this.placeholder = true
            this.handlePlaceholder()
        },
        methods: {
            ...mapActions(['setSelectedCategory']),

            handlePlaceholder() {
                setTimeout(() => {
                    this.placeholder = false
                }, 1000);
            },

            selectProfessionalByCategory(cat) {
                let professionals = []

                this.currentCompany.professionals.map((professional) => {
                    professional.categories.map((category) => {

                        if (category.id === cat.id) {
                            professionals.push(professional)
                        }
                    })
                })

                return professionals
            },

            selectCategory: function (category) {
                let that = this

                that.setSelectedCategory(category)

                that.$router.push({
                    name: 'admin.companies.calendar.edit',
                    params: {company_id: that.company.id, category_slug: category.slug}
                })
            },

            selectCategoryShow: function (category) {
                let that = this

                that.setSelectedCategory(category)

                that.$router.push({
                    name: 'admin.companies.calendar.show',
                    params: {company_id: that.company.id, category_slug: category.slug}
                })
            },
        }
    }
</script>

<style scoped>


</style>
