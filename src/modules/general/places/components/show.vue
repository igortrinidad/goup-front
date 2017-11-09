<template>
    <div class="first-container">

        <main-header
            :title="place.id ? place.name : 'Voltar'"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main container" v-if="place.id">
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
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import * as translations from '@/translations/places/show'
    import CompanyModel from '@/models/Company'

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
            this.getCompany()
        },

        methods: {

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar',
                        paginationClickable: true,
                    })
                }, 200);
            },

            getCompany() {
                this.place = CompanyModel
                this.initSwiper()
            }
        }
    }
</script>

<style scoped>

</style>
