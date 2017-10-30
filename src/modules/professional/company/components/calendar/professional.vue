<template>

        <div class="first-container">

            <main-header
                :type="'center'"
                :title="'Agenda'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

            <div class="container text-center">
                <h4 class="f-300">Configurar agenda de {{ professional.full_name }}</h4>
            </div>

            <!-- Handle Professional Scheduled -->
            <div class="container">
                <div class="card">
                    <div class="card-body card-padding">
                        <div class="form-group m-t-10">
                            <label>Habilitar agenda do profissional?</label><br>
                            <p>
                                {{calendar_settings.is_active ? 'Habilitado' : 'Desabilitado'}}</p>
                            <label class="switch">
                                <input type="checkbox" v-model="calendar_settings.is_active">
                                <div class="slider round"></div>
                            </label>
                         </div>
                    </div>
                </div>
            </div>
            <!-- Handle Professional Scheduled -->

            <div class="container" v-if="calendar_settings.is_active">
               <div class="card">
                   <div class="card-body card-padding">
                       <div class="text-center m-b-10">
                    <span class="label label-info f-300 f-15 p-10">
                        <i class="ion-ios-information-outline m-r-5 f-20"></i>
                        <span style="position: relative; top: -1.5px;">Clique no slot para editar</span>
                    </span>
                       </div>
                       <div class="row text-center">
                           <div class="col-md-12 col-xs-12 col-lg-12">
                               <div v-for="(day, $index) in week_days" class="col-wp-calendar-header col-xs-12">
                                   <span class="">{{ day.label}}</span>
                               </div>
                           </div>
                       </div>
                       <div class="row text-center">
                           <div class="teste">
                               <div class="col-md-12 col-xs-12 col-lg-12">
                                   <div v-for="(day, indexDay) in week_days" class="col-wp-calendar col-xs-12">

                                <span v-for="(slot, indexSlot) in day.slots">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <span class="label label-success full m-b-5 t-overflow cursor-pointer" @click="editSlot(slot)">
                                                <span class="slot-text">
                                                    <span v-show="slot.is_limited">{{slot.quantity}}</span>
                                                    <span v-show="!slot.is_limited"><i class="ion-ios-infinite f-14"></i></span>
                                                </span>
                                                <span class="slot-text">{{slot.init}}</span>
                                                <span class="slot-text">{{slot.end}}</span>
                                            </span>
                                        </div>
                                    </div>
                                </span>

                                       <div class="row p-5">
                                           <div class="col-xs-12">
                                               <span class="btn btn-xs btn-block btn-info" @click="newSlot.dow = day.dow" data-toggle="modal" data-target="#modal-add-slot">+</span>
                                           </div>
                                       </div>


                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>

            <div class="container" v-if="calendar_settings.is_active">
                <div class="card">
                    <div class="card-body card-padding">

                        <fieldset>
                            <legend class="legend-with-helper">Período de indisponibilidade</legend>
                            <span class="text-muted">Você pode configurar em quais períodos a agenda do profissional ficará indisponível para agendamentos (ex: férias, afastamento).</span><br>

                            <div class="row m-t-20 m-b-20">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Indisponível de:</label>
                                        <datepicker input-class="form-control" :language="'pt-br'"
                                                    :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                                    v-model="date_range.from"></datepicker>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Até:</label>
                                        <datepicker input-class="form-control" :language="'pt-br'"
                                                    :placeholder="'Selecione uma data'" :format="'dd/MM/yyyy'"
                                                    v-model="date_range.to"></datepicker>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <button class="btn btn-success m-t-25 btn-block" @click.prevent="addDateRange()" v-if="!rangeInEdit">Adicionar período</button>
                                    <button class="btn btn-info m-t-25  btn-block" @click.prevent="updateDateRange()" v-if="rangeInEdit">Atualizar período</button>
                                </div>
                            </div>

                            <legend>Períodos configurados</legend>

                            <div class="table-responsive">
                                <table class="table table-vmiddle" v-if="calendar_settings.unavailable_dates_range &&  calendar_settings.unavailable_dates_range.length">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>De:</th>
                                        <th>Até:</th>
                                        <th width="10%"  class="text-center">Opções</th>
                                    </tr>
                                    </thead>
                                    <tbody v-for="(period, index) in calendar_settings.unavailable_dates_range">
                                    <tr >
                                        <td>{{ index + 1 }}</td>
                                        <td>{{period.from | moment('DD/MM/YYYY') }}</td>
                                        <td>{{period.to | moment('DD/MM/YYYY') }}</td>
                                        <td class="text-center">
                                            <button class="btn btn-info btn-xs" @click="editDateRange(index, period)"> <i class="fa fa-pencil"></i></button>
                                            <button class="btn btn-danger btn-xs" @click="removeDateRange(index)"> <i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p v-if="calendar_settings.unavailable_dates_range &&  !calendar_settings.unavailable_dates_range.length">Nenhum periodo configurado.</p>
                        </fieldset>
                    </div>
                </div>

            </div>


            <div class="container m-t-30">
                <button class="btn btn-info btn-block" @click.prevent="saveProfessionalCalendarSettings">Salvar</button>
            </div>


            <!-- MODAL HORARIOS -->
            <div class="modal" id="modal-add-slot" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">Horário</h4>
                        </div>
                        <div class="modal-body">

                        <fieldset class=" m-t-20">
                            <small class="f-300 m-b-20"></small>

                            <div class="form-group m-t-10">
                                <label>Quantidade de pessoas é limitada neste horário?</label><br>
                                <p>
                                    {{newSlot.is_limited ? 'Sim' : 'Não'}}</p>
                                <label class="switch">
                                    <input type="checkbox" v-model="newSlot.is_limited">
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="form-group" v-show="newSlot.is_limited">
                                <label>Quantidade máxima de pessoas</label>
                                <input class="form-control" v-model="newSlot.quantity" >
                            </div>

                            <div class="form-group">
                                <label>Início</label>
                                <input class="form-control" v-model="newSlot.init" data-mask="'##:##'">
                            </div>

                            <div class="form-group">
                                <label>Término</label>
                                <input class="form-control" v-model="newSlot.end" @change="checkEndValue()" data-mask="'##:##'">
                            </div>

                            <div class="">
                                <button class="btn btn-sm btn-danger" data-dismiss="modal" @click="removeSlot(newSlot)" v-show="interactions.isUpdate">Remover horário</button>
                            </div>

                        </fieldset>

                        </div>
                        <div class="modal-footer">
                            <span class="d-block text-center m-b-10 f-danger f-300" v-if="interactions.initIsBiggerThanEnd">Início não pode ser antes do término.</span>

                            <button class="btn btn-default" data-dismiss="modal" @click.prevent="cancel">Cancelar</button>
                            <button class="btn btn-info" data-dismiss="modal" @click="addWorkDay()" v-show="!interactions.isUpdate" :disabled="interactions.initIsBiggerThanEnd">
                                Adicionar horário
                            </button>
                            <button class="btn btn-info" data-dismiss="modal" v-show="interactions.isUpdate" @click="saveSlot()" :disabled="interactions.initIsBiggerThanEnd">
                                Salvar horário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL HORARIOS -->

        </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import {cleanProfessionalModel} from '@/models/Professional'

    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    import Datepicker from 'vuejs-datepicker'

    export default{
        name: 'company-calendar-professional',
        components:{
            mainHeader,
            Datepicker
        },
        data(){
            return{
                interactions: {
                    isUpdate: false,
                    initIsBiggerThanEnd: false
                },
                professional: cleanProfessionalModel(),
                week_days: [
                    {label: 'Dom',dow: 0, slots: []},
                    {label: 'Seg',dow: 1, slots: []},
                    {label: 'Ter',dow: 2, slots: []},
                    {label: 'Qua',dow: 3, slots: []},
                    {label: 'Qui',dow: 4, slots: []},
                    {label: 'Sex',dow: 5, slots: []},
                    {label: 'Sab',dow: 6, slots: []},
                ],
                workdays: [{
                    init: '09:00',
                    end: '10:00',
                    dow: 1,
                    is_limited: true,
                    quantity: 3,
                }],
                newSlot: {
                    init: '08:00',
                    end: '09:00',
                    dow: 1,
                    is_limited: true,
                    quantity: 3,
                },

                calendar_settings: {
                    slot_duration: 60,
                    is_active: true,
                    workdays: []
                },
                date_range:{
                    from: null,
                    to: null
                },
                rangeInEdit: false
            }
        },
        mounted(){

            if(!this.currentCompany.id){
                this.$router.push({name: 'admin.companies.show', params:{company_id: this.$route.params.company_id}})
                return false
            }

            this.professional = this.selectedProfessional

            this.getProfessionalCalendarSettings()

        },
        computed:{
            ...mapGetters(['AuthToken', 'currentCompany', 'selectedCategory', 'selectedProfessional']),
        },
        methods:{

            ...mapActions(['setLoading']),


            checkWeekDays: function(){
                let that = this

                that.calendar_settings.workdays = _.orderBy(that.calendar_settings.workdays, ['dow', 'init'], ['asc', 'asc']);

                that.week_days.forEach(function(day){

                    day.slots = [];
                    that.calendar_settings.workdays.forEach(function(workday){
                        if(workday.dow == day.dow){
                            day.slots.push(workday);
                        }
                    })
                })
            },

            addWorkDay: function(){
                this.calendar_settings.workdays.push(JSON.parse(JSON.stringify(this.newSlot)));

                let encreased_init_time = moment(this.newSlot.init, 'HH:mm').add(1, 'hour').format('HH:mm')
                let encreased_end_time = moment(this.newSlot.end, 'HH:mm').add(1, 'hour').format('HH:mm')

                this.newSlot.init = encreased_init_time
                this.newSlot.end = encreased_end_time

                this.checkWeekDays();

            },

            editSlot: function(slot){
                this.interactions.isUpdate = true;
                this.newSlot = slot
                $('#modal-add-slot').modal('show')
            },

            removeSlot: function(slot){
                var index = this.calendar_settings.workdays.indexOf(slot);
                this.calendar_settings.workdays.splice(index,1);
                this.checkWeekDays();
                this.interactions.isUpdate = false;
            },

            saveSlot: function(){
                this.interactions.isUpdate = false;
                this.newSlot = JSON.parse(JSON.stringify(this.newSlot));
            },

            checkEndValue() {
                if (this.newSlot.init >= this.newSlot.end) {
                    this.interactions.initIsBiggerThanEnd = true
                } else {
                    this.interactions.initIsBiggerThanEnd = false
                }
            },

            getProfessionalCalendarSettings(){
                let that = this

                that.setLoading({is_loading: true, message: ''})
                that.$http.post('professional/company/professional/calendar_settings', {
                    company_id: that.currentCompany.id,
                    category_id: that.selectedCategory.id,
                    professional_id: that.selectedProfessional.id,
                }).then(function (response) {

                    that.calendar_settings = response.data.calendar_setting

                    if(!that.calendar_settings.unavailable_dates_range){
                        that.calendar_settings.unavailable_dates_range = []
                    }

                    that.checkWeekDays()

                    that.setLoading({is_loading: false, message: ''})

                }).catch(function (error) {
                    console.log(error)
                    that.setLoading({is_loading: false, message: ''})
                });

            },

            saveProfessionalCalendarSettings(){
                let that = this

                that.setLoading({is_loading: true, message: ''})
                that.$http.post('professional/company/professional/calendar_settings/update', that.calendar_settings)
                    .then(function (response) {

                        that.calendar_settings = response.data.calendar_setting

                        successNotify('', 'Configuração atualizada com sucesso.')

                        that.setLoading({is_loading: false, message: ''})

                    }).catch(function (error) {
                    console.log(error)
                    that.setLoading({is_loading: false, message: ''})
                });

            },

            cancel(){
                this.interactions.isUpdate = false;
                this.newSlot = JSON.parse(JSON.stringify(this.newSlot));
            },

            addDateRange(){
                let that = this

                if (that.date_range.from && that.date_range.to) {
                    that.calendar_settings.unavailable_dates_range.push(_.cloneDeep(that.date_range))
                    that.date_range.from = null
                    that.date_range.to = null
                    that.date_range.is_pre_reservation = false
                }else{
                    infoNotify('', 'Selecione um período válido.')
                }
            },

            removeDateRange(index){
                let that = this

                that.calendar_settings.unavailable_dates_range.splice(index, 1)
            },

            editDateRange(index, period){
                let that = this

                that.date_range.from = period.from
                that.date_range.to = period.to
                that.rangeIndex = index
                that.rangeInEdit = true

            },

            updateDateRange(){
                let that = this

                that.calendar_settings.unavailable_dates_range.splice(that.rangeIndex, 1)
                that.calendar_settings.unavailable_dates_range.splice(that.rangeIndex, 0, _.cloneDeep(that.date_range))
                that.date_range.from = null
                that.date_range.to = null
                that.rangeIndex = null
                that.rangeInEdit = false

            },


        },

    }
</script>

<style scoped>
    /* NEW CALENDAR WE PLACES */

    .slot-text{
        display: block;
        height: 12px;
        font-weight: 400;
    }

    .teste{
        overflow-y: auto;
        max-height: 400px;
    }

    .col-wp-calendar-header {
        width: 14.2857%;
        background-color: #E2E2E2;
        padding: 13px 1px 1px 1px;
        border: 1px solid white;
        text-align: center;
        vertical-align: center;
        height: 50px;
        font-weight: 600;
    }

    .col-wp-calendar {
        width: 14.2857%;
        background-color: #F2F2F2;
        padding: 4px 1px 1px 1px;
        border: 1px solid white;
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

    .calendar-header {
        background: #FA8A3D;
        display: flex;
        align-items: center;
        border-radius: 4px 4px 0 0;
    }

    .cal-legend-helper {
        display: inline-block;
        width: 12px;
        height: 12px;
    }

    .today {
        border: 1px solid #7BCCC6;
    }

    .default {
        background-color: #F2F2F2;
        cursor: not-allowed;
    }

    .default-but-has-reservation{
        cursor: pointer;
    }

    .reservation {
        background-color: #82CB7D;
    }

    .reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .pre-reservation {
        background-color: #69A7BE;
    }

    .pre-reservation:hover {
        background-color: #1ABC9C;
        cursor: pointer;
    }

    .unavailable {
        background-color: #ED5553;
        cursor: pointer;
    }

    .unavailable:hover {
        background-color: #ED5553;
    }

    .btn.available {
        background-color: #1ABC9C !important;
        font-weight: 900;
    }

    .btn .unavailable {
        background-color: #ED5553;
    }

    .legend-item {
        position: relative;
        float: right;
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

    /* END NEW CALENDAR WE PLACES */

</style>
