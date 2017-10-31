<template>

   	<div class="">

        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/control.png" alt="">
                <h3 class="f-300 m-b-30">Recomendações recebidas</h3>
            </div>
        </div>

        <div class="container">

            <div class="text-center" v-if="!placeholder && !received_recomendations.length">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhuma recomendação recebida.
                </span>
            </div>

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
                :cols="'col-xs-12 col-sm-12'"
            >
            </card-placeholder>


            <div class="card" v-for="recomendation in received_recomendations" v-if="!placeholder">
                <div class="card-header ch-alt">
                    <div class="picture-circle picture-circle-m" :style="`background-image:url('${ recomendation.from.avatar }')`"></div>
                    <h4 class="text-center f-300 m-b-0">{{recomendation.from.full_name}}</h4>
                </div>

                <div class="card-body card-padding">
                    <p class="text-center f-300 m-t-10">{{recomendation.content}}</p>
                    <p class="f-12 m-t-0 text-center m-b-20"><i class="ion-ios-clock-outline"></i>
                        {{recomendation.created_at | moment('DD/MM/YYYY HH:mm:ss')}}
                    </p>
                </div>
            </div>
        </div>

   	</div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import moment from 'moment'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'company-recomentations-tab',
        components: {
            cardPlaceholder
        },
        data() {
            return {
                sent_recomendations: [],
                received_recomendations: [],
                placeholder: true
            }
        },

        computed:{
            ...mapGetters(['currentUser', 'currentCompany', 'isCompanyAdmin']),
        },
        mounted(){
            this.getRecomendations();
        },
        methods: {

            getRecomendations: function () {
                let that = this

                that.placeholder = true

                that.$http.get(`professional/recomendation/received/${that.$route.params.company_id}`)
                    .then(function (response) {

                        that.received_recomendations = response.data.recomendations

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },


        }
    }
</script>

<style scoped>


</style>
