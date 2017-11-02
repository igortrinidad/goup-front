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
                companies: CompanyModel,
                active: false,
                transform: {
                    translate: { x: 0, y: 0 }
                }

            }
        },

        computed: {

        },

        mounted(){
            let that = this

            that.hammerCards = new Hammer(that.$refs.card[0]);
            that.hammerCards.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            that.hammerCards.on('panup pandown tap press', function(ev) {
                that.animateCurrentCard(ev)
            });

        },

        methods: {

            animateCurrentCard(e) {
                console.log(e);
                if (!e.isFinal) {
                    $('.card.animated').css({ top: e.deltaY })
                }
                // else if(e.deltaY < -1) {
                //     $('.card.animated').addClass('leave')
                //     $('não gostou')
                // } else {
                //     this.companies.splice(0, 1)
                //     console.log(this.companies);
                //     console.log('gostou');
                // }
            },

            getCompanies() {
                let that = this
                that.companies = CompanyModel
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
        z-index: 1
    }
    .card.animated { z-index: 10; }
    .card.animated.leave {
        opacity: 0;
        transition: ease .4s;
    }

</style>
