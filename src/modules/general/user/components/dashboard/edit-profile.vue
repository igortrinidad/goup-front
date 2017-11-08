<template>
    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main first-container">

            <!-- Photos -->
            <div class="p-relative">
                <div class="swiper-container swiper-user-photos" ref="userPhotos">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(photo, index) in user.photos"
                            :style="{ backgroundImage: `url(${ photo.photo_url })` }"
                            :key="index"
                        >
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>

                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- / Photos -->

            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/edit-profile'

    export default {
        name: 'general-user-settings-edit-profile',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {}
            }
        },

        computed: {
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
            this.getUser()
        },

        methods: {

            getUser() {
                this.user = User
                console.log(this.user);
                this.initSwiper()
            },

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperUserPhotos = new Swiper(that.$refs.userPhotos, {
                        spaceBetween: 15,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                    })
                }, 200);
            }
        }
    }
</script>

<style scoped>
    .swiper-container.swiper-user-photos { margin-top: -15px; }
    .swiper-container.swiper-user-photos .swiper-slide {
        width: 100%;
        height: 350px !important;
        display: block;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .swiper-container.swiper-user-photos .swiper-button-next,
    .swiper-container.swiper-user-photos .swiper-button-prev {
        background-image: none;
        width: 40%;
        top: 0;
        height: 100%;
        margin-top: 0;
    }
    .swiper-container.swiper-user-photos .swiper-button-next { right: 0; }
    .swiper-container.swiper-user-photos .swiper-button-prev { left: 0; }

    .swiper-pagination { width: 100%; }
</style>
