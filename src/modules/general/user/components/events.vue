<template>
    <div class="first-container">

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main">

                <div class="container">
                    <div class="row" infinite-wrapper>
                        <div class="col-sm-12" v-for="(event, indexEvents) in events">

                            <div class="card p-0">
                                <!-- Card Header -->
                                <div
                                    class="card-header cover p-5"
                                    :style="{
                                        backgroundImage: `url(${ event.cover })`,
                                        height: '150px',
                                        borderRadius: '6px 6px 0 0'
                                    }"
                                >
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
                                <div class="card-footer p-10">
                                    <div class="row">
                                        <div class="col-xs-8" style="opacity: .8;">
                                            <small class="">
                                                <span v-show="event.value > 0">{{ event.value | formatCurrency }}</span>
                                                <span v-show="event.value === 0">{{ translations.free }}</span>
                                            </small>
                                        </div>
                                        <div class="col-xs-4 text-right">
                                            <small class="f-primary">
                                                <i class="ion-ios-star m-r-5"></i>{{ event.favorites }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer p-10">
                                    <div class="text-center m-t-10">
                                        <router-link class="btn btn-primary small transparent" tag="button"
                                                     :to="{name: 'events.edit', params:{id: event.id}}">
                                            {{translations.buttons.edit}}
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <infinite-loading @infinite="getUserEvents" force-use-infinite-wrapper="true">
                            <span slot="no-more">
                                 <span class="f-700 text-white" v-if="events.length">{{translations.load_complete}}</span>
                            </span>

                        <span slot="no-results"></span>

                        <span slot="spinner">
                                 <card-placeholder/>
                            </span>
                    </infinite-loading>

                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'
    import User from '@/models/User'
    import * as translations from '@/translations/user/components/events'
    import {mapGetters} from 'vuex'

    import InfiniteLoading from 'vue-infinite-loading'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default {
        name: 'general-user-events',

        components: {
            mainHeader,
            InfiniteLoading,
            cardPlaceholder
        },

        data () {
            return {
                interactions: {},
                events: [],
                pagination: {},
                nextPage: 1
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
        },

        methods: {
            getUserEvents($state){
                let that = this

                that.$http.get(`user/events/list?page=${that.nextPage}`)
                    .then(function (response) {

                        if(!that.events.length){
                            that.events = response.data.events
                            that.pagination = response.data.pagination
                        }else{
                            that.events = that.events.concat(response.data.events)
                            that.pagination = response.data.pagination
                        }

                        if(that.pagination.current_page < that.pagination.last_page){
                            that.nextPage =  that.nextPage + 1
                            $state.loaded()
                        }else{
                            $state.complete()
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }

        }
    }
</script>

<style scoped>
.text-white{
    color: white;
}
</style>
