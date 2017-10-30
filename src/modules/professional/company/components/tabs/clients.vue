<template>

    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/peoples.png" alt="">
                <h3 class="f-300">Clientes</h3>
            </div>

            <div class="row" v-if="isCompanyProfessional(currentCompany.id)">
                <div class="col-sm-12">
                    <button type="button" class="btn f-20 btn-light btn-block f-300 m-b-20" name="button"
                            @click=" interactions.addClient = !interactions.addClient">
                        <span v-if="interactions.addClient"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar formulário</span>
                        <span v-if="!interactions.addClient"><i
                            class="ion-ios-plus-outline m-r-5"></i>Novo cliente</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container" v-if="interactions.addClient">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h3 class="f-300 m-0">Novo cliente</h3>
                        </div>
                        <div class="card-body card-padding">
                            <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                                <label>Nome (obrigatório)</label>
                                <input
                                    v-validate="'required'"
                                    type="text"
                                    class="form-control" data-vv-name="name" data-vv-as="nome"
                                    placeholder="Nome"
                                    v-model="client.name"
                                >
                                <small class="f-300 f-danger">{{ errors.first('name') }}</small>

                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('last_name')}">
                                <label>Sobrenome (obrigatório)</label>
                                <input
                                    v-validate="'required'"
                                    type="text"
                                    class="form-control" data-vv-name="last_name" data-vv-as="nome"
                                    placeholder="Sobrenome"
                                    v-model="client.last_name"
                                    @blur="checkSlugBlur()"
                                >
                                <small class="f-300 f-danger">{{ errors.first('last_name') }}</small>

                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                                <label>E-mail (obrigatório)</label>
                                <input
                                    v-validate="'required|email'"
                                    type="email"
                                    class="form-control" data-vv-name="email" data-vv-as="nome"
                                    placeholder="E-mail"
                                    v-model="client.email"
                                >
                                <small class="f-300 f-danger">{{ errors.first('email') }}</small>

                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('phone')}">
                                <label>Telefone (obrigatório)</label>
                                <input
                                    v-validate="'required'"
                                    type="tel"
                                    class="form-control" data-vv-name="phone" data-vv-as="telefone"
                                    placeholder="Telefone"
                                    v-model="client.phone"
                                >
                                <small class="f-300 f-danger">{{ errors.first('phone') }}</small>

                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('bday')}">

                                <label>Nascimento (obrigatório)</label>
                                <datepicker
                                    id="certification-grantedat"
                                    input-class="form-control"
                                    v-model="client.bday"
                                    language="pt-br"
                                    placeholder="Escolha a data de nascimento"
                                    format="dd/MM/yyyy"
                                    :required="true"
                                >
                                </datepicker>
                                <small class="f-300 f-danger" v-show="!client.bday">O campo nascimento é obrigatório</small>
                            </div>

                            <div class="form-group">
                                <label>URL única (nome de usuário)</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="URL"
                                    v-model="client.slug"
                                    @blur="checkSlug()"
                                    :class="{'slug_error' : interactions.slug_error && interactions.slug_checked, 'slug-checked': !interactions.slug_error && interactions.slug_checked}"
                                >
                            </div>

                            <button
                                class="btn btn-primary btn-block m-t-20"
                                @click.prevent="saveClient"
                                :disabled="!client.name || !client.last_name || !client.email || !client.phone || !client.bday"
                            >
                                Salvar cliente
                            </button>
                            <button class="btn btn-default btn-block m-t-20" @click.prevent="cancelAddClient()">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">

            <div class="col-sm-12" v-if="!isCompanyProfessional(currentCompany.id)">
                <div class="box d-block">
                    <p class="m-t-10">Você deve confirmar a solicitação para ver os clientes desta empresa.</p>
                </div>
            </div>

            <div class="row" v-if="isCompanyProfessional(currentCompany.id)">

                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Pesquisar clientes</h4>
                        </div>
                        <div class="card-body card-padding">
                            <div class="form-group search">
                                <label class="input-group">
                                    <input type="text" class="form-control" v-model="client_search"
                                           placeholder="Procure pelo nome ou e-mail do cliente" value=""
                                           @keyup.enter="search">
                                    <span class="input-group-addon btn btn-light" name="span" @click="search"><i
                                        class="ion-ios-search f-20"></i></span>
                                </label>
                            </div>

                            <div v-if="!clients_confirmed.length && !interactions.addClient">
                                <p>
                                    Sua busca não retornou nenhum resultado, clique no botão abaixo para adicionar um novo cliente</p>

                                <div>
                                    <button class="btn btn-primary btn-block" @click="interactions.addClient = true">
                                        Adicionar novo cliente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="container">

            <!-- Non clients -->
            <div class="row">
                <h4 class="text-center">Outros clientes</h4>
                <!-- v-for na .list-item -->
                <div class="col-sm-4 col-xs-12" v-for="(client, $index) in non_clients">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle" :style="`background-image:url('${ client.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{client.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="d-block f-300 f-14 m-t-10">
                                <i class="icon ion-ios-email-outline m-r-10 f-20"></i>{{client.email}}
                            </span>
                            <!--Actions-->
                            <button class="btn btn-info btn-sm m-t-10" @click.prevent="clientSolicitation(client.id)" :disabled="!isCompanyAdmin(currentCompany.id)">
                                Adicionar cliente
                            </button>
                            <!--Actions-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12" v-show="non_clients.length">
                    <div class="text-center">
                        <pagination :source="non_clients_pagination" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- Non clients -->

            <!--COnfirmed clients-->

            <card-placeholder
                v-show="placeholder.clients_confirmed"
                :circleImage="true"
            >
            </card-placeholder>

            <div class="row" v-show="!placeholder.clients_confirmed">
                <h4 class="text-center m-b-30">Clientes confirmados</h4>
                <p class="text-center m-t-20" v-if="!clients_confirmed.length">Nenhum cliente confirmado.</p>
                <!-- v-for na .list-item -->
                <div class="col-sm-4 col-xs-12" v-for="(client, $index) in clients_confirmed">
                    <div class="card">

                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle" :style="`background-image:url('${ client.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{client.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="d-block f-300 f-14 m-t-10">
                                <i class="icon ion-ios-email-outline m-r-10 f-20"></i>{{client.email}}
                            </span>
                            <!--Confirmed client -->
                            <span class="d-block f-300 f-14 m-t-10" v-if="client.companies[0].pivot.is_confirmed">
                                <i class="icon ion-ios-telephone-outline m-r-10 f-20"></i>{{client.phone}}
                            </span>
                            <router-link
                                tag="button"
                                :to="{name: 'client.dashboard', params: {client_id: client.id}}"
                                class="btn btn-primary btn-block btn-sm  m-t-10"
                                v-if="client.companies[0].pivot.is_confirmed"
                            >Ir para o dashboard do cliente
                            </router-link>

                            <hr>

                            <router-link
                                tag="button"
                                :to="{name: 'admin.companies.client.show', params: {company_id: currentCompany.id, client_id: client.id}}"
                                class="btn btn-info btn-sm btn-block  m-t-10"
                                :disabled="!isCompanyAdmin(currentCompany.id) && !client.companies[0].pivot.is_confirmed"
                            >Gerenciar cliente
                            </router-link>
                            <!--Confirmed client -->
                            <p class="f-300 m-t-20 f-danger text-center" v-if="!isCompanyAdmin(currentCompany.id) && !client.companies[0].pivot.is_confirmed">Você não possui permissão para gerenciar esse cliente</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12" v-show="clients_confirmed.length">
                    <div class="text-center">
                        <pagination :source="pagination_confirmed" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>

            <!--COnfirmed clients-->

            <!-- Unconfirmed clients -->
            <div class="text-center m-t-20 m-b-20">
                <button class="btn btn-info" v-if="!interactions.showUnconfirmedClients" @click.prevent="interactions.showUnconfirmedClients = true">Exibir clientes não confirmados</button>
                <button class="btn btn-primary" v-if="interactions.showUnconfirmedClients" @click.prevent="interactions.showUnconfirmedClients = false">Esconder clientes não confirmados</button>
            </div>

            <div class="row"  v-if="interactions.showUnconfirmedClients">
                <h4 class="text-center">Clientes não confirmados</h4>
                <p class="text-center" v-if="!clients_unconfirmed.length && !placeholder.clients_unconfirmed">Nenhum cliente não confirmado</p>

                <card-placeholder
                    v-if="placeholder.clients_unconfirmed"
                    :circleImage="true"
                    :title="client.full_name"
                >
                </card-placeholder>

                <!-- v-for na .list-item -->
                <div class="col-sm-4 col-xs-12" v-for="(client, $index) in clients_unconfirmed" v-if="!placeholder.clients_unconfirmed">
                    <div class="card">

                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle" :style="`background-image:url('${ client.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{client.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="d-block f-300 f-14 m-t-10">
                                <i class="icon ion-ios-email-outline m-r-10 f-20"></i>{{client.email}}
                            </span>
                            <!--Confirmed client -->
                            <span class="d-block f-300 f-14 m-t-10" v-if="client.companies[0].pivot.is_confirmed">
                                <i class="icon ion-ios-telephone-outline m-r-10 f-20"></i>{{client.phone}}
                            </span>
                            <router-link
                                tag="button"
                                :to="{name: 'admin.companies.client.show', params: {company_id: currentCompany.id, client_id: client.id}}"
                                class="btn btn-info btn-sm  m-t-10"
                                v-if="client.companies[0].pivot.is_confirmed"
                            >Gerenciar cliente
                            </router-link>
                            <!--Confirmed client -->

                            <!--Unconfirmed client-->
                            <button class="btn btn-info btn-sm disabled m-t-10"
                                    v-if="!client.companies[0].pivot.is_confirmed && !client.companies[0].pivot.requested_by_client">
                                Solicitação enviada
                            </button>
                            <button class="btn btn-info m-t-10"
                                    v-if="!client.companies[0].pivot.is_confirmed && client.companies[0].pivot.requested_by_client"
                                    @click="acceptClientSolicitation(client.id)">
                                Aceitar solicitação
                            </button>
                            <button class="btn btn-danger m-t-10"
                                    v-if="!client.companies[0].pivot.is_confirmed"
                                    @click="removeSolicitation(client.id)">Excluir solicitação
                            </button>
                            <!--Unconfirmed client-->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12" v-show="clients_unconfirmed.length">
                        <div class="text-center">
                            <pagination :source="pagination_unconfirmed" @navigate="navigate" :range="6"></pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Unconfirmed clients -->

            <!--Deleted clients-->
            <div class="text-center m-t-20 m-b-20">
                <button class="btn btn-info" v-if="!interactions.showClientsDeleted"
                        @click.prevent="interactions.showClientsDeleted = true">Exibir clientes removidos
                </button>
                <button class="btn btn-primary" v-if="interactions.showClientsDeleted"
                        @click.prevent="interactions.showClientsDeleted = false">Esconder clientes removidos
                </button>
            </div>

            <card-placeholder
                v-show="placeholder.clients_deleted"
                :circleImage="true"
            >
            </card-placeholder>

            <div class="row" v-if="interactions.showClientsDeleted && !placeholder.clients_deleted">
                <h4 class="text-center">Clientes removidos</h4>
                <p class="text-center" v-if="!clients_deleted.length">Nenhum cliente removido</p>
                <!-- v-for na .list-item -->
                <div class="col-sm-4 col-xs-12" v-for="(client, $index) in clients_deleted">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <div class="picture-circle" :style="`background-image:url('${ client.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">{{client.full_name}}</h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <span class="d-block f-300 f-14 m-t-10">
                                <i class="icon ion-ios-email-outline m-r-10 f-20"></i>{{client.email}}
                            </span>
                            <!--Confirmed client -->
                            <span class="d-block f-300 f-14 m-t-10" v-if="client.companies[0].pivot.is_confirmed">
                                <i class="icon ion-ios-telephone-outline m-r-10 f-20"></i>{{client.phone}}
                            </span>
                            <!--Confirmed client -->

                            <!--Unconfirmed client-->
                            <button class="btn btn-info btn-sm m-t-10"
                                    v-if="client.companies[0].pivot.is_deleted && client.companies[0].pivot.deleted_by_id != client.id"
                                    @click.prevente="reactivateSolicitation(client.id)">
                                Reativar cliente
                            </button>
                            <!--Unconfirmed client-->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12" v-show="clients_deleted.length">
                        <div class="text-center">
                            <pagination :source="pagination_deleted" @navigate="navigate" :range="6"></pagination>
                        </div>
                    </div>
                </div>
            </div>

            <!--Deleted clients-->

        </div>


    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { clearClientObject } from '@/models/Client.js'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import slug from 'slug'
    import Datepicker from 'vuejs-datepicker'
    import moment from 'moment'

    export default {
        name: 'company-clients-tab',
        components: {
            pagination: require('@/components/pagination.vue'),
            Datepicker,
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    addClient: false,
                    search: false,
                    slug_error: false,
                    slug_checked: false,
                    showUnconfirmedClients: false,
                    showClientsDeleted: false
                },
                placeholder: {
                    clients_confirmed: true,
                    clients_unconfirmed: true,
                    clients_deleted: true
                },
                clients_confirmed: [],
                pagination_confirmed: {},
                clients_unconfirmed: [],
                pagination_unconfirmed: {},
                clients_deleted: [],
                pagination_deleted: {},
                non_clients: [],
                non_clients_pagination: {},
                client_search: '',
                searched: false,
                navigate_url: null,
                client: clearClientObject()
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'currentCompany', 'isCompanyProfessional', 'isCompanyAdmin']),
        },
        mounted() {
            let that = this
            if (this.isCompanyProfessional(that.$route.params.company_id)) {
                this.getClients()
            }
        },
        methods: {
            ...mapActions(['setLoading']),

            checkSlugBlur: function(){
                let that = this

                that.interactions.slug_checked = false;
                var full_name = this.client.name + ' ' + this.client.last_name;
                this.client.slug = slug(full_name).toLowerCase()
                this.checkSlug();

            },

            checkSlug: function(){
                let that = this

                this.client.slug = slug(this.client.slug).toLowerCase();

                that.$http.get(`check_slug/client/${that.client.slug}`)
                .then(function (response) {

                    that.interactions.slug_error = response.data.already_exist;
                    that.interactions.slug_checked = true;

                    if(that.interactions.slug_error){
                        that.interactions.slug_error = false;
                        that.client.slug += '-'+Math.floor(Math.random() * 99999) + 1;
                    }

                })
                .catch(function (error) {
                });
            },

            getClients: function () {
                let that = this

                that.placeholder.clients_confirmed = true
                that.placeholder.clients_unconfirmed = true
                that.placeholder.clients_deleted = true

                that.$http.post('professional/company/clients', {company_id: that.$route.params.company_id})
                    .then(function (response) {


                        that.clients_confirmed = response.data.clients_confirmed.clients_confirmed
                        that.pagination_confirmed = response.data.clients_confirmed.pagination

                        that.clients_unconfirmed = response.data.clients_unconfirmed.clients_unconfirmed
                        that.pagination_unconfirmed = response.data.clients_unconfirmed.pagination

                        that.clients_deleted = response.data.clients_deleted.clients_deleted
                        that.pagination_deleted = response.data.clients_deleted.pagination

                        that.clients_deleted = response.data.clients_deleted.clients_deleted
                        that.pagination_deleted = response.data.clients_deleted.pagination

                        that.non_clients = []
                        that.non_clients_pagination = []

                        that.navigate_url = 'professional/company/clients'

                        setTimeout(() => {
                            that.placeholder.clients_confirmed = false
                            that.placeholder.clients_unconfirmed = false
                            that.placeholder.clients_deleted = false
                        }, 2000);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            navigate(page) {
                let that = this

                that.$http.post(`${that.navigate_url}?page=${page}`, {
                    company_id: that.$route.params.company_id,
                    search: that.client_search,
                    page: page
                })
                    .then(function (response) {

                        that.clients_confirmed = response.data.clients_confirmed.clients_confirmed
                        that.pagination_confirmed = response.data.clients_confirmed.pagination

                        that.clients_unconfirmed = response.data.clients_unconfirmed.clients_unconfirmed
                        that.pagination_unconfirmed = response.data.clients_unconfirmed.pagination

                        that.clients_deleted = response.data.clients_deleted.clients_deleted
                        that.pagination_deleted = response.data.clients_deleted.pagination

                       if(response.data.non_clients){
                           that.non_clients = response.data.non_clients.non_clients
                           that.non_clients_pagination = response.data.non_clients.pagination
                       }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            search() {
                let that = this

                that.placeholder.clients_confirmed = true
                that.placeholder.clients_unconfirmed = true
                that.placeholder.clients_deleted = true

                that.$http.post('professional/company/client/search', {
                    search: that.client_search,
                    company_id: that.$route.params.company_id
                })
                    .then(function (response) {


                        that.clients_confirmed = response.data.clients_confirmed.clients_confirmed
                        that.pagination_confirmed = response.data.clients_confirmed.pagination

                        that.clients_unconfirmed = response.data.clients_unconfirmed.clients_unconfirmed
                        that.pagination_unconfirmed = response.data.clients_unconfirmed.pagination

                        that.clients_deleted = response.data.clients_deleted.clients_deleted
                        that.pagination_deleted = response.data.clients_deleted.pagination

                        that.non_clients = response.data.non_clients.non_clients
                        that.non_clients_pagination = response.data.non_clients.pagination

                        that.searched = true
                        that.navigate_url = 'professional/company/client/search'

                        setTimeout(() => {
                            that.placeholder.clients_confirmed = false
                            that.placeholder.clients_unconfirmed = false
                            that.placeholder.clients_deleted = false
                        }, 200);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            clientSolicitation(client_id) {
                let that = this
                that.$http.post('professional/company/client/solicitation', {
                    company_id: that.$route.params.company_id,
                    client_id: client_id,
                    requested_by_client: false
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação enviada com sucesso')

                        that.getClients()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            cancelAddClient() {
                this.client = clearClientObject()
                this.interactions.addClient = false
            },

            saveClient() {
                var that = this
                that.client.company_id = that.$route.params.company_id

                that.client.name = that.client.name.toTitleCase()
                that.client.last_name = that.client.last_name.toTitleCase()
                that.client.bday = moment(that.client.bday).format('DD/MM/YYYY')

                that.setLoading({is_loading: true, message: ''})
                that.$http.post('professional/company/client/create', that.client)
                    .then(function (response) {
                        that.setLoading({is_loading: false, message: ''})

                        if (response.data.status == 422) {
                            errorNotify('', 'Localizamos um cliente com este email.')

                            that.client_search = that.client.email
                            that.interactions.addClient = false
                            that.search();



                        } else {

                            successNotify('', 'Cliente adicionado com sucesso.')

                            that.getClients()

                            that.cancelAddClient()

                        }

                    })
                    .catch(function (error) {

                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            removeSolicitation(client_id) {
                let that = this
                that.$http.post('professional/company/client/remove_solicitation', {
                    company_id: that.currentCompany.id,
                    client_id: client_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação removida com sucesso')

                        that.getClients()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            acceptClientSolicitation(client_id) {
                let that = this

                that.$http.post('professional/company/client/accept_solicitation', {
                    client_id: client_id,
                    company_id: that.currentCompany.id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação aceita com sucesso')

                        that.getClients()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

            reactivateSolicitation(client_id) {
                let that = this
                that.$http.post('professional/company/client/reactivate_solicitation', {
                    company_id: that.currentCompany.id,
                    client_id: client_id
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação reativada com sucesso')

                        that.getClients()
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
