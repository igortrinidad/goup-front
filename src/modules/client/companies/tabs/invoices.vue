<template lang="html">
    <div>

        <div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Faturas</h3>
            </div>
        </div>

        <div class="container m-t-20">
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Alterar vencimento</h4>
                        </div>
                        <div class="card-body card-padding">

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="invoices-init">Vencimento de:</label>
                                        <datepicker
                                            id="invoices-init"
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
                                        <label for="invoices-end">Vencimento até:</label>
                                        <datepicker
                                            id="invoices-end"
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
                                <button class="btn btn-info btn-sm btn-block m-t-10" @click="getInvoices()">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            
               <p class="text-center" v-if="!invoices.length">Nenhuma fatura localizada.</p>

               <card-placeholder
                   v-if="placeholder"
                   :onlyHeader="true"
                   :onlyHeaderNoImage="true"
                   :onlyHeaderOpened="true"
                   :cols="'col-xs-12 col-sm-12'"
               >
               </card-placeholder>

               <div class="card" v-for="(invoice, indexInvoice) in invoices">

                    <div class="card-header ch-alt text-center">
                        <h4 class="f-300">{{invoice.subscription.client.full_name}}</h4>
                        <p>Vencimento: {{invoice.expire_at}}</p>
                        <span class="label label-success f-16 p-5 full" v-if="handleStatus(invoice) == 'confirmed'">Confirmada</span>
                        <span class="label label-danger f-16 p-5 full" v-if="handleStatus(invoice) == 'canceled'">Cancelada</span>
                        <span class="label label-warning f-16 p-5 full" v-if="handleStatus(invoice) == 'waiting'">Pendente</span>
                    </div>
                    <div class="card-body card-padding">

                           <div class="" >
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Plano:</strong>
                                   <small>{{invoice.subscription.plan.name}}</small>
                               </div>
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Valor:</strong>
                                   <small>{{invoice.value | formatCurrency}}</small>
                               </div>
                               <div class="f-300 m-t-5">
                                   <strong class="f-400">Vencimento:</strong>
                                   <small>{{invoice.expire_at}}</small>
                               </div>

                               </div>

                           </div>

                    </div>

                </div>

               <div class="row">
                   <div class="col-sm-12" v-show="invoices.length">
                       <div class="text-center">
                           <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                       </div>
                   </div>
               </div>

        </div>


    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    export default {
        name: 'invoices-tab',
        components: {
            pagination: require('@/components/pagination.vue'),
            Datepicker: require('vuejs-datepicker'),
            cardPlaceholder: require('@/components/card-placeholder.vue')
        },
        props: {
            company: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                init: moment().startOf('month').toDate(),
                end: moment().add(1, 'months').startOf('month').toDate(),
                placeholder: true,
                invoices: [],
                pagination: {},
            }
        },

        computed: {
            ...mapGetters(['currentUser']),
        },

        mounted() {
            this.getInvoices();
        },

        methods: {

            getInvoices(){
                let that = this

                let data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.currentUser.id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }

                that.placeholder = true;

                that.$http.post('client/company/show/invoices',data)
                    .then(function (response) {

                        that.invoices = response.data.invoices;
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

                that.$http.post('client/company/show/schedules', data)
                    .then(function (response) {

                        that.schedules = response.data.schedules;
                        that.pagination = response.data.pagination;
                        
                        that.placeholder = false;

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleStatus(invoice){
                if (invoice.is_canceled) {
                    return 'canceled'
                }

                if (invoice.is_confirmed) {
                    return 'confirmed'
                }

                if (!invoice.is_confirmed && !invoice.is_canceled) {
                    return 'waiting'
                }
            },
        }
    }
</script>

<style scoped>
</style>
