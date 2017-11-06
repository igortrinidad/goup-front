<template>
    <div class="">

        <main-header
            :title="'settings'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <div class="main">
            <h1 class="text-center">Configurações do aplicativo, como idioma, etc...</h1>
        </div>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/settings'

    export default {
        name: 'general-user-settings-config',

        components: {
            mainHeader,
        },

        data () {
            return {
                language: 'pt',
                interactions: {},
                user: {}
            }
        },

        computed: {
            'translations': function() {
                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getUser()
        },

        methods: {

            getUser() {
                this.user = User
            },
        }
    }
</script>
