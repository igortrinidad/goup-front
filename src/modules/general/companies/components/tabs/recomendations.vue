<template>
    <div class="">

        <div class="container m-t-30 m-b-20">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/certificate-diploma.png" alt="">
                <h3 class="f-300">Recomendações recebidas</h3>
            </div>
        </div>

        <!-- NOVA RECOMENDAÇÃO -->
        <div class="container m-b-20">
            <button class="btn btn-block btn-info btn-sm"
                    v-if="!interactions.showNewRecomendation"
                    @click="interactions.showNewRecomendation = true">Fazer uma recomendação
            </button>

            <div class="card m-t-20" v-if="interactions.showNewRecomendation">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0 m-t-10">Nova recomendação</h4>
                </div>
            
                <div class="card-body card-padding">
                    
                    <p class="text-center">Faça uma recomendação para {{company.name}}</p>

                    <div class="form-group">
                        <label>Comentários <span
                            v-show="newRecomendation.content.length < 120">(faltam {{120 - newRecomendation.content.length}} caracteres)</span></label>
                        <textarea class="form-control" v-model="newRecomendation.content"
                                  placeholder="Digite uma mensagem para a avaliação."></textarea>

                    </div>

                    <button class="btn btn-block btn-info btn-sm m-t-20" @click="saveRecomendation()"
                            :disabled="newRecomendation.content.length < 120">Salvar avaliação
                    </button>
                    <button class="btn btn-block btn-default btn-sm m-t-5" @click="interactions.showNewRecomendation = false">Cancelar
                    </button>

                </div>
            </div>
        </div>
        <!-- NOVA RECOMENDAÇÃO -->

        <!-- LISTA DE RECOMENDAÇÕES -->
        <div class="container">
            
            <p v-if="!recomendations.length" class="text-center">Nenhuma recomendação recebida.</p>

            <div class="card" v-for="recomendation in recomendations">
                <div class="card-header ch-alt text-center">

                    <div class="picture-circle picture-circle-m" :style="`background-image:url('${ recomendation.from.avatar }')`"></div>

                    <h4>{{recomendation.from.full_name}}</h4>

                </div>
            
                <div class="card-body card-padding text-center">

                    <p>{{recomendation.content}}</p>
                    <p class="f-12 m-t-0"><i class="ion-ios-clock-outline"></i>
                        {{recomendation.created_at | moment('DD/MM/YYYY HH:mm:ss')}}
                    </p>

                </div>
            </div>

        </div>
        <!-- LISTA DE RECOMENDAÇÕES -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'landing-companies-recomendations',
        props: {
            company: {
                type: Object
            }
        },
        data() {
            return {
                interactions: {
                    showNewRecomendation: false,
                },
                newRecomendation: {
                    to_id: '',
                    to_type: 'company',
                    content: '',
                },
                recomendations: []
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole', 'selectedCompany']),
        },
        mounted() {
            let that = this
            that.newRecomendation.to_id = that.selectedCompany.id;

            this.getRecomendations();
        },
        methods: {

            ...mapActions(['addSelectedCompanyNewRecomendation']),

            getRecomendations() {
                let that = this

                that.$http.get(`company/recomendation/received/${ that.$route.params.company_id }`)
                    .then((response) => {
                        that.recomendations = response.data.recomendations
                        this.initSwiperDefault();
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },

            initSwiperDefault() {
                setTimeout(() => {

                    // Swiper Certifications
                    this.swiperReceived = new Swiper(this.$refs.swiperRecomendationsReceived, {
                        centeredSlides: true,
                        spaceBetween: 15,
                        loop: false,
                        slidesPerView: 1,
                        slideToClickedSlide: true,
                        paginationClickable: true,
                        autoplay: 3000,
                        pagination: '.swiper-pagination',
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        breakpoints: {
                            768: {
                                slidesPerView: 1
                            }
                        }
                    })

                },100);
            },

            saveRecomendation: function () {
                let that = this

                that.$http.post('professional/recomendation/create', that.newRecomendation).then(function (response) {

                    successNotify('', 'Recomendação salva com sucesso')

                    that.addSelectedCompanyNewRecomendation(response.data.recomendation);
                    that.newRecomendation.content = '';
                    that.interactions.showNewRecomendation = false;

                }).catch(function (error) {
                    console.log(error)
                });
            },
        }
    }
</script>

<style scoped>


</style>
