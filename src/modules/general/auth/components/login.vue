<template lang="html">
    <div class="main">
        <div class="container">
            <img class="logo" src="../../../../assets/logos/LOGOS-05.png" alt="">

            <div v-if="!interactions.loginWithEmail">
                <button
                    type="button"
                    class="btn btn-block btn-primary m-t-10"
                    @click="interactions.loginWithEmail = true"
                >
                    {{ translations.loginEmail }}
                </button>

                <button type="button" class="btn btn-block btn-facebook m-t-10">
                    <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                </button>
            </div>

            <div v-if="interactions.loginWithEmail">
                <form class="m-t-30 text-center" >
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.inputEmail">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.inputPassword">
                    </div>

                    <button type="button" class="btn btn-block btn-primary">{{ translations.login }}</button>

                    <button type="button" class="btn btn-block btn-facebook m-t-10">
                        <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                    </button>
                </form>
            </div>

            <div class="m-t-30">
                <small class="f-300">
                    {{ translations.acceptTerms }}
                    <a href="#" class="f-primary">{{ translations.terms }}</a>
                    &
                    <a href="#" class="f-primary">{{ translations.privacy }}</a>
                </small>
            </div>

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
                translations: {},
                interactions: {
                    loginWithEmail: false
                }
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
