<template lang="html">
    <div class="main">
        <div class="container">

            <img class="logo" src="../../../../assets/logos/LOGOS-05.png" alt="">

            <form class="m-t-30 text-center">
                <div class="form-group">
                    <input type="text" class="form-control" :placeholder="translations.inputEmail">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" :placeholder="translations.inputPassword">
                </div>
                <button type="button" class="btn btn-primary">{{ translations.login }}</button>

                <span class="or">{{ translations.orText }}</span>

                <button type="button" class="btn btn-facebook">
                    <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import * as translations from '@/translations/login'

    export default {
        name: 'login',

        data() {
            return{
                language: 'en',
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
    .logo {
        max-width: 150px;
        margin: 0 auto;
        display: block
    }

    .or {
        margin: 10px 0;
        display: block;
        color: #fff;
        text-align: center;
    }
</style>
