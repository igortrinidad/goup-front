<template>
    <div class="cards" infinite-wrapper>
        <router-link
            tag="div"
            class="card"
            v-for="(interaction, interactionIndex) in user_interactions"
            :key="interactionIndex"
            :to="{ name: 'general.events.show', params: { event_slug: interaction.event.slug } }"
        >
            <!-- Card Header -->
            <div
                class="card-header cover p-5"
                :style="{
                    backgroundImage: `url(${ interaction.event.cover })`,
                    height: '150px',
                    borderRadius: '6px 6px 0 0'
                }"
            >
                <span class="event-ranking">
                    <i class="ion-ios-rewind" v-if="interaction.skip"></i>
                    <i class="ion-chevron-down" v-if="interaction.down"></i>
                    <i class="ion-chevron-up"  v-if="interaction.up"></i>
                    <i class="ion-ios-star" v-if="interaction.favorite"></i>
                </span>
            </div>
            <!-- Card Body -->
            <div class="card-body card-padding">
                <h4 class="m-b-5">{{ interaction.event.name }}</h4>
                <div style="opacity: .8;">
                    <p class="m-b-5">{{ interaction.event.description }}</p>
                    <span class="d-block m-0 f-12">
                        <strong>{{ interaction.event.city.name }} - {{ interaction.event.city.state }}</strong>
                    </span>
                </div>
            </div>
            <!-- Card Footer -->
            <div class="card-footer p-5">
                <div class="row">
                    <div class="col-xs-8" style="opacity: .8;">
                        <small class="p-l-10 m-l-10">
                            <span v-show="interaction.event.value > 0">{{ interaction.event.value | formatCurrency }}</span>
                            <span v-show="interaction.event.value === 0">{{ translations.free }}</span>
                        </small>
                    </div>
                    <div class="col-xs-4 text-right">
                        <small class="f-primary">
                            <i class="ion-ios-star m-r-5"></i>{{ interaction.event.favorited_count }}
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
        name: 'general-user-show-tab-interactions',

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
                user_interactions: []
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
            this.getInteractions()
        },

        methods: {
            getInteractions() {

                let that = this

                that.interactions.is_loading = true
                that.$http.get(`user/show/${that.$route.params.user_slug}/interactions`)
                    .then(function (response) {

                     that.user_interactions = response.data.interactions

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
