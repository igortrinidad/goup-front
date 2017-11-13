<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
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

    import * as translations from '@/translations/user/components/create-place'

    export default {
        name: 'general-user-settings-create-place',

        components: {
            mainHeader,
        },

        data () {
            return {
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
        },

        methods: {
        }
    }
</script>

<style scoped>

</style>
