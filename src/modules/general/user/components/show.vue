<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">

                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/show'
    import {mapGetters} from 'vuex'

    export default {
        name: 'general-user-show',

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
            $('.navbar.navbar-default').addClass('transparent')
        },

        beforeDestroy() {
            $('.navbar.navbar-default').removeClass('transparent')
        },

        methods: {

        }
    }
</script>

<style scoped>



</style>
