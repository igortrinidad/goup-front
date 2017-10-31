<!-- COMPONENTE DE TESTE PARA FLUXO DE CALENDARIO -->
<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <!-- Card Header -->
                    <div class="card-header ch-alt m-b-10">
                        <h2 class="f-400 text-center" v-if="current_month">{{ current_month | moment('YYYY') }}</h2>
                    </div>
                    <!-- / Card Header -->

                    <!-- Card Body -->
                    <div class="card-body clearfix">
                        <!-- Calendar Header -->
                        <div class="calendar-header clearfix">
                            <div class="col-xs-6">
                                <h3 class="title m-b-20 m-l-5 f-300" v-if="current_month">{{ current_month | moment('MMMM') }}</h3>
                            </div>
                            <div class="col-xs-6">
                                <div class="text-right">
                                    <button
                                        class="btn btn-transparent f-24"
                                        title="Semana Anterior"
                                         @click.prevent="handlePrevMonth"
                                    >
                                            <i class="ion-ios-arrow-thin-left"></i>
                                    </button>
                                    <button
                                        class="btn btn-transparent f-24"
                                        title="Proxima Semana"
                                         @click.prevent="handleNextMonth"
                                    >
                                        <i class="ion-ios-arrow-thin-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- / Calendar Header -->
                        <!-- Calendar Content -->
                        <div class="row text-center">
                            <div class="col-md-12 col-xs-12 col-lg-12">
                                <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12">
                                    <span x-apple-data-detectors="false">{{ day }}</span>
                                </div>
                                <div
                                    v-for="(date, $index) in month_days"
                                    class="col-wp-calendar col-xs-12"
                                    x-apple-data-detectors="false"
                                    @click="handleSlotDay($index, date)"
                                    :class="{
                                        'unavaiable': date.is_unavaiable && date.category_professionals == date.unavaiable_professionals,
                                        'not-current-month': current_month.format('MM/YYYY') !== date.date.format('MM/YYYY'),
                                        'today': today.format('DD/MM') === date.day && today.format('MM/YYYY') === current_month.format('MM/YYYY')
                                    }"
                                >
                                    <span class="cursor-pointer" x-apple-data-detectors="false">{{ date.date | moment('DD') }}</span>
                                    <span class="badge-calendar-wp" v-if="date.schedules_count > 0">{{date.schedules_count}}</span>
                                </div>

                            </div>
                        </div>
                        <!-- / Calendar Content -->

                        <!-- TESTE -->
                        <!--<div class="row">
                            <pre>{{month_days}}</pre>
                        </div>-->
                    </div>
                    <!-- / Card Body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)
    import {mapGetters} from 'vuex'

    export default{
        name: 'calendar',
        props:{
            schedules:{
                type: Array,
                twoWay: false
            }
        },

        data(){
            return {
                week_days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                month_days: [],
                current_month: null,
                calendarLoaded: false,
            }
        },
        watch:{
            schedules(val, oldVal) {
                let that = this

                if (val.length) {
                    that.handleSchedules()
                }
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'currentCompany', 'selectedCategory']),

            today: function () {
                return moment()
            }
        },
        mounted(){
            //Testar pra ver se subtrair
            this.current_month = moment('05:00:00', 'HH:mm:ss');
            //console.log(this.current_month.format('HH:mm:ss'));
            this.$nextTick(()=>{
                this.getMonthDays();
            })
        },
        methods: {


            getMonthDays: function(){
                let that = this

                this.calendarLoaded = false

                var first_day_of_cal = moment(this.current_month).startOf('month').day();

                if(first_day_of_cal > 0){
                    first_day_of_cal = moment(this.current_month).startOf('month').subtract(first_day_of_cal, 'days');
                } else {
                    first_day_of_cal = moment(this.current_month).startOf('month').add(5, 'hours');
                }

                var last_day_of_cal = moment(this.current_month).endOf('month').day();

                if(last_day_of_cal > 0){
                    last_day_of_cal = moment(this.current_month).endOf('month').add(6-last_day_of_cal, 'days');
                } else {
                    last_day_of_cal = moment(this.current_month).endOf('month');
                }

                that.month_days = [];

                for (var m = first_day_of_cal; m.isBefore(last_day_of_cal); m.add(1, 'days')) {
                    that.month_days.push({day: m.format('DD/MM'), date: m.clone(), schedules_count:0, is_unavaiable: false});
                    //console.log('DIA: ' + m.format('DD/MM/YYYY HH:mm:ss'));
                }

                setTimeout(function() {

                    that.$emit('month-changed', {start: that.month_days[0].date, end: that.month_days[that.month_days.length -1].date})
                    that.calendarLoaded = true
                }, 100);


            },

            handlePrevMonth(){
                this.current_month.subtract(1, 'month');
                this.month_days = [];
                this.getMonthDays()
            },

            handleNextMonth(){
                this.current_month.add(1, 'month');
                this.month_days = [];
                this.getMonthDays()
            },

            handleSlotDay(index, date){
                this.$emit('slot-selected', date)
            },

            handleSchedules(){
                let that = this

                that.month_days.map((day) => {
                    day.schedules_count = 0
                    day.is_unavaiable = false
                    day.is_professional_scheduled = false
                    day.category_professionals = 0
                    day.unavaiable_professionals = []

                    that.schedules.map((data) => {

                        if(data.is_professional_scheduled && that.currentUser.role == 'professional'){

                            data.unavailable_dates_range.map((range) => {
                                let dateRange = moment().range(range.from, range.to)
                                day.is_unavaiable = day.is_unavaiable ? day.is_unavaiable : dateRange.contains( day.date)
                                day.unavaiable_professionals.push(data.professional)

                            })

                            let professionals = 0

                            if(!_.isEmpty(that.currentCompany)){
                                that.currentCompany.professionals.map((professional) => {
                                    professional.categories.map((category) => {

                                        if (category.id === that.selectedCategory.id) {
                                            professionals++
                                        }
                                    })
                                })
                            }

                            day.category_professionals =  professionals

                        }

                        day.schedules_count += data.schedules.filter((schedule) => schedule.date === day.date.format('DD/MM/YYYY')).length

                        day.unavaiable_professionals = _.uniq(day.unavaiable_professionals).length

                        day.is_professional_scheduled = data.is_professional_scheduled

                    })
                })
            }
        }
    }
</script>

<style scoped>
    .btn-transparent{ color: #fff !important; }

    .col-wp-calendar-header{
        width: 14.2857%;
        background-color: rgba(51, 51, 51, .15);
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        font-weight: 600;
        color: #383938;
        font-weight: 400;
    }

    .col-wp-calendar{
        width: 14.2857%;
        background-color: #f4f5f5;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        color: #383938;
        font-weight: 300;
    }

    .col-wp-calendar:hover{
        background-color: #88c657;
        cursor: pointer;
        color: #fff;
    }
    /* Dias que não fazem parte do current_month */
    .col-wp-calendar.not-current-month {
        color: rgba(56, 57, 56, .3);
    }
    /* Hoje */
    .col-wp-calendar.today {
        background-color: #71c158 ;
        color: #fff;
        font-weight: 700;
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
        top: 2px;
        right: 5px;
        color: white;
        padding: 3px;
        background-color: #4A5464;
        font-size: 9px;
        border-radius: 50%;
    }

    .unavaiable{
        background: #F5404B !important;
        color: #fff;
    }

</style>
