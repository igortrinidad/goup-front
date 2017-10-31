<template lang="html">

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Procurar profissionais'"
            :cursor="false" :action="function(){ return false}"
            :hasback="true"
        ></main-header>

        <!-- Categories Tabs -->
        <div class="swiper-container tabs" ref="tabs">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide tab"
                    v-for="(category, $index) in categories"
                    :key="$index"
                >
                    {{ category.name }}
                </div>
            </div>
            <div class="swiper-button-prev">
                <i class="ion-ios-arrow-left"></i>
            </div>
            <div class="swiper-button-next">
                <i class="ion-ios-arrow-right"></i>
            </div>
        </div>
        <!-- Categories Tabs -->

        <div class="container m-t-30">
            <div class="form-group text-center">
                <input type="text" class="form-control" v-model="searchName" placeholder="Pesquise pelo nome do profissional">
                <button
                    type="button"
                    class="btn btn-xs btn-info p-5 p-l-10 p-r-10 m-t-10"
                    @click="getprofessionals()"
                >
                    Buscar
                </button>
            </div>
        </div>

        <div class="container">

            <h4 class="f-300 text-center m-b-30" v-if="!placeholder && professionals.length">
                Mostrando
                <strong>{{ professionals.length }}</strong>
                profissionais em
                <strong>{{ currentCategory.name }}</strong>
            </h4>

            <div class="text-center" v-if="!professionals.length && !placeholder">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum profissional encontrado.
                </span>
            </div>

            <!-- Placeholder -->
            <card-placeholder v-if="placeholder" :circleImage="true">
            </card-placeholder>
            <!-- Placeholder -->

            <div class="row" v-if="!placeholder">
                <div
                    class="col-sm-4 col-xs-12"
                    v-for="(professional, $index) in professionals"
                    :to="{ name: 'landing.professionals.show', params: { professional_slug: professional.slug, professional_id: professional.id } }"
                    :key="professional.id"
                    style="position: relative"
                >
                    <div class="card">
                        <router-link
                            tag="div"
                            class="cursor-pointer"
                            :to="{ name: 'landing.professionals.show', params: { slug: professional.slug } }"
                        >
                            <div class="card-header ch-alt text-center">
                                <div class="picture-circle picture-circle-m" :style="`background-image:url('${ professional.avatar }')`"></div>
                                <h3 class="f-300 m-b-0">{{ professional.full_name }}</h3>
                            </div>
                        </router-link>

                        <div class="card-body card-padding text-center">

                            <p class="m-b-0 f-300">Avaliação</p>

                            <rating-simple
                                :value.sync="professional.current_rating"
                                :max="5"
                                :size="1"
                                :align-class="'text-center'"
                            ></rating-simple>

                            <p class="m-b-0 m-t-10 f-300">Especialidades</p>
                            <div class="list-cats" v-if="professional.categories.length">
                                <span
                                    class="label label-primary f-300 f-14 m-t-5 m-r-5"
                                    v-for="(category, $indexCategory) in professional.categories"
                                >
                                    {{ category.name }}
                                </span>
                            </div>

                            <span v-show="!professional.categories.length">Nenhuma especialidade cadastrada</span>

                            <router-link
                                tag="button"
                                :to="{ name: 'landing.professionals.show', params: { slug: professional.slug } }"
                                class="btn btn-info btn-sm m-t-20"
                            >Ver profissional</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import Categories from '@/models/Categories'
    import Professional from '@/models/Professional'

    export default {
        name: 'landing-professional-list',
        components:{
            mainHeader,
            cardPlaceholder,
            ratingSimple: require('@/components/rating-simple.vue')
        },
        data() {
            return{
                view: {
                    list: false
                },
                interactions: {
                    showSelectPlace: false,
                },
                searchName: '',
                placeholder: true,
                currentCategory: {},
                professionals: [],
                categories: [],
            }
        },
        computed:{

        },
        mounted() {
            this.categories = Categories
            this.initSwiperTabs()
        },
        methods:{

            handleCurrentCategory(index) {

                this.currentCategory = this.categories[index]
                this.getprofessionals()

            },

            initSwiperTabs() {
                setTimeout(() => {
                    this.swiperTabs = new Swiper(this.$refs.tabs, {
                        spaceBetween: 0,
                        slidesPerView: 7,
                        loop: true,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            this.handleCurrentCategory(swiper.realIndex)
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 3,
                            },
                        }
                    })
                }, 100)
            },

            getprofessionals(){
                let that = this

                that.placeholder = true

                that.$http.post('professional/list', { category: that.currentCategory.slug, search: that.searchName })
                    .then(function (response) {
                        that.professionals = response.data.data
                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                        console.log(that.professionals);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            }
        }
    }
</script>

<style scoped>
    .first-container { padding-bottom: 0; }
    /* Wrapper Filter */
    .wrapper.filter {
        background: #88c657;
        margin-top: -20px;
    }
    /* Set background imagem as a cover */
    .cover {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    /* default inputsearch */
    .search .form-control {
        border-width: 1px; border-right: 0;
        transition: none;
        font-weight: 300;
    }
    .search .form-control:focus { border-right: 0; transition: none; }
    .search .form-control:focus + .btn.btn-light { border-color: #383938; transition: none; }
    .search .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }
</style>
