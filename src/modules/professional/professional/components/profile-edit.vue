<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Editar perfil'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>


        <div class="wrapper primary padding fixtop">
            <div class="container">
                <div class="text-center">
                    <router-link to="/cliente/mostrar-perfil">
                        <div class="picture-circle picture-circle-m"
                             :style="`background-image:url('${ currentUser.avatar }')`"></div>
                    </router-link>
                    <h2 class="f-300 m-15">{{ currentUser.full_name }}</h2>
                </div>
            </div>
        </div>

        <div class="container m-t-10">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300">Meus dados</h4>
                </div>

                <div class="card-body card-padding">

                    <div class="alert alert-dismissible alert-info" v-if="currentUser.blank_password">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4>Configurar senha</h4>
                        <p>É necessário que você configure uma senha para conectar-se utilizando e-mail e senha.</p>
                    </div>


                    <p v-if="!currentUser.blank_password"></p>
                    <div class="form-group">
                        <label>Primeiro nome</label>
                        <input class="form-control" type="text" v-model="professional.name">
                    </div>

                    <div class="form-group">
                        <label>Sobrenome</label>
                        <input class="form-control" type="text" v-model="professional.last_name">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" type="email" v-model="professional.email">
                    </div>

                    <div class="form-group">
                        <label for="company-name-id">Especialidades</label>
                        <multiselect
                            v-model="selectedCategories"
                            :options="categories"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="false"
                            :preserve-search="true"
                            placeholder="Selecione uma ou mais categorias / área de atuação"
                            label="name"
                            track-by="slug"
                            selectLabel="Enter ou clique para selecionar"
                            deselectLabel="Enter ou clique para desselecionar"
                            selectedLabel="Selecionado"
                            @input="setCategories">

                        </multiselect>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Imagens</h4>
                </div>
                <div class="card-body card-padding">

                    <fieldset>
                        <div v-if="isMobile">
                            <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto
                            </button>
                            <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">
                                Abrir galeria
                            </button>
                        </div>

                        <div class="" v-if="!isMobile">
                            <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">
                                Enviar imagem
                            </button>
                        </div>

                        <p class="m-t-20" v-if="!professional.photos.length">Nenhuma imagem enviada.</p>

                        <div class="row m-t-20">

                            <div class="col-md-2 col-sm-6 col-xs-6" v-for="(img, index) in professional.photos">
                                <div class="edit-pic-list" :style="`background-image:url('${ img.photo_url }')`"></div>
                                <button class="btn btn-danger btn-xs btn-block" @click.prevent="removeImage(img.id)"><i
                                    class="fa fa-trash"></i></button>
                                <div class="text-center m-t-5">
                                    <div class="checkbox-group">
                                        <label class="checkbox">
                                            <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input"
                                                   v-model="img.is_profile" @change="handleProfileImage(img)">
                                            <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                            <span class="wp-checkbox-text">Imagem do perfil</span></label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Segurança</h4>
                </div>
                <div class="card-body card-padding">

                    <fieldset>
                        <!--Usuário não possui uma senha cadastrada-->
                        <div v-if="currentUser.blank_password">
                            <div class="form-group">
                                <label>Senha</label>
                                <input v-validate="'min:6'" type="password" class="form-control"
                                       data-vv-as="senha" name="password_confirmation" placeholder="Sua senha"
                                       v-model="professional.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div class="form-group">
                                <label>Confirmar senha</label>
                                <input v-validate="'confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar senha"
                                       name="password" placeholder="Confirmar senha" v-model="professional.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>
                        </div>
                        <!--Usuário não possui uma senha cadastrada-->

                        <!--Usuário possui uma senha cadastrada-->
                        <div class="m-t-20" v-if="!currentUser.blank_password">

                            <p class="text-info m-t-20 m-b-20">Para alterar a senha atual preencha os campos abaixo.</p>

                            <div class="form-group">
                                <label>Senha atual</label>
                                <input v-validate="'min:6'" type="password"
                                       class="form-control" data-vv-name="current_password"
                                       data-vv-as="senha atual senha"
                                       placeholder="Informe sua senha atual" v-model="professional.current_password">
                                <p class="help-block" v-if="errors.has('current_password')">
                                    {{errors.first('current_password')}}</p>
                            </div>

                            <div class="form-group">
                                <label>Nova senha</label>
                                <input v-validate="'min:6'" type="password" class="form-control"
                                       data-vv-as="nova senha" name="password_confirmation" placeholder="Informe a nova senha"
                                       v-model="professional.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div class="form-group">
                                <label>{{ !currentUser.blank_password ? 'Confirmar nova senha' : 'Confirmar senha'}}</label>
                                <input v-validate="'confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar nova senha"
                                       name="password" placeholder="Confirmar nova senha"
                                       v-model="professional.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>
                        </div>
                        <!--Usuário possui uma senha cadastrada-->
                    </fieldset>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
                    <button class="btn btn-primary btn-block btn-sm" @click="updateProfile()">Salvar alterações</button>
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
    import mainHeader from '@/components/main-header.vue'
    import Multiselect from 'vue-multiselect'
    import Avatar from '@/components/avatar.vue'

    import ProfessionalModel from '@/models/Professional'

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'admin-profile-edit',
        components: {
            mainHeader,
            Avatar,
            Multiselect,
            photoUploader: require('@/components/photo-uploader.vue'),
        },
        data() {
            return {
                professional: ProfessionalModel,
                categories: [],
                selectedCategories: [],
                isMobile: false,
                photoUploader: {
                    isvisible: false
                },
                passwordInfo: {
                    id: null,
                    current_password: null,
                    password: null,
                    password_confirmation: null
                }
            }
        },
        mounted() {

            this.getProfessional();

            this.selectedCategories = this.currentUser.categories

            this.getCategories();

            if (window.cordova) {
                this.isMobile = true
            }

        },
        computed: {
            ...mapGetters(['currentUser', 'AuthToken'])
        },
        methods: {

            ...mapActions(['authSetUser', 'setLoading']),

            getProfessional() {
                let that = this

                that.$http.get(`professional/profile/show/${that.currentUser.id}`)
                    .then(function (response) {

                        that.professional = response.data.professional

                    })
                    .catch(function (error) {

                    });

            },

            getCategories() {
                let that = this
                that.$http.get(`professional/category/list`)
                    .then(function (response) {

                        that.categories = response.data

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setCategories(selecteds) {
                if (selecteds) {

                    this.professional.categories = selecteds.map((category) => category.id)
                }
            },

            updateProfile: function () {
                let that = this

                delete that.professional.slug;

                if (that.selectedCategories) {
                    that.professional.categories = that.selectedCategories.map((category) => category.id)
                }

                that.professional.name = that.professional.name.toTitleCase()
                that.professional.last_name = that.professional.last_name.toTitleCase()

                that.$validator.validateAll().then(() => {

                    that.$http.post(`professional/profile/update`, that.professional)
                        .then(function (response) {

                            if (response.data.error) {
                                that.$validator.errorBag.add('current_password', 'Senha atual incorreta.');
                                errorNotify('', 'Senha atual incorreta.')
                            }

                            if (!response.data.error) {
                                that.authSetUser(response.data.professional)

                                successNotify('', 'Dados atualizados com sucesso.')

                                that.$router.push({name: 'admin.professional.dashboard'})

                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }).catch(() => {

                });
            },

            /* IMAGE */
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
            getCameraRoll: function () {
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

                    if (!that.professional.photos.length) {
                        api_response.photo.is_profile = true
                    }

                    that.professional.photos.push(api_response.photo)

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
                params.professional_id = that.professional.id;
                params.is_profile = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/professional/photo/upload`), win, fail, options);
            },

            uploadPhoto: function (cropedFile) {
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('professional_id', that.professional.id)

                that.$http.post('professional/photo/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if (!that.professional.photos.length) {
                            response.data.photo.is_profile = true
                        }

                        that.professional.photos.push(response.data.photo)

                        successNotify('', 'Imagem enviada com sucesso')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handlePhotoUploadModal(visibility) {
                let that = this

                that.photoUploader.isvisible = visibility
            },

            handleProfileImage(selected_photo) {
                let that = this

                that.professional.photos.map((photo) => {

                    photo.is_profile = false

                    if (photo.id == selected_photo.id) {
                        photo.is_profile = true
                    }
                })
            },

            removeImage(image_id) {
                let that = this

                that.$http.get('professional/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.professional.photos = that.professional.photos.filter(function (image) {
                            return image.id != image_id;
                        });

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            /* IMAGE */

        },
    }
</script>

<style scoped>


</style>
