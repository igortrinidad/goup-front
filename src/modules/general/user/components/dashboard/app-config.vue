<template>
    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">

                <div class="container">

                    <!-- Select Language -->
                    <div class="card">
                        <div class="card-body">
                            <legend>{{ translations.language.title }}</legend>

                            <ul class="list-group m-t-10 m-0">
                                <li class="list-group-item" @click="toggleLang('en')">
                                    {{ translations.language.english }}
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
                                    {{ translations.language.portuguese }}
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
                    <div class="card m-t-30">
                        <div class="card-body">
                            <legend>{{ translations.contact.title }}</legend>
                            <ul class="list-group m-t-10 m-0">
                                <li class="list-group-item">
                                    {{ translations.contact.help }}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <!-- / Contact Section -->

                    <!-- Share Section -->
                    <div class="card m-t-30">
                        <div class="card-body">
                            <legend>{{ translations.share.title }}</legend>
                            <ul class="list-group m-t-10 m-0">
                                <li class="list-group-item">
                                    {{ translations.share.facebook }}
                                </li>
                                <li class="list-group-item">
                                    {{ translations.share.whatsapp }}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <!-- / Share Section -->

                    <!-- Legal Section -->
                    <div class="card m-t-30">
                        <div class="card-body">
                            <legend>{{ translations.legal.title }}</legend>
                            <ul class="list-group m-t-10 m-0">
                                <li class="list-group-item">
                                    {{ translations.legal.terms }}
                                </li>
                                <li class="list-group-item">
                                    {{ translations.legal.privacy }}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <!-- / Legal Section -->

                    <button type="button" class="btn btn-default btn-block m-t-20">
                        {{ translations.logout }}
                    </button>

                    <button type="button" class="btn btn-danger btn-block m-t-20">
                        {{ translations.remove_account }}
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
    .icon-select {
        color: #561F9F;
        float: right
    }
</style>
