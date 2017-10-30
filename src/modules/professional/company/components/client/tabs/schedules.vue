<template>

   <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/calendar.png" alt="">
                <h3 class="f-300">Agendamentos</h3>
            </div>
        </div>

       <div class="container">
           <div class="row">
               <div class="col-md-12 col-xs-12">
                   <div class="card">
                       <div class="card-header ch-alt text-center">
                           <h4 class="f-300 m-0">Alterar data</h4>
                       </div>
                       <div class="card-body card-padding">

                           <div class="row">
                               <div class="col-md-6 col-xs-12">
                                   <div class="form-group">
                                       <label for="single-schedules-invit">Data de:</label>
                                       <datepicker
                                           id="single-schedules-invit"
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
                                       <label for="single-schedules.end">Data até:</label>
                                       <datepicker
                                           id="single-schedules.end"
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
                               <button class="btn btn-info btn-sm btn-block m-t-10" @click="getSchedules()">Buscar</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>


        <div class="container">
            <button class="btn btn-success btn-block " @click.prevent="handleAddNewSingleSchedule">
                Adicionar agendamento avulso
            </button>
        </div>


        <div class="container m-t-30">

            <card-placeholder
                v-if="placeholder"
                :onlyHeader="true"
                :onlyHeaderNoImage="true"
                :onlyHeaderOpened="true"
                :cols="'col-xs-12 col-sm-4'"
            >
            </card-placeholder>

            <p class="text-center" v-if="!schedules.length">Nenhum agendamento encontrado</p>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(schedule, index) in schedules">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4>{{schedule.date}}</h4>
                            <p><strong>{{schedule.time}}</strong></p>

                            <span class="label p-5 p-l-15 p-r-15 label-primary"> {{schedule.category.name}}</span>

                        </div>

                        <div class="card-body text-center card-padding">

                            <div class="col-md-12 col-xs-12 m-b-20">
                                <span v-if="schedule.is_trial" class="label p-5 p-l-15 p-r-15 label-primary">Aula experimental</span>
                                <span v-if="!schedule.is_confirmed && !schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-default">Aguardando</span>
                                <span v-if="schedule.is_confirmed && !schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-success">Realizado</span>
                                <span v-if="!schedule.is_confirmed && schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-danger">Cancelado</span>
                            </div>

                            <div class="col-md-12 col-xs-12 m-b-20">
                                <span v-if="schedule.is_single" class="label p-5 p-l-15 p-r-15 label-info">Agendamento avulso</span>
                            </div>

                            <button v-if="!schedule.is_single"
                                    type="button"
                                    class="btn btn-info btn-sm btn-block"
                                    @click="handleShowSchedule(schedule.id)"
                                    :disabled="!schedule.id"
                            >
                                Visualizar agendamento
                            </button>
                            <button v-if="schedule.is_single"
                                    type="button"
                                    class="btn btn-info btn-sm btn-block"
                                    @click="handleShowSingleSchedule(schedule.id)"
                            >
                                Visualizar agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12" v-show="schedules.length">
                <div class="text-center">
                    <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                </div>
            </div>
        </div>


        <!-- Trial schedule -->
        <div class="modal" id="modal-trial-schedule" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Nova agendamento</h4>
                    </div>
                    <div class="modal-body">
                        <p>Selecione a data para o agendamento</p>
                        <div class="form-group">
                            <label>Data</label>
                            <datepicker input-class="form-control" :language="'pt-br'"
                                        :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                        v-model="newSingleSchedule.date" @selected="handleNewSingleScheduleDate"></datepicker>
                        </div>

                        <div class="form-group" v-if="newDateSelected">
                            <label>Especialidade</label>
                            <multiselect
                                v-model="selectedCategory"
                                :options="categories"
                                :multiple="false"
                                placeholder="Selecione a especialidade"
                                label="name"
                                track-by="id"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desmarcar"
                                selectedLabel="Selecionado"
                                @input="setCategory">

                            </multiselect>
                        </div>

                        <div class="form-group" v-if="selectedCategory && selectedCategory.is_professional_scheduled">
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
                                @input="setSingleScheduleProfessional">

                            </multiselect>
                        </div>

                        <div class="form-group" v-if="selectedCategory && selectedCategory.is_professional_scheduled && professionalSelected">
                            <label>Selecione o horário</label>

                            <span v-if="!selectedProfessional.slots.length">Este profissional não possui horários para o dia selecionado.</span>
                            <span v-if="selectedProfessional.slots.length">Horários disponíveis</span><br>

                            <button class="btn btn-success btn-block btn-sm m-b-10" @click.prevent="setNewSingleScheduleslot(slot)"
                                    :class="{'selected-slot': selectedSlot === slot}"
                                    v-for="slot in selectedProfessional.slots">
                                <span >{{slot.init}}</span>
                                <span class="pull-right badge">{{slot.schedules_count}}</span>
                            </button>
                        </div>

                        <div class="form-group" v-if="selectedCategory && !selectedCategory.is_professional_scheduled">
                            <label>Selecione o horário</label>

                            <span v-if="!category_slot_workdays.slots.length">Este categoria não possui horários para o dia selecionado.</span>
                            <span v-if="category_slot_workdays.slots.length">Horários disponíveis</span><br>

                            <button class="btn btn-success btn-block btn-sm m-b-10" @click.prevent="setNewSingleScheduleslot(slot)"
                                    :class="{'selected-slot': selectedSlot === slot}"
                                    v-for="slot in category_slot_workdays.slots">
                                <span >{{slot.init}}</span>
                                <span class="pull-right badge">{{slot.schedules_count}}</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <label>Aula experimental?</label><br>
                            <p>
                                {{newSingleSchedule.is_trial ? 'Sim' : 'Não'}}</p>
                            <label class="switch">
                                <input type="checkbox" v-model="newSingleSchedule.is_trial">
                                <div class="slider round"></div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>Observação (opcional)</label>
                            <textarea type="text" class="form-control" v-model="newSingleSchedule.observation" placeholder="Insira uma observação"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" @click.prevent="cancelAddNewSingleSchedule">Cancelar</button>
                        <button class="btn btn-info" @click.prevent="saveNewSingleSchedule()" :disabled="!selectedSlot">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Trial schedule -->

   </div>

</template>

<script>

    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)
    import Multiselect from 'vue-multiselect'

    import {cleanSingleSchedule} from '@/models/SingleSchedule'
    import {mapGetters, mapActions} from 'vuex'

    export default{
        name: 'company-client-schedules',
        components: {
            Datepicker: require('vuejs-datepicker'),
            Multiselect,
            pagination: require('@/components/pagination.vue'),
            cardPlaceholder: require('@/components/card-placeholder.vue')

        },
        props: ['client'],
        data(){
        	return {
                categories: [],
                newSingleSchedule: cleanSingleSchedule(),
                professionalSelected: false,
                selectedSlot: null,
                selectedCategory: null,
                selectedProfessional: null,
                newDateSelected: false,
                professionals_calendar_settings: [],
                category_calendar_settings: [],
                slot_workdays:[],
                init: moment().startOf('month').toDate(),
                end: moment().add(1, 'months').startOf('month').toDate(),
                placeholder: true,
                schedules: [],
                pagination: {},
                category_slot_workdays:{
                    slots:[]
                },

            }
        },
        computed: {
            ...mapGetters(['AuthToken', 'currentUser', 'currentCompany']),
        },
        mounted: function(){
            let that = this

            this.getSchedules()
            this.getCompany()


        },
        methods: {

            ...mapActions(['disableLoader', 'setLoading', 'setCurrentCompany']),

            getCompany: function(){
                let that = this

                that.disableLoader(true)

                that.$http.get(`professional/company/show/${that.$route.params.company_id}`)
                    .then(function (response) {

                        that.company = response.data.company;
                        that.setCurrentCompany(response.data.company)

                        that.categories = that.currentCompany.categories

                        that.categories.map((category) => {
                            category.is_professional_scheduled = true

                            if(category.calendar_settings){
                                category.is_professional_scheduled = category.calendar_settings.is_professional_scheduled
                            }
                        })

                        that.disableLoader(false)
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.disableLoader(false)
                    });
            },

            handleAddNewSingleSchedule(){
                let that = this

                that.newSingleSchedule.company_id  = that.$route.params.company_id
                that.newSingleSchedule.client_id  = that.$route.params.client_id
                that.newSingleSchedule.date  =  moment().toDate()
                that.newDateSelected = true

                $('#modal-trial-schedule').modal('show')
            },

            setCategory(selected){
                let that = this

                that.selectedProfessional = {}
                that.professionalSelected = false
                that.selectedSlot = null

                if(selected){
                    this.newSingleSchedule.category_id = selected.id
                    this.selectedCategory = selected

                   if(selected.is_professional_scheduled){
                       that.searchProfessionalForSingleSchedule()
                   }

                    if(!selected.is_professional_scheduled){
                        that.getCategoryCalendarSettings()
                    }
                }

                if(!selected){
                    this.newSingleSchedule.category_id = null
                    this.selectedCategory = null
                }
            },

            handleNewSingleScheduleDate(selected){
                let that = this

                that.selectedProfessional = {}
                that.professionalSelected = false
                that.selectedSlot = null;
                that.selectedCategory = null

                let date = moment(selected)

                that.newSingleSchedule.date = moment(that.newSingleSchedule.date, 'DD/MM/YYYY').toDate()

                this.newDateSelected = true;
            },

            saveNewSingleSchedule(){
                let that = this
                that.newSingleSchedule.date = moment(that.newSingleSchedule.date).format('DD/MM/YYYY')

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('professional/company/single_schedule/store', that.newSingleSchedule)
                    .then(function (response) {

                        that.schedules.unshift(response.data.single_schedule)

                        successNotify('', 'Agendamento adicionado com sucesso.')

                        that.cancelAddNewSingleSchedule()

                        $('#modal-trial-schedule').modal('hide')

                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {
                        console.log(error)

                        that.setLoading({is_loading: false, message: ''})
                    });
            },

            cancelAddNewSingleSchedule(){

                let that = this

                that.selectedProfessional = {}
                that.professionalSelected = false
                that.selectedSlot = null;
                that.selectedCategory = null
                that.newDateSelected = false
                that.newSingleSchedule = cleanSingleSchedule()
            },

            setSingleScheduleProfessional(){
                this.newSingleSchedule.professional_id = this.selectedProfessional.id
                this.professionalSelected = true
            },

            searchProfessionalForSingleSchedule(){
                let that = this

                let date = moment(that.newSingleSchedule.date)

                let data = {
                    company_id: that.newSingleSchedule.company_id,
                    category_id: that.newSingleSchedule.category_id,
                    date: date.format('YYYY-MM-DD')
                }

                this.getProfessionalCalendarSettings(data, date.day())
            },

            setNewSingleScheduleslot(slot){
                let that = this

                that.selectedSlot = slot

                that.newSingleSchedule.professional_id = slot.professional_id
                that.newSingleSchedule.time = slot.init
            },

            getProfessionalCalendarSettings(data, dow){
                let that = this
                that.setLoading({is_loading: true, message: ''})
                that.$http.post('professional/company/professional/calendar_settings/to_reschedule',data)
                    .then(function (response) {
                        that.professionals_calendar_settings = response.data.professional_calendar_settings

                        that.handleProfessionalsAvaiableWorkdays(dow)

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
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
                            workday.schedules_count = 0


                            calendar_settings.schedules.map((schedule) => {
                                let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                                if (workday.init == schedule_init ) {
                                    workday.schedules_count++
                                }
                            })

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

            getSchedules(){
                let that = this

                let data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.$route.params.client_id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }

                that.placeholder = true;
                that.$http.post('professional/company/client/schedules/list',data)
                    .then(function (response) {

                        that.schedules = response.data.schedules;
                        that.pagination = response.data.pagination;

                        that.placeholder = false;

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            navigate(page) {
                let that = this

                let data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.$route.params.client_id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    page: page
                }
                that.placeholder = true;

                that.$http.post('professional/company/client/schedules/list', data)
                    .then(function (response) {
                        that.schedules = response.data.schedules;
                        that.pagination = response.data.pagination;

                        that.placeholder = false;

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleShowSingleSchedule(schedule_id) {
                let that = this

                that.$router.push({
                    name: 'admin.companies.calendar.show.single-schedule',
                    params: {
                        company_id: that.$route.params.company_id,
                        single_schedule_id: schedule_id
                    }
                })
            },

            handleShowSchedule(schedule_id) {
                let that = this

                that.$router.push({
                    name: 'admin.companies.calendar.show.schedule',
                    params: {
                        company_id: that.$route.params.company_id,
                        schedule_id: schedule_id
                    }
                })
            },

            getCategoryCalendarSettings(){

                let that = this

                let date = moment(that.newSingleSchedule.date)

                let data = {
                    company_id: that.newSingleSchedule.company_id,
                    category_id: that.newSingleSchedule.category_id,
                    date: date.format('YYYY-MM-DD')
                }


                that.setLoading({is_loading: true, message: ''})
                that.$http.post('professional/company/category/calendar_settings/to_reschedule', data)
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

                let schedule_date = moment(that.newSingleSchedule.date)

                let is_unavaiable = false

                let slots = that.category_calendar_settings.workdays.filter((workday) => workday.dow === schedule_date.day())

                if(that.category_calendar_settings.unavailable_dates_range){
                    that.category_calendar_settings.unavailable_dates_range.map((range) => {

                        let dateRange = moment().range(range.from, range.to)

                        is_unavaiable = dateRange.contains(schedule_date)

                    })
                }

                slots.map((slot) => {
                    slot.schedules = [],
                        slot.is_unavaiable = is_unavaiable
                        slot.schedules_count = 0
                })

                that.category_calendar_settings.schedules.map((schedule) => {

                    let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                    let slot_index = _.findIndex(slots, {init: schedule_init})

                    if(slot_index > -1){
                        slots[slot_index].schedules.push(schedule)
                        slots[slot_index].schedules_count++
                    }
                })

                that.category_slot_workdays = {
                    professional:  null,
                    category:  that.category_calendar_settings.category,
                    slots: slots
                }

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
