<template lang="html">

    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Evento'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper fixtop">
            <div class="event-cover" :style="`background-image:url('${ event.avatar }')`"></div>
        </div>

        <!-- Sections Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(tab, $index) in tabs"
                    :key="$index"
                >
                    {{ tab.name }}
                </div>
            </div>
        </div>
        <!-- Sections Tabs -->

        <event-tab-about v-if="currentTab === 'about'" :event="event"></event-tab-about>
        <event-tab-comments v-if="currentTab === 'comments'" :event="event"></event-tab-comments>
        <event-tab-participants v-if="currentTab === 'participants'" :event="event"></event-tab-participants>

    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import eventTabAbout from './show_partials/about.vue'
    import eventTabComments from './show_partials/comments.vue'
    import eventTabParticipants from './show_partials/participants.vue'

    import {cleanEvent} from '@/models/Event'

    export default {
        name: 'events-landing-show',
        components: {
            mainHeader,
            eventTabAbout,
            eventTabComments,
            eventTabParticipants
        },
        data() {
            return {
                interactions: {
                    presence: false
                },
                event: cleanEvent(),
                currentTab: '',
                tabs: [
                    { name: 'Sobre o evento', slug: 'about' },
                    { name: 'Comentários', slug: 'comments' },
                    { name: 'Participantes', slug: 'participants' },
                ]
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getEvent()
            this.initSwiperTabs()
        },
        methods: {

            cancelPresence(user) {
                var that = this;

                this.$http.post(`event/participant/cancel`, {event_id: that.event.id, participant_id: that.currentUser.id}).then(response => {

                    that.interactions.presence = false;
                    errorNotify('', 'Participação cancelada.');

                }, response => {
                    // error callback
                });
            },

            getEvent() {
                let that = this

                this.$http.get(`event/show/${that.$route.params.event_id}`).then(response => {

                    that.event = response.data.event;
                    if(this.isLogged){
                        that.checkUserPresence();
                    }

                }, response => {
                    // error callback
                });
            },

            checkUserPresence: function(){
                let that = this

                this.$http.post(`event/participant/check_presence`, {event_id: that.event.id, participant_id: that.currentUser.id}).then(response => {

                    that.interactions.presence = response.data.presence;

                }, response => {
                    // error callback
                });
            },

            initGallery: function(){
                let that = this

                setTimeout( function(){
                    $("#gallery").unitegallery({
                        tiles_type:"justified"
                    });

                },150)
            },

            initSwiperTabs() {
                var that = this;

                setTimeout(() => {
                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        initialSlide: 0,
                        spaceBetween: 0,
                        slidesPerView: 3,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        onSlideChangeEnd: swiper => {
                            // this.handleCurrentCategory(swiper.realIndex)
                            this.currentTab = this.tabs[swiper.realIndex].slug
                            if(this.currentTab == 'about'){
                                that.initGallery();
                            }
                        }
                    })
                }, 100)
            },
        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .tabs { margin-top: 0; }
    .wrapper-profile-background {
        z-index: 10;
    }
    .wrapper .container { position: relative; z-index: 20; }

    .attachment-image{
        height: 400px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

    }

    .event-cover{
        height: 350px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .light {
        background: rgba(255, 255, 255, .9);
        border-radius: 4px;
        padding: 5px 0;
        color: #393838;
    }

</style>
