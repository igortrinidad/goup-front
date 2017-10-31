<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Insights'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">

            <h2 class="f-300 text-center m-b-30">Agendamentos</h2>

            <div class="text-center row m-t-30 insight-row">

                <div class="col-md-4 col-xs-3  insight-col text-left">
                    <button class="btn btn-info p-5 p-l-10 p-r-10 btn-block" @click="handlePrevMonth()">
                        <i class="ion-ios-arrow-back"></i>
                    </button>
                </div>
                <div class="col-md-4 col-xs-6 insight-col">
                    <button class="btn btn-info p-5 p-l-10 p-r-10 btn-block">{{current_month.format('MMMM')}} / {{current_month.format('YYYY')}}</button>
                </div>
                <div class="col-md-4 col-xs-3 insight-col text-right">
                    <button class="btn btn-info p-5 p-l-10 p-r-10 btn-block" @click="handleNextMonth()">
                        <i class="ion-ios-arrow-forward"></i>
                    </button>
                </div>

            </div>
        </div>

        <!-- Professionals with schedules -->
        <div class="container m-t-30">

            <card-placeholder v-if="placeholder.professional" :onlyHeader="true"></card-placeholder>

            <div class="card" v-for="professional in professionals" v-if="!placeholder.professional">
                <!-- Card Header -->
                <div
                    class="card-header ch-alt cursor-pointer"
                    @click="handleCardOpenned(professional)"
                >
                    <div class="row">
                        <div class="col-xs-4 col-sm-4">
                            <div
                                class="picture-circle picture-circle-p"
                                :style="`background-image:url('${ professional.avatar }')`"
                            >
                            </div>
                        </div>
                        <div class="col-xs-8 col-sm-8">
                            <h4 class="f-300 t-overflow m-t-10 m-b-5">{{ professional.full_name }}</h4>
                            <span class="f-16 f-300">
                                <strong>Avaliação atual:</strong>
                                <small>
                                    {{ professional.current_rating }}
                                </small>
                            </span>
                        </div>
                    </div>
                    <!-- toggle button open and close card -->
                    <span class="control-header">
                        <i class="ion-ios-arrow-down f-22" v-if="interactions.professionalsCardsOpened.indexOf(professional.id) == -1"></i>
                        <i class="ion-ios-arrow-up f-22" v-if="interactions.professionalsCardsOpened.indexOf(professional.id) > -1"></i>
                    </span>
                    <!-- / toggle button open and close card -->
                </div>
                <!-- / Card Header -->

                <div class="card-body card-padding" v-if="interactions.professionalsCardsOpened.indexOf(professional.id) > -1">

                    <!-- Qtd by status -->
                    <div class="row m-b-20 insight-row text-center">
                        <div class="col-sm-12 m-b-20 insight-col">
                            <h4 class="f-300 m-b-10">Agendamentos</h4>
                            <small class="f-14 f-300">
                                {{ professional.schedules.length ? `Total de ${ professional.schedules.length }` : 'Nenhum' }}
                                {{ professional.schedules.length > 1 ? 'agendamentos' : 'agendamento' }}
                            </small>
                        </div>
                        <div class="col-sm-4 col-xs-4 insight-col">
                            <div class="border-inside-card">
                                <h5 class="f-700 f-10">Confirmados</h5>
                                <span class="label label-success p-5 f-14">
                                    {{ countSchedulesByType(professional.schedules)[0] }}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-4 insight-col">
                            <div class="border-inside-card">
                                <h5 class="f-700 f-10">Pendentes</h5>
                                <span class="label label-warning p-5 f-14">
                                    {{ countSchedulesByType(professional.schedules)[1] }}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-4 insight-col">
                            <div class="border-inside-card">
                                <h5 class="f-700 f-10">Cancelados</h5>
                                <span class="label label-danger p-5 f-14">
                                    {{ countSchedulesByType(professional.schedules)[2] }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <canvas :id="'chart_prof_' + professional.id" class="canvas-default" v-if="!noCharts.professionalsWithSchedules"></canvas>

                    <button
                        type="button"
                        v-show="professional.schedules.length"
                        class="btn btn-info btn-block m-t-30"
                        @click="setCurrentProfessionalAndOpenModal(professional)"
                    >
                        Mostrar lista de agendamentos
                    </button>

                    <!-- Qtd by stats -->

                </div>

            </div>
        </div>
        <!-- / Professionals with schedules -->

        <!-- General Status -->
        <div class="container m-t-10">
            <button class="btn f-18 btn-light btn-block f-300 m-b-10" @click="handleChartTypePie()">
                <i class="ion-ios-pie-outline f-22 m-r-5"></i>
                Gráfico do mês <small>({{ current_month | moment('MM/YYYY') }})</small>
            </button>

            <div class="card" v-if="interactions.displayPie">
                <div class="card-body card-padding text-center">
                    <span class="f-300" v-if="noCharts.pie">Este período não possui agendamentos.</span>
                    <canvas ref="schedulesPie" v-if="!noCharts.pie" class="canvas-default"></canvas>
                </div>
            </div>
        </div>
        <!-- General Status -->

        <!-- Fuller schedules -->
        <div class="container m-t-10">
            <button
                class="btn f-18 btn-light btn-block f-300 m-b-10"
                @click="handleFullerSchedules('by_hour', true)"
            >
                <i class="ion-ios-time-outline f-22 m-r-5"></i>
                Gráfico de horários
            </button>

            <div class="card" v-if="interactions.fullerSchedules">
                <div class="card-body card-padding text-center">

                    <div class="btn-group">
                        <button
                            :class="{
                                'btn btn-xs p-t-10 p-b-10 f-300': true,
                                'btn-primary': interactions.fullerSchedulesChart.by_hour,
                                'btn-default': !interactions.fullerSchedulesChart.by_hour
                            }"
                            @click="handleFullerSchedules('by_hour', false)"
                        >
                            Por Horário
                        </button>
                        <button
                            :class="{
                                'btn btn-xs p-t-10 p-b-10 f-300': true,
                                'btn-info': interactions.fullerSchedulesChart.by_week,
                                'btn-default': !interactions.fullerSchedulesChart.by_week
                            }"
                            @click="handleFullerSchedules('by_week', false)"
                        >
                            Por Semana
                        </button>
                    </div>
                    <!-- <span class="f-300">Este período não possui agendamentos.</span> -->
                    <canvas ref="fullerSchedules" class="canvas-default m-t-30"></canvas>
                </div>
            </div>
        </div>
        <!-- Fuller schedules -->

        <!-- Modal Professional Schedules -->
        <div class="modal" id="modal-current-professional" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Agendamentos de {{ currentProfessional.full_name }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="border-inside-card m-t-10 text-center" v-for="schedule in currentProfessional.schedules">
                            <h4 class="f-300 m-0 m-b-5">Cliente:</h4>
                            <h5 class="f-300 m-0 m-b-5">
                                {{ schedule.subscription.client.full_name }}
                            </h5>
                            <h5 class="f-300 m-b-10">
                                {{ schedule.date }} às {{ schedule.time }}
                            </h5>
                            <span class="label label-success p-5" v-show="schedule.is_confirmed">confirmado</span>
                            <span class="label label-warning p-5" v-show="!schedule.is_canceled && !schedule.is_confirmed">aguardando</span>
                            <span class="label label-danger p-5" v-show="schedule.is_canceled">cancelado</span>
                        </div>
                    </div>
                    <div class="modal-footer borderless">
                        <button class="btn btn-info" data-dismiss="modal">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Professional Schedules -->

    </div>
</template>


<script>

    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    import Datepicker from 'vuejs-datepicker'

    import Chart from 'chart.js'
    import { defaultBar, horizontalBar, pie } from '@/models/ChartOptions'

    import Moment from 'moment'
    import { extendMoment } from 'moment-range'
    const moment = extendMoment(Moment)

    export default {
        name: 'company-calendar-insight',
        components: {
            mainHeader,
            cardPlaceholder,
            Datepicker
        },
        data() {
            return {
                current_month: moment(),
                currentProfessional: {},
                professionals: [],
                professionalsCustomPeriod: [],
                interactions: {
                    professionalsCardsOpened: [],
                    listProfessionals: false,
                    displayPie: false,
                    fullerSchedules: false,
                    fullerSchedulesChart: { by_hour: true, by_week: false }
                },
                noCharts: {
                    professionalsWithSchedules: true,
                    pieByMounth: true
                },
                placeholder: {
                    professional: true
                },
                insights: {
                    by_dow: {
                        labels: [],
                        datasets: [
                            {
                                label: '',
                                data: [],
                                backgroundColor: 'rgba(136, 198, 87, .7)',
                                borderColor: '#88C657',
                                borderWidth: 0
                            }
                        ],
                    },
                    by_week: {
                        labels: [],
                        datasets: [
                            {
                                label: '',
                                data: [],
                                backgroundColor: 'rgba(51, 122, 183, .7)',
                                borderColor: '#337ab7',
                                borderWidth: 0
                            }
                        ],
                    },
                    by_hour: {
                        labels: [],
                        datasets: [
                            {
                                label: '',
                                data: [],
                                backgroundColor: 'rgba(136, 198, 87, .7)',
                                borderColor: '#88C657',
                                borderWidth: 0
                            }
                        ],
                    },

                }
            }
        },

        mounted(){
            this.getProfessionalsWithSchedules();
        },

        methods: {

            setCurrentProfessionalAndOpenModal(professional) {
                let that = this

                that.currentProfessional = professional
                $('#modal-current-professional').modal('show');
            },

            handleCardOpenned(professional) {
                let that = this
                that.interactions.professionalsCardsOpened.toggleSelected(professional.id)

                if (that.interactions.professionalsCardsOpened.indexOf(professional.id) > -1) {
                    that.drawHorizontalBarChart(professional.schedules, professional.id)
                }

            },

            countSchedulesByType(schedules) {
                let confirmed = 0
                let canceled = 0
                let pending = 0

                schedules.forEach((schedule) => {
                    if (schedule.is_confirmed) {
                        confirmed++
                    }
                    if (!schedule.is_confirmed && !schedule.is_canceled) {
                        pending++
                    }
                    if (schedule.is_canceled) {
                        canceled++
                    }
                })

                return [ confirmed, pending, canceled ]
            },

            drawHorizontalBarChart(schedules, professional_id) {
                let that = this

                let schedulesData = that.countSchedulesByType(schedules)

                if (schedulesData.length) {
                    that.noCharts.professionalsWithSchedules = false

                    setTimeout(() => {

                        let Data = {
                            labels: [`Confirmados: (${schedulesData[0]})`, `Pendentes: (${schedulesData[1]})`, `Cancelados: (${schedulesData[2]})`],
                            datasets: [
                                {
                                    label: 'Agendamentos',
                                    data: schedulesData,
                                    backgroundColor: ['rgba(0, 163, 105, .7)', 'rgba(255, 204, 95, .7)', 'rgba(225, 74, 69, .7)'],
                                    borderColor: ['#00A369', '#FFCC5F', '#E14A45'],
                                    borderWidth: 2
                                }
                            ]
                        }

                        let barChart = new Chart($('#chart_prof_' + professional_id), horizontalBar(Data));

                    }, 200)
                } else {
                    that.noCharts.professionalsWithSchedules = true
                }
            },

            drawPieChart() {
                let that = this
                let schedulesData = []

                that.professionals.forEach( function(professional){
                    schedulesData.push(that.countSchedulesByType(professional.schedules))
                })

                let auxArray = [0, 0, 0]
                schedulesData.forEach((scheduleData, index) => {
                    auxArray = auxArray.sumArray(scheduleData)
                })
                schedulesData = auxArray

                if (_.isEqual(schedulesData, [0, 0, 0])) {
                    that.noCharts.pie = true

                } else {
                    that.noCharts.pie = false
                    setTimeout(() => {

                        let Data = {
                            labels: [`Confirmados: (${schedulesData[0]})`, `Pendentes: (${schedulesData[1]})`, `Cancelados: (${schedulesData[2]})`],
                            datasets: [
                                {
                                    label: 'Agendamentos',
                                    data: schedulesData,
                                    backgroundColor: ['rgba(0, 163, 105, .7)', 'rgba(255, 204, 95, .7)', 'rgba(225, 74, 69, .7)'],
                                    borderColor: ['#00A369', '#FFCC5F', '#E14A45'],
                                    borderWidth: 2
                                }
                            ]
                        }
                        this.pieChart = new Chart(that.$refs.schedulesPie, pie(Data));
                    }, 200)
                }
            },

            dataByHour() {
                let that = this

                // Retorna as labels formatadas ordenando do menor para o maior (exemplo de formato: 08:00)
                let times = _.flatten(that.professionals.map((professional) =>
                    professional.schedules.map((schedule) =>
                        _.replace(schedule.time, ':00', '')
                    ))
                ).sort()

                // Remove valores repetidos
                that.insights.by_hour.labels = _.uniq(times)

                // Retorna a quantidade de vezes que cada valor repete
                let countTimes = times.countDuplicatedValues()
                that.insights.by_hour.datasets[0].data = _.flatten(countTimes.map((it) => it.count))
            },

            dataByWeek() {
                let that = this

                // Retorna as labels formatadas ordenando do menor para o maior (Semana: 1)
                let weeks =_.flatten(that.professionals.map((professional) =>
                    professional.schedules.map((schedule) =>
                        `Semana: ${ Math.ceil(moment(schedule.date, 'DD/MM/YYYY').date() / 7) }`
                    ))
                ).sort()

                // Remove valores repetidos
                that.insights.by_week.labels = _.uniq(weeks)

                // Retorna a quantidade de vezes que cada valor repete
                let countTimes = weeks.countDuplicatedValues()
                that.insights.by_week.datasets[0].data = _.flatten(countTimes.map((it) => it.count))
            },

            handleFullerSchedules(type, toggleCard) {
                let that = this

                if (toggleCard) {
                    that.interactions.fullerSchedules = !that.interactions.fullerSchedules
                }

                if (that.interactions.fullerSchedules) {
                    if (type === 'by_week') {
                        that.interactions.fullerSchedulesChart.by_hour = false
                        that.interactions.fullerSchedulesChart.by_week = true
                        that.dataByWeek()
                        setTimeout(() => {
                            that.fullerSchedulesChart = new Chart(that.$refs.fullerSchedules, defaultBar(that.insights.by_week))
                        }, 200);
                    }

                    if (type === 'by_hour') {
                        that.interactions.fullerSchedulesChart.by_hour = true
                        that.interactions.fullerSchedulesChart.by_week = false
                        that.dataByHour()
                        setTimeout(() => {
                            that.fullerSchedulesChart = new Chart(that.$refs.fullerSchedules, defaultBar(that.insights.by_hour))
                        }, 200);
                    }
                }

            },

            handleChartTypePie() {
                let that = this
                that.interactions.displayPie = !that.interactions.displayPie
                if (that.pieChart) {
                    that.pieChart.destroy()
                }
                if (that.interactions.displayPie) {
                    that.drawPieChart()
                }
            },

            // For CurrentMonth
            getProfessionalsWithSchedules: function(customPeriod){
                let that = this

                that.placeholder.professional = true

                that.$http.post('professional/company/schedule/schedules_by_professional_and_date', {
                    company_id: that.$route.params.company_id,
                    init: moment(that.current_month).startOf('month').format('YYYY-MM-DD'),
                    end: moment(that.current_month).endOf('month').format('YYYY-MM-DD'),
                }).then(function (response) {

                    that.professionals = response.data.professionals_with_schedules
                    console.log(that.professionals)

                    setTimeout(() => {
                        that.placeholder.professional = false
                    }, 200);

                }).catch(function (error) {
                    console.log(error)
                });

            },

            handlePrevMonth(){
                this.current_month.subtract(1, 'month');
                this.getProfessionalsWithSchedules();
                this.interactions.professionalsCardsOpened = []
                this.interactions.displayPie = false
            },

            handleNextMonth(){
                this.current_month.add(1, 'month');
                this.getProfessionalsWithSchedules();
                this.interactions.professionalsCardsOpened = []
                this.interactions.displayPie = false
            },
        }
    }
</script>

<style scoped>
    .row.insight-row { margin: 0 -5px; }
    .row.insight-row .insight-col { padding: 0 5px; }

    /* canvas */
    .canvas-default {
        max-width: 100%;
        min-height: 0px;
    }

</style>
