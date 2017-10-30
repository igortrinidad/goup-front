<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Gerenciar profisisonal'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper primary padding fixtop">
            <div class="container">
                <img class="avatar center ls" :src="professional.avatar"/>
                <h3 class="f-300 text-center">{{professional.full_name}}</h3>
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

        <tab-about :professional="professional" v-if="currentTab.slug == 'about'"></tab-about>
        <tab-permissions :professional="professional" v-if="currentTab.slug == 'permissions'"></tab-permissions>
        <tab-schedules :professional="professional" v-if="currentTab.slug == 'schedules'"></tab-schedules>
        <tab-workdays :professional="professional" v-if="currentTab.slug == 'workdays'"></tab-workdays>


    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import {mapGetters, mapActions} from 'vuex'

    import {cleanProfessionalModel} from '@/models/Professional'

    import bus from '@/utils/event-bus'

    export default {
        name: 'companies-professional-show',
        components: {
            mainHeader,
            tabAbout: require('./tabs/about.vue'),
            tabSchedules: require('./tabs/schedules.vue'),
            tabWorkdays: require('./tabs/workdays.vue'),
            tabPermissions: require('./tabs/permissions.vue')
        },
        data() {
            return {
                interactions: {
                },
                tabs: [
                    { name: 'Sobre', slug: 'about' },
                    { name: 'Agendamentos', slug: 'schedules' },
                    { name: 'Horários', slug: 'workdays' },
                    { name: 'Permissões', slug: 'permissions' },
                ],
                lastTab: 0,
                currentTab: {},
                professional: cleanProfessionalModel(),
            }
        },
        computed: {
            ...mapGetters(['AuthToken', 'currentUser', 'currentCompany']),
        },

        mounted() {

            //this.getProfessional()
            this.initSwiperTabs();

        },

        methods: {

            ...mapActions(['disableLoader', 'setLoading', 'setCurrentCompany']),

            getProfessional: function () {
                let that = this

                var data = {
                    company_id: that.$route.params.company_id,
                    professional_id: that.$route.params.professional_id,
                }

                that.$http.post(`professional/company/client/show`, data)
                    .then(function (response) {
                        that.client = response.data.client
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },


            initSwiperTabs(first) {

                var that = this;

                setTimeout(() => {
                    if (window.localStorage.getItem('last_tab_company_professional')) {
                        that.lastTab = parseInt(window.localStorage.getItem('last_tab_company_professional'))
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
                            window.localStorage.setItem('last_tab_company_professional', swiper.realIndex)
                            that.currentTab = that.tabs[swiper.realIndex]

                            console.log(that.currentTab)
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
