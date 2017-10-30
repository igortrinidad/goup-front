<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="userProfile.full_name"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <!-- <div class="wrapper fixtop primary padding" style="position: relative;">
            <div class="wrapper-profile-background" :style="`background-image:url('${ userProfile.avatar }')`"></div>
            <div class="container">
                <div class="tabs m-t-0" ref="tabs">
                    <div class="tab full">
                        <h2 class="f-300 text-center m-b-30">{{ userProfile.full_name }}</h2>
                    </div>
                    <div class="tab">

                        <span class="f-14 f-300">120
                            <span class="d-block">Seguidores</span>
                        </span>

                    </div>

                    <div class="tab">
                        <span class="f-14 f-300">{{ userProfile.total_xp }}
                            <span class="d-block">Experiência</span>
                        </span>
                    </div>
                    <div class="tab">

                        <button type="button" class="btn btn-xs btn-primary f-300" @click="handleFollow()">
                            <span v-if="interactions.isFollowed">
                                <i class="ion-checkmark-round m-r-5"></i>Seguindo
                            </span>
                            <span v-if="!interactions.isFollowed">
                                <i class="ion-plus-round m-r-5"></i>Seguir
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        </div> -->

        <div class="container">
            <div class="card">
                <div class="card-body card-padding text-center">
                    <div class="picture-circle picture-circle-l m-b-10" :style="`background-image:url('${ userProfile.avatar }')`"></div>

                    <span class="label label-success f-16 f-400 p-5 p-l-10 p-r-10">{{ userProfile.total_xp }}
                        <strong>pontos</strong>
                    </span>
                </div>
            </div>
        </div>

        <div class="text-center">

        </div>

        <div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../assets/icons/feed.png" alt="">
                <h4 class="f-300">Feed de atividades</h4>
            </div>
        </div>

        <div class="m-t-20 text-center" v-if="!activities.length">
            <span class="f-300">Nenhuma atividade recente.</span>
        </div>

        <!-- List Feed -->
        <div class="m-t-20" v-if="activities.length">
            <div class="row">
                <div class="col-sm-12">
                    <div class="feed">
                        <div class="line line-row">
                            <div class="line-border"></div>
                            <div class="line-item" v-for="activity in activities">
                                <div class="line-icon success"></div>
                                <small class="line-date p-5 f-700">
                                    {{ activity.created_at | moment('DD/MMM/YYYY') }}
                                </small>
                                <router-link class="row" tag="div" :to="{ name: 'landing.clients.show', params: { id: activity.user.id } }">
                                    <div class="col-sm-12 line-padding">
                                        <div class="picture-circle picture-circle-xs m-0" :style="`background-image:url('${ activity.user.avatar }')`"></div>
                                    </div>
                                    <div class="col-sm-12 line-padding">
                                        <h5 class="f-400 t-overflow m-b-10">
                                            {{ activity.user.full_name }},
                                            {{ activity.content }}
                                        </h5>

                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- List Feed Navigation -->
            <div class="row">
                <div class="col-sm-12" v-show="activities.length">
                    <div class="text-center">
                        <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
            <!-- / List Feed Navigation -->


        </div>
        <!-- / List Feed -->


    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import { cleanActivity } from '@/models/Activity'
    import { cleanClientModel } from '@/models/Client'
    import moment from 'moment'

    const ActivityModel = cleanActivity()

    export default {
        name: 'landing-professional-show',
        components: {
            mainHeader,
            pagination: require('@/components/pagination.vue'),
        },
        data() {
            return {
                interactions: {
                    isFollowed: false,
                },
                userProfile: {
                    id: '',
                    name: '',
                    last_name: '',
                    full_name: '',
                    avatar: '',
                    total_xp: '',
                },
                activities: [],
                pagination: {},
                navigate_url: null,
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getClient()
            this.initSwiperAttachments()
        },
        methods: {

            handleFollow() {
                this.interactions.isFollowed = !this.interactions.isFollowed
            },

            initSwiperAttachments() {
                setTimeout(() => {
                    this.swiperAttachments = new Swiper(this.$refs.swiperAttachmentsList, {
                        slidesPerView: 1,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 4,
                        onSlideChangeEnd: swiper => {
                            this.attachmentsIndex = swiper.realIndex
                        },
                    })
                }, 100)
            },

            handleView(type) {
                if (type === 'list') {
                    this.interactions.views.list = true
                    this.interactions.views.cards = false
                    this.initSwiperAttachmentsList()
                }
                if (type === 'cards') {
                    this.interactions.views.list = false
                    this.interactions.views.cards = true
                    this.initSwiperAttachmentsCards()
                }
            },

            handleDateTimeDiference(date) {
                return moment(date).fromNow()
            },

            getClient() {
                let that = this
                that.$http.get(`client_public/show/${ that.$route.params.id }`)
                    .then(function (response) {
                        console.log(response.data.client);
                        that.userProfile = response.data.client
                        that.getClientActivities();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getClientActivities: function(){
                let that = this

                that.$http.get(`client_public/activity/list/${ that.$route.params.id }`)
                    .then(function (response) {
                        that.activities = response.data.data
                        that.pagination = response.data.pagination
                        that.navigate_url = `client_public/activity/list/${ that.$route.params.id }`
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            navigate(page) {
                let that = this

                that.$http.get(`${that.navigate_url}?page=${page}`)
                    .then(function (response) {

                        that.activities = response.data.data
                        that.pagination = response.data.pagination

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
        }
    }
</script>

<style scoped>
    /*Tabs*/
    .tabs {
        display: flex;
        background: rgba(255, 255, 255, .9);
        border-radius: 4px;
        flex-flow: row wrap;
        padding: 20px 0 !important;
    }
    .tabs .tab {
        width: 33.333%;
        background: transparent;
        border: none;
        color: #383938;
    }

    .tabs .tab.full { width: 100% !important; }

    .wrapper.padding{ padding: 30px 0 !important; height: 200px;}
    .wrapper-profile-background { z-index: 10; }
    .wrapper .container { position: relative; z-index: 20; }

    /* attachment */
    .attachment-image{
        height: 300px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

    }
    .attachment-index {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, .4);
        color: #fff;
        padding: 5px;
        border-radius: 4px;
        font-weight: 300;
        font-size: 12px;
        z-index: 100;
    }


</style>
