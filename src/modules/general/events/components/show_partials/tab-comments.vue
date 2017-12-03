<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">
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

                <!-- Modal New Comment -->

                <div class="modal" id="modal-new-comment" tabindex="-1" role="dialog" aria-labelledby="modal-new-comment" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <span
                                    class="label label-primary transparent btn-close"
                                    data-dismiss="modal"
                                >
                                    <i class="ion-close-round"></i>
                                </span>
                                <h3 class="title text-center">New Comment</h3>
                            </div>
                            <div class="modal-body">
                                <form class="m-t-30">
                                    <div class="form-group">
                                        <textarea
                                            id="new-comment"
                                            class="form-control"
                                            rows="4"
                                            v-model="newComment.content"
                                            maxlength="120"
                                            :placeholder="`${ translations.comments.commentPlaceholder } ${ place.name }`"
                                        >
                                        </textarea>
                                    </div>

                                    <!-- Character Count -->
                                    <small class="f-danger" v-show="120 - newComment.content.length > 0">
                                        {{ translations.comments.length }}
                                        {{ 120 - newComment.content.length }}
                                    </small>
                                    <!-- /Character Count -->

                                </form>

                                <button
                                    type="button"
                                    class="btn btn-primary transparent m-t-30"
                                    v-show="120 - newComment.content.length <= 60"
                                    data-dismiss="modal"
                                    @click="handleNewComment()"
                                >
                                    {{ translations.comments.comment }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-primary transparent m-t-30"
                    data-toggle="modal"
                    data-target="#modal-new-comment"
                >
                    {{ translations.comments.newComment }}
                </button>

                <!-- / Modal New Comment -->

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/events/show'

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
            ...mapGetters(['language']),

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
            this.initSwiperComments()
        },

        methods: {

            handleNewComment() {
                this.place.comments.unshift(this.newComment)
                this.interactions.newComment = false
                successNotify('', this.translations.comments.successComment)
                this.initSwiperComments()
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
