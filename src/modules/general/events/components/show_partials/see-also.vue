<template>
    <div>
        <!-- See Also -->
                <div class="container">
                    <div class="">
                        <h3 class="text-center f-success m-t-30 m-b-30">{{ translations.see_more.title }}</h3>
                        <div class="col-row-horizontal-direction">
                            <div
                                class="col-horizontal-direction-50 cursor-pointer"
                                v-for="(event, indexEvents) in relateds"
                                @click="goToEventRelated(event)"
                            >
                                <div class="card m-b-5 p-0">
                                    <!-- Card Header -->
                                    <div
                                        class="card-header cover event-cover-image-half-page p-5"
                                        :style="{backgroundImage: `url(${ event.cover })`}"
                                    >
                                    </div>
                                    <!-- Card Body -->
                                    <div class="card-body card-padding">
                                        <h4 class="m-b-5 t-overflow">{{ event.name }}</h4>
                                        <div style="opacity: .8;">
                                            <span class="d-block m-t-0 m-b-5 f-12">
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

                        <!-- LOADING PLACEHOLDER -->
                        <div class="col-row-horizontal-direction" v-if="infiniteLoadingRelated.is_loading">
                            <div class="col-horizontal-direction-50 text-center">
                                <div class="card-placeholder placeholder-effect text-center">
                                    <p class="f-default m-t-30" style="vertical-align: middle;">Loading</p>
                                </div>
                            </div>
                        </div>

                        <div class="text-center m-t-20">
                            <button @click="back()" class="btn btn-primary" v-if="infiniteLoadingRelated.complete">
                                {{translations.back_to_category}}
                            </button>
                        </div>

                    </div>
                </div>
                <!-- / See Also -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import * as translations from '@/translations/events/show';
    import pagination from '@/components/pagination';
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
                relateds: [],
                pagination: {},
                infiniteLoadingRelated: {
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

            //Infinite custom
            $(window).scroll(function(){

                if(!that.infiniteLoadingRelated.is_loading && !that.infiniteLoadingRelated.complete || that.infiniteLoadingRelated.first_load){

                    //Se chegar no final
                    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {

                        that.getRelateds();

                    }

                }
            });
        },

        destroyed: function(){
            $(window).off('scroll');
        },

        methods: {

            getRelateds() {
                let that = this


                that.infiniteLoadingRelated.is_loading = true;
                that.infiniteLoadingRelated.first_load = false;

                that.$http.get(`event/related/${that.$route.params.event_slug}?page=${that.infiniteLoadingRelated.nextPage}`)
                    .then(function (response) {

                        that.infiniteLoadingRelated.is_loading = false

                        if (!that.relateds.length) {
                            that.relateds = response.data.relateds
                            that.pagination = response.data.pagination
                        } else {
                            that.relateds = that.relateds.concat(response.data.relateds)
                            that.pagination = response.data.pagination
                        }

                        if (that.pagination.current_page < that.pagination.last_page) {
                            that.infiniteLoadingRelated.nextPage = that.infiniteLoadingRelated.nextPage + 1
                        } else {
                            that.infiniteLoadingRelated.complete = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.infiniteLoadingRelated.is_loading = false
                    });

            },

            goToEventRelated: function(event){
                let that = this

                bus.$emit('go-to-event-related');

                that.$router.push(
                    { name: 'events.show', params: { event_slug: event.slug }, query: {event_id: event.id} }
                );

                that.relateds = [];
                that.infiniteLoadingRelated.complete = false;
                that.infiniteLoadingRelated.nextPage = 1;

            },

            back: function(){
                window.history.back();
            },
        }
    }
</script>

<style scoped>

</style>
