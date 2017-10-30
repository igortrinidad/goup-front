<template>

    <div class="container m-t-30">
        <div class="first-container">
            <main-header
                :type="'center'"
                :title="'Agenda'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

            <div class="container m-b-30">
                <h3 class="f-300 m-0 text-center">{{ selectedCategory.name }}</h3>
            </div>
            <div class="container container-calendar">
                <div class="row">
                    <div class="col-md-6 col-md-offset-6 m-b-20">
                        <div class="btn-group">
                            <button class="btn btn-light" :class="{'active': calendarView == 'month'}" @click.prevent="setCalendarView('month')">Mês</button>
                            <button class="btn btn-light" :class="{'active': calendarView == 'week'}" @click.prevent="setCalendarView('week')">Semana</button>
                        </div>
                    </div>
                </div>

               <!--Month View-->
                <calendar @slot-selected="handleSlotDay" :schedules.sync="monthSchedules" @month-changed="getSchedules" v-if="calendarView == 'month'"></calendar>
               <!--Month View-->

              <!--Week View-->
                <calendar-week :schedules.sync="monthSchedules" v-if="calendarView == 'week'" @week-changed="getSchedules" @slot-selected="handleSlotDay"></calendar-week>
              <!--Week View-->


            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import calendar from '@/components/calendar.vue'
    import calendarWeek from '@/components/calendar-week.vue'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    export default {
        name: 'company-calendar-show',
        components: {
            mainHeader,
            calendar,
            calendarWeek
        },
        data() {
            return {
                schedules: [],
                day_schedules: [],
                day_info: {
                    date: ''
                }
            }
        },
        computed: {
            ...mapGetters(['selectedCategory', 'currentUser', 'monthSchedules', 'calendarView'])
        },
        mounted() {
            if (_.isEmpty(this.selectedCategory)) {
                this.$router.push({name: 'admin.companies.show', params: {company_id: this.$route.params.company_id}})
            }

        },

        methods: {
            ...mapActions(['setSelectedDaySchedules', 'setMonthSchedules', 'setCalendarView', 'setCategoryCalendarSettings', 'setLoading']),

            handleSlotDay(payload) {
                let that = this

                that.day_info.date = payload.date.format('DD/MM/YYYY')

                let selected_dow = payload.date.day()

                that.day_schedules = []

                that.monthSchedules.map((data) => {

                    data = _.cloneDeep(data)

                    if(data.professional){
                        data.unavailable_dates_range.map((range) => {
                            let dateRange = moment().range(range.from, range.to)

                            data.professional.is_unavaiable = data.professional.is_unavaiable ? data.professional.is_unavaiable : dateRange.contains( payload.date)
                        })

                        data.professional.workdays = data.workdays.filter((workday) => workday.dow === selected_dow)
                        data.professional.schedules = data.schedules.filter((schedule) => schedule.date == payload.date.format('DD/MM/YYYY'))

                        that.day_schedules.push(data.professional)
                    }

                    if(!data.is_professional_scheduled && !data.professional){

                        data.workdays = data.workdays.filter((workday) => workday.dow === selected_dow)
                        data.schedules = data.schedules.filter((schedule) => schedule.date == payload.date.format('DD/MM/YYYY'))

                        that.day_schedules.push(data)
                    }
                })

                that.setSelectedDaySchedules(that.day_schedules )

                that.$router.push({
                    name: 'admin.companies.calendar.show.day',
                    params: {
                        company_id: that.$route.params.company_id,
                        category_slug: that.selectedCategory.slug,
                        day: payload.date.format('DD/MM/YYYY')
                    }
                })
            },

            getSchedules(payload) {
                let that = this
                that.setLoading({is_loading: true, message: ''})

                that.monthSchedules = [];

                let start = payload.start.clone().format('YYYY-MM-DD')
                let end = payload.end.clone().format('YYYY-MM-DD')

                that.$http.post('professional/company/schedule/calendar_list_new', {
                    company_id: that.$route.params.company_id,
                    category_id: that.selectedCategory.id,
                    start: start,
                    end: end
                })
                    .then(function (response) {

                        that.setMonthSchedules(response.data.schedules)
                        that.setCategoryCalendarSettings(response.data.category_calendar_settings)
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            }
        }
    }
</script>
<style scoped>
    .btn.btn-light{ font-weight: 400; }
    .btn.btn-light.active{
        color: #fff !important;
        background: #88C657;
        font-weight: 700;
        -webkit-box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.125)
    }
    .container-calendar{
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>
