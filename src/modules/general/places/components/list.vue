<template>
    <div class="first-container">

        <main-header
            :title="'ranking'"
            :type="'main'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <div class="main">
                <div class="container">

                    <div class="text-center">
                        <button type="button" class="btn btn-primary transparent">Filtro</button>
                    </div>

                    <div class="row m-t-30">
                        <div class="col-sm-12" v-for="place in places">
                            <div class="card">
                                <div class="card-body card-padding">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <div class="picture-circle picture-circle-xs m-0" :style="{ backgroundImage: `url(${ place.avatar })` }">
                                            </div>
                                        </div>
                                        <div class="col-xs-8">
                                            <span class="title f-700 t-overflow f-default">{{ place.name }}</span>
                                            <small>{{ place.city }} - {{ place.state }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    import PlaceModel from '@/models/Place'

    export default {
        name: 'general-places-list',

        components: {
            mainHeader,
        },

        data () {
            return {
                placeholder: true,
                places: []
            }
        },

        computed: {

        },

        mounted(){
            this.getPlaces()
        },

        methods: {
            getPlaces() {
                let that = this

                that.places = [ PlaceModel, PlaceModel, PlaceModel, PlaceModel, PlaceModel ]
            }
        }
    }
</script>

<style scoped>

</style>
