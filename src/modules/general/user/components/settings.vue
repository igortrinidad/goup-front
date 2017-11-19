<template>
    <div class="first-container">

        <main-header
            :title="'settings'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">

                <div class="container bg m-t-20">

                    <router-link
                        tag="div"
                        class="picture-circle picture-circle-xxl border-picture-eletric-blue"
                        :to="{ name: 'general.user.settings.edit' }"
                        :style="{ backgroundImage: `url(${ user.avatar })` }"
                    >
                    </router-link>
                    <h4 class="f-300 text-center m-t-20">{{ user.full_name }}</h4>

                    <div class="row m-t-30 text-center">
                        <div class="col-xs-12 m-t-10">
                            <router-link :to="{ name: 'general.user.settings.edit' }" tag="button" class="btn btn-primary btn-block transparent">
                                <i class="ion-edit m-r-5"></i> {{ translations.buttons.edit }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.places.create' }" tag="button" class="btn btn-primary btn-block transparent">
                                <i class="ion-plus-round m-r-5"></i> {{ translations.buttons.add_new_place }}
                            </router-link>
                        </div>

                        <div class="col-xs-12 m-t-20">
                            <router-link :to="{ name: 'general.user.settings.about' }" tag="button" class="btn btn-primary btn-block transparent">
                                <i class="ion-help-circled m-r-5"></i> {{ translations.buttons.about }}
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- <div class="container m-t-15">
                    <div class="card card-rounded">
                        <div class="card-body">
                            <h1>Teste de lugares</h1>
                            <h1>Teste de lugares</h1>
                            <h1>Teste de lugares</h1>
                            <h1>Teste de lugares</h1>
                        </div>
                    </div>
                </div> -->

            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/settings'

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
            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getUser()
            if (this.$route.params.settings_saved) {
                successNotify('', this.translations.save_success)
            }
        },

        methods: {

            getUser() {
                this.user = User
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

 </style>
