<template>
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Receita'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper fixtop">
            <div class="recipe-cover" :style="`background-image:url('${ recipe.avatar }')`"></div>
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
            <div class="swiper-button-prev">
                <i class="ion-ios-arrow-left"></i>
            </div>
            <div class="swiper-button-next">
                <i class="ion-ios-arrow-right"></i>
            </div>
        </div>
        <!-- Sections Tabs -->

        <recipe-tab-about v-if="currentTab === 'about'" :recipe="recipe"></recipe-tab-about>
        <recipe-tab-comments v-if="currentTab === 'comments'" :recipe="recipe"></recipe-tab-comments>
        <recipe-tab-ratings v-if="currentTab === 'ratings'" :recipe="recipe"></recipe-tab-ratings>


    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    import recipeTabAbout from './show_partials/about.vue'
    import recipeTabComments from './show_partials/comments.vue'
    import recipeTabRatings from './show_partials/ratings.vue'

    import {cleanMealRecipe} from '@/models/MealRecipe'

    export default {
        name: 'landing-meal-recipes-show',
        components: {
            mainHeader,
            recipeTabAbout,
            recipeTabComments,
            recipeTabRatings
        },
        data() {
            return {
                interactions: {
                    presence: false
                },
                recipe: cleanMealRecipe(),
                currentTab: '',
                tabs: [
                    { name: 'A receita', slug: 'about' },
                    { name: 'Comentários', slug: 'comments' },
                    { name: 'Avaliações', slug: 'ratings' },
                ]
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.getRecipe()
            this.initSwiperTabs()
        },
        methods: {

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
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        onSlideChangeEnd: swiper => {
                            // this.handleCurrentCategory(swiper.realIndex)
                            this.currentTab = this.tabs[swiper.realIndex].slug
                            if(this.currentTab == 'about'){
                                // that.initGallery();
                            }
                        }
                    })
                }, 100)
            },

            getRecipe() {
                let that = this

                this.$http.get(`meal/recipe/show/${that.$route.params.slug}`).then(response => {
                    that.recipe = response.data.data;
                }, response => {
                    // error callback
                });
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

    .recipe-cover{
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
