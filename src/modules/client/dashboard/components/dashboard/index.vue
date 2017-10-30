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

        <div>
            <div class="header-profile">
                <div class="container" v-if="interactions.showProfile">
                    <div class="text-center">
                        <div class="picture-circle picture-circle-p" :style="`background-image:url('${ currentClient.avatar }')`"></div>
                        <h3 class="f-300 m-t-10 m-b-20">{{ currentClient.full_name }}</h3>
                    </div>

                </div>
                <div class="text-center cursor-pointer m-b-10 m-t-0" @click="toggleProfile()">
                    <i class="ion-minus f-18" v-if="interactions.showProfile"></i>
                    <i class="ion-plus f-18" v-if="!interactions.showProfile"></i>
                </div>
            </div>

            <!-- MODULE Tabs -->
            <div class="swiper-container tabs" ref="tabs">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide tab"
                        v-for="(tab, $index) in tabs"
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
            <!-- MODULE Tabs -->

             <!-- Content Tab Calendar -->
            <div class="m-t-30" v-if="currentTab.slug === 'calendar'">
                <calendar-tab></calendar-tab>
            </div>
            <!-- / Content Tab Calendar -->

            <!-- Content Tab Phots -->
            <div class="m-t-30" v-if="currentTab.slug === 'photos'">
                <photos-tab :client="currentClient"></photos-tab>
            </div>
            <!-- / Content Tab Photos -->

            <!-- Content Tab Trainnings -->
            <div class="m-t-30" v-if="currentTab.slug === 'trainnings'">
                <trainnings-tab :client="currentClient"></trainnings-tab>
            </div>
            <!-- / Content Tab trainnings -->

            <!-- / Content Tab Diets -->
            <div class="m-t-30" v-if="currentTab.slug === 'diets'">
                <diets-tab :client="currentClient"></diets-tab>
            </div>
            <!-- / Content Tab Diets -->

            <!-- Content Tab Evaluations -->
            <div class="m-t-30" v-if="currentTab.slug === 'evaluations'">
                <evaluations-tab :client="currentClient"></evaluations-tab>
            </div>
            <!-- / Content Tab Evaluations -->

            <!-- Content Tab Restrictions -->
            <div class="m-t-30" v-if="currentTab.slug === 'restrictions'">
                <restrictions-tab :client="currentClient"></restrictions-tab>
            </div>
            <!-- / Content Tab Restrictions -->

            <!-- Content Tab Exams -->
            <div class="m-t-30" v-if="currentTab.slug === 'exams'">
                <exams-tab :client="currentClient"></exams-tab>
            </div>
            <!-- / Content Tab Exams -->

            <!-- Content Tab Exams -->
            <div class="m-t-30" v-if="currentTab.slug === 'companies'">
                <companies-tab :client="currentClient"></companies-tab>
            </div>
            <!-- / Content Tab Exams -->

             <!-- Content Tab Professionals -->
            <div class="m-t-30" v-if="currentTab.slug === 'professionals'">
                <professionals-tab :client="currentClient"></professionals-tab>
            </div>
            <!-- / Content Tab Professionals -->

            <!-- Content Tab Feed -->
            <div class="m-t-30" v-if="currentTab.slug === 'feed'">
                <feed-tab :client="currentClient"></feed-tab>
            </div>
            <!-- / Content Tab Feed -->

        </div>
    </div>
</template>

<script>

    import mainHeader from '@/components/main-header.vue'
    import Avatar from '@/components/avatar.vue'

    import {cleanClientModel} from '@/models/Client'

    import Moment from 'moment'
    import {mapGetters, mapActions} from 'vuex'

    import bus from '@/utils/event-bus'


    export default{
        name: 'client-dashboard-home',

        components:{
            mainHeader,
            Avatar,
            ExamsTab: require('./tabs/exams.vue'),
            EvaluationsTab: require('./tabs/evaluations.vue'),
            RestrictionsTab: require('./tabs/restrictions.vue'),
            TrainningsTab: require('./tabs/trainnings.vue'),
            DietsTab: require('./tabs/diets.vue'),
            PhotosTab: require('./tabs/photos.vue'),
            FeedTab: require('./tabs/feed.vue'),
            companiesTab: require('./tabs/companies.vue'),
            professionalsTab: require('./tabs/professionals.vue'),
            CalendarTab: require('./calendar/calendar.vue')
        },

        data() {
            return{
                interactions: {
                    showProfile: true,
                },
                client: cleanClientModel(),
                tabs: [
                    { name: 'Agenda', slug: 'calendar' },
                    { name: 'Treinamentos', slug: 'trainnings' },
                    { name: 'Dietas', slug: 'diets' },
                    { name: 'Avaliações', slug: 'evaluations' },
                    { name: 'Restrições', slug: 'restrictions' },
                    { name: 'Exames', slug: 'exams' },
                    { name: 'Fotos', slug: 'photos' },
                    { name: 'Feed', slug: 'feed' },
                    { name: 'Profissionais', slug: 'professionals' },
                    { name: 'Empresas', slug: 'companies' },
                ],
                lastTab: 0,
                currentTab: {},
                loadingClient: true,
                categoriesIcons: {
                    exercise: '@/assets/icons/exercise.png'
                }
            }
        },

        computed:{
            ...mapGetters(['currentClient', 'currentUser' ]),
        },

        mounted(){

            this.handleTabs()
            this.getClient()
            this.initSwiperTabs(true);
            this.interactions.showProfile = JSON.parse(localStorage.getItem('client_profile_toggle'))

            bus.$on('close-menu', () => this.initSwiperTabs());

        },

        destroyed(){
            bus.$off('close-menu');
        },

        methods:{

            ...mapActions(['setCurrentClient', 'disableLoader']),

            handleTabs(){
                let that = this

                let tabs = _.filter(that.tabs, function(category) {
                    if(that.currentUser.role == 'professional' && category.slug != 'photos' && category.slug != 'companies' && category.slug != 'professionals'  &&  category.slug != 'feed' && category.slug != 'calendar'  ){
                        return category
                    }

                    if(that.currentUser.role == 'client'){
                        return category
                    }
                });

                that.tabs = tabs
            },

            handleLevel() {
                return this.client.current_xp*100/(this.client.level*100)
            },

            getClient() {
                let that = this
                that.disableLoader(true)
                that.$http.post(`client/show`, {client_id: that.$route.params.client_id})
                    .then(function (response) {

                        that.client = response.data.client
                        that.setCurrentClient(response.data.client)
                        that.disableLoader(false)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            toggleProfile: function(){
                let that = this
                that.interactions.showProfile = !that.interactions.showProfile;
                localStorage.setItem('client_profile_toggle', that.interactions.showProfile);
            },

            initSwiperTabs(first) {

                var that = this;

                setTimeout(() => {
                    let startIndex = 0

                    if (that.$route.query.tab) {
                        startIndex = _.findIndex(that.tabs, { 'slug': that.$route.query.tab })
                    }

                    if (window.localStorage.getItem('last_tab_client') && !that.$route.query.tab) {
                        startIndex = parseInt(window.localStorage.getItem('last_tab_client'))
                    }


                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: startIndex, // default is 1 'trainnings tab'
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            window.localStorage.setItem('last_tab_client', swiper.realIndex)
                            this.currentTab = this.tabs[swiper.realIndex]
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })

                }, 100)
            },


        }

    }
</script>


<style>
    /* Imagem Icon */
    .img-icon { max-width: 100%; max-height: 64px; }

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

    /* subtitles */

    .subtitles {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-flow: row wrap;
        background-color: #fff;
        border-top: 1px solid #ecf0f1;
        padding: 10px;
        border-radius: 0 0 4px 4px;
    }
    .subtitles .subtitle {
        text-align: center;
        width: 25%;
        font-weight: 300;
        font-size: 12px;
    }
    .subtitles .icon {
        width: 15px; height: 15px;
        display: block;
        margin: 0 auto 5px auto;
        font-size: 30px;
        border-radius: 50%;
        border: 2px solid;
        background-color: #fff;
    }

    .subtitles .icon.success { border-color: #00A369; }
    .subtitles .icon.danger { border-color: #E14A45; }
    .subtitles .icon.warning { border-color: #FFCC5F; }
    .subtitles .icon.default { border-color: #383938; }
    .subtitles .icon.info { border-color: #488FEE; }

    /* other styles */
    .box-row { width: 100%; }

    .badge-profile {
        position: absolute;
        right: 15px;
        margin-top: -10px;
    }

    .badge-profile img {
        width: 80px;
    }

</style>
