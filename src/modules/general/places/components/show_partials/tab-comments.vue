<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">
                <h3 class="m-t-0 m-b-30">{{ translations.comments.title }}</h3>

                <div class="swiper-container swiper-comments" ref="swipperComments">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="comment in comments" :key="comment.id">
                            <div class="card card-rounded">
                                <div class="card-header">
                                    <i class="ion-quote"></i>
                                    <div class="picture-circle picture-circle-m" :style="{ backgroundImage: `url(${ comment.from.avatar })` }">
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/places/show'

    export default {
        name: 'general-places-show-tab-comments',

        components: {
        },

        props: {
            comments: {
                type: Array,
                required: true
            }
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
            this.initSwiperComments()
        },

        methods: {

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
