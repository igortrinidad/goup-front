<template>
    <div>
        <div class="m-t-30 text-center">
            <div class="container">
                <p class="f-info" v-show="!interactions.length">{{ translations.no_interactions }}</p>

                <div class="col-row" v-show="interactions.length">

                    <div class="col text-center" v-for="interaction in interactions">
                        <div class="border-inside-card">
                            <router-link
                                tag="div"
                                class="picture-circle picture-circle-xs border-picture-eletric-blue cursor-pointer"
                                :style="{ backgroundImage: `url(${ interaction.user.avatar })` }"
                                :to="{ name: 'general.user.show', params: { user_slug: interaction.user.slug } }"
                            >
                            </router-link>
                            <h4 class="f-12 f-primary f-700 m-b-0">{{ interaction.user.full_name }}</h4>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-sm-12" v-show="interactions.length">
                        <div class="text-center">
                            <pagination :source="pagination" @navigate="getInteractions" :range="6"></pagination>
                        </div>
                    </div>
                </div>

                <!-- Friends -->

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import UserModel from '@/models/User'
    import * as translations from '@/translations/events/show'
    import pagination from '@/components/pagination'
    export default {
        name: 'tab-friends',

        components: {
            pagination
        },

        props: {

        },

        data () {
            return {
                placeholder: true,
                place: {},
                users: [],
                interactions: [],
                pagination: {}
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
            this.getInteractions()
        },

        methods: {


            getInteractions(page) {
                let that = this
                page = page ? page : 1

                that.$http.get(`event/interactions/${that.$route.query.event_id}?page=${page}`)
                    .then(function (response) {
                        that.interactions = response.data.interactions
                        that.pagination = response.data.pagination
                    })
                    .catch(function (error) {
                        console.log(error)
                    });


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

    /* Users */
    .col-row {
        width: 100%;
        column-count: 2;
        column-gap: 0;
    }

    .col {
        width: 100%;
        display: inline-block;
        padding: 5px;
        margin: 0;
    }

    .border-inside-card {
        border-color: rgba(255, 255, 255, .2)
    }
</style>
