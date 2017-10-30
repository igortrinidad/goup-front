<template lang="html">
    <div>
        <div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Configuração da agenda</h3>
            </div>
        </div>

        <div class="container m-t-20">

            <div class="card m-t-10" v-for="(calendar, calendarIndex) in professional_calendar_settings">
                <div class="card-header ch-alt text-center f-300">
                    <h3>{{calendar.category.name}}</h3>
                </div>
            
                <div class="card-body card-padding">
                    
                    <div class="form-group m-t-10">
                         <label>Habilitar agenda?</label>
                         <label class="switch">
                             <input type="checkbox" v-model="calendar.is_active" :disabled="calendarSettingsToEdit.indexOf(calendar.id) < 0">
                             <div class="slider round"></div>
                         </label>
                         <p>A agenda desabilitada não será visualizada para marcação ou remarcação, porém os agendamentos já definidos permanecerão.</p>
                     </div>

                    <calendar-workdays-just-show class="border-inside-card" :workdays="calendar.workdays"></calendar-workdays-just-show>

                    <p>A grade de horários deve ser editada na agenda da empresa.</p>

                    <fieldset class="m-t-30">
                        <legend class="legend-with-helper">Períodos de indisponibilidade</legend>
                        <span class="text-muted">Você pode configurar em quais períodos a agenda do profissional {{professional.full_name}} ficará indisponível para novos agendamentos e remarcações. Os agendamentos já definidos não serão alterados.</span><br>

                        <div class="row m-t-20 m-b-20" v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Indisponível de:</label>
                                    <datepicker 
                                        input-class="form-control" 
                                        :language="'pt-br'"
                                        :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                        v-model="date_range.from"
                                    ></datepicker>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Até:</label>
                                    <datepicker 
                                        input-class="form-control" 
                                        :language="'pt-br'"
                                        :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                        v-model="date_range.to"
                                    ></datepicker>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <button class="btn btn-success btn-sm m-t-15 btn-block" @click.prevent="addDateRange(calendar)" v-if="!rangeInEdit">
                                    Adicionar novo período
                                </button>
                                <button class="btn btn-info btn-sm m-t-15  btn-block" @click.prevent="updateDateRange(calendar)" v-if="rangeInEdit">
                                    Atualizar período
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-vmiddle" v-if="calendar.unavailable_dates_range &&  calendar.unavailable_dates_range.length">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>De:</th>
                                    <th>Até:</th>
                                    <th width="10%"  class="text-center">Opções</th>
                                </tr>
                                </thead>
                                <tbody v-for="(period, index) in calendar.unavailable_dates_range">
                                <tr >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{period.from | moment('DD/MM/YYYY') }}</td>
                                    <td>{{period.to | moment('DD/MM/YYYY') }}</td>
                                    <td class="text-center">
                                        <span v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1">
                                            <button class="btn btn-info btn-xs" @click="editDateRange(index, period, calendar)"> <i class="fa fa-pencil"></i></button>
                                            <button class="btn btn-danger btn-xs" @click="removeDateRange(index, calendar)"> <i class="fa fa-trash"></i></button>
                                        </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="m-t-20" v-if="calendar.unavailable_dates_range &&  !calendar.unavailable_dates_range.length">
                            Nenhum período de indisponibilidade configurado.
                        </p>
                    </fieldset>

                    <div class="f-300 m-t-30">
                        <button type="button" class="btn btn-block f-300 btn-info" v-if="calendarSettingsToEdit.indexOf(calendar.id) < 0"
                                >
                           Editar agenda
                        </button>

                        <button type="button" class="btn btn-block f-300 btn-info"  v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1"
                                >
                            Salvar agenda
                        </button>

                        <button type="button" class="btn btn-block f-300 btn-default" v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1"
                                >
                            Cancelar
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
    import Datepicker from 'vuejs-datepicker'

    export default{
        name: 'company-professional-about-tab',
        props: ['professional'],
        components: {
            calendarWorkdaysJustShow: require('@/components/calendar-workdays-just-show.vue'),
            Datepicker
        },  
        data(){
            return{
                professional_calendar_settings: [],
                calendarSettingsToEdit: []
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        mounted(){
            this.getCompanyProfessionalCalendarSettings();
        },
        methods: {
            getCompanyProfessionalCalendarSettings: function(){
                let that = this

                var data = {
                    company_id: that.$route.params.company_id,
                    professional_id: that.$route.params.professional_id,
                }
            
                that.$http.post(`/professional/calendar/workdays/company/list`, data)
                    .then(function (response) {

                        that.professional_calendar_settings = response.data.professional_calendar_settings;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                
            },
        }
    }
</script>
