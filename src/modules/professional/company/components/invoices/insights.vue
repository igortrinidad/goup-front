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

            <h2 class="f-300 text-center m-b-30">Faturas</h2>

            <div class="text-center row m-t-30 insight-row">

                <div class="col-md-4 col-xs-3 insight-col text-left">
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

        <!-- Invoices -->
        <div class="container m-t-30">

            <div class="card" v-if="currentValueReceived">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0 m-b-10">Valor recebido em {{current_month.format('MMMM')}}</h4>
                    <span class="label label-success p-5 p-l-10 p-r-10 f-14">{{ currentValueReceived | formatCurrency }}</span>
                </div>
            </div>

            <!-- <card-placeholder v-if="placeholder.professional" :onlyHeader="true"></card-placeholder> -->
            <div class="row insight-row">
                <div class="col-sm-2 col-xs-6 insight-col" v-for="invoice in invoices">
                    <div class="card">
                        <div class="card-header ch-alt text-center p-5">
                            <h4 class="f-300 t-overflow m-t-10 m-b-10">{{ invoice.value | formatCurrency }}</h4>
                            <p>{{ invoice.subscription.plan.category.name }}</p>
                            <span class="label label-success p-5 p-l-10 p-r-10" v-if="invoice.is_confirmed">Confirmada</span>
                            <span class="label label-warning p-5 p-l-10 p-r-10" v-if="invoice.is_canceled">Cancelada</span>
                            <span class="label label-default p-5 p-l-10 p-r-10" v-if="!invoice.is_confirmed && !invoice.is_canceled && isExpired(invoice.expire_at) > -1">Aguardando</span>
                            <span class="label label-danger p-5 p-l-10 p-r-10" v-if="!invoice.is_confirmed && !invoice.is_canceled && isExpired(invoice.expire_at) < -1">Atrasada</span>
                            <hr>
                            <small class="f-300">vencimento em:
                                {{ invoice.expire_at }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Invoices -->

        <!-- By Status -->
        <div class="container" v-show="!invoices.length">
            <div class="card">
                <div class="card-body">
                    <p class="f-300 f-danger text-center m-t-10">
                        Não foi possível localizar nenhuma fatura no mês de
                        <strong>{{ current_month.format('MMMM') }} de {{ current_month.format('YYYY') }}</strong>.
                    </p>
                </div>
            </div>
        </div>
        <!-- By Status -->

        <div class="container" v-show="invoices.length">
            <div class="row insight-row">

                <!-- By Status -->
                <div class="col-sm-12 insight-col">

                    <button class="btn f-18 btn-light btn-block f-300 m-b-10" @click="handleChartType('by_status')">
                        <i class="ion-checkmark-round f-22 m-r-5"></i>
                        Gráfico por status
                    </button>

                    <div class="card" v-show="interactions.chartByStatus">
                        <div class="card-body p-l-5 p-r-5 text-center">
                            <!-- Custom Labels -->
                            <div class="text-center m-t-5 m-b-30" v-show="invoices.length">
                                <div class="row insight-row">
                                    <div class="col-xs-6 insight-col">
                                        <span class="btn btn-xs btn-block btn-success p-5 p-l-10 p-r-10 f-12">Confirmado<br> <strong>{{ statusCount.confirmed | formatCurrency }}</strong></span>
                                    </div>
                                    <div class="col-xs-6 insight-col">
                                        <span class="btn btn-xs btn-block btn-default p-5 p-l-10 p-r-10 f-12">Pendente<br> <strong>{{ statusCount.pending | formatCurrency }}</strong></span>
                                    </div>
                                    <div class="col-xs-6 m-t-10 insight-col">
                                        <span class="btn btn-xs btn-block btn-warning p-5 p-l-10 p-r-10 f-12">Cancelado<br> <strong>{{ statusCount.canceled | formatCurrency }}</strong></span>
                                    </div>
                                    <div class="col-xs-6 m-t-10 insight-col">
                                        <span class="btn btn-xs btn-block btn-danger p-5 p-l-10 p-r-10 f-12">Atrasado<br> <strong>{{ statusCount.expired | formatCurrency }}</strong></span>
                                    </div>
                                </div>
                            </div>
                            <!-- /Custom Labels -->

                            <canvas ref="chartByStatus" class="canvas-default"></canvas>
                        </div>
                    </div>
                </div>
                <!-- By Status -->

                <!-- By Week -->
                <div class="col-sm-6 insight-col">

                    <button class="btn f-18 btn-light btn-block f-300 m-b-10" @click="handleChartType('by_week')">
                        <i class="ion-stats-bars f-22 m-r-5"></i>
                        Gráfico por semana
                    </button>

                    <div class="card" v-show="interactions.chartByWeek">
                        <div class="card-body text-center">
                            <canvas ref="chartByWeek" class="canvas-default"></canvas>
                        </div>
                    </div>
                </div>
                <!-- / By Week -->

                <!-- By Category -->
                <div class="col-sm-6 insight-col">

                    <button class="btn f-18 btn-light btn-block f-300 m-b-10" @click="handleChartType('by_category')">
                        <i class="ion-ios-pie-outline f-22 m-r-5"></i>
                        Gráfico de categorias
                    </button>

                    <div class="card" v-show="interactions.chartByCategory">
                        <div class="card-body text-center">
                            <canvas ref="chartByCategory" class="canvas-default"></canvas>
                        </div>
                    </div>
                </div>
                <!-- By Category -->

            </div>
        </div>
    </div>
</template>


<script>

    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    import Chart from 'chart.js'
    import { defaultBar, horizontalBar, pie, cleanInsightsByWeek, cleanInsightsByStatus, cleanInsightsByCategory } from '@/models/ChartOptions'

    import Moment from 'moment'
    import { extendMoment } from 'moment-range'
    const moment = extendMoment(Moment)

    export default {
        name: 'company-calendar-insight',
        components: {
            mainHeader,
            cardPlaceholder,
        },
        data() {
            return {
                current_month: moment(),
                currentValueReceived: 0,
                statusCount: {
                    confirmed: 0, pending: 0, canceled: 0, expired: 0
                },
                invoices: [],
                categories: [],
                interactions: {
                    professionalsCardsOpened: [],
                    chartByStatus: true,
                    chartByWeek: true,
                    chartByCategory: true,
                },
                placeholder: {
                    invoices: true
                },
                insights: {
                    by_status: cleanInsightsByStatus(),
                    by_week: cleanInsightsByWeek(),
                    by_category: cleanInsightsByCategory(),
                }
            }
        },

        mounted(){
            this.getInvoices();
        },

        methods: {

            isExpired(date) {
                return moment(date, 'DD/MM/YYYY').diff(moment(), 'days')
            },

            resetData() {

                this.interactions.chartByStatus = true
                this.interactions.chartByWeek = true
                this.interactions.chartByCategory = true

                this.currentValueReceived = 0
                this.statusCount.confirmed = 0
                this.statusCountpending = 0
                this.statusCountcanceled = 0
                this.statusCountexpired = 0

                this.insights.by_week = cleanInsightsByWeek()
                this.insights.by_status = cleanInsightsByStatus()
                this.insights.by_category = cleanInsightsByCategory()
            },

            dataByCategory() {
                let that = this

                let categoriesNames = _.flatten(that.categories.map((category) => category.name)).sort()
                let categoriesSlug = _.flatten(that.categories.map((category) => category.slug)).sort()

                // Remove valores repetidos
                that.insights.by_category.labels = _.uniq(categoriesNames)

                categoriesSlug = _.uniq(categoriesSlug)

                that.insights.by_category.labels.forEach((label, indexCategories) => {
                    const currentColor = categoriesSlug[indexCategories].colorByCategory()
                    that.insights.by_category.datasets[0].backgroundColor.push(currentColor.hex)
                    that.insights.by_category.datasets[0].borderColor.push(currentColor.rgba)
                })

                let values = new Array(that.insights.by_category.labels.length)
                for (var i = 0; i < values.length; i++) {
                    values[i] = 0
                }

                that.insights.by_category.labels.forEach((label, labelIndex) => {
                    that.invoices.forEach((invoice) => {
                        if (label === invoice.subscription.plan.category.name) {
                            values[labelIndex]+= invoice.value
                        }
                    })
                })
                that.insights.by_category.datasets[0].data = values


            },

            countStatus() {
                let that = this
                that.statusCount = { confirmed: 0, pending: 0, canceled: 0, expired: 0 }
                that.invoices.map((invoice) => {
                    let is_expired = that.isExpired(invoice.expire_at)

                    // Confirmadas
                    if (invoice.is_confirmed) {
                        that.statusCount.confirmed+= invoice.value
                    }
                    // Canceladas
                    if (invoice.is_canceled) {
                        that.statusCount.canceled+= invoice.value
                    }
                    // Pendentes
                    if (!invoice.is_confirmed && !invoice.is_canceled && is_expired > -1) {
                        that.statusCount.pending+= invoice.value
                    }
                    // Atrasadas
                    if (!invoice.is_confirmed && !invoice.is_canceled && is_expired < -1) {
                        that.statusCount.expired+= invoice.value
                    }
                })
            },

            dataByWeek() {
                let that = this

                that.insights.by_week.labels.forEach((label, indexDataSet) => {
                    that.invoices.forEach((invoice) => {

                        const currentDate = `Semana: ${ Math.ceil(moment(invoice.expire_at, 'DD/MM/YYYY').date() / 7) }`
                        const is_expired = that.isExpired(invoice.expire_at)

                        if (currentDate === that.insights.by_week.labels[indexDataSet]) {
                            // Confirmadas
                            if (invoice.is_confirmed) {
                                that.insights.by_week.datasets[0].data[indexDataSet]+= invoice.value
                            }
                            // Pendentes
                            if (!invoice.is_confirmed && !invoice.is_canceled && is_expired > -1) {
                                that.insights.by_week.datasets[1].data[indexDataSet]+= invoice.value
                            }
                            // Canceladas
                            if (invoice.is_canceled) {
                                that.insights.by_week.datasets[2].data[indexDataSet]+= invoice.value
                            }
                            // Atrasadas
                            if (!invoice.is_confirmed && !invoice.is_canceled && is_expired < -1) {
                                that.insights.by_week.datasets[3].data[indexDataSet]+= invoice.value
                            }
                        }
                    })
                })

            },

            dataByStatus() {
                let that =  this

                that.countStatus()
                that.insights.by_status.datasets[0].data = _.values(that.statusCount)

            },

            handleChartType(type) {
                let that = this

                // Cuida do grafico por categoria
                if (type === 'by_category') {

                    if (that.chartByCategory) that.chartByCategory.destroy()

                    that.interactions.chartByCategory = !that.interactions.chartByCategory

                    if (that.interactions.chartByCategory) {
                        setTimeout(() => {
                            that.chartByCategory = new Chart(that.$refs.chartByCategory, pie(that.insights.by_category))
                        }, 200);
                    }
                }

                // Cuida do grafico por semana + status
                if (type === 'by_week') {

                    if (that.chartByWeek) that.chartByWeek.destroy()

                    that.interactions.chartByWeek = !that.interactions.chartByWeek

                    if (that.interactions.chartByWeek) {
                        setTimeout(() => {
                            that.chartByWeek = new Chart(that.$refs.chartByWeek, defaultBar(that.insights.by_week))
                        }, 200);
                    }
                }

                // Cuida do grafico por status
                if (type === 'by_status') {

                    if (that.chartByStatus) that.chartByStatus.destroy()

                    that.interactions.chartByStatus = !that.interactions.chartByStatus

                    if (that.interactions.chartByStatus) {
                        setTimeout(() => {
                            that.chartByStatus = new Chart(that.$refs.chartByStatus, horizontalBar(that.insights.by_status))
                        }, 200);
                    }
                }
            },

            // For CurrentMonth
            getInvoices() {
                let that = this

                var data = {
                    company_id: that.$route.params.company_id,
                    search: '',
                    init: moment(that.current_month).startOf('month').format('YYYY-MM-DD'),
                    end: moment(that.current_month).endOf('month').format('YYYY-MM-DD')
                }

                that.categories = []
                that.invoices = []
                that.resetData()

                that.$http.post(`professional/company/invoice/list`, data)
                    .then(function (response) {
                        that.invoices = response.data.invoices
                        that.invoices.map((invoice) => {
                            that.categories.push(invoice.subscription.plan.category)
                            if (invoice.is_confirmed) {
                                that.currentValueReceived += invoice.value
                            }
                        })
                        that.dataByCategory()
                        that.dataByWeek()
                        that.dataByStatus()

                        if (!window.cordova) {
                            that.handleChartType('by_status')
                            that.handleChartType('by_week')
                            that.handleChartType('by_category')
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.placeholder = false;
                    });
            },

            handlePrevMonth(){
                this.current_month.subtract(1, 'month');
                this.getInvoices();
            },

            handleNextMonth(){
                this.current_month.add(1, 'month');
                this.getInvoices();
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
