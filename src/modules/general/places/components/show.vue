<template>
    <div class="first-container">

        <main-header
            :title="translations.back"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">
                <div class="container">
                    <h1>Show</h1>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import * as translations from '@/translations/places/show'

    export default {
        name: 'general-places-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
            }
        },

        computed: {
            ...mapGetters(['checkLanguage']),

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

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>
