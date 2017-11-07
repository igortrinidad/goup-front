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
                                <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">

                                    <div class="card-header-title">
                                        <h4 class="title f-700 t-overflow">{{ company.name }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cards -->


                        <!-- Actions -->
                        <div class="actions">
                            <span class="action">
                                <span class="ion-refresh f-default"></span>
                            </span>
                            <span class="action xl">
                                <span class="ion-ios-heart f-primary"></span>
                            </span>
                            <span class="action">
                                <span class="ion-close-round f-danger"></span>
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
                    if (e.deltaY < -100 || e.deltaY > 100) {
                        this.resetPosition(true)
                    } else {
                        this.resetPosition(false)
                    }
                }
                if (!e.isFinal){
                    $('.card.animated').css({ left: e.deltaX, top: e.deltaY })
                }

                // if (!e.isFinal) {
                //     $('.card.animated').css({ left: e.deltaX, top: e.deltaY })
                // }
                // else {
                //     console.log('pq esta passando varias vezes aqui ?');
                //     // remove a primeira empresa da lista de empresa
                //     $('.card.animated').addClass('leave')
                //     this.companies.splice(0, 1)
                //     console.log(this.companies);
                //
                //     this.mountHammer()
                //     console.log(e.deltaY);
                //     if (e.deltaY < -100) {
                //         console.log('Gostou!')
                //     } else {
                //         console.log('Não gostou!')
                //     }
                // }
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

    .cards .card:nth-child(1)   { z-index: 10; }
    .cards .card:nth-child(2)   { z-index: 9; }
    .cards .card:nth-child(3)   { z-index: 8; }
    .cards .card:nth-child(4)   { z-index: 7; }
    .cards .card:nth-child(5)   { z-index: 6; }
    .cards .card:nth-child(6)   { z-index: 5; }
    .cards .card:nth-child(7)   { z-index: 4; }
    .cards .card:nth-child(8)   { z-index: 3; }
    .cards .card:nth-child(9)   { z-index: 2; }
    .cards .card:nth-child(10)  { z-index: 1; }

    .fadeInLeft{
        transition: 0.1s;
    }
</style>
