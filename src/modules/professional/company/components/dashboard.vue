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

        <div class="header-profile">
            <div class="container">
                <div class="info full">
                    <router-link class="btn btn-default btn-block" tag="button" :to="{name: 'landing.companies.show', params: {company_id: $route.params.company_id, company_slug: company.slug}}">
                       Ver perfil
                    </router-link>
                </div>
                <br>
            </div>

        </div>

        <!-- Categories Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(module, indexFunction) in tabs"
                    :key="indexFunction"
                >
                    {{ module.name }}
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

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Agenda' && !interactions.refreshing">
            <calendar-list-tab :company="company"></calendar-list-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Fotos' && !interactions.refreshing">
            <photos-tab></photos-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Profissionais' && !interactions.refreshing">
            <professionals-tab></professionals-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Clientes' && !interactions.refreshing">
            <clients-tab></clients-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Planos' && !interactions.refreshing">
            <plans-tab></plans-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Faturas' && !interactions.refreshing">
            <invoices-tab></invoices-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Avaliações' && !interactions.refreshing">
            <ratings-tab></ratings-tab>
        </div>
        <!-- / Content Tab Evaluations -->

        <!-- Content Tab Evaluations -->
        <div class="m-t-30" v-if="interactions.currentCategory.name === 'Recomendações' && !interactions.refreshing">
            <recomendations-tab></recomendations-tab>
        </div>
        <!-- / Content Tab Evaluations -->


        <!-- Modals -->
        <modal-default :modalId="'modal-professionals'" :modalTitle="'Profissionais'" :removePadding="true">
            <div slot="content">
                <div class="list">
                    <!-- v-for na .list-item -->
                    <div class="list-item" v-for="(professional, $index) in company.professionals" v-if="$index < 4">
                        <div class="container">
                            <div class="list-content">
                                <div class="head">
                                    <span class="d-block f-300 f-14 m-t-10"><i class="icon ion-ios-location-outline m-r-10 f-20"></i>Los Angesles - CA</span>
                                </div>

                                <div class="infos m-l-10">
                                    <h3 class="m-0 d-block name">
                                        <span>{{ professional.name }} {{ professional.last_name }}</span>
                                    </h3>
                                    <div>
                                        <span
                                            class="label label-primary f-300 f-14 m-t-5"
                                            v-for="fun in professional.functions"
                                        >
                                            {{ fun }}
                                        </span>

                                        <span class="d-block f-300 f-14 m-t-10">
                                            Avaliação:
                                            <span class="m-r-5 f-14" v-for="n in 5"><i class="ion-ios-star"></i></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal-default>

    </div>
</template>

<script>

    import mainHeader from '@/components/main-header.vue'
    import companyModel from '@/models/Company.js'
    import {cleanCompanyModel} from '@/models/Company.js'
    import ratingSimple from '@/components/rating-simple.vue'
    import ratingComplete from '@/components/rating-complete.vue'
    import ModalDefault from '@/components/modal-default.vue'

    import {mapActions, mapGetters} from 'vuex'

    import bus from '@/utils/event-bus'

    export default{
        name: 'client-profile-home',
        components:{
            mainHeader,
            ratingSimple,
            ratingComplete,
            ModalDefault,
            CalendarListTab: require('./calendar/list.vue'),
            PhotosTab: require('./tabs/photos.vue'),
            ProfessionalsTab: require('./tabs/professionals.vue'),
            ClientsTab: require('./tabs/clients.vue'),
            PlansTab: require('./tabs/plans.vue'),
            InvoicesTab: require('./tabs/invoices.vue'),
            RecomendationsTab: require('./tabs/recomendations.vue'),
            RatingsTab: require('./tabs/ratings.vue'),
        },
        data(){
            return{
                interactions: {
                    tabSelected: 'agenda',
                    currentCategory: {},
                    showProfile: true,
                    refreshing: false,
                },
                lastTab: 1,
                company: cleanCompanyModel(),
                tabs: [
                    {name: 'Clientes', slug: 'clients'},
                    {name: 'Agenda', slug: 'calendar'},
                    {name: 'Fotos', slug: 'photos'},
                    {name: 'Profissionais', slug: 'professionals'},
                    {name: 'Planos', slug: 'plans'},
                    {name: 'Avaliações', slug: 'ratings'},
                    {name: 'Recomendações', slug: 'recomendations'},
                    {name: 'Faturas', slug: 'invoices'},
                ]
            }
        },

        mounted(){
            var that = this;

            this.initSwiperProfile()
            this.initSwiperTabs()
            this.getCompany();
            this.interactions.showProfile = JSON.parse(localStorage.getItem('company_profile_toggle'));

            bus.$on('close-menu', function(){

                that.interactions.refreshing = true;
                
                setTimeout(function() {
                    that.initSwiperTabs();
                    that.getCompany();
                    that.interactions.refreshing = false;

                }, 100);

            });
        },

        destroyed(){
            bus.$off('close-menu');
        },

        methods:{

            ...mapActions(['setCurrentCompany', 'disableLoader', 'setLoading']),

            getCompany: function(){
                let that = this

                if(that.$route.params.company_id){
                    that.setLoading({is_loading: true, message: ''})

                    that.$http.get(`professional/company/show/${that.$route.params.company_id}`)
                    .then(function (response) {

                        that.company = response.data.company;
                        that.setCurrentCompany(response.data.company)
                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {

                        that.setLoading({is_loading: false, message: ''})
                    });
                    
                }

            },
            initSwiperProfile() {
                setTimeout(() => {
                    this.swiperProfile = new Swiper(this.$refs.swiperprofile, {
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

                    let startIndex = 0

                    if (that.$route.query.tab) {
                        startIndex = _.findIndex(that.tabs, { 'slug': that.$route.query.tab })
                    }

                    if (window.localStorage.getItem('company_last_tab') && !that.$route.query.tab) {
                        startIndex = parseInt(window.localStorage.getItem('company_last_tab'))
                    }

                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: startIndex,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            window.localStorage.setItem('company_last_tab', swiper.realIndex)
                            this.interactions.currentCategory = this.tabs[swiper.realIndex];
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 100)
            },

            toggleProfile: function(){
                let that = this
                that.interactions.showProfile = !that.interactions.showProfile;
                that.initSwiperProfile();
                localStorage.setItem('company_profile_toggle', that.interactions.showProfile);
            },

            openSystemUrl: function(url){
                window.open(url, '_system');
            },
        }

    }
</script>


<style>
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
