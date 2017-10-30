<template lang="html">

   <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/calendar.png" alt="">
                <h3 class="f-300">Horários fixos</h3>
                <div class="alert alert-info text-center">
                    Controle os horários fixos de {{client.full_name}}
                </div>
            </div>
        </div>

        <div class="container">
            <div class="text-center">
                <span class="f-300" v-if="!client.subscriptions.length">Nenhum plano adicionado. Adicione um plano para definir horários fixos.</span>
            </div>



            <div class="card" v-for="(subs, indexSubs) in client.subscriptions">
                <!-- Card Header -->
                <div class="card-header ch-alt text-center">
                    <h3 class="f-300 f-22 m-b-0">{{subs.plan.name}}</h3>
                    <p class="m-0">
                        Status:
                        <span class="label label-success f-12 p-5 f-300 m-t-10" v-show="subs.is_active">Ativo</span>
                        <span class="label label-danger f-12 p-5 f-300 m-t-10" v-show="!subs.is_active">Inativo</span>
                    </p>

                    <p class="m-0">
                        Renovação automática:
                        <span class="label label-success f-12 p-5 f-300 m-t-10" v-show="subs.auto_renew">Ativo</span>
                        <span class="label label-danger f-12 p-5 f-300 m-t-10" v-show="!subs.auto_renew">Inativo</span>
                    </p>
                </div>
                <!-- /Card Header -->

                <!-- Card Body -->
                <div class="card-body card-padding">
                    <h4 class="text-center">Horários</h4>
                    <calendar-to-set-workdays
                        :workdays.sync="subs.workdays"
                        :subs_id="subs.id"
                        :category_id="subs.plan.category_id"
                        :is-client="true"
                        :is-edit="workdaysToEdit.indexOf(subs.id) > -1" @workdays-changed="setNewWorkdays">
                    </calendar-to-set-workdays>

                    <div class="alert alert-info text-center m-t-30" v-if="workdaysToEdit.indexOf(subs.id) > -1">
                        Ao alterar os horários fixos do cliente {{client.full_name}}, os agendamentos futuros serão automaticamente alterados seguindo os novos horários definidos.
                    </div>

                    <div class="col-sm-12 m-t-20 m-b-20 text-center" v-if="!subs.workdays.length">
                        <span class="f-300 f-danger">Configure os horários para gerar os agendamentos e a primeira fatura do cliente.</span>
                    </div>

                    <div class="col-sm-12 m-t-20 m-b-20 text-center" v-if="!subs.invoices.length && subs.workdays.length && workdaysToEdit.indexOf(subs.id) < 0">
                        <span class="f-300 f-info">Tudo pronto aqui, o próximo passo é gerar a fatura e os primeiros agendamentos do cliente.</span>
                        <button class="btn btn-primary btn-block m-t-20" @click.prevent="goToTab('invoices')">Clique aqui para ir até faturas</button>
                    </div>

                    <div class="f-300 m-t-20">
                        <button type="button" class="btn btn-block btn-sm f-300 btn-info" v-if="workdaysToEdit.indexOf(subs.id) < 0"
                                @click.prevent="workdaysToEdit.toggleSelected(subs.id)">
                           Editar horários
                        </button>

                        <button type="button" class="btn btn-block btn-sm f-300 btn-info"  v-if="workdaysToEdit.indexOf(subs.id) > -1"
                                @click.prevent=" updateClientSubscription(subs)">
                            Salvar horários
                        </button>

                        <button type="button" class="btn btn-block btn-sm f-300 btn-default" v-if="workdaysToEdit.indexOf(subs.id) > -1"
                                @click.prevent="workdaysToEdit.toggleSelected(subs.id)">
                            Cancelar
                        </button>
                    </div>

                </div>
            </div>
        </div>

   </div>

</template>

<script>

    import calendarToSetWorkdays from '@/components/calendar-to-set-workdays.vue'
    import {mapActions} from 'vuex'
    import bus from '@/utils/event-bus'

    export default{
        name: 'company-client-workdays',
        components: {
            calendarToSetWorkdays,
        },
        props: ['client'],
        data(){
        	return {
                interactions: {
                    EditWorkdays: false,
                },
                workdaysToEdit: [],
                firstConfiguration: false
        	}
        },
        computed: function(){
            let that = this
        },
        mounted: function(){
            let that = this
        },
        methods: {

            ...mapActions(['disableLoader', 'setLoading']),

            //through event we can change the props without warnings
            setNewWorkdays(payload) {
                let that = this

                let subs = _.find(that.client.subscriptions, {id: payload.subs_id})

                if(!subs.workdays.length){
                   that.firstConfiguration = true
                }

                let old_workdays = subs.workdays

                subs.workdays = payload.workdays

                if(!that.firstConfiguration){
                    that.difference = _.differenceWith(old_workdays, subs.workdays, _.isEqual);
                    that.workdays_changed = !_.isEqual(old_workdays, subs.workdays);
                }

            },

            updateClientSubscription: function (subs) {
                let that = this

                if(that.workdays_changed){
                    that.$swal({
                        title: 'Atenção!',
                        text: 'Essa alteração irá alterar todos os agendamentos futuros, você tem certeza que deseja continuar?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true
                    }).then(function () {

                        subs.update_schedules = true

                        delete subs.invoices
                        delete subs.plan

                        that.setLoading({is_loading: true, message: ''})
                        that.$http.post(`professional/company/subscription/update`, subs)
                            .then(function (response) {

                                let subs_index = _.findIndex(that.client.subscriptions, {id: subs.id})
                                that.client.subscriptions.splice(subs_index, 1)
                                that.client.subscriptions.splice(subs_index, 0, response.data.subscription)

                                that.workdaysToEdit.toggleSelected(subs.id);
                                that.workdays_changed = false;
                                that.setLoading({is_loading: false, message: ''})
                            })
                            .catch(function (error) {
                                console.log(error)
                                that.setLoading({is_loading: false, message: ''})

                            });

                    }).catch(function () {
                        that.interactions.EditWorkdays = false;
                        that.workdays_changed = false;
                        that.toggleSelectedSubs(subs)
                        that.getClient()
                    })
                }else{
                    that.setLoading({is_loading: true, message: ''})
                    that.$http.post(`professional/company/subscription/update`, subs)
                        .then(function (response) {
                            let subs_index = _.findIndex(that.client.subscriptions, {id: subs.id})
                            that.client.subscriptions.splice(subs_index, 1)
                            that.client.subscriptions.splice(subs_index, 0, response.data.subscription)

                            that.workdaysToEdit.toggleSelected(subs.id);
                            that.workdays_changed = false;
                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {
                            console.log(error)
                            that.setLoading({is_loading: false, message: ''})

                        });
                }
            },

            goToTab(tab){
                bus.$emit('go-to-tab', tab)
            }

        }
    }
</script>
