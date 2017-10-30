<template>

    <div class="container m-t-30">
        <div class="first-container">
            <main-header
                :type="'center'"
                :title="`Dia ${$route.params.day}`"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

            <div class="container">

                <div class="card text-center" v-if="!daySchedules.length">
                    <div class="card-body card-padding">
                        <i class="d-block ion-sad-outline f-24"></i>
                        <span class="f-300">Não encontramos nenhum profissional ou especialidade com agenda para este dia.</span>
                        <router-link class="btn btn-info btn-block m-t-20" tag="button"
                                     :to="{name: 'admin.companies.calendar.show', params: {company_id: $route.params.company_id, category_slug: selectedCategory.slug}}">
                            Voltar para agenda
                        </router-link>
                    </div>
                </div>


                <h4 class="text-center f-300 m-b-30" v-if="daySchedules.length">
                    Selecione um profissional ou especialidade para verificar os agendamentos do dia
                </h4>

                <div class="card" v-for="(entity, entityIndex) in daySchedules">
                    <!-- Card Header -->
                    <div class="card-header ch-alt cursor-pointer" @click="toggleSelected(entity.id)">
                        <span class="f-300 f-22">
                            <span v-if="entity.full_name">{{entity.full_name}}</span>
                            <span v-if="!entity.full_name && entity.category">{{entity.category.name}}</span>
                            <span class="badge badge-primary">{{entity.schedules_count}}</span>
                        </span>

                        <!-- toggle button open and close card -->
                        <span class="control-header">
                        <i class="ion-ios-arrow-down f-22"
                           v-if="interactions.CardsOpened.indexOf(entity.id) < 0"></i>
                        <i class="ion-ios-arrow-up f-22"
                           v-if="interactions.CardsOpened.indexOf(entity.id) > -1"></i>
                    </span>
                        <!-- / toggle button open and close card -->
                    </div>
                    <!-- /Card Header -->

                    <!-- Card Body -->
                    <div
                        class="card-body card-padding"
                        v-if="interactions.CardsOpened.indexOf(entity.id) > -1"
                    >
                        <div
                            v-for="(workday, indexWorkday) in entity.workdays"
                            :class="{ 'border-inside-card': true, 'm-t-0': indexWorkday === 0, 'm-t-10': indexWorkday > 0  }"
                        >
                            <div class="row">
                                <div class="col-md-12 col-xs-12 text-center cursor-pointer"  @click.prevent="handleSelectedTime(entity.id, workday.init)">
                                    <i class="ion-ios-clock-outline f-26"></i>
                                    <h4 class="m-t-0 f-300 f-26">{{ workday.init }}</h4>

                                    <span class="btn btn-xs f-14"
                                        :class="workday.schedules.length ? 'btn-primary' : 'btn-default'"
                                    >
                                        <span v-if="workday.schedules.length">{{ handleTimeVisibility(entity.id, workday.init) ? 'Esconder' : 'Mostrar' }}</span>
                                        {{ workday.schedules.length ? workday.schedules.length : 'Nenhum' }}
                                        {{ workday.schedules.length > 1 ? 'agendamentos' : 'agendamento' }}
                                        <br>
                                    </span>

                                </div>
                            </div>

                            <div v-if="handleTimeVisibility(entity.id, workday.init)">

                                <!-- <p class="text-center f-300 f-danger" v-if="!workday.schedules.length">Nenhum agendamento para este horário</p> -->

                                <div v-for="(schedule, $index) in workday.schedules" class="border-inside-card gray m-5 m-t-10">

                                    <div class="row text-center">
                                        <div class="col-md-12 col-xs-12">

                                            <p class="m-b-0">Cliente</p>
                                            <h4 class="m-t-0 f-300">{{ schedule.client.full_name }}</h4>

                                        </div>
                                    </div>

                                    <div class="row text-center">
                                        <div class="col-md-12 col-xs-12">
                                            <span v-if="schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-info">Bloqueado</span>
                                            <span v-if="schedule.is_trial" class="label p-5 p-l-15 p-r-15 label-primary">Aula experimental</span>
                                            <span v-if="!schedule.is_confirmed && !schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-default">Aguardando</span>
                                            <span v-if="schedule.is_confirmed && !schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-success">Realizado</span>
                                            <span v-if="!schedule.is_confirmed && schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-danger">Cancelado</span>
                                        </div>
                                        <div class="col-md-12 col-xs-12 m-t-10">
                                            <button v-if="!schedule.is_single"
                                                type="button"
                                                class="btn btn-info btn-xs btn-block"
                                                @click="handleShowSchedule(schedule.id)"
                                                :disabled="!schedule.id"
                                            >
                                                Visualizar agendamento
                                            </button>
                                            <button v-if="schedule.is_single"
                                                type="button"
                                                class="btn btn-info btn-xs btn-block"
                                                @click="handleShowSingleSchedule(schedule.id)"
                                            >
                                                Visualizar agendamento
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                    <!-- /Card Body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import calendar from '@/components/calendar.vue'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'

    const moment = extendMoment(Moment)

    export default {
        name: 'company-calendar-show-day',
        components: {
            mainHeader,
            calendar
        },
        data() {
            return {
                interactions: {
                    rescheduler: false,
                    CardsOpened: [],
                    selectedTimesOpened: []
                },
                daySchedules:[],
                current_dow: '',
                reschudle_dow: '',
                professionals_calendar_settings: [],
                schedules:[],
                old_schedule_data: {},
                reschedule_data: {},
                selected_date: '',
                slot_workdays: [],
                selectedSlot: null
            }
        },
        computed: {
            ...mapGetters(['selectedCategory', 'currentUser', 'selectedDaySchedules', 'categoryCalendarSettings']),
        },
        mounted() {
            if (_.isEmpty(this.selectedCategory)) {
                this.$router.push({name: 'admin.companies.show', params: {company_id: this.$route.params.company_id}})
            }

            this.current_dow = moment(this.$route.params.day, 'DD/MM/YYYY').day()

            this.handleDaySchedules()

        },

        methods: {
            ...mapActions(['addOnMonthSchedules','addOnSelectedDaySchedules', 'removeFromMonthSchedules', 'removeFromSelectedDaySchedules']),

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

            handleSelectedTime(professional_id, time) {
                let that = this
                const index = _.findIndex(that.interactions.selectedTimesOpened, {professional_id: professional_id})
                if (index > -1) {
                    const time_index = that.interactions.selectedTimesOpened[index].times.indexOf(time);
                    if (time_index > -1) {
                        that.interactions.selectedTimesOpened[index].times.splice(time_index, 1)
                    } else {
                        that.interactions.selectedTimesOpened[index].times.push(time)
                    }
                } else {

                    that.interactions.selectedTimesOpened.push({professional_id: professional_id, times: [time]})

                }

            },

            handleTimeVisibility(professional_id, time) {

                let that = this

                const index = _.findIndex(that.interactions.selectedTimesOpened, {professional_id: professional_id})

                if (index > -1) {

                    const time_index = that.interactions.selectedTimesOpened[index].times.indexOf(time);

                    if (time_index > -1) {

                        return true

                    }

                }

                return false
            },

            handleDaySchedules() {
                let that = this

                let entities = []

                let schedules = _.cloneDeep(that.selectedDaySchedules)

                schedules.map((entity) => {

                    entity.schedules_count = 0

                    entity.workdays.map((workday) => {
                        workday.schedules = []
                        workday.is_unavaiable = entity.is_unavaiable
                    })

                    entity.schedules.map((schedule) => {
                        let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                        let workday_index = _.findIndex(entity.workdays, {init: schedule_init})

                        if (entity.workdays[workday_index]) {
                            entity.workdays[workday_index].schedules.push(schedule)
                            entity.schedules_count++
                        }else{

                            let workday_index = _.findIndex(entity.workdays, {init: schedule_init})

                            if(workday_index > -1){
                                entity.workdays[workday_index].schedules.push(schedule)
                                entity.schedules_count++
                            }else{

                                let workday = {
                                    init: schedule_init,
                                    dow: moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').day(),
                                    schedules: [],
                                    workday_changed: true
                                }

                                workday.schedules.push(schedule)
                                entity.schedules_count++

                                entity.workdays.push(workday)
                            }
                        }
                    })

                    entity.workdays = _.orderBy(entity.workdays,['init'],['asc'])

                    delete entity.schedules

                    entities.push(entity)

                });

                entities = _.orderBy(entities, ['name'], ['asc'])

                that.daySchedules = entities
            },


            toggleSelected(entity_id) {
                const index = this.interactions.CardsOpened.indexOf(entity_id);

                if (index > -1) {
                    this.interactions.CardsOpened.splice(index, 1)
                } else {
                    this.interactions.CardsOpened.push(entity_id)
                }
            }

        }
    }
</script>
<style scoped>

</style>
