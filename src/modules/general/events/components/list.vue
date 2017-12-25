<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <pulse v-if="interactions.is_loading" :icon="'ion-navigate'"/></pulse>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" v-if="!interactions.is_loading">

            <div class="main">

                <h3 class="text-center f-success">Trending</h3>

                <!-- CATEGORIAS -->
                <div  v-show="!interactions.finished_loading_category && !$route.query.category_id">


                    <div class="container">
                        <p class="f-16 f-300 text-center m-t-10">{{translations.title_category}}</p>

                        <!-- CATEGORIES -->
                        <div class="col-row-categories">
                            <!-- ALL -->
                            <div class="col-categories">
                                <div class="card-cat text-center"
                                    @click="selectCategory(categoryAll)"
                                    :class="{'bounce' : currentCategory == categoryAll}">
                                    <div class="p-10">
                                        <img src="../../../../assets/icons/categories/magician.svg" class="icon-img icon-img-l m-t-5">
                                        <p class="f-default m-t-10">{{categoryAll['name_' + language]}}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- ALL -->

                            <div class="col-categories" v-for="category in getCategories">
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
                </div>
                <!-- CATEGORIAS -->

                <div class="" v-if="interactions.finished_loading_category">

                    <div class="container">

                        <div class="text-center">
                            <p class="f-16 f-300 text-center m-t-10">{{translations.before_category_type}}</p>
                            <h3 class="f-success m-t-0">{{currentCategory['name_'+language]}}</h3>
                        </div>

                        <div class="row m-t-30">

                            <!-- IF NO EVENTS -->
                            <div class="col-sm-12 text-center">
                                <div class="no-event-card m-t-20" v-if="!events.length && !infiniteLoadingEvents.is_loading">
                                    <img src="../../../../assets/icons/ghost.svg" />
                                    <p class="f-info m-t-20" >
                                        {{translations.noEvents}}
                                    </p>
                                </div>
                            </div>


                            <!-- EVENTS LIST -->
                            <div>
                                <router-link
                                    tag="div"
                                    class="col-sm-12 cursor-pointer"
                                    v-for="(event, indexEvents) in events" v-if="!interactions.is_loading"
                                    :to="{ name: 'events.show', params: { event_slug: event.slug }, query: { event_id: event.id }}"
                                    :key="indexEvents"
                                >
                                    <div class="card p-0">
                                        <!-- Card Header -->
                                        <div
                                            class="card-header cover event-cover-image p-5"
                                            :style="{backgroundImage: `url(${ event.cover })`}"
                                        >
                                            <span class="event-ranking">
                                                {{ event.rank_position }}º
                                            </span>
                                        </div>
                                        <!-- Card Body -->
                                        <div class="card-body card-padding">
                                            <h4 class="m-b-5">{{ event.name }} | Votos: {{event.vote_count}}</h4>
                                            <div style="opacity: .8;">
                                                <p class="m-b-5 max-lines-2-lines">{{ event.description }}</p>
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
                                                </div>
                                                <div class="col-xs-4 text-right">
                                                    <small class="f-primary">
                                                        <i class="ion-ios-star m-r-5"></i>{{ event.favorites }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>


                            <div class="" v-if="infiniteLoadingEvents.is_loading">
                                <card-placeholder></card-placeholder>
                            </div>

                            <div class="text-center m-t-20">
                                <button @click="resetCategory(true)" class="btn btn-primary" v-if="infiniteLoadingEvents.complete">
                                    {{translations.change_category_button}}
                                </button>
                            </div>


                            <div class="col-sm-12" style="margin-bottom: 70px;">

                                <p class="f-14 f-300 text-center m-t-20">{{translations.add_event_title}}</p>

                                <router-link :to="{name: 'events.create'}" class="btn btn-primary btn-block m-t-20">{{translations.add_event}}</router-link>
                            </div>

                        </div>
                    </div>

                </div>


            </div>


        </transition>

                <!-- Fixed Button -->
                <button type="button" class="btn btn-primary btn-block btn-fixed-bottom" @click="openFilter()">
                    <i class="ion-ios-location m-r-10"></i>
                    <span v-if="currentCity">{{ currentCity.name }} - {{ currentCity.state }}</span>
                    <span v-if="!currentCity">{{ translations.filter }}</span>
                    |
                    <span>
                        {{currentFilter[`name_${language}`]}}
                    </span>
                </button>

                <button type="button" class="btn btn-primary btn-block btn-fixed-bottom btn-fixed-bottom-modal"
                    @click.prevent="closeFilter()"
                    v-if="interactions.modalIsOpen">
                    {{ translations.modal.close }}
                </button>


                <!-- Modal Filter -->
                <div id="modal-filter" class="modal we-fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">{{ translations.modal.title }}</h3>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body">


                                <!--Filters-->
                                <div class="row">
                                    <div class="col-sm-12 text-center">
                                        <label class="f-700">{{ translations.trending_visualization }}</label>

                                        <div class="">
                                            <div class="">
                                                <div
                                                    class="btn btn-default cursor-pointer m-t-10 m-r-10"
                                                    v-for="(filter, $filterIndex) in timeFilters"
                                                    :class="{'btn-primary bounce': currentCity && currentFilter == filter}"
                                                    @click="setFilter(filter, $filterIndex)"
                                                >
                                                        {{filter[`name_${language}`]}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Filters-->

                                <!--Cities-->
                                <div class="row m-t-30">
                                    <div class="col-sm-12 text-center">
                                        <label class=" f-700">{{ translations.nearCities }}</label>
                                        <p class="f-info" v-if="!getCities.length">{{ translations.noCity }}</p>

                                        <!-- Card Cities -->
                                        <div class="" ref="citiesSlider">
                                            <div class="">
                                                <div class="btn btn-default cursor-pointer m-t-10 m-r-10"
                                                     v-for="(city, $index) in getCities"
                                                     :key="$index"
                                                     :class="{'btn-primary bounce': currentCity == city}"
                                                     @click="setCity(city, $index)">
                                                    <span v-if="currentCity != city">
                                                        {{city.name}} - {{city.state}}
                                                    </span>
                                                    <span v-if="currentCity == city">
                                                        {{city.name}} - {{city.state}}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Card Citites -->

                                    </div>
                                </div>
                                <!--Cities-->

                            </div>
                            <!-- / Modal Body -->
                            <div class="modal-footer">

                            </div>

                        </div>

                    </div>

                </div>
                <!-- / Modal Filter -->



    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import { cleanPlaceModel } from '@/models/Place'
    import { cleanCategoriesArrayExample } from '@/models/Category'
    import * as translations from '@/translations/events/list'
    import moment from 'moment'

    import vueSlider from 'vue-slider-component'

    import bus from '@/utils/event-bus';

    import categoryAllPhoto from '../../../../assets/icons/categories/magician.svg'
    import axios from 'axios'

    var CancelToken = axios.CancelToken;
    var cancelCurrentRequest;

    export default {
        name: 'events-list',

        components: {
            mainHeader: require('@/components/main-header.vue'),
            cardPlaceholder: require('@/components/card-placeholder.vue'),
            pulse: require('@/components/pulse.vue'),
            vueSlider,
        },

        data () {
            return {
                interactions:{
                    changeLocation: false,
                    showFilters: false,
                    is_loading: false,
                    finished_loading_category: false,
                    modalIsOpen: false,
                },
                destroyed: false,
                placeholder: true,
                events: [],
                pagination: {},
                nextPage: 1,
                nextSet: 0,
                currentCategory: null,
                currentCity: null,
                currentCityIndex: 0,
                radius: 100,
                processStyle: {backgroundColor: "#48C3D1"},
                tooltipStyle: {backgroundColor: "#48C3D1", borderColor: "#48C3D1"},
                categoryAll: {
                    name_en: 'Surprise-me',
                    name_pt: 'Surpresa',
                    photo_url: categoryAllPhoto
                },
                infiniteLoadingEvents: {
                    nextPage: 1,
                    nextSet: 0,
                    complete: false,
                    is_loading: true,
                    first_load: true,
                },
                timeFilters:[
                    {name_en:'All time', name_pt: 'Geral', value: 'general'},
                    {name_en:'Today', name_pt: 'Hoje', value: 'today'},
                    {name_en:'This week', name_pt: 'Esta semana', value: 'week'},
                    {name_en:'This month', name_pt: 'Este mês', value: 'month'},
                    {name_en:'This year', name_pt: 'Este ano', value: 'year'}
                ],
                currentFilter: {name_en:'All time', name_pt: 'Geral', value: 'general'},
                currentFilterIndex: 0
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

            that.$nextTick(() => {

                var currentCityIndex = JSON.parse(localStorage.getItem('city_index'));

                if(currentCityIndex){
                    that.currentCityIndex = currentCityIndex;
                    that.currentCity = that.getCities[currentCityIndex];
                } else {
                    that.currentCity = that.getCities[0];
                }

                if(that.$route.query.category_id){
                    var index = that.getCategories.indexFromAttr('id', that.$route.query.category_id);
                    that.selectCategory(that.getCategories[index]);
                    that.interactions.is_loading = true;
                }

            })

            if (localStorage.getItem('current_scroll')) {
                $(window).animate({ scrollTop: JSON.parse(localStorage.getItem('current_scroll')) }, 300);
            }

            $(window).scroll(() => {
                let scroll = $(window).scrollTop();
                localStorage.setItem('current_scroll', scroll)

                if(!that.infiniteLoadingEvents.is_loading && !that.infiniteLoadingEvents.complete && that.currentCategory){

                    //Se chegar no final
                    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {

                        that.getEvents();

                    }

                }

            })

            bus.$on('refresh-ranking', function(){
                that.resetCategory();
            });

        },

        destroyed: function() {
            $(window).off("scroll");

            bus.$off('refresh-ranking');
            bus.$emit('ranking-category-cleaned');

        },

        methods: {
            ...mapActions(['setLoading']),

            setCity: function(city, index){
                let that = this

                that.currentCity = that.getCities[index]
                that.currentCityIndex = index
                localStorage.setItem('city_index', index)

            },

            setFilter: function(filter, index){
                let that = this

                that.currentFilter = that.timeFilters[index]
                that.currentFilterIndex = index
                localStorage.setItem('filter_index', index)

            },

            openFilter() {
                $('#modal-filter').modal('show');
                this.interactions.modalIsOpen = true;
            },

            closeFilter: function(){
                $('#modal-filter').modal('hide');
                this.interactions.modalIsOpen = false;
                if(this.currentCategory){
                    this.resetBeforeChange();
                }
            },

            resetCategory: function(refresh_query = false){
                let that = this

                that.currentCategory = null;

                if(refresh_query){
                    that.$router.push({name: 'events.list'});
                }

                that.interactions.finished_loading_category = false;
                that.interactions.is_loading = false;
                that.infiniteLoadingEvents.nextPage = 1;
                that.infiniteLoadingEvents.nextSet = 0;
                that.infiniteLoadingEvents.complete = false;

                bus.$emit('ranking-category-cleaned');

                if (typeof cancelCurrentRequest === "function") {
                    cancelCurrentRequest()
                }


            },

            resetBeforeChange(){

                this.infiniteLoadingEvents.complete = false;
                this.infiniteLoadingEvents.nextPage = 1;
                this.infiniteLoadingEvents.nextSet = 0;
                this.events = [];

                if (typeof cancelCurrentRequest === "function") {
                    cancelCurrentRequest()
                }

                this.getEvents();

            },

            getEvents() {
                let that = this

                if(!that.currentCategory){
                    return
                }

                that.infiniteLoadingEvents.is_loading = true;
                that.infiniteLoadingEvents.first_load = false;

                that.$http.post(`event/rank/list`, {
                    language: that.language,
                    category_id: that.currentCategory.id,
                    lat: that.getUserLastGeoLocation.lat,
                    lng: that.getUserLastGeoLocation.lng,
                    city_id: that.currentCity.id,
                    page: that.infiniteLoadingEvents.nextPage,
                    next_set: that.infiniteLoadingEvents.nextSet,
                    filter: that.currentFilter.value
                }, {
                    cancelToken: new CancelToken(function executor(cancel) {
                        cancelCurrentRequest = cancel;
                    })
                })
                    .then(function (response) {

                        that.infiniteLoadingEvents.is_loading = false;

                        if (!that.events.length) {
                            that.events = response.data.events
                            that.pagination = response.data.pagination
                        } else {
                            that.events = that.events.concat(response.data.events)
                            that.pagination = response.data.pagination
                        }

                        if (that.pagination.current_page < that.pagination.last_page) {
                            that.infiniteLoadingEvents.nextPage = that.infiniteLoadingEvents.nextPage + 1
                            that.infiniteLoadingEvents.nextSet = that.pagination.to
                        } else {
                            that.infiniteLoadingEvents.complete = true;
                        }

                    }).catch(function (error) {
                        //console.log(error.response)
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

            selectCategory: function(category){
                let that = this

                that.currentCategory = category;

                setTimeout(function() {
                    that.interactions.finished_loading_category = true;
                    that.interactions.is_loading = false;
                    that.$router.push({ query: { category_id: category.id }})
                    that.resetBeforeChange();
                }, 300);

                bus.$emit('ranking-category-selected', category);

                that.events = []
                that.infiniteLoadingEvents.nextPage = 1
                that.infiniteLoadingEvents.nextSet = 0

            },

        }
    }
</script>

<style scoped>


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

    .card-cat{
        background-color: #FFFFFF;
        border-radius: 15px;
        cursor: pointer;
    }

    .img-cat {
        width: auto; height: 70px;
        display: block;
        margin: 0 auto;
    }

    .no-event-card{
        padding: 15px;
        text-align: center;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, .4);
        margin-bottom: 50px;
    }

    .no-event-card img {
        height: 144px;
        margin-top: 5px;
    }

</style>
