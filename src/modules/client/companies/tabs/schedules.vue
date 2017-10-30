<template lang="html">
    <div>

        <div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Agendamentos</h3>
            </div>
        </div>

       <div class="container m-t-20">
           <div class="row">
               <div class="col-md-12 col-xs-12">
                   <div class="card">
                       <div class="card-header ch-alt text-center">
                           <h4 class="f-300 m-0">Alterar data</h4>
                       </div>
                       <div class="card-body card-padding">

                           <div class="row">
                               <div class="col-md-6 col-xs-12">
                                   <div class="form-group">
                                       <label for="single-schedules-invit">Data de:</label>
                                       <datepicker
                                           id="single-schedules-invit"
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
                                       <label for="single-schedules.end">Data até:</label>
                                       <datepicker
                                           id="single-schedules.end"
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
                               <button class="btn btn-info btn-sm btn-block m-t-10" @click="getSchedules()">Buscar</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>


        <div class="container m-t-30">

            <card-placeholder
                v-if="placeholder"
                :onlyHeader="true"
                :onlyHeaderNoImage="true"
                :onlyHeaderOpened="true"
                :cols="'col-xs-12 col-sm-4'"
            >
            </card-placeholder>

            <p class="text-center" v-if="!schedules.length">Nenhum agendamento encontrado</p>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(schedule, index) in schedules">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4>{{schedule.date}}</h4>
                            <p><strong>{{schedule.time}}</strong></p>

                            <span class="label p-5 p-l-15 p-r-15 label-primary"> {{schedule.category.name}}</span>

                        </div>

                        <div class="card-body text-center card-padding">

                            <div class="col-md-12 col-xs-12 m-b-20">
                                <span v-if="schedule.is_trial" class="label p-5 p-l-15 p-r-15 label-primary">Aula experimental</span>
                                <span v-if="!schedule.is_confirmed && !schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-default">Aguardando</span>
                                <span v-if="schedule.is_confirmed && !schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-success">Realizado</span>
                                <span v-if="!schedule.is_confirmed && schedule.is_canceled" class="label p-5 p-l-15 p-r-15 label-danger">Cancelado</span>
                            </div>

                            <div class="col-md-12 col-xs-12 m-b-20">
                                <span v-if="schedule.is_single" class="label p-5 p-l-15 p-r-15 label-info">Agendamento avulso</span>
                            </div>

                            <router-link
                                v-if="!schedule.is_single"
                                tag="button"
                                class="btn btn-info btn-sm btn-block"
                                :to="{name: 'client.dashboard.calendar.show.schedule', params: {day: schedule.date, schedule_id: schedule.id}}"
                                :disabled="!schedule.id"
                            >
                                Visualizar agendamento
                            </router-link>
                            <router-link 
                                tag="button"
                                v-if="schedule.is_single"
                                type="button"
                                class="btn btn-info btn-sm btn-block"
                                :to="{name: 'client.dashboard.calendar.show.single-schedule', params: {day: schedule.date,single_schedule_id: schedule.id}}"
                            >
                                Visualizar agendamento
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12" v-show="schedules.length">
                <div class="text-center">
                    <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
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
        name: 'schedules-tab',
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
                schedules: [],
                pagination: {},
            }
        },

        computed: {
            ...mapGetters(['currentUser']),
        },

        mounted() {
            this.getSchedules()
        },

        methods: {

            getSchedules(){
                let that = this

                let data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.currentUser.id,
                    init: moment(that.init, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    end: moment(that.end, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }

                that.placeholder = true;
                that.$http.post('client/company/show/schedules',data)
                    .then(function (response) {

                        that.schedules = response.data.schedules;
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
        }
    }
</script>

<style scoped>
</style>
