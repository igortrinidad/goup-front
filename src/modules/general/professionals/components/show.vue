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
                    <button type="button" class="btn btn-xs btn-light m-b-30 f-15"
                            @click="interactions.share = !interactions.share">
                        <i class="ion-android-share-alt"></i> Compartilhar
                    </button>
                </div>
                <div class="share-container" v-if="interactions.share" @click="interactions.share = false"></div>
                <div class="share-buttons" v-if="interactions.share">
                    <div class="card">
                        <button type="button" class="btn btn-whatsapp btn-xs btn-block f-300 f-14"
                                @click="openReplyWhatsapp()">
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

        <!-- Categories Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(tab, $index) in professionalTabs"
                    :key="$index"
                >
                    {{ tab.name }}
                </div>
            </div>
            <div class="swiper-button-prev">
                <i class="ion-ios-arrow-left"></i>
            </div>
            <div class="swiper-button-next">
                <i class="ion-ios-arrow-right"></i>
            </div>
        </div>
        <!-- Categories Tabs -->

        <!-- Section About -->
        <div class="container" v-if="currentTab.slug == 'about'">
            <div class="row">
                <div class="col-sm-12">

                    <!-- ABOUT -->
                    <div class="card m-t-20">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Sobre</h4>
                        </div>
                        <div class="card-body card-padding text-center">
                            <!-- Professional Categories -->
                            <h4 class="f-300 m-0">Especialidades</h4>
                            <div class=" m-t-10 categories">
                                <span class="label label-success f-13 f-300"
                                      v-for="cat in professional.categories">{{ cat.name }}</span>
                            </div>
                            <hr>
                            <!-- / Professional Categories -->

                            <!-- Professional Description -->
                            <h4 class="f-300 m-0">Descrição</h4>
                            <p class="m-t-10 f-300" v-if="professional.description">{{ professional.description }}</p>
                            <p class="m-t-10 f-300" v-if="!professional.description">Descrição não disponível</p>
                            <hr>
                            <!-- / Professional Description -->

                        </div>
                    </div>


                    <!-- AVALIAÇÕES -->
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Avaliações</h4>
                        </div>
                        <div class="card-body card-padding text-center">

                            <div class="">
                                <rating-simple
                                    :value.sync="professional.current_rating"
                                    :max="5"
                                    :size="3"
                                    alignClass="text-center"
                                ></rating-simple>
                                <span class="f-16">{{professional.current_rating}}</span> de <span
                                class="f-16">{{professional.total_rating}}</span> avaliações
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                    <button class="btn btn-block btn-info btn-sm m-t-20"
                                            v-if="!interactions.showRating && checkRole('client')"
                                            @click="interactions.showRating = true">Fazer uma avaliação
                                    </button>
                                </div>
                            </div>

                            <div class="row" v-if="!checkRole('client')">
                                <div class="col-xs-12 col-md-12">
                                    <button class="btn btn-block btn-info btn-sm m-t-20" disabled>Fazer uma avaliação
                                    </button>
                                    <p class="f-12 text-center">
                                        Você precisa estar autenticado como cliente para fazer uma avaliação.</p>
                                </div>
                            </div>

                            <hr v-if="interactions.showRating">
                            <fieldset class="m-t-30" v-if="interactions.showRating">
                                <legend class="text-center">Sua avaliação</legend>

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
                                    <textarea class="form-control" v-model="newRating.content"
                                              placeholder="Digite uma mensagem para a avaliação."></textarea>

                                </div>

                                <button class="btn btn-block btn-info btn-sm m-t-20" @click="saveRating()"
                                        :disabled="newRating.content.length < 120">Salvar avaliação
                                </button>

                            </fieldset>

                            <hr>

                            <fieldset>
                                <legend class="f-12 text-center m-b-10">últimas avaliações</legend>
                                <rating-list :ratings="professional.last_ratings"></rating-list>
                            </fieldset>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- / Section About -->

        <!-- Section Companies -->
        <companies-tab v-if="currentTab.slug == 'companies'" :professional="professional"></companies-tab>
        <!-- / Section Companies -->

        <!-- Section Certifications -->
        <certifications-tab v-if="currentTab.slug == 'certifications'"
                            :professional="professional"></certifications-tab>
        <!-- / Section Certifications -->

        <!-- Tab Photos -->
        <photos-tab v-if="currentTab.slug == 'photos'" :professional="professional"></photos-tab>
        <!-- / Tab Photos -->

         <!-- Tab Recomendations -->
        <recomendations-tab v-if="currentTab.slug == 'recomendations'" :professional="professional"></recomendations-tab>
        <!-- / Tab Recomendations -->

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
    import slug from 'slug'

    export default {
        name: 'landing-professional-show',
        components: {
            mainHeader,
            companiesTab: require('./companies.vue'),
            certificationsTab: require('./certifications.vue'),
            photosTab: require('./photos.vue'),
            recomendationsTab: require('./recomendations.vue'),
            ratingSimple: require('@/components/rating-simple.vue'),
            ratingList: require('@/components/rating-list.vue'),
        },
        data() {
            return {
                professional: cleanProfessionalModel(),
                currentTab: {},
                professionalTabs: [
                    {name: 'Sobre', slug: 'about'},
                    {name: 'Recomendações', slug: 'recomendations'},
                    {name: 'Certificados', slug: 'certifications'},
                    {name: 'Empresas', slug: 'companies'},
                    {name: 'Fotos', slug: 'photos'},
                ],
                interactions: {
                    share: false,
                    showRating: false,
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

            this.getProfessional()
            this.initSwiperTabs();

        },
        methods: {

            getProfessional() {
                let that = this
                that.certifications = _.orderBy([Certifications, Certifications, Certifications, Certifications], ['order', 'name'], ['asc'])
                that.$http.get(`professional/public/show/${ that.$route.params.slug }`)
                    .then((response) => {
                        that.professional = response.data.professional

                        that.newRating.professional_id = that.$route.params.id;
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

                    that.professional.current_rating = response.data.professional.current_rating
                    that.professional.total_rating = response.data.professional.total_rating

                }).catch(function (error) {
                    console.log(error)
                });
            },

            initSwiperTabs() {
                setTimeout(() => {
                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 7,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            this.currentTab = this.professionalTabs[swiper.realIndex]
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 100)
            },

            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/share/professional/' + this.handleSlug(this.professional.full_name))
                // this.updateTrackingInfo('share_copy')
                this.interactions.share = false
            },

            openReplyWhatsapp: function () {
                var that = this
                if (that.isLogged) {
                    var url = `https://api.whatsapp.com/send?phone=${that.professional.whatsapp}&text=Olá meu nome é ${that.currentUser.full_name}, encontrei o local ${that.professional.full_name} no App Isaudavel e gostaria de saber informações por favor.`;
                } else {
                    var url = `https://api.whatsapp.com/send?phone=${that.professional.whatsapp}&text=Olá, encontrei o profissional ${that.professional.full_name} no App Isaudavel e gostaria de saber informações por favor.`;
                }
                this.interactions.share = false
                window.open(url, '_system', null);
                // this.updateTrackingInfo('contact_whatsapp')
            },

            openShareFacebook: function () {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=1854829291449231&href=https://isaudavel.com/share/companies/${that.handleSlug(that.professional.full_name)}&display=popup&mobile_iframe=true`;
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


            handleSlug(text) {
                return slug(text).toLowerCase()
            },

            setRating(rating) {

                //Trough event we prevent mutation warnings
                this.newRating.rating = rating
            }
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
