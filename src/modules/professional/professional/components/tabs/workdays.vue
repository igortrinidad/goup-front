<template lang="html">

    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/calendar.png" alt="">
                <h4 class="f-300">Horários fixos</h4>
            </div>
        </div>

        <div class="container m-t-20">

            <div class="card m-t-10" v-for="(calendar, calendarIndex) in professional_calendar_settings">
                <div class="card-header ch-alt text-center f-300">
                    <h3>{{calendar.company.name}}</h3>
                    <span class="badge badge-success p-10 f-14">{{calendar.category.name}}</span>
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
                        <span class="text-muted">Você pode configurar em quais períodos sua agenda com a empresa <b>{{calendar.company.name}}</b> ficará indisponível para novos agendamentos e remarcações. Os agendamentos já definidos não serão alterados.</span><br>

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
                                @click="setToEditCalendar(calendar.id, calendar.company.name)">
                           Editar agenda
                        </button>

                        <button type="button" class="btn btn-block f-300 btn-info"  v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1"
                                @click="updateProfessionalCalendarSettings(calendar)">
                            Salvar agenda
                        </button>

                        <button type="button" class="btn btn-block f-300 btn-default" v-if="calendarSettingsToEdit.indexOf(calendar.id) > -1"
                                @click="calendarSettingsToEdit.toggleSelected(calendar.id)">
                            Cancelar
                        </button>
                    </div>

                </div>
            </div>
            
        </div>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Datepicker from 'vuejs-datepicker'

    export default{
        name: 'admin-professional-workdays',
        components:{
            calendarWorkdaysJustShow: require('@/components/calendar-workdays-just-show.vue'),
            Datepicker
        },
        data() {
            return {
                calendarSettingsToEdit: [],
                professional_calendar_settings: [],
                date_range:{
                    from: null,
                    to: null
                },
                rangeInEdit: false
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        mounted() {

            this.getWorkdays();
        },

        methods: {
            ...mapActions([]),

            addSlotToWorkday: function(payload){
                let that = this

                that.professional_calendar_settings[payload.workday_index].workdays.push(payload.slot);
                
            },

            removeSlotToWorkday: function(payload){
                let that = this
                that.professional_calendar_settings[payload.workday_index].workdays.splice(payload.slot_index,1);
            },

            getWorkdays() {
                let that = this

                that.$http.post('professional/calendar/settings', {professional_id: that.currentUser.id})
                    .then(function (response) {

                        that.professional_calendar_settings = response.data.professional_calendar_settings

                    })
                    .catch(function (error) {
                    });
            },

            setToEditCalendar: function(calendar_id, company_name){
                let that = this
            
                    that.$swal({
                        title: 'Atenção',
                        text: `A alteração de horários e status da agenda irão alterar seus horários com a empresa ${company_name}. Deseja continuar?`,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: '#88C657',
                        reverseButtons: true
                    }).then(function () {
                        that.calendarSettingsToEdit.toggleSelected(calendar_id);
                    }).catch(function () {

                    })
            },


            updateProfessionalCalendarSettings: function(calendar){
                let that = this
            

                that.$http.post('professional/calendar/settings/update', calendar)
                    .then(function (response) {

                        successNotify('', 'Horários atualizados com sucesso.');
                        that.calendarSettingsToEdit.toggleSelected(calendar.id);

                    })
                    .catch(function (error) {
                    });
            },


            addDateRange(calendar){
                let that = this

                if (that.date_range.from && that.date_range.to) {
                    calendar.unavailable_dates_range.push(_.cloneDeep(that.date_range))
                    that.date_range.from = null
                    that.date_range.to = null
                    that.date_range.is_pre_reservation = false
                }else{
                    infoNotify('', 'Selecione um período válido.')
                }
            },

            removeDateRange(index, calendar){
                let that = this

                calendar.unavailable_dates_range.splice(index, 1)
            },

            editDateRange(index, period){
                let that = this

                that.date_range.from = period.from
                that.date_range.to = period.to
                that.rangeIndex = index
                that.rangeInEdit = true

            },

            updateDateRange(calendar){
                let that = this

                calendar.unavailable_dates_range.splice(that.rangeIndex, 1)
                calendar.unavailable_dates_range.splice(that.rangeIndex, 0, _.cloneDeep(that.date_range))
                that.date_range.from = null
                that.date_range.to = null
                that.rangeIndex = null
                that.rangeInEdit = false


            },
        }
    }
</script>
<style scoped>

</style>
