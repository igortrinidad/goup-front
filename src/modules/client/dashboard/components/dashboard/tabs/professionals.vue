<template>
    <div>

        <div class="container p-relative">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/peoples.png" alt="">
                <h4 class="f-300">Profissionais
                    <i class="ion-help-circled cursor-pointer" @click="enableTips()"></i>
                </h4>

                <div class="alert alert-info f-400" v-if="interactions.tips.settings">
                    <span class="close" @click="saveCloseTips('settings')"><i class="ion-ios-close-outline"></i></span>
                    <span>Altere aqui as configurações de compartilhamento com os profissionais.</span>
                </div>
                <div class="alert alert-info f-400" v-if="interactions.tips.professionals">
                    <span class="close" @click="saveCloseTips('professionals')"><i class="ion-ios-close-outline"></i></span>
                    <span>Os profissionais listados aqui poderão visualizar ou editar os módulos de seu perfil de acordo com as permissões que você conceder para cada um.</span>
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
        <div class="container" v-if="professionals_unconfirmed.length">
            <div class="row">
                <div class="col-sm-12">
                    <h4 class="text-center f-300 m-b-20">Profissionais pendentes de confirmação</h4>
                </div>
                <!-- Card -->
                <div class="col-sm-4 col-xs-12" v-for="(professional, $index) in professionals_unconfirmed">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ professional.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{professional.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in professional.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="professional.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="professional.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>
                            <span class="d-block f-300 f-14 m-t-10" v-if="professional.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-info btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && !professional.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(professional.id)">Aceitar solicitação
                            </button>
                            <button class="btn btn-info btn-sm m-t-10 disabled"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && professional.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>

                            <button class="btn btn-danger btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed"
                                    @click.prevent="rejectSolicitation(professional.id)">Excluir solicitação
                            </button>
                            <button class="btn btn-success btn-xs m-t-10"
                                    v-if="professional.pivot && professional.pivot.is_confirmed"
                                    @click.prevent="manageCompanyPermissions(professional)"
                            >Gerenciar permissões
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                </div>
                <!-- /Card -->


            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="professionals_unconfirmed.length">
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

            <h4 class="text-center f-300 m-b-20">Profissionais confirmados</h4>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
            >
            </card-placeholder>

            <div class="row" v-if="!placeholder">

                <div class="col-sm-4 col-xs-12" v-for="(professional, $index) in professionals_confirmed">
                    <!-- Card -->
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ professional.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{professional.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in professional.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="professional.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="professional.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>
                            <span class="d-block f-300 f-14 m-t-10" v-if="professional.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-info btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && !professional.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(professional.id)">Aceitar solicitação
                            </button>
                            <button class="btn btn-info btn-sm m-t-10 disabled"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && professional.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>

                            <button class="btn btn-danger btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed"
                                    @click.prevent="rejectSolicitation(professional.id)">Excluir solicitação
                            </button>
                            <button class="btn btn-success btn-xs m-t-10"
                                    v-if="professional.pivot && professional.pivot.is_confirmed"
                                    @click.prevent="manageCompanyPermissions(professional)"
                            >Gerenciar permissões
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                    <!-- Card -->
                </div>
            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="professionals_confirmed.length">
                    <div class="text-center">
                        <pagination :source="pagination_confirmed" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->
        </div>
        <!-- /CONFIRMED LIST -->

        <!--  DELETED LIST -->
        <div class="container" v-if="professionals_deleted.length">
            <div class="row">
                <div class="col-sm-12">
                    <h4 class="text-center f-300 m-b-20">Profissionais excluídos</h4>
                </div>
                <div class="col-sm-4 col-xs-12" v-for="(professional, $index) in professionals_deleted">
                    <!-- Card -->
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle picture-circle-m" :style="`background-image:url('${ professional.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{professional.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"v-for="category in professional.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block f-300 f-14 m-t-10 m-b-5" v-if="professional.current_rating > 0">
                                Avaliação
                                <rating-simple
                                    :value.sync="professional.current_rating"
                                    :max="5"
                                    :size="1"
                                    :align-class="'text-center'"
                                ></rating-simple>
                            </span>
                            <span class="d-block f-300 f-14 m-t-10" v-if="professional.current_rating <= 0">
                                Ainda não possui avaliações suficientes
                            </span>

                            <!--Actions-->
                            <button class="btn btn-info btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && !professional.pivot.requested_by_client"
                                    @click.prevent="acceptSolicitation(professional.id)">Aceitar solicitação
                            </button>
                            <button class="btn btn-info btn-sm m-t-10 disabled"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed && professional.pivot.requested_by_client"
                            >Solicitação enviada
                            </button>

                            <button class="btn btn-danger btn-sm m-t-10"
                                    v-if="professional.pivot && !professional.pivot.is_confirmed"
                                    @click.prevent="rejectSolicitation(professional.id)">Excluir solicitação
                            </button>
                            <button class="btn btn-success btn-xs m-t-10"
                                    v-if="professional.pivot && professional.pivot.is_confirmed"
                                    @click.prevent="manageCompanyPermissions(professional)"
                            >Gerenciar permissões
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                    <!-- Card -->
                </div>

            </div>

            <!-- pagination -->
            <div class="row">
                <div class="col-sm-12" v-show="professionals_deleted.length">
                    <div class="text-center">
                        <pagination :source="pagination_deleted" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- pagination -->

        </div>
        <!--  / DELETED LIST -->

        <!-- no professionals -->
        <div class="m-t-20" v-if="!professionals_confirmed.length && !professionals_unconfirmed.length && !professionals_deleted.length">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <i class="d-block ion-sad-outline f-24"></i>
                            <span class="f-300">Você ainda não possui profissionais cadastrados.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- / no professionals -->

        <!--Permissions Modal-->
        <div class="modal" id="modal-professional-permissions" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">{{selectedProfessional.full_name}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            Selecione as informações que poderão ser visualizadas e gerenciadas por este profissional.</p>

                        <div class="row m-t-20">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Treinamentos</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.trainnings_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.trainnings_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Dietas</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.diets_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.diets_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Avaliações</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.evaluations_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.evaluations_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Restrições</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.restrictions_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>


                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.restrictions_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Exames</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.exams_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="selectedProfessionalPermissions.exams_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal"
                                @click="updateCompanyPermissions()">Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Permissions Modal-->
    </div>
</template>

<script>

    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import professionalObj from '@/models/Company'
    import {mapGetters, mapActions} from 'vuex'

    export default{
        name: 'client-dashboard-professionals',
        components: {
            avatar: require('@/components/avatar.vue'),
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
                    tips: { settings: true, professionals: true }
                },
                placeholder: true,
                professionals_confirmed: [],
                pagination_confirmed: {},
                professionals_unconfirmed: [],
                pagination_unconfirmed: {},
                professionals_deleted: [],
                pagination_deleted: {},
                filter: '',
                selectedProfessional: {},
                selectedProfessionalPermissions: {}
            }
        },
        computed: {
            ...mapGetters(['currentUser']),
/*
            filteredCompanies: function () {
                let that = this;
                return this.professionals.filter(function (professional) {
                    return professional.name.toLowerCase().indexOf(that.filter.toLowerCase()) >= 0;
                });
            }
            */
        },
        mounted() {
            this.getCompanies()
            this.checkTipsInLocalStorageToShow()
        },
        methods: {

            ...mapActions(['addClientCompany', 'removeClientCompany']),

            enableTips() {
                this.interactions.tips.settings = true
                this.interactions.tips.professionals = true
            },

            checkTipsInLocalStorageToShow() {
                if (window.localStorage.getItem('client_settings_tip') === 'seen') {
                    this.interactions.tips.settings = false
                }
                if (window.localStorage.getItem('client_professionals_tip') === 'seen') {
                    this.interactions.tips.professionals = false
                }
            },

            saveCloseTips(tip) {
                if (tip === 'settings') {
                    this.interactions.tips.settings = false
                    window.localStorage.setItem('client_settings_tip', 'seen')
                }
                if (tip === 'professionals') {
                    this.interactions.tips.professionals = false
                    window.localStorage.setItem('client_professionals_tip', 'seen')
                }
            },

            onRefresh: function () {
                let that = this
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                        that.getCompanies()
                    }, 1000)
                })
            },

            getCompanies() {
                let that = this
                that.placeholder = true
                that.$http.get('client/professional/list')
                    .then(function (response) {
                        that.professionals_confirmed = response.data.professionals_confirmed.professionals_confirmed
                        that.pagination_confirmed = response.data.professionals_confirmed.pagination

                        that.professionals_unconfirmed = response.data.professionals_unconfirmed.professionals_unconfirmed
                        that.pagination_unconfirmed = response.data.professionals_unconfirmed.pagination

                        that.professionals_deleted = response.data.professionals_deleted.professionals_deleted
                        that.pagination_deleted = response.data.professionals_deleted.pagination
                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            navigate(page) {
                let that = this

                that.$http.get(`client/professional/list?page=${page}`)
                    .then(function (response) {

                        that.professionals = response.data.professionals
                        that.pagination = response.data.pagination

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            acceptSolicitation(professional_id) {
                let that = this

                that.$http.post('client/professional/accept_solicitation', {
                    client_id: that.currentUser.id,
                    professional_id: professional_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação aceita com sucesso')

                        that.addClientCompany(response.data.professional)

                        that.manageCompanyPermissions(response.data.professional)

                        that.getCompanies()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

            rejectSolicitation(professional_id) {
                let that = this

                that.$http.post('client/professional/remove_solicitation', {
                    client_id: that.currentUser.id,
                    professional_id: professional_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação removida com sucesso')

                        that.removeClientCompany(professional_id)

                        that.getCompanies()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

            manageCompanyPermissions(selected) {
                let that = this

                that.selectedProfessional.full_name = selected.full_name
                that.selectedProfessionalPermissions = selected.pivot

                $('#modal-professional-permissions').modal('show');
            },

            updateCompanyPermissions() {
                let that = this

                that.$http.post('client/professional/update_relationship', that.selectedProfessionalPermissions)
                    .then(function (response) {

                        successNotify('', 'Permissões atualizadas com sucesso')

                        that.getCompanies()

                        $('#modal-professional-permissions').modal('hide');

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }

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
