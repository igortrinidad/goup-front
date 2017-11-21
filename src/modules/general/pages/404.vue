<template>
    <div class="first-container">
        <div class="container text-center">
            <h1 class="f-700">404</h1>
            <h1 class="text-muted">{{ translations.notFound }}</h1>
            <h3>{{ translations.message }}</h3>

            <div class="row m-t-20">
                <router-link to="/" class="btn btn-success">{{ translations.button }}</router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import * as translations from '@/translations/pages/404'
    export default{
        name: 'general-404',
        data(){
            return {}
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
        methods: {}
    }
</script>

<style scoped>
    .btn-success, .btn-success:hover{
        color: #fff;
        background-color:  #8e44ad;
        border-color: #8e44ad
    }

    .text-muted{
        color: #CC3A84
    }
</style>
