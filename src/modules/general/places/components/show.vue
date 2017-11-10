<template>
    <div class="first-container">

        <main-header
            :title="place.id ? place.name : 'Voltar'"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main" v-if="place.id">
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

                <!-- Description -->
                <div class="m-t-30 text-center">
                    <div class="container">
                        <h3 class="m-t-0">{{ translations.about.title }}</h3>
                        <p>{{ place.description }}</p>
                    </div>
                </div>
                <!-- / Description -->

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

</style>
