<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="professional.full_name"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- Wrapper avatar & Share -->
        <div class="wrapper p-t-10">
            <img class="avatar ls center" :src="professional.avatar" :alt="professional.full_name">
            <!-- Share -->
            <div class="text-center p-relative">
                <div class="container m-t-10 text-center">
                    <button type="button" class="btn btn-xs btn-light m-b-20 f-15"
                            @click="interactions.share = !interactions.share">
                        <i class="ion-android-share-alt"></i> Compartilhar
                    </button>
                </div>
                <div class="share-container" v-if="interactions.share" @click="interactions.share = false"></div>
                <div class="share-buttons" v-if="interactions.share">
                    <div class="card">
                        <button type="button" class="btn btn-whatsapp btn-xs btn-block f-300 f-14"
                                @click="openShareWhatsapp()">
                            <i class="ion-social-whatsapp m-r-5"></i>
                            Whatsapp
                        </button>
                        <button type="button" class="btn btn-facebook btn-xs btn-block f-300 f-14"
                                @click="openShareFacebook()">
                            <i class="ion-social-facebook m-r-5"></i>
                            Facebook
                        </button>
                        <button type="button" class="btn btn-success btn-xs btn-block f-300 f-14"
                                @click="handleCopyLink()">
                            <i class="ion-ios-copy m-r-5"></i>
                            Copiar link
                        </button>
                    </div>
                </div>
            </div>
            <!-- / Share -->
        </div>
        <!-- /Wrapper avatar & Share -->

        <!-- Section About -->
        <div class="container">

            <div class="row">
                <div class="col-sm-12">

                    <div class="card m-t-20">
                        <div class="card-body card-padding text-center">

                            <p class="f-16">Sua avaliação é muito importante para o profissional {{professional.full_name}}.</p>
                            <p class="f-16">Veja abaixo o que os outros clientes dizem sobre {{professional.full_name}}.</p>

                        </div>
                    </div>

                </div>

                <div class="col-sm-12 text-center">
                    <h3 class="f-300 m-b-10">Avaliações</h3>
                </div>

                <!-- AVALIAÇÃO ATUAL DO PROFISSIONAL -->
                <div class="col-sm-12">

                    <div class="card p-5">
                        <div class="text-center">
                            <rating-simple
                                :value.sync="professional.current_rating"
                                :max="5"
                                :size="3"
                            ></rating-simple>
                            <span class="f-16">{{professional.current_rating}}</span> de <span
                            class="f-16">{{professional.total_rating}}</span> avaliações
                        </div>
                    </div>
                </div>

                <!-- BOTÃO NOVA AVALIAÇÃO -->
                <div class="col-sm-12 m-b-30">
                    <button class="btn btn-block btn-info" @click="handleUnauthenticated()" v-if="!interactions.showRating">Fazer uma avaliação
                    </button>
                </div>

                <!-- NOVA AVALIAÇÃO -->
                <div class="col-sm-12 m-b-20" v-if="interactions.showRating">

                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-t-10">Nova avaliação</h4>
                        </div>
                    
                        <div class="card-body card-padding">
                            
                            <p class="text-center">Faça uma avaliação para {{professional.full_name}}</p>

                            <rating-simple
                                :value.sync="newRating.rating"
                                :max="5"
                                :size="3"
                                :disabled="false"
                                @rating-changed="setRating"
                            ></rating-simple>
                            <p class="f-12 text-center">Clique acima para selecionar</p>

                            <div class="form-group">
                                <label>Comentários <span
                                    v-show="newRating.content.length < 120">(faltam {{120 - newRating.content.length}} caracteres)</span></label>
                                <textarea 
                                    class="form-control" 
                                    v-model="newRating.content"
                                    id="new-rating-input"
                                    placeholder="Digite uma mensagem para a avaliação."></textarea>

                            </div>

                            <button class="btn btn-block btn-info btn-sm m-t-20" @click="saveRating()"
                                    :disabled="newRating.content.length < 120">Salvar avaliação
                            </button>
                            <button class="btn btn-block btn-default btn-sm m-t-10" @click="interactions.showRating = false">Cancelar
                            </button>

                        </div>
                    </div>
                </div>

                <!-- AVALIAÇÕES -->
                <div class="container m-t-20">

                    <h3 class="f-300 m-b-10 text-center">Últimas avaliações</h3>

                    <div class="card m-t-30">
                        <div class="card-body card-padding text-center">
                            <rating-list :ratings="professional.last_ratings"></rating-list>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- / Section About -->


    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import Professional from '@/models/Professional'
    import Company from '@/models/Company'
    import Certifications from '@/models/ProfessionalCertifications'
    import {cleanProfessionalModel} from '@/models/Professional'

    import copyToClipboard from 'copy-text-to-clipboard'

    var _ = require('lodash');


    export default {
        name: 'landing-rating-professional',
        components: {
            mainHeader,
            ratingSimple: require('@/components/rating-simple.vue'),
            ratingList: require('@/components/rating-list.vue'),
        },
        data() {
            return {
                professional: cleanProfessionalModel(),
                interactions: {
                    share: false,
                    showRating: false,
                    already_rated: false,
                },
                newRating: {
                    client_id: '',
                    professional_id: '',
                    rating: 5,
                    content: '',
                }
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            var that = this

            if(this.isLogged){
                this.interactions.showRating = true;
            }

            this.getProfessional();

        },
        methods: {

            getProfessional() {
                let that = this

                that.$http.get(`professional/public/show/${ that.$route.params.professional_slug }`)
                    .then((response) => {
                        that.professional = response.data.professional

                        that.newRating.professional_id = that.professional.id;
                        that.newRating.client_id = that.currentUser.id;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },

            saveRating: function () {
                let that = this

                that.$http.post('client/professional/rating/create', that.newRating).then(function (response) {

                    successNotify('', 'Avaliação salva com sucesso')

                    that.professional.last_ratings.unshift(response.data.rating);
                    that.newRating.content = '';
                    that.interactions.showRating = false;
                    that.interactions.already_rated = true;

                    that.professional.current_rating = response.data.professional.current_rating
                    that.professional.total_rating = response.data.professional.total_rating

                }).catch(function (error) {
                    console.log(error)
                });
            },

            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/profissionais/' + this.professional.slug)
                // this.updateTrackingInfo('share_copy')
                this.interactions.share = false
            },

            openShareWhatsapp: function () {
                var that = this
                if (that.isLogged) {
                    var url = `https://api.whatsapp.com/send?text=Encontrei o profissional ${that.professional.full_name} no aplicativo iSaudavel, veja também seu perfil profissional: https://isaudavel.com/profissionais/${that.professional.slug}`;
                }
                this.interactions.share = false
                window.open(url, '_system', null);
                // this.updateTrackingInfo('contact_whatsapp')
            },

            openShareFacebook: function () {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=1854829291449231&href=https://isaudavel.com/profissionais/${that.professional.slug}&display=popup&mobile_iframe=true`;
                if (window.cordova) {
                    var ref = window.open(url, '_blank', 'location=yes');
                    ref.addEventListener('loadstart', function (event) {
                        var url = "https://www.facebook.com/dialog/return/close";
                        if (event.url.indexOf(url) !== -1) {
                            ref.close();
                            successNotify('', 'Evento compartilhado com sucesso!')
                        }
                    });
                } else {
                    window.open(url, '_blank', 'location=yes');
                }
                this.interactions.share = false
                // this.updateTrackingInfo('share_facebook')
            },

            setRating(rating) {

                //Trough event we prevent mutation warnings
                this.newRating.rating = rating
            },

            handleUnauthenticated(){
                let that = this

                if(!this.isLogged){

                    that.$swal({
                        title: 'Login',
                        text: 'Você precisar estar logado como cliente para avaliar um profissional, desejar efetuar o login?',
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Entrar',
                        confirmButtonColor: '#00A369',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true
                    }).then(function () {

                        that.$router.push({name: 'client.auth.login', query: {redirect: that.$route.path}})
                        return false

                    }).catch(function () {

                    })

                } else {
                    that.interactions.showRating = true;
                    setTimeout(function() {$('#new-rating-input').focus();}, 100);
                    
                }   
            },

        },

    }
</script>

<style scoped>
    /* wrapper */
    .wrapper {
        width: 100%;
        min-height: 120px;
        background: #88C657;
        font-weight: 300;
        margin-top: -20px;
    }

    /* Categories */
    .categories .label {
        margin: 2.5px 2.5px 2.5px 0px;
    }

    /* Swiper */
    .swiper-slide.card {
        transform: scale(.9);
        z-index: 99999;
        transition: ease .3s;
    }

    .swiper-slide-active.card {
        transform: scale(1);
        transition: ease .3s;
    }

    /* Share */
    .share-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: transparent;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
    }

    .share-buttons {
        position: absolute;
        top: 40px;
        width: 120px;
        left: 50%;
        z-index: 111;
        margin-left: -60px;
    }

    .share-icon {
    }

    /* Company Avatar */
    .company-avatar {
        position: relative;
        margin-top: 10px;
    }

    .company-avatar .avatar {
        border: 2px solid #FFF;
        position: relative;
        float: left;
    }

    .company-avatar .avatar:nth-child(1) {
        left: 0;
        z-index: 500;
    }

    .company-avatar .avatar:nth-child(2) {
        left: -15px;
        z-index: 400;
    }

    .company-avatar .avatar:nth-child(3) {
        left: -30px;
        z-index: 300;
    }

    .company-avatar .avatar:nth-child(4) {
        left: -45px;
        z-index: 200;
    }

    .company-avatar .avatar:nth-child(5) {
        left: -60px;
        z-index: 100;
    }

</style>
