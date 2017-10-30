<template>
    <div>
        <div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/infos.png" alt="">
                <h3 class="f-300 m-b-30">Sobre</h3>
            </div>

            <div class="row">
                <!-- Description -->
                <div class="col-sm-12">
                    <div class="card">

                        <div class="card-body card-padding text-center">

                            <p class="f-300 m-t-10">{{ company.description }}</p>


                            <div v-if="company.website">
                                <h5 class="f-400">Site</h5>
                                <a class="f-300 f-dark" :href="company.site" target="_blank"
                                   :title="`Site ${ company.name }`">{{ company.website }}</a>
                            </div>


                            <h5 class="f-400">Telefone</h5>
                            <p class="f-300">
                                {{ company.phone ? company.phone : 'Não Informado' }}
                            </p>

                            <div v-if="company.address.full_address">
                                <h5 class="f-400">Endereço</h5>
                                <p class="f-300">{{ company.address.full_address }}</p>
                            </div>

                            <hr>

                            <!-- Share -->
                            <h4 class="f-300">Compartilhar</h4>

                            <button type="button" class="btn btn-xs btn-facebook m-r-5 m-t-5" @click="openShareFacebook()">
                                <i class="ion-social-facebook m-r-5"></i> Facebook
                            </button>
                            <button type="button" class="btn btn-xs btn-whatsapp m-r-5 m-t-5" @click="openShareWhatsapp()">
                                <i class="ion-social-whatsapp m-r-5"></i> Whatsapp
                            </button>
                            <button type="button" class="btn btn-xs btn-success m-t-5" @click="handleCopyLink()">
                                <i class="ion-ios-copy m-r-5"></i>
                                Copiar Link
                            </button>
                            <!-- / Share -->

                        </div>
                    </div>
                </div>
                <!-- /Description -->

                <div class="col-sm-12 text-center">
                    <h3 class="f-300 m-b-10">Avaliações</h3>
                </div>

                <div class="col-sm-12">

                    <div class="card p-5">
                        <div class="text-center">
                            <rating-simple
                                :value.sync="company.current_rating"
                                :max="5"
                                :size="3"
                            ></rating-simple>
                            <span class="f-16">{{company.current_rating}}</span> de <span
                            class="f-16">{{company.total_rating}}</span> avaliações
                        </div>
                    </div>

                </div>


                <!-- BOTAO FAZER AVALIAÇÃO -->
                <div class="col-sm-12">
                    <button class="btn btn-block btn-info btn-sm m-b-20"
                            v-if="!interactions.showRating && checkRole('client') && !interactions.already_rated"
                            @click="interactions.showRating = true">Fazer uma avaliação
                    </button>

                    <div class="alert alert-info text-center" v-if="!interactions.showRating && checkRole('client') && interactions.already_rated">
                       <i class="ion-android-happy fa-lg"></i> Você já avaliou esta empresa.
                    </div>
                </div>

                <div v-if="!checkRole('client')">
                    <div class="col-sm-12">
                        <button class="btn btn-block btn-info btn-sm m-t-20 m-b-20" disabled>Fazer uma avaliação
                        </button>
                        <p class="f-12 text-center">
                            Você precisa estar autenticado como cliente para fazer uma avaliação.</p>
                    </div>
                </div>
                <!-- BOTAO FAZER AVALIAÇÃO -->

                <!-- FORM FAZER AVALIAÇÃO -->
                <div class="col-sm-12" v-if="interactions.showRating">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-t-10 m-0">Nova avaliação</h4>
                        </div>

                        <div class="card-body card-padding">

                            <p class="text-center">Faça uma avaliação para {{company.name}}</p>

                            <rating-simple
                                :value.sync="newRating.rating"
                                :max="5"
                                :size="3"
                                :disabled="false"
                                @rating-changed="setRating"
                            ></rating-simple>
                            <p class="f-12 text-center">Clique acima para selecionar</p>

                            <div class="form-group">
                                <label>Comentários <span
                                    v-show="newRating.content.length < 120">(faltam {{120 - newRating.content.length}} caracteres)</span></label>
                                <textarea 
                                    class="form-control" 
                                    v-model="newRating.content"
                                    id="new-rating-input"
                                    placeholder="Digite uma mensagem para a avaliação."> </textarea>
                            </div>

                            <button class="btn btn-block btn-info btn-sm m-t-20" @click="saveRating()"
                                    :disabled="newRating.content.length < 120">Salvar avaliação
                            </button>

                            <button class="btn btn-block btn-default btn-sm m-t-5" @click="interactions.showRating = false">Cancelar
                            </button>

                        </div>
                    </div>
                </div>
                <!-- FORM FAZER AVALIAÇÃO -->

                <!-- LISTA DE AVALIAÇÕES -->
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-t-10 m-0">Últimas avaliações</h4>
                        </div>
                        <div class="card-body card-padding">

                            <rating-list :ratings="company.last_ratings"></rating-list>

                        </div>
                    </div>
                </div>
                <!-- /LISTA DE AVALIAÇÕES -->

            </div>
        </div>

    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import copyToClipboard from 'copy-text-to-clipboard'

    export default {
        name: 'landing-company-show-about',
        components: {
            ratingSimple: require('@/components/rating-simple.vue'),
            ratingList: require('@/components/rating-list.vue')
        },
        props: {
            company: {
                type: Object
            }
        },
        data() {
            return {
                interactions: {
                    showRating: false,
                    already_rated: false,
                },
                newRating: {
                    client_id: '',
                    company_id: '2222',
                    rating: 5,
                    content: '',
                }
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole', 'selectedCompany']),
        },
        mounted() {
            var that = this;

        },
        methods: {

            ...mapActions(['setSelectedCompanyRating', 'addSelectedCompanyNewRating']),

            saveRating: function () {
                let that = this

                that.newRating.client_id = that.currentUser.id
                that.newRating.company_id = that.selectedCompany.id

                that.$http.post('client/company/rating/create', that.newRating).then(function (response) {

                    successNotify('', 'Avaliação salva com sucesso')

                    that.addSelectedCompanyNewRating(response.data.rating);

                    that.newRating.content = '';
                    that.interactions.showRating = false;
                    that.interactions.already_rated = true

                    that.setSelectedCompanyRating({
                        current_rating: response.data.company.current_rating,
                        total_rating: response.data.company.total_rating
                    })

                }).catch(function (error) {
                    console.log(error)
                });
            },

            setRating(rating) {

                this.newRating.rating = rating
            },

            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                copyToClipboard('https://isaudavel.com/empresas/' + this.company.slug)
                // this.updateTrackingInfo('share_copy')
                this.interactions.share = false
            },

            openShareWhatsapp() {
                let that = this
                let url = `https://api.whatsapp.com/send?text=Encontrei a empresa ${that.company.name} no iSaudavel, veja o abaixo: https://isaudavel.com/empresas/${ that.company.slug }`;
                window.open(url, '_system', null);
            },

            openShareFacebook: function () {
                let that = this
                let url = `https://www.facebook.com/dialog/share?app_id=1854829291449231&href=https://isaudavel.com/empresas/${that.company.slug}&display=popup&mobile_iframe=true`;
                    if(window.cordova){
                        let ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            let url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Evento compartilhado com sucesso!')
                            }
                        });
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }
                this.interactions.share = false
                // this.updateTrackingInfo('share_facebook')
            },


        }
    }
</script>

<style scoped>


</style>
