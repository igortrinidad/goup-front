<template lang="html">
    <div class="">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/camera.png" alt="">
                <h4 class="f-300">Fotos</h4>
            </div>
        </div>

        <div class="container m-t-10" v-if="interactions.addPhoto">

            <div class="card">
                <div class="card-header lv-header-alt">
                    <h4>Nova foto</h4>
                </div>

                <div class="card-body card-padding">
                    <div v-if="isMobile">
                        <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                        <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                    </div>

                    <div v-if="!isMobile">
                        <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                    </div>
                </div>
            </div>

        </div>

        <!-- PHOTO LIST -->
        <div class="container m-t-10">

            <div class="card">

                <div class="card-body card-padding">
                    <div v-if="isMobile">
                         <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                         <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                    </div>

                    <div class="" v-if="!isMobile">
                         <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                    </div>

                    <p class="m-t-20" v-if="!photos.length">Nenhuma imagem enviada.</p>

                    <hr>

                    <div class="row m-t-20" >

                        <div class="col-md-2 col-sm-6 col-xs-6" v-for="(img, index) in photos">

                            <div class="edit-pic-list" :style="`background-image:url('${ img.photo_url }')`"></div>
                            <button class="btn btn-danger btn-xs btn-block" @click.prevent="removeImage(img.id)"><i class="fa fa-trash"></i></button>

                            <div class="m-t-5">
                                <div class="checkbox-group">

                                    <label class="checkbox">
                                    <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="img.is_profile" @change="setProfileImage(img)" :disabled="img.is_profile">
                                    <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                    <span class="wp-checkbox-text">Imagem do perfil</span></label>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <photo-uploader
            :isvisible.sync="photoUploader.isvisible"
            :send-action="uploadPhoto"
            @close-photo-uploader-modal="handlePhotoUploadModal"
        ></photo-uploader>

        <!-- MODAL SHARE -->
        <div class="modal" id="modal-wait-share" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Compartilhando</h4>
                    </div>
                    <div class="modal-body text-center">
                        <i class="ion-social-instagram-outline f-30 f-info"></i>
                        <p class="f-300">Você está sendo redirecionado para o Instagram, por favor aguarde.</p>
                    </div>
                    <div class="modal-footer borderless">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL SHARE -->

    </div>
</template>

<script>
    import Photo from '@/models/ClientPhoto'
    import {apiUrl} from '@/config/'
    import {mapActions, mapGetters} from 'vuex'

    export default{
        name: 'client-dashboard-photos',
        components:{
            photoUploader: require('@/components/photo-uploader.vue'),
        },
        data() {
            return {
                isMobile: false,
                loadingPhotos: true,
                interactions: {
                    addPhoto: false,
                },
                photoUploader:{
                    isvisible: false
                },
                photos: [],
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'AuthToken'])
        },
        mounted() {

            if(window.cordova){
                this.isMobile = true
            }

            this.getPhotos()

        },

        methods: {
            ...mapActions(['setLoading', 'setUserAvatar']),

            setProfileImage: function(selected_photo){
                let that = this

                var data = {
                    professional_id: that.currentUser.id,
                    photo_id: selected_photo.id
                }

                that.$http.post(`professional/photo/set_profile`, data)
                .then(function (response) {

                    that.photos.map((photo) => {

                        photo.is_profile = false

                        if(photo.id == selected_photo.id ){
                            photo.is_profile = true
                        }
                    })

                    that.setUserAvatar(selected_photo.photo_url);
                    successNotify('', 'Perfil alterado com sucesso.');

                })
                .catch(function (error) {
                    console.log(error)
                });


            },

            shareViaInstagram: function(photo_url){
                let that = this
                window.plugins.socialsharing.shareViaInstagram('Message via Instagram asd', photo_url,
                    function(){
                        $('#modal-wait-share').modal('show');
                    },function(errormsg){
                        alert(errormsg)
                    }
                );
            },

            getPhotos: function(){
                let that = this

                that.$http.get(`professional/photo/list/${that.currentUser.id}`)
                .then(function (response) {

                 that.photos = response.data.data

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

                    that.handleUpload(imageURI)

                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },

            //Camera roll
            getCameraRoll: function(){
                let that = this

                navigator.camera.getPicture(function cameraSuccess(imageURI) {

                        that.handleUpload(imageURI)

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
            handleUpload(imageURI) {

                console.log(imageURI)

                let that = this
                var win = function (response) {

                    let api_response = JSON.parse(response.response)

                    if(!that.photos.length){
                        api_response.photo.is_profile = true
                    }

                    that.photos.unshift(api_response.photo)

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
                params.professional_id = that.currentUser.id;
                params.is_profile = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/professional/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('professional_id', that.currentUser.id)

                that.$http.post('professional/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.photos.length){
                            response.data.photo.is_profile = true
                        }

                        that.photos.unshift(response.data.photo)

                        successNotify('', 'Imagem enviada com sucesso')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handlePhotoUploadModal(visibility){
                let that = this

                that.photoUploader.isvisible = visibility
            },


            removeImage(image_id, index){
                let that = this

                that.$http.get('professional/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.photos.splice(index, 1);

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

        }
    }
</script>

<style scoped>
    /* InputFile */
    .input-file {
        position: absolute;
        visibility: hidden;
        z-index: -1;
    }

    /* swiper */
    .swiper-button-prev { left: 20px; }
    .swiper-button-next { right: 20px; }
    .swiper-slide.swiper-slide img { border-radius: 4px; }

    .thumbs .swiper-slide.swiper-slide-active img{
        border: 2px solid #383938;
    }

    /* line */
    .line .img-responsive {
        border-radius: 4px;
    }
    .line .line-date {
        position: absolute;
        left: -2px;
        top: 0%;
        margin-top: -8.5px;
    }
</style>
