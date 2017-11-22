<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <div class="main">
                <div class="container">

                    <!-- CATEGORIES -->
                    <div class="row text-center" style="overflow-x: auto; margin-bottom: -20px;">

                        <span
                            class="label transparent m-5 cursor-pointer"
                            :class="{
                                'label-default': currentCategory !== category,
                                'label-primary': currentCategory === category
                            }"
                            v-for="category in categories"
                            @click="changeCurrentCategory(category)"
                        >
                            {{ category }}
                            <i :class="{
                                'm-l-5': true,
                                'ion-ios-circle-outline': currentCategory !== category,
                                'ion-ios-circle-filled': currentCategory === category
                                }"
                            >
                            </i>
                        </span>

                    </div>

                    <!-- Categories Filters -->
                    <div class="row text-center">

                        <button
                            type="button"
                            class="btn btn-xs btn-primary transparent m-t-30"
                            data-toggle="modal"
                            data-target="#modal-filter"
                        >
                            {{ translations.more_filters }}
                        </button>
                    </div>

                    <div class="row m-t-30">
                        <div class="col-sm-12" v-for="place in places">
                            <div class="card m-b-10">
                                <div class="card-body card-padding">

                                    <!-- Place Thumbnail -->
                                    <div class="picture-circle picture-circle-m m-t-10 rounded" :style="{ backgroundImage: `url(${ place.avatar })` }">
                                    </div>
                                    <!-- /Place Thumbnail -->

                                    <!-- Place Category -->
                                    <span class="label label-primary transparent place-category">
                                        {{ checkLanguage === 'en' ? place.category.name_en : place.category.name_pt }}
                                    </span>
                                    <!-- /Place Category -->

                                    <!-- Place Ranking -->
                                    <span class="label label-primary transparent place-ranking">
                                        <i class="ion-podium m-r-5"></i>
                                        {{ place.ranking }}º
                                    </span>
                                    <!-- Place Ranking -->

                                    <!-- Title And Location -->
                                    <div class="text-center">
                                        <h4 class="f-700">
                                            {{ place.name }}
                                        </h4>
                                        <div class="border-inside-card text-center">
                                            <i class="ion-ios-location"></i>
                                            <small class="d-block">{{ place.city }} - {{ place.state }}</small>
                                        </div>
                                    </div>
                                    <!-- /Title And Location -->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Modal Filter -->
                <div class="modal" id="modal-filter" tabindex="-1" role="dialog" aria-labelledby="modal-filter" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button
                                    type="button"
                                    class="btn btn-primary transparent btn-close"
                                    data-dismiss="modal"
                                >
                                    <i class="ion-close-round"></i>
                                </button>
                                <h3 class="title text-center">{{ translations.filters }}</h3>
                            </div>
                            <div class="modal-body">
                                MOSTRAR UMA LISTA DE TAGS COM AS SUBCATEGORIAS DA CATEGORIA ATUAL
                                <br>
                                E OUTRAS OPÇÕES PARA FILTRO
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Modal Filter -->
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import mainHeader from '@/components/main-header.vue'

    import { cleanPlaceModel } from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'

    import * as translations from '@/translations/events/list'

    export default {
        name: 'general-events-list',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
                places: [],
                categories: [],
                currentCategory: '',
            }
        },

        computed: {
            ...mapGetters(['checkLanguage']),

            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getPlaces()
            this.getCategoriesByLanguage(this.checkLanguage)
        },

        methods: {

            changeCurrentCategory(category) {
                this.currentCategory = category
            },

            getCategoriesByLanguage(lang) {
                let that = this

                const categories = cleanCategoriesArrayExample()

                if (lang === 'en') {
                    categories.forEach((category) => {
                        that.categories.push(category.name_en)
                    })
                }
                if (lang === 'pt') {
                    categories.forEach((category) => {
                        that.categories.push(category.name_pt)
                    })
                }
                that.currentCategory = that.categories[0]
            },

            getPlaces() {
                let that = this
                that.places = [ cleanPlaceModel(), cleanPlaceModel(), cleanPlaceModel(), cleanPlaceModel(), cleanPlaceModel() ]
            }
        }
    }
</script>

<style scoped>

    .place-category,
    .place-ranking { position: absolute; top: 52px; }

    .place-category { left: 10px; }
    .place-ranking { right: 10px; }
</style>
