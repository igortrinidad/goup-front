<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>



        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">

                <div v-if="interactions.placeNotFound">

                    <h3 class="text-center m-t-30">{{ translations.place_not_found }}</h3>

                </div>

                <!-- Place Content -->
                <div class="m-b-30" v-if="!interactions.placeNotFound && place.id">
                    <!-- Photos -->
                    <div class="p-relative">
                        <div class="swiper-container swiper-gallery" ref="galleryPhotos">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide"
                                    v-for="(photo, index) in place.photos"
                                    :style="{ backgroundImage: `url(${ photo.photo_url })` }"
                                    :key="index"
                                >
                                </div>
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-scrollbar"></div>
                        </div>
                    </div>
                    <!-- / Photos -->

                    <!-- Place Name, Description, City And State -->
                    <div class="text-center">
                        <h3 class="m-t-30">{{ place.name }}</h3>

                        <p>{{ place.description }}</p>

                        <h5>
                            <i class="ion-ios-location m-r-5"></i>
                            {{ `${ place.city } - ${ place.state }` }}
                        </h5>

                        <!-- Call -->
                        <div class="m-t-30" v-if="place.phone">
                            <a :href="`tel:${ place.phone }`" class="btn btn-info transparent">
                                <i class="ion-ios-telephone m-r-5"></i>{{ translations.call }}
                            </a>
                        </div>
                        <!-- Call -->


                        <div class="container m-t-30">
                            <ul class="list-group list-rounded m-b-0 m-t-10">
                                <li class="list-group-item">
                                    <i class="icon ion-android-calendar m-r-5 f-primary"></i>
                                    <span><strong>{{ translations.best_day }}:</strong> {{ place.best_day }}</span>
                                </li>
                                <li class="list-group-item">
                                    <i class="icon ion-wineglass m-r-5 f-primary"></i>
                                    <span><strong>{{ translations.style }}:</strong> {{ place.style }}</span>
                                </li>
                                <li class="list-group-item">
                                    <i class="icon ion-android-time m-r-5 f-primary"></i>
                                    <span><strong>{{ translations.is_opened }}</strong> {{ translations.yes }}</span>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <!-- Place Name, Description, City And State -->

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
                        <div class="">
                            <!-- Tab Location -->
                            <tab-location :place="place" v-if="currentTab === 0"></tab-location>
                            <!-- Tab Location -->

                            <!-- Tab Friends -->
                            <tab-friends  v-if="currentTab === 1"></tab-friends>
                            <!-- Tab Friends -->

                            <!-- Tab Comments -->
                            <tab-comments :place="place" v-if="currentTab === 2"></tab-comments>
                            <!-- Tab Comments -->
                        </div>
                        <!-- / Tab Content -->
                    </div>
                    <!-- / Place Content -->

                </div>
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
                currentTab: 1,
                interactions: {
                    placeNotFound: false
                }
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
                let placeFromLocalStorage = JSON.parse(localStorage.getItem('places'))[0]

                if (this.$route.params.place_slug === placeFromLocalStorage.slug) {
                    this.place = placeFromLocalStorage

                    this.interactions.placeNotFound = false
                    this.initSwiperGallery()
                    this.initSwiperTabs()
                } else {
                    this.interactions.placeNotFound = true
                }
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

    .list-rounded .list-group-item .icon {
        font-size: 24px;
        display: inline-flex;
        width: 40px; height: 40px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 2px solid #FF4B89;
    }

    .list-rounded .list-group-item span { display: block; margin-top: 10px; }

</style>
