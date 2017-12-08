<template>
    <div class="first-container">

        <main-header
            :title="user.full_name"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <div
            class="picture-circle border-picture-eletric-blue"
            :class="{ 'picture-circle-l': !interactions.scroll, 'picture-circle-p': interactions.scroll }"
            :style="{ backgroundImage: `url(${ user.avatar })` }"
        >
        </div>

        <div id="thing" ></div>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg m-t-20">

                    <!-- No Events -->
                    <div class="m-t-30" v-if="!events.length">
                        <h3 class="text-center">{{ translations.no_events }}</h3>
                    </div>
                    <!-- / No Events -->

                    <!-- User Badge -->
                    <div class="goup-badge">
                        <!-- Circle -->
                        <span class="circle-profile primary xl icon">
                            <i class="ion-ios-heart"></i>
                        </span>
                        <button type="button" class="btn btn-primary btn-block">
                            Romântico
                            <i class="level">Nível 1</i>
                        </button>
                        <!-- Button -->
                    </div>

                    <!-- Cards -->
                    <div id="cards" :style="{ height: `${ 275 * events.length }px`, border: '1px solid red' }" data-0="background:rgba(0, 0, 0, 0);" data-700="background:rgba(0, 0, 0, 1);">
                        <router-link
                            tag="div"
                            class="card"
                            v-for="(event, indexEvents) in events"
                            v-if="interactions.scrollAnimationFinished || indexEvents <= 2"
                            :key="indexEvents"
                            :to="{ name: 'general.events.show', params: { event_slug: event.slug } }"
                            :class="{ 'stacked': !interactions.scroll }"
                            :style="[ interactions.scroll ? { top: `${ 275 * indexEvents }px` } : { top: 0 } ]"
                            :data-0="`top: 0`"
                            :data-100="`top: ${ 275 * indexEvents }px`"
                        >
                            <!-- Card Header -->
                            <div
                                class="card-header cover p-5"
                                :style="{
                                    backgroundImage: `url(${ event.cover })`,
                                    height: '150px',
                                    borderRadius: '6px 6px 0 0'
                                }"
                            >
                                <span class="event-ranking">
                                    {{ indexEvents }}º
                                </span>
                            </div>
                            <!-- Card Body -->
                            <div class="card-body card-padding">
                                <h4 class="m-b-5">{{ event.name }}</h4>
                                <div style="opacity: .8;">
                                    <p class="m-b-5">{{ event.description }}</p>
                                    <span class="d-block m-0 f-12">
                                        <strong>{{ event.city.name }} - {{ event.city.state }}</strong>
                                    </span>
                                </div>
                            </div>
                            <!-- Card Footer -->
                            <div class="card-footer p-5">
                                <div class="row">
                                    <div class="col-xs-8" style="opacity: .8;">
                                        <small>
                                            <i class="ion-location m-r-5"></i>{{ handleDistance(event.distance) }}
                                        </small>
                                        <small class="divider p-l-10 m-l-10">
                                            <span v-show="event.value > 0">{{ event.value | formatCurrency }}</span>
                                            <span v-show="event.value === 0">{{ translations.free }}</span>
                                        </small>
                                    </div>
                                    <div class="col-xs-4 text-right">
                                        <small class="f-primary">
                                            <i class="ion-ios-star m-r-5"></i>{{ event.favorited_count }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <!-- /CARDS -->

                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { cleanEventModel } from '@/models/Event'
    import UserModel from '@/models/User'

    import skrollr from 'skrollr'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'


    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
        },

        data () {
            return {
                interactions: {
                    scroll: false,
                    scrollAnimationFinished: false,
                },
                user: {},
                events: [],

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

            that.getUser()

            that.skrollr = skrollr.init();

            // $(document).on('scroll', function() {
            //     let scrollTop = $(document).scrollTop();
            //
            //     if (scrollTop > 150) {
            //         that.interactions.scroll = true
            //         setTimeout(function() {
            //             that.interactions.scrollAnimationFinished = true
            //         }, 1000);
            //
            //     } else {
            //         that.interactions.scroll = false
            //         that.interactions.scrollAnimationFinished = false;
            //     }
            // })
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

    #thing {
    	width:55px;
    	height:55px;
    	border-radius:16px;
    	background:#000;
        margin-top: 300px;
    }

    .divider {
        border-left: 1px solid #dfdfdf;
    }

    .saved-places-title{
        margin-top: 100px;
    }
    /* Cards */
    #cards {
        position: relative;
        width: 100%;
        margin-top: 70px;
    }

    #cards .card {
        position: absolute;
        margin-bottom: 0;
        height: 255px;
        transition: ease-in-out .5s;
        top: 0; left: 0; right: 0;
    }

    .card:nth-child(1){z-index: 3;}
    .card:nth-child(2){z-index: 2;}
    .card:nth-child(3){z-index: 1;}

    #cards .card.stacked:nth-child(2) {
        transform: scale(.95) translateY(-20px);
        box-shadow: inset 0 0  50px rgba(0, 0, 0, .2);
    }

    #cards .card.stacked:nth-child(3) {
        transform: scale(.90) translateY(-40px);
        box-shadow: inset 0 0  100px rgba(0, 0, 0, .4);
    }

    /* Picture */
    .picture-circle { position: fixed; transition: ease .3s; }

    .picture-circle.full {
        width: 100%;
        height: 60%;
        border-radius: 0;
        left: 0;
        top: 80px;
        z-index: 0;
        border: none;
    }

    .picture-circle.full:before {
        content: '';
        position: absolute;
        left: 0; bottom: 0; right: 0;
        width: 100%;
        height: 40%;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(87,31,159,1) 100%);
    }

    .picture-circle-l { top: 90px; left: calc(50% - 50px); z-index: 10; }
    .picture-circle-m { top: 90px; left: calc(50% - 43px); z-index: 10; }
    .picture-circle-p { top: 90px; left: calc(50% - 33px); z-index: 10; }

    /* Badge */
    .goup-badge {
        width: 220px;
        margin: 92px auto 0 auto;
        position: relative;
    }

    .goup-badge .icon {
        position: absolute;
        top: calc(50% - 30px);
        left: 0;
    }

    .goup-badge .btn {
        text-align: left;
        padding: 3px 3px 3px 75px !important;
        font-size: 15px;
    }

    .goup-badge .level {
        display: block;
        color: #fff;
        font-size: 13px;
    }

</style>
