<template>
    <div class="m-t-30">

        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../assets/icons/company.png" alt="">
                <h4 class="f-300">Empresas</h4>
            </div>
        </div>

        <!-- Section Companies -->
        <div class="container">

            <div class="row">
                <div class="col-sm-12">
                    <div class="cards swiper-container" ref="swiperCompanies">
                        <div class="swiper-wrapper">
                            <!-- Swiper Slide Card -->
                            <div class="swiper-slide card cursor-pointer" v-for="company in professional.companies" v-if="company.pivot.is_confirmed">
                                <div class="card-header ch-alt">
                                    <div class="picture-circle" :style="`background-image:url('${ company.avatar }')`"></div>
                                    <h4 class="f-300 m-t-10 m-b-0 text-center">{{ company.name }}</h4>
                                </div>
                                <!-- Company Card Body -->
                                <div class="card-body card-padding">
                                    <span class="d-block f-300 m-t-5"><strong class="f-400">Endereço:</strong>
                                        <br>
                                        <small>{{ company.address_is_available ? company.address.full_address : 'Não disponível' }}</small>
                                    </span>
                                    <span class="d-block f-300 m-t-5"><strong class="f-400">Website:</strong>
                                        <br>
                                        <small v-if="!company.website">Não disponível</small>
                                        <small v-if="company.website">
                                            <a class="f-dark" :href="company.website" target="_blank">{{ company.website }}</a>
                                        </small>
                                    </span>
                                    <span class="d-block f-300 m-t-5"><strong class="f-400">Telefone:</strong>
                                        <br>
                                        <small>{{ company.phone ? company.phone : 'Não disponível' }}</small>
                                    </span>
                                    <hr>
                                    <router-link tag="button" class="btn btn-xs btn-block btn-info" :to="{ name: 'landing.companies.show', params: { company_slug: company.slug, company_id: company.id } }">
                                        Ver empresa
                                    </router-link>
                                </div>
                                <!-- / Company Card Body -->
                            </div>
                            <!-- / Swiper Slide Card -->
                        </div>
                        <div class="swiper-button-prev swiper-button-black" v-show="professional.companies.length > 1"></div>
                        <div class="swiper-button-next swiper-button-black" v-show="professional.companies.length > 1"></div>
                        <div style="height: 10px;" v-show="professional.companies.length > 1"></div>
                        <div class="swiper-pagination" v-show="professional.companies.length > 1"></div>
                    </div>
                </div>
            </div>

            <div class="text-center" v-if="!professional.companies.length">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhuma empresa adicionada.
                </span>
            </div>
        </div>
        <!-- / Section Companies -->
    </div>
</template>

<script>
    export default{
        name: 'landing-professional-companies',
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
                    this.swiperCompanies = new Swiper(this.$refs.swiperCompanies, {
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

        }
    }
</script>

<style scoped>


</style>
