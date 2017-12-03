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
                            <div class="swiper-slide">
                                <div class="new-image">
                                    <i class="ion-plus-round"></i>
                                    <span>{{ translations.upload_image }}</span>
                                </div>
                            </div>
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

                    <p class=" f-22 f-400">{{ translations.account.title }}</p>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.last_name" v-model="user.last_name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" :placeholder="translations.placeholders.email" v-model="user.email">
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" :placeholder="translations.placeholders.bday" v-model="user.bday"  data-mask="00/00/0000">
                    </div>

                    <!-- / Select Language -->
                    <p class=" f-22 f-400">{{ translations.language.title }}</p>

                    <ul class="list-group list-rounded m-t-10 m-0 text-left m-b-20">
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

                    <!-- Password -->
                    <p class=" f-22 f-400">{{ translations.password.title }}</p>
                    <button type="button" class="btn btn-info btn-block transparent m-t-30" @click="interactions.changePassword = true" v-if="!interactions.changePassword">
                        {{ translations.password.button }}
                    </button>

                    <div v-if="interactions.changePassword">
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="translations.placeholders.password" v-model="user.password">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="translations.placeholders.password_confirmation" v-model="user.password_confirmation">
                        </div>
                        <button type="button" class="btn btn-info btn-block transparent m-t-30" @click="cancelChangePassword()">
                            {{ translations.password.buttonCancel }}
                        </button>
                    </div>
                    <!-- /Password -->

                    <!-- Button Save Settings -->
                    <button type="button" class="btn btn-primary btn-block transparent m-t-30" @click="saveSettings()">
                        {{ translations.save }}
                    </button>
                    <!-- Button Save Settings -->

                </div>

            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/edit-profile'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'general-user-settings-edit-profile',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {
                    changePassword: false,
                },
                user: {},
                languages: {
                    pt: false,
                    en: false
                }
            }
        },

        computed: {
            ...mapGetters(['language']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getUser()
        },

        methods: {
            ...mapActions(['setLanguage', 'authSetUser']),

            saveSettings() {

                let that = this

                that.setLanguage(that.user.language)

                that.$http.post('user/update', that.user)
                    .then(function (response) {
                        that.authSetUser(response.data.user)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            toggleLang(lang) {  console.log(lang)
                if (lang === 'en') {
                    this.languages.en = true
                    this.languages.pt = false
                }

                if (lang === 'pt') {
                    this.languages.en = false
                    this.languages.pt = true
                }

                this.user.language = lang
            },


            getUser(){
                let that = this

                that.$http.get('user/profile')
                    .then(function (response) {
                        that.user = response.data.user
                        that.initSwiper()
                        that.setLanguage(that.user.language)

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
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
            },

            cancelChangePassword(){
                this.user.password = ''
                this.user.password_confirmation = ''
                this.interactions.changePassword = false
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

    /* New Image */
    .new-image {
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        width: 100%; height: 100%;
        justify-content: center;
        text-align: center;
        padding-top: 80px;
        border-bottom: 2px solid #FF4B89
    }

    .new-image i {
        font-size: 24px;
        display: inline-flex;
        width: 40px; height: 40px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 2px solid #FF4B89;
    }
    .new-image span {
        display: block;
        width: 100%;
        font-weight: 700;
        margin-top: 20px;
    }

</style>
