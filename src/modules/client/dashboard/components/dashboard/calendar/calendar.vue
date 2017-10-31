<template>

    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/calendar.png" alt="">
                <h4 class="f-300">Agenda</h4>
            </div>

            <div class="row">
                <div class="col-md-6 col-md-offset-6 m-b-20">
                    <div class="btn-group">
                        <button class="btn btn-light" :class="{'active': calendarView == 'month'}" @click.prevent="setCalendarView('month')">Mês</button>
                        <button class="btn btn-light" :class="{'active': calendarView == 'week'}" @click.prevent="setCalendarView('week')">Semana</button>
                    </div>
                </div>
            </div>

            <!--Month View-->
            <calendar @slot-selected="handleSlotDay" :schedules.sync="clientMonthSchedules" @month-changed="getSchedules" v-if="calendarView == 'month'"></calendar>
            <!--Month View-->

            <!--Week View-->
            <calendar-week :schedules.sync="clientMonthSchedules" v-if="calendarView == 'week'" @week-changed="getSchedules" @slot-selected="handleSlotDay" :is-client="true"></calendar-week>
            <!--Week View-->
        </div>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import calendar from '@/components/calendar.vue'
    import calendarWeek from '@/components/calendar-week.vue'

    export default{
        name: 'client-dashboard-calendar',
        components:{
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
            ...mapGetters(['selectedCategory', 'currentUser', 'clientMonthSchedules', 'calendarView'])
        },
        mounted() {
            //Init as week view
            this.setCalendarView('month')
        },

        methods: {
            ...mapActions(['setClientSelectedDaySchedules', 'setClientMonthSchedules', 'setLoading', 'setCalendarView']),

            handleSlotDay(payload) {
                let that = this

                that.day_info.date = payload.date.format('DD/MM/YYYY')

                let selected_dow = payload.date.day()

                that.day_schedules = []

                that.clientMonthSchedules.map((data) => {

                    let new_data = _.cloneDeep(data)

                    new_data.schedules = data.schedules.filter((schedule) => schedule.date == payload.date.format('DD/MM/YYYY'))

                    that.day_schedules.push(new_data)
                })

                that.setClientSelectedDaySchedules(that.day_schedules)

                that.$router.push({
                    name: 'client.dashboard.calendar.day',
                    params: {day: payload.date.format('DD/MM/YYYY')
                    }
                })
            },

            getSchedules(payload) {
                let that = this

                let start = payload.start.clone().format('YYYY-MM-DD')
                let end = payload.end.clone().format('YYYY-MM-DD')

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('client/calendar/list', {
                    start: start,
                    end: end
                })
                    .then(function (response) {

                        that.setClientMonthSchedules(response.data.schedules)

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
</style>
