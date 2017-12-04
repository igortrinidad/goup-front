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
                                        <small class="m-l-10">
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

                                <div class="text-center m-t-10">
                                    <router-link class="btn btn-primary small transparent" tag="button"
                                                 :to="{name: 'general.events.edit', params:{id: event.id}}">
                                        {{translations.buttons.edit}}
                                    </router-link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-sm-12" v-show="events.length">
                            <div class="text-center">
                                <pagination :source="pagination" @navigate="getUserEvents" :range="6"></pagination>
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
    import * as translations from '@/translations/user/components/events'
    import {mapGetters} from 'vuex'

    export default {
        name: 'general-user-events',

        components: {
            mainHeader,
            pagination
        },

        data () {
            return {
                interactions: {},
                events: [],
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
            this.getUserEvents()
        },

        methods: {
            getUserEvents(page){
                let that = this
                page = page ? page : 1

                that.$http.get(`user/events/list?page=${page}`)
                    .then(function (response) {
                       that.events = response.data.events
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
