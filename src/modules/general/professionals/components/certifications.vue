<template>
    <div class="m-t-30">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../assets/icons/certification.png" alt="">
                <h4 class="f-300">Certificados</h4>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="cards swiper-container" ref="swiperCertifications">
                        <div class="swiper-wrapper">
                            <!-- Swiper Slide Card -->
                            <div class="swiper-slide card cursor-pointer" v-for="certification in professional.certifications">
                                <div class="card-header ch-alt">
                                    <h4 class="f-300 m-0 text-center">{{ certification.name }}</h4>
                                </div>
                                <!-- Certification Card Body -->
                                <div class="card-body card-padding">
                                    <span class="d-block f-300"><strong class="f-400">Instituição:</strong>
                                        <small>{{ certification.institution ? certification.institution : 'Não informado' }}</small>
                                    </span>
                                    <span class="d-block f-300"><strong class="f-400">Data de conclusão:</strong>
                                        <span v-if="certification.granted_at"><small>{{ certification.granted_at | moment('MMMM') }} de {{ certification.granted_at | moment('YYYY') }}</small></span>
                                        <span v-if="!certification.granted_at"><small>Não informado</small></span>
                                    </span>
                                    <span class="d-block f-300"><strong class="f-400">Descrição:</strong>
                                        <small>{{ certification.description ? certification.description : 'Não informado' }}</small>
                                    </span>
                                    <hr>
                                    <span class="f-300 f-danger" v-if="!certification.photo_url">Sem imagem</span>
                                    <img class="img-responsive" :src="certification.photo_url" :alt="certification.name" v-if="certification.photo_url">
                                </div>
                                <!-- / Certification Card Body -->
                            </div>
                            <!-- / Swiper Slide Card -->
                        </div>
                        <div class="swiper-button-prev swiper-button-black" v-show="professional.certifications.length > 1"></div>
                        <div class="swiper-button-next swiper-button-black" v-show="professional.certifications.length > 1"></div>
                        <div style="height: 10px;" v-show="professional.certifications.length > 1"></div>
                        <div class="swiper-pagination" v-show="professional.certifications.length > 1"></div>
                    </div>
                </div>
            </div>

            <div class="text-center" v-if="!professional.certifications.length">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum curso ou certificado adicionado.
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'landing-professional-certifications',
        props: {
            professional: {
                type: Object
            }
        },
        data(){
            return {}
        },
        mounted(){
            this.initSwiperDefault();
        },
        methods: {

            initSwiperDefault() {
                setTimeout(() => {

                    // Swiper Certifications
                    this.swiperCertifications = new Swiper(this.$refs.swiperCertifications, {
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

                }, 100)
            },
        }
    }
</script>

<style scoped>


</style>
