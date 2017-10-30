<template>
    <div class="first-container">

        <main-header
            :type="'logo'"
            :title="'Home'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <div class="wrapper search">
            <div class="container">
                <div class="full m-t-20">
                    <span class="search-label d-block m-b-5 text-center">Encontre profissionais para te ajudar a cuidar da sua saúde, bem estar ou estética.</span>
                    <div class="form-group">
                        <GmapAutocomplete
                            class="form-control"
                            :select-first-on-enter="true"
                            @place_changed="setSearchAdress"
                            placeholder="Cidade ou endereço para procurar"
                            :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                        >
                        </GmapAutocomplete>
                    </div>

                    <button class="btn btn-info btn-block m-b-15" @click="goSearch()">Buscar profissionais e empresas</button>
                </div>
            </div>
        </div>

        <!-- RECEITAS -->
        <div class="container m-t-20" v-if="placeholder.recipes || lastMealRecipes.length">

            <div v-if="lastMealRecipes.length">
                <h2 class="f-300 text-center">Receitas</h2>

                <card-placeholder v-if="placeholder.recipes" :headerFullImage="true" :loop="1">
                </card-placeholder>

                <div v-if="!placeholder.recipes" class="swiper-container swiper-last-recipes" ref="swiperLastMealRecipes">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="recipe in lastMealRecipes">
                            <!-- Card Recipe -->
                            <router-link tag="div" :to="{ name: 'landing.meal-recipes.show', params: { slug: recipe.slug }}" class="card m-b-10 cursor-pointer">
                                <!--  Card Recipe Header-->
                                <div class="card-header ch-alt text-center card-picture-header" :style="`background-image:url('${ recipe.avatar }')`">
                                    <div class="hover">
                                        <i class="ion-ios-plus-empty"></i>
                                    </div>
                                </div>
                                <!-- / Card Recipe Header -->

                                <!-- Card Recipe Body -->
                                <div class="card-body card-padding text-center">

                                    <h3 class="f-300 m-t-5 t-overflow">{{ recipe.title }}</h3>
                                    <!--Rating-->
                                    <rating-simple
                                        :value.sync="recipe.current_rating"
                                        :max="5"
                                        :size="1"
                                        :align-class="'text-center'"
                                    ></rating-simple>
                                    <!--Rating-->

                                    <!--Infos-->

                                    <div class="row m-t-10">
                                        <div class="recipe-info time-info">
                                            <i class="ion-android-alarm-clock fa-lg f-primary"></i> {{recipe.prep_time}} MIN
                                        </div>
                                        <div class="recipe-info">
                                            <i class="ion-android-restaurant fa-lg f-primary"></i> {{recipe.portions}} {{recipe.portions > 1 ? 'Porções' : 'Porção'}}
                                        </div>
                                    </div>
                                    <!--Infos-->
                                </div>
                                <!-- / Card Recipe Body -->
                                <div>
                                    <div class="text-center m-b-10">
                                        <span class="label label-info p-5 f-14">{{recipe.type.name}}</span>
                                        <div class="text-center m-t-10 m-b-10">
                                            <span class="label label-success m-t-5 p-5 f-14 m-r-5" v-for="(tag, indexTag) in recipe.tags">{{tag.name}}</span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            <!-- / Card Event -->
                        </div>
                    </div>
                    <div class="swiper-button-prev" v-show="lastMealRecipes.length > 1"><i class="ion-ios-arrow-back"></i></div>
                    <div class="swiper-button-next" v-show="lastMealRecipes.length > 1"><i class="ion-ios-arrow-forward"></i></div>
                    <div style="height: 50px;" v-show="lastMealRecipes.length > 1"></div>
                    <div class="swiper-pagination primary" v-show="lastMealRecipes.length > 1"></div>
                </div>
            </div>
        </div>

        <!-- Last Events -->
        <div class="container m-t-20" v-if="placeholder.events || lastEvents.length">
            <div>
                <h2 class="f-300 text-center">Eventos</h2>


                <card-placeholder v-if="placeholder.events" :headerFullImage="true" :loop="1">
                </card-placeholder>


                <div v-if="!placeholder.events" class="swiper-container swiper-last-events" ref="swiperLastEvents">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="event in lastEvents">
                            <!-- Card Event -->
                            <router-link tag="div" :to="{ name: 'landing.events.show', params: { event_id: event.id } }" class="card m-b-10 cursor-pointer">

                                <!--  Card Event Header-->
                                <div class="card-header ch-alt text-center card-picture-header" :style="`background-image:url('${ event.avatar }')`">
                                    <div class="hover">
                                        <i class="ion-ios-plus-empty"></i>
                                    </div>
                                </div>

                                <!-- / Card Event Header -->

                                <!-- Card Event Body -->
                                <div class="card-body card-padding">
                                    <div class="row row-event">
                                        <!-- Event Date -->
                                        <div class="col-xs-3 event-col">
                                            <div class="event-date text-center">
                                                <div class="event-date-header">
                                                    <span class="f-700 f-12" v-if="event.date">{{ event.date | moment('YYYY') }}</span>
                                                </div>
                                                <div class="event-date-body">
                                                    <span class="f-700 f-16">{{ event.date | moment('DD') }}</span>
                                                    <span class="f-300">{{ event.date | moment('MMM') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- / Event Date -->
                                        <div class="col-xs-9 event-col">
                                            <div class="list-cats">
                                                <span
                                                    class="label label-primary f-300 f-14 m-t-5 m-r-5 t-overflow"
                                                    v-for="(category, $indexCategory) in event.categories"
                                                    v-if="$indexCategory === 0"
                                                >
                                                    {{ category.name }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 class="f-300">{{ event.name }}</h3>
                                    <!-- location -->
                                    <div class="m-t-10">
                                        <span class="d-block f-300 f-14">
                                            <i class="icon ion-ios-location-outline m-r-10 f-20"></i>{{ event.city }} - {{ event.state }}
                                        </span>
                                    </div>
                                    <!-- / location -->

                                </div>
                                <!-- / Card Event Body -->
                            </router-link>
                            <!-- / Card Event -->
                        </div>
                    </div>
                    <div class="swiper-button-prev" v-show="lastEvents.length > 1"><i class="ion-ios-arrow-back"></i></div>
                    <div class="swiper-button-next" v-show="lastEvents.length > 1"><i class="ion-ios-arrow-forward"></i></div>
                    <div style="height: 50px;" v-show="lastEvents.length > 1"></div>
                    <div class="swiper-pagination primary" v-show="lastEvents.length > 1"></div>
                </div>
            </div>
        </div>
        <!-- / Last Events -->

        <!-- ARTIGOS -->
        <div class="container m-t-20" v-if="placeholder.articles || lastArticles.length">
            <div>
                <h2 class="f-300 text-center">Artigos</h2>


                <card-placeholder v-if="placeholder.articles" :headerFullImage="true" :loop="1">
                </card-placeholder>


                <div v-if="!placeholder.articles" class="swiper-container swiper-last-articles" ref="swiperLastArticles">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="article in lastArticles">

                            <!-- Card Recipe -->
                            <router-link tag="div" :to="{ name: 'landing.article.show', params: { slug: article.slug }}" class="card m-b-10 cursor-pointer">

                                <!--  Card Recipe Header-->
                                <div class="card-header ch-alt text-center card-picture-header" :style="`background-image:url('${ article.avatar }')`">
                                    <div class="hover">
                                        <i class="ion-ios-plus-empty"></i>
                                    </div>
                                </div>
                                <!-- / Card Recipe Header -->

                                <!-- Card Recipe Body -->
                                <div class="card-body card-padding text-center">

                                    <h3 class="f-300 m-t-5">{{ article.title }}</h3>

                                </div>
                                <!-- / Card Recipe Body -->

                            </router-link>
                            <!-- / Card Event -->
                        </div>
                    </div>
                    <div class="swiper-button-prev" v-show="lastArticles.length > 1"><i class="ion-ios-arrow-back"></i></div>
                    <div class="swiper-button-next" v-show="lastArticles.length > 1"><i class="ion-ios-arrow-forward"></i></div>
                    <div style="height: 50px;" v-show="lastArticles.length > 1"></div>
                    <div class="swiper-pagination primary" v-show="lastArticles.length > 1"></div>
                </div>
            </div>
        </div>

        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-6 col-xs-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <span class="f-300 f-22">Para você</span>
                        </div>
                        <div class="card-body card-padding m-t-5 text-center">
                            <span class="f-300">
                                <i class="d-block ion-ios-calendar-outline f-primary f-40"></i>
                                No <b>iSaudavel</b> você encontrará profissionais especializados em sua saúde como personal trainer, nutricionista, estúdios de pilates, academia, fisioterapia, crossfit e diversas clínicas de saúde e bem estar - todos unidos em um só lugar e você poderá compartilhar as principais informações sobre sua saúde e objetivos com esses profissionais, que juntos irão te ajudar a atingir seus objetivos de saúde, estética e bem estar.
                            </span>
                            <hr>
                            <router-link
                                to="/cliente/cadastro"
                                tag="button"
                                type="button"
                                class="btn btn-xs btn-block btn-primary m-t-10"
                                name="button"
                            >
                                Quero cadastrar
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <span class="f-300 f-22">Para profissionais</span>
                        </div>
                        <div class="card-body card-padding m-t-5 text-center">
                            <span class="f-300">
                                <i class="d-block ion-ios-time-outline f-primary f-40"></i>
                                O <b>iSaudavel</b> foi criado para você profissional da área da saúde e seu cliente economizarem o mais importante da vida: <b>TEMPO</b>. Uma rede social dedicada para você divulgar seus serviços e organizar o atendimento a seu cliente de forma simplificada e objetiva, integrando outros profissionais que assim como você estão comprometidos à promover a saúde e bem estar de seus clientes.
                                <hr>
                                <router-link
                                    tag="button"
                                    to="/cadastro"
                                    type="button"
                                    class="btn btn-xs btn-block btn-primary m-t-10"
                                    name="button"
                                >
                                    Quero cadastrar
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default {
        name: 'landing',
        components: {
            mainHeader,
            cardPlaceholder,
            ratingSimple: require('@/components/rating-simple.vue'),
        },
        data () {
            return {
                interactions: {
                    lat: 0,
                    lng: 0,
                },
                placeholder: {
                    events: true,
                    recipes: true,
                    articles: true
                },
                inviteEmail: '',
                lastEvents: [],
                lastMealRecipes: [],
                lastArticles: []
            }
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            this.getMealRecipes()
        },
        methods: {
            ...mapActions(['setLoading']),

            initDefaultSwiper(elemClass) {
                let that = this
                setTimeout(function() {
                    that.swiperDefault = new Swiper(elemClass, {
                        centeredSlides: true,
                        spaceBetween: 10,
                        loop: false,
                        slidesPerView: 3,
                        slideToClickedSlide: true,
                        paginationClickable: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        pagination: '.swiper-pagination',
                        breakpoints: {
                            768: {
                                slidesPerView: 1,
                            }
                        }
                    })
                }, 400)
            },

            getMealRecipes(){
                let that = this

                that.placeholder.recipes = true
                that.getEvents()

                that.$http.post('meal/recipe/home/list')
                    .then(function (response) {
                        that.lastMealRecipes = _.orderBy(response.data.meal_recipes, ['created_at'], ['desc'])
                        that.initDefaultSwiper('.swiper-last-recipes')
                        setTimeout(() => {
                            that.placeholder.recipes = false
                        }, 200);
                    })
                    .catch(function (error) {
                    });

            },

            getEvents() {
                var that = this;

                that.placeholder.events = true
                that.getLastArticles();

                that.$http.post('event/home/list')
                    .then(function (response) {
                        that.lastEvents = _.orderBy(response.data.events, ['created_at'], ['desc'])
                        that.initDefaultSwiper('.swiper-last-events')
                        setTimeout(() => {
                            that.placeholder.events = false
                        }, 200);
                    })
                    .catch(function (error) {

                    });
            },

            getLastArticles(){
                let that = this

                that.placeholder.articles = true
                that.$http.get('article/last/8')
                    .then(function (response) {
                        that.lastArticles =response.data.articles;
                        that.initDefaultSwiper('.swiper-last-articles')
                        setTimeout(() => {
                            that.placeholder.articles = false
                        }, 200);
                    })
                    .catch(function (error) {
                    });
            },

            setSearchAdress(place) {

                let that = this
                if (place.geometry !== undefined) {

                    that.lat = place.geometry.location.lat()
                    that.lng = place.geometry.location.lng()

                }
            },

            goSearch: function(){
                this.$router.push({name: 'landing.companies.list', query: {latitude: this.lat, longitude: this.lng}});
            },

            goInvite: function(){
                this.$router.push({name: 'landing.invite.check', params: {email: this.inviteEmail}})
            },

        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    /* Swiper Arrows */
    .swiper-button-prev { left: 0px; }
    .swiper-button-next { right: -10px; }
    .swiper-button-prev,
    .swiper-button-next {
        background-image: none !important;
        font-size: 40px;
    }

    .swiper-slide.swiper-slide-active {
        transform: scale(1);
        transition: ease .3s;
    }
    .swiper-slide {
        transform: scale(.9);
        transition: ease .3s;
    }

    /* Search */
    .wrapper.search {
        width: 100%;
        min-height: 120px;
        background: #88C657;
        font-weight: 300;
        margin-top: -20px;
    }
    .wrapper.search .search-label { color: #fff; }

    .wrapper .form-control {
        border-width: 1px; border-right: 0;
        transition: none;
        font-weight: 300;
    }

    .wrapper .form-control:focus { border-right: 0; transition: none; }

    .wrapper .form-control:focus + .btn.btn-light { border-color: #383938; transition: none; }
    .wrapper .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }
    /* Rotate */
    .rotate { transform: rotate(180deg); }

    .card-picture-header {
        box-sizing: border-box;
        margin: 0 auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
        border: solid 1px #EBECEC;
    }
    /* Event Cats */
    .list-cats {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
    }

    .recipe-info{
        width: 50%;
        box-sizing: border-box;
        float: left;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
    }

    .time-info{
        border-right: 1px solid #d8d8d8;
    }

</style>
