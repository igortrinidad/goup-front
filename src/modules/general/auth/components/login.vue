<template>
    <div>

        <main-header
            :title="'Login'"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div class="main login first-container">

            <div class="container text-center">
                <img class="logo" src="../../../../assets/logos/LOGOS-02.png" alt="">
            </div>
            <!-- Login -->
            <div class="container m-t-20">
                <div v-if="!interactions.loginWithEmail">
                    <button
                        type="button"
                        class="btn btn-block btn-primary m-t-10"
                        @click="interactions.loginWithEmail = true"
                    >
                        {{ translations.loginEmail }}
                    </button>

                    <button type="button" class="btn btn-block btn-facebook m-t-10" @click.prevent="facebookLogin()">
                        <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                    </button>
                </div>

                <div v-if="interactions.loginWithEmail">
                    <form class="m-t-30 text-center" >
                        <div class="form-group">
                            <input type="email" class="form-control" :placeholder="translations.inputEmail" v-model="login.email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="translations.inputPassword" v-model="login.password" @keyup.enter="makeLogin">
                        </div>

                        <button type="button" class="btn btn-block btn-primary" :disabled="!login.email || !login.password" @click.prevent="makeLogin()">{{ translations.login }}</button>

                        <button type="button" class="btn btn-block btn-facebook m-t-20" @click.prevent="facebookLogin()">
                            <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                        </button>
                    </form>
                </div>
            </div>
            <!-- / Login -->


            <div class="container text-center">
                <div class="m-t-20">
                    <small class="f-300">
                        <router-link
                            :to="{name: 'landing.reset-pass', params: {usertype: 'user'}}"
                            class="btn btn-info btn-xs">
                            {{ translations.forgotPassword }}
                        </router-link>
                    </small>
                </div>

                <div class="m-t-20">
                    <p class="f-13 f-300">{{ translations.signup }}</p>
                    <router-link :to="{name: 'general.auth.signup'}" class="f-primary btn btn-primary">{{ translations.getStart }}</router-link>
                </div>

                <!-- TERMS AND PRIVACY -->
                <span>
                    <p class="f-13 f-300 m-t-20">
                        {{translations.terms.first}}
                        <router-link :to="{name: 'general.terms'}">
                            {{translations.terms.terms_button}}
                        </router-link>
                        {{translations.terms.and}}
                        <router-link :to="{name: 'general.privacy'}">
                            {{translations.terms.privacy_button}}
                        </router-link>
                    </p>
                </span>
                <!-- TERMS AND PRIVACY -->
            </div>

        </div>



    </div>
</template>

<script>
    import * as translations from '@/translations/auth/login'
    import {mapGetters, mapActions} from  'vuex'
    import {facebookClientId} from '@/config'

    export default {
        name: 'login',
        components: {
            mainHeader: require('@/components/main-header.vue')
        },
        data() {
            return{
                interactions: {
                    loginWithEmail: false
                },
               login: {
                   email: '',
                   password: ''
               }
            }
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

        mounted() {
            if (window.cordova) {
                openFB.init({appId: facebookClientId, tokenStore: localStorage});
            }
        },

        methods: {
            ...mapActions(['authSetToken', 'authSetUser', 'setLoading']),

            makeLogin(){
                let that = this
                this.setLoading({ is_loading: true, message: '' })
                that.$http.post('/auth/login', that.login)
                    .then(function (response) {
                        this.setLoading({ is_loading: false, message: '' })
                        that.authSetToken(response.data.token)
                        that.authSetUser(response.data.user)
                        that.$router.push(that.handleRedirect())
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
                this.setLoading({ is_loading: true, message: '' })
                if(window.cordova){
                    openFB.login(
                        function(response) {
                            if(response.status === 'connected') {
                                this.setLoading({ is_loading: false, message: '' })
                                that.statusChangeCallback(response)
                            } else {

                                alert('Facebook login failed: ' + response.error);
                                window.clearAndMaintain();
                                if(window.cordova){
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email'});
                }

                if(!window.cordova){
                    FB.login(function(response) {
                        that.statusChangeCallback(response)
                        this.setLoading({ is_loading: false, message: '' })
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


                        successNotify('', 'Login efetuado com sucesso.')

                        that.$router.push(that.handleRedirect(response.data.user.id))

                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Erro ao efetuar login.')
                        window.clearAndMaintain();
                        if(window.cordova){
                            window.cookies.clear();
                        }
                    });
            },

            errorHandler(error) {

                errorNotify('', error.message);
                window.clearAndMaintain();
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
        background-color: #561F9F;
        background-image: url("https://s3.amazonaws.com/goup-assets/img/pattern-goup-transp.png");
        background-repeat: repeat;
        height: 100vh;
        overflow: scroll;
    }
</style>
