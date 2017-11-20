<template lang="html">
    <div class="main login">
        <!-- <div class="container">
            <img class="logo" src="../../../../assets/logos/LOGOS-05.png" alt="">
        </div> -->

        <!-- Tour -->
        <div class="container">
            <div class="swiper-container text-center" ref="swiperTour">
                <div class="swiper-wrapper m-b-10">
                    <div class="swiper-slide">
                        <h4 class="tour-title">{{ translations.tourTitle }}</h4>
                        <div class="card">
                            <div class="card-header cover" style="background: url('https://serranatural.com/landing/img/produtos/decor1.jpg')"></div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <h4 class="tour-title">{{ translations.likeLocal }}</h4>
                        <div class="card">
                            <div class="card-header cover" style="background: url('https://serranatural.com/landing/img/produtos/decor1.jpg')"></div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <h4 class="tour-title">{{ translations.unlikeLocal }}</h4>
                        <div class="card">
                            <div class="card-header cover" style="background: url('https://serranatural.com/landing/img/produtos/decor1.jpg')"></div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <h4 class="tour-title">{{ translations.friends }}</h4>
                        <div class="card">
                            <div class="card-header cover" style="background: url('https://serranatural.com/landing/img/produtos/decor1.jpg')"></div>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- / Tour -->

        <!-- Login -->
        <div class="container">
            <div v-if="!interactions.loginWithEmail">
                <button
                    type="button"
                    class="btn btn-block btn-primary m-t-10"
                    @click="interactions.loginWithEmail = true"
                >
                    {{ translations.loginEmail }}
                </button>

                <button type="button" class="btn btn-block btn-facebook m-t-10">
                    <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                </button>
            </div>

            <div v-if="interactions.loginWithEmail">
                <form class="m-t-30 text-center" >
                    <div class="form-group">
                        <input type="text" class="form-control" :placeholder="translations.inputEmail" v-model="login.email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" :placeholder="translations.inputPassword" v-model="login.password" @keyup.enter="makeLogin">
                    </div>

                    <button type="button" class="btn btn-block btn-primary" :disabled="!login.email || !login.password" @click.prevent="makeLogin()">{{ translations.login }}</button>

                    <button type="button" class="btn btn-block btn-facebook m-t-10">
                        <i class="ion-social-facebook m-r-10"></i>{{ translations.loginFacebook }}
                    </button>
                </form>
            </div>
        </div>
        <!-- / Login -->

        <!-- Terms And Privacy -->
        <div class="container text-center">
            <div class="m-t-30">
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
    import * as translations from '@/translations/auth/login'
    import {mapActions} from  'vuex'

    export default {
        name: 'login',

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
            this.initSwiper()
        },

        methods: {
            ...mapActions(['authSetToken', 'authSetUser']),

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperTour = new Swiper(that.$refs.swiperTour, {
                        spaceBetween: 15,
                        slidesPerView: 1,
                        paginationClickable: true,
                        pagination: '.swiper-pagination'
                    })
                }, 200);
            },

            makeLogin(){
                let that = this

                that.$http.post('/auth/login', that.login)
                    .then(function (response) {
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
