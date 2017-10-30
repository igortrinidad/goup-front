<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Dashboard'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper padding primary fixtop">
            <div class="container">
                <div class="text-center p-t-10">
                    <div class="picture-circle picture-circle-m" :style="`background-image:url('${ currentUser.avatar }')`"></div>
                    <h2 class="f-300 m-15">{{ currentUser.full_name }}</h2>
                </div>
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

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'about'">
            <about-tab></about-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'calendar'">
            <calendar-tab></calendar-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'workdays'">
            <workdays-tab></workdays-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'photos'">
            <photos-tab></photos-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'companies'">
            <companies-tab></companies-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'ratings'">
            <ratings-tab></ratings-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Content Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'certifications'">
            <certifications-tab></certifications-tab>
        </div>
        <!-- / Content Tab-->

        <!-- Clients Tab -->
        <div class="m-t-30" v-if="currentTab.slug === 'clients'">
           <clients-tab></clients-tab>
        </div>
        <!-- / Clients Tab-->

    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import Avatar from '@/components/avatar.vue'
    import bus from '@/utils/event-bus'

    export default{
        name: 'admin-profile-show',
        components:{
            mainHeader,
            Avatar,
            calendarTab: require('./calendar/calendar.vue'),
            aboutTab: require('./tabs/about.vue'),
            workdaysTab: require('./tabs/workdays.vue'),
            photosTab: require('./tabs/photos.vue'),
            companiesTab: require('./tabs/companies.vue'),
            ratingsTab: require('./tabs/ratings.vue'),
            certificationsTab: require('./tabs/certifications.vue'),
            clientsTab: require('./tabs/clients.vue'),
        },
        data(){
            return{
                currentTab:{},
                tabs: [
                    {name: 'Empresas', slug: 'companies' },
                    {name: 'Agenda', slug: 'calendar' },
                    {name: 'Horários', slug: 'workdays' },
                    {name: 'Sobre', slug: 'about' },
                    {name: 'Fotos', slug: 'photos' },
                    {name: 'Avaliações', slug: 'ratings' },
                    {name: 'Cursos', slug: 'certifications' },
                    {name: 'Clientes', slug: 'clients' }
                ],
                lastTab: 0,
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },

        mounted() {
            this.handleTabsVisibility()
            this.initSwiperTabs()
            this.disableLoader(true)

            bus.$on('close-menu', () => {

                if(this.$route.name == 'admin.professional.dashboard'){
                    console.log('Rodou aqui no profissional dashboard')
                    this.initSwiperTabs()  
                }
            });
        },

        destroyed(){
            bus.$off('close-menu');
        },
        methods:{

            ...mapActions(['disableLoader']),

            handleTabsVisibility(){
                let that = this

                let has_subscription = that.currentUser.subscription ? true : false
                let has_companies = that.currentUser.companies.length ? true : false

                let tabs = _.filter(that.tabs, function (module) {

                    //Professional without company
                    if (!has_companies && has_subscription && module.name != 'Empresas' && module.name != 'Agenda') {
                        return module
                    }

                    //Professional has only company
                    if (has_companies && !has_subscription && module.name != 'Clientes') {
                        return module
                    }

                    //if both, show all tabs
                    if (has_companies && has_subscription) {
                        return module
                    }

                });

                that.tabs = tabs
            },

            initSwiperTabs() {
                var that = this;

                setTimeout(() => {

                    let startIndex = 0

                    if (that.$route.query.tab) {
                        startIndex = _.findIndex(that.tabs, { 'slug': that.$route.query.tab })
                    }

                    if (window.localStorage.getItem('last_tab_professional') && !that.$route.query.tab) {
                        startIndex = parseInt(window.localStorage.getItem('last_tab_professional'))
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
                            window.localStorage.setItem('last_tab_professional', swiper.realIndex)
                            this.currentTab = this.tabs[swiper.realIndex];
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 100)
            },

        },
    }
</script>


<style scoped>
    /* Scoped Styles */
</style>
