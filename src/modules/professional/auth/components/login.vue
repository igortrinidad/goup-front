<template>
    <div class="first-container">
        <main-loader></main-loader>
        <main-header
            :type="'center'"
            :title="'Login Profissional'"
            :cursor="false" :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <section>
            <form class="container" id="loginform" action="index.html">
                <div class="container-form">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <h3 style="max-width: 200px; margin: 0 auto;">
                                <img src="../../../../assets/logos/LOGO-1-01.png" width="100%" class="d-block m-t--10">
                            </h3>

                            <div class="card m-b-0">
                                <div class="card-body card-padding">
                                    <p class="f-300 m-0">Faça o login como Profissional para gerenciar empresas, agenda, perfil profissional ou dashboard de seus clientes.</p>
                                </div>
                            </div>

                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 m-t-30 text-center">
                            <button class="btn btn-facebook btn-block" @click.prevent="facebookLogin()">
                                <i class="fa fa-facebook m-r-10 button-icon"></i> Entrar com o Facebook
                            </button>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                            <span class="or-border"></span>
                            <span class="or-text">Ou</span>
                        </div>
                    </div>
                </div>
            </form>
        </section>

        <section class="form">
            <div class="container-form">
                <form @submit="login" class="m-t-10">
                    <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                        <label class="control-label">E-mail</label>
                        <input
                            id="id-login-email"
                            v-validate="'required'"
                            type="email"
                            class="form-control" data-vv-name="email" data-vv-as="e-mail"
                            v-model="email"
                            placeholder="email"
                        >
                        <small class="f-300" style="color: #fff;">{{ errors.first('email') }}</small>
                    </div>

                    <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                        <label class="control-label">
                            Senha
                        </label>
                        <input
                            id="id-login-password"
                            v-validate="'required'"
                            type="password"
                            class="form-control"
                            data-vv-name="password"
                            data-vv-as="senha"
                            placeholder="senha"
                            v-model="password"
                        >
                        <small class="f-300" style="color: #fff;">{{ errors.first('password') }}</small>

                        <div class="text-right">
                            <router-link
                                class="btn btn-primary-inverse btn-xs f-300 m-t-20"
                                :to="{name: 'landing.reset-pass', params: {usertype: 'professional'}}"
                            >Esqueceu a senha ?</router-link>
                        </div>

                    </div>
                    <div class="form-group text-left">
                        <button class="btn btn-light btn-block m-b-10" @click.prevent="login" :disabled="!email || !password">Acessar</button>
                    </div>

                </form>
            </div>
        </section>

        <div class="container text-center">
            <div class="row">
                <div class="col-sm-12 text-center f-18">
                    <div class="card m-b-0">
                        <div class="card-body card-padding">
                            <span class="f-300">Não possui cadastro? <router-link to="/cadastro">Cadastre-se aqui!</router-link></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-form">
                <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 m-b-10 text-center">
                    <span class="or-border"></span>
                    <span class="or-text">Ou</span>
                </div>

                <div class="text-center">
                    <button class="btn btn-facebook btn-block" @click.prevent="facebookLogin()">
                        <i class="fa fa-facebook m-r-10 button-icon"></i> Cadastre-se com o Facebook
                    </button>
                </div>

            </div>

            <div class="row">
                <div class="col-sm-12 m-t-20 text-center">
                    <div class="card">
                        <div class="card-header ch-alt p-10">
                            <h3 class="f-300 m-0">É cliente ?</h3>
                        </div>
                        <div class="card-body card-padding">
                            <span class="f-300 d-block">Se você deseja conhecer empresas de saúde e controlar sua saúde através do iSaudavel, acesse como <b>Usuário</b>.</span>
                            <router-link tag="button" class="btn btn-primary p-5 p-l-10 p-r-10 f-300 m-t-15" to="/cliente/login">Acessar como Usuário</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import mainLoader from '@/components/main-loader.vue'
    import mainHeader from '@/components/main-header.vue'
    import {facebookClientId} from '@/config'

    export default{
        name: 'auth-login',
        components:{
            mainLoader,
            mainHeader
        },
        data(){
            return {
                email: '',
                password: '',
                rememberMe: false
            }
        },
        computed:{
            ...mapGetters(['currentUser'])
        },
        mounted() {
            if (this.$route.query.new == 'true') {
                this.$swal('Bem-vindo ao iSaudavel', 'Seu cadastro foi realizado com sucesso, os dados para acesso foram enviados para o seu e-mail.', 'success')
            }

            this.checkLastEmailLogin();

            if(window.cordova){

                openFB.init({appId: facebookClientId, tokenStore: localStorage});
            }
        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser', 'setLoading']),

            setLastEmailLogin: function(email){
                localStorage.setItem('last_email', email);
            },

            checkLastEmailLogin: function(){

                var check = localStorage.getItem('last_email')
                if(check){
                    this.email = localStorage.getItem('last_email', check);
                }

            },

            login () {

                let that = this

                that.setLastEmailLogin(that.email);

                that.$validator.validateAll().then(() => {

                    that.$http.post('/auth/login', {email: that.email, password: that.password,})
                        .then(function (response) {

                            if(response.data.user_not_found){
                                warningNotify('', 'Não localizamos seu usuário, verifique seus dados.')
                                return false
                            }

                            that.authSetToken(response.data.access_token) // this is a Vuex action
                            that.authSetUser(response.data.user) // this is a Vuex action

                            that.setLoading({is_loading: false, message: ''})

                            successNotify('', 'Login efetuado com sucesso.')

                            that.$router.push(that.handleRedirect())

                        })
                        .catch(function (error) {
                            errorNotify('Ops!', 'Erro ao efetuar login.')
                            that.setLoading({is_loading: false, message: ''})
                        });

                }).catch(() => {

                });
            },

            /*
             * FACEBOOK Methods
             */
            facebookLogin(){
                let that = this
                that.setLoading({is_loading: true, message: ''})
                if(window.cordova){
                    openFB.login(
                        function(response) {
                            if(response.status === 'connected') {
                                that.statusChangeCallback(response)
                            } else {
                                that.setLoading({is_loading: false, message: ''})
                                alert('Facebook login failed: ' + response.error);
                                localStorage.clear();
                                if(window.cordova){
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email,publish_actions'});
                }

                if(!window.cordova){
                    FB.login(function(response) {
                        that.statusChangeCallback(response)
                    }, {scope: 'public_profile,email,publish_actions'});
                }
            },

            statusChangeCallback(response) {
                let that = this
                if (response.status === 'connected') {
                    that.getUserInfo(response.authResponse.accessToken);
                } else {
                    errorNotify('', 'É necessário fazer login para continuar.')
                }
                that.setLoading({is_loading: false, message: ''})
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
                            response.role = 'professional';

                            that.socialLogin(response)
                        },
                        error: that.errorHandler
                    })
                }

                if(!window.cordova){
                    FB.api('/me', {fields: 'name,first_name, last_name, email' }, function(response) {
                        response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                        response.access_token = accessToken;
                        response.role = 'professional';

                        that.socialLogin(response)
                    });
                }
            },

            socialLogin(response){
                let that = this
                localStorage.setItem('provider', 'facebook')

                that.$http.post('/auth/social', response)
                    .then(function (response) {

                        that.authSetToken(response.data.access_token) // this is a Vuex action
                        that.authSetUser(response.data.user) // this is a Vuex action

                        that.setLoading({is_loading: false, message: ''})

                        successNotify('', 'Login efetuado com sucesso.')

                        that.$router.push(that.handleRedirect())

                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Erro ao efetuar login.')
                        that.setLoading({is_loading: false, message: ''})
                        localStorage.clear();
                        if(window.cordova){
                            window.cookies.clear();
                        }
                    });
            },

            handleRedirect(){
                let that = this
                let redirect_to

                let has_companies = that.currentUser.companies.length ? true : false

                if (that.$route.query.redirect_back) {
                    redirect_to = that.$route.query.redirect_back
                } else {
                    redirect_to = that.$route.query.redirect
                }

                return redirect_to ? redirect_to : has_companies ? '/dashboard/empresas/' : '/profissional/dashboard'
            },

            errorHandler(error) {
                that.setLoading({is_loading: false, message: ''})
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

</style>
