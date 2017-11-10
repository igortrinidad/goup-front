<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">
                <h3 class="m-t-0 m-b-30">{{ translations.comments.title }}</h3>

                <!-- Comments List -->
                <div class="swiper-container swiper-comments" ref="swipperComments">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="comment in place.comments" :key="comment.id">
                            <div class="card card-rounded m-b-10">
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
                </div>
                <div class="swiper-pagination"></div>

                <!-- / Comments List -->

                <!-- New Comment -->


                <div v-if="interactions.newComment">
                    <form class="m-t-30">
                        <div class="form-group">
                            <textarea
                                class="form-control"
                                rows="4"
                                v-model="newComment.content"
                                :placeholder="`${ translations.comments.commentPlaceholder } ${ place.name }`"
                            >
                            </textarea>
                        </div>
                    </form>
                </div>

                <button
                    type="button"
                    class="btn btn-primary transparent m-t-30"
                    @click="handleNewComment()"
                    :disabled="interactions.newComment && !newComment.content"
                >
                    {{ interactions.newComment ? translations.comments.comment : translations.comments.newComment }}
                </button>

                <!-- / New Comment -->

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
            place: {
                type: Object,
                required: true
            }
        },

        data () {
            return {
                placeholder: true,
                interactions: {
                    newComment: false
                },
                newComment: {
                    id: 'commentID01',
                    content: '',
                    from: {
                        last_name: 'Doe',
                        full_name: 'John Doe',
                        avatar: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png',
                    }
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
            this.initSwiperComments()
        },

        methods: {

            handleNewComment() {
                if (this.interactions.newComment) {
                    this.place.comments.unshift(this.newComment)
                    this.interactions.newComment = false
                    successNotify('', this.translations.successComment)
                    this.initSwiperComments()
                } else {
                    this.interactions.newComment = true
                }
            },

            initSwiperComments() {
                let that = this

                setTimeout(() => {
                    if (that.swiperComments) {
                        that.swiperComments.destroy()
                    }
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
    .swiper-pagination {
        width: 100%;
        position: relative;
        top: 0; left: 0; right: 0; bottom: 0;
    }
</style>
