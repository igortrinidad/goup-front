<template>

    <div>

        <main-header
            :type="'center'"
            :title="$route.query.edit ? 'Editar receita' : 'Nova receita'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="first-container">
            <div class="container">
                <div class="card container">
                    <div class="card-header ch-alt text-center">
                        <h4 class="f-300 m-0">{{$route.query.edit ? 'Editar' : 'Nova'}} receita</h4>
                    </div>

                    <div class="card-body card-padding">

                        <div :class="{'form-group': true, 'has-error': errors.has('title')}">
                            <label>Nome da receita</label>
                            <input
                                type="text"
                                v-validate="'required'"
                                data-vv-name="title" data-vv-as="Nome da receita"
                                class="form-control"
                                v-model="meal_recipe.title"
                                placeholder="Nome da receita"
                            >
                            <small class="f-300 f-danger">{{ errors.first('title') }}</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('meal_types')}">
                            <label for="company-name-id">Tipo de refeição</label>
                            <multiselect
                                v-model="selectedMealTypes"
                                :options="meal_types"
                                :multiple="true"
                                :close-on-select="true"
                                :clear-on-select="true"
                                :hide-selected="false"
                                :preserve-search="true"
                                placeholder="Selecione um ou mais tipos de refeição"
                                label="name"
                                track-by="slug"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desselecionar"
                                selectedLabel="Selecionado"
                                @input="setMealTypes"
                                v-validate="'required'"
                                data-vv-name="meal_types" data-vv-as="Categorias">

                            </multiselect>
                            <small class="f-300 f-danger">{{ errors.first('meal_types') }}</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('prep_time')}">
                            <label>Tempo de preparo (minutos)</label>
                            <input
                                type="number"
                                v-validate="'required'"
                                data-vv-name="prep_time" data-vv-as="tempo de preparo"
                                class="form-control"
                                v-model="meal_recipe.prep_time"
                                placeholder="Tempo de preparo em minutos"
                                min="0"
                            >
                            <small class="f-300 f-danger">{{ errors.first('prep_time') }}</small>
                        </div>


                        <div :class="{'form-group': true, 'has-error': errors.has('portions')}">
                            <label>Rendimento (porções)</label>
                            <input
                                type="number"
                                v-validate="'required'"
                                data-vv-name="prep_time" data-vv-as="redimento"
                                class="form-control"
                                v-model="meal_recipe.portions"
                                placeholder="Quantas porções rende?"
                                min="0"
                            >
                            <small class="f-300 f-danger">{{ errors.first('portions') }}</small>
                        </div>

                        <div :class="{'form-group': true, 'has-error': errors.has('portion_size')}">
                            <label>Tamanho Porção (ex. 100 gramas, 1 copo...)</label>
                            <input
                                type="text"
                                v-validate="'required'"
                                data-vv-name="portion_size" data-vv-as="Tamanho porção"
                                class="form-control"
                                v-model="meal_recipe.portion_size"
                                placeholder="Tamanho porção (ex. 100 gramas / 1 copo...)"
                            >
                            <small class="f-300 f-danger">{{ errors.first('portion_size') }}</small>
                        </div>

                        <div class="row">
                           <div class="col-sm-12">
                               <div :class="{'form-group': true, 'has-error': errors.has('difficulty')}">
                                   <label>Nível de dificuldade</label>
                                   <rating-simple
                                       :value.sync="meal_recipe.difficulty"
                                       :max="5"
                                       :size="4"
                                       :disabled="false"
                                       @rating-changed="setDifficulty"
                                       :class-of-icon="'ion-spoon'"
                                       :color-of-icon="'#75C258'"
                                       class="pull-left"
                                   ></rating-simple>
                                   <small class="f-300 f-danger">{{ errors.first('difficulty') }}</small>
                               </div>
                           </div>
                        </div>

                        <hr>

                        <fieldset class="m-t-20">
                            <legend>Ingredientes</legend>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Novo ingrediente</label>
                                        <input type="text" class="form-control" placeholder="Novo ingrediente" v-model="newIngredient.description" @keyup.enter="addIngredient">
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-success btn-block" :disabled="newIngredient.description == ''" @click="addIngredient" v-if="!ingredientEdit">Adicionar</button>
                                        <button class="btn btn-info btn-block" :disabled="newIngredient.description == ''" @click="addIngredient" v-if="ingredientEdit">Salvar</button>
                                    </div>
                                </div>
                            </div>

                            <p class="text-danger" v-if="!meal_recipe.ingredients.length">Nenhum ingrediente adicionado</p>

                            <div class="table-responsive" v-if="meal_recipe.ingredients.length">
                                <table class="table table-hover table-vmiddle">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ingrediente</th>
                                        <th width="10%">Ações</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(ingredient, index) in meal_recipe.ingredients">
                                        <td>{{index+1}}</td>
                                        <td>{{ingredient.description}}</td>
                                        <td>
                                            <button class="btn btn-info btn-xs" @click.prevent="editIngredient(ingredient, index)"><i class="ion-edit"></i></button>
                                            <button class="btn btn-danger btn-xs" @click.prevent="removeIngredient(index)"><i class="ion-trash-b"></i></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                        <hr>
                        <div class="form-group">
                            <label>Modo de praparo</label>
                            <vue-editor
                                v-model="meal_recipe.prep_description"
                                placeholder="Explique detalhadamente como preparar a sua receita"
                                :editorToolbar="customToolbar"
                            >
                            </vue-editor>
                        </div>

                        <hr>

                        <fieldset class="m-t-20">
                            <legend>Imagens</legend>
                            <div v-if="isMobile">
                                <button class="btn btn-sm btn-block btn-info m-t-20" @click="getPicture()">Tirar foto</button>
                                <button class="btn btn-sm btn-block btn-primary m-t-20" @click="getCameraRoll()">Abrir galeria</button>
                            </div>

                            <div class="" v-if="!isMobile">
                                <button class="btn btn-sm btn-info m-t-20" @click.prevent="photoUploader.isvisible = true">Enviar imagem</button>
                            </div>
                            <p class="m-t-20 f-300 text-center f-danger" v-if="!meal_recipe.photos.length">
                                Nenhuma imagem enviada ainda, para adicionar uma nova receita você deve enviar pelo menos uma foto.
                            </p>

                            <div class="row m-t-20" >

                                <div class="col-md-2 col-sm-12" v-for="(img, index) in meal_recipe.photos">
                                    <img class="img-responsive" :src="img.photo_url"/>
                                    <div class="text-center m-t-5">
                                        <div class="checkbox-group">
                                            <label class="checkbox">
                                                <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="img.is_cover" @change="handleCoverImage(img)">
                                                <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox"></div>
                                                <span class="wp-checkbox-text">Imagem de capa</span></label>
                                        </div>
                                        <button class="btn btn-danger btn-xs" @click.prevent="removeImage(img.id)"><i class="fa fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <hr>

                        <fieldset class="m-t-20">
                            <legend>Informações nutricionais</legend>
                            <div :class="{'form-group': true, 'has-error': errors.has('kcal')}">
                                <label>Calorias</label>
                                <input
                                    type="number"
                                    v-validate="'required'"
                                    data-vv-name="kcal" data-vv-as="calorias"
                                    class="form-control"
                                    v-model="meal_recipe.kcal"
                                    placeholder="Calorias"
                                    min="0"
                                >
                                <small class="f-300 f-danger">{{ errors.first('kcal') }}</small>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('protein')}">
                                <label>Proteina</label>
                                <input
                                    type="number"
                                    v-validate="'required'"
                                    data-vv-name="kcal" data-vv-as="proteina"
                                    class="form-control"
                                    v-model="meal_recipe.protein"
                                    placeholder="Proteina"
                                    min="0"
                                >
                                <small class="f-300 f-danger">{{ errors.first('protein') }}</small>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('protein')}">
                                <label>Carboidrato</label>
                                <input
                                    type="number"
                                    v-validate="'required'"
                                    data-vv-name="carbohydrate" data-vv-as="carboidrato"
                                    class="form-control"
                                    v-model="meal_recipe.carbohydrate"
                                    placeholder="Carboidrato"
                                    min="0"
                                >
                                <small class="f-300 f-danger">{{ errors.first('carbohydrate') }}</small>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('protein')}">
                                <label>Lipídios</label>
                                <input
                                    type="number"
                                    v-validate="'required'"
                                    data-vv-name="lipids" data-vv-as="lipídios"
                                    class="form-control"
                                    v-model="meal_recipe.lipids"
                                    placeholder="Lipídios"
                                    min="0"
                                >
                                <small class="f-300 f-danger">{{ errors.first('lipids') }}</small>
                            </div>
                            <div :class="{'form-group': true, 'has-error': errors.has('fiber')}">
                                <label>Fibra</label>
                                <input
                                    type="number"
                                    v-validate="'required'"
                                    data-vv-name="fiber" data-vv-as="fibra"
                                    class="form-control"
                                    v-model="meal_recipe.fiber"
                                    placeholder="Fibra"
                                    min="0"
                                >
                                <small class="f-300 f-danger">{{ errors.first('fiber') }}</small>
                            </div>
                        </fieldset>
                        <hr>

                        <div>
                            <label>Tags</label>
                            <multiselect
                                v-model="selectedTags"
                                :options="tags"
                                :multiple="true"
                                :taggable="true"
                                :close-on-select="true"
                                :clear-on-select="false"
                                :hide-selected="false"
                                :preserve-search="true"
                                placeholder="Adicione uma ou mais tags a receita"
                                label="name"
                                track-by="slug"
                                selectLabel="Enter ou clique para adicionar"
                                deselectLabel="Enter ou clique para remover"
                                selectedLabel="Selecionado"
                                @input="setTags"
                                v-validate="'required'"
                                data-vv-name="tags" data-vv-as="tags"
                                :tag-placeholder="'Enter ou clique para adicionar a tag'"
                                @tag="addTag"
                            >

                            </multiselect>
                        </div>

                        <button
                            class="btn btn-primary btn-block m-t-30"
                            @click="saveMealRecipe()"
                            v-if="!$route.query.edit"
                            :disabled="isValidRecipe()"
                        >
                            Enviar receita
                        </button>
                        <button
                            class="btn btn-info btn-block m-t-30"
                            @click="updateMealRecipe()"
                            v-if="$route.query.edit"
                            :disabled="isValidRecipe()"
                        >
                            Salvar receita
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
    import {cleanMealRecipe} from '@/models/MealRecipe'
    import { VueEditor } from 'vue2-editor'
    import Datepicker from 'vuejs-datepicker'
    import Multiselect from 'vue-multiselect'
    import slug from 'slug'
    import moment from 'moment'

    export default{
        name: 'landing-meal-recipes-create-edit',
        components:{
            VueEditor,
            Multiselect,
            Datepicker,
            mainHeader: require('@/components/main-header.vue'),
            photoUploader: require('@/components/photo-uploader.vue'),
            ratingSimple: require('@/components/rating-simple.vue'),
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
                meal_recipe: cleanMealRecipe(),
                meal_types: [],
                selectedMealTypes: [],
                newIngredient: {
                    description: ''
                },
                ingredientEdit: false,
                selectedIngredientIndex: null,
                tags: [],
                selectedTags: []

            }
        },
        mounted(){

            if(window.cordova){
                this.isMobile = true
            }

            this.getMealTypes();
            this.getTags();

            if(this.$route.query.edit){
                this.getRecipe();
            }

        },
        computed: {

            ...mapGetters(['currentUser', 'AuthToken'])
        },
        methods:{

            ...mapActions(['authSetUser', 'setLoading', 'incrementClientTotalXp']),


            isValidRecipe: function() {

                return !this.meal_recipe.title || !this.meal_recipe.prep_time || !this.meal_recipe.portions || !this.meal_recipe.difficulty ||
                !this.meal_recipe.types.length || !this.meal_recipe.photos.length
            },

            getMealTypes: function(){
                let that = this

                this.$http.get('meal/type/list').then(response => {

                    that.meal_types = response.data

                }, response => {
                    // error callback
                });
            },
            getTags: function(){
                let that = this

                this.$http.get('meal/tag/list').then(response => {

                    that.tags = response.data

                }, response => {
                    // error callback
                });
            },

            setTags(selecteds){
                if(selecteds){
                    this.meal_recipe.tags = selecteds.map((tag) => tag.id)
                }
            },

            addTag(newTag){
                let that = this

                that.$http.post('meal_recipe/tag/store ', {name:newTag }).then(response => {

                   that.tags.push(response.data.tag)
                   that.selectedTags.push(response.data.tag)

                }, response => {
                    // error callback
                });

            },


            setDifficulty(difficulty) {

                this.meal_recipe.difficulty = difficulty
            },

            addIngredient(){
                let that = this

                if(that.newIngredient == ''){
                    infoNotify('','Você deve informar o ingrediente')
                    return false
                }

                if(that.ingredientEdit){
                    that.meal_recipe.ingredients.splice(that.selectedIngredientIndex, 1,_.cloneDeep(that.newIngredient) )
                    that.newIngredient.description = ''
                    this.ingredientEdit = false
                    that.selectedIngredientIndex = null
                }else{
                    that.meal_recipe.ingredients.push(_.cloneDeep(that.newIngredient))
                    that.newIngredient.description = ''
                }
            },

            editIngredient(ingredient, index){

                this.selectedIngredientIndex = index
                this.ingredientEdit = true
                this.newIngredient = _.cloneDeep(ingredient)
            },

            removeIngredient(index){
                let that = this;

                that.$swal({
                    title: '',
                    text: 'Deseja remover o ingrediente selecionado?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Remover',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {
                    that.meal_recipe.ingredients.splice(index, 1)
                }).catch(function () {

                })
            },


            getRecipe() {
                let that = this

                this.$http.get(`meal_recipe/show/${that.$route.query.meal_recipe_id}`).then(response => {

                    that.meal_recipe = response.data.meal_recipe;

                    that.selectedMealTypes = that.meal_recipe.types
                    that.setMealTypes(that.selectedMealTypes)

                    that.selectedTags = that.meal_recipe.tags
                    that.setTags(that.selectedTags)

                }, response => {
                    // error callback
                });
            },

            saveMealRecipe: function(){
                let that = this

                that.meal_recipe.date = moment(that.meal_recipe.date).format('YYYY-MM-DD')

                this.$http.post('meal_recipe/store', that.meal_recipe).then(response => {
                    //Add XP points to client
                    that.incrementClientTotalXp(5)

                    successNotify('', 'Receita enviada com sucesso.')
                    that.$router.push({name: 'landing.meal-recipes.show', params: {slug: response.data.meal_recipe.slug}});

                }, response => {
                    // error callback
                });

            },

            updateMealRecipe: function(){
                let that = this

                this.$http.post('meal_recipe/update', that.meal_recipe).then(response => {

                    successNotify('', 'Receita atualizada com sucesso.')
                    that.$router.push({name: 'landing.meal-recipes.show', params: {slug: response.data.meal_recipe.slug}});

                }, response => {
                    // error callback
                });

            },

            setMealTypes(selecteds){

                if(selecteds.length){
                    //for compatibility
                    this.meal_recipe.type_id = selecteds[0].id

                    this.meal_recipe.types = selecteds.map((type) => type.id)
                }

                if(!selecteds.length){
                    //for compatibility
                    this.meal_recipe.type_id = null

                    this.meal_recipe.types = []
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

                let that = this
                var win = function (response) {

                    let api_response = JSON.parse(response.response)

                    if(!that.meal_recipe.photos.length){
                        api_response.photo.is_cover = true
                    }

                    that.meal_recipe.photos.push(api_response.photo)

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
                params.meal_recipe_id = that.meal_recipe.id;
                params.is_cover = false;

                options.params = params;
                var ft = new FileTransfer();

                that.setLoading({is_loading: true, message: 'Enviando, aguarde'})

                ft.upload(imageURI, encodeURI(`${apiUrl}/meal_recipe/photo/upload`), win, fail, options);
            },

            uploadPhoto: function(cropedFile){
                let that = this

                let formData = new FormData();
                formData.append('file', cropedFile.file)
                formData.append('meal_recipe_id', that.meal_recipe.id)

                that.$http.post('meal_recipe/photo/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        if(!that.meal_recipe.photos.length){
                            response.data.photo.is_cover = true
                        }

                        that.meal_recipe.photos.push(response.data.photo)

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

            handleCoverImage(selected_photo){
                let that = this

                that.meal_recipe.photos.map((photo) => {

                    photo.is_cover = false

                    if(photo.id == selected_photo.id ){
                        photo.is_cover = true
                    }
                })
            },

            removeImage(image_id){
                let that = this

                that.$http.get('meal_recipe/photo/destroy/' + image_id)
                    .then(function (response) {

                        that.meal_recipe.photos = that.meal_recipe.photos.filter(function (image) {
                            return image.id != image_id;
                        });

                        successNotify('', 'Imagem removida com sucesso')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
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
