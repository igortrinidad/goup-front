<template>
    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main first-container">

                <div class="container">

                    <!-- Contact Section -->
                    <div class="card m-t-30 card-rounded text-center">
                        <div class="card-body card-padding">

                            <p class=" f-22 f-400">{{ translations.share.title }}</p>
                            <p class=" f-12 f-400">{{ translations.share.subtitle }}</p>
                            <button class="btn btn-dark" @click="openShareFacebook()">{{ translations.share.facebook }}</button>
                            <br>
                            <button class="btn btn-dark m-t-10" @click="openShareWhatsapp()">{{ translations.share.whatsapp }}</button>

                            <hr>

                            <p class=" f-22 f-400">{{ translations.legal.title }}</p>
                            <router-link tag="button" :to="{name: 'general.terms'}" class="btn btn-dark">{{ translations.legal.terms }}</router-link>
                            <br>
                            <router-link tag="button" :to="{name: 'general.privacy'}" class="btn btn-dark m-t-10">{{ translations.legal.privacy }}</router-link>

                            <router-link tag="label" class="btn-block text-white" :to="{name: 'secret.categories'}">---</router-link>

                        </div>
                    </div>
                    <!-- / Contact Section -->

                </div>

            </div>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/about'
    import {mapGetters} from 'vuex'

    export default {
        name: 'general-user-settings-about',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {},
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
        },

        methods: {

            // Facebook share
            openShareFacebook() {
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=151705885358217&href=https://goup.today&display=popup&mobile_iframe=true`;

                    if(window.cordova){
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            var url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Compartilhado com sucesso!')
                            }
                        });
                    } else {

                        window.open(url, '_blank', 'location=yes');
                    }
            },

            // Whatsapp share
            openShareWhatsapp() {

                var url = `https://api.whatsapp.com/send?text=${this.translations.share.share_message}`

                window.open(url, '_system', null);
            },
        }
    }
</script>

<style scoped>
    .text-white {
        color: white;
    }
</style>
