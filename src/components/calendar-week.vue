<template>

    <div class="container">
        <div class="row">
            <div class="col-sm-12 container-calendar">
                <div class="card">
                    <!-- Card Header -->
                    <div class="card-header ch-alt m-b-10">
                        <h2 class="f-400 text-center" v-if="current_month">{{ current_month | moment('YYYY') }}</h2>
                    </div>
                    <!-- / Card Header -->

                    <!-- Card Body -->
                    <div class="card-body container-calendar">
                        <!-- Calendar Header -->
                        <div class="calendar-header container-calendar">
                            <div class="col-xs-6">
                                <h3 class="title m-b-20 m-l-5 f-300" v-if="current_month">
                                    {{ current_month | moment('MMMM') }}</h3>
                            </div>
                            <div class="col-xs-6">
                                <div class="text-right">
                                    <button
                                        class="btn btn-transparent f-24"
                                        title="Semana Anterior"
                                        @click.prevent="handlePrevWeek"
                                    >
                                        <i class="ion-ios-arrow-thin-left"></i>
                                    </button>
                                    <button
                                        class="btn btn-transparent f-24"
                                        title="Proxima Semana"
                                        @click.prevent="handleNextWeek"
                                    >
                                        <i class="ion-ios-arrow-thin-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- / Calendar Header -->
                        <!-- Calendar Content -->
                        <div class="row text-center m-0">
                            <div class="col-md-12 col-xs-12 col-lg-12 container-calendar">
                                <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12 container-calendar"
                                     :class="{
                                        'unavaiable': day.is_unavaiable && day.category_professionals == day.unavaiable_professionals,
                                        'not-current-month': current_month.format('MM/YYYY') !== day.date.format('MM/YYYY'),
                                        'today':  day.date.format('DD/MM') ===  today.format('DD/MM')
                                    }"
                                >
                                    <span class="badge-calendar-counter">{{day.schedules_count}}</span>
                                    <span class="t-overflow">
                                    {{ day.label}}
                                    <br>
                                    {{day.date | moment('DD')}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row text-center m-0">
                            <div class="col-md-12 col-xs-12 col-lg-12  container-calendar">
                                <div v-for="(day, indexDay) in week_days" class="col-wp-calendar col-xs-12 container-calendar">
                                    <span v-if="!day.slots.length">--</span>
                                    <span v-for="(slot, indexSlot) in day.slots">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <span class="label label-default d-block m-b-5 t-overflow cursor-pointer slot-hover"
                                                      :class="{'slot-today':  day.date.format('DD/MM') ===  today.format('DD/MM')}"
                                                      @click="selectSlot(day.date, slot)">

                                                    <span class="slot-text m-b-10 m-t-25 f-14 f-300">{{slot.init}}</span>
                                                     <span class="badge-calendar-wp">{{slot.schedules_count}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- / Calendar Content -->
                    </div>
                    <!-- / Card Body -->
                </div>
            </div>
        </div>
    </div>


</template>

<script>


    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'

    const moment = extendMoment(Moment)

    export default {
        name: 'calendar-workdays',
        props: {
            schedules: {
                type: Array,
                twoWay: false
            },

            isClient: {
                default: false,
                type: Boolean
            },
        },
        components: {
            mainHeader,
        },
        data() {
            return {
                week_days: [],
                current_month: null,
                today: moment()
            }
        },
        watch: {
            schedules(val, oldVal) {
                let that = this

                if (val.length) {
                   if(!that.isClient){
                       that.handleSchedules();
                   }

                    if(that.isClient){
                        that.handleSchedulesClient();
                    }
                }
            }
        },
        mounted() {

            this.$nextTick(() => {
                this.current_month = moment('05:00:00', 'HH:mm:ss');
                this.checkWeekDays();
            })
        },
        computed: {
            ...mapGetters(['AuthToken']),
        },
        methods: {

            ...mapActions(['disableLoader']),

            checkWeekDays: function () {
                let that = this

                var first_day_of_cal = moment(this.current_month).startOf('week').add(5, 'hours');

                var last_day_of_cal = moment(this.current_month).endOf('week').subtract(5, 'hours');

                that.week_days = [];

                for (var m = first_day_of_cal; m.isBefore(last_day_of_cal); m.add(1, 'days')) {

                    that.week_days.push(
                        {
                            dow: m.day(),
                            date: m.clone(),
                            label: m.format('dddd').substring(0, 3),
                            schedules_count: 0,
                            is_unavaiable: false,
                            slots: []
                        }
                    )
                    //console.log('DIA: ' + m.format('DD/MM/YYYY HH:mm:ss'));
                }

                this.$emit('week-changed', {start: this.week_days[0].date, end: this.week_days[this.week_days.length -1].date})
            },

            handleSchedules() {
                let that = this;

                that.week_days.forEach(function (day) {

                    that.schedules.map((professional) => {
                        let slots = professional.workdays.filter((workday) => workday.dow === day.dow)

                        slots.map((slot) => {
                            slot.schedules_count = 0

                            let count =  professional.schedules.filter((schedule) => schedule.date == day.date.format('DD/MM/YYYY') && moment(day.date.format('DD/MM/YYYY') +' '+schedule.time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm') == slot.init).length

                            slot.schedules_count += count
                            day.schedules_count += count


                            day.slots.push(_.cloneDeep(slot))
                        })
                    })

                    day.slots = _.orderBy(day.slots, ['init'], ['asc'])

                })
            },

            handleSchedulesClient() {
                let that = this;

                that.week_days.forEach(function (day) {

                    that.schedules.map((company) => {

                        company.schedules.map((schedule) => {

                            let schedule_date = moment(schedule.date + ' ' + schedule.time, 'DD/MM/YYYY HH:mm:ss')

                            if(schedule_date.day() == day.dow){
                                let slot_index = _.findIndex(day.slots, {init: schedule_date.format('HH:mm')})

                                if(slot_index == -1){
                                    let slot = {
                                        init: schedule_date.format('HH:mm'),
                                        schedules:[],
                                        schedules_count:0
                                    }

                                    slot.schedules.push(schedule)
                                    slot.schedules_count++
                                    day.schedules_count++

                                    day.slots.push(slot)

                                }else{
                                    day.slots[slot_index].schedules.push(schedule)

                                    day.slots[slot_index].schedules_count++
                                    day.schedules_count++

                                }
                            }

                        })

                        day.slots = _.orderBy(day.slots, ['init'], ['asc'])
                    })

                })
            },

            handlePrevWeek() {
                this.current_month.subtract(1, 'week');

                this.checkWeekDays();
            },

            handleNextWeek() {
                this.current_month.add(1, 'week');

                this.checkWeekDays();
            },

            selectSlot(date, slot) {
                this.$emit('slot-selected', {date: date, slot: slot})
            }
        },

    }
</script>

<style scoped>
    .slot-text {
        display: block;
        height: 12px;
        font-weight: 400;
    }

    .btn-transparent {
        color: #fff !important;
    }

    .col-wp-calendar-header{
        width: 14.2857%;
        background-color: rgba(51, 51, 51, .15);
        padding: 10px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 60px;
        font-weight: 600;
        color: #383938;
        font-weight: 400;
    }

    .col-wp-calendar {
        width: 14.2857%;
        background-color: transparent;
        padding: 4px 1px 1px 1px;
        border: 1px solid transparent;
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
    .slot-hover:hover{
        background-color: #88c657 !important;
        color: #fff !important;
    }

    .calendar-header {
        background: linear-gradient(to bottom, #6EC058 0%, #88C657 100%);
        display: flex;
        height: 50px;
        align-items: center;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 4px 4px 0 0;
    }

    .badge-calendar-wp {
        display: block;
        width: 18px;
        height: 17px;
        position: absolute;
        top: 5px;
        right: 20px;
        color: white;
        padding: 3px;
        background-color: #4A5464;
        font-size: 9px;
        border-radius: 50%;
    }

    .badge-calendar-counter {
        display: block;
        width: 18px;
        height: 17px;
        position: absolute;
        top: 2px;
        right: 5px;
        color: white;
        padding: 3px;
        background-color: #00A369;
        font-size: 9px;
        border-radius: 50%;
    }

    .selected-slot {
        background-color: #fff !important;
        color: #00A369 !important;
        border: 1px solid #00A369 !important;
    }

    .container-calendar{
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

    /* Dias que não fazem parte do current_month */
    .col-wp-calendar.not-current-month {
        color: rgba(56, 57, 56, .3);
    }
    /* Hoje */
    .col-wp-calendar-header.today {
        background-color: #71c158 ;
        color: #fff;
        font-weight: 700;
    }

    .slot-today {
        background-color: #71c158 !important; ;
        color: #fff  !important;;
        font-weight: 700  !important;;
    }


</style>
