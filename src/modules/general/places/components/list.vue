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

                    <!-- Filter Button -->
                    <div class="text-center">
                        <span
                            :class="{
                                'label transparent m-5': true,
                                'label-default': currentCategory !== category,
                                'label-primary': currentCategory === category
                            }"
                            v-for="category in categories"
                            @click="changeCurrentCategory(category)"
                        >
                            {{ category }}
                        </span>
                    </div>
                    <!-- Filter Button -->

                    <div class="row m-t-30">
                        <div class="col-sm-12" v-for="place in places">
                            <div class="card m-b-10">
                                <div class="card-body card-padding">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <div class="picture-circle picture-circle-xs m-0 m-t-10" :style="{ backgroundImage: `url(${ place.avatar })` }">
                                            </div>
                                        </div>
                                        <div class="col-xs-8">
                                            <span class="f-700 t-overflow">
                                                {{ place.name }}
                                            </span>
                                            <rating-simple
                                                :value="place.rating"
                                                :size="1"
                                                :alignClass="'text-left'"
                                                :colorOfIcon="'#FF4B89'"
                                            />
                                            <small>{{ place.city }} - {{ place.state }}</small>
                                        </div>
                                    </div>
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
                                <h3 class="title text-center">{{ translations.filter }}</h3>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="f-default">{{ translations.label.max_range }}</label>
                                </div>
                                <hr>
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
    import ratingSimple from '@/components/rating-simple.vue'

    import PlaceModel from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'

    import * as translations from '@/translations/places/list'

    export default {
        name: 'general-places-list',

        components: {
            mainHeader,
            ratingSimple
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
                that.places = [ PlaceModel, PlaceModel, PlaceModel, PlaceModel, PlaceModel ]
            }
        }
    }
</script>

<style scoped>

</style>
