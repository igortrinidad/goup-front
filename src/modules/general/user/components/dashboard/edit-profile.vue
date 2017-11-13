<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main container">

                <!-- Photos -->
                <div class="p-relative">
                    <div class="swiper-container swiper-gallery" ref="galleryPhotos">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(photo, index) in user.photos"
                                :style="{ backgroundImage: `url(${ photo.photo_url })` }"
                                :key="index"
                            >
                            </div>
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-scrollbar"></div>
                    </div>
                </div>
                <!-- / Photos -->

                <div class="container m-t-30 text-center">

                    <!-- / Select Language -->
                    <p class=" f-22 f-400">{{ translations.language.title }}</p>

                    <ul class="list-group list-rounded m-t-10 m-0 text-left">
                        <li class="list-group-item transparent" @click="toggleLang('en')">
                            English
                            <i
                                :class="{
                                    'icon-select m-l-10 f-20': true,
                                    'ion-ios-circle-filled': languages.en,
                                    'ion-ios-circle-outline': !languages.en
                                }"
                            >
                            </i>
                        </li>
                        <li class="list-group-item transparent" @click="toggleLang('pt')">
                            Português
                            <i
                                :class="{
                                    'icon-select m-l-10 f-20': true,
                                    'ion-ios-circle-filled': languages.pt,
                                    'ion-ios-circle-outline': !languages.pt
                                }"
                            >
                            </i>
                        </li>
                    </ul>
                    <!-- / Select Language -->

                    <!-- Button Save Settings -->
                    <button type="button" class="btn btn-primary btn-block transparent m-t-30" @click="saveSettings()">
                        {{ translations.save }}
                    </button>
                    <!-- Button Save Settings -->

                    <!-- Button Logout -->
                    <button type="button" class="btn btn-info btn-block transparent m-t-30" @click="saveSettings()">
                        {{ translations.logout }}
                    </button>
                    <!-- Button Logout -->

                    <!-- Button Remove Accout -->
                    <button type="button" class="btn btn-danger btn-block transparent m-t-30" @click="saveSettings()">
                        {{ translations.remove_accout }}
                    </button>
                    <!-- Button Remove Accout -->

                </div>

            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/edit-profile'

    export default {
        name: 'general-user-settings-edit-profile',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {},
                languages: {
                    pt: false,
                    en: false
                }
            }
        },

        computed: {
            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    this.languages.en = true
                    this.languages.pt = false

                    return translations.en
                }
                if (language === 'pt') {
                    this.languages.en = false
                    this.languages.pt = true

                    return translations.pt
                }
            }
        },

        mounted(){
            this.getUser()
        },

        methods: {

            saveSettings() {
                this.setLanguage()
                this.$router.push({
                    name: 'general.user.settings',
                    params: {
                        settings_saved: true
                    }
                })
            },

            toggleLang(lang) {
                if (lang === 'en') {
                    this.languages.en = true
                    this.languages.pt = false
                }

                if (lang === 'pt') {
                    this.languages.en = false
                    this.languages.pt = true
                }
            },

            setLanguage() {
                if (localStorage.getItem('language')) {
                    localStorage.removeItem('language')
                }
                localStorage.setItem('language', this.languages.en ? 'en' : 'pt')
            },

            getUser() {
                this.user = User
                console.log(this.user);
                this.initSwiper()
            },

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar',

                    })
                }, 200);
            }
        }
    }
</script>

<style scoped>
    .swiper-pagination { width: 100%; }

    .icon-select {
        color: #FFF;
        float: right
    }
</style>
