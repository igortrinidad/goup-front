<template>

    <div>

        <main-header
            :type="'center'"
            :title="$route.query.edit ? 'Editar evento' : 'Criar evento'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="first-container">
            <div class="container">
                <div class="card container">
                    <div class="card-header ch-alt text-center">
                        <h4 class="f-300 m-0">{{$route.query.edit ? 'Editar' : 'Novo'}} evento</h4>
                    </div>

                    <div class="card-body card-padding">

                        <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                            <label>Nome do evento</label>
                            <input
                                type="text"
                                v-validate="'required'"
                                data-vv-name="name" data-vv-as="Nome do evento"
                                class="form-control"
                                v-model="newEvent.name"
                                placeholder="Nome do evento"
                            >
                            <small class="f-300 f-danger">{{ errors.first('name') }}</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('modalities')}">
                            <label for="company-name-id">Modalidade</label>
                            <multiselect
                                v-model="selectedModality"
                                :options="modalities"
                                :multiple="false"
                                :close-on-select="true"
                                :clear-on-select="true"
                                :hide-selected="false"
                                :preserve-search="true"
                                placeholder="Selecione a modalidade do evento"
                                label="name"
                                track-by="slug"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desselecionar"
                                selectedLabel="Selecionado"
                                @input="setModality"
                                v-validate="'required'"
                                data-vv-name="modality" data-vv-as="modalidade"
                            >
                            </multiselect>
                            <small class="f-300 f-danger">{{ errors.first('modalities') }}</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('submodalities')}" v-if="selectedModality">
                            <label for="company-name-id">Submodalidades</label>
                            <multiselect
                                v-model="selectedSubModalities"
                                :options="subModalities"
                                :multiple="true"
                                :close-on-select="true"
                                :clear-on-select="false"
                                :hide-selected="false"
                                :preserve-search="true"
                                placeholder="Selecione uma ou mais sub modalidades"
                                label="name"
                                track-by="slug"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desselecionar"
                                selectedLabel="Selecionado"
                                @input="setSubModalities"
                                v-validate="'required'"
                                data-vv-name="submodalities" data-vv-as="sub mobalidades"
                            >
                            </multiselect>
                            <small class="f-300 f-danger">{{ errors.first('submodalities') }}</small>
                        </div>

                        <div class="form-group">
                            <label>Endereço ou local</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setEventAdress"
                                @blur="handleErrorAddress()"
                                placeholder="Digite o endereço ou local do evento"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                                :value="newEvent.address.full_address"
                            >
                            </GmapAutocomplete>
                            <small class="f-300 f-danger" v-show="!newEvent.address.name">O campo Endereço ou local é obrigatório</small>
                        </div>

                        <div class="checkbox-group">
                            <label class="checkbox">
                                <input type="checkbox" class="wp-checkbox-input" name="is_delivery" v-model="newEvent.is_free">
                                <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">
                                </div>
                                <span class="wp-checkbox-text">É gratuíto?</span>
                            </label>
                        </div>

                        <div class="form-group">
                            <label for="newevent-date">Data</label>
                            <datepicker
                                id="newevent-date"
                                input-class="form-control"
                                v-model="newEvent.date"
                                name="newevent-date"
                                language="pt-br"
                                placeholder="Escolha a data do evento"
                                format="dd/MM/yyyy"
                                :required="true"
                            >
                            </datepicker>
                            <small class="f-300 f-danger" v-show="!newEvent.date">O campo Data é obrigatório</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('time')}">
                            <label>Horário</label>
                            <input
                                type="time"
                                v-validate="'required'"
                                data-vv-name="time" data-vv-as="Horário"
                                class="form-control"
                                v-model="newEvent.time"
                                placeholder="Horário de início"
                            >
                            <small class="f-300 f-danger">{{ errors.first('time') }}</small>
                        </div>

                        <div class="form-group" v-if="!newEvent.is_free">
                            <label>Valor</label>
                            <input
                                type="tel"
                                class="form-control"
                                v-model="newEvent.value"
                                data-mask="0000.00" data-mask-reverse="true"
                                placeholder="Valor do evento"
                            >
                        </div>

                        <div class="form-group">
                            <label>Descrição e informações gerais</label>
                            <small class="f-300 f-danger" v-show="!newEvent.description">Insira uma breve descrição do evento</small>
                            <vue-editor
                                v-model="newEvent.description"
                                placeholder="Insira uma descrição para o evento."
                                :editorToolbar="customToolbar"
                            >
                            </vue-editor>
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
                                 <p class="m-t-20 f-300 text-center f-danger" v-if="!newEvent.photos.length">
                                    Nenhuma imagem enviada ainda, para terminar de criar o evento você deve enviar pelo menos uma foto.
                                 </p>

                                <div class="row m-t-20" >

                                    <div class="col-md-2 col-sm-12" v-for="(img, index) in newEvent.photos">
                                        <img class="img-responsive" :src="img.photo_url"/>
                                        <div class="text-center m-t-5">
                                            <div class="checkbox-group">
                                                <label class="checkbox">
                                                <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="img.is_profile" @change="handleProfileImage(img)">
                                                <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                                <span class="wp-checkbox-text">Imagem de capa</span></label>
                                            </div>
                                             <button class="btn btn-danger btn-xs" @click.prevent="removeImage(img.id)"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                        </fieldset>
                        <button
                            class="btn btn-primary btn-block m-t-30"
                            @click="saveEvent()"
                            v-if="!$route.query.edit"
                            :disabled="isValidEvent()"
                        >
                            Criar evento
                        </button>
                        <button
                            class="btn btn-info btn-block m-t-30"
                            @click="updateEvent()"
                            v-if="$route.query.edit"
                            :disabled="isValidEvent()"
                        >
                            Salvar evento
                        </button>

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
    import {apiUrl} from '@/config/'
    import {cleanEvent} from '@/models/Event'
    import { VueEditor } from 'vue2-editor'
    import Datepicker from 'vuejs-datepicker'
    import Multiselect from 'vue-multiselect'
    import slug from 'slug'
    import moment from 'moment'

    export default{
        name: 'events-create',
        components:{
            VueEditor,
            Multiselect,
            Datepicker,
            mainHeader: require('@/components/main-header.vue'),
            photoUploader: require('@/components/photo-uploader.vue'),
        },
        data(){
            return{
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
                customToolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }]
                ],
                newEvent: cleanEvent(),
                modalities: [],
                selectedModality: null,
                subModalities: [],
                selectedSubModalities: []

            }
        },

        mounted(){

            var that = this;

            if(window.cordova){
                this.isMobile = true
            }

            this.getModalities();

            if(this.$route.query.edit){

                setTimeout( function(){
                    that.getEvent();
                },100)
                      
            }

        },

        computed: {

            ...mapGetters(['currentUser', 'AuthToken'])
        },

        methods:{

            ...mapActions(['authSetUser', 'setLoading', 'incrementClientTotalXp']),

            isValidEvent: function() {
                return
                    !this.newEvent.name || !this.newEvent.address || !this.newEvent.date ||
                    !this.newEvent.time || !this.newEvent.description ||
                    !this.selectedModality || !this.selectedSubModalities.length || !this.newEvent.photos.length
            },

            getModalities: function(){
                let that = this

                this.$http.get('modality/list').then(response => {

                    that.modalities = response.data

                    if(that.modalities.length && that.$route.query.edit){
                        that.handleSelectedsEdit();
                    }

                }, response => {
                    // error callback
                });
            },

            getEvent() {
                let that = this

                that.newEvent.date = moment(that.newEvent.date, 'DD/MM/FFFF').format('YYYY-MM-DD')
                this.$http.get(`event/show/${that.$route.query.event_id}`).then(response => {

                    that.newEvent = response.data.event;
                    that.handleSelectedsEdit();

                }, response => {
                    // error callback
                });
            },

            saveEvent: function(){
                let that = this

                that.newEvent.date = moment(that.newEvent.date, 'DD/MM/FFFF').format('YYYY-MM-DD')

                this.$http.post('event/store', that.newEvent).then(response => {

                    //Add XP points to client
                    that.incrementClientTotalXp(5)

                    successNotify('', 'Evento criado com sucesso.')
                    that.$router.push({name: 'landing.events.show', params: {event_id: response.data.event.id}});

                }, response => {
                    // error callback
                });

            },

            updateEvent: function(){
                let that = this

                this.$http.post('event/update', that.newEvent).then(response => {

                    successNotify('', 'Evento atualizado com sucesso.')
                    that.$router.push({name: 'landing.events.show', params: {event_id: response.data.event.id}});

                }, response => {
                    // error callback
                });

            },

            setModality(selected){

                if(selected){
                    this.newEvent.modality_id = selected.id
                    if(!this.$route.query.edit){
                        this.subModalities = selected.submodalities
                    }
                    this.selectedSubModalities = []

                }

                if(!selected){
                    this.newEvent.modality_id = null

                    if(!this.$route.query.edit){
                        this.subModalities = []
                    }

                    this.selectedSubModalities = []

                }
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

                    if(!that.newEvent.photos.length){
                        api_response.photo.is_profile = true
                    }

                    that.newEvent.photos.push(api_response.photo)

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
                params.event_id = that.newEvent.id;
                params.is_profile = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/event/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('event_id', that.newEvent.id)

                that.$http.post('event/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.newEvent.photos.length){
                            response.data.photo.is_profile = true
                        }

                        that.newEvent.photos.push(response.data.photo)

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

                that.newEvent.photos.map((photo) => {

                    photo.is_profile = false

                    if(photo.id == selected_photo.id ){
                        photo.is_profile = true
                    }
                })
            },

            removeImage(image_id){
                let that = this

                that.$http.get('event/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.newEvent.photos = that.newEvent.photos.filter(function (image) {
                            return image.id != image_id;
                        });

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setEventAdress(place) {

                let that = this
                if (place.geometry !== undefined) {

                    that.newEvent.lat = place.geometry.location.lat()
                    that.newEvent.lng = place.geometry.location.lng()

                    that.newEvent.address = {
                        full_address: place.formatted_address,
                        name: place.name,
                        url: place.url
                    }

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.newEvent.state = current.short_name
                            }

                            //City
                            if(type == 'administrative_area_level_2'){
                                that.newEvent.city = current.short_name
                            }
                        })
                    })
                }
            },

            setSubModalities(selecteds){

                if(selecteds.length){
                    this.newEvent.submodalities = selecteds.map((sub_modality) => sub_modality.id)
                }

                if(!selecteds.length){
                    this.newEvent.submodalities = []
                }
            },

            handleSelectedsEdit(){

                let that = this;

                that.selectedModality = that.newEvent.modality;
                that.setModality(that.selectedModality);

                let modality =  _.find(that.modalities, {id: that.selectedModality.id})

                if(modality && modality.submodalities.length){
                    that.subModalities = modality.submodalities

                    that.selectedSubModalities = that.newEvent.submodalities;
                    that.setSubModalities(that.selectedSubModalities);
                }
            }

        },
    }
</script>

<style scoped>
    /* Scoped Styles */
    .input-hidden {
        visibility: hidden;
        position: absolute;
        top: 0; left: 0;
    }
    .fake-input{
        display: flex;
        width: 100%;
        align-items: center;
        color: #b3c3cf;
        margin-top: 10px;
    }
    .fake-input.has-error{ border: 1px solid #E14A45 !important; }
    .fake-input.dated{ color: #383938; }
    .fake-input:not(:focus):before{
        content:attr(data-text)
    }
</style>
