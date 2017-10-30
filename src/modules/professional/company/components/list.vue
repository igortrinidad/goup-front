<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Minhas empresas'"
            :cursor="false" :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <div class="wrapper">
            <div class="container">
                <div class="text-center">
                    <h4 class="f-300 f-14">
                        Você tem <b class="f-400">{{ companies.length }}</b> {{ companies.length > 1 ? 'Empresas cadastradas.' : 'Empresa cadastrada.' }}
                    </h4>
                </div>

                <div class="form-group search">
                    <label class="input-group">
                        <input type="text" class="form-control" v-model="filter" placeholder="Procure pelo nome">
                        <span class="input-group-addon btn btn-light" name="span"><i class="ion-ios-search f-20"></i></span>
                    </label>
                </div>
            </div>
        </div>

        <div class="container m-t-20">

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <!-- list -->
            <div class="row m-t-20" v-if="!placeholder">
                <!-- v-for na .list-item -->
                <div class="col-sm-4 col-xs-12" v-for="(company, $index) in filteredCompanies">
                    <div class="card">
                        <router-link tag="div" class="cursor-pointer" :to="{name: 'admin.companies.show', params: {company_id: company.id}}">
                            <div class="card-header ch-alt text-center">
                                <div class="picture-circle" :style="`background-image:url('${ company.avatar }')`"></div>
                                <h3 class="f-300 m-b-0">{{company.name}}</h3>
                            </div>
                        </router-link>

                        <div class="card-body card-padding text-center">
                            <div>
                                <span class="label label-primary f-300 f-14 m-t-5 m-r-5" v-for="category in company.categories">{{ category.name }}</span>

                                <span class="d-block f-300 f-14 m-t-10" v-if="company.current_rating > 0">
                                    Avaliação:
                                    <rating-simple
                                        :value.sync="company.current_rating"
                                        :max="5"
                                        :size="1"
                                        :align-class="'text-center'"
                                    ></rating-simple>
                                </span>
                                <span class="d-block f-300 f-14 m-t-10" v-if="company.current_rating <= 0">
                                    Ainda não possui avaliações
                                </span>
                                <!--confirmed-->
                                <router-link v-if="isConfirmed(company.id)"
                                    tag="button"
                                    class="btn btn-xs btn-info m-t-10"
                                    :to="{name: 'admin.companies.show', params: {company_id: company.id}}"
                                >
                                    Gerenciar
                                </router-link>
                                <!--confirmed-->

                                <!--unconfirmed-->
                                 <button class="btn btn-info btn-xs m-r-5 m-t-5" @click.prevent="acceptSolicitation(company.id)" v-if="!isConfirmed(company.id)">
                                    Confirmar solicitação
                                </button>

                                <button class="btn btn-danger btn-xs m-r-5 m-t-5" @click.prevent="removeProfessional(company.id)" v-if="!isConfirmed(company.id)">
                                    Excluir solicitação
                                </button>
                                <!--unconfirmed-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /list -->
        </div>

        <!-- no companies -->
        <div class="container m-t-20" v-if="!placeholder && !companies.length">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center">
                        <i class="d-block ion-sad-outline f-24"></i>
                        <span class="f-300">Você ainda não possui empresas cadastradas.</span>
                    </div>
                    <!-- <router-link
                        tag="button"
                        class="btn btn-primary btn-block f-300 m-t-20 f-18"
                        :to="{name: 'admin.companies.create'}"
                        exact
                    >
                        <i class="ion-ios-plus-outline m-r-5"></i>Adicionar empresa
                    </router-link> -->
                </div>
            </div>
        </div>
        <!-- / no companies -->
    </div>
</template>

<script>

    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import companyObj from '@/models/Company'
    import { mapGetters, mapActions } from 'vuex'


    export default{
        name: 'companies-list',
        components:{
            mainHeader,
            cardPlaceholder,
            ratingSimple: require('@/components/rating-simple.vue')
        },
        data(){
            return{
                view: {
                    list: false
                },
                companies: [],
                placeholder: true,
                selects: {
                    pilates: true,
                    personal: true,
                    physio: true,
                    healthy: true,
                    nutrition: true,
                    massage: true,
                },
                filter: '',
            }
        },
        computed: {
            ...mapGetters(['currentUser']),

            filteredCompanies:function()
            {
                let that = this;
                return this.companies.filter(function(company){return company.name.toLowerCase().indexOf(that.filter.toLowerCase())>=0;});
            }
        },
        mounted(){
            this.getCompanies()
            if (window.localStorage.getItem('company_last_tab')) {
                window.localStorage.removeItem('company_last_tab')
            }
        },
        methods:{

            ...mapActions(['updateProfessionalCompanies']),

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

                            company.professionals.map((professional) =>{
                                if(professional.id === that.currentUser.id){

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

        },

    }
</script>

<style scoped>

    /* Wrapper */
    .wrapper {
        background: #88C657;
        border-top: 1px solid #F4F5F5;
        margin-top: -20px;
        color: #fff;
    }
</style>
