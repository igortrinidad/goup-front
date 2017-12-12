<template>
    <div class="first-container">

        <main-header
            :title="user.full_name"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg">

                    <div
                        class="picture-circle border-picture-eletric-blue"
                        :class="{ 'picture-circle-l': !interactions.scroll, 'picture-circle-p': interactions.scroll }"
                        :style="{ backgroundImage: `url(${ user.avatar })` }"
                    >
                    </div>

                    <!--<p class="text-center m-b-0 m-t-20" v-show="!interactions.is_loading">
                        {{ user.city.name }} - {{ user.city.state }}
                    </p>-->
                    <!-- User Badge -->
                    <div class="status" data-toggle="modal" data-target="#modal-badges">
                        <svg class="svg-container" viewBox="0 0 70 70">
                            <circle class="circle circle-one" :class="progress.progressLevel()" r="30" cx="35" cy="35">
                            </circle>
                        </svg>
                        <!-- Circle -->
                        <span class="icon">
                            <img class="icon-img" src="../../../../assets/icons/status/rock-and-roll.svg" alt="">
                        </span>
                        <button type="button" class="btn btn-primary btn-block">
                            Rock Star
                            <i class="level">{{ translations.level }} 4</i>
                        </button>
                        <!-- Button -->
                    </div>

                    <!-- Tabs -->
                    <div class="m-t-30">
                        <div class="swiper-container no-overflow tabs text-center" ref="tabs">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide tab">
                                    {{ translations.last_interactions }}
                                </div>
                                <div class="swiper-slide tab">
                                    {{ translations.saved }}
                                </div>
                                <div class="swiper-slide tab">
                                    {{ translations.favorited }}
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- / Tabs -->

                    <div class="m-t-30">
                        <!-- Tab Interactions -->
                        <tab-interactions v-show="currentTab === 0"/>
                        <!-- Tab Saves -->
                        <tab-saves v-show="currentTab === 1"/>

                        <tab-favorites v-show="currentTab === 2"/>
                    </div>

                    <!-- Modal User Badges -->
                    <div id="modal-badges" class="modal we-fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title">{{ translations.modal_badges.title }}</h3>
                                </div>
                                <!-- Modal Body -->
                                <div class="modal-body">
                                    <div class="status full">
                                        <!-- Circle -->
                                        <span class="circle-profile primary xl icon">
                                            <img class="icon-img" src="../../../../assets/icons/status/rock-and-roll.svg" alt="">
                                        </span>
                                        <button type="button" class="btn btn-primary btn-block">
                                            Rock Star
                                            <i class="level">{{ translations.level }} 4</i>
                                        </button>
                                        <!-- Button -->
                                    </div>
                                    <div class="status full">
                                        <!-- Circle -->
                                        <span class="circle-profile primary xl icon">
                                            <img class="icon-img" src="../../../../assets/icons/status/dj.svg" alt="">
                                        </span>
                                        <button type="button" class="btn btn-primary btn-block">
                                            Baladeiro
                                            <i class="level">{{ translations.level }} 2</i>
                                        </button>
                                        <!-- Button -->
                                    </div>
                                    <div class="status full">
                                        <!-- Circle -->
                                        <span class="circle-profile primary xl icon">
                                            <img class="icon-img" src="../../../../assets/icons/status/005-home.svg" alt="">
                                        </span>
                                        <button type="button" class="btn btn-primary btn-block">
                                            Família
                                            <i class="level">{{ translations.level }} 1</i>
                                        </button>
                                        <!-- Button -->
                                    </div>
                                </div>
                                <!-- / Modal Body -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">{{ translations.modal_badges.close }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / Modal User Badges -->

                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { cleanEventModel } from '@/models/Event'
    import * as UserModel from '@/models/User'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'
    import cardPlaceholder from '@/components/card-placeholder'
    import tabInteractions from './show_partials/tab-interactions'
    import tabSaves from './show_partials/tab-saves'
    import tabFavorites from './show_partials/tab-favorites'
    import bus from '@/utils/event-bus';

    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
            cardPlaceholder,
            tabInteractions,
            tabSaves,
            tabFavorites
        },

        data () {
            return {
                interactions: {
                    is_loading: true
                },
                user: UserModel.CleanUserModel(),
                events: [],
                nextPage: 1,
                currentTab: 0,
                progress: 15
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'language']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getUser()
        },

        methods: {

            getUser() {
                let that = this

                that.$http.get(`user/show/${that.$route.params.user_slug}`)
                    .then(function (response) {

                        that.interactions.is_loading = false

                        that.user = response.data.user

                        that.initSwiperTabs()

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            initSwiperTabs() {
                let that = this

                setTimeout(() => {
                    that.swiperTabs = new Swiper(that.$refs.tabs, {
                        initialSlide: 0,
                        slidesPerView: 2,
                        spaceBetween: 5,
                        centeredSlides: true,
                        slideActiveClass: 'active',
                        slideToClickedSlide: true,
                        onSlideChangeEnd: swiper => {
                            that.currentTab = swiper.realIndex

                            if( that.currentTab === 1){
                                bus.$emit('load-created')
                            }

                            if( that.currentTab === 2){
                                bus.$emit('load-favorite')
                            }
                        },
                    })
                }, 200);
            },
        }
    }
</script>

<style scoped>
    /* Picture */
    /*.picture-circle {
        position: absolute; transition: ease .3s;
        top: 30px;
        index: 10;
    }

    .picture-circle-l { left: calc(50% - 50px); }
    .picture-circle-m { left: calc(50% - 43px); }
    .picture-circle-p { left: calc(50% - 33px); }*/
    .svg-container {
        position: absolute;
        width: 70px; height: 70px;
        top: calc(50% - 35px);
        left: -15px;
        z-index: 1;
    }
</style>
