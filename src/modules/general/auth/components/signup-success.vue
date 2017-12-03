<template>
    <div class="main login">
        <div class="container text-center">
            <img class="logo" src="../../../../assets/logos/LOGOS-02.png" alt="">
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
            ...mapGetters(['language']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
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
        background-color: #561F9F;
        background-image: url("https://s3.amazonaws.com/goup-assets/img/pattern-goup-transp.png");
        background-repeat: repeat;
        height: 100vh;
        overflow: scroll;
    }
</style>
