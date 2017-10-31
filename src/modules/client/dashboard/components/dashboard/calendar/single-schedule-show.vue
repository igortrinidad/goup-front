<template>
    <div class="m-t-30">
        <div class="first-container">

            <main-header
                :type="'center'"
                :title="'Agendamento avulso'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

            <!-- Actions -->
            <div class="container" v-if="!placeholder.client && !placeholder.professional && !placeholder.category">
                <h3 class="f-300 text-center m-t-0 m-b-30">Ações</h3>

                <div class="card">
                    <div class="card-body card-padding p-b-5 text-center">

                        <div class="row">
                            <button type="button" class="btn btn-xs p-5 p-l-10 p-r-10 m-r-5 m-b-5 btn-info"
                                    @click.prevent="reschedule(single_schedule)"
                                    :disabled="single_schedule.is_rescheduled || single_schedule.is_confirmed || single_schedule.is_canceled || cannotReschedule()">
                                Remarcar
                            </button>
                            <button type="button" class="btn btn-xs p-5 p-l-10 p-r-10 m-r-5 m-b-5 btn-danger"
                                    @click.prevent="cancelSchedule(single_schedule)"
                                    :disabled="single_schedule.is_rescheduled || single_schedule.is_confirmed || single_schedule.is_canceled || cannotCancel()">
                                Cancelar
                            </button>
                        </div>
                        <span class="row m-t-20">
                            <p>Este agendamento somente poderá ser <span class="c-blue">remarcado</span> até <b>{{maxRescheduleTime().format('DD/MM/YYYY HH:mm:ss')}}</b>.</p>
                            <p>Este agendamento somente poderá ser <span class="c-red">cancelado</span> até <b>{{maxCancelTime().format('DD/MM/YYYY HH:mm:ss')}}</b>.</p>
                        </span>
                    </div>
                </div>
            </div>
            <!-- / Actions -->

            <!-- Client Infos -->
            <div class="container">
                <h3 class="f-300 text-center m-t-0 m-b-30">Empresa</h3>

                <card-placeholder v-if="placeholder.client" :circleImage="true" :small="true">
                </card-placeholder>

                <div class="card" v-if="!placeholder.client">
                    <div class="card-header ch-alt text-center">
                        <div class="picture-circle picture-circle-xs" :style="`background-image:url('${ single_schedule.company.avatar }')`"></div>
                        <h4 class="f-300 m-b-10">{{ single_schedule.company.name }}</h4>
                        <span class="f-300">{{ single_schedule.company.email ? single_schedule.company.email : 'E-mail não informado' }}</span>
                    </div>
                    <div class="card-body card-padding text-center">

                        <div class="row row-client-content">
                            <div class="col-md-6 col-xs-6">
                                <div class="border-inside-card">
                                    <span class="f-300 f-12">Status</span>
                                    <br>
                                    <span v-if="single_schedule.is_fake" class="label label-info f-16 p-5 f-300 m-t-5">
                                        Bloqueado
                                    </span>
                                    <span v-if="!single_schedule.is_confirmed && !single_schedule.is_canceled && !single_schedule.is_fake" class="label label-default f-16 p-5 p-l-10 p-r-10 f-400 m-t-5">
                                        Aguardando
                                    </span>
                                    <span v-if="single_schedule.is_confirmed && !single_schedule.is_canceled && !single_schedule.is_fake" class="label label-success f-16 p-5 p-l-10 p-r-10 f-400 m-t-5">
                                        Confirmado
                                    </span>
                                    <span v-if="!single_schedule.is_confirmed && single_schedule.is_canceled && !single_schedule.is_fake" class="label label-danger f-16 p-5 p-l-10 p-r-10 f-400 m-t-5">
                                        Cancelado
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="border-inside-card">
                                    <span class="f-300 f-12">Remarcado</span>
                                    <h4 class="m-t-5 m-b-0">
                                       {{single_schedule.is_rescheduled | handleTrueFalse}}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="row row-client-content">
                            <div class="col-md-6 col-xs-6">
                                <div class="border-inside-card">
                                    <span class="f-300 f-12">Data</span>
                                    <h4 class="m-t-5 m-b-0">{{single_schedule.date}}</h4>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="border-inside-card">
                                    <span class="f-300 f-12">Horário</span>
                                    <h4 class="m-t-5 m-b-0">{{single_schedule.time}}</h4>
                                </div>
                            </div>
                        </div>

                        <div class="row row-client-content">
                            <div class="col-md-6 col-xs-6">
                                <div class="border-inside-card">
                                    <span class="f-300 f-12">Aula experimental?</span>
                                    <h4>{{single_schedule.is_trial | handleTrueFalse}}</h4>
                                </div>
                            </div>
                        </div>

                        <!-- Helper Messagem To Alert Confirmed -->
                        <div class="row m-t-20" v-if="single_schedule.is_confirmed">
                            <span class="f-300 m-t-30 f-success">
                                Este agendamento foi confirmado por <strong>{{ single_schedule.confirmed_by }}</strong>
                                em: <strong>{{ single_schedule.confirmed_at | moment('DD/MM/YYYY') }}</strong>
                                às: <strong>{{ single_schedule.confirmed_at | moment('HH:mm:ss') }}</strong>
                            </span>
                        </div>
                        <!-- / Helper Messagem To Alert Confirmed -->

                        <!-- Helper Messagem To Alert Reschedule -->
                        <div class="m-t-20" v-if="single_schedule.is_rescheduled">
                            <span class="f-300 m-t-30 f-info">

                                Este agendamento foi remarcado por <strong>{{ single_schedule.reschedule_by }}</strong>

                                em: <strong>{{ single_schedule.reschedule_at | moment('DD/MM/YYYY') }}</strong>
                                às: <strong>{{ single_schedule.reschedule_at | moment('HH:mm:ss') }}</strong>
                            </span>
                        </div>
                        <!-- / Helper Messagem To Alert Reschedule -->

                        <!-- Helper Messagem To Alert Cancel -->
                        <div class="m-t-10" v-if="single_schedule.is_canceled">
                            <span class="f-300 m-t-30 f-danger">
                                Este agendamento foi cancelado por {{ single_schedule.canceled_by }}
                                em: <strong>{{ single_schedule.canceled_at | moment('DD/MM/YYYY') }}</strong>
                                às: <strong>{{ single_schedule.canceled_at | moment('DD:mm:ss') }}</strong>
                            </span>
                        </div>
                        <!-- / Helper Messagem To Alert Cancel -->
                    </div>
                </div>
            </div>
            <!-- / Client Infos -->

            <!-- Category Infos -->
            <div class="container">
                <h3 class="f-300 text-center m-t-0 m-b-30">Especialidade</h3>

                <card-placeholder v-if="placeholder.category" :circleImage="true" :onlyHeader="true">
                </card-placeholder>

                <div class="card" v-if="!placeholder.category">
                    <div class="card-header ch-alt text-center">
                        <div class="picture-circle picture-circle-xs" :style="`background-image:url('${ single_schedule.category.avatar }')`"></div>
                        <h4 class="f-300 m-b-0">{{ single_schedule.category.name }}</h4>
                    </div>
                </div>
            </div>
            <!-- / Category Infos -->

            <!-- Professional Infos -->
            <div class="container" v-if="single_schedule.professional">
                <h3 class="f-300 text-center m-t-0 m-b-30">Profissional</h3>

                <card-placeholder v-if="placeholder.professional" :circleImage="true" :onlyHeader="true">
                </card-placeholder>

                <div class="card" v-if="!placeholder.professional">
                    <div class="card-header ch-alt text-center">
                        <div class="picture-circle picture-circle-xs" :style="`background-image:url('${ single_schedule.professional.avatar }')`"></div>
                        <h4 class="f-300 m-b-0">{{ single_schedule.professional.full_name }}</h4>
                        <span class="f-300">{{ single_schedule.professional.email }}</span>
                    </div>
                </div>
            </div>
            <!-- / Professional Infos -->

        </div>

        <!--Modal Calendar-->
        <div class="modal" id="modal-calendar" tabindex="-1" role="dialog" v-if="interactions.rescheduler">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click.prevent="cancelReschedule">
                            <span aria-hidden="true"><i class="fa fa-times"></i></span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Agenda</h4>
                    </div>
                    <div class="modal-body">
                        <p>Selecione o novo dia para remarcar o agendamento do dia <strong>{{old_schedule_data.date}}</strong></p>

                        <div class="alert alert-info"><strong>Atenção:</strong> você pode remarcar um agendamento apenas uma vez, caso necessite remarcar novamente entre em contato com o profissional ou empresa.</div>

                        <calendar @slot-selected="handleSlotDay" :schedules.sync="schedules"
                                  @month-changed="getSchedules"></calendar>
                    </div>
                    <div class="modal-footer borderless">
                        <button class="btn btn-default" data-dismiss="modal" @click.prevent="cancelReschedule">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Calendar-->

        <!--Modal Reschedule-->
        <div class="modal" id="modal-reschedule" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click.prevent="cancelReschedule">
                            <span aria-hidden="true"><i class="fa fa-times"></i></span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Selecionar horário para {{reschedule_data.date}}</h4>
                    </div>
                    <div class="modal-body">
                        <fieldset>
                            <div v-for="workday in slot_workdays">
                                <div class="col-sm-6">
                                    <div v-if="workday.professional">
                                        <h3> {{workday.professional.full_name}}</h3>

                                        <span v-if="!workday.slots.length">Este profissional não possui horários para o dia selecionado.</span>
                                        <span v-if="workday.slots.length">Horários disponíveis</span><br>

                                        <button class="btn btn-block btn-sm m-b-10" @click.prevent="setSelectedSlot(slot, workday.professional.id)"
                                                :disabled="handleSameSlot(slot, workday.professional.id)"
                                                :class="{'selected-slot': selectedSlot === slot, 'btn-danger': slot.is_unavaiable, 'btn-success': !slot.is_unavaiable}"
                                                v-for="slot in workday.slots">
                                            <span v-if="!handleSameSlot(slot, workday.professional.id)">{{slot.init}} <span class="badge pull-right">{{slot.schedules.length}}</span></span>
                                            <span v-if="handleSameSlot(slot, workday.professional.id)">Horário atual ({{slot.init}}) <span class="badge pull-right">{{slot.schedules.length}}</span></span>
                                        </button>
                                    </div>

                                    <div v-if="workday.category">
                                        <h3> {{workday.category.name}}</h3>

                                        <span v-if="!workday.slots.length">Este profissional não possui horários para o dia selecionado.</span>
                                        <span v-if="workday.slots.length">Horários disponíveis</span><br>

                                        <button class="btn btn-block btn-sm m-b-10" @click.prevent="setSelectedSlot(slot, null)"
                                                :disabled="handleSameSlotCategory(slot, workday.category.id)"
                                                :class="{'selected-slot': selectedSlot === slot, 'btn-danger': slot.is_unavaiable, 'btn-success': !slot.is_unavaiable}"
                                                v-for="slot in workday.slots">
                                            <span v-if="!handleSameSlotCategory(slot, workday.category.id)">{{slot.init}} <span class="badge pull-right">{{slot.schedules.length}}</span></span>
                                            <span v-if="handleSameSlotCategory(slot, workday.category.id)">Horário atual ({{slot.init}}) <span class="badge pull-right">{{slot.schedules.length}}</span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" @click.prevent="cancelReschedule">Fechar</button>
                        <button class="btn btn-info" @click.prevent="saveReschedule" :disabled="!selectedSlot">Remarcar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal Reschedule-->
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder  from '@/components/card-placeholder.vue'

    import {cleanSingleSchedule} from '@/models/SingleSchedule'

    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)
    import calendar from '@/components/calendar.vue'

    export default {
        name: 'admin-companies-calendar-show-trial-schedule',
        components: {
            mainHeader,
            cardPlaceholder,
            calendar
        },
        data() {
            return {
                single_schedule: cleanSingleSchedule(),
                placeholder: {
                    client: true,
                    professional: true,
                    category: true,
                },
                interactions: {
                    rescheduler: false
                },
                old_schedule_data: {},
                reschedule_data: {},
                schedules: [],
                selectedSlot: null,
                slot_workdays: []
            }
        },

        computed: {
            // ...mapGetters(),
        },

        mounted() {
            this.getSingleSchedule()
        },

        methods: {

            ...mapActions(['addOnClientMonthSchedules','addOnClientSelectedDaySchedules', 'removeFromClientMonthSchedules', 'removeFromClientSelectedDaySchedules', 'setLoading']),

            changePlaceholder(value) {
                this.placeholder.client = value
                this.placeholder.professional = value
                this.placeholder.category = value
            },

            getSingleSchedule() {
                let that = this

                that.changePlaceholder(true)
                that.$http.get(`client/company/single_schedule/show/${that.$route.params.single_schedule_id}`)
                .then(function (response) {
                    that.single_schedule = response.data.single_schedule
                    setTimeout(() => {
                        that.changePlaceholder(false)
                    }, 200);
                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            confirmSingleSchedule(){
                let that = this

                this.old_schedule_data = _.cloneDeep(that.single_schedule)
                let confirm_data = _.cloneDeep(that.single_schedule)

                that.$swal({
                    title: 'Confirmar presença',
                    text: 'Deseja confirmar a presença do aluno?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('professional/company/single_schedule/confirm', confirm_data)
                        .then(function (response) {

                            successNotify('', 'Presença confirmada com sucesso.')

                            that.single_schedule = response.data.single_schedule
                            that.handleReschedule(response.data.schedule)

                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }).catch(function () {

                })
            },

            maxRescheduleTime: function(){
                let that = this
            
                let schedule_date = moment(that.single_schedule.date + ' ' + that.single_schedule.time, 'DD/MM/YYYY HH:mm:ss')
                schedule_date.subtract(that.single_schedule.category_calendar_settings.advance_reschedule, 'hours');
                return schedule_date;

            },

            maxCancelTime: function(){
                let that = this
            
                let schedule_date = moment(that.single_schedule.date + ' ' + that.single_schedule.time, 'DD/MM/YYYY HH:mm:ss')
                schedule_date.subtract(that.single_schedule.category_calendar_settings.cancel_schedule, 'hours');
                return schedule_date;

            },

            reschedule(schedule) {

                this.old_schedule_data = _.cloneDeep(schedule)
                this.reschedule_data = _.cloneDeep(schedule)

                this.interactions.rescheduler = true
            },

            getSchedules(payload) {
                let that = this

                let start = payload.start.clone().format('YYYY-MM-DD')
                let end = payload.end.clone().format('YYYY-MM-DD')

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('client/calendar/list', {
                    company_id: that.single_schedule.company_id,
                    category_id: that.single_schedule.category_id,
                    start: start,
                    end: end
                })
                    .then(function (response) {
                        that.schedules = response.data.schedules
                        that.setLoading({is_loading: false, message: ''})
                        $('#modal-calendar').modal('show')

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            },


            getProfessionalCalendarSettings(){
                let that = this
                that.setLoading({is_loading: true, message: ''})
                that.$http.post('client/company/calendar_settings/to_reschedule', {
                    company_id: that.single_schedule.company_id,
                    category_id: that.single_schedule.category_id,
                    date: that.selected_date
                })
                    .then(function (response) {
                        that.professionals_calendar_settings = response.data.professional_calendar_settings

                        that.handleProfessionalsAvaiableWorkdays()
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            },

            handleProfessionalsAvaiableWorkdays() {
                let that = this

                that.slot_workdays = []

                let schedule_date = moment(that.selected_date, 'YYYY-MM-DD')

                that.professionals_calendar_settings.map((calendar_settings) => {

                    let is_unavaiable = false

                    let slots = calendar_settings.workdays.filter((workday) => workday.dow === that.reschudle_dow)

                    calendar_settings.unavailable_dates_range.map((range) => {

                        let dateRange = moment().range(range.from, range.to)

                        is_unavaiable = dateRange.contains(schedule_date)

                    })

                    slots.map((slot) => {
                        slot.schedules = [],
                            slot.is_unavaiable = is_unavaiable
                    })

                    that.slot_workdays.push({
                        professional: calendar_settings.professional,
                        slots: slots
                    })

                    calendar_settings.schedules.map((schedule) => {

                        let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                        let slot_index = _.findIndex(slots, {init: schedule_init})

                        if(slot_index > -1){
                            slots[slot_index].schedules.push(schedule)
                        }
                    })

                })
            },

            setSelectedSlot(slot, professional_id){
                let that = this
                that.selectedSlot = slot

                if(slot.schedules.length + 1 > slot.quantity){
                    $('#modal-reschedule').modal('hide')
                    that.$swal({
                        title: 'Atenção',
                        text: 'O horário selecionado já possui a quantidade de clientes indicada na configuração da agenda do profissional, deseja continuar?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Selecionar outro horário',
                        cancelButtonColor: '#88C657',
                        reverseButtons: true
                    }).then(function () {
                        $('#modal-reschedule').modal('show')

                        that.reschedule_data.professional_id = professional_id
                        that.reschedule_data.time = slot.init

                        that.reschedule_data.professional = {}
                        that.reschedule_data.professional_workdays = {}
                    }).catch(function () {
                        that.selectedSlot = {}
                        $('#modal-reschedule').modal('show')
                    })
                }else{
                    that.reschedule_data.professional_id = professional_id
                    that.reschedule_data.time = slot.init

                    that.reschedule_data.professional = {}
                    that.reschedule_data.professional_workdays = {}
                }

            },

            saveReschedule(){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('client/company/single_schedule/reschedule', that.reschedule_data)
                    .then(function (response) {
                        $('#modal-reschedule').modal('hide')

                        successNotify('', 'Agendamento remarcado com sucesso.')

                        that.single_schedule = response.data.single_schedule
                        that.handleReschedule(response.data.single_schedule)

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            handleReschedule(schedule) {
                let that = this

                let old_schedule_date = moment(that.old_schedule_data.date, 'DD/MM/YYYY')
                let schedule_date = moment(schedule.date, 'DD/MM/YYYY')

                if (old_schedule_date.isSame(schedule_date, 'day')) {

                    //Add new schedule on selected day if is same
                    that.addOnClientSelectedDaySchedules(schedule)
                } else {

                    let old_schedule_date = moment(that.old_schedule_data.date, 'DD/MM/YYYY')
                    let schedule_date = moment(schedule.date, 'DD/MM/YYYY')

                    if (old_schedule_date.isSame(schedule_date, 'month')) {

                        //If is same month add the new schedule on current month
                        that.addOnClientMonthSchedules(schedule)
                        that.removeFromClientSelectedDaySchedules(that.old_schedule_data)
                    } else {

                        //if the new schedule month is different remove from current month
                        that.removeFromClientMonthSchedules(schedule)
                        that.removeFromClientSelectedDaySchedules(that.old_schedule_data)
                    }
                }

                that.cancelReschedule()
            },

            handleSlotDay(payload) {
                let that = this

                that.reschedule_data.date = payload.date.format('DD/MM/YYYY')
                that.selected_date = payload.date.format('YYYY-MM-DD')

                let is_past = payload.date.diff(moment(), 'days')

                if(is_past < 0){
                    $('#modal-calendar').modal('hide')
                    that.$swal({
                        title: 'Atenção',
                        text: `A data selecionada é passado (${payload.date.format("DD/MM/YYYY")}), deseja continuar?`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Selecionar outra data',
                        cancelButtonColor: '#88C657',
                        reverseButtons: true
                    }).then(function () {
                        that.reschudle_dow = payload.date.day()

                        if(that.reschedule_data.professional_id){
                            that.getProfessionalCalendarSettings()
                        }

                        if(!that.reschedule_data.professional_id){
                            that.getCategoryCalendarSettings()
                        }

                        $('#modal-calendar').modal('hide')
                        $('#modal-reschedule').modal('show')

                    }).catch(function () {
                        that.selected_date = ''
                        $('#modal-calendar').modal('show')
                    })
                }else{
                    that.reschudle_dow = payload.date.day()

                    if(that.reschedule_data.professional_id){
                        that.getProfessionalCalendarSettings()
                    }

                    if(!that.reschedule_data.professional_id){
                        that.getCategoryCalendarSettings()
                    }

                    $('#modal-calendar').modal('hide')
                    $('#modal-reschedule').modal('show')
                }

            },

            handleSameSlot(slot, professional_id){
                let that = this

                let old_schedule_date = moment(that.old_schedule_data.date + ' '+ that.old_schedule_data.time, 'DD/MM/YYYY HH:mm:ss')
                let schedule_date = moment(that.reschedule_data.date, 'DD/MM/YYYY')

                if (old_schedule_date.isSame(schedule_date, 'day')) {
                    if(old_schedule_date.format('HH:mm') == slot.init && professional_id == that.old_schedule_data.professional_id){
                        return true
                    }
                }

                return false
            },

            cancelSchedule(schedule){
                let that = this

                this.old_schedule_data = _.cloneDeep(schedule)
                let cancel_data = _.cloneDeep(schedule)

                that.$swal({
                    title: 'Atenção',
                    text: 'Confirma o cancelamento deste agendamento?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar cancelamento',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                    that.setLoading({is_loading: true, message: ''})

                    that.$http.post('client/company/single_schedule/cancel', cancel_data)
                        .then(function (response) {

                            successNotify('', 'Agendamento cancelado com sucesso.')

                            that.single_schedule = response.data.single_schedule
                            that.handleReschedule(response.data.single_schedule)

                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {
                            console.log(error)

                            that.setLoading({is_loading: false, message: ''})
                        });
                }).catch(function () {

                })


            },

            cancelReschedule(){
                this.old_schedule_data = {}
                this.reschedule_data = {}
                this.selectedSlot = null
                this.interactions.rescheduler = false
            },

            getCategoryCalendarSettings(){
                let that = this
                that.setLoading({is_loading: true, message: ''})
                that.$http.post('client/company/category/calendar_settings/to_reschedule', {
                    company_id: that.single_schedule.company_id,
                    category_id: that.single_schedule.category_id,
                    date: that.selected_date
                })
                    .then(function (response) {
                        that.category_calendar_settings = response.data.category_calendar_settings

                        that.handleCategoryAvaiableWorkdays()

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            },

            handleCategoryAvaiableWorkdays() {
                let that = this

                that.slot_workdays = []

                let schedule_date = moment(that.selected_date, 'YYYY-MM-DD')

                let is_unavaiable = false

                let slots = that.category_calendar_settings.workdays.filter((workday) => workday.dow === that.reschudle_dow)

                if(that.category_calendar_settings.unavailable_dates_range){
                    that.category_calendar_settings.unavailable_dates_range.map((range) => {

                        let dateRange = moment().range(range.from, range.to)

                        is_unavaiable = dateRange.contains(schedule_date)

                    })
                }

                slots.map((slot) => {
                    slot.schedules = [],
                        slot.is_unavaiable = is_unavaiable
                })

                that.slot_workdays.push({
                    professional:  null,
                    category:  that.category_calendar_settings.category,
                    slots: slots
                })

                that.category_calendar_settings.schedules.map((schedule) => {

                    let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                    let slot_index = _.findIndex(slots, {init: schedule_init})

                    if(slot_index > -1){
                        slots[slot_index].schedules.push(schedule)
                    }
                })
            },

            handleSameSlotCategory(slot, category_id){
                let that = this

                let old_schedule_date = moment(that.old_schedule_data.date + ' '+ that.old_schedule_data.time, 'DD/MM/YYYY HH:mm:ss')
                let schedule_date = moment(that.reschedule_data.date, 'DD/MM/YYYY')

                if (old_schedule_date.isSame(schedule_date, 'day')) {
                    if(old_schedule_date.format('HH:mm') == slot.init && category_id == that.old_schedule_data.category_id){
                        return true
                    }
                }

                return false
            },

            checkIsAfter: function(schedule){
                let that = this
            
                let schedule_date = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss')
                let now = moment()

                return (now.isAfter(schedule_date));
            },

            cannotReschedule: function(){
                let that = this
            
                let schedule_date = moment(that.single_schedule.date + ' ' + that.single_schedule.time, 'DD/MM/YYYY HH:mm:ss')
                schedule_date.subtract(that.single_schedule.category_calendar_settings.advance_reschedule, 'hours');
                return moment().isAfter(schedule_date);
                
            },

            cannotCancel: function(){
                let that = this
            
                let schedule_date = moment(that.single_schedule.date + ' ' + that.single_schedule.time, 'DD/MM/YYYY HH:mm:ss')
                schedule_date.subtract(that.single_schedule.category_calendar_settings.cancel_schedule, 'hours');
                return moment().isAfter(schedule_date);
                
            },
        }
    }
</script>

<style scoped>

    .row.row-client-content { margin: 0 -5px; }
    .row.row-client-content .col-md-6.col-xs-6 { padding: 0 5px; }
    .border-inside-card { height: 73px; margin-top: 10px; }

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

    /* make modal fullscreen on mobile*/
    @media only screen and (max-width : 768px) {
        .modal-dialog {
            width: 100%;
            min-height: 100%;
            padding: 0;
            margin: 0;
        }
        .modal-content {
            height: 100%;
            min-height: 100%;
            height: auto;
            border-radius: 0;
            border: 0px solid transparent;
        }

        .modal-content {
            height: 100%;
            border-radius: 0;
            position:relative;
        }
    }

</style>
