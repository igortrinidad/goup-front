<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="interactions.isUpdate ? 'Editar Plano' : 'Criar Plano'"
            :cursor="false" :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>
        <div class="wrapper primary padding fixtop">
            <h2 class="f-300 text-center">{{ plan.name }}</h2>
        </div>

        <div class="container m-t-30">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h3 class="f-300 m-0">Dados do plano</h3>
                </div>
                <div class="card-body card-padding">

                    <div :class="{'form-group': true, 'has-error': errors.has('categories')}">
                        <label for="company-name-id">Categoria de modalidade</label>
                        <multiselect
                            v-model="selectedCategories"
                            :options="categories"
                            :multiple="false"
                            :close-on-select="true"
                            :hide-selected="false"
                            :preserve-search="true"
                            placeholder="Selecione uma categoria"
                            label="name"
                            track-by="slug"
                            selectLabel="Enter ou clique para selecionar"
                            deselectLabel="Enter ou clique para desmarcar"
                            selectedLabel="Selecionado"
                            @input="setCategory"
                            v-validate="'required'"
                            data-vv-name="categories" data-vv-as="Categoria"
                        >
                        </multiselect>
                        <small class="f-300 f-danger">{{ errors.first('categories') }}</small>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                        <label for="company-name-id">Nome <small>(obrigatório)</small></label>
                        <input
                            type="text"
                            v-validate="'required'"
                            data-vv-name="name" data-vv-as="Nome"
                            class="form-control"
                            placeholder="Nome do plano"
                            v-model="plan.name"
                        >
                        <small class="f-300 f-danger">{{ errors.first('name') }}</small>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('value')}">
                        <currency
                            v-model="plan.value"
                            :label="'Valor'"
                            :placeholder="'Valor do plano'"
                        >
                        </currency>
                        <small class="f-300 f-danger">{{ errors.first('value') }}</small>

                    </div>

                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea class="form-control" placeholder="Insira uma breve descrição sobre este plano" v-model="plan.description"></textarea>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('type')}">
                        <label>Tipo <small>(obrigatório)</small></label>
                        <input
                            type="text"
                            v-validate="'required'"
                            data-vv-name="type" data-vv-as="Tipo"
                            class="form-control"
                            placeholder="aula, consulta, atendimento"
                            v-model="plan.label"
                            data-mask="0000.00" data-mask-reverse="true"
                        >
                        <small class="f-300 f-danger">{{ errors.first('type') }}</small>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('expiration')}">
                        <label>Período <small>(em meses - obrigatório)</small></label>
                        <input
                            type="number"
                            v-validate="'required'"
                            data-vv-name="expiration" data-vv-as="Período"
                            class="form-control"
                            placeholder="Somente a quantidade de meses em números."
                            v-model="plan.expiration"
                        >
                        <small class="f-300 f-danger">{{ errors.first('expiration') }}</small>
                    </div>

                    <div class="form-group m-t-10">
                        <label>Ativo?</label><br>
                        <label class="switch">
                            <input type="checkbox" v-model="plan.is_active">
                            <div class="slider round"></div>
                        </label>
                    </div>

                    <div class="form-group m-t-15">
                        <label>Visível para clientes</label><br>
                        <label class="switch">
                            <input type="checkbox" v-model="plan.is_starred">
                            <div class="slider round"></div>
                        </label>
                    </div>
                    <p>Os planos ativos e visíveis serão listados no perfil da empresa.</p>

                    <div class="form-group m-t-15">
                        <label>Quantidade limitada?</label><br>
                        <label class="switch">
                            <input type="checkbox" v-model="plan.limit_quantity">
                            <div class="slider round"></div>
                        </label>
                    </div>

                    <div class="form-group m-t-0" v-show="plan.limit_quantity">
                        <label>Quantidade</label>
                        <input class="form-control" placeholder="Quantidade de aulas ou agendamentos inclusos" v-model="plan.quantity" v-mask="'###.##'">
                    </div>

                    <p>Habilite esta opção para gerar agendamentos baseado em uma quantidade específica.</p>
                    <p>Desabilite esta opção para limitar a quantidade de agendamentos baseado na data de início e término do período do plano. Exemplo: Se você configurar 2 aulas por semana na configuração de agenda do cliente e o período do plano for 1 (mês), a plataforma irá gerar 2 agendamentos para o cliente no período de 1 mês nos horários configurados para o cliente.</p>

                    <button class="btn btn-success btn-block m-t-30" @click="savePlan()" v-show="!interactions.isUpdate" :disabled="!plan.category_id || !plan.name || !plan.value">Criar plano</button>
                    <button class="btn btn-success btn-block m-t-30" @click="updatePlan()" v-show="interactions.isUpdate" :disabled="!plan.category_id || !plan.name || !plan.value">Salvar plano</button>


                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import {apiUrl} from '@/config/'
    import mainHeader from '@/components/main-header.vue'
    import currency from '@/components/currency.vue'
    import { cleanPlanModel } from '@/models/Plan.js'
    import { mapGetters, mapActions } from 'vuex'
    import Multiselect from 'vue-multiselect'
    import VueNumeric from 'vue-numeric'
    import accounting from 'accounting'

    export default {
        name: 'companies-plan-create',
        components:{
            mainHeader,
            currency,
            Multiselect,
            VueNumeric
        },
        data() {
            return{
                interactions: {
                    isUpdate: false
                },
                plan: cleanPlanModel(),
                isMobile: false,
                categories: [],
                selectedCategories:[],
            }
        },
        computed:{
            ...mapGetters(['AuthToken', 'currentUser']),
        },

        mounted() {
            this.getCategories()

            if(window.cordova){
                this.isMobile = true
            }

            this.interactions.isUpdate = this.$route.query.isUpdate ? true : false
            if(this.interactions.isUpdate){
                this.getPlan();
            }

            this.plan.company_id = this.$route.params.company_id

        },

        methods:{

            ...mapActions(['setLoading']),

            setPlanValue: function(value){
                let that = this

                that.plan.value = accounting.unformat(that.plan.value)
                that.plan.value = (that.plan.value / 100).toFixed(2);

            },

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

            setCategory(select){

                if(select){
                    this.plan.category_id = select.id
                }
            },

            getPlan: function(){
                let that = this
                that.$http.get(`professional/company/plan/show/${that.$route.query.plan_id}`)
                .then(function (response) {
                    that.plan = response.data.plan
                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            savePlan: function(){
                let that = this

                that.$http.post('professional/company/plan/store', that.plan)
                    .then(function (response) {

                        successNotify('', 'Plano adicionado com sucesso')
                        that.$router.push({name: 'admin.companies.show', params: {company_id: that.$route.params.company_id}});

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            updatePlan: function(){
                let that = this

                that.$http.post('professional/company/plan/update', that.plan)
                    .then(function (response) {

                        successNotify('', 'Plano atualizado com sucesso')
                        that.$router.push({name: 'admin.companies.show', params: {company_id: that.$route.params.company_id}});

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

                    if(!that.plan.photos.length){
                        api_response.photo.is_profile = true
                    }

                    that.plan.photos.push(api_response.photo)

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

                ft.upload(imageURI, encodeURI(`${apiUrl}/professional/company/plan/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('company_id', that.company.id)

                that.$http.post('professional/company/plan/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.plan.photos.length){
                            response.data.photo.is_profile = true
                        }

                        that.plan.photos.push(response.data.photo)

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

                that.plan.photos.map((photo) => {

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

                        that.plan.photos = that.plan.photos.filter(function (image) {
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
