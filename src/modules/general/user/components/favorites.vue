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
                    <div class="col-sm-12" v-for="(favorite, indexEvents) in favorites">
                        <div class="card p-0">
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
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12" v-show="favorites.length">
                            <div class="text-center">
                                <pagination :source="pagination" @navigate="getUserFavorites" :range="6"></pagination>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'
    import pagination from '@/components/pagination'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/favorites'
    import {mapGetters} from 'vuex'

    export default {
        name: 'general-user-favorites',

        components: {
            mainHeader,
            pagination
        },

        data () {
            return {
                interactions: {},
                favorites: [],
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
            this.getUserFavorites()
        },

        methods: {
            getUserFavorites(page){
                let that = this
                page = page ? page : 1

                that.$http.get(`user/events/favorites?page=${page}`)
                    .then(function (response) {
                       that.favorites = response.data.favorites
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

</style>
