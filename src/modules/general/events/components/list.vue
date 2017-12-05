<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <div class="main">

                <!-- CATEGORIES -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <label class="f-13 f-300">{{ translations.categories }}</label>
                        <div class="swiper-container" ref="categorySlider">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide label transparent m-5 cursor-pointer"
                                    :class="{
                                        'label-default': currentCategory !== category,
                                        'label-primary': currentCategory === category
                                    }"
                                    v-for="(category, $index) in getCategories"
                                    :key="$index"
                                >
                                    {{ category[`name_${language}`]}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Categories Filters -->
                <!--Cities-->
                <div class="row m-t-10">
                    <div class="col-sm-12 text-center">
                        <label class="f-13 f-300">{{ translations.nearCities }}</label>
                        <p v-if="!getCities.length" >Nenhuma cidade próxima.</p>
                        <div class="swiper-container" ref="citiesSlider">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide label transparent m-5 cursor-pointer"
                                    v-for="(city, $index) in getCities"
                                    :key="$index"
                                    :class="{
                                        'label-default': currentCity !== city.id,
                                        'label-primary': currentCity === city.id
                                    }"
                                >
                                    <span v-if="currentCity == city.id">
                                        {{city.name}} - {{city.state}}
                                    </span>
                                    <span v-if="currentCity != city.id">
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

                        <div class="col-sm-12">
                            <h4 v-if="!events.length && !interactions.is_loading" class="text-center">
                                {{translations.noEvents}}
                            </h4>
                        </div>

                        <!-- Events -->

                        <card-placeholder v-if="interactions.is_loading" />

                        <router-link
                            tag="div"
                            class="col-sm-12"
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
                        <!-- /Events -->

                        <div class="col-sm-12">
                            <router-link :to="{name: 'general.events.create'}" class="btn btn-primary btn-block m-t-20">{{translations.add_event}}</router-link>
                        </div>

                    </div>

                </div>

                <!-- Modal Filter -->
                <div class="modal" id="modal-filter" tabindex="-1" role="dialog" aria-labelledby="modal-filter" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button
                                    type="button"
                                    class="btn btn-primary transparent btn-close"
                                    data-dismiss="modal"
                                >
                                    <i class="ion-close-round"></i>
                                </button>
                                <h3 class="title text-center">{{ translations.filters }}</h3>
                            </div>
                            <div class="modal-body text-primary">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="label label-primary" @click.prevent="applyFilters">Aplicar filtros</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Modal Filter -->
            </div>
        </transition>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    import { cleanPlaceModel } from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import * as translations from '@/translations/events/list'
    import moment from 'moment'
    import vueSlider from 'vue-slider-component'

    export default {
        name: 'general-events-list',

        components: {
            mainHeader,
            vueSlider,
            cardPlaceholder
        },

        data () {
            return {
                interactions:{
                    changeLocation: false,
                    showFilters: false,
                    is_loading: true,
                },
                destroyed: false,
                placeholder: true,
                events: [],
                currentCategory: null,
                currentCity: null,
                radius: 100,
                processStyle: {backgroundColor: "#48C3D1"},
                tooltipStyle: {backgroundColor: "#48C3D1", borderColor: "#48C3D1"}
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

            if (localStorage.getItem('current_scroll')) {
                console.log(JSON.parse(localStorage.getItem('current_scroll')));
                $(window).animate({ scrollTop: JSON.parse(localStorage.getItem('current_scroll')) }, 300);
            }

            $(window).scroll(() => {
                let scroll = $(window).scrollTop();
                localStorage.setItem('current_scroll', scroll)
            })

            this.categorySwiper();
            this.citiesSwiper();
            this.currentCategory = this.getCategories[0];
            this.currentCity = this.getCities[0];
            this.getEvents();

        },

        destroyed: function() {
            $(window).off("scroll");
        },

        methods: {
            ...mapActions(['setLoading']),

            changeCurrentCategory(category) {
                this.currentCategory = category
                this.getEvents();
            },

            getEvents() {
                let that = this

                that.events = [];
                that.interactions.is_loading = true;

                that.$http.post('event/rank/list', {
                    language: that.language,
                    category_id: that.currentCategory.id,
                    lat: that.getUserLastGeoLocation.lat,
                    lng: that.getUserLastGeoLocation.lng,
                    radius: that.radius,
                    city_id: that.currentCity.id,
                })
                    .then(function (response) {
                        that.events = response.data.events
                        that.interactions.is_loading = false;
                        console.log(that.events);
                    }).catch(function (error) {
                    that.interactions.is_loading = false;
                });

            },

            applyFilters(){
                this.getEvents()

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
                this.getEvents()
            },


            categorySwiper() {
                let that = this

                setTimeout(() => {

                    let currentIndex = JSON.parse(localStorage.getItem('category_index'))

                    that.swiperTabs = new Swiper(that.$refs.categorySlider, {
                        spaceBetween: 0,
                        slidesPerView: 5,
                        initialSlide: currentIndex ? currentIndex : 0,
                        loop: false,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        onSlideChangeEnd: swiper => {
                            that.changeCurrentCategory(that.getCategories[swiper.realIndex])
                            localStorage.setItem('category_index', swiper.realIndex)
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
                            that.getEvents();

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
</style>
