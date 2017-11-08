<template>

        <div class="">

            <main-header
                :title="'home'"
                :type="'main'"
                :cursor="false"
            ></main-header>

            <transition appear mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

                <div class="container first-container">
                    <h1 class="text-center m-b-30" v-show="!companies.length">
                        {{ translations.end_list }}
                    </h1>

                    <!-- Cards -->
                    <div class="cards m-t-30" v-if="companies.length">
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
                                        <i class="ion-chevron-up m-r-5"></i>{{ translations.liked }}
                                    </span>
                                    <span class="card-action ignored" v-show="interactions.ignored">
                                        <i class="ion-chevron-down m-r-5"></i>{{ translations.ignored }}
                                    </span>
                                </div>
                                <!-- / Current Action -->
                            </div>
                            <!-- / Card Header -->
                            <div class="card-body card-padding">
                                <h3 class="title f-700 t-overflow text-center m-b-5">{{ company.name }}</h3>
                                <p class="title f-700 t-overflow m-t-0 m-b-0"><i class="ion-ios-location m-r-5"></i> {{ company.city }} - {{company.state}}</p>
                                <p class="title f-700 t-overflow m-t-0"><i class="ion-android-calendar m-r-5"></i> Quarta-feira</p>
                            </div>
                        </div>
                    </div>
                    <!-- Cards -->

                    <div class="text-center m-t-30">
                        <button class="btn btn-default m-t-10">Filtros</button>
                    </div>


                    <!-- Actions -->
                    <div class="actions">
                        <span class="action xl waves"  @click="ignore()" v-if="companies.length">
                            <span class="ion-chevron-down f-red "></span>
                        </span>
                        <span class="action waves" @click="getCompanies()">
                            <span class="ion-refresh f-default"></span>
                        </span>
                        <span class="action xl waves" @click="like()" v-if="companies.length">
                            <span class="ion-chevron-up f-green"></span>
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

    import * as translations from '@/translations/pages/index'

    export default {
        name: 'landing',

        components: {
            mainHeader,
            elements,
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
            'translations': function() {
                const language = localStorage.getItem('language')

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            this.getCompanies()

                Waves.attach('.actions .action', ['waves-circle', 'waves-float']);
                Waves.init();
        },


        methods: {

            throwout() {
                console.log('throw');
            },

            throwin() {
                console.log('throw');
            },

            like() {
                let that = this

                const el = $(that.$refs.card[0])
                el.addClass('leave top')
                that.interactions.liked = true

                setTimeout(function () {
                    that.interactions.liked = false
                    el.removeClass('leave top')
                    that.companies.splice(0, 1)

                }, 1000);
            },

            ignore() {
                let that = this

                const el = $(that.$refs.card[0])
                el.addClass('leave bottom')
                that.interactions.ignored = true

                setTimeout(function () {
                    that.interactions.ignored = false
                    el.removeClass('leave bottom')
                    that.companies.splice(0, 1)

                }, 1000);
            },

            mountHammer() {
                let that = this

                if (that.hammerCards) {
                    that.hammerCards = false
                }

                if (this.companies.length) {
                    setTimeout(() => {
                        that.hammerCards = new Hammer(that.$refs.card[0])
                        that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL })
                        that.hammerCards.on('panleft panright panup pandown tap press', function(ev) {
                            that.animateCurrentCard(ev)
                        })

                        $(that.$refs.card[0]).bind('touchend', function(ev) {
                            that.touchend()
                        })

                    }, 200)
                }
            },

            touchend() {

                let that = this
                const top = parseInt($(that.$refs.card[0])[0].style.top)

                console.log(top);

                // Não passou da distancia minima para nenhum lado. Volta a posição inicial
                if (top > -75 && top < 75) {
                    $('.card.animated').animate({ left: 0, top: 0 }, 300)
                } else {

                    // Like
                    if (top < -75) {
                        // Chamar a funcao para dar like aqui
                        $('.card.animated').animate({ top: -200, opacity: 0 }, 300, () => that.resetPosition())
                    }

                    // Ignore
                    if (top > 75) {
                        // Chamar a funcao para dar ignore aqui
                        $('.card.animated').animate({ top: 200, opacity: 0 }, 300, () => that.resetPosition())
                    }

                    that.interactions.liked = false
                    that.interactions.ignored = false
                }
            },

            resetPosition() {
                this.companies.splice(0, 1)
                $(this.$refs.card[0]).css({ left: 0, top: 0, opacity: 1 })
            },

            animateCurrentCard(e) {
                if (!e.isFinal) {
                    const top = e.deltaY
                    const left = e.deltaX

                    $('.card.animated').animate({ left: left, top: top }, 0)

                    if (top > -75 && top < 75) {
                        this.interactions.liked = false
                        this.interactions.ignored = false
                    } else {
                        if (e.deltaY < -75) {
                            this.interactions.liked = true
                            this.interactions.ignored = false
                        }
                        if(e.deltaY > 75) {
                            this.interactions.liked = false
                            this.interactions.ignored = true
                        }
                    }
                }
            },

            getCompanies() {
                this.companies = [CompanyModel, CompanyModel, CompanyModel]
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

    .cards .card:nth-child(1)   { z-index: 9999; }
    .cards .card:nth-child(2)   { z-index: 9; }
    .cards .card:nth-child(3)   { z-index: 8; }

    .fadeInLeft{
        transition: 0.1s;
    }
</style>
