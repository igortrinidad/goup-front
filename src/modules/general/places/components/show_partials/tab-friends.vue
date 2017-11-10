<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">
                <h3 class="m-t-0 m-b-30">{{ translations.tabs.friends }}</h3>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/places/show'

    export default {
        name: 'general-places-show-tab-friends',

        components: {
        },

        props: {

        },

        data () {
            return {
                placeholder: true,
                place: {}
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
