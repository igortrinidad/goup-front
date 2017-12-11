<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <pulse v-if="interactions.is_loading" :icon="'ion-navigate'"/></pulse>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" v-if="!interactions.is_loading">

            <div class="">

                <!-- CATEGORIAS -->
                <div class="main" v-show="!interactions.finished_loading_category && !$route.query.category_id">


                    <div class="container">

                        <p class="f-16 f-300 text-center m-t-10">{{translations.title_category}}</p>
                        <!-- CATEGORIES -->
                        <div class="col-row">
                            <!-- ALL -->
                            <div class="col">
                                <div class="card-cat text-center"
                                    @click="selectCategory(categoryAll)"
                                    :class="{'bounce' : currentCategory == categoryAll}">
                                    <div class="p-10">
                                        <img src="../../../../assets/icons/header/star_pink.svg" width="60%">
                                        <p class="f-default m-t-10">{{categoryAll['name_' + language]}}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- ALL -->

                            <div class="col" v-for="category in getCategories">
                                <div class="card-cat text-center"
                                    @click="selectCategory(category)"
                                    :class="{
                                        'bounce' : currentCategory && currentCategory == category
                                    }">
                                    <div class="p-10">
                                        <img :src="category.photo_url" width="60%">
                                        <p class="f-default m-t-10">{{category['name_' + language]}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- CATEGORIAS -->

                <div class="main container text-center" v-if="interactions.finished_loading_category">

                    <p class="f-16 f-300 text-center m-t-10">{{translations.before_category_type}}</p>
                    <h3 class="f-success m-t-0">{{currentCategory['name_'+language]}}</h3>
                    <p class="f-16 f-300 text-center m-t-0">{{translations.after_category_type}}</p>

                    <!--Cities-->
                    <div class="row m-t-10">
                        <div class="col-sm-12 text-center">

                            <!-- IF NO CITY -->
                            <p class="f-info" v-if="!getCities.length">{{translations.noCities}}</p>

                            <!-- CITIES SWIPER -->
                            <div class="swiper-container" ref="citiesSlider">
                                <div class="swiper-wrapper">
                                    <div
                                        class="swiper-slide label transparent m-5 cursor-pointer"
                                        v-for="(city, $index) in getCities"
                                        :key="$index"
                                        :class="{
                                            'label-default': currentCity && currentCity.id !== city.id,
                                            'label-primary':  currentCity && currentCity.id === city.id
                                        }"
                                    >
                                        <span>
                                            {{city.name}} - {{city.state}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Cities-->

                    <div class="container">
                        <div class="row m-t-30">

                            <div class="col-sm-12 text-center">
                                <p class="f-info" v-if="!events.length && !interactions.is_loading">{{translations.noEvents}}</p>
                            </div>

                            <!-- Events -->

                            <div infinite-wrapper>
                                <router-link
                                    tag="div"
                                    class="col-sm-12 cursor-pointer"
                                    v-for="(event, indexEvents) in events" v-if="!interactions.is_loading"
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
                                        <span class="event-ranking">
                                            {{ event.rank_position }}º
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
                                        <div class="card-footer p-10">
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
                                    </div>
                                </router-link>
                            </div>

                            <infinite-loading ref="infiniteLoading" @infinite="getEvents" force-use-infinite-wrapper="true">
                                <span slot="no-more">
                                     <span class="f-700 text-white" v-if="events.length">{{translations.load_complete}}</span>
                                </span>

                                <span slot="no-results"></span>

                                <span slot="spinner" v-if="interactions.is_loading">
                                     <card-placeholder></card-placeholder>
                                </span>
                            </infinite-loading>
                            <!-- /Events -->

                            <div class="col-sm-12">

                                <p class="f-14 f-300 text-center m-t-20">{{translations.add_event_title}}</p>

                                <router-link :to="{name: 'general.events.create'}" class="btn btn-primary btn-block m-t-20">{{translations.add_event}}</router-link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </transition>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import { cleanPlaceModel } from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import * as translations from '@/translations/events/list'
    import moment from 'moment'

    import vueSlider from 'vue-slider-component'

    import InfiniteLoading from 'vue-infinite-loading'

    import bus from '@/utils/event-bus';

    import categoryAllPhoto from '../../../../assets/icons/header/star_pink.svg'

    export default {
        name: 'general-events-list',

        components: {
            mainHeader: require('@/components/main-header.vue'),
            cardPlaceholder: require('@/components/card-placeholder.vue'),
            pulse: require('@/components/pulse.vue'),
            InfiniteLoading,
            vueSlider,
        },

        data () {
            return {
                interactions:{
                    changeLocation: false,
                    showFilters: false,
                    is_loading: false,
                    finished_loading_category: false,
                },
                destroyed: false,
                placeholder: true,
                events: [],
                pagination: {},
                nextPage: 1,
                nextSet: 0,
                currentCategory: null,
                currentCity: null,
                radius: 100,
                processStyle: {backgroundColor: "#48C3D1"},
                tooltipStyle: {backgroundColor: "#48C3D1", borderColor: "#48C3D1"},
                categoryAll: {
                    name_en: 'All',
                    name_pt: 'Todos',
                    photo_url: categoryAllPhoto
                }
            }
        },

        computed: {
            ...mapGetters(['language', 'getCities', 'getUserLastGeoLocation', 'getCategories']),

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

            that.currentCity = that.getCities[0];

            if(that.$route.query.category_id){
                var index = that.getCategories.indexFromAttr('id', that.$route.query.category_id);
                that.selectCategory(that.getCategories[index]);
                that.interactions.is_loading = true;
            }

            if (localStorage.getItem('current_scroll')) {
                console.log(JSON.parse(localStorage.getItem('current_scroll')));
                $(window).animate({ scrollTop: JSON.parse(localStorage.getItem('current_scroll')) }, 300);
            }

            $(window).scroll(() => {
                let scroll = $(window).scrollTop();
                localStorage.setItem('current_scroll', scroll)
            })

            bus.$on('refresh-ranking', function(){
                that.currentCategory = null;
                that.interactions.finished_loading_category = false;
                that.interactions.is_loading = false;
            });



        },

        destroyed: function() {
            $(window).off("scroll");

            bus.$off('refresh-ranking');
            bus.$emit('ranking-category-cleaned');

        },

        methods: {
            ...mapActions(['setLoading']),

            resetBeforeChange(){
                this.events = []
                this.nextPage = 1
                this.nextSet = 0

                this.$nextTick(() => {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                });
            },

            changeCurrentCategory(category) {
                this.currentCategory = category
                this.resetBeforeChange()
            },

            getEvents($state) {
                let that = this

                that.$http.post(`event/rank/list`, {
                    language: that.language,
                    category_id: that.currentCategory.id,
                    lat: that.getUserLastGeoLocation.lat,
                    lng: that.getUserLastGeoLocation.lng,
                    city_id: that.currentCity.id,
                    page: that.nextPage,
                    next_set: that.nextSet,
                })
                    .then(function (response) {

                        that.interactions.is_loading = false;

                        if(!that.events.length){
                            that.events = response.data.events
                            that.pagination = response.data.pagination
                        }else{
                            that.events = that.events.concat(response.data.events)
                            that.pagination = response.data.pagination
                        }

                        if(that.pagination.current_page < that.pagination.last_page){
                            that.nextPage =  that.nextPage + 1
                            that.nextSet =  that.pagination.to
                            $state.loaded()
                        }else{
                            $state.loaded()
                            $state.complete()
                        }



                    }).catch(function (error) {
                   console.log(error)
                });

            },

            applyFilters(){
                //this.getEvents()

                $('#modal-filter').modal('hide')
            },

            handleModalVisibility(){
                $('#modal-filter').modal('show')
            },

            formatLabel(value){
                return `${value} km`
            },

            handleDistance(distance){
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

            handleRadius(val){
                this.radius = val
                //this.getEvents()
            },


            citiesSwiper() {
                let that = this

                setTimeout(() => {
                    let currentIndex = JSON.parse(localStorage.getItem('city_index'))

                    that.swiperTabs = new Swiper(that.$refs.citiesSlider, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: currentIndex ? currentIndex : 0,
                        loop: false,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {

                            that.currentCity = that.getCities[swiper.realIndex]
                            localStorage.setItem('city_index', swiper.realIndex)

                            that.resetBeforeChange()
                        },
                        breakpoints: {
                            350: {
                                slidesPerView: 2,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })

                }, 100)
            },

            selectCategory: function(category){
                let that = this

                that.currentCategory = category;


                setTimeout(function() {
                    that.interactions.finished_loading_category = true;
                    that.interactions.is_loading = true;
                    that.getEvents();
                    that.$router.push({ query: { category_id: category.id }})
                }, 500);

                setTimeout(function() {
                    that.citiesSwiper();
                }, 1000);

                bus.$emit('ranking-category-selected', category);

                that.events = [];



            },
        }
    }
</script>

<style scoped>

    /*  */

    .modal-footer {
        border-radius: 0;
        bottom:0px;
        position:absolute;
        width:100%;
    }
    .text-white{
        color: white;
    }

    /* Event Card */

    .divider {
        border-left: 1px solid #dfdfdf;
    }

    .event-ranking {
        position: absolute;
        top: 10px; left: 10px;
        background-color: #561F9F;
        color: #FFFD7B;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        font-weight: 700;
        border-radius: 6px;

    }

    .event-ranking small {
        width: 50%;
        text-align: center;
    }

    .badge-city {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-weight: bold;
        color: #ec538b;
        line-height: 1;
        vertical-align: middle;
        white-space: nowrap;
        text-align: center;
        background-color: #fff;
        border-radius: 10px;
        font-size: 11px;
    }

    .col-row {
        width: 100%;
        column-count: 2;
        column-gap: 0;
    }

    .col {
        width: 100%;
        display: inline-block;
        padding: 5px;
    }

    .card-cat{
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;
    }
</style>
