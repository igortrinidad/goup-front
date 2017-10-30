<template>

    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Receitas'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- Search & Filters -->
        <div class="container m-t-20 text-center">
            <div class="row">
                <div class="col-sm-12 m-t-20">
                    <router-link :to="{name: 'landing.meal-recipes.create'}" tag="button" class="btn f-20 btn-light btn-block f-300" :disabled="!isLogged">
                        <span><i class="ion-ios-plus-outline m-r-5"></i>Enviar receita</span>
                    </router-link>
                    <div class="alert alert-info f-400 m-t-20" v-if="!isLogged">
                        <span class="close" data-dismiss="alert" aria-label="close"><i class="ion-ios-close-outline"></i></span>
                        <span>Você precisa estar logado para enviar uma receita.</span>
                    </div>

                    <div class="form-group search m-t-20">
                        <span class="search-label d-block m-b-5 text-center"></span>
                        <label class="input-group">
                            <input type="text" class="form-control" v-model="interactions.search" placeholder="Procure uma receita" value="" @keyup.enter="getMealRecipes()">
                            <span class="input-group-addon btn btn-light" name="span" @click="getMealRecipes()"><i class="ion-ios-search f-20"></i></span>
                        </label>
                    </div>

                </div>
            </div>


            <div class="filters">
                <div class="tag-list m-t-20">
                    <div class="row">
                        <label>Tipo de refeição</label>
                        <span class="label f-14 label-primary m-t-5 m-r-5 p-5 cursor-pointer" v-for="(type, typeIndex) in mealTypes"
                              @click="selectMealType(type)"
                              :class="{'label-primary':selectedMealTypes.indexOf(type) < 0,  'label-info': selectedMealTypes.indexOf(type) > -1}">
                            {{type.name}} <i class="ion-close" v-if="selectedMealTypes.indexOf(type) > -1"></i>
                        </span>
                    </div>
                </div>

                <div class="tag-list m-t-15">
                    <div class="row">
                        <div class="col-sm-12">
                            <label>Tags</label>
                            <span class="label f-14 m-t-5 m-r-5 p-5 cursor-pointer" v-for="(tag, $tagIndex) in tags"
                                  @click="selectTag(tag)"
                                  :class="{'label-primary':selectedTags.indexOf(tag) < 0,  'label-success': selectedTags.indexOf(tag) > -1}">
                                {{tag.name}} <i class="ion-close" v-if="selectedTags.indexOf(tag) > -1"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary btn-block m-t-15 m-b-10" @click="showModalSliders">Filtrar por macro nutrientes</button>
                <div class="row">
                     <span class="label label-default m-t-5 m-r-5 p-5" v-if="macroNutrients.kcal">Calorias: {{macroNutrients.kcal}} kcal</span>
                     <span class="label label-default m-t-5 m-r-5 p-5" v-if="macroNutrients.protein">Proteina: {{macroNutrients.protein}} gramas</span>
                     <span class="label label-default m-t-5 m-r-5 p-5" v-if="macroNutrients.carbohydrate">Carboidrato: {{macroNutrients.carbohydrate}} gramas</span>
                     <span class="label label-default m-t-5 m-r-5 p-5" v-if="macroNutrients.lipids">Lipídios: {{macroNutrients.lipids}} gramas</span>
                     <span class="label label-default m-t-5 m-r-5 p-5" v-if="macroNutrients.fiber">Fibra: {{macroNutrients.fiber}} gramas</span>
                </div>

                <button class="btn btn-info btn-block m-t-20" @click="getMealRecipes()">Pesquisar</button>



            </div>

        </div>
        <!-- / Search & Filters -->

        <!-- List Recipes -->
        <div class="container m-t-20">
            <hr>

            <p v-if="meal_recipes.length" class="text-center"> Exibindo <strong>{{meal_recipes.length}}</strong> {{meal_recipes.length > 1 ? 'receitas' : 'receita'}} de <strong>{{pagination.total}}</strong>  {{pagination.total > 1 ? 'receitas' : 'receita'}} localizadas</p>

            <card-placeholder v-if="placeholder" :headerFullImage="true">
            </card-placeholder>

            <div class="row" v-if="!placeholder">
                <p class="text-center" v-if="!meal_recipes.length">Nenhuma receita localizada.</p>

                <div class="col-sm-4 col-xs-12" v-for="recipe in meal_recipes">
                    <!-- Card Recipe -->
                    <router-link tag="div" :to="{ name: 'landing.meal-recipes.show', params: { slug: recipe.slug }}" class="card m-b-10 cursor-pointer">

                        <!--  Card Recipe Header-->
                        <div class="card-header ch-alt text-center card-picture-header" :style="`background-image:url('${ recipe.avatar }')`">
                            <div class="hover">
                                <i class="ion-ios-plus-empty"></i>
                            </div>
                        </div>
                        <!-- / Card Recipe Header -->

                        <!-- Card Recipe Body -->
                        <div class="card-body card-padding text-center">

                            <h3 class="f-300 m-t-5">{{ recipe.title }}</h3>
                            <p class="f-300 m-b-15">Avaliação</p>
                            <!--Rating-->
                            <rating-simple
                                :value.sync="recipe.difficulty"
                                :max="5"
                                :size="2"
                                :align-class="'text-center'"
                                :class-of-icon="'ion-star'"
                                :color-of-icon="'#75C258'"
                            ></rating-simple>
                            <!--Rating-->

                            <!--Infos-->

                            <div class="row m-t-10">
                                <div class="recipe-info time-info">
                                    <i class="ion-android-alarm-clock fa-lg f-primary"></i> {{recipe.prep_time}} MIN
                                </div>
                                <div class="recipe-info">
                                    <i class="ion-android-restaurant fa-lg f-primary"></i> {{recipe.portions}} {{recipe.portions > 1 ? 'Porções' : 'Porção'}}
                                </div>
                            </div>
                            <!--Infos-->
                        </div>
                        <!-- / Card Recipe Body -->
                        <div style="height: 100px;">
                            <div class="text-center m-b-10">
                                <span class="label label-info m-t-5 p-5 f-14 m-r-5" v-for="(type, indexType) in recipe.types">{{type.name}}</span>
                            </div>
                            <div class="text-center m-b-10">
                                <span class="label label-success m-t-5 p-5 f-14 m-r-5" v-for="(tag, indexTag) in recipe.tags">{{tag.name}}</span>
                            </div>
                        </div>
                    </router-link>
                    <!-- / Card Event -->
                </div>
            </div>
        </div>
        <!-- / List Recipes -->

        <!--Modal filter macro nutrients-->
        <div class="modal" id="filter-macro-nutrients" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Filtrar receitas por macro nutrientes</h4>
                    </div>
                    <div class="modal-body">

                        <p class="text-center">Informe os valores para os macro nutrientes desejados.</p>
                        <p class="text-center">Os valores zerados não serão considerados na pesquisa.</p>
                        <p class="text-center">Buscaremos as receitas que atendam aos requisitos de macro nutrientes entre 20% para mais ou para menos dos valores informados.</p>
                        <div class="macronutrients m-t-20">
                            <div class="form-group">
                                <label class="m-l-10">Calorias <strong v-if="macroNutrients.kcal">({{macroNutrients.kcal}} kcal)</strong></label>
                                <vue-slider ref="kcal"
                                            v-model="macroNutrients.kcal"
                                            :min="0"
                                            :max="1500"
                                            :process-style="sliderConfig.style"
                                            :piecewise-active-style="sliderConfig.style"
                                            :piecewise-style="sliderConfig.style"
                                            :tooltip-style="sliderConfig.style"
                                            tooltip-dir="bottom"
                                            tooltip="hover"
                                >
                                </vue-slider>
                            </div>

                            <div class="form-group">
                                <label class="m-l-10">Proteina <strong v-if="macroNutrients.protein">({{macroNutrients.protein}} gramas)</strong></label>
                                <vue-slider ref="protein"
                                            v-model="macroNutrients.protein"
                                            :min="0"
                                            :max="250"
                                            :process-style="sliderConfig.style"
                                            :piecewise-active-style="sliderConfig.style"
                                            :piecewise-style="sliderConfig.style"
                                            :tooltip-style="sliderConfig.style"
                                            tooltip-dir="bottom"
                                            tooltip="hover"
                                >
                                </vue-slider>
                            </div>

                            <div class="form-group">
                                <label class="m-l-10">Carboidrato <strong v-if="macroNutrients.carbohydrate">({{macroNutrients.carbohydrate}} gramas)</strong></label>
                                <vue-slider ref="carbohydrate"
                                            v-model="macroNutrients.carbohydrate"
                                            :min="0"
                                            :max="250"
                                            :process-style="sliderConfig.style"
                                            :piecewise-active-style="sliderConfig.style"
                                            :piecewise-style="sliderConfig.style"
                                            :tooltip-style="sliderConfig.style"
                                            tooltip-dir="bottom"
                                            tooltip="hover"
                                >
                                </vue-slider>
                            </div>

                            <div class="form-group">
                                <label class="m-l-10">Lipídios <strong v-if="macroNutrients.lipids">({{macroNutrients.lipids}} gramas)</strong></label>
                                <vue-slider ref="lipids"
                                            v-model="macroNutrients.lipids"
                                            :min="0"
                                            :max="250"
                                            :process-style="sliderConfig.style"
                                            :piecewise-active-style="sliderConfig.style"
                                            :piecewise-style="sliderConfig.style"
                                            :tooltip-style="sliderConfig.style"
                                            tooltip-dir="bottom"
                                            tooltip="hover"
                                >
                                </vue-slider>
                            </div>
                            <div class="form-group">
                                <label class="m-l-10">Fibra <strong v-if="macroNutrients.fiber">({{macroNutrients.fiber}} gramas)</strong></label>
                                <vue-slider ref="fiber"
                                            v-model="macroNutrients.fiber"
                                            :min="0"
                                            :max="250"
                                            :process-style="sliderConfig.style"
                                            :piecewise-active-style="sliderConfig.style"
                                            :piecewise-style="sliderConfig.style"
                                            :tooltip-style="sliderConfig.style"
                                            tooltip-dir="bottom"
                                            tooltip="hover"
                                >
                                </vue-slider>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button class="btn btn-info" @click.prevent="getMealRecipes">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal filter macro nutrients-->

        <!--Paginação-->
        <div class="row" v-show="!placeholder && meal_recipes.length">
            <div class="col-sm-12">
                <div class="text-center">
                    <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                </div>
            </div>
        </div>
        <!--Paginação-->
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import vueSlider from 'vue-slider-component'

    export default {
        name: 'landing-meal-recipes-list',
        components: {
            mainHeader,
            cardPlaceholder,
            ratingSimple: require('@/components/rating-simple.vue'),
            vueSlider,
            pagination: require('@/components/pagination.vue'),
        },
        data() {
            return {
                interactions: {
                    showFilters: false,
                    search: ''
                },
                placeholder: true,
                currentMealType: '',
                located_count: 0,
                mealTypes: [],
                tags: [],
                meal_recipes: [],
                pagination: {},
                selectedTags: [],
                sliderConfig: {
                    min: 0,
                    max: 1000,
                    style: {
                        "backgroundColor": "#59BF63",
                        "borderColor": "#59BF63"
                    }
                },
                macroNutrients:{
                    kcal: 0,
                    protein: 0,
                    carbohydrate: 0,
                    lipids: 0,
                    fiber: 0,
                },
                selectedMealTypes: [],
                mealTypesFiltered: [],
                tagsFiltered: [],
                current_page: null

            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getCategories()
            this.getTags()

            this.handleFilterHistory()
        },
        methods: {


            getCategories(){
                let that = this
                that.$http.get('meal/type/list')
                    .then(function (response) {

                        that.mealTypes = response.data

                        //Set selected from filter history
                        if(that.mealTypesFiltered.length)
                        {
                            that.mealTypesFiltered.map((type) => {
                                let meal_type = _.find(that.mealTypes, {slug: type})

                                if(meal_type){
                                    that.selectedMealTypes.push(meal_type)
                                }
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getTags(){
                let that = this
                that.$http.get('meal/tag/list')
                    .then(function (response) {

                        that.tags = response.data

                        //Set selected from filter history
                        if(that.tagsFiltered.length)
                        {
                            that.tagsFiltered.map((tag) => {
                                let filter_tag = _.find(that.tags, {slug: tag})

                                if(filter_tag){
                                    that.selectedTags.push(filter_tag)
                                }
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getMealRecipes(){
                let that = this

                that.placeholder = true

                that.$http.post('meal/recipe/list', {
                    types: that.mealTypesFiltered,
                    tags: that.tagsFiltered,
                    nutrients: that.macroNutrients,
                    search: that.interactions.search})
                    .then(function (response) {
                        that.located_count = response.data.count
                        that.meal_recipes = response.data.data
                        that.pagination = response.data.pagination
                        $('#filter-macro-nutrients').modal('hide')

                        setTimeout(() => {
                            that.placeholder = false
                        },200)

                        //Save on localhostorage
                        let filters = {
                            types: that.mealTypesFiltered,
                            tags: that.tagsFiltered,
                            nutrients: that.macroNutrients,
                            search: that.interactions.search,
                            current_page: 0,
                        }

                        localStorage.setItem('recipe-filters', JSON.stringify(filters))

                    })
                    .catch(function (error) {
                    });
            },

            navigate(page) {
                let that = this

                that.$http.post('meal/recipe/list', {
                    types: that.mealTypesFiltered,
                    tags: that.tagsFiltered,
                    nutrients: that.macroNutrients,
                    search: that.interactions.search,
                    page: page,
                } )
                    .then(function (response) {
                        that.meal_recipes = response.data.data;
                        that.pagination = response.data.pagination;
                        $('#filter-macro-nutrients').modal('hide')

                        // save on localstorage
                        let filters = {
                            types: that.mealTypesFiltered,
                            tags: that.tagsFiltered,
                            nutrients: that.macroNutrients,
                            search: that.interactions.search,
                            current_page: page,
                        }

                        localStorage.setItem('recipe-filters', JSON.stringify(filters))
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            selectTag(selected){
               let that = this

                let tag_index = that.selectedTags.indexOf(selected)

                if(tag_index < 0){
                   that.selectedTags.push(selected)
                }else{
                    that.selectedTags.splice(tag_index, 1)
                }

                that.handleSelectedTags()
            },

            handleSelectedTags(){
                let that = this

                let selectedTags = _.reduce(that.selectedTags, function(result, tag, key) {
                    result.push(tag.slug);
                    return result;
                }, []);

                that.tagsFiltered = selectedTags

                that.getMealRecipes()
            },

            showModalSliders(){

                $('#filter-macro-nutrients').modal('show')
                this.$nextTick(() => {
                    this.$refs.kcal.refresh()
                    this.$refs.protein.refresh()
                    this.$refs.carbohydrate.refresh()
                    this.$refs.lipids.refresh()
                    this.$refs.fiber.refresh()
                })
            },

            selectMealType(selected){
                let that = this

                let type_index = that.selectedMealTypes.indexOf(selected)

                if(type_index < 0){
                    that.selectedMealTypes.push(selected)
                }else{

                    that.selectedMealTypes.splice(type_index, 1)
                }

                that.handleSelectedMealTypes()
            },

            handleSelectedMealTypes(){
                let that = this

                let selectedMealTypes = _.reduce(that.selectedMealTypes, function(result, type, key) {
                    result.push(type.slug);
                    return result;
                }, []);

                that.mealTypesFiltered = selectedMealTypes

                that.getMealRecipes()
            },

            handleFilterHistory(){

                let that = this

                let filters = JSON.parse(localStorage.getItem('recipe-filters'))

                if (filters) {
                    that.mealTypesFiltered = filters.types
                    that.tagsFiltered = filters.tags
                    that.macroNutrients = filters.nutrients
                    that.interactions.search = filters.search
                    that.current_page = filters.current_page
                }

                if(that.current_page){
                    that.navigate(that.current_page)
                }

                if(!that.current_page){
                    that.getMealRecipes()
                }

            }
        }

    }
</script>

<style scoped>
    /* Scoped Styles */

    .card-picture-header {
        box-sizing: border-box;
        margin: 0 auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
        border: solid 1px #EBECEC;
    }

    .card-header { position: relative ;}

    .card-header:hover .hover{
        display: flex;
    }

    .card-header .hover {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background-color: rgba(56, 57, 56, .6);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F4F5F5;
        border-radius: 4px;
        font-size: 50px;
        display: none;
    }

    /* Event Cats */
    .list-cats {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
    }

    .recipe-info{
        width: 50%;
        box-sizing: border-box;
        float: left;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
    }

    .time-info{
        border-right: 1px solid #d8d8d8;
    }
</style>
