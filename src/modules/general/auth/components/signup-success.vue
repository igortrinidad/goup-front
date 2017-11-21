<template>
    <div class="main login">
        <div class="container text-center">
            <img class="logo" src="../../../../assets/logos/LOGOS-05.png" alt="">
            <h2 class="f-300 m-b-30">{{ translations.title }}</h2>
            <h3 class="f-300 m-b-30">{{ translations.message }}</h3>
        </div>
        <div class="container m-t-20">
            <router-link tag="button" class="btn btn-block btn-primary" to="/">{{ translations.button }}</router-link>
        </div>
    </div>
</template>

<script>
    import * as translations from '@/translations/auth/signup-success'

    export default {
        name: 'signup-success',
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
        }
    }
</script>

<style scoped>
    .logo {
        max-width: 150px;
        margin: 0 auto;
        display: block
    }

    .tour-title {
        height: 65px;
    }

    .main.login {
        background: #561F9F;
        height: 100vh;
        overflow: scroll;
    }
</style>
