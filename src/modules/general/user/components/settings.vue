<template>
    <div class="first-container">

        <main-header
            :title="'settings'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">


                <div class="text-right flags m-r-10">
                    <img
                        class="m-r-5 country-flag"
                        src="../../../../assets/img/brazil.png"
                        width="32px"
                        @click="bounceLanguage($event, 'pt')"
                        :class="{ 'country-selected' : language ===  'pt' }"
                    >
                    <img
                        class="m-r-5 country-flag"
                        src="../../../../assets/img/united-kingdom.png"
                        width="32px"
                        @click="bounceLanguage($event, 'en')"
                        :class="{ 'country-selected' : language ===  'en' }"
                    >
                </div>
                <!-- / Select Language -->

                <div class="container bg m-t-0">

                    <router-link
                        tag="div"
                        class="picture-circle picture-circle-xxl border-picture-eletric-blue"
                        :style="{ backgroundImage: `url(${ currentUser.avatar })` }"
                        :to="{ name: 'general.user.show', params: { user_slug: currentUser.slug } }"
                    >
                    </router-link>

                    <h4 class="f-300 text-center m-t-20">{{ currentUser.full_name }}</h4>

                    <div class="row m-t-30 text-center">
                        <div class="col-xs-12 m-t-10">
                            <router-link :to="{ name: 'general.user.settings.edit' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-edit m-r-5"></i> {{ translations.buttons.edit }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.events.create' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-plus-round m-r-5"></i> {{ translations.buttons.add_new_event }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.user.events' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-ios-list-outline m-r-5"></i> {{ translations.buttons.my_events }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.user.favorites' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-android-star-outline m-r-5"></i> {{ translations.buttons.my_favorites }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.user.settings.about' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-help-circled m-r-5"></i> {{ translations.buttons.about }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.auth.logout' }" tag="button" class="btn btn-primary btn-block">
                                <i class="ion-log-out rotate-180 m-r-5"></i> {{ translations.buttons.logout }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/settings'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'general-user-settings',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {}
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'language']),

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
            ...mapActions(['setLanguage']),

            bounceLanguage: function(event, language){

                setTimeout(function() {
                    $(event.target).addClass('bounce');
                }, 100);

                setTimeout(function() {
                    $(event.target).removeClass('bounce');
                }, 300);

                this.setLanguage(language);
                
                
            },
        }
    }
</script>

<style>

    .border-picture-eletric-blue{
        border: 2px solid #8BF3FB;
    }

    .container.bg{
        padding-bottom: 30px;
        border-radius: 0 0 20px 20px;
    }
    .rotate-180 {
        display: inline-block;
        transform: rotate(180deg);
    }


 </style>
