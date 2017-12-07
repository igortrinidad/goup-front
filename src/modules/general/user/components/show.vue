<template>
    <div class="first-container">

        <main-header
            :title="''"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div
            class="picture-circle border-picture-eletric-blue"
            :class="{ 'picture-circle-l': !scroll, 'picture-circle-m': scroll }"
            :style="{ backgroundImage: `url(${ user.avatar })` }"
        >
        </div>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">

                    <!-- No Events -->
                    <div class="m-t-30" v-if="!events.length">
                        <h3 class="text-center">{{ translations.no_events }}</h3>
                    </div>
                    <!-- / No Events -->

                    <div id="cards" :style="{ height: `${ 275 * events.length }px` }">
                        <div
                            class="card"
                            v-for="(event, indexEvents) in events"
                            :class="{ 'stacked': !scroll }"
                            :style="[ scroll ? { top: `${ 275 * indexEvents }px` } : { top: 0 } ]"
                        >
                            <h3 class="f-default m-0">{{ event.name }} - {{ indexEvents }}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { cleanEventModel } from '@/models/Event'
    import UserModel from '@/models/User'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'

    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {},
                user: {},
                events: [],
                scroll: false
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'language']),

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
            let that = this

            $('.navbar.navbar-default').addClass('transparent')

            that.getUser()

            $(document).scroll(function() {
                let scrollTop = $(document).scrollTop();

                if (scrollTop > 100) {
                    that.scroll = true
                } else {
                    that.scroll = false
                }
            })
        },

        beforeDestroy() {
            $('.navbar.navbar-default').removeClass('transparent')
        },

        methods: {

            getUser() {
                let that = this

                that.user = UserModel
                that.getUserEvents()
            },

            getUserEvents() {
                let that = this
                let event = cleanEventModel()

                event.name = 'Party',
                event.slug = 'party',
                event.cover = 'https://s3.amazonaws.com/goup-assets/img/categories/party.png'
                event.city.name = 'Belo Horizonte'
                event.city.state = 'MG'
                event.value = 0
                event.distance = 59
                event.favorited_count = 1

                that.events = [ event, event, event, event, event ]

            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

        }
    }
</script>

<style scoped>
    .swiper-container.swiper-vertical {
        overflow: visible !important;
        height: 255px;
    }
    .swiper-container.swiper-vertical .swiper-wrapper {
        align-items: center
    }

    .swiper-slide.invisible { opacity: 0; }

    .divider {
        border-left: 1px solid #dfdfdf;
    }

    /* Cards */
    #cards {
        position: relative;
        width: 100%;
        margin-top: 60px;
    }

    #cards .card {
        position: absolute;
        margin-bottom: 0;
        height: 255px;
        transition: ease .3s;
        top: 0; left: 0; right: 0;
    }

    #cards .card.stacked:nth-child(1) { z-index: 20; }

    #cards .card.stacked:nth-child(2) {
        transform: scale(.95) translateY(-20px);
        z-index: 10;
        box-shadow: inset 0 0  50px rgba(0, 0, 0, .2);
    }

    #cards .card.stacked:nth-child(3) {
        transform: scale(.90) translateY(-40px);
        z-index: 5;
        box-shadow: inset 0 0  100px rgba(0, 0, 0, .4);
    }

    .picture-circle {
        position: fixed;
        top: 10px;
        z-index: 10;
        transition: ease .1s;
    }

    .picture-circle-l { left: calc(50% - 50px) }
    .picture-circle-m { left: calc(50% - 43px) }
</style>
