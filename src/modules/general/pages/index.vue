<template>

        <div class="">

            <main-header
                :title="'home'"
                :type="'main'"
                :cursor="false"
            ></main-header>

            <transition  class="main m-t-30" appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

                <div class="container m-t-30">
                    <h1 v-show="!companies.length">A lista acabou</h1>

                    <!-- Cards -->
                    <div class="cards">
                        <div
                            v-for="(company, index) in companies"
                            ref="card"
                            :class="{ 'card card-rounded m-0': true, 'animated': index === 0 }"
                        >
                            <!-- Card Header -->
                            <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">
                                <!-- Current Action -->
                                <div v-if="index === 0">
                                    <span class="card-action liked" v-show="interactions.liked">
                                        <i class="ion-ios-heart m-r-5"></i>Gostei
                                    </span>
                                    <span class="card-action ignored" v-show="interactions.ignored">
                                        <i class="ion-close-round m-r-5"></i>Ignorar
                                    </span>
                                </div>
                                <!-- / Current Action -->
                            </div>
                            <!-- / Card Header -->
                            <div class="card-body card-padding">
                                <h3 class="title f-700 t-overflow text-center">{{ company.name }}</h3>
                            </div>
                        </div>
                    </div>
                    <!-- Cards -->

                    <!-- Actions -->
                    <div class="actions">
                        <span class="action xl unlike"  @click="ignore()">
                            <span class="ion-close-round f-danger"></span>
                        </span>
                        <span class="action" @click="getCompanies()">
                            <span class="ion-refresh f-default"></span>
                        </span>
                        <span class="action xl like" @click="like()">
                            <span class="ion-ios-heart f-primary"></span>
                        </span>
                    </div>
                    <!-- / Actions -->

                </div>

            </transition>

        </div>

</template>

<script>
    import Hammer from 'hammerjs'

    import mainHeader from '@/components/main-header.vue'
    import elements from '@/components/elements.vue'
    import CompanyModel from '@/models/Company'

    export default {
        name: 'landing',

        components: {
            mainHeader,
            elements
        },

        data () {
            return {
                interactions: {
                    liked: false,
                    ignored: false,
                },
                placeholder: true,
                companies: [],
                active: false,
                transform: {
                    translate: { x: 0, y: 0 }
                }

            }
        },

        computed: {

        },

        mounted(){
            this.getCompanies()
        },

        methods: {

            like() {

            },

            ignore() {

            },

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.companies.length) {
                    setTimeout(() => {
                        that.hammerCards = new Hammer(that.$refs.card[0]);
                        that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL });
                        that.hammerCards.on('panleft panright panup pandown tap press', function(ev) {
                            that.animateCurrentCard(ev)
                        });
                    }, 200);
                }
            },

            resetPosition(leave) {
                $('.card').css({left: 0, top: 0 })
                if (leave) {
                    $('.card.animated').removeClass('leave')
                } else {
                    $('.card.animated').addClass('transition')
                    setTimeout(function () {
                        $('.card.animated').removeClass('transition')
                    }, 200);
                }
            },

            animateCurrentCard(e) {
                if (e.isFinal) {
                    console.log(e.deltaY);
                    if (e.deltaY < -75 || e.deltaY > 75) {
                        this.resetPosition(true)
                    } else {
                        this.resetPosition(false)
                    }
                }
                if (!e.isFinal){
                    $('.card.animated').css({ left: e.deltaX, top: e.deltaY })

                    if (e.deltaY < -75) {
                        this.interactions.liked = true
                        this.interactions.ignored = false
                    } else if(e.deltaY > 75) {
                        this.interactions.liked = false
                        this.interactions.ignored = true
                    } else {
                        this.interactions.liked = false
                        this.interactions.ignored = false
                    }
                }

            },

            getCompanies() {
                this.companies = CompanyModel
                this.mountHammer()
            },
        }
    }
</script>

<style scoped>
    .cards {
        position: relative;
        height: 400px;
        margin-top: 30px
    }
    .card {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .card.animated.leave {
        opacity: 0;
        transition: ease .4s;
    }

    .card.animated.transition { transition: ease .3s; }

    .cards .card {
        box-shadow: none;
        transform:
    }

    .cards .card:nth-child(1)   { z-index: 10; box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.23); }
    .cards .card:nth-child(2)   { z-index: 9; transform: translateY(-10px); }
    .cards .card:nth-child(3)   { z-index: 8; transform: translateY(-20px); }

    .fadeInLeft{
        transition: 0.1s;
    }
</style>
