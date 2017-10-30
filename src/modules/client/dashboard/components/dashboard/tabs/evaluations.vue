<template>

    <div v-if="currentClient.id">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/exam.png" alt="">
                <h4 class="f-300">Avaliações físicas</h4>
            </div>

            <div class="row">
                <div class="col-sm-12" v-if="checkPermission('evaluations_edit')">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addEvaluation = !interactions.addEvaluation">
                        <span v-if="interactions.addEvaluation"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar formulário</span>
                        <span v-if="!interactions.addEvaluation"><i class="ion-ios-plus-outline m-r-5"></i>Nova avaliação</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- New Evaluation -->
        <div class="container m-t-20" v-if="interactions.addEvaluation">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4>Nova avaliação</h4>
                </div>

                <div class="card-body card-padding">
                    <fieldset class="full">
                        <legend>Indicadores</legend>

                        <table class="table table-bordered table-vmiddle" v-show="evaluation.items.length" id="eval-index-table">
                            <thead>
                                <tr>
                                    <th>Indicador</th>
                                    <th class="text-center" width="15%">Valor (atual)</th>
                                    <th class="text-center" width="15%">Objetivo (pós)</th>
                                    <th class="text-center" width="10%">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, indexItem) in evaluation.items">
                                    <td>{{item.label}}</td>
                                    <td class="text-center" width="15%">{{item.value}}</td>
                                    <td class="text-center" width="15%">{{item.target}}</td>
                                    <td class="text-center" width="15%"><button class="btn btn-danger btn-xs" @click="evaluation.items.splice(indexItem,1)">x</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <p v-show="!evaluation.items.length">Não há indicadores adicionados à esta avaliação.</p>

                    </fieldset>

                    <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#modalEval">Adicionar novo indicador</button>


                    <div class="form-group full m-t-20">
                        <label>Observações</label>
                        <textarea class="form-control" placeholder="Observações sobre este exame" v-model="evaluation.observation"></textarea>
                    </div>


                    <fieldset class="m-t-20 full">
                        <legend>Fotos</legend>

                        <p class="m-t-20" v-if="!evaluation.photos.length">Nenhuma arquivo enviado.</p>

                        <!-- LISTA DE FOTOS -->
                        <div class="row m-t-20" >

                            <div class="col-md-2 col-sm-6 col-xs-6" v-for="(img, index) in evaluation.photos">
                                <div class="edit-pic-list" :style="`background-image:url('${ img.photo_url }')`"></div>
                                <button class="btn btn-danger btn-xs btn-block" @click.prevent="removePhoto(img.id, index)"><i class="fa fa-trash"></i></button>
                            </div>

                        </div>

                        <!-- BOTOES DE FOTO -->
                        <div>
                            <div v-if="isMobile">
                                 <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                                 <button class="btn btn-sm btn-block btn-success m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                            </div>

                            <div class="" v-if="!isMobile">
                                 <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                            </div>
                        </div>
                    </fieldset>


                    <div class="form-group full m-t-20">
                        <hr>

                        <div class="form-group m-t-10">
                             <label>Compartilhar no feed de atividades?</label>
                             <label class="switch">
                                 <input type="checkbox" v-model="evaluation.share_profile">
                                 <div class="slider round"></div>
                             </label>
                         </div>

                        <button class="btn btn-success btn-sm btn-block" @click="saveEvaluation()" :disabled="!evaluation.items.length">Salvar avaliação</button>
                        <p class="text-center" v-show="!evaluation.items.length">Adicione ao menos um indicador para salvar</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /New Evaluation -->

        <!-- Container Evaluation List & Destroyeds Evaluations -->
        <div class="container m-t-20">
            <!-- EVALUATIONS LIST -->

            <card-placeholder v-if="placeholder.list" :onlyHeader="true">
            </card-placeholder>

            <div class="row">
                <div class="container m-t-20" v-if="!checkPermission('evaluations_show')">
                    <div class="alert alert-info">
                        O cliente não autorizou a visualização das avaliações.
                    </div>
                </div>

                <div class="col-sm-4 col-xs-12" v-for="(evaluation, index) in evaluations" v-if="checkPermission('evaluations_show')">
                    <!-- Card -->
                    <div class="card m-t-10">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.evaluationsCardOpened.toggleSelected(evaluation.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div
                                        class="picture-circle picture-circle-p"
                                        :style="`background-image:url('${ evaluation.from.avatar }')`"
                                    >
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <!-- Infos -->
                                    <h4 class="f-300 t-overflow m-0 m-b-5">
                                        {{ evaluation.from.full_name }}
                                    </h4>
                                    <span class="full d-block f-300 t-overflow m-t-10">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ evaluation.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                    <!-- /Infos -->
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) < 0">
                                <i class="ion-ios-arrow-down d-block f-22"></i>
                            </span>
                            <span class="control-header" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) > -1">
                                <i class="ion-ios-arrow-up f-22"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- / Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) > -1">

                            <h4 class="f-300">Indicadores</h4>

                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>Indíce</th>
                                            <th class="text-center" width="30%">Vr. atual</th>
                                            <th class="text-center" width="30%">Vr. objetivo</th>
                                            <th class="text-center" width="30%">Histórico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,i) in evaluation.items">
                                            <td>{{item.label}}</td>
                                            <td class="text-center" width="30%">
                                                <small class="label label-warning f-400 m-r-5">
                                                    {{ item.value }}
                                                </small>
                                            </td>
                                            <td class="text-center" width="30%">
                                                <small class="label label-success f-400 m-r-5">
                                                    {{ item.target }}
                                                </small>
                                            </td>
                                            <td>
                                                <router-link :to="{name: 'client.dashboard.history.evaluations', params: {index_history: item.label}}" tag="button" class="btn btn-xs btn-primary">Histórico</router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                            <h4 class="f-300">Observações</h4>
                            <span class="f-300 f-info" v-if="evaluation.observation">
                                {{ evaluation.observation }}
                            </span>
                            <span class="f-300 f-info" v-if="!evaluation.observation">
                                Esta avaliação não possui observações.
                            </span>

                            <div class="m-t-10 m-b-10" v-if="evaluation.photos.length">
                                <button
                                    class="btn btn-xs btn-primary f-300"
                                    data-target="#modalEvalPhotos"
                                    data-toggle="modal"
                                    @click="evaluationToModal = evaluation"
                                >
                                    <i class="ion-ios-camera-outline m-r-5 f-18"></i>Exibir fotos
                                </button>
                            </div>
                            <br>
                            <hr>

                            <button class="btn btn-info btn-xs btn-block m-t-10" @click="savePDF(evaluation.id)">Imprimir</button>

                            <hr>

                            <button class="btn btn-xs btn-danger btn-block f-300" @click="removeEvaluation(evaluation.id, index)" v-if="checkPermission('evaluations_edit')">Excluir avaliação</button>

                        </div>
                        <!-- /Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
            <!-- EVALUATIONS LIST -->

            <div class="text-center" >
                <span class="d-block m-t-30 f-300" v-if="checkPermission('evaluations_show') && !evaluations.length">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhuma avaliação adicionada
                </span>

                <button class="btn btn-info btn-sm m-t-20 m-b-20" @click="getDestroyedsEvaluations()"v-if="checkPermission('evaluations_show')">Carregar avaliações excluídas</button>

            </div>

            <!-- DESTROYEDS EVALUATIONS LIST -->

            <card-placeholder
                v-if="interactions.clickedToGetDestroyedList && placeholder.destroyedList"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(evaluation, index) in evaluations_destroyeds">
                    <!-- Card -->
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.evaluationsCardOpened.toggleSelected(evaluation.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ evaluation.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <h4 class="d-block f-300 t-overflow m-0 m-b-5">
                                        {{ evaluation.from.full_name }}
                                    </h4>
                                    <span class="full d-block f-300 t-overflow m-t-10">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ evaluation.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>

                            <!-- toggle button open and close card -->
                            <span class="control-header" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) < 0">
                                <i class="ion-ios-arrow-down d-block f-22"></i>
                            </span>
                            <span class="control-header" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) > -1">
                                <i class="ion-ios-arrow-up f-22"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- / Card Header -->
                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.evaluationsCardOpened.indexOf(evaluation.id) > -1">

                            <span class="label label-danger f-300">Avaliação removida em: {{evaluation.deleted_at | moment('DD/MM/YYYY HH:mm:ss')}}</span>
                            <h4 class="f-300">Indicadores</h4>

                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>Indíce</th>
                                            <th class="text-center" width="30%">Vr. atual</th>
                                            <th class="text-center" width="30%">Vr. objetivo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,i) in evaluation.items">
                                            <td>{{item.label}}</td>
                                            <td class="text-center" width="30%">
                                                <small class="label label-warning f-400 m-r-5">
                                                    {{ item.value }}
                                                </small>
                                            </td>
                                            <td class="text-center" width="30%">
                                                <small class="label label-success f-400 m-r-5">
                                                    {{ item.target }}
                                                </small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <h4 class="f-300">Observações</h4>
                            <span class="f-300 f-info" v-if="evaluation.observation">
                                {{ evaluation.observation }}
                            </span>
                            <span class="f-300 f-info" v-if="!evaluation.observation">
                                Esta avaliação não possui observações.
                            </span>

                            <div class="m-t-10 m-b-10" v-if="evaluation.photos.length">
                                <button
                                    class="btn btn-xs btn-primary f-300"
                                    data-target="#modalEvalPhotos"
                                    data-toggle="modal"
                                    @click="evaluationToModal = evaluation"
                                >
                                    <i class="ion-ios-camera-outline m-r-5 f-18"></i>Exibir fotos
                                </button>
                            </div>
                            <br>
                            <hr>
                            <button class="btn btn-xs btn-info btn-block f-300" @click="restoreEvaluation(evaluation, index)" v-if="checkPermission('evaluations_edit')">Restaurar avaliação</button>

                        </div>
                        <!-- /Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
            <!-- DESTROYEDS EVALUATIONS -->
        </div>
        <!-- / Container Evaluation List & Destroyeds Evaluations -->

        <!-- MODAL ADD ITEM ON EVALUATION -->
        <div class="modal" id="modalEval" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Adicionar novo indicador</h4>
                    </div>
                    <div class="modal-body">
                        <p>Adicione medidas ou indicadores para acompanhar sua evolução ou de seu cliente.</p>
                        <div class="form-group">
                            <label>Indicador</label>
                            <multiselect
                                v-model="selectedIndex"
                                :options="evaluation_index"
                                :close-on-select="true"
                                :clear-on-select="true"
                                placeholder="Selecione um indicador"
                                label="label"
                                track-by="id"
                                @input="setIndex"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desmarcar"
                                selectedLabel="Selecionado"
                            ></multiselect>
                        </div>

                        <span class="label label-info p-5 p-l-10 p-r-10" v-show="newEvaluationItem.label">Índice selecionado: {{ newEvaluationItem.label}}</span>

                        <div class="row m-t-10">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label>Valor (atual)</label>
                                    <input
                                        class="form-control"
                                        type="tel"
                                        step=".01"
                                        placeholder="Valor atual"
                                        v-model="newEvaluationItem.value"
                                        data-mask="0000.00" data-mask-reverse="true"
                                        :disabled="!newEvaluationItem.label"
                                    >
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label>Objetivo (pós)</label>
                                    <input
                                        class="form-control"
                                        type="number"
                                        step=".01"
                                        placeholder="Valor objetivo futuro"
                                        v-model="newEvaluationItem.target"
                                        :disabled="!newEvaluationItem.label"
                                    >
                                </div>
                            </div>
                        </div>

                        <hr>

                        <p>Não localizou o indicador que gostaria de utilizar?</p>
                        <button class="btn btn-sm btn-info" @click="openModalNewEvaluationIndex()">Criar novo indicador</button>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button class="btn btn-info" @click="addItemToEvaluation()" :disabled="!newEvaluationItem.target || !newEvaluationItem.value || !newEvaluationItem.label">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL ADD ITEM ON EVALUATION -->

        <!-- MODAL CREATE NEW EVALUATION INDEX -->
        <div class="modal" id="modalEvaluationIndex" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Criar novo indicador</h4>
                    </div>
                    <div class="modal-body">
                        <p>Verifique novamente se o indicador não está cadastrado:</p>
                        <!-- <div class="form-group" v-show="!interactions.indexNotFound">
                            <label>Lista de indicadores</label>
                            <multiselect
                                :options="evaluation_index"
                                :searchable="true"
                                :label="'label'"
                                :close-on-select="true"
                                :show-labels="false"
                                placeholder="Selecione um indicador"
                                v-model="newEvaluationIndex"
                            ></multiselect>
                        </div> -->

                        <!-- <button class="btn btn-info btn-sm" v-show="!interactions.indexNotFound" @click="interactions.indexNotFound = true">Não localizei o indicador que quero utilizar</button> -->

                        <div class="row m-t-10">
                            <div class="col-md-12 col-xs-12">
                                <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                                    <label>Novo indicador</label>
                                    <input
                                        v-validate="'required'"
                                        type="text"
                                        data-vv-name="evaluation" data-vv-as="Indicador"
                                        class="form-control"
                                        placeholder="Nome do indicador"
                                        v-model="newEvaluationIndex"
                                    >
                                    <small class="f-300 f-danger">{{ errors.first('evaluation') }}</small>

                                </div>
                            </div>

                        </div>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#modalEval">Voltar</button>
                        <button class="btn btn-info" @click="createNewEvaluationIndex()" :disabled="!newEvaluationIndex">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL CREATE NEW EVALUATION INDEX -->

        <!-- MODAL PHOTOS -->
        <div class="modal" id="modalEvalPhotos" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Fotos avaliação: {{evaluationToModal.created_at | moment('DD/MM/YYYY HH:mm:ss')}}</h4>
                    </div>
                    <div class="modal-body">

                        <p>Clique duas vezes para abrir no navegador.</p>

                        <div class="row">
                            <div class="col-md-12 col-xs-12" v-for="(photo, indexPhoto) in evaluationToModal.photos">
                                <div class="form-group">
                                    <img class="img-responsive" :src="photo.photo_url" v-on:dblclick="openSystemUrl(photo.photo_url)"/>
                                </div>

                            </div>
                        </div>


                    </div>
                    <div class="modal-footer borderless">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODALPHOTOS -->

        <photo-uploader
            :isvisible.sync="photoUploader.isvisible"
            :send-action="storeOnDesktop"
            @close-photo-uploader-modal="handlePhotoUploadModal"
        ></photo-uploader>

    </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import moment from 'moment'
    import Multiselect from 'vue-multiselect'

    import {getClassNameForExtension} from 'font-awesome-filetypes'
    import {apiUrl, apiRootUrl} from '@/config/'
    import {cleanEvaluationModel} from '@/models/Evaluation';
    import Avatar from '@/components/avatar.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    const UUID = require('uuid-js')

    export default{
        name: 'client-dashboard-evaluations',
        components: {
            photoUploader: require('@/components/photo-uploader.vue'),
            Avatar,
            cardPlaceholder,
            Multiselect
        },
        props: {
            client: {
                type: Object
            }
        },
        data() {
            return {
                placeholder: {
                    list: true,
                    destroyedList: true
                },
                evaluation: cleanEvaluationModel(),
                evaluations: [],
                evaluations_destroyeds: [],
                selectedIndex: null,
                newEvaluationItem: {
                    label: '',
                    value: '',
                    target: '',
                },
                evaluation_index: [],
                evaluationToModal: cleanEvaluationModel(),
                interactions: {
                    addEvaluation: false,
                    evaluationsCardOpened: [],
                    indexNotFound: false,
                    clickedToGetDestroyedList: false,
                },
                newEvaluationIndex: '',
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
            }
        },

        computed:{
            ...mapGetters(['AuthToken', 'currentCompany', 'currentUser','checkPermission', 'currentClient'])
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

            this.getEvaluations()

            if(window.cordova){
                this.isMobile = true
            }
            this.evaluation.client_id = this.client.id;
            this.evaluation.from = this.currentUser;
            this.getEvaluationIndex();
        },
        methods: {

            ...mapActions(['authSetUser', 'setLoading', 'incrementClientTotalXp']),

            openModalNewEvaluationIndex: function(){
                let that = this

                $('#modalEval').modal('hide');
                $('#modalEvaluationIndex').modal('show');

            },

            getEvaluationIndex() {
                let that = this

                that.$http.get(`tools/evaluation_index/list`)
                    .then(function (response) {
                        that.evaluation_index = response.data.evaluation_index
                        if (!that.evaluation_index.length) {
                            that.interactions.indexNotFound = true
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            createNewEvaluationIndex() {
                let that = this

                const validateNewEvaluationIndex = _.find(that.evaluation_index, { 'label' : that.newEvaluationIndex })

                if (validateNewEvaluationIndex) {
                    warningNotify('', 'O índice já contém lista.')
                } else {
                    that.$http.post(`tools/evaluation_index/create`, { label: that.newEvaluationIndex.label ? that.newEvaluationIndex.label : that.newEvaluationIndex })
                        .then(function (response) {
                            that.evaluation_index.push(response.data.evaluation_index)
                            successNotify('', 'Novo índice adicionado com sucesso.')
                            that.interactions.indexNotFound = false;
                            $('#modalEvaluationIndex').modal('hide');
                            $('#modalEval').modal('show');
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }
            },

            setIndex(select){
                if(select){
                    this.selectedIndex = select
                    this.newEvaluationItem.label = select.label
                }
            },

            addItemToEvaluation: function(){
                let that = this

                that.newEvaluationItem.value = that.newEvaluationItem.value.replace(',', '.');
                that.newEvaluationItem.target = that.newEvaluationItem.target.replace(',', '.');

                that.evaluation.items.push(JSON.parse(JSON.stringify(that.newEvaluationItem)));

                that.newEvaluationItem.label = '';
                that.newEvaluationItem.value = '';
                that.newEvaluationItem.target = '';
                that.selectedIndex = null;

                $('#modalEval').modal('hide');
                $('#eval-index-table').focus();
            },

            openSystemUrl: function(url){
                window.open(url, '_system');
            },

            getEvaluations(){
                let that = this

                that.placeholder.list = true
                that.$http.post(`client/evaluation/list`, {client_id: that.$route.params.client_id})
                    .then(function (response) {
                        that.evaluations = response.data.evaluations
                        setTimeout(() => {
                            that.placeholder.list = false
                        }, 200)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handeIcon(extension){
               return getClassNameForExtension(extension)
            },

            saveEvaluation: function(){
                let that = this

                that.evaluation.client_id = that.client.id;
                that.$http.post('client/evaluation/store', that.evaluation)
                    .then(function (response) {

                        that.evaluations.push(JSON.parse(JSON.stringify(that.evaluation)));
                        that.evaluation = cleanEvaluationModel();
                        that.evaluation.client_id = that.client.id;
                        that.interactions.addEvaluation = false;

                        //Add XP points to client
                        that.incrementClientTotalXp(1)

                        successNotify('', 'Avaliação salva com sucesso')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });


            },
            //Get from device camera
            getPicture: function () {
                let that = this

                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                });

                function onSuccess(imageURI) {

                    that.storeOnMobile(imageURI);

                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },

            //Camera roll
            getCameraRoll: function(){
                let that = this

                navigator.camera.getPicture(function cameraSuccess(imageURI) {

                        that.storeOnMobile(imageURI);

                    },
                    function (message) {
                        errorNotify('', message)
                    },
                    {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    }
                )
            },

            // upload from mobile
            storeOnMobile(imageURI) {
                let that = this

                var win = function (response) {

                    let api_response = JSON.parse(response.response)
                    that.evaluation.photos.push(api_response.photo)
                    that.setLoading({is_loading: false, message: ''})
                    successNotify('', 'Imagem enviada com sucesso')

                }

                var fail = function (error) {

                    that.setLoading({is_loading: false, message: ''})
                    errorNotify('', 'Houve um erro ao enviar a imagem')
                    console.log(error);
                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = "myphoto.jpg";
                options.mimeType = "image/jpeg";
                options.headers = {'Authorization': `Bearer ${that.AuthToken}`};

                var params = new Object();

                params.evaluation_id = that.evaluation.id;
                params.client_id = that.client.id;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/client/evaluation/photo/upload`), win, fail, options);
            },

            storeOnDesktop: function(croppedFile){
                let that = this

                let formData = new FormData();
                formData.append('evaluation_id', that.evaluation.id)
                formData.append('client_id', that.client.id)
                formData.append('file', croppedFile.file)


                that.$http.post('client/evaluation/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {

                    successNotify('', 'Imagem adicionada com sucesso à avaliação.')
                    that.evaluation.photos.push(response.data.photo)

                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            handlePhotoUploadModal(visibility){
                let that = this

                that.photoUploader.isvisible = visibility
            },
/* IMAGE */

            removeEvaluation(evaluation_id, index){
                let that = this

                var data = {
                    client_id: that.client.id,
                    evaluation_id: evaluation_id
                }

                that.$swal({
                    title: 'Excluir avaliação',
                    text: 'Tem certeza que gostaria de excluir esta avaliação?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('client/evaluation/destroy', data )
                        .then(function (response) {

                            that.evaluations.splice(index,1)
                            successNotify('', 'Avaliação removida com sucesso')

                            const index = that.interactions.evaluationsCardOpened.indexOf(evaluation_id);
                            if(index > -1){
                                that.interactions.evaluationsCardOpened.splice(index, 1)
                            }

                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(function () {

                })

            },

            restoreEvaluation(evaluation, index){
                let that = this

                var data = {
                    client_id: that.client.id,
                    evaluation_id: evaluation.id
                }

                that.$http.post('client/evaluation/undestroy', data)
                    .then(function (response) {

                        that.evaluations_destroyeds.splice(index,1)
                        that.evaluations.push(JSON.parse(JSON.stringify(evaluation)));
                        successNotify('', 'Avaliação removida com sucesso')
                        const index = that.interactions.evaluationsCardOpened.indexOf(evaluation.id);
                        if(index > -1){
                            that.interactions.evaluationsCardOpened.splice(index, 1)
                        }


                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            removePhoto(evaluation_photo_id, index){
                let that = this

                var data = {
                    client_id: that.client.id,
                    evaluation_photo_id: evaluation_photo_id
                }

                that.$http.post('client/evaluation/photo/destroy', data)
                    .then(function (response) {

                        that.evaluation.photos.splice(index,1)
                        successNotify('', 'Imagem removida com sucesso')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getDestroyedsEvaluations(){
                let that = this
                that.interactions.clickedToGetDestroyedList = true
                that.placeholder.destroyedList = true
                that.$http.post(`client/evaluation/list/destroyeds`, {client_id: that.client.id})
                    .then(function (response) {
                        that.evaluations_destroyeds = response.data.evaluations_destroyeds
                        setTimeout(() => {
                            that.placeholder.destroyedList = false
                            that.interactions.clickedToGetDestroyedList = false
                        }, 200)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            // OPEN SYSTEM NAVIGATOR WITH PDF TO DOWNLOAD
            savePDF(id) {
                window.open( apiRootUrl + 'tools/print/evaluation/' + id, '_system', null);
            },

        }
    }
</script>
