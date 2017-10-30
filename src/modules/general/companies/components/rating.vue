<template lang="html">
    <div class="first-container">

        <main-header
            :type="'center'"
            :title="company.name"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- Wrapper avatar & Share -->
        <div class="wrapper primary fixtop p-t-10 p-b-30">
            <img class="avatar ls center" :src="company.avatar" :alt="company.name">

            <!-- Share -->
            <div class="text-center p-relative">
                <div class="container m-t-15 text-center">
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

        <div class="container">
            <div class="card m-t-20">
                <div class="card-body card-padding text-center">

                    <p class="f-16">Sua avaliação é muito importante para o profissional {{company.name}}.</p>
                    <p class="f-16">Veja abaixo o que os outros clientes dizem sobre {{company.name}}.</p>

                </div>
            </div>

            <div class="col-sm-12 text-center">
                <h3 class="f-300 m-b-20">Avaliações</h3>
            </div>

            <div class="card">
                <div class="card-body card-padding">
                    <div class="text-center">
                        <rating-simple
                            :value.sync="company.current_rating"
                            :max="5"
                            :size="3"
                        >
                        </rating-simple>
                        <span class="f-300 f-16">
                            {{company.current_rating}}
                            de
                            {{company.total_rating}}
                            avaliações
                        </span>
                    </div>
                </div>
            </div>

        </div>
        <!-- / Current Rating -->

        <!-- New Rating -->
        <div class="container m-t-10">

            <button class="btn btn-block btn-info" @click="handleUnauthenticated()" v-if="!interactions.showRating">
                Fazer uma avaliação
            </button>

            <div class="card m-t-20" v-if="interactions.showRating">
                <div class="card-body card-padding">
                    <p class="text-center">Faça uma avaliação para {{company.name}}</p>

                    <rating-simple
                        :value.sync="newRating.rating"
                        :max="5"
                        :size="3"
                        :disabled="false"
                        @rating-changed="setRating"
                    >
                    </rating-simple>

                    <p class="f-12 text-center">Clique acima para selecionar</p>

                    <div class="form-group">
                        <label>
                            Comentários
                            <span
                                v-show="newRating.content.length < 120">
                                (faltam {{120 - newRating.content.length}} caracteres)
                            </span>
                        </label>
                        <textarea
                            class="form-control"
                            v-model="newRating.content"
                            id="new-rating-input"
                            placeholder="Digite uma mensagem para a avaliação."
                        >
                        </textarea>

                    </div>

                    <button
                        class="btn btn-block btn-info btn-sm m-t-20"
                        @click="saveRating()"
                        :disabled="newRating.content.length < 120"
                    >
                        Salvar avaliação
                    </button>
                    <button
                        class="btn btn-block btn-default btn-sm m-t-10"
                        @click="interactions.showRating = false"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

        </div>
        <!-- / New Rating -->

        <!-- Last Ratings -->
        <div class="container m-t-20">

            <h3 class="f-300 m-b-10 text-center">Últimas avaliações</h3>

            <div class="card m-t-30">
                <div class="card-body card-padding text-center">
                    <rating-list :ratings="company.last_ratings"></rating-list>
                </div>
            </div>
        </div>

        <!-- Last Ratings -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import ratingSimple from '@/components/rating-simple.vue'
    import ratingList from '@/components/rating-list.vue'

    import { cleanCompanyModel } from '@/models/Company'

    import copyToClipboard from 'copy-text-to-clipboard'


    export default {
        name: 'landing-rating-company',
        components: {
            mainHeader,
            ratingSimple,
            ratingList
        },
        data() {
            return {
                company: cleanCompanyModel(),
                interactions: {
                    share: false,
                    showRating: false,
                    already_rated: false,
                },
                newRating: {
                    client_id: '',
                    company_id: '',
                    rating: 5,
                    content: '',
                }
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole', 'selectedCompany']),
        },
        mounted() {
            this.getCompany()
        },
        methods: {

            ...mapActions(['addClientCompany', 'removeClientCompany', 'setSelectedCompany', 'addSelectedCompanyNewRating']),

            getCompany() {
                let that = this

                that.$http.get(`company/show/${ that.$route.params.company_slug }`)
                .then((response) => {
                    that.company = response.data.company
                    that.setSelectedCompany(response.data.company)
                })
                .catch((error) => {
                    console.log(error)
                })
            },

            checkRating() {
                let that = this

                that.$http.post('/client/professional/rating/check', {slug: that.$route.params.professional_slug })
                .then((response) => {
                    that.interactions.already_rated = response.data.already_rated
                })
                .catch((error) => {
                    console.log(error)
                })
            },

            setRating(rating) {
                //Trough event we prevent mutation warnings
                this.newRating.rating = rating
            },

            saveRating: function () {
                let that = this

                that.newRating.client_id = that.currentUser.id
                that.newRating.company_id = that.company.id

                that.$http.post('client/company/rating/create', that.newRating).then(function (response) {

                    successNotify('', 'Avaliação salva com sucesso')

                    that.newRating.content = '';
                    that.interactions.showRating = false;
                    that.interactions.already_rated = true

                    that.getCompany();

                    that.setSelectedCompanyRating({
                        current_rating: response.data.company.current_rating,
                        total_rating: response.data.company.total_rating
                    })

                }).catch(function (error) {
                    console.log(error)
                });
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

            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/empresas/' + this.company.slug)
                // this.updateTrackingInfo('share_copy')
                this.interactions.share = false
            },

            openShareWhatsapp: function () {
                var that = this
                if (that.isLogged) {
                    var url = `https://api.whatsapp.com/send?text=Encontrei a empresa ${that.company.name} no aplicativo iSaudavel, veja também seu perfil profissional: https://isaudavel.com/empresas/${that.company.slug}`;
                }
                this.interactions.share = false
                window.open(url, '_system', null);
                // this.updateTrackingInfo('contact_whatsapp')
            },

            openShareFacebook: function () {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=1854829291449231&href=https://isaudavel.com/empresas/${that.company.slug}&display=popup&mobile_iframe=true`;
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

        }
    }
</script>

<style scoped>

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

</style>
