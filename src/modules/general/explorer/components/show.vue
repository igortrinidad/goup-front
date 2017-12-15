<template>

    <div class="first-container">

        <main-header
            :title="'home'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <pulse v-if="interactions.is_loading && interactions.finished_loading_category" :icon="'ion-navigate'"/>
        </pulse>

        <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="main">

                <!-- CATEGORIES -->
                <div class="container" v-show="!interactions.finished_loading_category && !interactions.is_loading"
                     :class="{'cat-is-selected' : currentCategory}">

                    <p class="f-16 f-300 text-center m-t-10">{{translations.select_category}}</p>

                    <div class="col-row">
                        <!-- ALL -->
                        <div class="col">
                            <div class="card-cat text-center"
                                 @click="selectCategory(categoryAll)"
                                 :class="{'bounce' : currentCategory == categoryAll}">
                                <div class="p-10">
                                    <img src="../../../../assets/icons/header/star_pink.svg" class="icon-img icon-img-l m-t-5">
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
                                    <img :src="category.photo_url" class="icon-img icon-img-l m-t-5">
                                    <p class="f-default m-t-10">{{category['name_' + language]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- CATEGORIES -->

                <!-- EXPLORER -->
                <div class="container" v-if="interactions.finished_loading_category && !interactions.is_loading">

                    <h3 class="text-center f-success">Explorer</h3>

                    <p class="f-info text-center m-b-30 m-t-30" v-show="!events.length && !interactions.is_loading && !interactions.lazy_image">
                        {{ translations.end_list }}
                    </p>

                    <card-placeholder-explorer  v-show="interactions.lazy_image"></card-placeholder-explorer>

                    <!-- Cards -->
                    <div class="cards m-t-20" v-if="events.length && !interactions.is_loading && !interactions.lazy_image">

                        <!-- FIRST EVENT -->
                        <div id="card-animated" class="card m-0" ref="cardAnimated">
                            <!-- Card Header -->

                            <div
                                id="card-lazy-image"
                                class="card-header cover"
                                :style="{
                                    backgroundImage: `url(${ events[0].cover })`,
                                    height: '200px',
                                    borderRadius: '6px 6px 0 0'
                                }"
                            >

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information f-success cursor-pointer"
                                    v-if="events[0].slug"
                                    :to="{ name: 'general.events.show', params: { event_slug: events[0].slug } }"
                                >
                                </router-link>

                            </div>
                            <!-- / Card Header -->

                            <!-- Current Action -->
                            <span class="card-action up" v-show="interactions.up">
                                {{ translations.up }}
                            </span>
                            <span class="card-action down" v-show="interactions.down">
                                {{ translations.down }}
                            </span>
                            <span class="card-action skip" v-show="interactions.skip">
                                {{ translations.skip }}
                            </span>
                            <span class="card-action save" v-show="interactions.favorite">
                                {{ translations.favorite }}
                            </span>
                            <!-- / Current Action -->

                            <!-- Card Body -->
                            <div class="card-body card-padding">
                                <h4 class="m-b-5 t-overflow">{{ events[0].name }}</h4>
                                <div style="opacity: .8;">
                                    <p class="m-b-5 t-overflow">{{ events[0].description }}</p>
                                </div>
                            </div>
                            <!-- Card Footer -->
                            <div class="card-footer p-10">
                                <div class="row">
                                    <div class="col-xs-8" style="opacity: .8;">
                                        <small>
                                            <i class="ion-location m-r-5"></i>{{ handleDistance(events[0].distance) }}
                                        </small>
                                    </div>
                                    <div class="col-xs-4 text-right">
                                        <small class="f-primary">
                                            <i class="ion-ios-star m-r-5"></i>{{ events[0].favorited_count }}
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- / FIRST EVENT -->

                        <!-- SECOND EVENT -->
                        <div class="card m-0" v-if="events.length > 1">
                            <!-- Card Header -->
                            <div
                                id="card-lazy-image"
                                class="card-header cover"
                                :style="{
                                    backgroundImage: `url(${ events[1].cover })`,
                                    height: '200px',
                                    borderRadius: '6px 6px 0 0'
                                }"
                                v-show="!interactions.lazy_image"
                            >

                                <router-link
                                    tag="span"
                                    class="icon-information ion-ios-information f-success cursor-pointer"
                                    v-if="events[1].slug"
                                    :to="{ name: 'general.events.show', params: { event_slug: events[1].slug } }"
                                >
                                </router-link>

                            </div>
                            <!-- / Card Header -->

                            <!-- Card Body -->
                            <div class="card-body card-padding">
                                <h4 class="m-b-5 t-overflow">{{ events[1].name }}</h4>
                                <div style="opacity: .8;">
                                    <p class="m-b-5 t-overflow">{{ events[1].description }}</p>
                                </div>
                            </div>
                            <!-- Card Footer -->
                            <div class="card-footer p-10">
                                <div class="row">
                                    <div class="col-xs-8" style="opacity: .8;">
                                        <small>
                                            <i class="ion-location m-r-5"></i>{{ handleDistance(events[1].distance) }}
                                        </small>
                                    </div>
                                    <div class="col-xs-4 text-right">
                                        <small class="f-primary">
                                            <i class="ion-ios-star m-r-5"></i>{{ events[1].favorited_count }}
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- SECOND EVENT -->

                    </div>
                    <!-- Cards -->

                    <!-- Actions -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="actions">

                                <div v-if="events.length && isLogged || interactions.is_loading">
                                    <span class="action skip" @click="skip()">
                                        <span class="ion-ios-rewind f-default"></span>
                                    </span>

                                    <span class="action xl down" @click="goDown()">
                                        <span class="ion-chevron-down f-red "></span>
                                    </span>

                                    <span class="action xl up" @click="goUp()">
                                        <span class="ion-chevron-up f-green"></span>
                                    </span>

                                    <span class="action favorite" @click="favorite()">
                                        <span class="ion-ios-star f-primary"></span>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- / Actions -->

                    <!--Cities-->
                    <div class="row m-t-20">
                        <div class="col-sm-12 text-center">

                            <label class="f-success f-700">{{ translations.nearCities }}</label>
                            <p class="f-info" v-if="!getCities.length">{{ translations.noCity }}</p>
                            <div class="swiper-container" ref="citiesSlider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide label transparent m-5 cursor-pointer"
                                         v-for="(city, $index) in getCities"
                                         :key="$index"
                                         :class="{'cursor-pointer': currentCity != city, 'label-primary':currentCity == city}">
                                        <span v-if="currentCity != city">{{city.name}} - {{city.state}}  <span
                                            class="badge-city">{{city.categories[currentCategory.id]}}</span></span>

                                        <span v-if="currentCity == city">{{city.name}} - {{city.state}}  <span
                                            class="badge-city">{{events.length}}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Cities-->

                    <!--DAYS SELECTEDS-->
                    <div class="row m-t-20">
                        <div class="col-sm-12 text-center">

                            <label class="f-success f-700">{{ translations.title_when }}</label>

                            <div class="week-row">
                                <button
                                    class="btn btn-default btn-sm m-r-5"
                                    :class="{'btn-primary' : days_selecteds.indexOf(day) > -1}"
                                    v-for="(day, $index) in current_week"
                                    @click="toggleDay(day)"
                                >
                                    {{day.format('dddd')}} | {{day.format('DD')}}
                                </button>
                            </div>

                        </div>
                    </div>
                    <!--DAYS SELECTEDS-->

                    <button class="btn btn-primary btn-block m-t-30 m-b-30" :disabled="!days_selecteds_to_query.monthly"
                            @click.prevent="getEvents">{{translations.search_button}}
                    </button>

                    <hr>

                    <p class="f-14 f-300 text-center">{{translations.add_event_title}}</p>

                    <router-link
                        :to="{name: 'general.events.create'}"
                        class="btn btn-primary btn-block"
                        v-if="!interactions.is_loading"
                    >
                        {{translations.add_event}}
                    </router-link>

                </div>
                <!-- EXPLORER -->

            </div>
        </transition>

    </div>

</template>

<script>
    import Hammer from 'hammerjs'
    import {transition} from 'jquery.transit'
    import {mapGetters, mapActions} from 'vuex'

    import {cleanPlaceModel} from '@/models/Place'

    import * as translations from '@/translations/explorer/show'
    import moment from 'moment'

    import bus from '@/utils/event-bus';
    import categoryAllPhoto from '../../../../assets/icons/header/star_pink.svg'
    import axios from 'axios'
    var CancelToken = axios.CancelToken;
    var cancelCurrentRequest;

    export default {
        name: 'EXPLORER',

        components: {
            mainHeader: require('@/components/main-header.vue'),
            pulse: require('@/components/pulse.vue'),
            cardPlaceholderExplorer: require('@/components/card-placeholder-explorer.vue'),
        },

        data() {
            return {
                interactions: {
                    up: false,
                    down: false,
                    skip: false,
                    favorite: false,
                    is_loading: false,
                    finished_loading_category: false,
                    action: 'up',
                    lazy_image: true
                },
                starting: true,
                placeholder: true,
                events: [],
                active: false,
                top: 0,
                left: 0,
                currentCity: null,
                currentCategory: null,
                current_week: [],
                days_selecteds: [],
                days_selecteds_to_query: {
                    monthly: [],
                    weekly: [],
                    get_by_date: false,
                    init: moment().format('DD/MM/YYYY'),
                    end: moment().add(3, 'months').format('DD/MM/YYYY'),
                },
                categoryAll: {
                    id: 'all',
                    name_en: 'All',
                    name_pt: 'Todos',
                    photo_url: categoryAllPhoto
                }
            }
        },

        computed: {

            ...mapGetters(['language', 'isLogged', 'currentUser', 'getUserLastGeoLocation', 'getCities', 'getCategories']),

            'translations': function () {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            },
        },

        mounted() {

            var that = this;

            that.currentCity = that.getCities[0];

            if (that.$route.query.category_id && that.$route.query.category_id != 'all') {

                var index = that.getCategories.indexFromAttr('id', that.$route.query.category_id);
                that.selectCategory(that.getCategories[index]);
                that.interactions.is_loading = true;

            } else {

                this.setCities();
                this.setCategories();
                this.updateUserGeolocation();

            }


            bus.$on('refresh_explorer', function () {
                that.currentCategory = null;
                that.interactions.finished_loading_category = false;
                that.interactions.is_loading = false;
                if (cancelCurrentRequest) {
                    cancelCurrentRequest()
                }
            });

            this.initWeek();

            setTimeout(function () {
                that.checkDaysToQuery();
            }, 100);

        },

        destroyed() {
            bus.$off('refresh_explorer');
            bus.$emit('category-cleaned');
        },


        methods: {

            ...mapActions(['setCities', 'setCategories', 'updateUserGeolocation', 'handleUserInteraction']),

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.events.length) {
                    setTimeout(() => {
                        that.hammerCards = new Hammer(that.$refs.cardAnimated)
                        that.hammerCards.get('pan').set({direction: Hammer.DIRECTION_ALL})
                        that.hammerCards.on('panleft panright panup pandown tap press', function (ev) {
                            that.animateCurrentCard(ev)
                        })

                        $('#card-animated').bind('touchend', function (ev) {
                            that.touchend()
                        })

                    }, 200)
                }
            },

            touchend(top) {
                let that = this
                // Não passou da distancia minima para nenhum lado. Volta a posição inicial
                if (that.top > -75 && that.top < 75 && that.left > -75 && that.left < 75) {
                    $('#card-animated').transition({x: 0, y: 0}, 300)
                } else {
                    // UP
                    if (that.top < -75) {
                        that.action = 'up'
                        $('#card-animated').transition({y: -200, opacity: 0}, 300, () => that.resetPosition())
                    }
                    // DOWN
                    if (that.top > 75) {
                        that.action = 'down'
                        $('#card-animated').transition({y: 200, opacity: 0}, 300, () => that.resetPosition())
                    }
                    // Skip
                    if (that.left > 75) {
                        that.action = 'save'
                        $('#card-animated').transition({x: 300, opacity: 0}, 300, () => that.resetPosition())

                    }
                    // Favorite
                    if (that.left < -75) {
                        that.action = 'skip'
                        $('#card-animated').transition({x: -300, opacity: 0}, 300, () => that.resetPosition())
                    }
                }
            },

            resetPosition() {

                let interaction = _.cloneDeep(this.interactions)
                interaction.user_id = this.currentUser.id
                interaction.event_id = this.events[0].id

                this.handleInteraction(interaction)

                // Reset Global Top And Left
                this.top = 0
                this.left = 0

                // Reset Interactions
                this.interactions.up = false
                this.interactions.down = false
                this.interactions.skip = false
                this.interactions.favorite = false


                // Remove From Array
                this.events.splice(0, 1)
                $(this.$refs.cardAnimated).transition({x: 0, y: 0, opacity: 1}, 0)
            },

            animateCurrentCard(e) {

                let that = this

                if (!e.isFinal) {
                    const top = e.deltaY
                    const left = e.deltaX

                    that.top = top
                    that.left = left

                    $('#card-animated').transition({x: left, y: top}, 0)

                    if (top > -75 && top < 75 && left > -75 && left < 75) {
                        // Do nothing just reset position
                        that.interactions.up = false
                        that.interactions.down = false
                        that.interactions.favorite = false
                        that.interactions.skip = false
                    } else {
                        // UP
                        if (top < -75) {
                            that.interactions.up = true
                            that.interactions.down = false
                            that.interactions.favorite = false
                            that.interactions.skip = false
                            return
                        }
                        // DOWN
                        if (top > 75) {
                            that.interactions.up = false
                            that.interactions.down = true
                            that.interactions.favorite = false
                            that.interactions.skip = false
                            return
                        }
                        // FAVORITE
                        if (left > 75 && (top > -75 && top < 75)) {
                            that.interactions.up = false
                            that.interactions.down = false
                            that.interactions.favorite = true
                            that.interactions.skip = false
                            return
                        }
                        // SKIP
                        if (left < -75 && (top > -75 && top < 75)) {
                            that.interactions.up = false
                            that.interactions.down = false
                            that.interactions.favorite = false
                            that.interactions.skip = true
                            return
                        }
                    }
                }
            },

            // Button Action UP
            goUp() {
                this.interactions.up = true
                $('#card-animated').transition({x: 0, y: -100, opacity: 0}, 1000, () => this.resetPosition())
            },
            // Button Action DOWN
            goDown() {
                this.interactions.down = true
                $('#card-animated').transition({x: 0, y: 100, opacity: 0}, 1000, () => this.resetPosition())
            },
            // Button Action FAVORITE
            favorite() {
                this.interactions.favorite = true
                $('#card-animated').transition({x: 100, y: 0, opacity: 0}, 1000, () => this.resetPosition())
            },
            // Button Action SKIP
            skip() {
                this.interactions.skip = true
                $('#card-animated').transition({x: -100, y: 0, opacity: 0}, 1000, () => this.resetPosition())
            },

            handleDistance(distance) {
                distance = parseFloat(distance);
                return `${distance.toFixed(2)} km`
            },

            citiesSwiper() {
                let that = this

                let currentIndex = JSON.parse(localStorage.getItem('city_index'))

                setTimeout(() => {
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

                            localStorage.setItem('city_index', swiper.realIndex)

                            let city = that.getCities[swiper.realIndex]

                            if (that.currentCity.id != city.id) {
                                that.currentCity = city
                                that.getEvents();
                            }


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

            getEvents() {
                let that = this

                that.events = []

                that.interactions.lazy_image = true

                that.$http.post('event/explorer/list', {
                    language: that.language,
                    lat: that.getUserLastGeoLocation.lat,
                    lng: that.getUserLastGeoLocation.lng,
                    city_id: that.currentCity ? that.currentCity.id : null,
                    category_id: that.currentCategory.id,
                    filters: that.days_selecteds_to_query
                }, {
                    cancelToken: new CancelToken(function executor(cancel) {
                        cancelCurrentRequest = cancel;
                    })
                })
                    .then(function (response) {

                        that.events = response.data.events
                        that.interactions.is_loading = false;
                        setTimeout(function () {
                            that.interactions.lazy_image = false
                        }, 200);

                        that.mountHammer();

                        that.citiesSwiper();


                    }).catch(function (error) {
                    console.log(error)
                    that.interactions.is_loading = false;
                });

            },

            handleInteraction(interaction) {
                let that = this

                that.handleUserInteraction({city_id: that.currentCity.id, category_id: that.currentCategory.id})

                that.$http.post('event/interaction/store', interaction)
                    .then(function (response) {

                        console.log(response)

                    }).catch(function (error) {
                    console.log(error)
                });

            },

            selectCategory: function (category) {
                let that = this

                that.currentCategory = category;
                bus.$emit('category-selected', category);

                setTimeout(function () {
                    that.interactions.is_loading = true;
                    that.interactions.finished_loading_category = true;
                    that.$router.push({query: {category_id: category.id}})
                }, 500);

                setTimeout(function () {
                    that.currentCity = that.getCities[0];
                    that.getEvents();
                }, 600);

                if(cancelCurrentRequest){
                    cancelCurrentRequest()
                }

            },

            initWeek: function () {
                let that = this

                for (var m = moment(); m.isBefore(moment().add(6, 'days')); m.add(1, 'days')) {

                    var newM = m.clone();
                    this.current_week.push(newM);
                    this.days_selecteds.push(newM);

                }
            },

            toggleDay: function (day) {
                let that = this


                if (!this.days_selecteds.length) {

                    this.days_selecteds.push(day)
                    this.checkDaysToQuery();
                    return

                }


                this.days_selecteds.forEach(function ($day, index, array) {


                    if ($day.format('DD') == day.format('DD')) {
                        array.splice(index, 1);
                        return
                    }

                    if (array.length == index + 1) {
                        array.push(day)
                    }

                })

                this.checkDaysToQuery();


            },

            checkDaysToQuery: function () {

                var that = this;

                that.days_selecteds_to_query.monthly = [];
                that.days_selecteds_to_query.weekly = [];

                that.days_selecteds.forEach(function ($day) {

                    //Adiciona o dia do mês à query
                    that.days_selecteds_to_query.monthly.push(Math.ceil(moment($day).format('DD') / 7) + '-' + moment($day).day());

                    //Adiciona o dia da semana na query
                    that.days_selecteds_to_query.weekly.push(moment($day).day());
                });

            }
        }
    }
</script>

<style scoped>
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

    @media (min-width: 900px) {
        .col-row {
            column-count: 3;
        }
    }

    .week-row {
        overflow-x: scroll;
        white-space: nowrap;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .cards {
        position: relative;
        height: 388px;
    }

    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .cards #card-animated {
        z-index: 10;
    }

    .fadeInLeft {
        transition: 0.1s;
    }

    .icon-information {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 30px;
        color: #fff;
        z-index: 7;
    }

    .icon-favorite {
        position: absolute;
        top: 0px;
        left: 10px;
        font-size: 30px;
        color: #fff;
        z-index: 7;
    }

    .card-cat-col {
        padding-right: 10px;
        padding-left: 10px;
        margin-top: 20px;
    }

    .card-cat {
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;
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

    .badge-category {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-weight: bold;
        color: #fff;
        line-height: 1;
        vertical-align: middle;
        white-space: nowrap;
        text-align: center;
        background-color: #ec538b;
        border-radius: 10px;
        font-size: 11px;
    }

    @media (max-width: 360px) {
        .cards {
            height: 260px
        }

        .card-placeholder {
            height: 260px
        }
    }
</style>
