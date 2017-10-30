<template lang="html">

    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Empresa'"
            :cursor="false"
            :action="function(){ return false }"
            :hasback="true"
        >
        </main-header>


        <div class="wrapper primary padding fixtop">
            <div class="container">
                <div
                    class="picture-circle picture-circle-m"
                    :style="`background-image:url('${ company.avatar }')`"
                >
                </div>
                <h3 class="f-300 text-center m-b-30">{{ company.name }}</h3>
            </div>
        </div>

        <!-- Categories Tabs -->
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
        <!-- Categories Tabs -->

        <div v-if="!placeholder">
            <about-tab v-if="currentTab.slug === 'about'" :company="company"></about-tab>
            <permissions-tab v-if="currentTab.slug === 'permissions'" :company="company"></permissions-tab>
            <professionals-tab v-if="currentTab.slug === 'professionals'" :company="company"></professionals-tab>
            <invoices-tab v-if="currentTab.slug === 'invoices'" :company="company"></invoices-tab>
            <schedules-tab v-if="currentTab.slug === 'schedules'" :company="company"></schedules-tab>
            <plans-tab v-if="currentTab.slug === 'plans'" :company="company"></plans-tab>
            <workdays-tab v-if="currentTab.slug === 'workdays'" :company="company"></workdays-tab>
        </div>

    </div>

</template>

<script>

    import {mapGetters} from 'vuex'
    import { cleanCompanyModel } from '@/models/Company'

    export default {
        name: 'client-dashboard-companies-show',
        components: {
            mainHeader: require('@/components/main-header.vue'),
            aboutTab: require('./tabs/about.vue'),
            permissionsTab: require('./tabs/permissions.vue'),
            professionalsTab: require('./tabs/professionals.vue'),
            workdaysTab: require('./tabs/workdays.vue'),
            plansTab: require('./tabs/plans.vue'),
            schedulesTab: require('./tabs/schedules.vue'),
            invoicesTab: require('./tabs/invoices.vue'),
        },
        data() {
            return {
                company: cleanCompanyModel(),
                placeholder: true,
                tabs: [
                    { name: 'Sobre', slug: 'about' },
                    { name: 'Permissões', slug: 'permissions' },
                    { name: 'Profissionais', slug: 'professionals' },
                    { name: 'Faturas', slug: 'invoices' },
                    { name: 'Planos', slug: 'plans' },
                    { name: 'Horários', slug: 'workdays' },
                    { name: 'Agendamentos', slug: 'schedules' },
                ],
                currentTab:{},
            }
        },

        computed: {
            ...mapGetters(['currentUser']),
        },

        mounted() {
            this.getCompanyForClientDashboard()
        },

        methods: {

            initSwiperTabs() {

                var that = this;

                setTimeout(() => {

                    let startIndex = 0

                    if (that.$route.query.tab) {
                        startIndex = _.findIndex(that.tabs, { 'slug': that.$route.query.tab })
                    }

                    if (window.localStorage.getItem('client_company_show_last_tab') && !that.$route.query.tab) {
                        startIndex = parseInt(window.localStorage.getItem('client_company_show_last_tab'))
                    }

                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 7,
                        initialSlide: startIndex,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            window.localStorage.setItem('client_company_show_last_tab', swiper.realIndex)
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

            getCompanyForClientDashboard() {
                let that = this

                that.placeholder = true

                that.$http.get(`client/company/show/${that.$route.params.company_id}`)
                    .then(function (response) {

                        that.company = response.data.company

                        that.initSwiperTabs()
                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                        
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style scoped>
</style>
