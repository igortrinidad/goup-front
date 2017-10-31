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

                <div class="text-center" v-if="!schedulesByCompany.length">
                    <i class="d-block ion-sad-outline f-24"></i>
                    <span class="f-300">Não encontramos nenhuma empresa com agenda para este dia.</span>
                    <router-link
                        class="btn btn-info btn-block m-t-20" tag="button"
                        :to="{name: 'admin.professional.dashboard'}"
                    >
                        Voltar para agenda
                    </router-link>
                </div>

                <h4 class="text-center f-300 m-b-30" v-if="schedulesByCompany.length">
                    Selecione uma empresa para verificar os agendamentos do dia
                </h4>

                <card-placeholder v-if="placeholder" :onlyHeader="true" :onlyHeaderNoImage="true">
                </card-placeholder>

                <div class="card" v-if="!placeholder" v-for="(company, companyIndex) in schedulesByCompany">
                    <!-- Card Header -->
                    <div class="card-header ch-alt cursor-pointer text-center">
                        <h4 class="f-300 f-22">{{company.name}}
                            <span class="badge badge-primary badge-cat">{{company.schedules_total}}</span>
                        </h4>

                    </span>
                        <!-- / toggle button open and close card -->
                    </div>
                    <!-- /Card Header -->

                    <!-- Card Body -->
                    <div class="card-body card-padding">

                        <div
                            v-for="(category, indexCat) in company.categories"
                            :class="{ 'm-t-0': indexCat === 0, 'm-t-10': indexCat > 0  }"
                        >

                            <!-- schedule by category -->
                            <div
                                v-for="(workday, indexWorkday) in category.workdays"
                                :class="{ 'border-inside-card': true, 'm-t-0': indexWorkday === 0, 'm-t-10': indexWorkday > 0  }"
                            >
                                <div class="row">
                                    <div class="col-md-12 col-xs-12 text-center" @click="interactions.workdaysOpened.toggleSelected(workday.init)">
                                        <i class="ion-ios-clock-outline f-26"></i>
                                        <h4 class="m-t-0 f-300 f-26">{{ workday.init }}</h4>
                                        <span class="btn btn-xs f-14"
                                            :class="workday.schedules.length ? 'btn-primary' : 'btn-default'"
                                        >
                                            <span v-if="workday.schedules.length">{{ interactions.workdaysOpened.indexOf(workday.init) > -1 ? 'Esconder' : 'Mostrar' }}</span>
                                            {{ workday.schedules.length ? workday.schedules.length : 'Nenhum' }}
                                            {{ workday.schedules.length > 1 ? 'agendamentos' : 'agendamento' }}
                                            <br>
                                        </span>
                                    </div>
                                </div>

                                <div v-if="interactions.workdaysOpened.indexOf(workday.init) > -1">

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
                            <!-- schedule by category -->
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
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import calendar from '@/components/calendar.vue'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'

    const moment = extendMoment(Moment)

    export default {
        name: 'admin-professional-calendar-day',
        components: {
            mainHeader,
            calendar,
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    rescheduler: false,
                    companiesCardsOpened: [],
                    selectedTimesOpened: [],
                    categoriesCardsOpened: [],
                    workdaysOpened: []
                },
                placeholder: true,
                schedulesByCompany: [],
                current_dow: '',
                reschudle_dow: '',
                professionals_calendar_settings: [],
                schedules: [],
                old_schedule_data: {},
                reschedule_data: {},
                selected_date: '',
                slot_workdays: [],
                selectedSlot: null
            }
        },
        computed: {
            ...mapGetters(['selectedCategory', 'currentUser', 'selectedDaySchedules']),
        },
        mounted() {

            this.current_dow = moment(this.$route.params.day, 'DD/MM/YYYY').day()

            this.placeholder = true
            this.getShedulesByCompany()

        },

        methods: {
            ...mapActions(['addOnCompanyMonthSchedules', 'addOnCompanySelectedDaySchedules', 'removeFromCompanyMonthSchedules', 'removeFromCompanySelectedDaySchedules']),

            handleShowSchedule(schedule_id) {
                let that = this

                that.$router.push({
                    name: 'admin.professional.dashboard.schedule.show',
                    params: {
                        day: that.$route.params.day,
                        schedule_id: schedule_id
                    }
                })
            },

            handleShowSingleSchedule(schedule_id) {
                let that = this

                that.$router.push({
                    name: 'admin.professional.dashboard.single-schedule.show',
                    params: {
                        day: that.$route.params.day,
                        single_schedule_id: schedule_id
                    }
                })
            },

            getShedulesByCompany() {

                let that = this

                let companies = []

                let schedules = _.cloneDeep(that.selectedDaySchedules)

                schedules.map((company) => {

                    let new_company_object = {
                        id: company.id,
                        name: company.name,
                        schedules_total: 0,
                        categories: []
                    }

                    let category_index = _.findIndex(new_company_object.categories, {id: company.category.id})

                    if (category_index < 0) {
                        company.category.workdays = company.workdays

                        company.category.schedules_count = 0

                        company.category.workdays.map((workday) => {
                            workday.schedules = []
                        })

                        company.schedules.map((schedule) => {
                            let schedule_init = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')

                            let workday_index = _.findIndex(company.workdays, {init: schedule_init})

                            if (company.category.workdays[workday_index]) {
                                company.category.workdays[workday_index].schedules.push(schedule)
                                company.category.schedules_count++
                            } else {

                                let workday_index = _.findIndex(company.workdays, {init: schedule_init})

                                if (workday_index > -1) {
                                    company.category.workdays[workday_index].schedules.push(schedule)
                                    company.category.schedules_count++
                                } else {

                                    let workday = {
                                        init: schedule_init,
                                        dow: moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss').day(),
                                        schedules: [],
                                        workday_changed: true
                                    }

                                    workday.schedules.push(schedule)
                                    company.category.schedules_count++

                                    company.category.workdays.push(workday)
                                }
                            }
                        })

                        company.category.workdays = _.orderBy(company.workdays, ['init'], ['asc'])

                        delete company.schedules

                        new_company_object.schedules_total += company.category.schedules_count
                        new_company_object.categories.push(company.category)
                    } else {
                        console.log('categoria ja existe')
                    }


                    let company_index = _.findIndex(companies, {id: company.id})

                    if (company_index < 0) {
                        companies.push(new_company_object)
                    } else {
                        companies[company_index].schedules_total += company.category.schedules_count
                        companies[company_index].categories.push(company.category)
                    }

                });

                companies = _.orderBy(companies, ['schedules_total'], ['desc'])

                that.schedulesByCompany = companies
                setTimeout(() => {
                    that.placeholder = false
                }, 200);
            },


            toggleSelectedCompany(company_id) {
                const index = this.interactions.companiesCardsOpened.indexOf(company_id);

                if (index > -1) {
                    this.interactions.companiesCardsOpened.splice(index, 1)
                } else {
                    this.interactions.companiesCardsOpened.push(company_id)
                }
            },


            toggleSelectedCategory(category_id) {
                const index = this.interactions.categoriesCardsOpened.indexOf(category_id);

                if (index > -1) {
                    this.interactions.categoriesCardsOpened.splice(index, 1)
                } else {
                    this.interactions.categoriesCardsOpened.push(category_id)
                }
            }

        }
    }
</script>
<style scoped>

    .badge-cat {
        position: relative;
        top: -3px;
        margin-left: 5px;
    }

</style>
