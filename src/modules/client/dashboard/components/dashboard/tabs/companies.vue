<template>
    <div>

        <div class="container p-relative">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/company.png" alt="">
                <h4 class="f-300">Empresas
                    <i class="ion-help-circled cursor-pointer" @click="enableTips()"></i>
                </h4>



                <div class="alert alert-info f-400" v-if="interactions.tips.settings">
                    <span class="close" @click="saveCloseTips('settings')"><i class="ion-ios-close-outline"></i></span>
                    <span>Adicione empresas para auxiliar você à atingir seus objetivos.</span>
                </div>
                <div class="alert alert-info f-400" v-if="interactions.tips.companies">
                    <span class="close" @click="saveCloseTips('companies')"><i class="ion-ios-close-outline"></i></span>
                    <span>As empresas listadas aqui poderão visualizar ou editar os módulos de seu perfil de acordo com as permissões que você conceder para cada uma.</span>
                </div>

            </div>
        </div>

        <div class="container">

            <div class="form-group search">
                <label class="input-group">
                    <input type="text" class="form-control" v-model="filter" placeholder="Procure pelo nome">
                    <span class="input-group-addon btn btn-light" name="span"><i
                        class="ion-ios-search f-20"></i></span>
                </label>
            </div>
        </div>

        <!-- UNCONFIRMED LIST -->
        <div class="container" v-if="companies_unconfirmed.length">

            <h4 class="text-center f-300 m-b-20">Empresas pendentes de confirmação</h4>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <div class="row">

                <!-- Card -->
                <div class="col-sm-4 col-xs-12" v-for="(company, $index) in companies_unconfirmed">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ company.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{company.name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in company.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="company.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="company.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>
                            <span class="d-block f-300 f-14 m-t-10" v-if="company.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-block btn-info btn-sm m-t-10"
                                    v-if="company.pivot && !company.pivot.is_confirmed && !company.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(company.id)">Aceitar solicitação
                            </button>
                            <button class="btn btn-block btn-info btn-sm m-t-10 disabled"
                                    v-if="company.pivot && !company.pivot.is_confirmed && company.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>

                            <button class="btn btn-block btn-danger btn-sm m-t-10"
                                    v-if="company.pivot && !company.pivot.is_confirmed"
                                    @click.prevent="rejectSolicitation(company.id)">Excluir solicitação
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                </div>
                <!-- /Card -->

            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="companies_unconfirmed.length">
                    <div class="text-center clearfix">
                        <pagination :source="pagination_unconfirmed" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->

        </div>
        <!-- /UNCONFIRMED LIST -->


        <!-- CONFIRMED LIST -->
        <div class="container">

            <h4 class="text-center f-300 m-b-20">Empresas confirmadas</h4>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <div class="row" v-if="!placeholder">
                <div class="col-sm-4 col-xs-12" v-for="(company, $index) in companies_confirmed">
                    <!-- Card -->
                    <div class="card">

                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ company.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{company.name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in company.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="company.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="company.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>

                            <span class="d-block f-300 f-14 m-t-10" v-if="company.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-block btn-info btn-sm m-t-10"
                                    v-if="company.pivot && !company.pivot.is_confirmed && !company.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(company.id)">Aceitar solicitação
                            </button>

                            <button class="btn btn-block btn-info btn-sm m-t-10 disabled"
                                    v-if="company.pivot && !company.pivot.is_confirmed && company.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>

                            <button class="btn btn-block btn-danger btn-sm m-t-10"
                                    v-if="company.pivot && !company.pivot.is_confirmed"
                                    @click.prevent="rejectSolicitation(company.id)">Excluir solicitação
                            </button>

                            <router-link
                                tag="button"
                                :to="{ name: 'client.companies.show', params: {company_id: company.id} }"
                                class="btn btn-block btn-sm btn-info m-t-10"
                            >
                                Visualizar
                            </router-link>
                            <!--Actions-->
                        </div>
                    </div>
                    <!-- Card -->
                </div>
            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="companies_confirmed.length">
                    <div class="text-center">
                        <pagination :source="pagination_confirmed" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->
        </div>
        <!-- /CONFIRMED LIST -->

        <!--  DELETED LIST -->
        <div class="container" v-if="companies_deleted.length">
            <h4 class="text-center f-300 m-b-20">Empresas excluídas</h4>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(company, $index) in companies_deleted">
                    <!-- Card -->
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ company.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{company.name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in company.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="company.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="company.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>
                            <span class="d-block f-300 f-14 m-t-10" v-if="company.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-block btn-info btn-sm m-t-10"
                                    v-if="company.pivot && !company.pivot.is_confirmed && !company.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(company.id)">Aceitar solicitação
                            </button>
                            <button class="btn btn-block btn-info btn-sm m-t-10 disabled"
                                    v-if="company.pivot && !company.pivot.is_confirmed && company.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                    <!-- Card -->
                </div>

            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="companies_deleted.length">
                    <div class="text-center">
                        <pagination :source="pagination_deleted" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->

        </div>
        <!--  / DELETED LIST -->

        <!-- no companies -->
        <div class="m-t-20" v-if="!companies_confirmed.length && !companies_unconfirmed.length && !companies_deleted.length">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <i class="d-block ion-sad-outline f-24"></i>
                            <span class="f-300">Você ainda não possui empresas cadastradas.</span>
                        </div>
                    </div>
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

    import {mapGetters, mapActions} from 'vuex'

    export default{
        name: 'client-dashboard-companies',
        components: {
            pagination: require('@/components/pagination.vue'),
            ratingSimple: require('@/components/rating-simple.vue'),
            cardPlaceholder
        },
        data(){
            return {
                view: {
                    list: false
                },
                interactions: {
                    tips: { settings: true, companies: true }
                },
                placeholder: true,
                companies_confirmed: [],
                pagination_confirmed: {},
                companies_unconfirmed: [],
                pagination_unconfirmed: {},
                companies_deleted: [],
                pagination_deleted: {},
                filter: '',
                selectedCompany: {},
                selectedCompanyPermissions: {}
            }
        },
        computed: {
            ...mapGetters(['currentUser']),
        },
        mounted() {
            this.getCompaniesForClientDashboard()
            this.checkTipsInLocalStorageToShow()
        },
        methods: {

            ...mapActions(['addClientCompany', 'removeClientCompany', 'disableLoader']),

            enableTips() {
                this.interactions.tips.settings = true
                this.interactions.tips.companies = true
            },

            checkTipsInLocalStorageToShow() {
                if (window.localStorage.getItem('client_settings_tip') === 'seen') {
                    this.interactions.tips.settings = false
                }
                if (window.localStorage.getItem('client_companies_tip') === 'seen') {
                    this.interactions.tips.companies = false
                }
            },

            saveCloseTips(tip) {
                if (tip === 'settings') {
                    this.interactions.tips.settings = false
                    window.localStorage.setItem('client_settings_tip', 'seen')
                }
                if (tip === 'companies') {
                    this.interactions.tips.companies = false
                    window.localStorage.setItem('client_companies_tip', 'seen')
                }
            },

            getCompaniesForClientDashboard() {
                let that = this

                that.disableLoader(true)
                that.placeholder = true

                that.disableLoader(true)
                that.placeholder = true

                that.$http.get('client/company/list')
                    .then(function (response) {
                        that.companies_confirmed = response.data.companies_confirmed.companies_confirmed
                        that.pagination_confirmed = response.data.companies_confirmed.pagination

                        that.companies_unconfirmed = response.data.companies_unconfirmed.companies_unconfirmed
                        that.pagination_unconfirmed = response.data.companies_unconfirmed.pagination

                        that.companies_deleted = response.data.companies_deleted.companies_deleted
                        that.pagination_deleted = response.data.companies_deleted.pagination

                        setTimeout(() => {
                            that.disableLoader(false)
                            that.placeholder = false
                        }, 200);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            navigate(page) {
                let that = this

                that.$http.get(`client/company/list?page=${page}`)
                    .then(function (response) {

                        that.companies = response.data.companies
                        that.pagination = response.data.pagination

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            acceptSolicitation(company_id) {
                console.log('enter');
                let that = this

                that.$http.post('client/company/accept_solicitation', {
                    client_id: that.currentUser.id,
                    company_id: company_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação aceita com sucesso')

                        that.addClientCompany(response.data.company)

                        that.getCompaniesForClientDashboard()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

            rejectSolicitation(company_id) {
                let that = this

                that.$http.post('client/company/remove_solicitation', {
                    client_id: that.currentUser.id,
                    company_id: company_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação removida com sucesso')

                        that.removeClientCompany(company_id)

                        that.getCompaniesForClientDashboard()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

        },
    }
</script>

<style scoped>
    .alert.alert-info {
        padding-left: 30px !important;
        padding-right: 30px !important;
        position: relative;
    }
    .alert .close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        opacity: .9;
        font-size: 20px;
        text-shadow: none;
    }
</style>
