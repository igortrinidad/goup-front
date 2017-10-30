<template>
    <div class="first-container">

        <main-loader></main-loader>
        <main-header
            :type="'center'"
            :title="'Cadastro Profissional'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">
            <div class="col-sm-12">
                <h3 class="text-center" style="max-width: 200px; margin: 0 auto;">
                    <img src="../../../../assets/logos/LOGO-1-01.png" width="100%" class="d-block m-t--10">
                </h3>
            </div>
        </div>

        <div class="container m-t-10">
            <div class="container-form">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="notification notification-default text-center">
                            <p>Cadastre-se como <b>Profissional</b> para cadastrar seu perfil profissional no aplicativo de saúde do seu cliente.</p>
                            <p>Você pode cadastrar utilizando sua conta do Facebook ou informando os dados abaixo.</p>
                        </div>

                        <div class="form-group m-t-20">
                            <button class="btn btn-info btn-block btn-facebook" @click.prevent="facebookLogin()">
                                <i class="fa fa-facebook fa-lg button-icon"></i> Cadastre-se com o Facebook
                            </button>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                            <span class="or-border"></span>
                            <span class="or-text">Ou</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <form class="form" method="post">
            <div class="container-form">
                <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                    <label class="control-label">Primeiro nome</label>
                    <input
                        id="id-signup-name"
                        v-validate="'required'" type="text"
                        class="form-control" data-vv-name="name" data-vv-as="nome"
                        v-model="user.name"
                        placeholder="Primeiro nome"
                    >
                    <small class="f-300" style="color: #fff;">{{ errors.first('name') }}</small>
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('last_name')}">
                    <label class="control-label">Sobrenome</label>
                    <input
                        id="id-signup-lastname"
                        v-validate="'required'" type="text"
                        class="form-control" data-vv-name="last_name" data-vv-as="sobrenome"
                        v-model="user.last_name"
                        placeholder="Sobrenome"
                        @blur="checkSlugBlur()"
                    >
                    <small class="f-300" style="color: #fff;">{{ errors.first('last_name') }}</small>
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                    <label class="control-label">E-mail</label>
                    <input
                        id="id-signup-email"
                        v-validate="'required|email'" type="email"
                        class="form-control" data-vv-name="email" data-vv-as="e-mail"
                        v-model="user.email"
                        placeholder="Email"
                    >
                    <small class="f-300" style="color: #fff;">{{ errors.first('email') }}</small>
                </div>

                <div class="form-group full">
                    <label class="control-label">URL única (nome de usuário)</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="URL única (nome de usuário)"
                        v-model="user.slug" @blur="checkSlug()"
                        :class="{'slug_error' : interactions.slug_error && interactions.slug_checked, 'slug-checked': !interactions.slug_error && interactions.slug_checked}"
                    >
                </div>

                <div
                    :class="{'form-group': true, 'has-error': errors.has('password_confirmation')}">
                    <label class="control-label">Senha</label>
                    <input
                        id="id-signup-password"
                        v-validate="'required'" type="password" class="form-control"
                        data-vv-as="senha" name="password_confirmation"
                        v-model="user.password_confirmation"
                        placeholder="Senha" @blur="checkPassword()"
                    >
                    <small class="f-300" style="color: #fff;">{{ errors.first('password') }}</small>
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                    <label class="control-label">Confirmar senha</label>
                    <input
                        id="id-signup-passwordconfirm"
                        v-validate="'required|confirmed:password_confirmation'" type="password"
                        class="form-control" data-vv-name="password" data-vv-as="confirmar senha"
                        name="password" v-model="user.password"
                        placeholder="Confirme a senha" @blur="checkPassword()"
                    >
                    <small class="f-300" style="color: #fff;">{{ errors.first('password_confirmation') }}</small>
                </div>

                <span class="f-300 notification notification-danger" v-if="interactions.passwordTyped && !interactions.passwordChecked">As senhas não conferem</span>

                <button class="btn btn-light btn-block m-t-30" @click.prevent="signup" :disabled="!user.email || !user.name || !user.last_name || !user.slug || !user.password || !interactions.passwordChecked">Cadastar</button>

            </div>
        </form>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import mainLoader from '@/components/main-loader.vue'
    import mainHeader from '@/components/main-header.vue'
    import {facebookClientId} from '@/config'
    import slug from 'slug'

    export default{
        name: 'auth-signup',
        components: {
            mainLoader,
            mainHeader
        },
        data(){
            return {
                interactions: {
                    slug_error: false,
                    slug_checked: false,
                    passwordTyped: false,
                    passwordChecked: false,
                },
                user: {
                    name: '',
                    last_name: '',
                    email: '',
                    slug: '',
                    password: '',
                    password_confirmation: '',
                },
                settings: {
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        mounted() {

            if(window.cordova){

                openFB.init({appId: facebookClientId, tokenStore: localStorage});
            }
        },
        methods: {
            ...mapActions(['setLoading', 'authSetToken', 'authSetUser']),

            checkPassword: function(){
                let that = this

                if(that.user.password != that.user.password_confirmation){
                    that.interactions.passwordTyped = true;
                    that.interactions.passwordChecked = false;
                } else {
                    that.interactions.passwordTyped = true;
                    that.interactions.passwordChecked = true;
                }

            },

            signup() {
                let that = this
                this.$validator.validateAll().then(() => {
                    // eslint-disable-next-line
                    that.$http.post('auth/signup', that.user)
                        .then(function (response) {

                            if(response.data.status == 422){
                                
                                that.$swal({
                                    title: 'Atenção',
                                    text: `Localizamos um cadastro com o seu email, você gostaria de ir para o login ou alterar seu email de cadastro? Se desejar alterar o email de cadastro, os dados que você possui não serão vinculados.`,
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Alterar email',
                                    cancelButtonText: 'Ir para o login',
                                    cancelButtonColor: '#00A369',
                                    confirmButtonColor: '#E14A45',
                                }).then(function () {
                                    $('#id-signup-email').focus();
                                    $('html, body').stop().animate({ scrollTop: 70 }, 500, 'easeInOutExpo');
                                }).catch(function () {
                                    that.$router.push({path: '/login'})
                                })

                            } else {
                                successNotify('', 'Cadastro realizado com sucesso.')
                                that.$router.push({path: '/login'})
                            }


                        })
                        .catch(function (error) {
                            errorNotify('', 'Houve um erro ao realizar o cadastro.')
                        });
                }).catch(() => {
                    // eslint-disable-next-line
                });
            },

            checkSlugBlur: function(){
                let that = this

                var full_name = this.user.name + ' ' + this.user.last_name;
                this.user.slug = slug(full_name).toLowerCase()
                this.checkSlug();

            },

            checkSlug: function(){
                let that = this

                if(!that.user.slug){
                    return false;
                }

                that.user.slug = slug(that.user.slug).toLowerCase();

                that.$http.get(`check_slug/professional/${that.user.slug}`)
                .then(function (response) {

                    that.interactions.slug_error = response.data.already_exist;
                    that.interactions.slug_checked = true;

                    if(that.interactions.slug_error){
                        that.user.slug += '-'+Math.floor(Math.random() * 99999) + 1;
                    }

                })
                .catch(function (error) {
                });
            },

            /*
             * FACEBOOK Methods
             */
            facebookLogin(){
                let that = this
                that.setLoading({is_loading: true, message: ''})
                if (window.cordova) {
                    openFB.login(
                        function (response) {
                            if (response.status === 'connected') {
                                that.statusChangeCallback(response)
                            } else {
                                that.setLoading({is_loading: true, message: ''})
                                alert('Facebook login failed: ' + response.error);
                                localStorage.clear();
                                if (window.cordova) {
                                    window.cookies.clear();
                                }
                            }
                        }, {scope: 'public_profile,email,publish_actions'});
                }

                if (!window.cordova) {
                    FB.login(function (response) {
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
                if (window.cordova) {
                    openFB.api({
                        path: '/v2.8/me',
                        params: {"access_token": accessToken, "fields": "id,name,first_name,last_name,email"},
                        success: function (response) {

                            response.photo_url = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
                            response.access_token = accessToken;
                            response.role = 'professional';

                            that.socialLogin(response)
                        },
                        error: that.errorHandler
                    })
                }

                if (!window.cordova) {
                    FB.api('/me', {fields: 'name,first_name, last_name, email'}, function (response) {
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
                        console.log(error)
                        errorNotify('Ops!', 'Erro ao efetuar login.')
                        that.setLoading({is_loading: false, message: ''})
                        localStorage.clear();
                        if (window.cordova) {
                            window.cookies.clear();
                        }
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

                return redirect_to ? redirect_to : '/dashboard'
            },

            errorHandler(error) {
                that.setLoading({is_loading: false, message: ''})
                errorNotify('', error.message);
                localStorage.clear();
                if (window.cordova) {
                    window.cookies.clear();
                }
            }
        }
    }
</script>

<style scoped>


</style>
