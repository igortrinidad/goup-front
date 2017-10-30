<template>
    <div>

        <div class="row">
            <div class="col-md-12 col-xs-12 text-left"
                 v-for="(rating, indexRating) in ratings">
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="picture-circle" :style="`background-image:url('${ rating.client.avatar }')`"></div>
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <h4>{{rating.client.full_name}}</h4>
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <rating-simple class="m-t-15"
                                   :value.sync="rating.rating"
                                   :max="5"
                                   :size="1"
                    ></rating-simple>
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <p>{{rating.content}}</p>
                    <p class="f-12 m-t-0"><i class="ion-ios-clock-outline"></i>
                        {{rating.created_at | moment('DD/MM/YYYY HH:mm:ss')}}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'rating-list',
        components: {
            ratingSimple: require('@/components/rating-simple.vue')
        },
        props: {
            ratings: {
                type: Array
            }
        },
        data(){
            return {}
        },
        mounted(){

        },
        methods: {}
    }
</script>

<style scoped>

</style>
