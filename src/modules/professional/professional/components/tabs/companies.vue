<template lang="html">
    <div>
        <!-- Container -->
        <div class="container">
            <!-- Title -->
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/company.png" alt="">
                <h4 class="f-300">Empresas</h4>
            </div>
            <!-- Title -->

            <!-- Search -->
            <div class="row" v-if="companies.length > 4">
                <div class="col-sm-12">
                    <div class="card m-t-20">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Pesquisar empresas</h4>
                        </div>
                        <div class="card-body card-padding">
                            <div class="form-group search">
                                <label class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="company_search"
                                        placeholder="Procure por nome da empresa"
                                        value=""
                                        @keyup.enter="search"
                                    >
                                    <span
                                        class="input-group-addon btn btn-light"
                                        @click="search"
                                        v-if="!interactions.searching"
                                    >
                                        <i class="ion-ios-search f-20"></i>
                                    </span>
                                    <span
                                        class="input-group-addon btn btn-light"
                                        @click="clearSearch()"
                                        v-if="interactions.searching"
                                    >
                                        <i class="ion-ios-close-outline f-20"></i>
                                    </span>
                                </label>
                            </div>
                            <span class="f-300" v-if="!companies.length && interactions.searching">Sua busca não retornou nenhum resultado.</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Search -->
        </div>
        <!-- / Container -->

        <div class="container m-t-20">

            <p class="text-center" v-if="!placeholder && !companies.length">Você não está vinculado a nenhuma empresa.</p>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <div class="row" v-if="!placeholder">
                <div class="col-sm-12" v-for="(company, $index) in companies" :key="company.id">
                    <div class="card">

                        <!-- Card Header -->
                        <router-link tag="div" class="cursor-pointer" :to="{ name: 'admin.companies.show', params: { company_id: slugDefault(company.id) } }">
                            <div class="card-header ch-alt text-center">
                                <div class="picture-circle" :style="`background-image:url('${ company.avatar }')`"></div>

                                <h3 class="f-300 m-b-0">{{company.name}}</h3>

                                <span
                                    class="label label-primary f-300 f-14 m-t-5 m-r-5"
                                    v-for="(category, $indexCategory)
                                    in company.categories"
                                    v-if="$indexCategory < 2"
                                >
                                    {{ category.name }}
                                </span>

                                <span
                                    class="label label-success f-300 f-14 m-t-5 m-r-5"
                                    v-if="company.categories.length > 2"
                                    style="position: relative; left: -5px;"
                                >
                                    + {{ company.categories.length - 2 }}
                                </span>

                                <span class="d-block f-300 f-14 m-t-10 text-center">
                                    Avaliação
                                </span>
                                <span class="d-block f-300 f-14">
                                    <rating-simple
                                        :value.sync="company.current_rating"
                                        :max="5"
                                        :size="1"
                                    ></rating-simple>
                                </span>
                            </div>
                        </router-link>
                        <!-- /Card Header -->
                        
                        <div class="card-body card-padding">
                            <div class="text-center m-t-5">
                                <router-link v-if="isConfirmed(company.id)"
                                    tag="button"
                                    class="btn btn-info btn-xs m-b-5"
                                    :to="{ name: 'admin.companies.show', params: { company_id: slugDefault(company.id) } }"
                                >
                                    Gerenciar
                                </router-link>
                                <router-link
                                    tag="button"
                                    class="btn btn-success btn-xs m-b-5"
                                    :to="{ name: 'landing.companies.show', params: { company_slug: slugDefault(company.name), company_id: company.id } }"
                                >
                                    Ver perfil público
                                </router-link>

                                <!--unconfirmed-->
                                 <button class="btn btn-info btn-xs m-b-5" @click.prevent="acceptSolicitation(company.id)" v-if="!isConfirmed(company.id)">
                                    Confirmar solicitação
                                </button>

                                <button class="btn btn-danger btn-xs m-b-5" @click.prevent="removeProfessional(company.id)" v-if="!isConfirmed(company.id)">
                                    Excluir solicitação
                                </button>
                                <!--unconfirmed-->

                                <button v-if="isConfirmed(company.id)"
                                    class="btn btn-danger btn-xs m-b-5"
                                    :title="company.owner_id == currentUser.id? 'Você é proprietário da empresa e não pode desvincular da mesma.': ' Desvincular empresa'"
                                    @click="confirmRemoveCompany(company.id)"
                                    :disabled="company.owner_id == currentUser.id"
                                >
                                    Desvincular empresa
                                </button>
                                <p class="f-300 m-t-10" v-if="company.owner_id == currentUser.id">Você é proprietário desta empresa e não pode excluir o vínculo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import slug from 'slug'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'admin-professional-companies',
        components: {
            ratingSimple: require('@/components/rating-simple.vue'),
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    searching: false
                },
                placeholder: true,
                companies: [],
                company_search: '',
                smallDevice: window.screen.width <= 414 ? true : false
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },

        mounted() {

            this.getCompanies()
        },

        methods: {

            ...mapActions(['updateProfessionalCompanies']),


            // return sluged name
            slugDefault(name) {
                return slug(name).toLowerCase()
            },


            getCompanies(){
                let that = this

                that.placeholder = true

                that.$http.get('professional/company/my_companies')
                    .then(function (response) {
                        that.companies = response.data.companies

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            confirmRemoveCompany: function(company_id){
                let that = this

                that.$swal({
                    title: 'Atenção!',
                    text: 'Você tem certeza que quer excluir o vínculo com esta empresa? Esta ação não poderá ser desfeita e você não poderá acessar os registros internos da empresa ou dos clientes desta empresa.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#82CB7D',
                    confirmButtonColor: '#E14A45',
                    reverseButtons: true
                }).then(function () {

                    that.iAmShureRemoveCompany(company_id);

                }).catch(function () {

                })
            },

            iAmShureRemoveCompany: function(company_id){
                let that = this

                that.$swal({
                    title: 'Atenção!',
                    text: 'REALMENTE CONFIRMA A EXCLUSÃO DESTA EMPRESA?',
                    showCancelButton: true,
                    confirmButtonText: 'Confirma',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#82CB7D',
                    confirmButtonColor: '#E14A45',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('professional/company/professional/remove_solicitation', {
                        professional_id: that.currentUser.id,
                        company_id: company_id,
                    })
                        .then(function (response) {

                            successNotify('', 'Empresa excluída com sucesso')

                            that.companies = that.companies.filter((company) => company.id != company_id)

                            that.updateProfessionalCompanies(response.data.companies)

                        })
                        .catch(function (error) {

                            console.log(error)
                        });

                }).catch(function () {

                })
            },

            // search companies
            search() {
                this.interactions.searching = true
                let companiesCopy = []
                this.companies.map((company) => {
                    if (company.name.includes(this.company_search)) {
                        companiesCopy.push(company)
                    }
                })

                this.companies = companiesCopy
            },

            clearSearch() {
                this.interactions.searching = false
                this.company_search = ''
                this.companies = this.currentUser.companies
            },

            isConfirmed(company_id){
                let that = this

                let companies = that.companies

                let is_confirmed = false

                companies.filter((company) => {

                    if(company.id === company_id){
                        company.professionals.filter((professional) =>{
                            if(professional.id === that.currentUser.id){

                                is_confirmed = professional.pivot.is_confirmed ? true : false
                            }
                        })
                    }

                })
                return is_confirmed
            },

            removeProfessional: function(company_id){
                let that = this

                that.$swal({
                    title: 'Excluir solicitação',
                    text: 'Deseja realmente excluir a solicitação da empresa?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Excluir',
                    confirmButtonColor: '#E14A45',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('professional/company/professional/remove_solicitation', {
                        professional_id: that.currentUser.id,
                        company_id: company_id,
                    })
                        .then(function (response) {

                            successNotify('', 'Solicitação excluída com sucesso')
                            that.companies = that.companies.filter((company) => company.id != company_id)

                            that.updateProfessionalCompanies(response.data.companies)

                        })
                        .catch(function (error) {

                            console.log(error)
                        });

                }).catch(function () {

                })

            },

            acceptSolicitation(company_id){
                let that = this

                that.$http.post('professional/company/professional/accept_solicitation', {
                    professional_id: that.currentUser.id,
                    company_id: company_id
                })
                    .then(function (response) {
                        successNotify('', 'Solicitação confirmada com sucesso')

                        that.companies.filter((company) => {
                            company.professionals.map((professional) => {
                                if (professional.id === that.currentUser.id) {
                                    professional.pivot.is_confirmed = true
                                }
                            })
                        })

                        that.updateProfessionalCompanies(response.data.companies)

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

        }
    }
</script>

<style scoped>
    /* default inputsearch */
    .search .form-control {
        border-width: 1px;
        border-right: 0;
        transition: none;
        font-weight: 300;
    }

    .search .form-control:focus {
        border-right: 0;
        transition: none;
    }

    .search .form-control:focus + .btn.btn-light {
        border-color: #383938;
        transition: none;
    }

    .search .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }
</style>
