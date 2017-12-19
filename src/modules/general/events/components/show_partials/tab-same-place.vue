<template>
    <div class="transition">
        <div class="m-t-30">
            <div class="">
                <!-- Events in same place -->
                <div>
                    <p class="text-center m-b-30">{{ translations.events_same_place.subtitle }}</p>

                    <p class="f-info text-center" v-show="!eventsInSamePlace.length && !infiniteLoadingEventsSamePlace.first_load">{{ translations.no_interactions }}</p>

                    <div class="col-row-horizontal-direction">
                        <div
                            class="col-horizontal-direction-50 cursor-pointer"
                            v-for="(event, indexEvents) in eventsInSamePlace"
                            @click="goToEvent(event)"
                        >
                            <div class="card m-b-5 p-0">
                                <!-- Card Header -->
                                <div
                                    class="card-header cover event-cover-image-half-page p-5"
                                    :style="{ backgroundImage: `url(${ event.cover })`}"
                                >
                                </div>
                                <!-- Card Body -->
                                <div class="card-body card-padding">
                                    <h4 class="m-b-5 t-overflow">{{ event.name }}</h4>
                                    <div style="opacity: .8;">
                                        <span class="d-block m-t-0 m-b-5 f-12">
                                            <i class="tab-icon ion-ios-location m-r-5"></i>
                                            <strong>{{ event.city.name }} - {{ event.city.state }}</strong>
                                        </span>

                                        <div v-for="category in event.categories">
                                            <small class="f-700 f-primary">#{{ category.name_en }}</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Footer -->
                                <div class="card-footer p-10">
                                    <div class="row">
                                        <div class="col-xs-12 text-right">
                                            <small class="f-primary">
                                                <i class="ion-ios-star m-r-5"></i>{{ event.favorited_count }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-row-horizontal-direction" v-if="infiniteLoadingEventsSamePlace.is_loading">
                        <div class="col-horizontal-direction-50 text-center">
                            <div class="card-placeholder placeholder-effect text-center">
                                <p class="f-default m-t-30" style="vertical-align: middle;">Loading</p>
                            </div>
                        </div>
                    </div>

                    <div class="text-center m-t-20">
                        <button @click="back()" class="btn btn-primary" v-if="infiniteLoadingEventsSamePlace.complete">
                            {{translations.events_same_place.window_back}}
                        </button>
                    </div>

                </div>
                <!-- / Events in same place -->

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import * as translations from '@/translations/events/show'
    import pagination from '@/components/pagination'
    import bus from '@/utils/event-bus';

    export default {
        name: 'tab-same-place',

        components: {
            pagination
        },

        props: {
            event: {
                type: Object
            }
        },

        data () {
            return {
                placeholder: true,
                eventsInSamePlace: [],
                pagination: {},
                infiniteLoadingEventsSamePlace: {
                    nextPage: 1,
                    complete: false,
                    is_loading: true,
                    first_load: true,
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
            var that = this;
            this.getEventsSamePlace();

            //Infinite custom
            $(window).scroll(function(){

                if(!that.infiniteLoadingEventsSamePlace.is_loading && !that.infiniteLoadingEventsSamePlace.complete || that.infiniteLoadingEventsSamePlace.first_load){

                    //Se chegar no final
                    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {

                        that.getEventsSamePlace();

                    }

                }
            });
        },

        destroyed: function(){
            $(window).off('scroll');
        },

        methods: {


            getEventsSamePlace() {
                let that = this


                that.infiniteLoadingEventsSamePlace.is_loading = true;

                that.$http.get(`event/events_in_same_place/${that.event.google_place_id}?page=${that.infiniteLoadingEventsSamePlace.nextPage}`)
                    .then(function (response) {

                        that.infiniteLoadingEventsSamePlace.is_loading = false
                        that.infiniteLoadingEventsSamePlace.first_load = false;

                        if (!that.eventsInSamePlace.length) {
                            that.eventsInSamePlace = response.data.events_in_same_place
                            that.pagination = response.data.pagination
                        } else {
                            that.eventsInSamePlace = that.eventsInSamePlace.concat(response.data.events_in_same_place)
                            that.pagination = response.data.pagination
                        }

                        if (that.pagination.current_page < that.pagination.last_page) {
                            that.infiniteLoadingEventsSamePlace.nextPage = that.infiniteLoadingEventsSamePlace.nextPage + 1
                        } else {
                            that.infiniteLoadingEventsSamePlace.complete = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.infiniteLoadingEventsSamePlace.is_loading = false
                    });

            },

            goToEvent: function(event){
                var that = this;

                bus.$emit('go-to-event-related');

                that.$router.push(
                    { name: 'events.show', params: { event_slug: event.slug }, query: {event_id: event.id} }
                );

                that.relateds = [];
                that.infiniteLoadingEventsSamePlace.complete = false;
                that.infiniteLoadingEventsSamePlace.nextPage = 1;

            },

            back: function(){
                window.history.back();
            },
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
