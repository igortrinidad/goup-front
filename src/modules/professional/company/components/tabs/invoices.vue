<template>

   	<div class="">
   		<div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/invoice.png" alt="">
                <h3 class="f-300">Faturas de clientes</h3>
            </div>

            <div class="alert alert-info text-center">
                Controle o vencimento das faturas de seus clientes aqui.
            </div>
        </div>

        <div class="container">

            <div class="row m-t-10" v-if="isCompanyAdmin(currentCompany.id)">
                <div class="col-sm-12">
                    <router-link :to="{name: 'admin.companies.invoices.insights', params: {company_id: $route.params.company_id}}" class="btn f-20 btn-light btn-block f-300" name="button">
                        <span><i class="ion-stats-bars m-r-5"></i>Ver Insights</span>
                    </router-link>
                </div>
            </div>

            <div class="col-sm-12 text-center" v-if="!isCompanyAdmin(currentCompany.id)">
                <div class="box d-block">
                    <p class="m-t-10">Você <b>não</b> tem permissão para acessar este recurso.</p>
                </div>
            </div>

            <div class="row m-t-30" v-if="isCompanyAdmin(currentCompany.id)">

                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Pesquisar</h4>
                        </div>
                        <div class="card-body card-padding">
                            <div class="form-group">
                                <label>Nome do cliente ou email</label>
                                <input type="text" class="form-control" v-model="search" placeholder="Procure pelo nome ou e-mail do cliente" @keyup.enter="getInvoices">
                            </div>
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
                                <button class="btn btn-info btn-sm btn-block m-t-10" @click="getInvoices()">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row" v-if="isCompanyAdmin(currentCompany.id)">

                <div class="col-sm-12">

                    <p v-if="!invoices.length">Nenhuma fatura disponível</p>


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
                                                <th class="text-center" width="10%">Alterar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(skd, indexSkd) in invoice.schedules">
                                                <td>{{indexSkd + 1}}</td>
                                                <td>{{skd.date}}</td>
                                                <td>{{skd.time}}</td>
                                                <td>{{skd.professional.full_name}}</td>
                                                <td>{{skd.confirmed_by ? skd.confirmed_by : 'Não confirmado'}}</td>
                                                <td class="text-center" width="10%">
                                                    <button class="btn btn-info btn-xs" @click.prevent="setScheduleToupdate(skd, indexSkd, indexInvoice)"  >Alterar</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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

        </div>


        <!-- EDIT SCHEDULE -->
        <div class="modal" id="modal-edit-schedule" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Editar agendamento {{oldSchedule.date}} {{oldSchedule.time}}</h4>
                    </div>
                    <div class="modal-body">
                        <p><strong>Selecione a nova data para o agendamento</strong></p>


                        <div class="form-group">
                            <label>Data</label>
                            <datepicker input-class="form-control" :language="'pt-br'"
                                        :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                        v-model="scheduleToUpdate.date" @selected="searchProfessionalForDate"></datepicker>
                        </div>

                        <div class="form-group" v-if="newDateSelected">
                            <label>Profissional</label>
                            <multiselect
                                v-model="selectedProfessional"
                                :options="slot_workdays"
                                :multiple="false"
                                placeholder="Selecione o profissional para o agendamento"
                                :custom-label="customLabel"
                                track-by="professional"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desmarcar"
                                selectedLabel="Selecionado"
                                @input="setProfessional">

                            </multiselect>
                        </div>

                        <div class="form-group" v-if="professionalSelected">
                            <label>Selecione o horário</label>

                            <span v-if="!selectedProfessional.slots.length">Este profissional não possui horários para o dia selecionado.</span>
                            <span v-if="selectedProfessional.slots.length">Horários disponíveis</span><br>

                            <button class="btn btn-success btn-block btn-sm m-b-10" @click.prevent="setSelectedSlot(slot)"
                                    :class="{'selected-slot': selectedSlot === slot}"
                                    v-for="slot in selectedProfessional.slots">
                                <span >{{slot.init}}</span>
                            </button>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" @click.prevente="cancelUpdateSchedule">Cancelar</button>

                        <button class="btn btn-info" @click.prevent="updateSchedule">Atualizar agendamento</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- EDIT SCHEDULE -->

        <!-- EDIT SCHEDULE -->
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
                            <input class="form-control" type="tel" v-model="invoices[invoiceSelectedIndex].value" data-mask="0000.00" data-mask-reverse="true">
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="changeInvoiceValues()">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- EDIT SCHEDULE -->

   	</div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import moment from 'moment'
    import {cleanInvoice} from '@/models/Invoice'
    import Datepicker from 'vuejs-datepicker'
    import Multiselect from 'vue-multiselect'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'company-control-tab',
        components: {
            Datepicker,
            pagination: require('@/components/pagination.vue'),
            Multiselect,
            cardPlaceholder
        },
        data() {
            return {
                search: '',
                init: moment().startOf('month').toDate(),
                end: moment().add(1, 'months').startOf('month').toDate(),
                invoiceSelectedIndex: 0,
                invoices: [],
                pagination: {},
                invoiceSchedulesSelecteds: [],
                invoiceHistorySelecteds: [],
                oldSchedule: {},
                scheduleToUpdate: {},
                professionals_calendar_settings: [],
                slot_workdays:[],
                selectedProfessional: {},
                newDateSelected: false,
                professionalSelected: false,
                selectedSlot:{},
                selected_schedule_index: '',
                selected_invoice_index: '',
                placeholder: true
            }
        },

        computed:{
            ...mapGetters(['currentUser', 'currentCompany', 'isCompanyAdmin']),
        },
        mounted(){
            if(this.isCompanyAdmin(this.currentCompany.id)){
                this.getInvoices();
            }
        },
        methods: {

            getInvoices() {
                let that = this

                var data = {
                    company_id: that.currentCompany.id,
                    search: that.search,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }

                that.placeholder = true;

                that.$http.post(`professional/company/invoice/list`, data)
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
                    company_id: that.currentCompany.id,
                    search: that.search,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    page: page
                }

                that.placeholder = true;
                that.$http.post('professional/company/invoice/list', data)
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

            handleInvoiceSchedules(invoice_id, invoice_index){
                let that = this

                that.invoiceSchedulesSelecteds.toggleSelected(invoice_id)

                if(that.invoiceSchedulesSelecteds.indexOf(invoice_id) > -1){

                    that.$http.get(`professional/company/invoice/schedules/${invoice_id}`)
                        .then(function (response) {
                           that.invoices[invoice_index].schedules = response.data.schedules
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }else{
                    that.invoices[invoice_index].schedules = []
                }

            },

            setScheduleToupdate(schedule,schedule_index, invoice_index) {

                let that = this
                that.selected_schedule_index = schedule_index

                that.selected_invoice_index = invoice_index

                that.oldSchedule = _.cloneDeep(schedule)
                that.scheduleToUpdate = _.cloneDeep(schedule)

                that.scheduleToUpdate.date = moment(that.scheduleToUpdate.date, 'DD/MM/YYYY').toDate()

                $('#modal-edit-schedule').modal('show')
            },

            searchProfessionalForDate(selected){
                let that = this

                that.selectedProfessional = {}
                that.newDateSelected = false
                that.professionalSelected = false
                that.selectedSlot = {}

                let date = moment(selected)

                that.scheduleToUpdate.date = moment(that.scheduleToUpdate.date, 'DD/MM/YYYY').toDate()

                this.newDateSelected = true;

                let data = {
                    company_id: this.scheduleToUpdate.company_id,
                    category_id: this.scheduleToUpdate.category_id,
                    date: date.format('YYYY-MM-DD')
                }

                this.getProfessionalCalendarSettings(data, date.day())
            },



            getProfessionalCalendarSettings(data, dow){
                let that = this

                that.$http.post('professional/company/professional/calendar_settings/to_reschedule',data)
                    .then(function (response) {
                        that.professionals_calendar_settings = response.data.professional_calendar_settings

                        that.handleProfessionalsAvaiableWorkdays(dow)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleProfessionalsAvaiableWorkdays(dow) {

                let that = this
                this.slot_workdays = []

                this.professionals_calendar_settings.map((calendar_settings) => {

                    let day_slots = []

                    calendar_settings.workdays.map((workday) => {
                        if (workday.dow === dow) {
                            workday.professional_id = calendar_settings.professional.id

                            day_slots.push(workday)
                        }
                    })

                    that.slot_workdays.push({
                        professional: calendar_settings.professional,
                        slots: day_slots
                    })

                })
            },

            customLabel (option) {
                if(!_.isEmpty(option)){
                    return option.professional.full_name
                }
            },

            setProfessional(){
                this.scheduleToUpdate.professional = this.selectedProfessional.id
                this.professionalSelected = true
            },

            setSelectedSlot(slot){
                let that = this

                that.selectedSlot = slot

                this.scheduleToUpdate.time = slot.init

            },

            updateSchedule(){
                let that = this

                that.scheduleToUpdate.date = moment(that.scheduleToUpdate.date).format('DD/MM/YYYY')

                that.$http.post('professional/company/schedule/reschedule', that.scheduleToUpdate)
                    .then(function (response) {

                        that.invoices[that.selected_invoice_index]
                            .schedules.splice(that.selected_schedule_index,1, response.data.schedule)

                        successNotify('', 'Agendamento atualizado com sucesso.')

                        that.cancelUpdateSchedule()

                        $('#modal-edit-schedule').modal('hide')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            cancelUpdateSchedule() {
                let that = this

                that.scheduleToUpdate = {}
                that.selectedProfessional = {}
                that.newDateSelected = false
                that.professionalSelected = false
                that.selectedSlot = {}
                that.selected_invoice_index = ''
                that.selected_schedule_index = ''

            },

        }
    }
</script>

<style scoped>

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
