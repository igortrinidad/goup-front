<template>
  <div>
      <div class="cards" infinite-wrapper>
          <router-link
              tag="div"
              class="card"
              v-for="(favorite, favoriteIndex) in favorites"
              :key="favoriteIndex"
              :to="{ name: 'events.show', params: { event_slug: favorite.event.slug } }"
          >
              <!-- Card Header -->
              <div
                  class="card-header cover p-5"
                  :style="{
                    backgroundImage: `url(${ favorite.event.cover })`,
                    height: '150px',
                    borderRadius: '6px 6px 0 0'
                }"
              >
              </div>
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
              <!-- Card Footer -->
              <div class="card-footer p-5">
                  <div class="row">
                      <div class="col-xs-8" style="opacity: .8;">
                          <small class="p-l-10 m-l-10">
                              <span v-show="favorite.event.value > 0">{{ favorite.event.value | formatCurrency }}</span>
                              <span v-show="favorite.event.value === 0">{{ translations.free }}</span>
                          </small>
                      </div>
                      <div class="col-xs-4 text-right">
                          <small class="f-primary">
                              <i class="ion-ios-star m-r-5"></i>{{ favorite.event.favorites }}
                          </small>
                      </div>
                  </div>
              </div>
          </router-link>
      </div>
      <infinite-loading ref="infiniteLoading" @infinite="getFavorites" force-use-infinite-wrapper="true">
            <span slot="no-more">
                 <span class="f-700 text-white" v-if="favorites.length">{{translations.load_complete}}</span>
            </span>

              <span slot="no-results"></span>

              <span slot="spinner">
                   <card-placeholder/>
              </span>
      </infinite-loading>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import InfiniteLoading from 'vue-infinite-loading'
    import * as translations from '@/translations/user/show'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import bus from '@/utils/event-bus';


    export default {
        name: 'user-show-tab-favorites',

        props: {

        },

        components: {
            InfiniteLoading,
            cardPlaceholder
        },

        data() {
            return {
                interactions: {
                    is_loading: true
                },
                favorites: [],
                pagination:{},
                nextPage: 1,
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

        mounted() {
            let that = this
            bus.$on('load-favorite',  () =>{
                that.favorites = []
                that.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            });
        },
        destroyed(){
            bus.$off('load-favorite');
        },

        methods: {
            getFavorites($state) {

                let that = this

                that.interactions.is_loading = true
                that.$http.get(`user/show/${that.$route.params.user_slug}/favorite?page=${that.nextPage}`)
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

            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

        }
    }
</script>

<style scoped>
</style>
