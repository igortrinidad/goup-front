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
                <div class="card p-10">
                    <div class="card-body">
                        <div class="text-center"  v-if="!clientSchedules.length">
                            <i class="d-block ion-sad-outline f-24"></i>
                            <span class="f-300">Não encontramos nenhuma agendamento para este dia.</span>
                            <router-link
                                class="btn btn-info btn-block m-t-20" tag="button"
                                :to="{name: 'client.dashboard', params:{client_id: currentUser.id}}"
                            >
                                Voltar para agenda
                            </router-link>
                        </div>

                        <div
                            v-for="(workday, indexWorkday) in clientSchedules"
                            :class="{ 'border-inside-card': true, 'm-t-0': indexWorkday === 0, 'm-t-10': indexWorkday > 0  }"
                        >

                            <p class="text-center f-300 f-danger" v-if="!workday.schedules.length">Nenhum agendamento para este horário</p>

                            <div class="row">
                                <div class="col-md-12 col-xs-12 text-center">
                                    <i class="ion-ios-clock-outline f-26"></i>
                                    <h4 class="m-t-0 f-300 f-26">{{ workday.init }}</h4>
                                </div>

                            </div>

                            <div
                                v-for="(schedule, $index) in workday.schedules"
                                class="border-inside-card gray m-5 m-t-15"
                            >

                                <div class="row text-center">
                                    <div class="col-md-12 col-xs-12">

                                        <p class="m-b-0">Empresa</p>
                                        <h4 class="m-t-0 f-300">{{schedule.company.name}}</h4>

                                        <div v-if="schedule.category">
                                            <p class="m-b-0">Especialidade</p>
                                            <h4 class="m-t-0 f-300">{{schedule.category.name}}</h4>
                                        </div>

                                        <div v-if="schedule.professional">
                                            <p class="m-b-0">Profissional</p>
                                            <h4 class="m-t-0 f-300">{{schedule.professional.full_name}}</h4>
                                        </div>

                                    </div>
                                </div>

                                <div class="row text-center">
                                    <div class="col-md-12 col-xs-12">
                                        <span v-if="schedule.is_trial" class="label p-5 p-l-15 p-r-15 label-primary">Aula experimental</span>
                                        <span v-if="!schedule.is_confirmed && !schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-default">Aguardando</span>
                                        <span v-if="schedule.is_confirmed && !schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-success">Realizado</span>
                                        <span v-if="!schedule.is_confirmed && schedule.is_canceled && !schedule.is_fake" class="label p-5 p-l-15 p-r-15 label-danger">Cancelado</span>
                                    </div>
                                    <div class="col-md-12 col-xs-12 m-t-10">
                                        <router-link
                                            v-if="!schedule.is_single"
                                            tag="button"
                                            :to="{ name: 'client.dashboard.calendar.show.schedule', params: { schedule_id: schedule.id } }"
                                            class="btn btn-info btn-sm btn-block"
                                        >
                                            Visualizar agendamento
                                        </router-link>
                                        <router-link
                                            v-if="schedule.is_single"
                                            tag="button"
                                            :to="{ name: 'client.dashboard.calendar.show.single-schedule', params: { single_schedule_id: schedule.id } }"
                                            class="btn btn-info btn-sm btn-block"
                                        >
                                            Visualizar agendamento
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        name: 'client-dashboard-calendar-day',
        components: {
            mainHeader,
            calendar
        },
        data() {
            return {
                interactions: {
                    rescheduler: false,
                    companiesCardsOpened: [],
                    selectedTimesOpened: [],
                    workdaysOpened: []
                },
                clientSchedules:[],
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
            ...mapGetters(['selectedCategory', 'currentUser', 'clientSelectedDaySchedules']),
        },
        mounted() {

            this.current_dow = moment(this.$route.params.day, 'DD/MM/YYYY').day()

            this.getShedulesByCompany()

        },

        methods: {
            ...mapActions(['addOnClientMonthSchedules','addOnClientSelectedDaySchedules', 'removeFromClientMonthSchedules', 'removeFromClientSelectedDaySchedules']),

            getShedulesByCompany() {
                let that = this

                let companies = []

                let schedules = _.cloneDeep(that.clientSelectedDaySchedules)

                let workdays = []
                schedules.map((company) => {

                    let company_data = _.cloneDeep(company)

                    delete company_data.schedules

                    company.schedules.map((schedule) => {
                        schedule.company = company_data
                        let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                        let workday_index = _.findIndex(workdays, {init: schedule_init})

                        if(workday_index == -1){
                            let work_day = {
                                init: schedule_init,
                                schedules:[]
                            }
                            work_day.schedules.push(schedule)

                            workdays.push(work_day)


                        }else{
                            workdays[workday_index].schedules.push(schedule)
                        }
                    })
                });

                workdays = _.orderBy(workdays, ['init'], ['asc'])

                that.clientSchedules = workdays
            },


            toggleSelectedCompany(company_id) {
                const index = this.interactions.companiesCardsOpened.indexOf(company_id);

                if (index > -1) {
                    this.interactions.companiesCardsOpened.splice(index, 1)
                } else {
                    this.interactions.companiesCardsOpened.push(company_id)
                }
            },

        }
    }
</script>
<style scoped>

</style>
