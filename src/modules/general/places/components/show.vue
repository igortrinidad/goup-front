<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main" v-if="place.id">

                <!-- Place Name, Description, City And State -->
                <div class="text-center">
                    <h3 class="m-t-10">{{ place.name }}</h3>

                    <p>{{ place.description }}</p>

                    <h5>
                        <i class="ion-ios-location m-r-5"></i>
                        {{ `${ place.city } - ${ place.state }` }}
                    </h5>
                </div>
                <!-- Place Name, Description, City And State -->

                <!-- Card Statics -->
                <div class="container text-center m-t-30">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="base-infos">
                                <div class="row custom">
                                    <div class="col-xs-6 col-custom divider">
                                        <i class="ion-android-calendar f-primary"></i>
                                        <span class="f-primary">{{ place.best_day }}</span>
                                    </div>
                                    <div class="col-xs-6 col-custom">
                                        <i class="ion-ios-wineglass f-primary"></i>
                                        <span class="f-primary">{{ place.style }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Card Statics -->

                <!-- Tabs -->
                <div class="m-t-30">
                    <div class="swiper-container tabs text-center" ref="tabs">
                        <div class="swiper-wrapper">
                            <div :class="{ 'swiper-slide tab': true, 'active': false }">
                                <i class="tab-icon ion-ios-location m-r-5"></i>
                                {{ translations.tabs.location }}
                            </div>
                            <div :class="{ 'swiper-slide tab': true, 'active': false }">
                                <i class="tab-icon ion-ios-people m-r-5"></i>
                                {{ translations.tabs.friends }}
                            </div>
                            <div :class="{ 'swiper-slide tab': true, 'active': false }">
                                <i class="tab-icon ion-quote m-r-5"></i>
                                {{ translations.tabs.comments }}
                            </div>
                        </div>

                    </div>
                </div>
                <!-- / Tabs -->

                <!-- Tab Content -->
                <div class="m-t-30">
                    <div class="container">
                        <!-- Tab Location -->
                        <tab-location v-if="currentTab === 0"></tab-location>
                        <!-- Tab Location -->

                        <!-- Tab Friends -->
                        <tab-friends  v-if="currentTab === 1"></tab-friends>
                        <!-- Tab Friends -->

                        <!-- Tab Comments -->
                        <tab-comments :comments="place.comments" v-if="currentTab === 2"></tab-comments>
                        <!-- Tab Comments -->
                    </div>
                </div>
                <!-- / Tab Content -->

            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import tabLocation from './show_partials/tab-location.vue'
    import tabComments from './show_partials/tab-comments.vue'
    import tabFriends from './show_partials/tab-friends.vue'

    import * as translations from '@/translations/places/show'
    import PlaceModel from '@/models/Place'

    export default {
        name: 'general-places-show',

        components: {
            mainHeader,
            tabLocation,
            tabComments,
            tabFriends
        },

        data () {
            return {
                placeholder: true,
                place: {},
                currentTab: 1
            }
        },

        computed: {
            ...mapGetters(['checkLanguage']),

            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getPlace()
        },

        methods: {

            initSwiperTabs() {
                let that = this

                setTimeout(() => {
                    that.swiperTabs = new Swiper(that.$refs.tabs, {
                        initialSlide: 1,
                        slidesPerView: 2,
                        spaceBetween: 5,
                        centeredSlides: true,
                        slideActiveClass: 'active',
                        slideToClickedSlide: true,
                        onSlideChangeEnd: swiper => {
                            that.currentTab = swiper.realIndex
                        },
                    })
                }, 200);
            },

            initSwiperGallery() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar',
                    })
                }, 200);
            },

            getPlace() {
                this.place = PlaceModel
                this.initSwiperGallery()
                this.initSwiperTabs()
            }
        }
    }
</script>

<style scoped>
    .base-infos {
        border: 1px solid rgba(255, 255, 255, .3);
        border-radius: 20px;
        padding: 7px 0;
    }

    .base-infos .divider {
        border-right: 1px solid rgba(255, 255, 255, .3);
    }
    .base-infos i {
        display: block;
        font-size: 24px;
    }

    .base-infos span {
        display: block;
        text-transform: initial;
        font-size: 14px;
    }

</style>
