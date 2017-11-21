<template>
    <div class="main login">
        <div class="container text-center">
            <img class="logo" src="../../../../assets/logos/LOGOS-05.png" alt="">
            <h2 class="f-300 m-b-30">{{ translations.title }}</h2>
        </div>

        <!-- Signup -->
        <div class="container">
            <div v-if="!interactions.signupWithEmail">
                <button
                    type="button"
                    class="btn btn-block btn-primary m-t-10"
                    @click="interactions.signupWithEmail = true"
                >
                    {{ translations.loginEmail }}
                </button>

                <button type="button" class="btn btn-block btn-facebook m-t-10" @click.prevent="facebookLogin()">
                    <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                </button>
            </div>

            <div v-if="interactions.signupWithEmail">
                <form class="m-t-30 text-center" >
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.placeholders.last_name" v-model="user.last_name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" :placeholder="translations.placeholders.email" v-model="user.email" id="signup-email">
                    </div>
                    <div class="form-group">
                        <input type="tex" class="form-control" :placeholder="translations.placeholders.bday" v-model="user.bday"  data-mask="00/00/0000">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" :placeholder="translations.placeholders.password" v-model="user.password" @keyup.enter="makeLogin">
                    </div>

                    <button type="button" class="btn btn-block btn-primary" :disabled="validateForm()" @click.prevent="signup()">{{ translations.signup }}</button>

                    <button type="button" class="btn btn-block btn-facebook m-t-10" @click.prevent="facebookLogin()">
                        <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                    </button>
                </form>
            </div>
        </div>
        <!-- / Signup -->

        <!-- Terms And Privacy -->
        <div class="container text-center">
            <div class="m-t-30">
                <small class="f-300">
                    {{ translations.alreadySigned }}
                    <router-link :to="{name: 'general.auth.login'}" class="f-primary">{{ translations.loginHere }}</router-link>

                </small>
            </div>

            <div class="m-t-10">
                <small class="f-300">
                    {{ translations.acceptTerms }}
                    <a href="#" class="f-primary">{{ translations.terms }}</a>
                    &
                    <a href="#" class="f-primary">{{ translations.privacy }}</a>
                </small>
            </div>
        </div>
        <!-- / Terms And Privacy -->

    </div>
</template>

<script>
    import * as translations from '@/translations/auth/signup'
    import {mapActions} from  'vuex'
    import {facebookClientId} from '@/config'

    export default {
        name: 'signup',

        data() {
            return{
                interactions: {
                    signupWithEmail: false
                },
               user: {
                   name: '',
                   last_name: '',
                   bday: '',
                   email: '',
                   password: ''
               }
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

        mounted() {
            if (window.cordova) {
                openFB.init({appId: facebookClientId, tokenStore: localStorage});
            }
        },

        methods: {
            ...mapActions(['authSetToken', 'authSetUser']),

            validateForm(){
                return !this.user.name || !this.user.last_name || !this.user.email || !this.user.password
            },


            signup(){
                let that = this

                that.$http.post('/auth/signup', that.user)
                    .then(function (response) {
                        if(response.data.status == 422){

                            that.$swal({
                                title: 'Atenção',
                                text: that.translations.validations.email.message,
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonText: that.translations.validations.email.buttons.changeEmail,
                                cancelButtonText: that.translations.validations.email.buttons.toLogin,
                                cancelButtonColor: '#561F9F',
                                confirmButtonColor: '#48C3D1',
                            }).then(function () {
                                $('#signup-email').focus();
                                $('html, body').stop().animate({ scrollTop: 70 }, 500, 'easeInOutExpo');
                            }).catch(function () {
                                that.$router.push({path: '/login'})
                            })

                        } else {
                            successNotify('', 'Cadastro realizado com sucesso.')
                            that.$router.push({name: 'general.auth.signup.success'})
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleRedirect(){
                let that = this
                let redirect_to

                if (that.$route.query.redirect_back) {
                    redirect_to = that.$route.query.redirect_back
                } else {
                    redirect_to = that.$route.query.redirect
                }

                return redirect_to ? redirect_to : '/';
            },

            /*
             * FACEBOOK Methods
             */
            facebookLogin(){
                let that = this

                if(window.cordova){
                    openFB.login(
                        function(response) {
                            if(response.status === 'connected') {
                                that.statusChangeCallback(response)
                            } else {

                                alert('Facebook login failed: ' + response.error);
                                localStorage.clear();
                                if(window.cordova){
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email'});
                }

                if(!window.cordova){
                    FB.login(function(response) {
                        that.statusChangeCallback(response)
                    }, {scope: 'public_profile,email'});
                }
            },

            statusChangeCallback(response) {
                let that = this

                if (response.status === 'connected') {
                    that.getUserInfo(response.authResponse.accessToken);
                } else {
                    errorNotify('', 'É necessário fazer login para continuar.')

                }
            },

            getUserInfo(accessToken) {
                let that = this
                if(window.cordova){
                    openFB.api({
                        path: '/v2.8/me',
                        params: { "access_token": accessToken, "fields":"id,name,first_name,last_name,email" },
                        success: function(response) {

                            response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                            response.access_token = accessToken;
                            response.role = 'user';

                            that.socialLogin(response)
                        },
                        error: that.errorHandler
                    })
                }

                if(!window.cordova){
                    FB.api('/me', {fields: 'name,first_name, last_name, email' }, function(response) {
                        response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                        response.access_token = accessToken;
                        response.role = 'user';

                        that.socialLogin(response)
                    });
                }
            },

            socialLogin(response){
                let that = this
                localStorage.setItem('provider', 'facebook')

                that.$http.post('/auth/social_login', response)
                    .then(function (response) {

                        that.authSetToken(response.data.access_token) // this is a Vuex action
                        that.authSetUser(response.data.user) // this is a Vuex action


                        successNotify('', 'Cadastro efetuado com sucesso.')

                        that.$router.push({name: 'general.auth.signup.success'})

                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Erro ao efetuar login.')
                        localStorage.clear();
                        if(window.cordova){
                            window.cookies.clear();
                        }
                    });
            },

            errorHandler(error) {

                errorNotify('', error.message);
                localStorage.clear();
                if(window.cordova){
                    window.cookies.clear();
                }
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

    .tour-title {
        height: 65px;
    }

    .main.login {
        background: #561F9F;
        height: 100vh;
        overflow: scroll;
    }
</style>
