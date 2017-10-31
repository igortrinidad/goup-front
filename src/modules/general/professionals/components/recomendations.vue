<template>
    <div class="m-t-30">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../assets/icons/ranking.png" alt="">
                <h4 class="f-300">Recomendações</h4>
            </div>
        </div>

        <div class="container">

            <button
                class="btn btn-block btn-info btn-sm m-t-20 m-b-20"
                :disabled="!checkRole('professional')"
                @click="interactions.showNewRecomendation = true"
            >
                Fazer uma recomendação
            </button>

            <div class="card" v-if="interactions.showNewRecomendation">
                <div class="card-body card-padding">
                    <legend class="text-center">Sua recomendação</legend>

                    <p class="text-center">Faça uma recomendação para {{professional.full_name}}</p>

                    <div class="form-group">
                        <label>Comentários <span
                            v-show="newRecomendation.content.length < 120">(faltam {{120 - newRecomendation.content.length}} caracteres)</span></label>
                        <textarea class="form-control" v-model="newRecomendation.content"
                                  placeholder="Digite uma mensagem para a avaliação."></textarea>

                    </div>

                    <button class="btn btn-block btn-info btn-sm m-t-20" @click="saveRecomendation()"
                            :disabled="newRecomendation.content.length < 120">Salvar avaliação
                    </button>
                </div>
            </div>

            <p class="f-12 text-center " v-if="!checkRole('professional')">
                Você precisa estar autenticado como profissional para fazer uma recomendação.
            </p>

            <p class="f-300 text-center" v-if="!professional.last_recomendations.length">Nenhuma recomendação recebida</p>

            <div class="swiper-container m-t-30" ref="swiperRecomendations">
                <div class="swiper-wrapper">

                    <!-- RECEBIDAS -->
                    <div class="swiper-slide" v-for="recomendation in professional.last_recomendations">
                        <div class="card">
                            <div class="card-header ch-alt text-center">
                                <div class="picture-circle" :style="`background-image:url('${ recomendation.from.avatar }')`"></div>
                                <h4 class="f-300 m-b-0 m-t-10">{{recomendation.from.full_name}}</h4>
                            </div>
                            <div class="card-body card-padding text-center">
                                <div class="row">
                                    <div class="col-md-12 col-xs-12 text-left">
                                        <div class="col-xs-12 col-md-12 text-center">
                                            <p>{{recomendation.content}}</p>
                                            <p class="f-12 m-t-0"><i class="ion-ios-clock-outline"></i>
                                                {{recomendation.created_at | moment('DD/MM/YYYY HH:mm:ss')}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="swiper-button-prev swiper-button-black" v-show="professional.last_recomendations.length > 1"></div>
                <div class="swiper-button-next swiper-button-black" v-show="professional.last_recomendations.length > 1"></div>
                <div style="height: 10px;" v-show="professional.last_recomendations.length > 1"></div>
                <div class="swiper-pagination" v-show="professional.last_recomendations.length > 1"></div>

            </div>

        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'landing-professional-recomendations',
        props: {
            professional: {
                type: Object
            }
        },
        data(){
            return {
                interactions: {
                    showNewRecomendation: false,
                },
                newRecomendation: {
                    to_id: this.$route.params.id,
                    to_type: 'professional',
                    content: '',
                }
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted(){
            this.initSwiperDefault();
        },
        methods: {
            saveRecomendation: function () {
                let that = this

                if (that.newRecomendation.to_id === that.currentUser.id) {
                    that.$swal('Ops!', 'Você não pode redigir uma recomendação para o seu próprio perfil profissional.', 'info')
                    that.newRecomendation.content = '';
                    that.interactions.showNewRecomendation = false;
                    return false
                }

                that.$http.post('professional/recomendation/create', that.newRecomendation).then(function (response) {

                    successNotify('', 'Recomendação salva com sucesso')

                    that.professional.last_recomendations.unshift(response.data.recomendation);
                    that.newRecomendation.content = '';
                    that.interactions.showNewRecomendation = false;


                }).catch(function (error) {
                    console.log(error)
                });
            },

            initSwiperDefault() {
                setTimeout(() => {

                    // Swiper Certifications
                    this.swiperCompanies = new Swiper(this.$refs.swiperRecomendations, {
                        centeredSlides: true,
                        spaceBetween: 15,
                        loop: false,
                        slidesPerView: 1,
                        slideToClickedSlide: true,
                        paginationClickable: true,
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
        }
    }
</script>

<style scoped>


</style>
