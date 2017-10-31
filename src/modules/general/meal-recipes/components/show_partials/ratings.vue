<template lang="html">
    <div>
        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img class="img-icon" src="../../../../../assets/icons/ranking.png" alt="">
                    <h3 class="f-300 text-center">Avaliações</h3>
                </div>

                <div class="col-sm-12 text-center m-t-30">
                    <p class="f-300"  v-if="!ratings.length">Esta receita ainda não possui avaliações</p>

                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="m-0 f-300">{{ userRated.has ? 'Você ja avaliou com:' : 'Deixe sua avaliação' }}</h4>
                        </div>
                        <div class="card-body p-10" v-if="!userRated.has">
                            <!-- Buttons call to user do a rating -->

                            <rating-simple class="m-t-5"
                               :value.sync="newRating.rating"
                               :max="5"
                               :disabled="false"
                               @rating-changed="setRating"
                               :size="3"
                            ></rating-simple>

                            <button
                                class="btn btn-sm btn-block btn-primary m-t-10"
                                v-if="isLogged && !interactions.formOpenned"
                                @click="saveRating()"
                            >
                                Avaliar
                            </button>
                            <p v-if="!isLogged">Faça o login para avaliar a receita</p>
                        </div>
                        <div class="card-body p-10" v-if="userRated.has">
                            <!-- Buttons call to user do a rating -->

                            <rating-simple class="m-t-5"
                               :value.sync="userRated.rate"
                               :max="5"
                               :size="1"
                            ></rating-simple>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container m-t-30" v-if="ratings.length">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body card-padding text-center">
                            <div class="" v-if="ratings[0].from.id === currentUser.id">
                                <span class="f-300" v-if="ratings.length === 1">Esta receita ainda não recebeu avaliações de outros usuários.</span>
                            </div>
                            <div class="m-t-10" v-for="(rating, ratingIndex) in ratings" v-if="rating.from.id !== currentUser.id">
                                <img class="picture-circle picture-circle-p" :style="`background-image:url('${ rating.from.avatar }')`" />
                                <h5>{{rating.from.full_name}}</h5>
                                <p class="f-13">{{rating.content}}</p>
                                <rating-simple class="m-t-15"
                                   :value.sync="rating.rating"
                                   :max="5"
                                   :size="1"
                                ></rating-simple>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" v-show="ratings.length > 4">
                <div class="col-sm-12">
                    <div class="text-center">
                        <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'


    export default {
        name: 'meal-recipe-tab-ratings',
        components: {
            pagination: require('@/components/pagination.vue'),
            ratingSimple: require('@/components/rating-simple.vue')
        },
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {
                    formOpenned: false,
                    displayratings: false
                },
                userRated: {
                    has: false,
                    rate: 0
                },
                ratings: [],
                newRating:{
                    meal_recipe_id: '',
                    rating: 0,
                },
                pagination: {},
                navigate_url: null,
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.newRating.meal_recipe_id = this.recipe.id
            this.getRatings()
        },
        methods: {

            checkUserHasRated: function() {
                let that = this
                that.ratings.forEach((rate) => {
                    if (rate.from.id === that.currentUser.id) {
                        that.userRated.has = true
                        that.userRated.rate = rate.rating
                    }
                })
            },

            setRating(rating) {
                this.newRating.rating = rating
            },


            getRatings: function(){
                let that = this

                this.$http.get(`meal/recipe/rating/list/${that.recipe.id}`).then(response => {

                    that.ratings = response.data.ratings;
                    that.pagination = response.data.pagination;
                    that.navigate_url = `meal/recipe/rating/list/${that.recipe.id}`;
                    that.checkUserHasRated()

                }, response => {
                    // error callback
                });

            },

            saveRating: function(){
                let that = this
                that.newRating.from = that.currentUser
                that.$http.post(`meal_recipe/rating/store`, that.newRating).then(response => {
                    that.getRatings()
                    that.ratings.unshift(response.data.rating)

                }, response => {
                    // error callback
                });

            },

            navigate(page) {
                let that = this

                that.$http.get(`${that.navigate_url}?page=${page}`)
                    .then(function (response) {
                        that.ratings = response.data.data;
                        that.pagination = response.data.pagination;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .btn-xs { padding: 5px 10px !important; }

</style>
