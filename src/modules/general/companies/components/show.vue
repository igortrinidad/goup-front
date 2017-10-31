<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="company.name"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- COMPANY PROFILE -->
        <div class="header-profile">
            <div class="container">
                <div class="swiper-container" ref="swiperprofile">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="text-center">
                                <!-- <h4 class="f-300">{{ company.name }}</h4> -->
                                <div
                                    class="picture-circle picture-circle-m"
                                    :style="`background-image:url('${ company.avatar }')`"
                                >
                                </div>
                            </div>
                            <div class="text-center m-t-20">
                                <h4 class="f-300 m-0">Avaliação</h4>
                                <div class="rating-container">
                                    <rating-simple
                                        :value.sync="company.current_rating"
                                        :max="5"
                                        :size="1"
                                    ></rating-simple>
                                </div>
                            </div>

                            <div class="col-md-12 col-xs-12 text-center">
                                <button class="btn btn-xs btn-info m-t-10" data-toggle="modal" data-target="#modal-company-permissions" :disabled="!checkRole('client')" v-if="isLogged && !checkCompanyRelation(company.id).is_confirmed && checkCompanyRelation(company.id).client_id != currentUser.id">Adicionar empresa</button>
                                <button class="btn btn-xs btn-info m-t-10" :disabled="!checkRole('client')" v-if="isLogged && !checkCompanyRelation(company.id).is_confirmed && !checkCompanyRelation(company.id).is_deleted  && checkCompanyRelation(company.id).client_id == currentUser.id">Aguardando aprovação</button>
                                <button class="btn btn-xs btn-success m-t-10" data-toggle="modal" data-target="#modal-company-permissions" :disabled="!checkRole('client')" v-if="isLogged && checkCompanyRelation(company.id).is_confirmed && checkCompanyRelation(company.id).client_id == currentUser.id">Empresa adicionada <i class="ion-checkmark"></i></button>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="text-center">
                                <h4 class="f-300">Informações</h4>
                                <div class="infos-profile">
                                    <div class="info grid">
                                        <div class="info-box">
                                            <span class="f-300" data-toggle="modal" data-target="#modal-professionals">
                                                <i
                                                    class="d-block f-24"
                                                    :class="company.public_confirmed_professionals.length > 1 ? 'ion-ios-people-outline' : 'ion-ios-person-outline'"
                                                >
                                                </i>
                                                <span class="f-13">
                                                    {{ company.public_confirmed_professionals.length }}
                                                    {{ company.public_confirmed_professionals.length > 1 ? 'Profissinais' : 'Profissional' }}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="info grid">
                                        <div class="info-box">
                                            <a :href="`tel:${ company.phone }`" target="_blank" style="color: #fff !important;">
                                                <span class="f-300">
                                                    <i class="d-block ion-ios-telephone-outline f-24"></i>
                                                    Ligar
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="info grid">
                                        <div class="info-box">
                                            <a :href="company.website" style="color: #fff !important;" @click.prevent="openSystemUrl(company.website)">
                                                <span class="f-300">
                                                    <i class="d-block ion-ios-world-outline f-24"></i>
                                                    Visitar Site
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="info full">
                                        <div class="info-box">
                                            <span class="f-300" v-if="company.address"><i class="m-r-10"></i>{{company.address.full_address}}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fix"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
        <!-- /COMPANY PROFILE -->

        <!-- Categories Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(tab, $index) in companyTabs"
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

         <!-- Tab Content About -->
        <client-company-permissions :company="company"></client-company-permissions>
        <!-- /Tab Content About -->

        <!-- Tab Content About -->
        <about-tab v-if="currentTab.slug === 'about'" :company="company"></about-tab>
        <!-- /Tab Content About -->

        <!-- /TAB PROFESSIONALS -->
        <professionals-tab v-if="currentTab.slug === 'professionals'" :company="company"></professionals-tab>
        <!-- /TAB PROFESSIONALS -->

        <!-- Tab Content Prices -->
        <prices-tab v-if="currentTab.slug === 'prices'" :company="company"></prices-tab>
        <!-- /Tab Content Prices -->

        <!-- Tab Content Mapa -->
        <map-tab v-if="currentTab.slug === 'map'" :company="company"></map-tab>
        <!-- /Tab Content Mapa -->

        <!-- Tab Content Photos -->
        <photos-tab v-if="currentTab.slug === 'photos'" :company="company"></photos-tab>
        <!-- /Tab Content Photos -->

        <!-- Tab Content Callendar -->
        <div v-if="currentTab.slug === 'callendar'">
            <div class="container m-t-30">
                <div class="text-center">
                    <img class="img-icon" src="../../../../assets/icons/calendar.png" alt="">
                    <h3 class="f-300 m-b-30">{{ currentTab.name }}</h3>
                </div>
                <calendar></calendar>
            </div>
        </div>
        <!-- /Tab Content Callendar -->

        <!-- Tab Content Photos -->
        <recomendations-tab v-if="currentTab.slug === 'recomendations'" :company="company"></recomendations-tab>
        <!-- /Tab Content Photos -->

    </div>
</template>

<script>
    import CompanyModel from '@/models/Company'
    import { cleanCompanyModel } from '@/models/Company'
    import Plan from '@/models/Plan'
    import mainHeader from '@/components/main-header.vue'
    import ratingSimple from '@/components/rating-simple.vue'
    import copyToClipboard from 'copy-text-to-clipboard'
    import slug from 'slug'
    import {mapGetters, mapActions} from 'vuex'

    export default{
        name: 'landing-companies-show',
        components:{
            mainHeader,
            ratingSimple,
            calendar: require('./tabs/calendar.vue'),
            clientCompanyPermissions: require('./request-permission.vue'),
            aboutTab: require('./tabs/about.vue'),
            photosTab: require('./tabs/photos.vue'),
            professionalsTab: require('./tabs/professionals.vue'),
            pricesTab: require('./tabs/prices.vue'),
            mapTab: require('./tabs/map.vue'),
            recomendationsTab: require('./tabs/recomendations.vue')
        },
        data(){
            return{
                company: cleanCompanyModel(),
                plans: [],
                promos: [],
                currentTab: {},
                interactions: {
                    share: false,
                    baseInformations: false
                },
                companyTabs: [
                    { name: 'Sobre', slug: 'about' },
                    { name: 'Profissionais', slug: 'professionals' },
                    { name: 'Preços', slug: 'prices' },
                    { name: 'Mapa', slug: 'map' },
                    { name: 'Fotos', slug: 'photos' },
                    { name: 'Agenda', slug: 'callendar' },
                    { name: 'Recomendações', slug: 'recomendations' }
                ],

            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole', 'checkCompanyRelation'])
        },
        mounted(){
            this.getCompany()
            this.initSwiperTabs()
            this.initSwiperProfile()

        },
        methods:{
            ...mapActions(['addClientCompany', 'removeClientCompany', 'setSelectedCompany']),

            getCompany() {
                let that = this

                that.$http.get(`company/show/${ that.$route.params.company_slug }`)
                    .then((response) => {
                        that.company = response.data.company
                        that.setSelectedCompany(response.data.company)
                        const plans = [Plan]
                        that.promos = that.orderPlansByFavorite(plans)
                        that.plans = that.orderPlansByFavorite(plans)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },

            orderPlansByFavorite(plans) {
                return _.flatten(
                    _.partition(
                        _.orderBy(plans, 'value', ['desc', 'asc'])
                        , {'is_favorite': true}
                    )
                )
            },


            handleSlug(text) {
                return slug(text).toLowerCase()
            },

            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/share/companies/' + this.company.slug)
                // this.updateTrackingInfo('share_copy')
                this.interactions.share = false
            },

            openReplyWhatsapp: function(){
                let that = this
                if(that.isLogged){
                    let url = `https://api.whatsapp.com/send?phone=${that.company.whatsapp}&text=Olá meu nome é ${that.currentUser.full_name}, encontrei o local ${that.company.name} no App Isaudavel e gostaria de saber informações por favor.`;
                } else {
                    let url = `https://api.whatsapp.com/send?phone=${that.company.whatsapp}&text=Olá, encontrei o local ${that.company.name} no App Isaudavel e gostaria de saber informaçõe por favor.`;
                }
                this.interactions.share =  false
                window.open(url, '_system', null);
                // this.updateTrackingInfo('contact_whatsapp')
            },

            initSwiperProfile() {
                var that = this
                setTimeout(() => {
                    that.swiperProfile = new Swiper(that.$refs.swiperprofile, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        loop: false,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: false
                    })
                }, 100)
            },

            initSwiperTabs() {
                var that = this
                setTimeout(() => {
                    that.swiperTabs = new Swiper(that.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView :'auto',
                        onSlideChangeEnd: swiper => {
                            that.currentTab = that.companyTabs[swiper.realIndex]
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 200)
            },

            clientSolicitation() {
                let that = this

                that.$http.post('client/company/solicitation', {
                    company_id: that.company.id,
                    client_id: that.currentUser.id,
                    requested_by_client: true,

                }).then(function (response) {

                    successNotify('', 'Solicitação enviada com sucesso')

                    that.addClientCompany(response.data.company)

                }).catch(function (error) {
                    console.log(error)
                });
            },

            cancelClientSolicitation() {
                let that = this

                that.$http.post('client/company/remove_solicitation', {
                    company_id: that.company.id,
                    client_id: that.currentUser.id

                }).then(function (response) {

                    successNotify('', 'Solicitação removida com sucesso')

                    that.removeClientCompany(that.company.id)

                }).catch(function (error) {
                    console.log(error)
                });
            },

            handleUnauthenticated(){
                this.$router.push({name: 'client.auth.login', query: {redirect: this.$route.path}})
            },

            openSystemUrl: function(url){
                window.open(url, '_system');
            },

        }

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

    /* some fixes */
    .first-container {
        padding-bottom: 0;
    }
    a.btn { color: #fff !important; }
    .fix-swiper-pagination { height: 30px; }
    .center { margin: 0 auto; }

    /* Share */
    .share-container {
        position: fixed;
        width: 100vw; height: 100vh;
        background: transparent;
        top: 0; left: 0; right: 0; bottom: 0;
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
    .share-icon { }

    /* Swiper */
    .swiper-button-prev { left: 20px; }
    .swiper-button-next { right: 20px; }
    .swiper-slide.swiper-slide img { border-radius: 4px; }

    .thumbs .swiper-slide.swiper-slide-active img{
        border: 2px solid #383938;
    }

    /* List */
    .list .list-item { border: none !important; }




        /* header Profile */
    .header-profile {
        background: #87c657;
        margin-top: -20px;
        padding: 10px 0;
        color: #fff;
    }

    .rating-container {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 156px; height: 40px;
        margin: 0 auto;
    }
    /* infos profile */
    .infos-profile {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-flow: row wrap;
        margin: 0 -5px;
    }
    .infos-profile .info { padding: 5px; }
    .infos-profile .info.grid { width: 33.3333%; }
    .infos-profile .info .info-box{
        border: 1px solid rgba(255, 255, 255, .3);
        padding: 5px;
        margin: 5px 0;
    }

    .img-profile{
      width: 128px;
      height: 128px;
      border-radius: 50%;
      object-fit: cover;
    }

    .box-row{
        width: 100%;
    }

    .badge-profile{
        position: absolute;
        right: 15px;
        margin-top: -10px;
    }

    .badge-profile img{
        width: 80px;
    }

    /* fix navigation */
    .fix{ height: 50px; }
</style>
