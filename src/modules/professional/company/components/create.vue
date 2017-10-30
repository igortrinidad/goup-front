<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Adicionar empresa'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">

            <div class="row">
                <div class="col-sm-12">
                    <div class="notification notification-white text-center">
                        <span>Cadastre sua <b>Empresa</b> para você divulgar serviços e interagir com os usuários da plataforma.</span>
                    </div>
                </div>
            </div>

            <div class="row m-t-10">
                <div class="col-sm-12">
                    <fieldset>
                        <legend class="f-300 d-block">Dados da empresa</legend>
                        <hr>

                        <div class="form-group">
                            <label for="company-name-id">Categorias</label>
                            <multiselect
                            v-model="selectedCategories"
                            :options="categories"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="false"
                            :preserve-search="true"
                            placeholder="Selecione uma ou mais categorias"
                            label="name"
                            track-by="slug"
                            selectLabel="Enter ou clique para selecionar"
                            deselectLabel="Enter ou clique para desselecionar"
                            selectedLabel="Selecionado"
                            @input="setCategories">

                            </multiselect>
                        </div>

                        <div class="form-group">
                            <label for="company-name-id">Nome</label>
                            <input id="company-name-id" class="form-control" placeholder="Nome da empresa" v-model="company.name">
                        </div>

                        <div class="form-group">
                            <label>Telefone</label>
                            <input class="form-control" placeholder="Telefone" v-model="company.phone" v-mask="'(##) # ####-####'">
                        </div>

                        <div class="form-group">
                            <label>Website</label>
                            <input class="form-control" placeholder="Website" v-model="company.website">
                        </div>

                        <div class="form-group">
                            <label class="control-label">URL</label>
                            <input type="text" class="form-control" placeholder="URL" v-model="company.slug"  @blur="checkUrl">
                        </div>

                        <div class="form-group">
                            <label>Descrição</label>
                            <textarea class="form-control" placeholder="Insira uma breve descrição sobre sua empresa" v-model="company.description"></textarea>
                        </div>

                        <div class="checkbox-group">
                            <label class="checkbox">
                            <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="company.is_delivery">
                            <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">

                            </div>
                            <span class="wp-checkbox-text">Atende os clientes em casa ou outros locais?</span></label>
                        </div>

                        <div class="checkbox-group">
                            <label class="checkbox">
                            <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="company.address_is_available">
                            <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">

                            </div>
                            <span class="wp-checkbox-text">Possui endereço fixo de atendimento?</span></label>
                        </div>

                        <div class="form-group" v-if="company.address_is_available">
                            <label>Endereço</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setCompanyAdress"
                                placeholder="Digite o endereço de atendimento"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                            >
                            </GmapAutocomplete>
                        </div>

                        <div class="form-group" v-if="!company.address_is_available">
                            <label>Cidade</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setCity"
                                placeholder="Digite o nome da cidade"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                                :types="['(cities)']"
                            >
                            </GmapAutocomplete>
                        </div>

                    </fieldset>
                </div>
            </div>

            <fieldset class="m-t-20">
                    <legend>Imagens</legend>
                    <div v-if="isMobile">
                         <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                         <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                    </div>

                    <div class="" v-if="!isMobile">
                         <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                    </div>

                     <p class="m-t-20" v-if="!company.photos.length">Nenhuma imagem enviada.</p>

                    <div class="row m-t-20" >

                        <div class="col-md-2 col-sm-12" v-for="(img, index) in company.photos">
                            <img class="img-responsive" :src="img.photo_url"/>
                            <div class="text-center m-t-5">
                                <div class="checkbox-group">
                                    <label class="checkbox">
                                    <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="img.is_profile" @change="handleProfileImage(img)">
                                    <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                    <span class="wp-checkbox-text">Imagem do perfil</span></label>
                                </div>
                                 <button class="btn btn-danger btn-xs" @click.prevent="removeImage(img.id)"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
            </fieldset>

            <button class="btn btn-primary btn-block m-t-30" @click="createCompany()">Criar empresa</button>

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
    import {cleanCompanyModel} from '@/models/Company.js'
    const UUID = require('uuid-js')
    import {mapGetters, mapActions} from 'vuex'
    import Multiselect from 'vue-multiselect'
    import slug from 'slug'

    export default {
        name: 'companies-create',
        components:{
            mainHeader,
            photoUploader: require('@/components/photo-uploader.vue'),
            Multiselect
        },
        data() {
            return{
                photoUploader:{
                    isvisible: false
                },
                company: cleanCompanyModel(),
                isMobile: false,
                categories: [],
                selectedCategories:[],

            }
        },
        computed:{
            ...mapGetters(['AuthToken', 'currentUser']),
        },

        watch:{
            'company.name'(value) {
                this.company.slug = slug(value).toLowerCase()
            },

            'company.slug'(value) {
                this.company.slug = slug(value).toLowerCase()
            }
        },
        mounted() {
            this.getCategories()

            if(window.cordova){
                this.isMobile = true
            }

            this.company.id = UUID.create().toString()
            this.company.owner_id = this.currentUser.id
        },

        methods:{

            ...mapActions(['setLoading']),

            getCategories(){
                let that = this
                that.$http.get(`professional/category/list`)
                    .then(function (response) {

                     that.categories = response.data

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setCategories(selecteds){
                if(selecteds){

                    this.company.categories = selecteds.map((category) => category.id)
                }
            },

            createCompany: function(){
                let that = this

                that.$http.post('professional/company/create', that.company)
                    .then(function (response) {

                        successNotify('', 'Empresa adicionada com sucesso')

                        that.$router.push('/empresas')

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

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

                that.company.photos.map((photo) => {

                    photo.is_profile = false

                    if(photo.id == selected_photo.id ){
                        photo.is_profile = true
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

            setCity(place) {
                let that = this

                if (place.geometry !== undefined) {

                    that.company.lat = place.geometry.location.lat()
                    that.company.lng = place.geometry.location.lng()

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.company.state = current.short_name
                            }
                            //City
                            if(type == 'administrative_area_level_2'){
                                that.company.city = current.short_name
                            }
                        })
                    })
                }
            },

            setCompanyAdress(place) {
                console.log(place)

                let that = this
                if (place.geometry !== undefined) {

                    that.company.lat = place.geometry.location.lat()
                    that.company.lng = place.geometry.location.lng()

                    that.company.address = {
                        full_address: place.formatted_address,
                        name: place.name,
                        url: place.url
                    }

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.company.state = current.short_name
                            }

                            //City
                            if(type == 'administrative_area_level_2'){
                                that.company.city = current.short_name
                            }
                        })
                    })
                }
            },

        }

    }
</script>
