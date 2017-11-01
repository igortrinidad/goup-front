<template lang="html">
    <div class="main">
        <div class="container">
            <h1 class="title">{{ translations.title }}</h1>
        </div>
    </div>
</template>

<script>
    import * as translations from '@/translations/login'

    export default {
        name: 'login',

        data() {
            return{
                language: 'es',
                translations: {}
            }
        },

        mounted() {
            this.setCurrentLanguage()
        },

        methods: {
            setCurrentLanguage() {
                if (this.language === 'en') {
                    this.translations = translations.en
                }
                if (this.language === 'pt') {
                    this.translations = translations.pt
                }
                if (this.language === 'es') {
                    this.translations = translations.es
                }
            }
        }
    }
</script>

<style scoped>
</style>
