<template>
    <div class="main">
        <div class="container">
            <div class="cards">

                <div
                    v-for="(company, index) in companies"
                    ref="card"
                    :class="{ 'card': true, 'animated': index === 0 }"
                >
                    <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">
                    </div>
                    <div class="card-body">
                        <h4 class="title f-600">{{ company.name }} - {{ index }}</h4>
                        <span class="label label-default">{{ company.city }} - {{ company.state }}</span>
                        <p class="m-t-10">{{ company.description }}</p>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import Hammer from 'hammerjs'

    import elements from '@/components/elements.vue'
    import CompanyModel from '@/models/Company'

    export default {
        name: 'landing',

        components: {
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
                    that.hammerCards = null
                }

                setTimeout(() => {
                    that.hammerCards = new Hammer(that.$refs.card[0]);
                    that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL });
                    that.hammerCards.on('panup pandown tap press', function(ev) {
                        that.animateCurrentCard(ev)
                    });
                }, 200);
            },

            animateCurrentCard(e) {
                console.log(e.isFinal);
                // Altera o valor top do elemento .card
                if (!e.isFinal) {
                    $('.card.animated').css({ top: e.deltaY })
                }
                // tem que realmente jogar o item para finalizar
                if (e.isFinal) {

                    // remove a primeira empresa da lista de empresa
                    $('.card.animated').addClass('leave')
                    this.companies.splice(0, 1)
                    console.log(this.companies);

                    this.mountHammer()

                    if (e.deltaY < -1) {
                        console.log('Gostou!')
                    } else {
                        console.log('Não gostou!')
                    }
                }
            },

            getCompanies() {
                this.companies = CompanyModel
                this.mountHammer()
            },

            handleCards(ev) {
                ev.preventDefault()
                console.log(ev);
            }
        }
    }
</script>

<style scoped>
    .cards {
        position: relative;
        top: 0;
    }
    .card {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }

    .card.animated.leave {
        opacity: 0;
        transition: ease .4s;
    }

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

</style>
