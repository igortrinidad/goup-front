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
                <div class="container m-t-30">
                    <div class="tabs text-center">
                        <button type="button" :class="{ 'btn transparent tab': true, 'btn-primary': true, 'btn-default': false }">
                            <i class="ion-quote m-r-5"></i>
                            {{ translations.tabs.location }}
                        </button>
                        <button type="button" :class="{ 'btn transparent tab': true, 'btn-primary': true, 'btn-default': false }">
                            <i class="ion-quote m-r-5"></i>
                            {{ translations.tabs.friends }}
                        </button>
                        <button type="button" :class="{ 'btn transparent tab': true, 'btn-primary': true, 'btn-default': false }">
                            <i class="ion-quote m-r-5"></i>
                            {{ translations.tabs.comments }}
                        </button>
                    </div>
                </div>
                <!-- / Tabs -->

                <!-- Photos -->
                <!-- <div class="p-relative">
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
                </div> -->
                <!-- / Photos -->

                <!-- Actions -->
                <div class="actions">
                    <span class="action xl"  @click="goDown()">
                        <span class="ion-chevron-down f-red "></span>
                    </span>

                    <span class="action xl" @click="goUp()">
                        <span class="ion-chevron-up f-green"></span>
                    </span>
                </div>
                <!-- / Actions -->

                <!-- Comments -->
                <div class="m-t-30 text-center">
                    <div class="container">
                        <h3 class="m-t-0 m-b-30">{{ translations.comments.title }}</h3>

                        <div class="swiper-container swiper-comments" ref="swipperComments">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="comment in place.comments" :key="comment.id">
                                    <div class="card card-rounded">
                                        <div class="card-header">
                                            <i class="ion-quote"></i>
                                            <div class="picture-circle picture-circle-m" :style="{ backgroundImage: `url(${ place.avatar })` }">
                                            </div>
                                            <h5 class="f-default">{{ comment.from.full_name }}</h5>
                                        </div>
                                        <div class="card-body card-padding">
                                            <p>{{ comment.content }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>

                    </div>
                </div>
                <!-- / Comments -->

            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import * as translations from '@/translations/places/show'
    import PlaceModel from '@/models/Place'

    export default {
        name: 'general-places-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
                place: {}
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

            initSwiperComments() {
                let that = this

                setTimeout(() => {
                    that.swiperComments = new Swiper(that.$refs.swipperComments, {
                        spaceBetween: 15,
                        slidesPerView: 1,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                    })
                }, 200);
            },

            getPlace() {
                this.place = PlaceModel
                this.initSwiperGallery()
                this.initSwiperComments()
            }
        }
    }
</script>

<style scoped>

    .swiper-comments .ion-quote {
        position: absolute;
        top: -10px;
        left: 10px;
        font-size: 60px;
        opacity: .2;
        transform: rotate(0);
    }

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
