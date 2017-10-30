<template lang="html">

    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/certification.png" alt="">
                <h4 class="f-300">Certificados</h4>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addCertification = !interactions.addCertification">
                        <span v-if="interactions.addCertification"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar</span>
                        <span v-if="!interactions.addCertification"><i class="ion-ios-plus-outline m-r-5"></i>Novo certificado</span>
                    </button>
                </div>
            </div>

            <div class="m-t-20">

                <!-- Add Certification Form -->
                <div v-if="interactions.addCertification">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-header ch-alt">
                                    <h4 class="f-300 m-0 text-center">Novo certificado</h4>
                                </div>
                                <div class="card-body card-padding">

                                    <div :class="{'form-group': true, 'has-error': errors.has('institution')}">
                                        <label for="certification-institution">Instituição</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-validate="'required'"
                                            data-vv-name="institution" data-vv-as="Instituição"
                                            id="certification-institution"
                                            v-model="newCertification.institution"
                                            placeholder="Instituição ou palestrante"
                                        >
                                        <small class="f-300 f-danger">{{ errors.first('institution') }}</small>
                                    </div>

                                    <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                                        <label for="certification-name">Nome</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-validate="'required'"
                                            data-vv-name="name" data-vv-as="Nome"
                                            id="certification-name"
                                            v-model="newCertification.name"
                                            placeholder="Nome do curso ou certificado"
                                        >
                                        <small class="f-300 f-danger">{{ errors.first('name') }}</small>
                                    </div>

                                    <div :class="{'form-group': true, 'has-error': errors.has('order')}">
                                        <label for="certification-order">Prioridade de exibição</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-validate="'required'"
                                            data-vv-name="order" data-vv-as="Prioridade de exibição"
                                            id="certification-order"
                                            v-model="newCertification.priority"
                                            placeholder="De 1 a 5"
                                        >
                                        <small class="f-300 f-danger">{{ errors.first('order') }}</small>
                                    </div>

                                    <div class="form-group">
                                        <label for="certification-grantedat">Data de conclusão</label>
                                        <datepicker
                                            id="certification-grantedat"
                                            input-class="form-control"
                                            v-model="newCertification.granted_at"
                                            name="newevent-date"
                                            language="pt-br"
                                            placeholder="Escolha a data de conclusão"
                                            format="dd/MM/yyyy"
                                            :required="true"
                                        >
                                        </datepicker>
                                        <small class="f-300 f-danger" v-show="!newCertification.granted_at">O campo Data de conclusão é obrigatório</small>
                                   </div>

                                    <div class="form-group">
                                        <label for="certification-order">Descrição</label>
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            id="certification-order"
                                            v-model="newCertification.description"
                                            placeholder="Informe uma descrição das atividades"
                                        ></textarea>
                                    </div>

                                    <fieldset class="m-t-20 full">
                                        <legend>Foto</legend>
                                        <div v-if="isMobile && !croppedFile && !imageURI">
                                             <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                                             <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                                        </div>

                                        <div class="" v-if="!isMobile && !croppedFile && !imageURI">
                                             <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                                        </div>

                                        <p class="m-t-20" v-if="!croppedFile && !imageURI">Nenhuma arquivo enviado.</p>

                                        <div class="row m-t-20" >

                                            <div class="col-md-4 col-sm-6 col-xs-12">

                                                <div v-if="imageURI">
                                                    <div class="edit-pic-list" :style="`background-image:url('${ imageURI }')`" v-if="imageURI"></div>
                                                    <button class="btn btn-danger btn-xs btn-block" @click="imageURI = ''"><i class="fa fa-trash"></i></button>
                                                </div>

                                                <div v-if="croppedFile">
                                                    <button class="btn btn-default btn-block btn-lg t-overflow">{{croppedFile.file.name}}</button>
                                                    <button class="btn btn-danger btn-xs btn-block" @click="croppedFile = ''"><i class="fa fa-trash"></i></button>
                                                </div>

                                            </div>
                                        </div>
                                    </fieldset>

                                    <hr>

                                    <button
                                        type="button"
                                        class="btn btn-success btn-block"
                                        @click="saveCertification()"
                                        :disabled="!newCertification.institution || !newCertification.name || !newCertification.priority || !newCertification.granted_at"
                                    >
                                        Salvar certificado
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Add Certification Form -->

                <card-placeholder
                    v-if="placeholder"
                    :onlyHeader="true"
                    :onlyHeaderOpened="true"
                    :onlyHeaderNoImage="true"
                >
                </card-placeholder>

                <!-- List Certifications -->
                <div class="row" v-if="!placeholder && certifications.length">
                    <div class="col-sm-12">
                        <div class="card cursor-pointer" v-for="certification in certifications">

                            <div class="card-header ch-alt">
                                <h4 class="f-300 m-0 text-center">{{ certification.name }}</h4>
                            </div>
                            <!-- Certification Card Body -->
                            <div class="card-body card-padding">
                                <span class="d-block f-300"><strong class="f-400">Instituição:</strong>
                                    <small>{{ certification.institution ? certification.institution : 'Não informado' }}</small>
                                </span>
                                <span class="d-block f-300"><strong class="f-400">Data de conclusão:</strong>
                                    <span v-if="certification.granted_at"><small>{{ certification.granted_at | moment('MMMM') }} de {{ certification.granted_at | moment('YYYY') }}</small></span>
                                    <span v-if="!certification.granted_at"><small>Não informado</small></span>
                                </span>
                                <span class="d-block f-300"><strong class="f-400">Descrição:</strong>
                                    <span v-if="certification.description"><small>{{ certification.description }}</small></span>
                                    <span v-if="!certification.description"><small>Não informado</small></span>
                                </span>
                                <span class="d-block f-300"><strong class="f-400">Prioridade de ordenação:</strong>
                                    <span><small>{{ certification.priority }}</small></span>
                                </span>
                                <hr>
                                <span class="f-300 f-danger" v-if="!certification.photo_url">Imagem do certificado não informada</span>
                                <img class="img-responsive" :src="certification.photo_url" :alt="certification.name" v-if="certification.photo_url">
                                <hr>
                                <button class="btn btn-danger btn-xs btn-block m-t-10" @click="removeCertification(certification.id)">Remover certificado</button>
                            </div>
                            <!-- / Certification Card Body -->
                        </div>

                    </div>
                </div>
                <!-- / List Certifications -->

                <!-- !Certifications.length -->
                <div class="text-center" v-if="!certifications.length">
                    <span class="d-block m-t-30 f-300">
                        <i class="d-block ion-sad-outline f-24"></i>
                        Nenhum certificado adicionado.
                    </span>
                </div>
                <!-- / !Certifications.length -->
            </div>

        </div>

        <photo-uploader
            :isvisible.sync="photoUploader.isvisible"
            :send-action="setCroppedFile"
            @close-photo-uploader-modal="handlePhotoUploadModal"
        ></photo-uploader>

    </div>

</template>

<script>
    import {apiUrl} from '@/config/'
    import {mapGetters, mapActions} from 'vuex'
    import Certifications from '@/models/ProfessionalCertifications'
    import Datepicker from 'vuejs-datepicker'
    import moment from 'moment'

    import {cleanCertification} from '@/models/Certification'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'admin-professional-certifications',
        components: {
            photoUploader: require('@/components/photo-uploader.vue'),
            Datepicker,
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    addCertification: false
                },
                placeholder: true,
                smallDevice: window.screen.width <= 414 ? true : false,
                certifications: [],
                newCertification: cleanCertification(),
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
                imageURI: '',
                croppedFile: '',
            }
        },

        computed: {
            ...mapGetters(['currentUser', , 'AuthToken'])
        },

        mounted() {
            this.getCertifications()

            if(window.cordova){
                this.isMobile = true
            }
        },

        methods: {

            ...mapActions(['setLoading']),

            getCertifications() {
                let that = this

                that.placeholder = true

                that.$http.get(`professional/certification/list/${that.currentUser.id}`)
                    .then(function (response) {
                        that.certifications = response.data.certifications

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            saveCertification: function(){
                let that = this

                that.newCertification.name = that.newCertification.name.toTitleCase()
                that.newCertification.granted_at = moment(that.newCertification.granted_at).format('DD/MM/YYYY')
                if(window.cordova){
                    that.storeOnMobile();
                } else {
                    that.storeOnDesktop();
                }

            },

            removeCertification: function(id){
                let that = this

                that.$swal({
                    title: 'Excluir certificado',
                    text: 'Tem certeza que gostaria de excluir este certificado?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.get(`professional/certification/destroy/${id}`)
                    .then(function (response) {
                        that.getCertifications();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })


            },


            /* IMAGE */
            setCroppedFile: function(croppedFile){
                let that = this

                that.croppedFile = croppedFile;

            },
            //Get from device camera
            getPicture: function () {
                let that = this
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                });
                function onSuccess(imageURI) {
                    that.imageURI = imageURI;
                }
                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },
            //Camera roll
            getCameraRoll: function(){
                let that = this
                navigator.camera.getPicture(function cameraSuccess(imageURI) {
                        that.imageURI = imageURI;
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
            storeOnMobile() {
                let that = this
                var win = function (response) {
                    that.setLoading({is_loading: false, message: ''})
                    that.newCertification = cleanCertification();
                    that.croppedFile = ''
                    that.imageURI = ''
                    successNotify('', 'Certificado adicionado com sucesso.')
                    that.getCertifications();
                    that.interactions.addCertification = false;
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
                params.professional_id = that.currentUser.id;
                params.name = that.newCertification.name;
                params.institution = that.newCertification.institution;
                params.description = that.newCertification.description;
                params.granted_at = that.newCertification.granted_at;
                params.priority = that.newCertification.priority;

                options.params = params;
                var ft = new FileTransfer();
                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})
                ft.upload(that.imageURI, encodeURI(`${apiUrl}/professional/certification/store`), win, fail, options);
            },

            storeOnDesktop: function(){
                let that = this
                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                var croppedFile = that.croppedFile;
                let formData = new FormData();

                formData.append('professional_id', that.currentUser.id)
                formData.append('file', croppedFile.file)
                formData.append('name', that.newCertification.name)
                formData.append('institution', that.newCertification.institution)
                formData.append('description', that.newCertification.description)
                formData.append('granted_at', that.newCertification.granted_at)
                formData.append('priority', that.newCertification.priority)

                that.$http.post('professional/certification/store', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {
                    successNotify('', 'Certificado adicionado com sucesso.')
                    that.getCertifications();
                    that.exam = cleanCertification();
                    that.newCertification = cleanCertification();
                    that.interactions.addCertification = false;
                    that.croppedFile = ''
                    that.imageURI = ''
                    that.setLoading({is_loading: false, message: 'Enviando, aguarde'})
                })
                .catch(function (error) {
                    console.log(error)
                    that.setLoading({is_loading: false, message: 'Enviando, aguarde'})
                });
            },
            handlePhotoUploadModal(visibility){
                let that = this
                that.photoUploader.isvisible = visibility
            },
/* IMAGE */

        }
    }
</script>

<style scoped>
    /* Swiper */
    .swiper-slide.card {
        transform: scale(.9);
        z-index: 99999;
        transition: ease .3s;
    }
    .swiper-slide-active.card {
        transform: scale(1);
        transition: ease .3s;
    }
</style>
