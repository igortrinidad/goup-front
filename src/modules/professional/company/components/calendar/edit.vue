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
                <h3 class="f-300">{{ category.name }}</h3>
            </div>

            <!-- Handle Professional Scheduled -->
            <div class="container">
                <div class="card">
                    <div class="card-body card-padding">
                        <div class="form-group m-t-10">
                             <label>Habilitar agendamento diretamente com profissionais da categoria?</label>
                             <label class="switch">
                                 <input type="checkbox" v-model="calendar_settings.is_professional_scheduled" :disabled="!interactions.isEditingCategorySettings">
                                 <div class="slider round"></div>
                             </label>
                         </div>

                        <div class="form-group m-t-10">
                            <label>Habilitar exibir agenda ao público?</label>
                            <label class="switch">
                                <input type="checkbox" v-model="calendar_settings.calendar_is_public" :disabled="!interactions.isEditingCategorySettings">
                                <div class="slider round"></div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>Antecedência mínima para <b>agendamento</b> (horas)</label>
                            <input type="number" class="form-control" min="1" v-model="calendar_settings.advance_schedule" :disabled="!interactions.isEditingCategorySettings">
                        </div>

                        <div class="alert border-inside-card">
                            <i class="ion-ios-information-outline"></i> Esta é a antecedência mínima que um cliente poderá alterar seus agendamentos. Ex. Se sua agenda tem o horário de <b>16:00</b> disponível, o cliente terá até as <b>{{16 - calendar_settings.advance_schedule}}:00</b> para reservar este horário.
                        </div>

                        <div class="form-group">
                            <label>Antecedência mínima para <b>remarcação</b> de horário (horas)</label>
                            <input type="number" class="form-control" min="1" v-model="calendar_settings.advance_reschedule" :disabled="!interactions.isEditingCategorySettings">
                        </div>

                        <div class="alert border-inside-card">
                            <i class="ion-ios-information-outline"></i> Esta é a antecedência mínima que um cliente poderá alterar um agendamento previamente marcado. Ex. se o cliente tem um horário marcado para <b>16:00</b>, ele terá até as <b>{{16 - calendar_settings.advance_reschedule}}:00</b> para alterar o agendamento para outro de sua escolha.
                        </div>

                        <div class="form-group">
                            <label>Antecedência mínima para <b>cancelamento</b> (horas)</label>
                            <input type="number" class="form-control" min="1" v-model="calendar_settings.cancel_schedule" :disabled="!interactions.isEditingCategorySettings">
                        </div>

                        <div class="alert border-inside-card">
                            <i class="ion-ios-information-outline"></i> Esta é a antecedência mínima que um cliente poderá cancelar um horário previamente agendado. Ex. se o cliente tem um horário marcado para <b>16:00</b>, ele terá até as <b>{{16 - calendar_settings.cancel_schedule}}:00</b> para cancelar o horário marcado.
                        </div>

                        <button class="btn btn-success btn-block f-300 f-18" @click="saveCategoryCalendarSettings" v-if="interactions.isEditingCategorySettings">Salvar configurações</button>
                        <button class="btn btn-info btn-block f-300 f-18" @click="interactions.isEditingCategorySettings = true" v-if="!interactions.isEditingCategorySettings">Editar configurações</button>
                    </div>
                </div>
            </div>
            <!-- Handle Professional Scheduled -->

            <!-- IS PROFESSIONAL SCHEDULED -->
            <div class="container" v-if="calendar_settings.is_professional_scheduled">
                <div class="text-center">
                    <h3 class="f-300">Profissionais</h3>
                    <span class="f-300 f-danger" v-if="!selectedCategoryProfessionals.length">Não existem profissionais para esta categoria</span>
                    <div class="alert alert-info">
                        Os profissionais listados aqui devem ter a categoria {{category.name}} configurada em seu usuário profissional
                    </div>
                </div>

                <div class="card m-t-10" v-for="(professional, indexProfessional) in selectedCategoryProfessionals">
                
                    <div class="card-body card-padding text-center">

                        <img class="picture-circle" :src="professional.avatar" :alt="professional.name">
                        <h3>{{ professional.full_name }}</h3>

                        <button type="button" class="btn btn-info m-t-10" @click.prevent="selectProfessional(professional)" :disabled="interactions.isEditingCategorySettings">
                            Gerenciar Agenda
                        </button>

                        <p class="d-block f-400 f-14 m-t-10" v-if="!handleProfessionalCalendar(professional.id)">A agenda deste profissional está <span class="f-danger f-400">desabilitada</span>, clique em "Gerenciar Agenda", para configura-la.</p>
                        <p class="d-block f-400 f-14 m-t-10" v-if="handleProfessionalCalendar(professional.id)">Clique em "Gerenciar Agenda" para alterar as configurações da agenda deste profissional."</p>

                    </div>
                </div>

            </div>
            <!-- / IS PROFESSIONAL SCHEDULED -->

            <!-- IS NOT PROFESSIONAL SCHEDULED -->
            <div class="container" v-if="!calendar_settings.is_professional_scheduled">

                <div class="container text-center">
                    <h3 class="f-300">Horários de atendimento</h3>

                    <div class="text-center m-b-30">

                        <div class="alert alert-info m-t-20 text-center">
                            Configure os horários de atendimento desta modalidade
                        </div>
                    </div>
                </div>

                <div class="card">
                
                    <div class="card-body text-center">
                        
                        <span class="label label-info f-300 f-14 p-5 m-t-5">
                            <i class="ion-ios-information-outline m-r-5 f-20"></i>
                            <span style="position: relative; top: -1.5px;">Clique no slot para editar</span>
                        </span>

                        <div class="row text-center m-t-10">
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
            <!-- / IS NOT PROFESSIONAL SCHEDULED -->


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

                            <button class="btn btn-default" data-dismiss="modal" @click="cancel">Cancelar</button>
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

    import {cleanCategoryModel} from '@/models/Category'

    import Moment from 'moment'
    import {extendMoment} from 'moment-range'
    const moment = extendMoment(Moment)

    export default{
        name: 'company-calendar-edit',
        components:{
            mainHeader
        },
        data(){
            return{
                interactions: {
                    isUpdate: false,
                    initIsBiggerThanEnd: false,
                    isEditingCategorySettings: false,
                },
                category: cleanCategoryModel(),
                week_days: [
                    {label: 'Dom',dow: 0, slots: []},
                    {label: 'Seg',dow: 1, slots: []},
                    {label: 'Ter',dow: 2, slots: []},
                    {label: 'Qua',dow: 3, slots: []},
                    {label: 'Qui',dow: 4, slots: []},
                    {label: 'Sex',dow: 5, slots: []},
                    {label: 'Sab',dow: 6, slots: []},
                ],
                newSlot: {
                    init: '08:00',
                    end: '09:00',
                    dow: 1,
                    is_limited: true,
                    quantity: 3,
                },

                calendar_settings: {
                    is_professional_scheduled: false,
                    calendar_is_public: true,
                    calendar_is_active: true,
                    advance_schedule: 0,
                    advance_reschedule: 0,
                    cancel_schedule: 0,
                    points_to_earn_bonus: 0,
                    wordkays: [],
                },
            }
        },
        computed:{
            ...mapGetters(['AuthToken', 'currentCompany', 'selectedCategory']),

            selectedCategoryProfessionals(){
                let that = this

                let professionals = []

                this.currentCompany.professionals.map((professional) => {
                   professional.categories.map((category) => {

                       if(category.id === that. selectedCategory.id){
                           professionals.push(professional)
                       }
                   })
                })

                return professionals
            }
        },
        mounted(){

            if(!this.currentCompany.id){
                this.$router.push({name: 'admin.companies.show', params:{company_id: this.$route.params.company_id}})
                return false
            }

            this.category = this.selectedCategory

            this.getCategoryCalendarSettings()


        },
        methods:{

            ...mapActions(['setSelectedProfessional']),


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

            getCategoryCalendarSettings(){
                let that = this

                that.$http.post('professional/company/category/calendar_settings', {
                    company_id: that.currentCompany.id,
                    category_id: that.selectedCategory.id
                }).then(function (response) {

                    that.calendar_settings = response.data.calendar_setting

                    that.checkWeekDays()

                }).catch(function (error) {
                    console.log(error)
                });

            },

            saveCategoryCalendarSettings(){
                let that = this

                that.$http.post('professional/company/category/calendar_settings/update', that.calendar_settings)
                    .then(function (response) {

                        that.calendar_settings = response.data.calendar_setting

                        successNotify('', 'Configuração atualizada com sucesso.')
                        that.interactions.isEditingCategorySettings = false;

                    }).catch(function (error) {
                    console.log(error)
                });

            },

            cancel(){
                this.interactions.isUpdate = false;
                this.newSlot = JSON.parse(JSON.stringify(this.newSlot));
            },

            selectProfessional(professional){

                this.setSelectedProfessional(professional)

                this.$router.push({name: 'admin.companies.calendar.professional', params: {company_id: this.$route.params.company_id, category_slug: this.$route.params.category_slug, professional_id: professional.id}})
            },

            handleProfessionalCalendar(professional_id){
                let that = this

                let is_active = false

                that.calendar_settings.professionals_calendar_settings.map((setting) => {
                    if(setting.professional_id == professional_id){
                        is_active = setting.is_active
                    }
                } )

                return is_active
            }
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



</style>
