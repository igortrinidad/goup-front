<template>
    <div class="main">
        <div class="container">
            <div class="cards" ref="cards">
                <div
                    class="card"
                    v-for="(company, index) in companies"
                >
                    <div class="card-header cover" :style="{ backgroundImage: `url(${ company.avatar })` }">
                    </div>
                    <div class="card-body">
                        <h4 class="title f-600">{{ company.name }}</h4>
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
                hammerOptions: {
                    dragLockToAxis: true,
                    dragBlockHorizontal: true
                }
            }
        },

        computed: {

        },

        mounted(){
            let that = this

            that.getCompanies()

            that.hammerCards = new Hammer(that.$refs.cards, this.hammerOptions);
            that.hammerCards.on('pan', function(ev) {
                that.handleCards(ev)
            })
        },

        methods: {
            getCompanies() {
                this.companies = CompanyModel
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

</style>
