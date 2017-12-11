<template>
    <div class="first-container">

        <main-header
            :title="user.full_name"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">
                <div class="container bg">

                    <div
                        class="picture-circle border-picture-eletric-blue"
                        :class="{ 'picture-circle-l': !interactions.scroll, 'picture-circle-p': interactions.scroll }"
                        :style="{ backgroundImage: `url(${ user.avatar })` }"
                    >
                    </div>

                    <p class="text-center m-b-0 m-t-20" v-show="!interactions.is_loading">
                        {{ user.city.name }} - {{ user.city.state }}
                    </p>

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
                    <div class="cards" infinite-wrapper>
                        <router-link
                            tag="div"
                            class="card"
                            v-for="(event, indexEvents) in events"
                            :key="indexEvents"
                            :to="{ name: 'general.events.show', params: { event_slug: event.slug } }"
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
    import * as UserModel from '@/models/User'

    import * as translations from '@/translations/user/show'

    import mainHeader from '@/components/main-header'
    import cardPlaceholder from '@/components/card-placeholder'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: 'general-user-show',

        components: {
            mainHeader,
            InfiniteLoading,
            cardPlaceholder
        },

        data () {
            return {
                interactions: {
                    is_loading: true
                },
                user: UserModel.CleanUserModel(),
                events: [],
                nextPage: 1

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
            this.getUser()
        },

        methods: {

            getUser() {
                this.user = UserModel.Default()
                console.log(this.user)
                this.getUserEvents()
            },

            getUserEvents($state) {

                let that = this

                that.interactions.is_loading = true
                that.$http.get(`user/events/list?page=${that.nextPage}`)
                    .then(function (response) {

                        that.events = response.data.events
                        that.pagination = response.data.pagination

                        that.interactions.is_loading = false

                        console.log(that.events);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

        }
    }
</script>

<style scoped>
    /* Cards */
    .cards {
        margin-top: 60px;
    }

    .divider {
        border-left: 1px solid #dfdfdf;
    }

    /* Picture */
    /*.picture-circle {
        position: absolute; transition: ease .3s;
        top: 30px;
        index: 10;
    }

    .picture-circle-l { left: calc(50% - 50px); }
    .picture-circle-m { left: calc(50% - 43px); }
    .picture-circle-p { left: calc(50% - 33px); }*/

    /* Badge */
    .goup-badge {
        width: 220px;
        margin: 30px auto 0 auto;
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
