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

                    <form class="">
                        <!-- Place Name -->
                        <div class="form-group">
                            <label for="place-name">{{ translations.form.place_name }}</label>
                            <input type="text" id="place-name" class="form-control" :placeholder="translations.form.place_name">
                        </div>
                        <!-- /Place Name -->

                        <!-- Categories -->
                        <div class="form-group">
                            <label for="">{{ translations.form.categories }}</label>

                            <ul class="list-group list-rounded m-t-10 m-0 text-left">
                                <li
                                    class="list-group-item transparent"
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

                        <div class="form-group">
                            <label for="">{{ translations.form.style }}</label>
                            <input type="text" class="form-control" :placeholder="translations.form.style">
                        </div>

                        <div class="form-group">
                            <label for="">{{ translations.form.phone }}</label>
                            <input type="text" class="form-control" :placeholder="translations.form.phone">
                        </div>

                        <button type="button" class="btn btn-primary transparent">
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

    export default {
        name: 'general-user-settings-create-place',

        components: {
            mainHeader,
        },

        data () {
            return {
                categories: [],
                currentCategory: ''
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
</style>
