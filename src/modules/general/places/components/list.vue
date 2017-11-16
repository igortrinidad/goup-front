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
                        <button
                            type="button"
                            class="btn btn-primary transparent"
                            data-toggle="modal"
                            data-target="#modal-filter"
                        >
                            {{ translations.filter }}
                        </button>
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
                                    <vue-slider ref="slider" v-model="filter.max_range" :max="1000"></vue-slider>
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

    import vueSlider from 'vue-slider-component'
    import mainHeader from '@/components/main-header.vue'
    import ratingSimple from '@/components/rating-simple.vue'

    import PlaceModel from '@/models/Place'
    import * as translations from '@/translations/places/list'

    export default {
        name: 'general-places-list',

        components: {
            vueSlider,
            mainHeader,
            ratingSimple,
        },

        data () {
            return {
                placeholder: true,
                places: [],
                filter: {
                    max_range: 0
                }
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
        },

        methods: {
            getPlaces() {
                let that = this

                that.places = [ PlaceModel, PlaceModel, PlaceModel, PlaceModel, PlaceModel ]
            }
        }
    }
</script>

<style scoped>

</style>
