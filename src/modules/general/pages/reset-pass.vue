<template>

    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div class="main login">
            <div class="first-container text-center">
                <img class="logo" src="../../../assets/logos/LOGOS-02.png" alt="" width="140px;">
            </div>

            <div class="container text-center">

                <div v-if="!interactions.success">
                    <h4 class="f-300 m-b-30">{{ translations.message }}</h4>
                    <div class="form-group">
                        <label class="text-center" for="email">{{ translations.fieldLabel }}</label>
                        <input class="form-control" id="email" v-model="email" placeholder="E-mail">
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary f-300 p-5 p-l-10 p-r-10" @click="generateNewPass()">{{ translations.buttonRecovery }}</button>
                    </div>
                </div>

                <div v-if="interactions.success">
                    <h3 class="f-300 m-b-30">{{ translations.success }}</h3>
                    <div class="container m-t-20">
                        <router-link tag="button" class="btn btn-block btn-primary" to="/login">{{ translations.buttonLogin }}</router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import * as translations from '@/translations/pages/reset-pass'

    export default {
        name: 'landing-reset-password',
        components: {
            mainHeader: require('@/components/main-header.vue')
        },
        data() {
            return {
                interactions:{
                    success: false
                },
                usertype: null,
                email: '',
            }
        },
        computed: {
            'translations': function () {
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
            this.usertype = this.$route.params.usertype
        },
        methods: {
            generateNewPass: function () {
                let that = this

                if (!that.usertype || !that.email) {
                    errorNotify('', 'Informe os dados corretamente.');
                    return false
                }

                that.$http.get(`tools/user/recovery_password/${that.email}`)
                    .then(function (response) {
                        successNotify('', 'Nova senha enviada para o email informado.');
                        that.interactions.success = true

                    })
                    .catch(function (error) {
                        errorNotify('', 'Usuário/Email não localizado.')
                        console.log(error)
                    });

            },
        }
    }
</script>

<style scoped>
    .logo {
        max-width: 150px;
        margin: 0 auto;
        display: block
    }
</style>
