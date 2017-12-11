<template>
    <div class="cards" infinite-wrapper>
        <router-link
            tag="div"
            class="card"
            v-for="(event, indexEvents) in events"
            :key="indexEvents"
            :to="{ name: 'general.events.show', params: { event_slug: event.slug } }"
        >
            <!-- Card Header -->
            <div
                class="card-header cover p-5"
                :style="{
                    backgroundImage: `url(${ event.cover })`,
                    height: '150px',
                    borderRadius: '6px 6px 0 0'
                }"
            >
                <span class="event-ranking">
                    {{ indexEvents }}º
                </span>
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
            <div class="card-footer p-5">
                <div class="row">
                    <div class="col-xs-8" style="opacity: .8;">
                        <small>
                            <i class="ion-location m-r-5"></i>{{ handleDistance(event.distance) }}
                        </small>
                        <small class="divider p-l-10 m-l-10">
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
            </div>
        </router-link>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import InfiniteLoading from 'vue-infinite-loading'
    import * as translations from '@/translations/user/show'


    export default {
        name: 'general-user-show-tab-saves',

        props: {

        },

        components: {
            InfiniteLoading
        },

        data() {
            return {
                interactions: {
                    is_loading: true
                },
                events: []
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
            this.getEvents()
        },

        methods: {
            getEvents() {

                let that = this

                that.interactions.is_loading = true
                that.$http.get(`user/events/list?page=${that.nextPage}`)
                    .then(function (response) {

                        that.events = response.data.events
                        that.pagination = response.data.pagination

                        that.interactions.is_loading = false

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
