<template>
    <div>

        <main-header
            :title="translations.title"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main first-container">

                <div class="container">
                    <div infinite-wrapper>
                        <div class="col-sm-12" v-for="(favorite, indexEvents) in favorites">
                            <div class="card p-0">
                                <!-- Card Header -->

                                <router-link
                                    tag="div"
                                    class="card-header cover p-5 cursor-pointer"
                                    :style="{
                                        backgroundImage: `url(${ favorite.event.cover })`,
                                        height: '150px',
                                        borderRadius: '6px 6px 0 0'
                                    }"
                                    :to="{ name: 'general.events.show', params: { event_slug: favorite.event.slug }, query: {event_id: favorite.event.id} }"
                                >
                                </router-link>
                                <!-- Card Body -->
                                <div class="card-body card-padding">
                                    <h4 class="m-b-5">{{ favorite.event.name }}</h4>
                                    <div style="opacity: .8;">
                                        <p class="m-b-5">{{ favorite.event.description }}</p>
                                        <span class="d-block m-0 f-12">
                                            <strong>{{ favorite.event.city.name }} - {{ favorite.event.city.state }}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <infinite-loading @infinite="getUserFavorites" force-use-infinite-wrapper="true">
                            <span slot="no-more">
                                 <span class="f-700 text-white" v-if="favorites.length">{{translations.load_complete}}</span>
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
    import * as translations from '@/translations/user/components/favorites'
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
                favorites: [],
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
            getUserFavorites($state){
                let that = this

                that.$http.get(`user/events/favorites?page=${that.nextPage}`)
                    .then(function (response) {

                        if(!that.favorites.length){
                            that.favorites = response.data.favorites
                            that.pagination = response.data.pagination
                        }else{
                            that.favorites = that.favorites.concat(response.data.favorites)
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
