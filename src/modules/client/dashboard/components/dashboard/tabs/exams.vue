<template>
    <div>
        
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/exam.png" alt="">
                <h4 class="f-300">Exames</h4>
            </div>

            <div class="row">
                <div class="col-sm-12" v-if="checkPermission('exams_edit')">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addExam = !interactions.addExam">
                        <span v-if="interactions.addExam"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar formulário</span>
                        <span v-if="!interactions.addExam"><i class="ion-ios-plus-outline m-r-5"></i>Novo exame</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container m-t-20" v-if="interactions.addExam">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Novo exame</h4>
                </div>

                <div class="card-body card-padding">
                    <div :class="{'form-group': true, 'has-error': errors.has('type')}">
                        <label>Tipo <small>(obrigatório)</small></label>
                        <input
                            type="text"
                            v-validate="'required'"
                            data-vv-name="type" data-vv-as="Tipo"
                            class="form-control"
                            placeholder="Imagem, hemograma, físico, ergonômico"
                            v-model="exam.type"
                        >
                        <small class="f-300 f-danger">{{ errors.first('type') }}</small>
                    </div>


                    <div class="form-group m-t-20 full">
                        <label>Observações</label>
                        <textarea class="form-control" placeholder="Observações sobre este exame" v-model="exam.observation"></textarea>
                    </div>


                    <fieldset class="m-t-20 full">
                        <legend>Anexos</legend>
                        <p>Clique duas vezes para abrir no navegador</p>
                        <p class="m-t-20" v-if="!exam.attachments.length">Nenhuma arquivo enviado.</p>

                        <!-- LISTA DE FOTOS -->
                        <div class="row m-t-20" >

                            <div class="col-md-2 col-sm-6 col-xs-6" v-for="(attachment, index) in exam.attachments">
                                <button class="btn btn-info btn-xs btn-block" @click="openSystemUrl(attachment.attachment_url)">
                                    {{attachment.filename}}
                                </button>
                                <br>
                                <button class="btn btn-danger btn-xs btn-block" @click.prevent="removeAttachment(attachment.id, index)"><i class="fa fa-trash"></i></button>
                            </div>

                        </div>

                        <!-- BOTOES DE FOTO -->
                        <div>
                            <div v-if="isMobile">
                                 <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                                 <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                            </div>

                            <div class="" v-if="!isMobile">
                                 <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                            </div>
                        </div>
                    </fieldset>


                    <div class="form-group full m-t-20">
                        <hr>
                        <button class="btn btn-sm btn-primary btn-block" @click="saveExam()" :disabled="!exam.attachments.length">Salvar Exame</button>
                        <p class="text-center" v-show="!exam.attachments.length">Adicione ao menos um anexo para salvar o exame</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="container m-t-20">

            <!-- exams LIST -->

            <card-placeholder v-if="placeholder.list" :onlyHeader="true">
            </card-placeholder>

            <div class="row">

                <div class="container m-t-20" v-if="!checkPermission('exams_show')">
                    <div class="alert alert-info">
                        O cliente não autorizou a visualização dos exames.
                    </div>
                </div>

                <div class="col-sm-4 col-xs-12" v-for="(exam, index) in exams"  v-if="checkPermission('exams_show')">
                    <!-- Card -->
                    <div class="card m-t-10 m-b-10">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.examsCardOpened.toggleSelected(exam.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ exam.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <h4 class="d-block f-300 t-overflow m-0 m-b-5">
                                        {{ exam.from.full_name }}
                                    </h4>
                                    <span class="full d-block f-300 t-overflow m-t-5">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ exam.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header" v-if="interactions.examsCardOpened.indexOf(exam.id) < 0">
                                <i class="ion-ios-arrow-down d-block f-22"></i>
                            </span>
                            <span class="control-header" v-if="interactions.examsCardOpened.indexOf(exam.id) > -1">
                                <i class="ion-ios-arrow-up f-22"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- / Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.examsCardOpened.indexOf(exam.id) > -1">

                            <h4 class="f-300">Tipo</h4>
                            <span class="f-300 f-info" v-if="exam.observation">
                                {{ exam.type }}
                            </span>
                            <h4 class="f-300">Observações</h4>
                            <span class="f-300 f-info" v-if="exam.observation">
                                {{ exam.observation }}
                            </span>
                            <span class="f-300 f-info" v-if="!exam.observation">
                                Este exame não possui observações.
                            </span>

                            <h4 class="f-300">Anexos</h4>
                            <p>Clique duas vezes para abrir</p>
                            <div class="" v-for="(attachment, indexAttachment) in exam.attachments">
                                <span class="label label-default p-15 t-overflow cursor-pointer m-b-5" @dblclick="openSystemUrl(attachment.attachment_url)">{{attachment.filename}}</span>
                            </div>

                            <br>
                            <hr>

                            <button class="btn btn-xs btn-danger btn-block f-300" @click="removeExam(exam.id, index)">Excluir exame</button>

                        </div>
                        <!-- /Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
            <!-- exams -->

            <div class="text-center" >
                <span class="d-block m-t-30 f-300" v-if="checkPermission('exams_show') && !exams.length">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum exame adicionado
                </span>
                <br>

                <button class="btn btn-info btn-sm m-b-20" @click="getDestroyedsexams()" v-if="checkPermission('exams_show')">Carregar exames excluídos</button>

            </div>


            <!-- DESTROYEDS exams LIST -->

            <card-placeholder
                v-if="interactions.clickedToGetDestroyedList && placeholder.destroyedList"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row">
                <div class="col-sm-4 col-xs-12" v-for="(exam, index) in exams_destroyeds" v-if="checkPermission('exams_show')">
                    <!-- Card -->
                    <div class="card m-b-10">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.examsCardOpened.toggleSelected(exam.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ exam.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <h4 class="d-block f-300 t-overflow m-0 m-b-5">
                                        {{ exam.from.full_name }}
                                    </h4>
                                    <span class="full d-block f-300 t-overflow m-t-5">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ exam.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header" v-if="interactions.examsCardOpened.indexOf(exam.id) < 0">
                                <i class="ion-ios-arrow-down d-block f-22"></i>
                            </span>
                            <span class="control-header" v-if="interactions.examsCardOpened.indexOf(exam.id) > -1">
                                <i class="ion-ios-arrow-up f-22"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- / Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.examsCardOpened.indexOf(exam.id) > -1">

                            <h4 class="f-300">Tipo</h4>
                            <span class="f-300 f-info" v-if="exam.observation">
                                {{ exam.type }}
                            </span>
                            <h4 class="f-300">Observações</h4>
                            <span class="f-300 f-info" v-if="exam.observation">
                                {{ exam.observation }}
                            </span>
                            <span class="f-300 f-info" v-if="!exam.observation">
                                Este exame não possui observações.
                            </span>

                            <h4 class="f-300">Anexos</h4>
                            <p>Clique duas vezes para abrir</p>
                            <div class="" v-for="(attachment, indexAttachment) in exam.attachments">
                                <span class="label label-default p-15 t-overflow cursor-pointer" @dblclick="openSystemUrl(attachment.attachment_url)">{{attachment.filename}}</span>
                            </div>

                            <br>
                            <hr>

                            <button class="btn btn-xs btn-block btn-info f-300" @click="restoreExam(exam, index)" v-if="checkPermission('exams_edit')">Restaurar exame</button>

                        </div>
                        <!-- /Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
            <!-- DESTROYEDS exams -->
        </div>

        <!-- MODAL PHOTOS -->
        <div class="modal" id="modalEvalPhotos" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Fotos avaliação: {{examToModal.created_at | moment('DD/MM/YYYY HH:mm:ss')}}</h4>
                    </div>
                    <div class="modal-body">

                        <p>Clique duas vezes para abrir no navegador.</p>

                        <div class="row">
                            <div class="col-md-12 col-xs-12" v-for="(photo, indexPhoto) in examToModal.attachments">
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
    import {getClassNameForExtension} from 'font-awesome-filetypes'
    import {apiUrl} from '@/config/'
    import {cleanExamModel} from '@/models/Exams';
    import Avatar from '@/components/avatar.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    const UUID = require('uuid-js')

    export default{
        name: 'client-dashboard-exams',
        components: {
            photoUploader: require('@/components/photo-uploader.vue'),
            Avatar,
            cardPlaceholder
        },
        props: {
            client: {
                type: Object
            }
        },
        data() {
            return {
                exam: cleanExamModel(),
                exams: [],
                exams_destroyeds: [],
                examToModal: cleanExamModel(),
                interactions: {
                    addExam: false,
                    examsCardOpened: [],
                    clickedToGetDestroyedList: false
                },
                placeholder: {
                    list: true,
                    destroyedList: true
                },
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

            this.getExams()

            if(window.cordova){
                this.isMobile = true
            }

            this.exam.client_id = this.client.id;
            this.exam.from = this.currentUser;
        },
        methods: {

            ...mapActions(['authSetUser', 'setLoading', 'incrementClientTotalXp']),


            openSystemUrl: function(url){
                window.open(url, '_system');
            },

            getExams(){
                let that = this

                that.placeholder.list = true

                that.$http.post(`client/exam/list`, {client_id: that.$route.params.client_id})
                    .then(function (response) {
                        that.exams = response.data.exams

                        setTimeout(() => {
                            that.placeholder.list = false
                        }, 200);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handeIcon(extension){
               return getClassNameForExtension(extension)
            },

            saveExam: function(){
                let that = this
                that.exam.type = that.exam.type.toTitleCase()
                that.$http.post('client/exam/store', that.exam)
                    .then(function (response) {

                        that.interactions.addExam = false;
                        that.exams.push(JSON.parse(JSON.stringify(that.exam)));
                        that.exam = cleanExamModel();
                        that.exam.client_id = that.client.id;

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
                    that.exam.attachments.push(api_response.attachment)
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

                params.exam_id = that.exam.id;
                params.client_id = that.client.id;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/client/exam/attachment/upload`), win, fail, options);
            },

            storeOnDesktop: function(croppedFile){
                let that = this

                let formData = new FormData();
                formData.append('exam_id', that.exam.id)
                formData.append('client_id', that.client.id)
                formData.append('file', croppedFile.file)


                that.$http.post('client/exam/attachment/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {

                    successNotify('', 'Imagem adicionada com sucesso.')
                    that.exam.attachments.push(response.data.attachment)

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

            removeExam(exam_id, index){
                let that = this

                var data = {
                    exam_id: exam_id,
                    client_id: that.client.id
                }

                that.$swal({
                    title: 'Excluir exame',
                    text: 'Tem certeza que gostaria de excluir este exame?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('client/exam/destroy', data)
                        .then(function (response) {

                            that.exams.splice(index,1)
                            successNotify('', 'Exame removido com sucesso')

                            const index = that.interactions.examsCardOpened.indexOf(exam_id);
                            if(index > -1){
                                that.interactions.examsCardOpened.splice(index,1)
                            }

                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(function () {

                })


            },

            restoreExam(exam, index){
                let that = this

                var data = {
                    exam_id: exam.id,
                    client_id: that.client.id
                }

                that.$http.post('client/exam/undestroy', data)
                    .then(function (response) {

                        that.exams_destroyeds.splice(index,1)
                        that.exams.push(JSON.parse(JSON.stringify(exam)));
                        successNotify('', 'Exame restaurado com sucesso')

                        const index = that.interactions.examsCardOpened.indexOf(exam.id);
                        if(index > -1){
                            that.interactions.examsCardOpened.splice(index,1)
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            removeAttachment(exam_attachment_id, index){
                let that = this

                var data = {
                    exam_attachment_id: exam_attachment_id,
                    client_id: that.client.id
                }

                that.$http.post('client/exam/attachment/destroy', data)
                    .then(function (response) {

                        that.exam.attachments.splice(index,1)
                        successNotify('', 'Imagem removida com sucesso')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getDestroyedsexams(){
                let that = this

                that.interactions.clickedToGetDestroyedList = true
                that.placeholder.destroyedList = true

                that.$http.post(`client/exam/list/destroyeds`, {client_id: that.client.id})
                    .then(function (response) {
                        that.exams_destroyeds = response.data.exams_destroyeds

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


</style>
