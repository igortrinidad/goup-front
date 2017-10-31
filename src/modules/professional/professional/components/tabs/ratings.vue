<template lang="html">

    <div>
        <div class="">
            <div class="container">
                <div class="text-center">
                    <img class="img-icon" src="../../../../../assets/icons/ranking.png" alt="">
                    <h4 class="f-300 m-b-30">Avaliações recebidas</h4>
                </div>
            </div>

            <div class="container">

                <div class="text-center" v-if="!placeholder && !ratings.length">
                    <span class="d-block m-t-30 f-300">
                        <i class="d-block ion-sad-outline f-24"></i>
                        Nenhuma avaliação recebida.
                    </span>
                </div>

                <div class="alert alert-info text-center">
                    Convite seus clientes para avaliarem seu perfil profissional
                </div>

                <div class="form-group m-b-20">
                    <button class="btn btn-light btn-block" @click="openShareWhatsapp()">Enviar convite por WhatsApp</button>
                </div>

                <card-placeholder
                    v-if="placeholder"
                    :circleImage="true"
                    :small="true"
                >
                </card-placeholder>

                <div class="card m-b-10" v-for="rating in ratings" v-if="!placeholder">

                    <div class="card-header ch-alt text-center">
                        <div class="picture-circle picture-circle-m" :style="`background-image:url('${ rating.client.avatar }')`"></div>
                        <h4 class="f-300 m-b-0">{{rating.client.full_name}}</h4>
                    </div>

                    <div class="card-body card-padding">
                        <rating-simple
                            :value.sync="rating.rating"
                            :max="5"
                            :size="2"
                        ></rating-simple>
                        <p class="text-center f-300 m-t-10">{{rating.content}}</p>
                        <p class="f-12 m-t-0 text-center"><i class="ion-ios-clock-outline"></i>
                            {{rating.created_at | moment('DD/MM/YYYY HH:mm:ss')}}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    import { mapActions, mapGetters } from 'vuex'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'admin-professional-ratings',
        components: {
            ratingSimple: require('@/components/rating-simple.vue'),
            cardPlaceholder
        },
        data(){
            return {
                ratings: [],
                placeholder: true
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        mounted() {

            this.getProfessionalRatings()

        },
        methods: {

            getProfessionalRatings: function(){
                let that = this

                that.placeholder = true

                that.$http.get(`professional/rating/list/${that.currentUser.id}`)
                .then(function (response) {
                    that.ratings = response.data.ratings;

                    setTimeout(() => {
                        that.placeholder = false
                    }, 200);

                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            // Whatsapp share
            openShareWhatsapp() {
                var that = this
                var url = `https://api.whatsapp.com/send?text=Olá, gostaria de convida-lo à avaliar meus serviços na plataforma iSaudavel. Sua opinião é muito importante! Acesse o link para avaliar: https://app.isaudavel.com/\#/profissionais/avaliar/${that.currentUser.slug}.`;
                window.open(url, '_system', null);
            },
        }
    }
</script>
