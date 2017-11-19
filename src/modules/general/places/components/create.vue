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
                        <!-- Place Informations -->
                        <div class="border-inside-card default">

                            <!-- Google Place Select -->
                            <div class="form-group m-t-15">
                                <label class="f-700 f-primary" for="place-address">{{ translations.form.google_select }}</label>
                                <GmapAutocomplete
                                    :value="place.name"
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
                                <label class="f-700 f-primary" for="place-name">{{ translations.form.name }}</label>
                                <input
                                    type="text"
                                    id="place-name"
                                    class="form-control"
                                    v-model="place.name"
                                    :placeholder="translations.form.name"
                                    disabled
                                >
                            </div>
                            <!-- / Name -->

                            <p>{{place.google_id}}</p>

                            <!-- Address -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-name">{{ translations.form.address }}</label>
                                <input
                                    type="text"
                                    id="place-name"
                                    class="form-control"
                                    v-model="place.address"
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
                                    v-model="place.phone"
                                    disabled
                                >
                            </div>
                            <!-- / Phone -->
                            
                        </div>
                        <!-- /Place Informations -->

                        <!-- Categories & SubCategories & Days -->
                        <div class="form-group border-inside-card default m-t-20" v-if="interactions.placeSelected">

                            <!--
                            <div class="form-group">
                                <label class="f-700 f-primary">{{ translations.form.best_day_type }}</label>

                                <ul class="list-group list-rounded m-t-10 m-0 text-left">
                                    <li class="list-group-item transparent"
                                        :class="{ 'active': place.best_day_is_weekly }"
                                        @click="place.best_day_is_weekly = true"
                                    >
                                        {{ translations.form.best_day_type_list.true }}
                                        <i class="icon-select m-l-10 f-20"
                                            :class="{
                                                'ion-ios-circle-filled': place.best_day_is_weekly,
                                                'ion-ios-circle-outline': !place.best_day_is_weekly
                                            }"
                                        >
                                        </i>
                                    </li>
                                    <li class="list-group-item transparent"
                                        :class="{ 'active': !place.best_day_is_weekly }"
                                        @click="place.best_day_is_weekly = false"
                                    >
                                        {{ translations.form.best_day_type_list.false }}
                                        <i class="icon-select m-l-10 f-20"
                                            :class="{
                                                'ion-ios-circle-filled': !place.best_day_is_weekly,
                                                'ion-ios-circle-outline': place.best_day_is_weekly
                                            }"
                                        >
                                        </i>
                                    </li>
                                </ul>
                            </div>

                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-bestday">{{ translations.form.best_day }}</label>
                                <input
                                    type="text"
                                    id="place-bestday"
                                    class="form-control"
                                    :placeholder="translations.form.best_day"
                                    v-model="place.best_day"
                                    disabled
                                >
                            </div>

                            -->

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
                                        {{ category }}
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

                            <!-- TAGS -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="place-style">{{ translations.form.tags }}</label>
                                <input
                                    type="text"
                                    id="place-style"
                                    class="form-control"
                                    :placeholder="translations.form.tags"
                                    v-model="place.style"
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
                        <!-- / Categories & SubCategories  -->

                        <!-- Photos -->
                        <div class="form-group border-inside-card default" v-if="interactions.placeSelected">

                            <label class="f-700 f-primary" for="subcategory">{{ translations.form.subcategories }}</label>

                            <div class="m-t-10">
                                <img :src="place.photo_url" class="img-responsive rounded">
                            </div>

                            <p class="f-300">{{translations.form.photo_cover_warning}}</p>

                        </div>
                        <!-- / Photos -->

                        <div class="form-group m-t-20">

                            <button
                                type="button"
                                class="btn btn-primary btn-block transparent"
                                @click="registerPlace()"
                                :disabled="
                                    !place.name || !place.description || !place.style ||
                                    !place.phone || !place.best_day
                                "
                            >
                                {{ translations.submit }}
                            </button>

                        </div>

                        <div class="form-group m-t-20">

                            <input class="form-control" v-model="place.google_placeId" placeholder="Google place id">
                            <button
                                type="button"
                                class="btn btn-primary btn-block transparent"
                                @click="testePlaceId()"
                            >
                                Teste busca local pelo id
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

    import * as translations from '@/translations/places/create.js'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import { cleanPlaceModel } from '@/models/Place'

    export default {
        name: 'general-user-settings-create-place',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {
                    placeSelected: false,
                },
                place: cleanPlaceModel(),
                categories: [],

                not_valid: [],
                currentCategory: '',
                subcategories: [],
                subcategory: '',
            }
        },

        computed: {
            ...mapGetters(['checkLanguage']),

            'translations': function() {
                if (this.checkLanguage === 'en') {
                    return translations.en
                }
                if (this.checkLanguage === 'pt') {
                    return translations.pt
                }
            },
        },

        mounted(){
            this.getCategories()
        },

        methods: {

            testePlaceId: function(){
                let that = this
                
                var service = new google.maps.places.PlacesService(document.getElementById('teste'));

                service.getDetails({
                  placeId: that.place.google_placeId
                }, function(place, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                        
                        console.log(place);

                  }
                });
                
            },

            clearSearchAndPlace: function(){
                let that = this
            
                that.place = cleanPlaceModel();
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
                    that.place.google_placeId = place.place_id;
                    that.place.name = place.name;
                    that.place.address = place.vicinity;
                    that.place.phone = place.formatted_phone_number;

                    console.log(place);

                    that.place.lat = place.geometry.location.lat()
                    that.place.lng = place.geometry.location.lng()

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.place.state = current.short_name
                            }
                            //City
                            if(type == 'administrative_area_level_2'){
                                that.place.city = current.short_name
                            }
                            //Country
                            if(type == 'country'){
                                that.place.country = current.short_name
                            }
                        })
                    })

                    that.place.photos = [];

                    that.place.photo_url = place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
                }
            },

            registerPlace() {
                let currentCategoryNames = {}

                const categories = cleanCategoriesArrayExample()

                categories.forEach((category) => {
                    if (this.currentCategory === category.name_en || this.currentCategory === category.name_pt) {
                        currentCategoryNames = {
                            name_en: category.name_en,
                            name_pt: category.name_pt
                        }
                    }
                })

                this.place.category.name_en = currentCategoryNames.name_en
                this.place.category.name_pt = currentCategoryNames.name_pt
                this.place.category.subcategories = this.subcategories

                // submit this.place
                console.log(this.place);

            },


            removeSubcategory(index) {
                this.subcategories.splice(index, 1)
            },

            pushSubcategory() {
                const index = this.subcategories.indexOf(this.subcategory.toLowerCase());

                if(index > -1){
                    warningNotify('', 'Subcategoria ja existe no array')
                } else {
                    this.subcategories.push(this.subcategory.toLowerCase())
                    this.subcategory = ''
                }

            },

            handleCategory(category) {
                this.currentCategory = category
            },

            getCategories() {
                let that = this
                const categories = cleanCategoriesArrayExample()

                categories.forEach((category) => {
                    if (that.checkLanguage === 'en') {
                        that.categories.push(category.name_en)
                    }
                    if (that.checkLanguage === 'pt') {
                        that.categories.push(category.name_pt)
                    }
                })
            }
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
