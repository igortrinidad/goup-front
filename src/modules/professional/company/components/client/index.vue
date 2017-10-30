<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Gerenciar cliente'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper primary padding fixtop">
            <div class="container">
                <img class="avatar center ls" :src="client.avatar"/>
                <h3 class="f-300 text-center">{{client.full_name}}</h3>
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


        <tab-about :client="client" v-if="currentTab.slug == 'about'"></tab-about>
        <tab-invoices :client="client" v-if="currentTab.slug == 'invoices'"></tab-invoices>
        <tab-plans :client="client" v-if="currentTab.slug == 'plans'"></tab-plans>
        <tab-schedules :client="client" v-if="currentTab.slug == 'schedules'"></tab-schedules>
        <tab-workdays :client="client" v-if="currentTab.slug == 'workdays'"></tab-workdays>
        <tab-observations :client="client" v-if="currentTab.slug == 'observations'"></tab-observations>



    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import {mapGetters, mapActions} from 'vuex'

    import {cleanClientModel} from '@/models/Client'

    import bus from '@/utils/event-bus'

    export default {
        name: 'companies-client-show',
        components: {
            mainHeader,
            tabAbout: require('./tabs/about.vue'),
            tabInvoices: require('./tabs/invoices.vue'),
            tabSchedules: require('./tabs/schedules.vue'),
            tabWorkdays: require('./tabs/workdays.vue'),
            tabObservations: require('./tabs/observations.vue'),
            tabPlans: require('./tabs/plans.vue')
        },
        data() {
            return {
                interactions: {
                },
                tabs: [
                    { name: 'Sobre', slug: 'about' },
                    { name: 'Faturas', slug: 'invoices' },
                    { name: 'Agendamentos', slug: 'schedules' },
                    { name: 'Horários', slug: 'workdays' },
                    { name: 'Planos', slug: 'plans' },
                    { name: 'Observações', slug: 'observations' },
                ],
                lastTab: 0,
                currentTab: {},
                client: cleanClientModel(),
            }
        },
        computed: {
            ...mapGetters(['AuthToken', 'currentUser', 'currentCompany']),
        },

        mounted() {

            this.getClient()
            this.getCompany()
            this.initSwiperTabs();

            bus.$on('emit-get-client', (id) => this.getClient());

            bus.$on('go-to-tab', (tab) => {
                window.localStorage.setItem('last_tab_company_client', _.findIndex(this.tabs, {slug: tab}))
                this.initSwiperTabs()
            })

        },

        destroyed(){
            bus.$off('emit-get-client');
            bus.$off('go-to-tab');
        },

        methods: {

            ...mapActions(['disableLoader', 'setLoading', 'setCurrentCompany']),

            getClient: function () {
                let that = this

                var data = {
                    company_id: that.$route.params.company_id,
                    client_id: that.$route.params.client_id,
                }

                that.$http.post(`professional/company/client/show`, data)
                    .then(function (response) {
                        that.client = response.data.client
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getCompany: function(){
                let that = this

                that.disableLoader(true)

                that.$http.get(`professional/company/show/${that.$route.params.company_id}`)
                    .then(function (response) {

                        that.company = response.data.company;
                        that.setCurrentCompany(response.data.company)
                        that.disableLoader(false)
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.disableLoader(false)
                    });
            },

            initSwiperTabs(first) {

                var that = this;

                setTimeout(() => {
                    if (window.localStorage.getItem('last_tab_company_client')) {
                        that.lastTab = parseInt(window.localStorage.getItem('last_tab_company_client'))
                    }

                    that.swiperTabs = new Swiper(that.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: that.lastTab,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            window.localStorage.setItem('last_tab_company_client', swiper.realIndex)
                            that.currentTab = that.tabs[swiper.realIndex]
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


<style scoped>

    .img-profile {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        object-fit: cover;
    }

    .line-item-group {
        margin: 5px 0;
        border: 1px solid RGBA(56, 57, 56, 0.15);
        padding: 5px;
        border-radius: 4px;
    }

    .selected-slot {
        background-color: #fff !important;
        color: #00A369 !important;
        border:1px solid #00A369 !important;
    }

    .selected-slot:hover {
        background-color: #fff !important;
        color: #00A369 !important;
        border:1px solid #00A369 !important;
    }

</style>
