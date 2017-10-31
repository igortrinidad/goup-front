<template>

    <div>
        <div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/contract.png">
                <h3 class="f-300">Planos</h3>
                <div class="alert alert-info text-center">
                    Controle aqui os planos do cliente {{client.full_name}}.
                </div>
            </div>
        </div>

        <div class="container">

            <button class="btn btn-success btn-block m-t-30" data-toggle="modal" data-target="#modal-add-new-plan">
                Adicionar novo plano
            </button>

        </div>

        <div class="container m-t-30">

            <p class="f-300 text-center" v-if="!client.subscriptions.length">Nenhum plano ou inscrição ainda.</p>
            <div class="card" v-for="(subs, indexSubs) in client.subscriptions">
                <!-- Card Header -->
                <div class="card-header ch-alt text-center cursor-pointer" @click="toggleSelectedSubs(subs)">
                    <h3 class="f-300 f-22 m-b-0">{{subs.plan.name}}</h3>
                    <span class="label label-success f-12 p-5 f-300 m-t-10" v-show="subs.is_active">Ativo</span>
                    <span class="label label-danger f-12 p-5 f-300 m-t-10" v-show="!subs.is_active">Desativo</span>
                    <br>
                    <p>Criado em: {{subs.created_at | moment('DD/MM/YYYY')}}</p>

                    <!-- toggle button open and close card -->
                    <span class="control-header">
                        <i class="ion-ios-arrow-down f-22" v-if="interactions.subsCardOpened.indexOf(subs.id) < 0"></i>
                        <i class="ion-ios-arrow-up f-22" v-if="interactions.subsCardOpened.indexOf(subs.id) > -1"></i>
                    </span>
                    <!-- / toggle button open and close card -->
                </div>
                <!-- /Card Header -->

                <!-- Card Body -->
                <div class="card-body card-padding" v-if="interactions.subsCardOpened.indexOf(subs.id) > -1">
                    <h4 class="text-center">Sobre este plano</h4>
                    <div class="m-t-20 m-b-20">
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Status:</strong>
                            <span class="label label-success f-12 p-5 f-300 m-t-10" v-show="subs.is_active">Ativo</span>
                            <span class="label label-danger f-12 p-5 f-300 m-t-10" v-show="!subs.is_active">Desativo</span>
                        </div>
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Valor:</strong>
                            <small>{{ subs.value | formatCurrency }}</small>
                        </div>
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Quantidade:</strong>
                            <small>{{ subs.quantity }} ({{subs.plan.label}})</small>
                        </div>
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Início:</strong>
                            <small>{{ subs.start_at }}</small>
                        </div>
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Próximo vencimento:</strong>
                            <small>{{ subs.expire_at }}</small>
                        </div>
                        <div class="f-300 m-t-5">
                            <strong class="f-400">Renovação automática:</strong>
                            <small>{{ subs.auto_renew | handleTrueFalse }}</small>
                        </div>
                        <div class="f-300 m-t-20">
                            <button type="button" class="btn btn-block btn-info btn-sm f-300"
                                    @click="setSubscriptionToEdit(subs)">
                               Editar plano
                            </button>
                        </div>

                    </div>

                    <hr>

                    <div class="row  m-t-20">
                        
                       <!-- <div class="col-md-12 full text-center cursor-pointer" v-if="!subs.invoices.length">

                            <button class="btn btn-info btn-block" @click="generateNewInvoiceAndSchedule(subs)" :disabled="!subs.workdays.length">
                                Gerar fatura e próximas {{subs.plan.label}}{{subs.plan.quantity >1? 's': ''}}
                            </button>
                        </div>-->

                        <div class="col-sm-12 m-t-20 m-b-20 text-center" v-if="!subs.invoices.length && !subs.workdays.length">
                            <span class="f-300 f-info">Tudo pronto aqui, o próximo passo é configurar os horários do cliente.</span>
                            <button class="btn btn-primary btn-block m-t-20" @click.prevent="goToTab('workdays')">Clique aqui para ir até horários</button>
                        </div>

                        <div class="col-md-12 full text-center cursor-pointer" v-if="!subs.invoices.length && subs.workdays.length">
                            <span class="f-300 f-info"> Você já pode gerar a fatura e agendamentos para este plano.</span>
                            <button class="btn btn-primary btn-block m-t-20" @click.prevent="goToTab('invoices')">Clique aqui para ir até faturas</button>
                        </div>

                        <div class="col-md-12 full text-center cursor-pointer" v-if="subs.invoices.length && subs.workdays.length">
                            <span class="f-300 f-info">A configuração deste plano já esta completa.</span>
                            <button class="btn btn-primary btn-block m-t-20" @click.prevent="goToTab('invoices')">Clique aqui para ir até faturas</button>
                            <button class="btn btn-primary btn-block m-t-20" @click.prevent="goToTab('schedules')">Clique aqui para ir até agendamentos</button>
                        </div>
                    </div>
                </div>
                <!-- /Card Body -->
            </div>

        </div>

        <!-- ADD NEW PLAN -->
        <div class="modal" id="modal-add-new-plan" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Novo plano</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="company-name-id">Plano</label>
                            <multiselect
                                v-model="selectedPlan"
                                :options="plans"
                                :multiple="false"
                                placeholder="Selecione um plano para adicionar ao cliente"
                                label="name"
                                track-by="id"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desmarcar"
                                selectedLabel="Selecionado"
                                @input="setPlan">

                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label>Início</label>
                            <input class="form-control" v-model="newSubscription.start_at" @blur="setNewExpiriration"
                                   v-mask="'##/##/####'" :disabled="!newSubscription.plan_id">
                        </div>

                        <div class="form-group">
                            <label>Próximo vencimento</label>
                            <input class="form-control" v-model="newSubscription.expire_at" disabled>
                        </div>

                        <div class="form-group">
                            <label>Valor</label>
                            <input type="tel" class="form-control" v-model="newSubscription.value"
                                   :disabled="!newSubscription.plan_id" data-mask="0000.00" data-mask-reverse="true">
                        </div>

                        <div class="form-group" v-if="selectedPlan && selectedPlan.limit_quantity">
                            <label>Quantidade de {{selectedPlan.label}}{{selectedPlan.quantity >1? 's': ''}}</label>
                            <input class="form-control" v-model="selectedPlan.quantity" disabled>
                        </div>

                        <div class="form-group m-t-10">
                            <label>Renovação automática?</label><br>
                            <p>
                                {{newSubscription.auto_renew ? 'Habilitado' : 'Desabilitado'}}</p>
                            <label class="switch">
                                <input type="checkbox" v-model="newSubscription.auto_renew">
                                <div class="slider round"></div>
                            </label>
                        </div>

                        <div class="form-group m-t-10">
                            <label>Ativo?</label><br>
                            <p>
                                {{newSubscription.is_active ? 'Habilitado' : 'Desabilitado'}}</p>
                            <label class="switch">
                                <input type="checkbox" v-model="newSubscription.is_active">
                                <div class="slider round"></div>
                            </label>
                        </div>

                        <hr>

                        <button class="btn btn-sm btn-block btn-danger" @click="confirmRemoveClientSubscription(newSubscription.id)" v-if="interactions.isUpdate">Excluir plano e agendamentos</button>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info"
                                data-dismiss="modal"
                                :disabled="!newSubscription.plan_id || !newSubscription.start_at"
                                @click="saveClientSubscription()"
                                v-show="!interactions.isUpdate"
                        >Adicionar plano
                        </button>
                        <button class="btn btn-info"
                                data-dismiss="modal"
                                :disabled="!newSubscription.plan_id || !newSubscription.start_at"
                                @click="updateClientSubscription(newSubscription)"
                                v-show="interactions.isUpdate"
                        >Atualizar plano
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ADD NEW PLAN -->
    </div>
</template>

<script>
    import Moment from 'moment'
    import {apiUrl} from '@/config/'
    import mainHeader from '@/components/main-header.vue'
    import {mapGetters, mapActions} from 'vuex'
    import Multiselect from 'vue-multiselect'

    import {cleanSubscription} from '@/models/ClientSubscription'
    import {cleanInvoice} from '@/models/Invoice'
    import {cleanSchedule} from '@/models/Schedule'

    import calendarToSetWorkdays from '@/components/calendar-to-set-workdays.vue'
    import Datepicker from 'vuejs-datepicker'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    import bus from '@/utils/event-bus'

    export default {
        name: 'companies-client-show',
        props: ['client'],
        components: {
            mainHeader,
            Multiselect,
            calendarToSetWorkdays,
            Datepicker
        },
        data() {
            return {
                interactions: {
                    isUpdate: false,
                    plansSelecteds: [],
                    subsCardOpened:[],
                    invoiceCardOpened:[],
                    EditWorkdays: false,
                    addNewTrialSchedule: false
                },
                tabs: [
                    { name: 'Sobre', slug: 'about' },
                    { name: 'Faturas', slug: 'invoices' },
                    { name: 'Agendamentos', slug: 'schedules' },
                    { name: 'Horários', slug: 'workdays' },
                    { name: 'Planos', slug: 'plans' },
                    { name: 'Observações', slug: 'observations' },
                ],
                lastTab: 0,
                currentTab: {},
                newSubscription: cleanSubscription(),
                plans: [],
                selectedPlan: null,
                selectedSubscription: null,

            }
        },
        computed: {
            ...mapGetters(['AuthToken', 'currentUser', 'currentCompany']),
        },

        mounted() {

            this.getCompanyPlans()

            this.categories = this.currentCompany.categories

            this.newSubscription.company_id = this.$route.params.company_id
            this.newSubscription.client_id = this.$route.params.client_id

        },

        methods: {

            ...mapActions(['disableLoader', 'setLoading']),

            getClient: function () {
                let that = this

                bus.$emit('emit-get-client');
                $('html, body').stop().animate({ scrollTop: 100 }, 0, 'easeInOutExpo');
            },

            getCompanyPlans: function () {
                let that = this
                that.$http.get(`professional/company/plan/list/${that.$route.params.company_id}`)
                    .then(function (response) {
                        that.plans = response.data.plans
                        //console.log(that.plans);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setPlan: function (selected) {
                let that = this

                if (selected) {

                    if(!this.interactions.isUpdate){

                        let exists = _.findIndex(this.client.subscriptions, {plan_id: selected.id})

                        if(exists > -1) {
                           this.$swal('Atenção', 'O cliente já possui o plano selecionado.', 'warning')
                        }
                    }

                    this.newSubscription.plan_id = selected.id
                    this.checkPlan();
                }
            },

            setSubscriptionToEdit: function (subs) {

                this.newSubscription = subs;
                this.interactions.isUpdate = true;
                $('#modal-add-new-plan').modal('show');

                if (subs.plan_id) {
                    var index = this.plans.indexFromAttr('id', subs.plan_id)
                    if (index > -1) {
                        this.selectedPlan = this.plans[index];
                    }
                }

                this.checkPlan(true)
            },

            checkPlan: function (update = false) {

                this.newSubscription.expire_at = moment(this.newSubscription.start_at, 'DD/MM/YYYY').add(this.selectedPlan.expiration, 'months').format('DD/MM/YYYY');
                this.newSubscription.quantity = this.selectedPlan.quantity;
                if (!update) this.newSubscription.value = this.selectedPlan.value;
            },

            saveClientSubscription: function () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.post(`professional/company/subscription/store`, that.newSubscription)
                    .then(function (response) {
                        that.getClient();
                        that.toggleSelectedSubs(response.data.subscription)
                        that.newSubscription = cleanSubscription();
                        that.newSubscription.company_id = that.$route.params.company_id
                        that.newSubscription.client_id = that.$route.params.client_id
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            updateClientSubscription: function (subs) {
                let that = this

                if(that.workdays_changed){
                    that.$swal({
                        title: 'Atualização de horário',
                        text: 'A configuração da agenda foi alterada, os agendamentos futuros alterados automaticamente. Deseja continuar?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true
                    }).then(function () {

                        subs.update_schedules = true

                        delete subs.invoices
                        delete subs.plan

                        that.setLoading({is_loading: true, message: ''})
                        that.$http.post(`professional/company/subscription/update`, subs)
                            .then(function (response) {

                                let subs_index = _.findIndex(that.client.subscriptions, {id: subs.id})
                                that.client.subscriptions.splice(subs_index, 1)
                                that.client.subscriptions.splice(subs_index, 0, response.data.subscription)

                                that.interactions.isUpdate = false;
                                that.interactions.EditWorkdays = false;
                                that.workdays_changed = false;
                                that.setLoading({is_loading: false, message: ''})
                            })
                            .catch(function (error) {
                                console.log(error)
                                that.setLoading({is_loading: false, message: ''})

                            });

                    }).catch(function () {
                        that.interactions.isUpdate = false;
                        that.interactions.EditWorkdays = false;
                        that.workdays_changed = false;
                        that.toggleSelectedSubs(subs)
                        that.getClient()
                    })
                }else{
                    that.setLoading({is_loading: true, message: ''})
                    that.$http.post(`professional/company/subscription/update`, subs)
                        .then(function (response) {
                            let subs_index = _.findIndex(that.client.subscriptions, {id: subs.id})
                            that.client.subscriptions.splice(subs_index, 1)
                            that.toggleSelectedSubs(subs)
                            that.client.subscriptions.splice(subs_index, 0, response.data.subscription)
                            that.toggleSelectedSubs(response.data.subscription)
                            that.interactions.isUpdate = false;
                            that.interactions.EditWorkdays = false;
                            that.workdays_changed = false;
                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {
                            console.log(error)
                            that.setLoading({is_loading: false, message: ''})

                        });
                }
            },

            confirmRemoveClientSubscription: function(subsId){
                let that = this

                    that.$swal({
                        title: 'Atenção',
                        text: 'Você tem certeza que deseja remover o plano e os agendamentos do cliente? Esta ação não poderã ser desfeita. Deseja continuar?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Remover',
                        confirmButtonColor: '#E14A45',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: '#00A369',
                        reverseButtons: true
                    }).then(function () {

                        that.removeClientSubscription(subsId)

                    }).catch(function () {
                    })

            },

            removeClientSubscription: function (subsId) {
                let that = this

                    that.$swal({
                        title: 'EXCLUIR',
                        text: 'Deseja realmente remover o plano e seus agendamentos?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sim, quero remover',
                        confirmButtonColor: '#E14A45',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: '#00A369',
                        reverseButtons: true
                    }).then(function () {

                        that.setLoading({is_loading: true, message: ''})

                        that.$http.post(`professional/company/subscription/destroy`, {subscription_id: subsId})
                            .then(function (response) {

                                let subs_index = _.findIndex(that.client.subscriptions, {id: subsId})

                                that.getClient();

                                that.interactions.isUpdate = false;
                                that.interactions.EditWorkdays = false;
                                that.workdays_changed = false;
                                $('#modal-add-new-plan').modal('hide');

                                that.setLoading({is_loading: false, message: ''})
                            })
                            .catch(function (error) {
                                console.log(error)
                                that.setLoading({is_loading: false, message: ''})
                            });

                    }).catch(function () {
                        that.interactions.isUpdate = false;
                        that.interactions.EditWorkdays = false;
                        that.workdays_changed = false;
                        that.toggleSelectedSubs(subsId)
                        that.getClient()
                    })

            },

            setNewExpiriration(){
                let that = this

                this.newSubscription.expire_at = moment(this.newSubscription.start_at, 'DD/MM/YYYY').add(this.selectedPlan.expiration, 'months').format('DD/MM/YYYY');
            },

            toggleSelectedSubs(subs) {
                const index = this.interactions.subsCardOpened.indexOf(subs.id);

                if(index > -1){
                    this.interactions.subsCardOpened.splice(index,1)
                } else {
                    this.interactions.subsCardOpened.push(subs.id)
                }
            },

            goToTab(tab){
                bus.$emit('go-to-tab', tab)
            }

        }
    }
</script>


<style scoped>

    .img-profile {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        object-fit: cover;
    }

    .line-item-group {
        margin: 5px 0;
        border: 1px solid RGBA(56, 57, 56, 0.15);
        padding: 5px;
        border-radius: 4px;
    }

    .selected-slot {
        background-color: #fff !important;
        color: #00A369 !important;
        border:1px solid #00A369 !important;
    }

    .selected-slot:hover {
        background-color: #fff !important;
        color: #00A369 !important;
        border:1px solid #00A369 !important;
    }

</style>
