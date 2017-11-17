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
                        <!-- Place Name -->
                        <div class="form-group border-inside-card default">
                            <label class="f-700 f-primary" for="place-name">{{ translations.form.name }}</label>
                            <input
                                type="text"
                                id="place-name"
                                class="form-control"
                                v-model="place.name"
                                :placeholder="translations.form.name"
                            >
                            <label class="f-700 f-primary m-t-10" for="place-description">{{ translations.form.description }}</label>
                            <input
                                type="text"
                                id="place-description"
                                class="form-control"
                                v-model="place.description"
                                :placeholder="translations.form.description"
                            >
                        </div>
                        <!-- /Place Name -->

                        <!-- Categories & SubCategories -->
                        <div class="form-group border-inside-card default">
                            <!-- Categories -->
                            <div class="form-group">
                                <label class="f-700 f-primary" for="">{{ translations.form.categories }}</label>

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

                            <!-- SubCategories -->
                            <div class="form-group m-t-10" v-show="currentCategory">
                                <label class="f-700 f-primary" for="subcategory">{{ translations.form.subcategories }}</label>
                                <input
                                    id="subcategory"
                                    type="text"
                                    class="form-control"
                                    v-model="subcategory"
                                    :placeholder="translations.form.subcategories"
                                >
                                <button
                                    type="button"
                                    class="btn btn-primary transparent m-t-10"
                                    :disabled="!subcategory"
                                    @click="pushSubcategory()"
                                >
                                    {{ translations.form.add_subcategory }}
                                </button>

                                <!-- List SubCategory -->
                                <div class="m-t-10 subcategories">
                                    <span class="label label-primary transparent m-5" v-for="(subcategory, index) in subcategories">
                                        {{ subcategory }}
                                        <i class="ion-close-round m-l-5" @click="removeSubcategory(index)"></i>
                                    </span>
                                </div>
                                <!-- / List SubCategory -->

                            </div>
                            <!-- /SubCategories -->
                        </div>
                        <!-- / Categories & SubCategories  -->

                        <!-- Style And Phone -->
                        <div class="form-group border-inside-card default">
                            <label class="f-700 f-primary" for="place-style">{{ translations.form.style }}</label>
                            <input
                                type="text"
                                id="place-style"
                                class="form-control"
                                :placeholder="translations.form.style"
                                v-model="place.style"
                            >

                            <label class="f-700 f-primary m-t-10" for="place-phone">{{ translations.form.phone }}</label>
                            <input
                                type="text"
                                id="place-phone"
                                class="form-control"
                                :placeholder="translations.form.phone"
                                v-model="place.phone"
                            >
                        </div>
                        <!-- / Style And Phone -->

                        <!-- Address -->
                        <div class="form-group border-inside-card default">
                            <label class="f-700 f-primary" for="place-address">{{ translations.form.address }}</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setPlaceAdress"
                                :placeholder="translations.form.address"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                            >
                            </GmapAutocomplete>
                        </div>
                        <!-- / Address -->

                        <!-- Photos -->
                        <div class="form-group border-inside-card default">
                            <button type="button" class="btn btn-primary transparent">
                                {{ translations.form.photos }}
                            </button>

                            <div class="m-t-10" v-for="photo in place.photos">
                                <img :src="photo.photo_url" class="img-responsive rounded">
                            </div>

                        </div>
                        <!-- / Photos -->

                        <!-- Current User Is Owner -->
                        <div class="form-group border-inside-card default">
                            <label class="f-700 f-primary" @click="place.is_owner = !place.is_owner">
                                {{ translations.form.is_owner }}
                            </label>

                            <ul class="list-group list-rounded m-t-10 m-0 text-left">
                                <li
                                    class="list-group-item transparent"
                                    :class="{ 'active': place.is_owner }"
                                    @click="place.is_owner = true"
                                >
                                    {{ translations.yes }}
                                    <i
                                        :class="{
                                            'icon-select m-l-10 f-20': true,
                                            'ion-ios-circle-filled': place.is_owner,
                                            'ion-ios-circle-outline': !place.is_owner
                                        }"
                                    >
                                    </i>
                                </li>
                                <li
                                    class="list-group-item transparent"
                                    :class="{ 'active': !place.is_owner }"
                                    @click="place.is_owner = false"
                                >
                                    {{ translations.no }}
                                    <i
                                        :class="{
                                            'icon-select m-l-10 f-20': true,
                                            'ion-ios-circle-filled': !place.is_owner,
                                            'ion-ios-circle-outline': place.is_owner
                                        }"
                                    >
                                    </i>
                                </li>
                            </ul>
                        </div>
                        <!-- / Current User Is Owner -->

                        <button type="button" class="btn btn-primary transparent" @click="registerPlace()">
                            {{ translations.submit }}
                        </button>

                    </form>

                </div>

            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import mainHeader from '@/components/main-header'

    import * as translations from '@/translations/user/components/create-place'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import { cleanPlaceModel } from '@/models/Place'

    export default {
        name: 'general-user-settings-create-place',

        components: {
            mainHeader,
        },

        data () {
            return {
                place: cleanPlaceModel(),
                categories: [],
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

            setPlaceAdress(place) {
                let that = this
                if (place.geometry !== undefined) {
                    that.place.lat = place.geometry.location.lat()
                    that.place.lng = place.geometry.location.lng()
                    that.place.address = {
                        full_address: place.formatted_address,
                        name: place.name,
                        url: place.url
                    }
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
                        })
                    })
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
