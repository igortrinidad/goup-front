<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">

                <div class="container bg m-t-20 text-center">

                    <form>
                        <!-- Event Informations -->
                        <div class="border-inside-card default m-b-20">
                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-name">{{ translations.form.event_name }}</label>
                                <input
                                    type="text"
                                    id="event-name"
                                    class="form-control"
                                    v-model="event.name"
                                    :placeholder="translations.form.event_name"
                                >
                            </div>
                            <!-- / Name -->

                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-description">{{ translations.form.event_description }}</label>
                                <textarea
                                    type="text"
                                    id="event-description"
                                    class="form-control"
                                    v-model="event.description"
                                    :placeholder="translations.form.event_description"
                                >
                                </textarea>
                            </div>
                            <!-- / Name -->

                            <div class="form-group">
                                <label class="f-700 f-primary" for="event-value">{{ translations.form.event_value }}</label>
                                <vue-numeric type="tel" class="form-control" :currency="language == 'en'? '$': 'R$'" :min="0" :separator="language == 'en'? ',': '.'"  :precision="2" v-model="event.value" :placeholder="translations.form.event_value"></vue-numeric>
                            </div>

                        </div>
                        <!-- /Event Informations -->

                        <!-- Categories -->
                        <div class="form-group">
                            <label class="f-700 f-primary">{{ translations.form.categories }}</label>

                            <ul class="list-group list-rounded m-t-10 m-0 text-left">
                                <li
                                    class="list-group-item transparent"
                                    :class="{ 'active': currentCategory === category }"
                                    @click="handleCategory(category)"
                                    v-for="category in categories"
                                >
                                    {{ category[`name_${language}`] }}
                                    <i
                                        :class="{
                                                'icon-select m-l-10 f-20': true,
                                                'ion-ios-circle-filled': currentCategory === category,
                                                'ion-ios-circle-outline': currentCategory !== category
                                            }"
                                    >
                                    </i>
                                </li>
                            </ul>
                        </div>
                        <!-- / Categories -->

                        <!-- Place Informations -->
                        <div class="border-inside-card default">

                            <!-- Google Place Select -->
                            <div class="form-group m-t-15">
                                <label class="f-700 f-primary" for="place-address">{{ translations.form.google_select }}</label>
                                <GmapAutocomplete
                                    :value="event.place.name"
                                    class="form-control"
                                    :select-first-on-enter="true"
                                    @place_changed="setPlaceAdress"
                                    :placeholder="translations.form.google_select"
                                    :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                                >
                                </GmapAutocomplete>

                                <button
                                    type="button"
                                    class="btn btn-sm btn-primary transparent m-t-10"
                                    @click="clearSearchAndPlace()"
                                >
                                    {{ translations.form.clear_search }}
                                </button>
                            </div>


                        </div>

                        <div v-if="interactions.placeSelected" class="border-inside-card default m-t-20">

                            <!-- Name -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-name">{{ translations.form.place_name }}</label>
                                <input
                                    type="text"
                                    id="place-name"
                                    class="form-control"
                                    v-model="event.place.name"
                                    :placeholder="translations.form.place_name"
                                    disabled
                                >
                            </div>
                            <!-- / Name -->

                            <!-- Address -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-address">{{ translations.form.address }}</label>
                                <input
                                    type="text"
                                    id="place-address"
                                    class="form-control"
                                    v-model="event.place.address"
                                    :placeholder="translations.form.address"
                                    disabled
                                >
                            </div>
                            <!-- / Address -->

                            <!-- Phone -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-phone">{{ translations.form.phone }}</label>
                                <input
                                    type="text"
                                    id="place-phone"
                                    class="form-control"
                                    :placeholder="translations.form.phone"
                                    v-model="event.place.phone"
                                    disabled
                                >
                            </div>
                            <!-- / Phone -->

                        </div>
                        <!-- /Place Informations -->


                        <!-- Tags -->
                        <div class="form-group border-inside-card default m-t-20">

                            <!-- TAGS -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-style">{{ translations.form.tags }}</label>
                                <input
                                    type="text"
                                    id="place-style"
                                    class="form-control"
                                    :placeholder="translations.form.tags"
                                    v-model="event.style"
                                >
                            </div>
                            <!-- / TAGS -->

                            <button
                                type="button"
                                class="btn btn-sm btn-primary transparent"
                            >
                                {{ translations.form.add_new_tag }}
                            </button>

                        </div>
                        <!-- / Tags -->


                        <!-- Photos -->
                        <div class="form-group border-inside-card default" v-if="interactions.placeSelected">

                            <label class="f-700 f-primary" for="subcategory">{{ translations.form.subcategories }}</label>

                            <div class="m-t-10">
                                <img :src="event.photo_url" class="img-responsive rounded">
                            </div>

                            <p class="f-300">{{translations.form.photo_cover_warning}}</p>

                        </div>
                        <!-- / Photos -->

                        <div class="form-group m-t-20">

                            <button
                                type="button"
                                class="btn btn-primary btn-block transparent"
                                @click="storeEvent()"
                                :disabled="
                                    !event.name || !event.description || !event.category_id ||
                                    !event.value || !event.google_place_id
                                "
                            >
                                {{ translations.submit }}
                            </button>

                        </div>

                    </form>

                </div>

                <div id="teste" v-show="false"></div>

            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import mainHeader from '@/components/main-header'

    import * as translations from '@/translations/events/create.js'
    import { cleanEventModel } from '@/models/Event'
    import Vue from 'vue'
    import VueNumeric from 'vue-numeric'

    export default {
        name: 'general-events-create',

        components: {
            mainHeader,
            VueNumeric
        },

        data () {
            return {
                interactions: {
                    placeSelected: false,
                },
                event: cleanEventModel(),
                categories: [],

                not_valid: [],
                currentCategory: '',
                subcategories: [],
                subcategory: '',
            }
        },

        computed: {
            ...mapGetters(['checkLanguage', 'language']),

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
            this.getCategories()
        },

        methods: {

            testePlaceId: function(){
                let that = this

                var service = new google.maps.places.PlacesService(document.getElementById('teste'));

                service.getDetails({
                  placeId: that.place.google_place_id
                }, function(place, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {

                        console.log(place);

                  }
                });

            },

            clearSearchAndPlace: function(){
                let that = this

                that.event.place = {};
                that.interactions.placeSelected = false;

            },

            validField(value, inputName) {
                const index = this.not_valid.indexOf(inputName);
                if (!value) {
                    errorNotify('', this.translations.form.required)
                    if (index < 0) {
                        this.not_valid.push(inputName)
                    }
                } else {
                    if(index > -1){
                        this.not_valid.splice(index, 1)
                    }
                }
            },

            setPlaceAdress(place) {
                let that = this

                if (place.geometry !== undefined) {

                    that.interactions.placeSelected = true;
                    that.event.google_place_id = place.place_id;
                    that.event.place.name = place.name;
                    that.event.place.address = place.vicinity;
                    that.event.place.phone = place.formatted_phone_number;

                    console.log(place);

                    that.event.lat = place.geometry.location.lat()
                    that.event.lng = place.geometry.location.lng()

                    that.event.photos = [];

                    that.event.photo_url = place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
                }
            },

            handleCategory(category) {
                this.currentCategory = category

                if(category){
                    this.event.category_id = category.id
                }
            },

            getCategories() {
                let that = this

                that.$http.get(`event/categories/${that.language}`)
                    .then(function (response) {
                        that.categories = response.data.categories
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            storeEvent() {
                let that = this

                that.$http.post('event/store', that.event)
                    .then(function (response) {
                        that.event = cleanEventModel()
                        successNotify('', that.translations.success)
                        that.$router.push({path: '/ranking'})
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

        }
    }
</script>

<style scoped>
    .icon-select {
        color: #FFF;
        float: right
    }

    .subcategories .label { text-transform: uppercase; }

    .img-responsive.rounded {
        border-radius: 20px;
    }
</style>
