<template>
        <div>
            <div class="row text-center">
                <div class="col-sm-12">
                    <span class="d-block f-300 m-t-10 m-b-10"  v-if="isEdit">Clique no slot para editar</span>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-md-12 col-xs-12 col-lg-12">
                    <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12">
                        <span class="">{{ day.label}}</span>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="teste">
                    <div class="col-md-12 col-xs-12 col-lg-12">
                        <div v-for="(day, indexDay) in week_days" class="col-wp-calendar col-xs-12">

                            <span v-for="(slot, indexSlot) in day.slots">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <span class="label label-success full m-b-5 t-overflow cursor-pointer" @click="editSlot(slot, isClient)">
                                            <span class="slot-text">
                                                <span v-show="slot.is_limited">{{slot.quantity}}</span>
                                                <span v-show="!slot.is_limited"><i class="ion-ios-infinite f-14"></i></span>
                                            </span>
                                            <span class="slot-text">{{slot.init}}</span>
                                            <span class="slot-text">{{slot.end}}</span>
                                        </span>
                                    </div>
                                </div>
                            </span>

                            <div class="row p-5" v-if="isEdit">
                                <div class="col-xs-12">
                                    <span class="btn btn-xs btn-block btn-info" @click="setSlotDow(day.dow)" data-toggle="modal" :data-target="'#modal-add-slot' + category_id">+</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL HORARIOS -->
            <div class="modal" :id="'modal-add-slot' + category_id" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">Horário para {{handleDowName(newSlot.dow)}}</h4>
                        </div>
                        <div class="modal-body">

                        <fieldset class=" m-t-20">

                            <!-- Notifications -->
                            <span class="notification notification-success f-400" v-if="calendarByCategory && slot_workdays.length">
                                Selecione um horário de acordo com os horários disponíveis para esta especialidade.
                            </span>

                            <span class="notification notification-success f-400" v-if="!calendarByCategory && slot_workdays.length">
                                Selecione um horário de acordo com os horários disponíveis para cada profissional.
                            </span>

                            <span class="notification notification-danger f-400" v-if="!calendarByCategory && !slot_workdays.length">
                                Você deve configurar os horários de atendimento dos profissionais antes.
                            </span>
                            <!-- Notifications -->

                            <!-- Workdays -->
                            <div v-for="workday in slot_workdays">
                                <div class="col-sm-6 text-center">
                                    <div  v-if="!calendarByCategory">
                                        <h3> {{workday.professional.full_name}}</h3>

                                        <span v-if="!workday.slots.length">Este profissional não possui horários para o dia selecionado.</span>
                                        <span v-if="workday.slots.length">Horários disponíveis</span>
                                    </div>

                                    <div  v-if="calendarByCategory">
                                        <h3> {{workday.category.name}}</h3>
                                    </div>

                                    <br>

                                    <button class="btn btn-block btn-sm m-b-10" @click.prevent="setSelectedSlot(slot)"
                                          :class="{'selected-slot': selectedSlot === slot, 'btn-success': slot.clients_count < slot.quantity, 'btn-info': slot.clients_count == slot.quantity, 'btn-danger': slot.clients_count > slot.quantity}"
                                          v-for="slot in workday.slots">{{slot.init}} às {{slot.end}} <span class="badge pull-right">{{slot.clients_count}}</span>
                                    </button>
                                </div>
                            </div>
                            <!-- / Workdays -->

                            <button class="btn btn-sm btn-danger" data-dismiss="modal" @click="removeSlot(newSlot)" v-show="interactions.isUpdate">Remover horário</button>

                        </fieldset>

                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" @click="cancelAddWorkDay">Cancelar</button>
                            <!-- Add Button -->
                            <button
                                class="btn btn-info"
                                data-dismiss="modal"
                                @click="addWorkDay()"
                                v-show="!interactions.isUpdate"
                                :disabled="!slot_workdays.length"
                            >
                                Adicionar horário
                            </button>

                            <!-- Update Button -->
                            <button
                                class="btn btn-info"
                                data-dismiss="modal"
                                @click="saveSlot()"
                                v-show="interactions.isUpdate"
                                :disabled="!slot_workdays.length"
                            >
                                Salvar horário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL HORARIOS -->

            <!-- MODAL HORARIOS CLIENTE -->
            <div class="modal" :id="'modal-add-slot-client' + category_id" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">Horário</h4>
                        </div>
                        <div class="modal-body">

                        <fieldset class=" m-t-20">
                            <small class="f-300 m-b-20"></small>

                            <div class="form-group">
                                <label>Início</label>
                                <input class="form-control" v-model="newSlotClient.init" data-mask="'##:##'">
                            </div>

                            <div class="form-group">
                                <label>Término</label>
                                <input class="form-control" v-model="newSlotClient.end" data-mask="'##:##'">
                            </div>

                            <div class="">
                                <button class="btn btn-sm btn-danger" data-dismiss="modal" @click="removeSlot(newSlotClient)" v-show="interactions.isUpdate">Remover horário</button>
                            </div>

                        </fieldset>

                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" @click="cancelAddWorkDay">Cancelar</button>
                            <button class="btn btn-info" data-dismiss="modal" @click="addWorkDay()" v-show="!interactions.isUpdate">Adicionar horário</button>
                            <button class="btn btn-info" data-dismiss="modal" v-show="interactions.isUpdate" @click="saveSlot(isClient)">Salvar horário</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL HORARIOS CLIENTE -->

        </div>

</template>

<script>


    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    export default{
        name: 'calendar-workdays',
        components:{
            mainHeader
        },
        props: {
            workdays: {
                type: Array,
                twoWay: true
            },
            subs_id: {
                type: String,
                twoWay: false
            },

            category_id: {
                type: String,
                twoWay: false
            },
            isClient: {
                type: Boolean
            },
            isEdit: {
                type: Boolean
            }
        },
        data(){
            return{
                interactions: {
                    isUpdate: false,
                },
                week_days: [
                    {label: 'Dom',dow: 0, slots: []},
                    {label: 'Seg',dow: 1, slots: []},
                    {label: 'Ter',dow: 2, slots: []},
                    {label: 'Qua',dow: 3, slots: []},
                    {label: 'Qui',dow: 4, slots: []},
                    {label: 'Sex',dow: 5, slots: []},
                    {label: 'Sab',dow: 6, slots: []},
                ],
                newSlot: {
                    professional_id: null,
                    init: '10:00',
                    end: '11:00',
                    dow: 1,
                    is_limited: true,
                    quantity: 3,
                },

                newSlotClient: {
                    init: '10:00',
                    end: '11:00',
                    dow: 1,
                },

                professionals_calendar_settings: [],
                category_calendar_settings: [],
                slot_workdays: [],
                selectedSlot: null,
                calendarByCategory: true
            }
        },
        mounted(){
            this.$nextTick(() =>{
                this.checkWeekDays();
                this.getCategoryCalendarSettings()
            })
        },
        computed: {
            ...mapGetters(['AuthToken']),

            clonedWorkdays() {
                return _.cloneDeep(this.workdays)
            }
        },
        methods:{

            ...mapActions(['disableLoader']),

            checkWeekDays: function(){
                let that = this

                that.new_workdays = _.orderBy(that.clonedWorkdays, ['dow', 'init'], ['asc', 'asc']);

                that.week_days.forEach(function(day){

                    day.slots = [];
                    that.new_workdays.forEach(function(workday){
                        if(workday.dow == day.dow){
                            day.slots.push(workday);
                        }
                    })
                })

                that.new_workdays = _.orderBy(that.new_workdays, ['dow', 'init'], ['asc', 'asc']);

                that.$emit('workdays-changed', {subs_id: that.subs_id, workdays: that.new_workdays})
            },

            addWorkDay: function(){
                this.clonedWorkdays.push(JSON.parse(JSON.stringify(this.newSlot)));
                this.selectedSlot = null
                this.checkWeekDays();
            },

            removeSlot: function(slot){
                var index = _.findIndex(this.clonedWorkdays, {init: slot.init, dow: slot.dow})
                this.clonedWorkdays.splice(index,1);
                this.checkWeekDays();
                this.interactions.isUpdate = false;
            },

            editSlot: function(slot, client = false){
                if(!this.isEdit) return false
                this.interactions.isUpdate = true;
                if(!client){
                    this.newSlot = slot
                    $('#modal-add-slot' + this.category_id).modal('show')
                } else {
                    this.newSlotClient = slot
                    $('#modal-add-slot-client' + this.category_id).modal('show')
                }
            },

            saveSlot: function(client = false){
                this.interactions.isUpdate = false;
                if(!client){
                    this.newSlot = JSON.parse(JSON.stringify(this.newSlot));
                } else {
                    this.newSlotClient = JSON.parse(JSON.stringify(this.newSlotClient));
                }

                this.selectedSlot = null
            },

            getProfessionalCalendarSettings(){
                let that = this

                that.disableLoader(true)
                that.$http.post('professional/company/professional/calendar_settings/list', {company_id: that.$route.params.company_id, category_id: that.category_id})
                    .then(function (response) {
                        that.professionals_calendar_settings = response.data.professional_calendar_settings
                        that.disableLoader(false)
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.disableLoader(false)
                    });
            },

            getCategoryCalendarSettings(){
                let that = this

                that.disableLoader(true)
                that.$http.post('professional/company/category/calendar_settings/config', {company_id: that.$route.params.company_id, category_id: that.category_id})
                    .then(function (response) {
                        that.category_calendar_settings = response.data.category_calendar_settings

                        //Check if is professional scheduled
                        if(that.category_calendar_settings.is_professional_scheduled){
                            that.calendarByCategory = false
                            that.getProfessionalCalendarSettings()
                        }

                        that.disableLoader(false)
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.disableLoader(false)
                    });
            },

            setSlotDow(dow){
                this.newSlot.dow = dow

                if(!this.calendarByCategory){
                    this.handleProfessionalsAvaiableWorkdays(dow)
                }

                if(this.calendarByCategory){
                    this.handleCategoryAvaiableWorkdays(dow)
                }

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

            handleCategoryAvaiableWorkdays(dow) {

                let that = this
                that.slot_workdays = []

                let day_slots = []
                that.category_calendar_settings.workdays.map((workday) => {

                    if (workday.dow === dow) {
                        workday.professional_id = null

                        day_slots.push(workday)
                    }
                })

                that.slot_workdays.push({
                    category: that.category_calendar_settings.category,
                    slots: day_slots
                })
            },

            handleDowName(dow){
                return moment().startOf('week').add(dow, 'days').format('dddd')
            },

            setSelectedSlot(slot){
                let that = this

                this.selectedSlot = slot

                if(slot.is_limited && slot.clients_count + 1 > slot.quantity){
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

                        that.newSlot.init = slot.init
                        that.newSlot.end = slot.end
                        that.newSlot.professional_id = slot.professional_id
                    }).catch(function () {
                        that.selectedSlot = {}
                    })
                }else{
                    that.newSlot.init = slot.init
                    that.newSlot.end = slot.end
                    that.newSlot.professional_id = slot.professional_id
                }
            },

            cancelAddWorkDay(){
                this.selectedSlot = null
                this.interactions.isUpdate = false;
            },
        },

    }
</script>

<style scoped>


    /* NEW CALENDAR WE PLACES */

    .slot-text{
        display: block;
        height: 12px;
        font-weight: 400;
    }

    .teste{
        overflow-y: auto;
        max-height: 400px;
    }

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
        padding: 4px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        color: #2C3E54;
    }

    .col-wp-calendar-month {
        width: 33.332%;
        background-color: #F2F2F2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        color: #2C3E54;
        cursor: pointer;
    }

    .calendar-header {
        background: #FA8A3D;
        display: flex;
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

    .selected-slot {
        background-color: #fff !important;
        color: #00A369 !important;
        border:1px solid #00A369 !important;
    }

    .selected-slot:hover {
        color: #00A369 !important;
    }

</style>
