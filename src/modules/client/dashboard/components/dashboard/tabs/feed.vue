<template lang="html">
    <div class="">

   		<div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/feed.png" alt="">
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
        </div>
        <!-- / List Feed -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import { cleanActivity } from '@/models/Activity'
    import moment from 'moment'

    const ActivityModel = cleanActivity()

    export default {
        name: 'client-dashboard-feed',
        components: {},
        data() {
            return {
                interactions: {
                },
                activities: [],
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'AuthToken']),
        },
        mounted() {
            this.getActivities()
            this.initSwiperAttachments()
        },
        methods: {

            initSwiperAttachments() {
                setTimeout(() => {
                    this.swiperAttachments = new Swiper(this.$refs.swiperAttachmentsList, {
                        slidesPerView: 1,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 0
                    })
                }, 100)
            },

            handleDateTimeDiference(date) {
                return moment(date).fromNow()
            },


            getActivities() {
                let that = this

                that.$http.get(`client/activity/list/${that.$route.params.client_id}`)
                    .then(function (response) {
                        that.activities = response.data.data;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    /*.picture-circle {
        width: 68px; height: 68px;
    }*/

    .btn-primary-inverse { color: #88C657 !important; border-color: #88C657 !important; }

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
