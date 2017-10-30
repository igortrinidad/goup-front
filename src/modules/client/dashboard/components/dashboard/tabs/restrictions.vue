<template >

   	<div v-if="currentClient.id">
        <div class="container">
	        <div class="text-center">
	            <img class="img-icon" src="../../../../../../assets/icons/restrictions.png" alt="">
	            <h4 class="f-300">Restrições</h4>
	        </div>

            <div class="row">
                <div class="col-sm-12" v-if="checkPermission('restrictions_edit')">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addRestriction = !interactions.addRestriction">
                        <span v-if="interactions.addRestriction"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar</span>
                        <span v-if="!interactions.addRestriction"><i class="ion-ios-plus-outline m-r-5"></i>{{!interactions.isUpdate ? 'Nova' : 'Editar'}} restrição</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container m-t-20" v-if="interactions.addRestriction">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">{{ interactions.isUpdate ? 'Atualizar' : 'Nova restrição' }}</h4>
                </div>

                <div class="card-body card-padding">

                    <div :class="{'form-group': true, 'has-error': errors.has('type')}">
                        <label>Tipo <small>(obrigatório)</small></label>
                        <select
                            v-validate="'required'"
                            data-vv-name="type" data-vv-as="Tipo"
                            class="form-control"
                            v-model="newRestriction.type"
                            placeholder="Medicamento, Exercício, Alimento"
                        >
                            <option>Medicamento</option>
                            <option>Alimento</option>
                            <option>Exercício</option>
                        </select>
                        <small class="f-300 f-danger">{{ errors.first('type') }}</small>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('restriction')}">
                        <label>Restrição <small>(obrigatório)</small></label>
                        <input
                            type="text"
                            v-validate="'required'"
                            data-vv-name="restriction" data-vv-as="Restrição"
                            class="form-control"
                            v-model="newRestriction.restriction"
                            placeholder="Aspirina, agachamento, camarão..."
                        >
                        <small class="f-300 f-danger">{{ errors.first('restriction') }}</small>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea
                            type="text"
                            class="form-control"
                            v-model="newRestriction.observation"
                            placeholder="Observações sobre esta restrição"
                        ></textarea>
                    </div>


                    <div class="form-group">

                        <div class="form-group m-t-10">
                             <label>Compartilhar no feed de atividades?</label>
                             <label class="switch">
                                 <input type="checkbox" v-model="newRestriction.share_profile">
                                 <div class="slider round"></div>
                             </label>
                         </div>

                        <button
                            class="btn btn-sm btn-success btn-block"
                            @click="saveRestriction()"
                            v-show="!interactions.isUpdate"
                            :disabled="!newRestriction.type || !newRestriction.restriction"
                        >
                            Salvar restrição
                        </button>
                        <button
                            class="btn btn-sm btn-success btn-block"
                            @click="updateRestriction()"
                            v-show="interactions.isUpdate"
                            :disabled="!newRestriction.type || !newRestriction.restriction"
                        >
                            Atualizar restrição
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div class="container m-t-20">

            <!-- List Restrictions -->
            <card-placeholder v-if="placeholder.list" :onlyHeader="true">
            </card-placeholder>

            <div class="row">

                <div class="container m-t-20" v-if="!checkPermission('restrictions_show')">
                    <div class="alert alert-info">
                        O cliente não autorizou a visualização das restrições.
                    </div>
                </div>

                <div class="col-sm-4 col-xs-12" v-for="(restriction, indexRestriction) in restrictions" v-if="checkPermission('restrictions_show')">
                    <div class="card m-t-10 m-b-0">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.restrictionsCardOpened.toggleSelected(restriction.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ restriction.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <span class="d-block f-300 t-overflow">
                                        {{ restriction.from.full_name }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header cursor-pointer">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) < 0"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) > -1"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <div class="card-body p-10" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) > -1">

                            <div class="m-b-15">

                                <div class="d-block">
                                    <h4 class="f-300">Tipo de restrição</h4>
                                     <span class="label label-danger f-400 f-17">{{ restriction.type }}</span>
                                </div>

                                <div class="d-block">
                                    <h4 class="f-300">Restrição</h4>
                                    <span class="label label-danger f-400 f-17">{{ restriction.restriction }}</span>
                                </div>
                                <div class="d-block">
                                    <h4 class="f-300">Observações</h4>
                                    <span class="f-danger">{{restriction.observation}}</span>
                                </div>
                            </div>

                            <button class="btn btn-info btn-xs btn-block" @click="selectRestrictionToEdit(restriction)" v-if="checkPermission('restrictions_edit')">Editar</button>
                            <hr>
                            <button class="btn btn-danger btn-xs btn-block m-t-5" @click="removeRestriction(indexRestriction, restriction.id)"  v-if="checkPermission('restrictions_edit')">Excluir</button>

                        </div>
                    </div>
                </div>
            </div>
            <!-- / List Restrictions -->

            <div class="text-center" v-if="checkPermission('restrictions_show') && !restrictions.length">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhuma restrição adicionada
                </span>
            </div>

            <div class="text-center m-t-20 m-b-20">
                <button class="btn btn-info btn-sm" @click="getDestroyedsRestrictions()" v-if="checkPermission('restrictions_show')">Carregar restrições excluídas</button>
            </div>

            <!-- List DESTROYEDS Restrictions -->

            <card-placeholder
                v-if="interactions.clickedToGetDestroyedList && placeholder.destroyedList"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(restriction, indexRestriction) in restrictions_destroyeds">
                    <!-- Card Header -->
                    <div class="card m-b-0">

                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.restrictionsCardOpened.toggleSelected(restriction.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ restriction.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <span class="d-block f-300 t-overflow">
                                        {{ restriction.from.full_name }}
                                    </span>
                                    <span class="full d-block f-300 t-overflow m-t-5">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ restriction.dow | moment('dddd') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header cursor-pointer">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) < 0"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) > -1"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <div class="card-body p-10" v-if="interactions.restrictionsCardOpened.indexOf(restriction.id) > -1">

                            <div class="m-b-15">
                                <div class="d-block">
                                    <h4 class="f-300">Tipo de restrição</h4>
                                     <span class="label label-danger f-400 f-17">{{ restriction.type }}</span>
                                </div>

                                <div class="d-block">
                                    <h4 class="f-300">Restrição</h4>
                                    <span class="label label-danger f-400 f-17">{{ restriction.restriction }}</span>
                                </div>
                                <div class="d-block">
                                    <h4 class="f-300">Observações</h4>
                                    <span class="f-danger">{{restriction.observation}}</span>
                                </div>
                            </div>

                            <hr>

                            <button class="btn btn-info btn-xs btn-block" @click="restoreRestriction(indexRestriction, restriction.id)"  v-if="checkPermission('restrictions_edit')">Restaurar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- / List DESTROYEDS Restrictions -->
        </div>

   	</div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import {cleanRestrictionModel} from '@/models/Restriction'

    export default{
        name: 'client-dashboard-restrictions',
        props: {
            client: {
                type: Object
            }
        },
        components: {
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    addRestriction: false,
                    isUpdate: false,
                    restrictionsCardOpened: [],
                    clickedToGetDestroyedList: false
                },
                placeholder: {
                    list: true,
                    destroyedList: true
                },
                professionalLoading: true,
                currentProfessional: {},
                restrictions: [],
                restrictions_destroyeds: [],
                newRestriction: cleanRestrictionModel()
            }
        },

        computed:{
            ...mapGetters(['currentCompany', 'currentUser','checkPermission', 'currentClient'])
        },
        mounted: function(){

            if(this.currentUser.role == 'professional'){

                let has_companies = this.currentUser.companies.length ? true : false

                if(has_companies && _.isEmpty(this.currentCompany)){
                    let company_id = JSON.parse(window.localStorage.getItem('current_company'))
                    if(company_id){
                        this.$router.push({name: 'admin.companies.show', params:{ company_id: company_id}})
                    }
                    return false
                }

            }

            this.getRestrictions()
        },
        methods: {

            ...mapActions(['incrementClientTotalXp']),

            selectRestrictionToEdit: function(restriction){
                this.newRestriction = restriction;
                this.interactions.addRestriction = true;
                this.interactions.isUpdate = true;
                $('html, body').stop().animate({ scrollTop: 100 }, 500, 'easeInOutExpo');
            },

            categoriesCount(list) {
                return list.length - 2
            },

            getRestrictions(){
                let that = this

                that.placeholder.list = true

                that.$http.post(`client/restriction/list`, {client_id: that.$route.params.client_id})
                    .then(function (response) {
                        that.restrictions = response.data.restrictions
                        setTimeout(() => {
                            that.placeholder.list = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            saveRestriction: function(){
                let that = this

                that.newRestriction.client_id = that.client.id;

                that.$http.post(`client/restriction/create`, that.newRestriction)
                    .then(function (response) {

                        that.newRestriction = cleanRestrictionModel()
                        that.interactions.addRestriction = false;

                        //Add XP points to client
                        that.incrementClientTotalXp(1)

                        successNotify('', 'Restrição adicionada com sucesso.')

                        that.getRestrictions();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            updateRestriction: function(){
                let that = this

                that.newRestriction.client_id = that.client.id;

                that.$http.post(`client/restriction/update`, that.newRestriction)
                    .then(function (response) {

                        that.newRestriction = cleanRestrictionModel()
                        that.interactions.addRestriction = false;
                        that.interactions.isUpdate = false;
                        successNotify('', 'Restrição atualizada com sucesso.')
                        that.getRestrictions();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            removeRestriction: function(indexRestriction, restrictionId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    restriction_id: restrictionId
                }

                that.$swal({
                    title: 'Excluir restrição',
                    text: 'Tem certeza que gostaria de excluir esta restrição?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/restriction/destroy`, data)
                    .then(function (response) {
                        that.restrictions.splice(indexRestriction, 1)
                        successNotify('', 'Restrição excluída com sucesso.')
                        const index = that.interactions.restrictionsCardOpened.indexOf(restrictionId);
                        if(index > -1){
                            that.interactions.restrictionsCardOpened.splice(index, 1)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })

            },

            restoreRestriction: function(indexRestriction, restrictionId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    restriction_id: restrictionId
                }

                that.$swal({
                    title: 'Reativar treinamento',
                    text: 'Tem certeza que gostaria de reativar este treinamento?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/restriction/undestroy`, data)
                    .then(function (response) {
                        that.restrictions_destroyeds.splice(indexRestriction, 1)
                        successNotify('', 'Restrição restaurado com sucesso.')
                        that.getRestrictions();
                        const index = that.interactions.restrictionsCardOpened.indexOf(restrictionId);
                        if(index > -1){
                            that.interactions.restrictionsCardOpened.splice(index, 1)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })

            },

            getDestroyedsRestrictions(){
                let that = this

                that.interactions.clickedToGetDestroyedList = true
                that.placeholder.destroyedList = true

                that.$http.post(`client/restriction/list/destroyeds`, {client_id: that.client.id})
                    .then(function (response) {
                        that.restrictions_destroyeds = response.data.restrictions_destroyeds
                        setTimeout(() => {
                            that.interactions.clickedToGetDestroyedList = false
                            that.placeholder.destroyedList = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
        }
    }
</script>

<style scoped>
/* line-item-group */
.line-item-group {
    margin: 5px 0;
    border: 1px solid RGBA(56, 57, 56, 0.15);
    padding: 10px;
    border-radius: 4px;
}
</style>
