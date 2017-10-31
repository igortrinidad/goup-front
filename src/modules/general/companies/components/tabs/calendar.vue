<template>
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Agenda'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">

            <!-- NEW CALENDAR HEADER -->
            <div class="row m-t-30">
                <div class="col-sm-12">
                    <div class="calendar-header clearfix">
                        <div class="col-xs-2 col-md-2 text-left">
                            <button
                                class="btn btn-transparent"
                                title="Semana Anterior"
                                @click.prevent="handlePrevMonth"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </div>
                        <div class="col-xs-8 col-md-8 text-center">
                        <span class="f-14 calendar-title m-b-20 m-l-10 cursor-pointer" @click="interactions.showModalSelectMonths = true">{{ current_month | moment('MMMM') }} / {{ current_month | moment('YYYY') }}</span>
                        </div>
                        <div class="col-xs-2 col-md-2 text-right">
                            <button
                                class="btn btn-transparent"
                                title="Proxima Semana"
                                @click.prevent="handleNextMonth"
                            >
                                <i class="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NEW CALENDAR DAYS -->
            <div class="row text-center">
                <div class="col-md-12 col-xs-12 col-lg-12">
                    <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12">
                        <span class="">{{ day }}</span>
                    </div>

                    <div class="row" v-if="interactions.loading">
                        <div class="col-md-12 col-xs-12">
                            <div class="text-center">
                                <br><br><br>
                                <pulse-loader :loading="true" :color="'#7BCCC9'" :size="'20px'"></pulse-loader>
                                <span> Carregando agenda</span>
                            </div>
                        </div>
                    </div>

                    <div v-for="(date, $index) in month_days" v-if="!interactions.loading">
                        <div>
                            <div class="col-wp-calendar col-xs-12" :class="date.availability"
                                 v-show="checkIfDayIsCurrentMonth(date.day)" @click="setSelectedDay(date)">
                                 <span :class="{'default-but-has-reservation' : date.reservations}">
                                <span class="number cursor-pointer">
                                    <span v-show="checkIfDayIsCurrentMonth(date.day)">
                                    {{ date.day | moment('DD')}}
                                    </span>
                                </span>
                                <span class="badge-calendar-wp"
                                      v-show="interactions.show_reservations_count && date.reservations.length">{{date.reservations.length}}</span>
                                <span class="badge-calendar-wp"
                                      v-show="!interactions.show_reservations_count && date.slots_available_count">{{date.slots_available_count}}</span>
                                    </span>
                            </div>

                            <div class="col-wp-calendar col-xs-12 default" v-show="!checkIfDayIsCurrentMonth(date.day)">
                                <span class="number cursor-pointer">
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div class="form-group m-t-10">
                <label>Tipo de contador</label><br>
                <p>
                    {{interactions.show_reservations_count ? 'Contador de reservas' : 'Contador de slots disponíveis'}}</p>
                <label class="switch">
                    <input type="checkbox" v-model="interactions.show_reservations_count">
                    <div class="slider round"></div>
                </label>
            </div>

        </div>

        <hr>


        <!--Modal slot detail-->
        <div class="modal-wp-wrapper" v-if="modal_detail.is_visible">
            <div class="wp-overlay"></div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 col-xs-12 m-t-30">

                    <div class="modal-wp" v-show="modal_detail.is_visible">
                        <div class="modal-wp-dialog">

                            <div class="modal-wp-header">
                                <h2 class="modal-title" id="modalLabel">
                                    {{selected_slot.date | moment('DD/MM/YYYY')}} {{selected_slot.time}}
                                    <button type="button" class="close" @click="closeModal()" aria-label="Close">
                                        <span aria-hidden="true"><i class="fa fa-times"></i></span>
                                    </button>
                                </h2>
                            </div>
                            <div class="modal-wp-body">
                                <h3>Reservas</h3>
                                <p class="m-t-20 m-b-20" v-if="!selected_slot.data.length">
                                    Nenhuma reserva realizada.</p>

                                <button class="btn btn-success m-b-20" v-if="selected_slot.is_free"
                                        @click.prevent="createReservation(selected_slot)"><i class="fa fa-plus"></i>
                                    Criar reserva
                                </button>

                                <div class="table-responsive" v-if="selected_slot.data.length">
                                    <table class="table table-hover table-vmiddle">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Cliente</th>
                                            <th>Criado em:</th>
                                            <th width="12%">Status</th>
                                            <th width="5%" class="text-center">Ações</th>
                                        </tr>
                                        </thead>
                                        <tbody v-for="(reservation, $index) in selected_slot.data">
                                        <tr>
                                            <td><strong>{{$index + 1}}</strong></td>
                                            <td>{{reservation.client.full_name}}</td>
                                            <td>{{reservation.created_at | moment('DD/MM/YYYY HH:mm:ss')}}</td>
                                            <td>
                                                <span class="label label-success"
                                                      v-if="handleStatus(reservation) == 'confirmed'">Confirmada</span>
                                                <span class="label label-danger"
                                                      v-if="handleStatus(reservation) == 'canceled'">Cancelada</span>
                                                <span class="label label-default"
                                                      v-if="handleStatus(reservation) == 'waiting'">Aguardando</span>
                                            </td>
                                            <td class="text-center">
                                                <router-link class="btn btn-info btn-xs" tag="button"
                                                             :to="{name: 'places.show.reservation',params:{id: selectedPlace.id, idReservation: reservation.id}}">
                                                    <i class="fa fa-search"></i></router-link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="closeModal()">Fechar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal slot detail-->

        <!--Modal reservation -->
        <div class="modal-wp-wrapper" v-if="modal_reservation.is_visible">
            <div class="wp-overlay"></div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 col-xs-12 m-t-30">

                    <div class="modal-wp">
                        <div class="modal-wp-dialog">

                            <div class="modal-wp-header">
                                <h2 class="modal-title" id="modalReservation">Adicionar reserva
                                    <button type="button" class="close" @click="closeModalReservation()"
                                            aria-label="Close">
                                        <span aria-hidden="true"><i class="fa fa-times"></i></span>
                                    </button>
                                </h2>
                            </div>
                            <div class="modal-wp-body">

                                <h4>Informações da reserva</h4>
                                <p><strong>Data:</strong> {{selectedDate.day | moment('DD/MM/YYYY')}}</p>
                                <p>{{selectedSlot.time == 'Dia inteiro' ? '' : selectedSlot.time}}</p>
                                <hr>
                                <h4>Informações do cliente</h4>

                                <div class="form-group">
                                    <label>Nome</label>
                                    <input type="text" class="form-control" v-model="reservation.client.name"
                                           placeholder="Infome o nome">
                                </div>

                                <div class="form-group">
                                    <label>Sobrenome</label>
                                    <input type="text" class="form-control" v-model="reservation.client.last_name"
                                           placeholder="Infome o sobrenome">
                                </div>

                                <div class="form-group">
                                    <label>E-mail</label>
                                    <input type="text" class="form-control" v-model="reservation.client.email"
                                           placeholder="Infome o e-mail">
                                </div>

                                <div class="form-group">
                                    <label>Telefone para contato</label>
                                    <input type="text" class="form-control" v-model="reservation.client.phone"
                                           placeholder="Infome um telefone para contato">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" @click="closeModalReservation()">
                                    Cancelar
                                </button>
                                <button type="button" class="btn btn-primary" @click="makeReservation">Salvar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal  reservation -->

        <!-- MODAL SELECT DATE -->
        <div class="modal fade" id="selected-date-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Data: {{selectedDate.day | moment('DD/MM/YYYY')}}</h4>
                    </div>
                    <div class="modal-body p-25">

                        <h4>Horários</h4>
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div v-for="(slot, $index) in selectedDate.slots">
                                    <button class="btn btn-xl btn-block m-t-10" :class="slot.slot_availability"
                                            @click="selectSlotToMakeReservation(slot, selectedDate.availability)">
                                        <span
                                            v-if="slot.time == 'Dia inteiro' && slot.slot_availability != 'unavailable'">
                                            Reservar
                                        </span>
                                        <span
                                            v-if="slot.time != 'Dia inteiro' && slot.slot_availability != 'unavailable'">
                                            Reservar {{slot.time}}
                                        </span>
                                        <span
                                            v-if="slot.time == 'Dia inteiro' && slot.slot_availability == 'unavailable'">
                                            Reservado
                                        </span>
                                        <span
                                            v-if="slot.time != 'Dia inteiro' && slot.slot_availability == 'unavailable'">
                                            Reservado {{slot.time}}
                                        </span>
                                    </button>
                                </div>

                                <h5>*Será necessário confirmar a reserva para bloquear e deixar indisponível a data em sua agenda.</h5>
                            </div>
                        </div>

                        <hr>

                        <h4>Reservas</h4>

                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <p v-if="!selectedDate.reservations.length">
                                    Não há reservas para esta data, selecione um slot acima para inserir uma reserva.</p>
                                <div v-if="selectedDate.reservations.length">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover table-striped table-vmiddle">
                                            <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Hora</th>
                                                <th>Cliente</th>
                                                <th>Status</th>
                                                <th class="text-center">Ver</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(reservation, index) in selectedDate.reservations">
                                                <td>{{reservation.date | moment('DD/MM/YYYY')}}</td>
                                                <td>
                                                    <span v-if="!reservation.all_day">{{reservation.date | moment('HH:mm')}}</span>
                                                    <span v-if="reservation.all_day">Dia inteiro</span>
                                                </td>
                                                <td>{{reservation.client.full_name}}</td>
                                                <td>
                                                    <span class="label label-success"
                                                          v-if="handleStatus(reservation) == 'confirmed'">Confirmada</span>
                                                    <span class="label label-danger"
                                                          v-if="handleStatus(reservation) == 'canceled'">Cancelada</span>
                                                    <span class="label label-default"
                                                          v-if="handleStatus(reservation) == 'waiting'">Aguardando</span>
                                                </td>
                                                <td class="text-center">
                                                    <button class="btn btn-sm btn-primary"
                                                            @click="goToReservation(reservation)">Ver
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>

                </div>
            </div>
        </div>
        <!-- MODAL SELECT DATE -->

        <!--Modal SELECT MONTH -->
        <div class="modal-wp-wrapper" v-if="interactions.showModalSelectMonths">
            <div class="wp-overlay"></div>
            <div class="row">
                <div class="col-md-6 col-md-offset-3 col-xs-12 m-t-30">

                    <div class="modal-wp" >
                        <div class="modal-wp-dialog">

                            <div class="modal-wp-header">
                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                        <button type="button" class="close" @click="interactions.showModalSelectMonths = false"
                                            aria-label="Close">
                                        <span aria-hidden="true"><i class="fa fa-times"></i></span>
                                    </button>

                                </div>
                            </div>
                                <div class="row">
                                    <div class="col-xs-4 text-left">
                                        <button
                                            class="btn btn-transparent m-t-10"
                                            title="Ano anterior"
                                            @click.prevent="handlePrevYear"
                                        >
                                            <i class="fa fa-arrow-left"></i>
                                        </button>
                                    </div>

                                    <div class="col-xs-4 text-center">
                                        <h2>{{current_year | moment('YYYY')}}</h2>
                                    </div>
                                    <div class="col-xs-4 text-right">

                                        <button
                                            class="btn btn-transparent m-t-10"
                                            title="Proximo ano"
                                            @click.prevent="handleNextYear"
                                        >
                                            <i class="fa fa-arrow-right"></i>
                                        </button>
                                    </div>

                                </div>

                            </div>
                            <div class="modal-wp-body m-t-30">

                                <div class="m-t-30 m-b-30">

                                    <div class="col-wp-calendar-month col-xs-12" v-for="month in months_of_year">
                                        <div class="month" @click="changeCurrentMonth(month)">{{month | moment('MMMM')}}</div>
                                    </div>
                                </div>

                            </div>

                            <div class="modal-footer">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal  SELECT MONTH -->
    </div>

</template>

<script>
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)
    import Datepicker from 'vuejs-datepicker'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
     import mainHeader from '@/components/main-header.vue'

    import {clearPlaceCalendarSettingsObject} from '@/models/CompanyCalendarSettings'

    export default{
        name: 'calendar',
        components: {
            Datepicker,
            PulseLoader,
            mainHeader
        },
        data(){
            return {
                interactions: {
                    show_reservations_count: true,
                    loading: false,
                    showModalSelectMonths: false,
                },

                slotInterval: 60,

                slots_preset: 1,
                current_day: null,

                calendar_settings: {},
                selected_slot: null,
                modal_detail: {
                    is_visible: false
                },
                reservationDates: [],
                preReservationDates: [],
                modal_reservation: {
                    is_visible: false
                },


                week_days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                month_days: [],
                current_month: moment(),
                current_year: moment(),
                months_of_year: [],
                selectedDate: {
                    day: '',
                    availability: '',
                    is_today: '',
                    reservations: []
                },
                selectedSlot: null
            }
        },
        computed: {

            calendarWorkDays: function () {
                return _.orderBy(this.calendar_settings.available_days_config, 'day_of_week', 'asc');
            }
        },
        watch:{
            'calendar_settings'(val, oldVal){
               if(val){

               }
            }

        },
        mounted(){
            let that = this


                that.calendar_settings = _.cloneDeep(clearPlaceCalendarSettingsObject())
                //that.getPlaceAvaiableDates()
                that.getMonthReservations()
                that.getMonthsOfCurrentYear()

        },

        methods: {

            checkIfDayIsCurrentMonth: function (day) {
                let that = this

                return moment(day).isSame(that.current_month, 'month');

            },

            goToReservation: function (reservation) {
                let that = this

                $('#selected-date-modal').modal('hide');

                that.setSelectedReservation(reservation)

                that.$router.push({name: 'places.show.reservation',params:{id: that.selectedPlace.id, idReservation: reservation.id}});
            },

            selectSlotToMakeReservation: function (slot, date_availability) {
                let that = this


                if(!that.adminCheckActive){
                    that.$swal('Atencão', 'Este local está inativo, portanto não  possível efetuar novas reservas.', 'warning');
                    return false
                }


                if (slot.slot_availability == 'unavailable') {

                    that.$swal('Atencão', 'O slot selecionado está reservado. Para inserir nova reserva no mesmo horário, você deve cancelar a reserva atual deste slot.', 'warning');
                    return false
                }

                that.selectedSlot = slot;

                let time = moment(slot.time, 'HH:mm').hours()
                let date = moment(slot.date, 'YYYY-MM-DD').add(time, 'hours')

                that.reservation.date = date.format('YYYY-MM-DD HH:mm:ss')

                that.reservation.is_pre_reservation = date_availability === 'pre-reservation' ? true : false

                that.reservation.all_day = slot.time === 'Dia inteiro' ? true : false
                that.reservation.place_id = this.selectedPlace.id

                $('#selected-date-modal').modal('hide');
                that.modal_reservation.is_visible = true

            },

            getMonthDays: function () {
                let that = this

                var first_day_of_cal = moment(this.current_month).startOf('month').day();

                if (first_day_of_cal > 0) {
                    first_day_of_cal = moment(this.current_month).startOf('month').subtract(first_day_of_cal, 'days');
                } else {
                    first_day_of_cal = moment(this.current_month).startOf('month');
                }

                var last_day_of_cal = moment(this.current_month).endOf('month').day();

                if (last_day_of_cal > 0) {
                    last_day_of_cal = moment(this.current_month).endOf('month').add(6 - last_day_of_cal, 'days');
                } else {
                    last_day_of_cal = moment(this.current_month).endOf('month');
                }

                that.month_days = [];
                for (var day = first_day_of_cal; day.isBefore(last_day_of_cal); day.add(1, 'days')) {
                    that.month_days.push(that.getDay(day));
                }

                that.interactions.loading = false

            },

            getMonthsOfCurrentYear: function(){
                let that = this

                var first_month_of_year = moment(this.current_year).startOf('year');
                var last_month_of_year = moment(this.current_year).endOf('year');

                that.months_of_year = [];
                for (var month = first_month_of_year; month.isBefore(last_month_of_year); month.add(1, 'month')) {
                    that.months_of_year.push(_.cloneDeep(month));
                }

            },

            setSelectedDay: function (day) {

                if (day.availability == 'default' && !day.reservations.length) {
                    this.$swal('Atenção', 'Esta data está indisponível na agenda. Configure os períodos disponíveis da agenda em Agenda > Configurações da agenda.', 'warning')
                    return false
                }
                this.$set(this, 'selectedDate', day)

                $('#selected-date-modal').modal('show')

            },

            getDay(day){
                var that = this

                let is_reservation = _.indexOf(that.reservationDates, day.format('YYYY-MM-DD'))
                is_reservation = is_reservation >= 0 ? true : false

                let is_pre_reservation = _.indexOf(that.preReservationDates, day.format('YYYY-MM-DD'))
                is_pre_reservation = is_pre_reservation >= 0 ? true : false

                let date = {
                    day: day.format('YYYY-MM-DD'),
                    availability: that.checkDateAvailability(day.format('YYYY-MM-DD')),
                    is_today: day.isSame(moment().format('YYYY-MM-DD')),
                    reservations: []
                }

                date.slots = that.checkWorkdaySlots(day, date.availability);
                date.slots_available_count = date.slots.length;

                return that.checkReservationsToDay(date);

            },

            checkDateAvailability: function (day) {
                let that = this

                var availability = 'default'

                let can_pre_reservation = _.indexOf(that.preReservationDates, day)

                if (can_pre_reservation >= 0) {
                    availability = 'pre-reservation'
                }

                let can_reservation = _.indexOf(that.reservationDates, day)

                if (can_reservation >= 0) {
                    availability = 'reservation'
                }

                return availability;

            },

            checkWorkdaySlots(day, availability) {
                var that = this

                const timeLabels = [];
                var slots = [];

                //Verifica se é maior que hoje
                // VOLTAR day.isAfter(moment()) &&
                if (availability == 'reservation' || availability == 'pre-reservation') {

                    that.calendarWorkDays.forEach(function (workday) {

                        //Verifica se esta disponível o dia de funcionamento
                        if (!workday.unavailable) {

                            //Verifica se é o dia inteiro antes de fazer o loop nas 24 horas
                            if (day.day() == workday.day_of_week) {

                                slots.push({
                                    date: day.format('YYYY-MM-DD'),
                                    time: workday.allday ? 'Dia inteiro' : workday.hour,
                                    slot_availability: 'available'
                                })

                            }

                        }

                    });

                }

                return slots;

            },

            checkReservationsToDay: function (day) {
                let that = this

                that.selectedPlace.reservations.forEach(function (reservation) {

                    if (moment(reservation.date).isSame(day.day, 'day')) {
                        day.reservations.push(reservation)
                    }

                })

                return that.checkSlotsOfDayAvailability(day);
            },

            checkSlotsOfDayAvailability: function (day) {
                let that = this

                if (day.reservations.length) {

                    day.slots.forEach(function (slot) {

                        day.reservations.forEach(function (reservation) {

                            if(slot.time == 'Dia inteiro' && reservation.is_confirmed){
                                slot.slot_availability = 'unavailable';
                                day.slots_available_count--;
                                day.availability = 'unavailable';
                                return day;
                            }

                            if (moment(reservation.date).isSame(day.day + ' ' + slot.time, 'hour') && reservation.is_confirmed) {
                                day.slots_available_count--;
                                slot.slot_availability = 'unavailable';

                                if (!day.slots_available_count) {
                                    day.availability = 'unavailable';
                                }

                            }

                        })

                    });

                    return day;

                } else {

                    if(!day.slots.length){
                         day.availability = 'default';
                    }

                    return day;
                }

            },

            handlePrevMonth(){
                this.current_month.subtract(1, 'month');
                this.getMonthReservations()
            },

            handleNextMonth(){
                this.current_month.add(1, 'month');
                this.getMonthReservations()
            },

            handlePrevYear(){
                this.current_year.subtract(1, 'year');
                this.getMonthsOfCurrentYear()
            },

            handleNextYear(){
                this.current_year.add(1, 'year');
                this.getMonthsOfCurrentYear()
            },

            changeCurrentMonth: function(month){
                let that = this

                this.current_month = _.cloneDeep(month);

                setTimeout(function() { that.getMonthReservations(); }, 200);

                this.interactions.showModalSelectMonths = false;

            },


            getPlaceAvaiableDates(){
                let that = this
                let availableDates = []
                let preReservationDates = []

                that.selectedPlace.calendar_settings.available_dates_range.map((range) => {

                    let dateRange = moment().range(range.from, range.to)
                    let dates = Array.from(dateRange.by('day', {exclusive: false}));

                    if (!range.is_pre_reservation) {

                        dates.map((date) => {

                            let isSelected = _.indexOf(availableDates, date.format('YYYY-MM-DD'))

                            if (isSelected > -1) {

                                availableDates.splice(isSelected, 1)

                            } else {
                                availableDates.push(date.format('YYYY-MM-DD'))
                            }
                        })
                    }

                    if (range.is_pre_reservation) {
                        dates.map((date) => {

                            let isSelected = _.indexOf(preReservationDates, date.format('YYYY-MM-DD'))

                            if (isSelected > -1) {

                                preReservationDates.splice(isSelected, 1)

                            } else {
                                preReservationDates.push(date.format('YYYY-MM-DD'))
                            }
                        })
                    }
                })

                that.reservationDates = _.orderBy(availableDates, [], ['asc'])
                that.preReservationDates = _.orderBy(preReservationDates, [], ['asc'])
            },

            closeModal(){
                this.selected_slot = null
                this.modal_detail.is_visible = false
            },

            handleStatus(reservation){
                if (reservation.is_canceled) {
                    return 'canceled'
                }

                if (reservation.is_confirmed) {
                    return 'confirmed'
                }

                if (!reservation.is_confirmed && !reservation.is_canceled) {
                    return 'waiting'
                }
            },

            createReservation(slot){

                this.modal_detail.is_visible = false
                this.modal_reservation.is_visible = true

                let time = moment(slot.time, 'HH:mm').hours()
                let date = moment(slot.date, 'YYYY-MM-DD').add(time, 'hours')

                this.reservation.date = date.format('YYYY-MM-DD HH:mm:ss')
                this.reservation.is_pre_reservation = slot.is_pre_reservation
                this.reservation.place_id = this.selectedPlace.id
            },

            closeModalReservation(){
                this.selected_slot = null
                this.modal_reservation.is_visible = false
                this.reservation = clearReservationObject()

            },

            makeReservation(){
                let that = this


                const validate = this.validate()

                if (validate.validated) {
                    that.$http.post('places/reservation', that.reservation)
                        .then(function (response) {

                            successNotify('', 'Reserva adicionada com sucesso.')

                            that.addReservationToPlace(response.data.reservation)

                            that.getMonthDays()

                            that.closeModalReservation()
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }else{
                    errorNotify('', validate.message)
                }


            },

            validate() {

                if (!this.reservation.client.name) return { validated: false, message: 'Informe o nome do cliente' }
                if (!this.reservation.client.last_name) return { validated: false, message: 'Informe o sobrenome do cliente' }
                if (!this.reservation.client.email) return { validated: false, message: 'Informe o email do cliente' }
                else return { validated: true }
            },

            getMonthReservations(){
                let that = this

                let start = that.current_month.startOf('month').format('YYYY-MM-DD')
                let end = that.current_month.endOf('month').format('YYYY-MM-DD')

                that.getMonthDays()

            }


        }
    }
</script>
<style scoped>

    /* NEW CALENDAR WE PLACES */

    .col-wp-calendar-header {
        width: 14.2857%;
        background-color: #E2E2E2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        font-weight: 600;
    }

    .col-wp-calendar {
        width: 14.2857%;
        background-color: #F2F2F2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        color: #2C3E54;
    }

    .col-wp-calendar-month {
        width: 33.332%;
        background-color: #F2F2F2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        color: #2C3E54;
        cursor: pointer;
    }

    .calendar-header {
        background: #FA8A3D;
        display: flex;
        height: 50px;
        align-items: center;
        border-radius: 4px 4px 0 0;
    }

    .cal-legend-helper {
        display: inline-block;
        width: 12px;
        height: 12px;
    }

    .today {
        border: 1px solid #7BCCC6;
    }

    .default {
        background-color: #F2F2F2;
        cursor: not-allowed;
    }

    .default-but-has-reservation{
        cursor: pointer;
    }

    .reservation {
        background-color: #82CB7D;
    }

    .reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .pre-reservation {
        background-color: #69A7BE;
    }

    .pre-reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .unavailable {
        background-color: #ED5553;
        cursor: pointer;
    }

    .unavailable:hover {
        background-color: #ED5553;
    }

    .btn.available {
        background-color: #1ABC9C !important;
        font-weight: 900;
    }

    .btn .unavailable {
        background-color: #ED5553;
    }

    .legend-item {
        position: relative;
        float: right;
    }

    .badge-calendar-wp {
        display: block;
        width: 18px;
        height: 17px;
        position: absolute;
        top: 2px;
        right: 5px;
        color: white;
        padding: 3px;
        background-color: #4A5464;
        font-size: 9px;
        border-radius: 50%;
    }

    /* END NEW CALENDAR WE PLACES */

</style>
