<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main container">

                <img class="picture-circle picture-circle-xxl border-picture-eletric-blue center-block" :src="currentUser.avatar">

                <div class="row" v-if="isMobile">
                    <div class="col-sm-12">
                        <div class="col-xs-6">
                            <div class="new-image m-b-30 cursor-pointer" @click="getPicture()">
                                <i class="ion-ios-camera-outline"></i>
                                <span>{{ translations.takePicture }}</span>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="new-image m-b-30 cursor-pointer" @click="getCameraRoll()">
                                <i class="ion-ios-film-outline"></i>
                                <span>{{ translations.openGalery }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="new-image m-b-30 cursor-pointer" @click="showPhotoUploader = true"  v-if="!isMobile">
                    <i class="ion-ios-camera-outline"></i>
                    <span>{{ translations.upload_image }}</span>
                </div>

                <div class="container text-center">

                    <p class=" f-22 f-400">{{ translations.account.title }}</p>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.last_name" v-model="user.last_name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" :placeholder="translations.placeholders.email" v-model="user.email">
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" :placeholder="translations.placeholders.bday" v-model="user.bday"  data-mask="00/00/0000">
                    </div>

                    <!-- Password -->
                    <p class=" f-22 f-400">{{ translations.password.title }}</p>
                    <button type="button" class="btn btn-info btn-block transparent m-t-30" @click="interactions.changePassword = true" v-if="!interactions.changePassword">
                        {{ translations.password.button }}
                    </button>

                    <div v-if="interactions.changePassword">
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="translations.placeholders.password" v-model="user.password">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="translations.placeholders.password_confirmation" v-model="user.password_confirmation">
                        </div>
                        <button type="button" class="btn btn-info btn-block transparent m-t-30" @click="cancelChangePassword()">
                            {{ translations.password.buttonCancel }}
                        </button>
                    </div>
                    <!-- /Password -->

                    <!-- Button Save Settings -->
                    <button type="button" class="btn btn-primary btn-block transparent m-t-30" @click="saveSettings()">
                        {{ translations.save }}
                    </button>
                    <!-- Button Save Settings -->

                </div>

            </div>
        </transition>

        <photo-uploader
            :isvisible.sync="showPhotoUploader"
            :send-action="storeImage"
            @close-photo-uploader-modal="handleUploaderVisibility"
        ></photo-uploader>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import photoUploader from '@/components/photo-uploader.vue'
    import * as translations from '@/translations/user/components/edit-profile'
    import {mapGetters, mapActions} from 'vuex'
    import {apiUrl} from '@/config/'

    export default {
        name: 'user-settings-edit-profile',

        components: {
            mainHeader,
            photoUploader,
        },

        data () {
            return {
                isMobile: false,
                showPhotoUploader: false,
                interactions: {
                    changePassword: false,
                },
                user: {},
                languages: {
                    pt: false,
                    en: false
                }
            }
        },

        computed: {
            ...mapGetters(['language', 'currentUser', 'AuthToken']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            if(window.cordova){
                this.isMobile = true
            }

            this.getUser()
        },

        methods: {
            ...mapActions(['authSetUser', 'setNewUserAvatar', 'setLoading']),

            saveSettings() {

                let that = this

                that.$http.post('user/update', that.user)
                    .then(function (response) {
                        that.authSetUser(response.data.user)
                        successNotify('', that.translations.save_success);
                        that.$router.push('/settings');
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            getUser(){
                let that = this

                that.$http.get('user/profile')
                    .then(function (response) {
                        that.user = response.data.user
                        that.initSwiper()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar',

                    })
                }, 200);
            },

            cancelChangePassword(){
                this.user.password = ''
                this.user.password_confirmation = ''
                this.interactions.changePassword = false
            },

            handleUploaderVisibility(visibility){
                let that = this
                that.showPhotoUploader = visibility
            },

            //Get from device camera
            getPicture: function () {
                let that = this

                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                });

                function onSuccess(imageURI) {

                    that.storeImageMobile(imageURI);

                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },

            //Camera roll
            getCameraRoll: function(){
                let that = this

                navigator.camera.getPicture(function cameraSuccess(imageURI) {

                        that.storeImageMobile(imageURI);

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

            storeImageMobile(imageURI) {
                let that = this

                var win = function (response) {

                    let api_response = JSON.parse(response.response)

                    that.setNewUserAvatar(api_response.photo.photo_url)

                    that.setLoading({is_loading: false, message: ''})

                    successNotify('', that.translations.success_avatar)

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
                options.headers = {'Authorization': that.AuthToken};

                var params = new Object();

                params.user_id = that.user.id;
                params.new_avatar = true;
                params.is_profile = true;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: ''})

                ft.upload(imageURI, encodeURI(`${apiUrl}/user/photo/upload`), win, fail, options);
            },

            storeImage: function(imageData){

                let that = this

                that.setLoading({is_loading: true, message: ''})

                let formData = new FormData();
                formData.append('user_id', that.user.id)
                formData.append('new_avatar', true)
                formData.append('is_profile', true)
                formData.append('file', imageData.file)

                that.$http.post('user/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        that.setNewUserAvatar(response.data.photo.photo_url)

                        that.setLoading({is_loading: false, message: ''})

                        successNotify('', that.translations.success_avatar)

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            },
        }
    }
</script>

<style scoped>
    .swiper-pagination { width: 100%; }

    .icon-select {
        color: #FFF;
        float: right
    }

    /* New Image */
    .new-image {
        width: 100%;
        justify-content: center;
        text-align: center;
        border-bottom: 2px solid #FF4B89;
        padding: 30px 0;
    }

    .new-image i {
        font-size: 24px;
        display: inline-flex;
        width: 40px; height: 40px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 2px solid #FF4B89;
    }
    .new-image span {
        display: block;
        width: 100%;
        font-weight: 700;
        margin-top: 20px;
    }

</style>
