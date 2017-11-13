<template>
    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main first-container">

                <div class="container m-t-20">

                    <!-- Select Language -->
                    <div class="card card-rounded">
                        <div class="card-body card-padding text-center">
                            <p class=" f-22 f-400">{{ translations.language.title }}</p>

                            <ul class="list-group m-t-10 m-0 text-left">
                                <li class="list-group-item" @click="toggleLang('en')">
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
                                <li class="list-group-item" @click="toggleLang('pt')">
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

                        </div>
                    </div>
                    <!-- / Select Language -->

                    <button type="button" class="btn btn-primary btn-block" @click="saveSettings()">
                        {{ translations.save }}
                    </button>

                    <!-- Contact Section -->
                    <div class="card m-t-30 card-rounded text-center">
                        <div class="card-body card-padding">

                            <p class=" f-22 f-400">{{ translations.contact.title }}</p>
                            <button class="btn btn-default transparent">{{ translations.contact.help }}</button>

                            <hr>

                            <p class=" f-22 f-400">{{ translations.share.title }}</p>
                            <button class="btn btn-default transparent">{{ translations.share.facebook }}</button>
                            <br>
                            <button class="btn btn-default transparent m-t-10">{{ translations.share.whatsapp }}</button>

                            <hr>

                            <p class=" f-22 f-400">{{ translations.legal.title }}</p>
                            <button class="btn btn-default transparent">{{ translations.legal.terms }}</button>
                            <br>
                            <button class="btn btn-default transparent m-t-10">{{ translations.legal.privacy }}</button>


                        </div>
                    </div>
                    <!-- / Contact Section -->


                    <button type="button" class="btn btn-default btn-block m-t-20">
                        {{ translations.logout }}
                    </button>


                    <!--  -->

                </div>

            </div>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/app-config'

    export default {
        name: 'general-user-settings-app-config',

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

            getUser() {
                this.user = User
            },

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
        }
    }
</script>

<style scoped>

</style>
