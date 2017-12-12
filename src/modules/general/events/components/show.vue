<template>
    <div class="first-container">

        <main-header
            :title="!interactions.is_loading ? event.name : translations.loading"
            :type="'back'"
            :cursor="false"
        ></main-header>



        <pulse v-if="interactions.is_loading" :icon="'ion-ios-reload m-l-5'"/></pulse>

        <transition v-show="!interactions.is_loading" appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">

                <!-- Photos -->
                <div class="p-relative">
                    <div class="swiper-container swiper-gallery" ref="galleryPhotos">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(photo, index) in event.photos"
                                :style="{ backgroundImage: `url(${ photo.photo_url })` }"
                                :key="index"
                            >
                            </div>
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-scrollbar"></div>
                    </div>

                </div>
                <!-- / Photos -->

                <div class="container">
                    <div v-if="interactions.eventNotFound">
                        <h3 class="text-center m-t-30">{{ translations.event_not_found }}</h3>
                    </div>

                    <!-- Place Content -->
                    <div class="m-b-30" v-if="!interactions.eventNotFound && event.id">

                        <!-- Place Name, Description, City And State -->
                        <div class="text-center">
                            <h3 class="m-t-30 f-success">{{ event.name }}</h3>

                            <p>{{ event.description }}</p>

                            <p>{{translations.categories_title}}</p>
                            <div class="col-row">

                                <div class="col" v-for="category in event.categories">
                                    <div class="card-cat text-center"
                                        @click="selectCategory(category)"
                                        :class="{
                                            'bounce' : currentCategory && currentCategory == category
                                        }">
                                        <div class="p-10">
                                            <img :src="category.photo_url" width="40px">
                                            <p class="f-default m-t-10">{{category['name_' + language]}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Call -->
                            <div class="m-t-30" v-if="event.phone">
                                <a :href="`tel:${ event.phone }`" class="btn btn-info transparent">
                                    <i class="ion-ios-telephone m-r-5"></i>{{ translations.call }}
                                </a>
                            </div>
                            <!-- /Call -->

                            <!-- Share -->
                            <button class="btn btn-success m-t-30" @click="openShareWhatsapp()">{{ translations.share }}</button>

                            <!-- /Share -->

                            <div class="container m-t-30">
                                <ul class="list-group list-rounded m-b-0 m-t-10">
                                    <li class="list-group-item">
                                        <i class="icon ion-social-usd-outline m-r-5 f-primary"></i>
                                        <span v-if="event.value_uninformed"><strong>{{translations.value_uninformed}}</strong></span>
                                        <span v-if="!event.value_uninformed"><strong>{{translations.ticket_value}}</strong></span>
                                        <span v-if="!event.value_uninformed">
                                             <span v-show="event.value > 0">{{ event.value | formatCurrency }}</span>
                                             <span v-show="event.value === 0">{{ translations.free }}</span>
                                        </span>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="icon ion-android-calendar m-r-5 f-primary"></i>

                                        <span v-if="event.recurrency_type == 'daily'"><strong>{{translations.daily}}</strong></span>
                                        <span v-if="event.recurrency_type == 'weekly'"><strong>{{translations.weekly}}</strong></span>
                                        <span v-if="event.recurrency_type == 'monthly'"><strong>{{translations.monthly}}</strong></span>
                                        <span>{{handleRecurrencyType}}</span>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="icon ion-ios-clock-outline m-r-5 f-primary"></i>
                                        <span v-if="event.time_uninformed"><strong>{{translations.time_uninformed}}</strong></span>
                                        <span v-if="!event.time_uninformed"><strong>{{translations.time}}</strong></span>
                                        <span v-if="!event.time_uninformed">
                                             <span>{{ event.time }}</span>
                                        </span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <!-- Place Name, Description, City And State -->

                        <!-- Tabs -->
                        <div class="m-t-30">
                            <div class="swiper-container tabs text-center" ref="tabs">
                                <div class="swiper-wrapper">
                                    <div :class="{ 'swiper-slide tab': true, 'active': false }">
                                        <i class="tab-icon ion-ios-location m-r-5"></i>
                                        {{ translations.tabs.location }}
                                    </div>
                                    <div :class="{ 'swiper-slide tab': true, 'active': false }">
                                        <i class="tab-icon ion-ios-people m-r-5"></i>
                                        {{ translations.tabs.friends }}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- / Tabs -->

                        <!-- Tab Content -->
                        <div class="m-t-30">
                            <div class="">
                                <!-- Tab Location -->
                                <tab-location :event="event" v-show="currentTab === 0"></tab-location>
                                <!-- Tab Friends -->
                                <tab-friends  v-show="currentTab === 1"></tab-friends>
                            </div>
                        </div>
                        <!-- / Tab Content -->

                    </div>
                    <!-- / Place Content -->

                </div>
                <!-- / Place Content -->

                <!-- See Also -->

                <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <h3 class="text-center f-success m-t-30">{{translations.see_more.title}}</h3>

                        <card-placeholder v-if="interactions.loading_related"></card-placeholder>
                        <router-link
                            tag="div"
                            class="col-sm-12 cursor-pointer"
                            v-for="(event, indexEvents) in relateds" v-if="!interactions.is_loading"
                            :to="{ name: 'general.events.show', params: { event_slug: event.slug } }"
                            :key="indexEvents"
                        >
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
                                            <small class="p-l-10 m-l-10">
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
                            </div>
                        </router-link>

                        <div class="row">
                            <div class="col-sm-12" v-show="!interactions.is_loading && relateds.length">
                                <div class="text-center">
                                    <pagination :source="pagination" @navigate="getRelateds" :range="6"></pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- / See Also -->
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import tabLocation from './show_partials/tab-location.vue'
    import tabFriends from './show_partials/tab-friends.vue'
    import pagination from '@/components/pagination'
    import cardPlaceholder from '@/components/card-placeholder'


    import * as translations from '@/translations/events/show'
    import PlaceModel from '@/models/Place'
    import {recurrencTypes, weekdays, monthWeeks} from '@/models/RecurrencyTypes'

    export default {
        name: 'general-events-show',

        components: {
            mainHeader,
            tabLocation,
            tabFriends,
            pulse: require('@/components/pulse.vue'),
            pagination,
            cardPlaceholder
        },

        data () {
            return {
                interactions: {
                    eventNotFound: false,
                    is_loading: true,
                    loading_related: true,
                },
                eventholder: true,
                event: {},
                currentTab: 0,
                currentCategory: null,
                relateds: [],
                pagination: {},
                recurrencTypes: recurrencTypes(),
                weekdays: weekdays(),
                monthWeeks: monthWeeks()
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
            },
            handleRecurrencyType(){

                if(this.event.recurrency_type == 'weekly'){
                    return this.weekdays[this.event.recurrency_info].text
                }

                if(this.event.recurrency_type == 'monthly'){
                    if(this.event.recurrency_info){
                        let values = this.event.recurrency_info.split('-')
                        let month_index = _.findIndex(this.monthWeeks, {value: parseInt(values[0])})
                        return  `${this.monthWeeks[month_index][`label_${this.language}`]} - ${this.weekdays[values[1]].text}`
                    }
                }

                if(this.event.recurrency_type == 'date'){
                    return this.event.recurrency_info
                }

            }
        },

        watch:{
            '$route.params.event_slug'() {
                let that = this
                that.interactions.is_loading = true
                that.event = {}
                that.getEvent()
                that.getRelateds()
            }
        },

        mounted(){
            this.getEvent()
            this.getRelateds()
        },

        methods: {

            initSwiperTabs() {
                let that = this

                setTimeout(() => {
                    that.swiperTabs = new Swiper(that.$refs.tabs, {
                        initialSlide: 0,
                        slidesPerView: 2,
                        spaceBetween: 5,
                        centeredSlides: true,
                        slideActiveClass: 'active',
                        slideToClickedSlide: true,
                        onSlideChangeEnd: swiper => {
                            that.currentTab = swiper.realIndex
                        },
                    })
                }, 200);
            },

            initSwiperGallery() {
                let that = this

                setTimeout(() => {
                    that.swiperGalleryPhotos = new Swiper(that.$refs.galleryPhotos, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        scrollbar: '.swiper-scrollbar',
                    })
                }, 200);
            },

            getEvent() {
                let that = this

                that.$http.get(`event/show/public/${that.$route.params.event_slug}`)
                    .then(function (response) {
                        that.event = response.data.event
                        that.initSwiperGallery();
                        that.initSwiperTabs();
                        that.interactions.is_loading = false;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            selectCategory: function(category){
                var that = this;
                that.currentCategory = category;

                setTimeout( function(){
                    that.$router.push({name: 'general.events.list', query: {category_id: category.id}});
                }, 300)
            },

            // Whatsapp share
            openShareWhatsapp() {
                var that = this
                var url = `https://api.whatsapp.com/send?text=${ that.translations.share_msg } ${ that.event.name } ${ that.translations.application }`;
                window.open(url, '_system', null);
            },

            getRelateds(page) {
                let that = this

                page = page ? page : 1

                that.$http.get(`event/related/${that.$route.params.event_slug}?page=${page}`)
                    .then(function (response) {
                        that.relateds = response.data.relateds
                        that.pagination = response.data.pagination
                        that.interactions.loading_related = false
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.interactions.loading_related = false
                    });

            },
        }
    }
</script>

<style scoped>
    .base-infos {
        border: 1px solid rgba(255, 255, 255, .3);
        border-radius: 20px;
        padding: 7px 0;
    }

    .base-infos .divider {
        border-right: 1px solid rgba(255, 255, 255, .3);
    }
    .base-infos i {
        display: block;
        font-size: 24px;
    }

    .base-infos span {
        display: block;
        text-transform: initial;
        font-size: 14px;
    }

    .list-rounded .list-group-item .icon {
        font-size: 24px;
        display: inline-flex;
        width: 40px; height: 40px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 1px solid #FF4B89;
    }

    .list-rounded .list-group-item span { display: block; margin-top: 10px; }

    .col-row {
        display: flex;
        width: 100%;
        column-count: 4;
        column-gap: 0;
        justify-content: center;
    }

    .col {
        width: 50%;
        display: inline-block;
        padding: 5px;
    }

    .card-cat{
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;
    }

</style>
