<template>

   <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/invoice.png" alt="">
                <h3 class="f-300">Faturas</h3>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Alterar vencimento</h4>
                        </div>
                        <div class="card-body card-padding">

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="invoices-init">Vencimento de:</label>
                                        <datepicker
                                            id="invoices-init"
                                            input-class="form-control"
                                            v-model="init"
                                            language="pt-br"
                                            placeholder="Escolha a data do evento"
                                            format="dd/MM/yyyy"
                                        >
                                        </datepicker>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="invoices-end">Vencimento até:</label>
                                        <datepicker
                                            id="invoices-end"
                                            input-class="form-control"
                                            v-model="end"
                                            language="pt-br"
                                            placeholder="Escolha a data do evento"
                                            format="dd/MM/yyyy"
                                        >
                                        </datepicker>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-info btn-sm btn-block m-t-10" @click="getClientInvoices()">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       <div class="container">

           <div  class="row m-t-20 m-b-20" v-for="subs in client.subscriptions">
               <div class="col-md-12 full text-center cursor-pointer" v-if="!subs.invoices.length && subs.workdays.length">
                   <p> Você já pode gerar a fatura e agendamentos para o plano abaixo.</p>
                   <button class="btn btn-info btn-block" @click="generateNewInvoiceAndSchedule(subs)" :disabled="!subs.workdays.length">
                       Gerar fatura e próximas {{subs.plan.label}}{{subs.plan.quantity >1? 's': ''}} para <strong>{{subs.plan.name}}</strong>
                   </button>
               </div>
           </div>

           <div class="col-sm-12">

               <p v-if="!invoices.length">Nenhuma fatura localizada para o período informado.</p>

               <div class="text-center m-t-20 m-b-20">
                   <button class="btn btn-success btn-block" @click.prevent="addNewInvoice">Adicionar fatura</button>
               </div>

               <card-placeholder
                   v-if="placeholder"
                   :onlyHeader="true"
                   :onlyHeaderNoImage="true"
                   :onlyHeaderOpened="true"
                   :cols="'col-xs-12 col-sm-12'"
               >
               </card-placeholder>

               <div class="card" v-for="(invoice, indexInvoice) in invoices">
                    <div class="card-header ch-alt text-center">
                        <h4 class="f-300">{{invoice.subscription.client.full_name}}</h4>
                        <p>Vencimento: {{invoice.expire_at}}</p>
                        <span class="label label-success f-16 p-5 full" v-if="handleStatus(invoice) == 'confirmed'">Confirmada</span>
                        <span class="label label-danger f-16 p-5 full" v-if="handleStatus(invoice) == 'canceled'">Cancelada</span>
                        <span class="label label-warning f-16 p-5 full" v-if="handleStatus(invoice) == 'waiting'">Pendente</span>
                    </div>
                    <div class="card-body card-padding">


                           <div class="" >
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Plano:</strong>
                                   <small>{{invoice.subscription.plan.name}}</small>
                               </div>
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Valor:</strong>
                                   <small>{{invoice.value | formatCurrency}}</small>
                               </div>
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Vencimento:</strong>
                                   <small>{{invoice.expire_at}}</small>
                               </div>

                               <p><button class="btn btn-info btn-sm btn-block m-t-10" data-toggle="modal" data-target="#modal-edit-invoice" @click="invoiceSelectedIndex = indexInvoice">Alterar fatura</button></p>

                               <hr>

                               <h4 class="text-center">Alterar status</h4>
                               <div class="bg-color-gray text-center">
                                   <button class="btn btn-danger btn-xs" @click.prevent="cancelInvoice(invoice)" :disabled="invoice.is_canceled">Cancelar</button>
                                   <button class="btn btn-success btn-xs" @click.prevent="confirmInvoice(invoice)" :disabled="invoice.is_confirmed">Confirmar</button>
                                   <button class="btn btn-warning btn-xs" @click.prevent="cleanInvoiceStatus(invoice)" :disabled="!invoice.is_confirmed && !invoice.is_canceled">Pendente</button>
                               </div>


                               <div class="row m-t-20">

                                   <div class="col-md-12 col-xs-12">
                                       <h4 class="text-center">Histórico</h4>
                                       <button class="btn btn-block btn-default btn-sm"
                                               @click="invoiceHistorySelecteds.toggleSelected(invoice.id)" v-if="invoiceHistorySelecteds.indexOf(invoice.id) > -1"
                                       >Esconder historico</button>
                                       <button class="btn btn-block btn-default btn-sm"
                                               @click="invoiceHistorySelecteds.toggleSelected(invoice.id)" v-if="invoiceHistorySelecteds.indexOf(invoice.id) < 0"
                                       >Mostrar historico</button>

                                       <table class="table table-bordered table-hover table-striped m-t-10" v-if="invoiceHistorySelecteds.indexOf(invoice.id) > -1">
                                           <thead>
                                           <tr>
                                               <th>Nome</th>
                                               <th>Data</th>
                                               <th>Status</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                           <tr v-for="(history, indexHistory) in invoice.history">
                                               <td>{{history.full_name}}</td>
                                               <td>{{history.date}}</td>
                                               <td>{{history.label}}</td>
                                           </tr>
                                           </tbody>
                                       </table>
                                   </div>
                               </div>

                               <h4 class="text-center m-t-20">Agendamentos</h4>
                               <button class="btn btn-block btn-default btn-sm"
                                       @click="handleInvoiceSchedules(invoice.id, indexInvoice)" v-if="invoiceSchedulesSelecteds.indexOf(invoice.id) > -1"
                               >Esconder agendamentos</button>
                               <button class="btn btn-block btn-default btn-sm"
                                       @click="handleInvoiceSchedules(invoice.id, indexInvoice)" v-if="invoiceSchedulesSelecteds.indexOf(invoice.id) < 0"
                               >Mostrar agendamentos</button>

                               <div class="table-responsive m-t-10" v-if="invoiceSchedulesSelecteds.indexOf(invoice.id) > -1">
                                   <table class="table table-bordered table-hover table-striped">
                                       <thead>
                                       <tr>
                                           <th>#</th>
                                           <th>Data</th>
                                           <th>Horário</th>
                                           <th>Profissional</th>
                                           <th>Confirmado por</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr v-for="(skd, indexSkd) in invoice.schedules">
                                           <td>{{indexSkd + 1}}</td>
                                           <td>{{skd.date}}</td>
                                           <td>{{skd.time}}</td>
                                           <td>
                                               <span v-if="skd.professional">{{skd.professional.full_name}}</span>
                                               <span v-if="!skd.professional" class="text-center"> -- </span>
                                           </td>
                                           <td>{{skd.confirmed_by ? skd.confirmed_by : 'Não confirmado'}}</td>
                                       </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>

                           <button class="btn btn-danger btn-block m-t-20"
                                   @click.prevent="removeInvoice(invoice)"
                           >Excluir fatura
                           </button>

                    </div>

                </div>

               <div class="row">
                   <div class="col-sm-12" v-show="invoices.length">
                       <div class="text-center">
                           <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                       </div>
                   </div>
               </div>

            </div>

       </div>
       <!--Edit Invoice-->
       <div class="modal" id="modal-edit-invoice" tabindex="-1" role="dialog">
           <div class="modal-dialog" role="document">
               <div class="modal-content">
                   <div class="modal-header">
                       <h4 class="modal-title" id="myModalLabel">Editar fatura</h4>
                   </div>
                   <div class="modal-body" v-if="invoices.length">

                       <p>Atenção!</p>
                       <p>Você está alterando o vencimento e o valor desta fatura.</p>

                       <div class="form-group">
                           <label>Vencimento</label>
                           <input class="form-control" v-model="invoices[invoiceSelectedIndex].expire_at">
                       </div>

                       <div class="form-group">
                           <label>Valor</label>
                           <input 
                                class="form-control" 
                                type="tel" 
                                v-model="invoices[invoiceSelectedIndex].value" 
                                data-mask="0000.00" data-mask-reverse="true"
                                
                            >
                       </div>


                   </div>
                   <div class="modal-footer">
                       <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                       <button class="btn btn-info" data-dismiss="modal" @click="changeInvoiceValues()">Salvar</button>
                   </div>
               </div>
           </div>
       </div>
       <!--Edit Invoice-->

       <!-- New Invoice -->
       <div class="modal" id="modal-add-invoice" tabindex="-1" role="dialog">
           <div class="modal-dialog" role="document">
               <div class="modal-content">
                   <div class="modal-header">
                       <h4 class="modal-title" id="myModalLabel">Adicionar fatura</h4>
                   </div>
                   <div class="modal-body">

                       <div class="alert alert-info">
                           <strong>Atenção:</strong> Os novos agendamentos serão gerados a partir da nova data de início do plano e de acordo com a configuração dos horários definidos para este cliente.
                       </div>

                       <fieldset>
                           <legend>Plano</legend>
                           <div class="form-group">
                               <label>Selecione o plano</label>
                               <multiselect
                                   v-model="selectedSubscription"
                                   :options="client.subscriptions"
                                   :multiple="false"
                                   placeholder="Selecione o plano"
                                   :custom-label="customLabel"
                                   track-by="plan"
                                   selectLabel="Enter ou clique para selecionar"
                                   deselectLabel="Enter ou clique para desmarcar"
                                   selectedLabel="Selecionado"
                                   @input="setSubscription">

                               </multiselect>
                           </div>

                           <div class="form-group" v-show="selectedSubscription">
                               <label>Nova data de início</label>
                               <input class="form-control" v-model="subscription_dates.start_at" @blur="setSubscriptionExpiriration" placeholder="Nova data de início"
                                      v-mask="'##/##/####'">
                           </div>

                           <div class="form-group" v-show="selectedSubscription">
                               <label>Data do próximo vencimento</label>
                               <input class="form-control" v-model="subscription_dates.expire_at" disabled>
                           </div>

                       </fieldset>

                       <fieldset v-show="selectedSubscription">
                           <legend>Dados da fatura</legend>
                           <div class="form-group">
                               <label>Vencimento da fatura</label>
                               <input class="form-control" v-model="newInvoice.expire_at" v-mask="'##/##/####'">
                           </div>

                           <div class="form-group">
                               <label>Valor</label>
                               <input 
                                  class="form-control" 
                                  type="tel" 
                                  v-model="newInvoice.value" 
                                  data-mask="0000.00" 
                                  data-mask-reverse="true"
                                  @input="setValueToFormat()"
                                >
                           </div>
                       </fieldset>

                       <fieldset class="table-responsive">
                           <legend>Agendamentos</legend>
                           <table class="table table-bordered table-hover table-striped" v-if="selectedSubscription && newInvoice.schedules.length">
                               <thead>
                               <tr>
                                   <th class="text-center">#</th>
                                   <th>Dia da semana</th>
                                   <th>Data</th>
                                   <th>Horário</th>
                                   <th>Profissional</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr v-for="(skd, indexSkd) in newInvoice.schedules">
                                   <td class="text-center"><strong>{{indexSkd+1}}</strong></td>
                                   <td>{{skd.date | momentwpfrom('DD/MM/YYYY', 'dddd')}}</td>
                                   <td>{{skd.date}}</td>
                                   <td>{{skd.time}}</td>
                                   <td>{{handleScheduleProfessional(skd.professional_id)}}</td>
                               </tr>
                               </tbody>
                           </table>
                       </fieldset>

                   </div>
                   <div class="modal-footer">
                       <button class="btn btn-default" @click.prevent="cancelAddInvoice">Cancelar</button>
                       <button class="btn btn-info" :disabled="!newInvoice.value || !newInvoice.expire_at" @click.prevent="confirmAddInvoice">Adicionar fatura</button>
                   </div>
               </div>
           </div>
       </div>
       <!-- New Invoice -->

   </div>

</template>

<script>
    import moment from 'moment'
    import Datepicker from 'vuejs-datepicker'
    import Multiselect from 'vue-multiselect'
    import {mapGetters, mapActions} from 'vuex'
    import {cleanInvoice} from '@/models/Invoice'
    import {cleanSchedule} from '@/models/Schedule'

    export default{
        name: 'company-client-invoices',
        components: {
            Datepicker,
            pagination: require('@/components/pagination.vue'),
            Multiselect,
            cardPlaceholder: require('@/components/card-placeholder.vue')
        },
        props: ['client'],
        data(){
        	return {
                init: moment().startOf('month').toDate(),
                end: moment().add(1, 'months').startOf('month').toDate(),
                placeholder: true,
                invoices:[],
                pagination: {},
                invoiceHistorySelecteds: [],
                invoiceSchedulesSelecteds: [],
                invoiceSelectedIndex: 0,
                newInvoice: cleanInvoice(),
                newSchedule: cleanSchedule(),
                subscription_dates:{
                    start_at: '',
                    expire_at: ''
                },
                selectedSubscription: null,
                selectedPlan: null,
        	}
        },
        computed: {
            ...mapGetters(['currentUser', 'currentCompany']),
        },
        mounted: function(){
            let that = this
            that.getClientInvoices()
        },
        methods: {
            ...mapActions(['setLoading']),

            setValueToFormat: function(){
                let that = this
                
                newInvoice.value = accounting.unformat(newInvoice.value)
                newInvoice.value = (newInvoice.value / 100).toFixed(2);

            },

            getClientInvoices() {
                let that = this

                var data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.$route.params.client_id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }

                that.placeholder = true;

                that.$http.post(`professional/company/invoice/client_list`, data)
                    .then(function (response) {
                        that.invoiceSchedulesSelecteds = []
                        response.data.invoices.map((invoice)=> {invoice.schedules = []})

                        that.invoices = response.data.invoices
                        that.pagination = response.data.pagination
                        that.placeholder = false;
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.placeholder = false;
                    });
            },

            navigate(page) {
                let that = this
                var data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.$route.params.client_id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    page: page
                }

                that.placeholder = true;
                that.$http.post('professional/company/invoice/client_list', data)
                    .then(function (response) {
                        that.invoiceSchedulesSelecteds = []
                        response.data.invoices.map((invoice)=> {invoice.schedules = []})

                        that.invoices = response.data.invoices
                        that.pagination = response.data.pagination
                        that.placeholder = false;

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.placeholder = false;
                    });
            },

            handleStatus(invoice){
                if (invoice.is_canceled) {
                    return 'canceled'
                }

                if (invoice.is_confirmed) {
                    return 'confirmed'
                }

                if (!invoice.is_confirmed && !invoice.is_canceled) {
                    return 'waiting'
                }
            },

            handleInvoiceSchedules(invoice_id, invoice_index){
                let that = this

                that.invoiceSchedulesSelecteds.toggleSelected(invoice_id)

                if(that.invoiceSchedulesSelecteds.indexOf(invoice_id) > -1){

                    that.setLoading({is_loading: true, message: ''})

                    that.$http.get(`professional/company/invoice/schedules/${invoice_id}`)
                        .then(function (response) {
                            that.invoices[invoice_index].schedules = response.data.schedules
                            that.setLoading({is_loading: false, message: ''})
                        })
                        .catch(function (error) {
                            console.log(error)
                            that.setLoading({is_loading: false, message: ''})
                        });
                }else{
                    that.invoices[invoice_index].schedules = []
                }

            },

            changeInvoiceValues: function(){
                let that = this

                var data = {
                    full_name: that.currentUser.full_name,
                    action: 'change',
                    label: 'Alterou data ou valores',
                    date: moment().format('DD/MM/YYYY HH:mm:ss')
                }

                that.invoices[that.invoiceSelectedIndex].history.push(data);

                that.updateInvoice(that.invoices[that.invoiceSelectedIndex])

            },

            updateInvoice: function(invoice){
                let that = this

                that.$http.post(`professional/company/invoice/update`, invoice)
                    .then(function (response) {
                        successNotify('', 'Fatura atualizada com sucesso.');
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            confirmInvoice: function(invoice){
                let that = this

                invoice.is_canceled = false;
                invoice.cancelet_at = '';
                invoice.is_confirmed = true;
                invoice.confirmed_at = moment().format('YYYY-MM-DD HH:mm:ss');
                var data = {
                    full_name: that.currentUser.full_name,
                    action: 'confirm',
                    label: 'Confirmou',
                    date: moment().format('DD/MM/YYYY HH:mm:ss')
                }

                invoice.history.push(data);

                that.updateInvoice(invoice);
            },

            cancelInvoice: function(invoice){
                let that = this

                invoice.is_canceled = true;
                invoice.cancelet_at = moment().format('YYYY-MM-DD HH:mm:ss');
                invoice.is_confirmed = false;
                invoice.confirmed_at = moment().format('YYYY-MM-DD HH:mm:ss');
                var data = {
                    full_name: that.currentUser.full_name,
                    action: 'cancel',
                    label: 'Cancelou',
                    date: moment().format('DD/MM/YYYY HH:mm:ss')
                }

                invoice.history.push(data);

                that.updateInvoice(invoice);
            },

            cleanInvoiceStatus: function(invoice){
                let that = this

                invoice.is_canceled = false;
                invoice.cancelet_at = '';
                invoice.is_confirmed = false;
                invoice.confirmed_at = '';
                var data = {
                    full_name: that.currentUser.full_name,
                    action: 'clean',
                    label: 'Limpou',
                    date: moment().format('DD/MM/YYYY HH:mm:ss')
                }

                invoice.history.push(data);

                that.updateInvoice(invoice);
            },

            generateNewInvoiceAndSchedule: function (subs, save = true) {
                let that = this

                if(!subs.workdays.length){
                    that.$swal('', 'Você deve configurar os horários do cliente antes de gerar a fatura e os agendamentos.', 'info')
                    return false
                }

                that.newInvoice.company_id = that.$route.params.company_id
                that.newInvoice.subscription_id = subs.id
                that.newInvoice.value = subs.plan.value
                that.newInvoice.expire_at = subs.expire_at

                subs.workdays = _.orderBy(subs.workdays, ['dow', 'init'], ['asc', 'asc']);

                var start = moment(subs.start_at, 'DD/MM/YYYY');
                var end = moment(subs.expire_at, 'DD/MM/YYYY');

                that.newInvoice.schedules = [];

                //Limiteded schedules quantity
                if(subs.plan.limit_quantity){
                    for (start; that.newInvoice.schedules.length < subs.quantity; start.add(1, 'days')) {
                        let dow_index = _.findIndex(subs.workdays, {dow: start.day()})

                        if (dow_index > -1 && subs.workdays[dow_index].dow == start.day()) {

                            that.newSchedule.date = start.format('DD/MM/YYYY')
                            that.newSchedule.time = subs.workdays[dow_index].init
                            that.newSchedule.category_id = subs.plan.category_id
                            that.newSchedule.professional_id = subs.workdays[dow_index].professional_id
                            that.newSchedule.subscription_id = subs.id
                            that.newSchedule.company_id = subs.company_id
                            that.newInvoice.schedules.push(JSON.parse(JSON.stringify(that.newSchedule)));

                        }

                    }
                }

                //Schedules by period
                if(!subs.plan.limit_quantity){
                    for (start; start <= end; start.add(1, 'days')) {
                        let dow_index = _.findIndex(subs.workdays, {dow: start.day()})

                        if (dow_index > -1 && subs.workdays[dow_index].dow == start.day()) {
                            that.newSchedule.date = start.format('DD/MM/YYYY')
                            that.newSchedule.time = subs.workdays[dow_index].init
                            that.newSchedule.category_id = subs.plan.category_id
                            that.newSchedule.professional_id = subs.workdays[dow_index].professional_id
                            that.newSchedule.subscription_id = subs.id
                            that.newSchedule.company_id = subs.company_id
                            that.newInvoice.schedules.push(JSON.parse(JSON.stringify(that.newSchedule)));

                        }

                    }
                }

                if(save){
                    that.storeInvoice()
                }
            },

            storeInvoice () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('professional/company/invoice/store', that.newInvoice)
                    .then(function (response) {

                        response.data.invoice.schedules = []

                        that.invoices.unshift(response.data.invoice)

                        let subs = _.find(that.client.subscriptions, {id: that.newInvoice.subscription_id})

                        if (subs) {
                            subs.invoices.push(response.data.invoice)
                        }

                        that.workdays_changed = false

                        successNotify('', 'Fatura e agendamentos adicionados com sucesso.')

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)

                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            removeInvoice(currentInvoice){
                let that = this

                that.$swal({
                    title: 'Atenção',
                    text: 'Você tem certeza que deseja excluir esta fatura e todos os agendamentos? Esta ação não poderá ser desfeita. Deseja continuar?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Remover',
                    confirmButtonColor: '#E14A45',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#00A369',
                    reverseButtons: true
                }).then(function () {
                    that.$swal({
                        title: 'EXCLUIR',
                        text: 'Deseja excluir esta fatura e todos os agendamentos?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sim, quero excluir',
                        confirmButtonColor: '#E14A45',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: '#00A369',
                        reverseButtons: true
                    }).then(function () {

                        that.setLoading({is_loading: true, message: ''})

                        that.$http.post('professional/company/invoice/destroy', {company_id: that.$route.params.company_id, invoice_id: currentInvoice.id})
                            .then(function (response) {

                                let subs_index = _.findIndex(that.client.subscriptions,{id: currentInvoice.subscription_id} )

                                if(subs_index > -1){

                                    let invoice_index = _.findIndex(that.client.subscriptions[subs_index].invoices,{id: currentInvoice.id} )

                                    that.client.subscriptions[subs_index].invoices.splice(invoice_index, 1)
                                }

                                that.invoices = that.invoices.filter((invoice) => invoice.id != currentInvoice.id)

                                successNotify('', 'Fatura removida com sucesso.')

                                that.setLoading({is_loading: false, message: ''})

                            })
                            .catch(function (error) {
                                console.log(error)
                                that.setLoading({is_loading: false, message: ''})
                            });

                    }).catch(function () {

                    })

                }).catch(function () {
                })
            },

            addNewInvoice(){


                $('#modal-add-invoice').modal('show')
            },


            customLabel (option) {
                if(!_.isEmpty(option)){
                    return option.plan.name
                }
            },

            setSubscriptionExpiriration(){
                let that = this

                that.subscription_dates.expire_at = moment(that.subscription_dates.start_at, 'DD/MM/YYYY').add(that.selectedPlan.expiration, 'months').format('DD/MM/YYYY');

                that.selectedSubscription.start_at =  that.subscription_dates.start_at
                that.selectedSubscription.expire_at =  that.subscription_dates.expire_at

                that.generateNewInvoiceAndSchedule(that.selectedSubscription, false)
            },

            setSubscription(subs) {
                let that = this

                that.selectedSubscription = _.cloneDeep(subs)

                that.selectedPlan = that.selectedSubscription.plan

                that.subscription_dates.start_at = moment(subs.expire_at, 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY');
                that.subscription_dates.expire_at = moment(that.subscription_dates.start_at, 'DD/MM/YYYY').add(that.selectedPlan.expiration, 'months').format('DD/MM/YYYY');

                that.selectedSubscription.start_at = that.subscription_dates.start_at
                that.selectedSubscription.expire_at = that.subscription_dates.expire_at


                that.generateNewInvoiceAndSchedule(that.selectedSubscription, false)
            },

            handleScheduleProfessional(professional_id) {
                let professional = _.find(this.currentCompany.professionals, {id: professional_id})
                if(professional){
                    return professional.full_name
                }
            },

            confirmAddInvoice(){
                let that = this
                that.$swal({
                    title: 'Atenção',
                    text: 'Todos os dados da nova fatura estão corretos? Deseja adicionar a nova fatura?',
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, adicionar fatura',
                    confirmButtonColor: '#00A369',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {
                    $('#modal-add-invoice').modal('hide')
                    that.storeNewInvoice()

                }).catch(function () {

                })
            },

            cancelAddInvoice(){
                let that = this
                that.newInvoice = cleanInvoice()
                that.selectedSubscription = null
                $('#modal-add-invoice').modal('hide')
            },

            storeNewInvoice () {
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('professional/company/invoice/store', that.newInvoice)
                    .then(function (response) {
                        that.updateClientSubscription(that.selectedSubscription)

                        successNotify('', 'Nova fatura adcionada com sucesso.')

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)

                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            updateClientSubscription: function (subs) {
                let that = this

                that.setLoading({is_loading: true, message: ''})
                that.$http.post(`professional/company/subscription/update`, subs)
                    .then(function (response) {

                        let subs_index = _.findIndex(that.client.subscriptions, {id: subs.id})
                        that.client.subscriptions.splice(subs_index, 1)
                        that.client.subscriptions.splice(subs_index, 0, response.data.subscription)

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})

                    });
            },
        }
    }
</script>
