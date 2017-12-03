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
            this.getUser()
        },

        methods: {

            getUser() {
                this.user = User
            },
        }
    }
</script>

<style scoped>

</style>
