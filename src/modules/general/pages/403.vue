<template>
    <div class="first-container">
        <div class="container text-center">
            <h1 class="f-700">403</h1>
            <h1 class="text-muted">{{ translations.forbidden }}</h1>
            <h3>{{ translations.message }}</h3>

            <div class="row m-t-20">
                <router-link to="/" class="btn btn-success">{{ translations.button }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import * as translations from '@/translations/pages/403'
    import {mapGetters} from 'vuex'
    
    export default{
        name: 'general-403',
        data(){
            return {}
        },
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
