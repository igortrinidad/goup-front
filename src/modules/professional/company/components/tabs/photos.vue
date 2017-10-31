<template lang="html">

   	<div class="">
   		<div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/camera.png" alt="">
                <h3 class="f-300">Fotos</h3>
            </div>
        </div>

        <div class="container">
            <div class="card m-t-10">
                <div class="card-body card-padding">
                    <div v-if="isMobile">
                        <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                        <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                    </div>

                    <div class="" v-if="!isMobile">
                        <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                    </div>
                    <hr>
                    <p class="m-t-20" v-if="!company.photos.length">Nenhuma imagem enviada.</p>

                    <div class="row m-t-20" >

                        <div class="col-md-2 col-sm-6 col-xs-6 text-center" v-for="(img, index) in company.photos">

                        <div class="edit-pic-list" :style="`background-image:url('${ img.photo_url }')`"></div>
                            <button class="btn btn-danger btn-xs btn-block text-center" @click.prevent="removeImage(img.id)"><i class="fa fa-trash"></i></button>

                            <div class="text-center m-t-5">
                                <div class="checkbox-group">
                                    <label class="checkbox">
                                    <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="img.is_profile" @change="handleProfileImage(img)">
                                    <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                    </label>
                                </div>
                                    <span class="wp-checkbox-text">Imagem do perfil</span>

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
    import {apiUrl} from '@/config/'
    import {mapGetters, mapActions} from 'vuex'
    import companyModel from '@/models/Company.js'

    export default{
        name: 'company-budget-tab',
        components: {
            photoUploader: require('@/components/photo-uploader.vue'),
        },
        data() {
            return {
                company: companyModel,
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
                selectedCategories:[],
            }
        },

        computed:{
            ...mapGetters(['currentUser', 'AuthToken']),
        },
        mounted(){
            this.getCompany();

            if(window.cordova){
                this.isMobile = true
            }
        },
        methods: {

            ...mapActions(['setLoading']),

            getCompany: function(){
                let that = this

                that.$http.get(`professional/company/show/${that.$route.params.company_id}`)
                .then(function (response) {

                    that.company = response.data.company;
                    that.selectedCategories = that.company.categories;
                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            updateCompanyProfile: function(){
                let that = this

                that.company.categories = that.company.categories.map((category) => category.id)

                that.$http.post(`/professional/company/update`, that.company)
                    .then(function (response) {

                        successNotify('', 'Empresa atualizada com sucesso.')
                        that.$router.push({name: 'admin.companies.show', params: {company_id: that.company.id}});

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

                    if(!that.company.photos.length){
                        api_response.photo.is_profile = true
                    }

                    that.company.photos.push(api_response.photo)

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
                params.company_id = that.company.id;
                params.is_profile = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/professional/company/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('company_id', that.company.id)

                that.$http.post('professional/company/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.company.photos.length){
                            response.data.photo.is_profile = true
                        }

                        that.company.photos.push(response.data.photo)

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

                that.company.photos.map((photo, index) => {

                    photo.is_profile = false

                    if(photo.id == selected_photo.id ){
                        photo.is_profile = true
                    }

                    if(index == that.company.photos.length-1){
                        that.updateCompanyProfile();
                    }
                })

            },

            removeImage(image_id){
                let that = this

                that.$http.get('professional/company/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.company.photos = that.company.photos.filter(function (image) {
                            return image.id != image_id;
                        });

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


</style>
