<template>
    <div class="">

        <main-header
            :title="'settings'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition  class="main m-t-30" appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container">
                    <div class="picture-circle picture-circle-xxl" :style="{ backgroundImage: `url(${ user.avatar })` }"></div>
                    <h4 class="f-700 text-center">{{ user.name }}</h4>

                    <div class="row m-t-30 text-center">
                        <div class="col-xs-6">
                            <router-link :to="{ name: 'general.user.settings.configs' }" tag="button" class="btn btn-primary">
                                <i class="ion-ios-gear m-r-5"></i> {{ translations.buttons.config }}
                            </router-link>
                        </div>
                        <div class="col-xs-6">
                            <router-link :to="{ name: 'general.user.settings.edit' }" tag="button" class="btn btn-primary">
                                <i class="ion-edit m-r-5"></i> {{ translations.buttons.edit }}
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
    import * as translations from '@/translations/settings'

    export default {
        name: 'general-user-settings',

        components: {
            mainHeader,
        },

        data () {
            return {
                language: 'pt',
                interactions: {},
                user: {}
            }
        },

        computed: {
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

            getUser() {
                this.user = User
            },
        }
    }
</script>
