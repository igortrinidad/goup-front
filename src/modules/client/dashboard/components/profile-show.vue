<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Meu perfil'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <div class="header-profile">
            <div class="container">
                <div class="text-center m-t-10">
                    <router-link :to="{name: 'client.profile.show', query: {client_id: currentUser.id}}">
                        <div class="picture-circle picture-circle-p" :style="`background-image:url('${ currentUser.avatar }')`">
                        </div>
                    </router-link>
                    <h2 class="f-300 m-15">{{ currentUser.full_name }}</h2>
                </div>
            </div>
        </div>

        <div class="container m-t-10">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4>Meus dados</h4>
                </div>

                <div class="card-body card-padding">

                    <div class="form-group">
                        <label>Nome</label>
                        <p>{{currentUser.full_name}}</p>
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <p>{{currentUser.email}}</p>
                    </div>

                    <div class="form-group">
                        <label>Telefone</label>
                        <p>{{currentUser.phone}}</p>
                    </div>

                    <div class="form-group">
                        <label>Nascimento</label>
                        <p>{{currentUser.bday}}</p>
                    </div>

                    <div class="form-group">
                        <label>Objetivo</label>
                        <p>{{currentUser.target}}</p>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
                             <router-link :to="{name: 'client.profile.edit', query: {client_id: currentUser.id}}" tag="button" class="btn btn-info btn-block btn-sm">
                            Editar
                        </router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="container m-t-10">
            
            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4>Fotos</h4>
                </div>
            
                <div class="card-body card-padding">
                    
                        <div v-if="isMobile">
                             <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                             <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                        </div>

                        <div class="" v-if="!isMobile">
                             <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                        </div>

                        <p class="m-t-20" v-if="!client.photos.length">Nenhuma imagem enviada.</p>

                        <hr>

                        <div class="row m-t-20" >

                            <div class="col-md-2 col-sm-6 col-xs-6" v-for="(img, index) in client.photos">

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


    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import Avatar from '@/components/avatar.vue'
    import {apiUrl} from '@/config/'

    import {cleanClientModel} from '@/models/Client'

    export default{
        name: 'client-profile-show',
        components:{
            mainHeader,
            Avatar,
            photoUploader: require('@/components/photo-uploader.vue'),
        },
        data(){
            return{
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
                client: cleanClientModel()
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'AuthToken'])
        },
        mounted(){
            this.getClient();
            if(window.cordova){
                this.isMobile = true
            }
        },
        methods:{

            ...mapActions(['authSetUser', 'setLoading', 'setUserAvatar']),

            getClient(){
                let that = this

                that.$http.post(`client/profile/show`, {client_id: that.currentUser.id})
                    .then(function (response) {

                        that.client = response.data.client

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            setProfileImage: function(selected_photo){
                let that = this
                
                var data = {
                    client_id: that.client.id,
                    photo_id: selected_photo.id
                }

                that.$http.post(`client/photo/set_profile`, data)
                .then(function (response) {

                    that.client.photos.map((photo) => {

                        photo.is_profile = false

                        if(photo.id == selected_photo.id ){
                            photo.is_profile = true
                        }

                    })

                    that.setUserAvatar(selected_photo.photo_url);
                    successNotify('', 'Perfil alterado com sucesso.')
                    
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

                    if(!that.client.photos.length){
                        api_response.photo.is_profile = true
                    }

                    that.client.photos.push(api_response.photo)

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
                params.client_id = that.client.id;
                params.is_profile = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/client/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('client_id', that.client.id)

                that.$http.post('client/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.client.photos.length){
                            response.data.photo.is_profile = true
                        }

                        that.client.photos.push(response.data.photo)

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

            handleProfileImage(selected_photo){
                let that = this

                that.client.photos.map((photo) => {

                    photo.is_profile = false

                    if(photo.id == selected_photo.id ){
                        photo.is_profile = true
                    }
                })
            },

            removeImage(image_id){
                let that = this

                that.$http.get('client/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.client.photos = that.client.photos.filter(function (image) {
                            return image.id != image_id;
                        });

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

        },

    }
</script>


<style scoped>

    .header-profile {
        background: #87c657;
        margin-top: -20px;
        padding: -0px 0;
        color: #fff;
    }

</style>
