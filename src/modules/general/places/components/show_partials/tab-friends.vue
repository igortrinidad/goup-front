<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">

                <!-- Friends -->
                <h3 class="m-t-0 m-b-30">{{ translations.tabs.friends }}</h3>

                <div class="swiper-container" ref="swiperFriends" v-if="users.length">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="user in users">
                            <div
                                class="picture-circle picture-circle-m border-picture-eletric-blue"
                                :style="{ backgroundImage: `url(${ user.avatar })` }"
                            >
                            </div>
                            <h4 class="text-center t-overflow">{{ user.full_name }}</h4>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-success"></div>
                <!-- Friends -->

                <!-- Users -->
                <h3 class="m-t-30 m-b-30">{{ translations.tabs.users }}</h3>

                <div class="swiper-container" ref="swiperUsers" v-if="users.length">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="user in users">
                            <div
                                class="picture-circle picture-circle-m border-picture-eletric-yellow"
                                :style="{ backgroundImage: `url(${ user.avatar })` }"
                            >
                            </div>
                            <h4 class="text-center t-overflow">{{ user.full_name }}</h4>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-info"></div>
                <!-- Users -->

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import UserModel from '@/models/User'
    import * as translations from '@/translations/places/show'

    export default {
        name: 'general-places-show-tab-friends',

        components: {
        },

        props: {

        },

        data () {
            return {
                placeholder: true,
                place: {},
                users: []
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
            this.getUsers()
        },

        methods: {

            initSwiper() {
                let that = this

                setTimeout(() => {
                    that.swiperFriends = new Swiper(that.$refs.swiperFriends, {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        pagination: '.swiper-pagination-success',
                        paginationClickable: true,
                    })

                    that.swiperUsers = new Swiper(that.$refs.swiperUsers, {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        pagination: '.swiper-pagination-info',
                        paginationClickable: true,
                    })

                }, 200);
            },

            getUsers() {
                this.users = [ UserModel, UserModel, UserModel, UserModel ]
                this.initSwiper()
            }
        }
    }
</script>

<style scoped>

    /* user border colored */
    .border-picture-eletric-blue{ border: 2px solid #8BF3FB; }
    .border-picture-eletric-yellow{ border: 2px solid #FFFD7B; }

    .swiper-pagination {
        width: 100%;
        position: relative;
        top: 0; left: 0; right: 0; bottom: 0;
    }

</style>
