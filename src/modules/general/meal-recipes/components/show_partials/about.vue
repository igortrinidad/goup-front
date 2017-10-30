<template lang="html">
    <div id="recipe_pdf">
        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img class="img-icon" src="../../../../../assets/icons/infos.png" alt="">
                    <h3 class="f-300 text-center">{{ recipe.title }}</h3>
                </div>
            </div>
        </div>

        <!-- The Recipe -->
        <div class="container m-t-30">
            <div class="row">

                <div class="col-sm-12 text-center">

                 <div class="text-center m-b-10">
                    <span class="label label-primary m-t-5 p-5 f-14 m-r-5" v-for="(type, indexType) in recipe.types">{{type.name}}</span>
                 </div>

                    <div class="card m-t-20 m-b-0" v-if="currentUserIsRecipeOwner">
                        <div class="card-body card-padding">
                            <small class="f-300 d-block">Você é o dono desta receita, deseja fazer alguma alteração nela?</small>
                            <router-link
                                tag="button"
                                class="btn btn-info btn-xs m-t-10"
                                :to="{ name: 'landing.meal-recipes.edit', query: { edit: true, meal_recipe_id: recipe.id } }"
                            >
                                Editar receita
                            </router-link>

                            <button class="btn btn-danger btn-xs m-t-10" @click.prevent="removeMealRecipe(recipe.id)">Excluir receita</button>
                        </div>
                    </div>

                </div>

                <div class="col-sm-12">
                    <div class="row row-recipe" id="recipe-header">
                        <div class="col-xs-6 col-recipe text-center">
                            <div class="recipe-box">
                                <i class="ion-android-alarm-clock recipe-icon"></i>

                                <h5 class="f-300 m-0 m-b-5">Preparo</h5>
                                <small class="f-300">{{ recipe.prep_time }} min</small>
                            </div>
                        </div>
                        <div class="col-xs-6 col-recipe text-center">
                            <div class="recipe-box">
                                <i class="ion-android-restaurant recipe-icon"></i>

                                <h5 class="f-300 m-0 m-b-5">Rendimento</h5>
                                <small class="f-300">
                                    {{ recipe.portions }} porções({{ recipe.portion_size }} cada)
                                </small>
                            </div>
                        </div>
                        <div class="col-xs-6 col-recipe text-center">
                            <div class="recipe-box">
                                <i class="ion-spoon recipe-icon m-r-5" v-for="n in recipe.difficulty"></i>

                                <h5 class="f-300 m-0 m-b-5">Dificuldade</h5>
                                <small class="f-300">{{ handleDifficulty(recipe.difficulty) }}</small>
                            </div>
                        </div>
                        <div class="col-xs-6 col-recipe text-center">
                            <div class="recipe-box">
                                <i class="ion-ios-star recipe-icon"></i>

                                <h5 class="f-300 m-0 m-b-5">Avaliação</h5>
                                <small class="f-300">{{ recipe.current_rating }}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- How To -->
                <div class="col-sm-12 m-t-30" id="recipe-how">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Como fazer</h4>
                        </div>
                        <div class="card-body card-padding">
                            <div v-if="recipe.tags.length">
                                <h4 class="f-300">Tags:</h4>
                                <span class="label label-primary p-5 m-r-5 m-b-5" v-for="tag in recipe.tags">{{ tag.name }}</span>
                                <hr>
                            </div>
                            <h4 class="f-300">Ingredientes:</h4>
                            <ul class="ingredients">
                                <li class="item f-300" v-for="ingredient in recipe.ingredients">{{ ingredient.description }}</li>
                            </ul>
                            <hr>
                            <h4 class="f-300">Modo de preparo:</h4>
                            <p v-html="recipe.prep_description" id="content"></p>

                            <div v-if="recipe.video_url">
                                <hr>
                                <h4 class="f-300">Vídeo</h4>
                                <iframe width="100%" height="315" :src="recipe.video_url" frameborder="0" allowfullscreen></iframe>
                            </div>

                            <div class="share">
                                <hr>
                                <!-- Share Event -->
                                <h4 class="f-300">Compartilhar</h4>
                                <div class="">
                                    <button type="button" class="btn btn-xs f-14 m-r-5 m-b-5 f-300 btn-instagram" @click="shareViaInstagram()" v-show="isMobile">
                                        <i class="ion-social-instagram m-r-5"></i>
                                        Instagram
                                    </button>
                                    <button type="button" class="btn btn-xs f-14 m-r-5 m-b-5 f-300 btn-facebook" @click="openShareFacebook()">
                                        <i class="ion-social-facebook m-r-5"></i>
                                        Facebook
                                    </button>
                                    <button type="button" class="btn btn-xs f-14 m-r-5 m-b-5 f-300 btn-whatsapp" @click="openShareWhatsapp()">
                                        <i class="ion-social-whatsapp m-r-5"></i>
                                        Whatsapp
                                    </button>
                                    <button type="button" class="btn btn-xs f-14 m-r-5 m-b-5 f-300 btn-success" @click="handleCopyLink()">
                                        <i class="ion-ios-copy m-r-5"></i>
                                        Copiar Link
                                    </button>
                                    <button type="button" class="btn btn-xs f-14 m-r-5 m-b-5 f-300 btn-info" @click="savePDF(recipe.id)">
                                        <i class="ion-ios-printer m-r-5"></i>
                                        Imprimir
                                    </button>
                                </div>
                                <!-- / Share Event -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / How To -->

                <div class="col-sm-12 m-t-30">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Fotos</h4>
                        </div>
                        <div class="card-body card-padding">
                            <div class="row">
                                <div class="col-sm-3 col-xs-6" v-for="(photo, photoIndex) in recipe.photos">
                                    <img
                                        class="img-responsive recipe-img cursor-pointer"
                                        @click="handleModalImage(photoIndex)"
                                        :src="photo.photo_url"
                                        :alt="recipe.title"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Nutritional Table -->
                <div class="col-sm-12 m-t-30">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Macro nutrientes</h4>
                            <p>Por porção</p>
                        </div>
                        <div class="card-body card-padding">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Macro</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Calorias</th>
                                            <th>{{ recipe.kcal }} kcal</th>
                                        </tr>
                                        <tr>
                                            <th>Proteínas</th>
                                            <th>{{ recipe.protein }} gramas</th>
                                        </tr>
                                        <tr>
                                            <th>Carboidrato</th>
                                            <th>{{ recipe.carbohydrate }} gramas</th>
                                        </tr>
                                        <tr>
                                            <th>Lipídios</th>
                                            <th>{{ recipe.lipids }} gramas</th>
                                        </tr>
                                        <tr>
                                            <th>Fibra</th>
                                            <th>{{ recipe.fiber }} gramas</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Nutritional Table -->

                <!-- Recipe From -->
                <div class="col-sm-12 m-t-30" v-if="isLoaded">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <small class="f-300">Enviado por:</small>
                            <div class="picture-circle picture-circle-p m-t-10" :style="`background-image:url('${ recipe.from.avatar }')`">
                            </div>
                            <h4 class="f-300 m-0 m-t-5">{{ recipe.from.full_name }}</h4>
                        </div>
                    </div>
                </div>
                <!-- / Recipe From -->

            </div>
        </div>
        <!-- / The Recipe -->

        <!-- Modal All Photos Swiper -->
        <div class="modal" id="modal-swiper-recipe-photos" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title text-center" id="myModalLabel">Fotos {{ recipe.title }}</h4>
                        <small class="f-300">Todal de {{ recipe.photos.length }} {{ recipe.photos.length > 1 ? 'Fotos' : 'Foto' }}</small>
                    </div>
                    <div class="modal-body text-center">
                        <div class="swiper-container" ref="swiper_recipe_photos">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="photo in recipe.photos">
                                    <div
                                        class="recipe-swiper-img cursor-pointer"
                                        :style="`background-image: url('${ photo.photo_url }')`"
                                        :alt="recipe.title"
                                    >
                                    </div>
                                </div>
                            </div>
                            <div v-show="recipe.photos.length > 1" style="height: 40px;"></div>
                            <div class="swiper-pagination m-t-30 f-300" v-show="recipe.photos.length > 1"></div>
                            <div class="swiper-button-prev swiper-button-black" v-show="recipe.photos.length > 1"></div>
                            <div class="swiper-button-next swiper-button-black" v-show="recipe.photos.length > 1"></div>
                        </div>
                    </div>
                    <div class="modal-footer borderless">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal All Photos Swiper -->

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import LogoDataUrl from '@/models/LogoDataUrl'

    import moment from 'moment'
    import sanitizeHtml from 'sanitize-html'

    import copyToClipboard from 'copy-text-to-clipboard'
    import {apiRootUrl} from '@/config'

    export default {
        name: 'meal-recipe-tab-about',
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {
                },
                isLoaded: false,
                isMobile: false,
                recipeType: {},
                currentUserIsRecipeOwner: false
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            setTimeout(() => {
                this.isLoaded = true
                this.verifyOwner()
            }, 1000)

            if(window.cordova){
                this.isMobile = true
            }
        },
        methods: {

            ...mapActions(['setLoading']),

            // Open modal and init swiper in cliked image
            handleModalImage(startIndex) {
                $('#modal-swiper-recipe-photos').modal('show');
                if (this.swiperRecipePhotos) {
                    this.swiperRecipePhotos.slideTo(startIndex)
                }
                this.initSwiperRecipePhotos(startIndex)
            },

            // Init Swiper
            initSwiperRecipePhotos(startIndex) {
                setTimeout(() => {
                    this.swiperRecipePhotos = new Swiper(this.$refs.swiper_recipe_photos, {
                        initialSlide: startIndex,
                        spaceBetween: 10,
                        slidesPerView: 1,
                        loop: false,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',
                        paginationType: 'fraction'
                    })

                }, 200)
            },

            // check if current user can edit recipe
            verifyOwner() {
                if (this.currentUser.id === this.recipe.from.id) {
                    this.currentUserIsRecipeOwner = true
                } else {
                    this.currentUserIsRecipeOwner = false
                }

            },

            // OPEN SYSTEM NAVIGATOR WITH PDF TO DOWNLOAD
            savePDF(id) {
                window.open( apiRootUrl + 'tools/print/recipes/' + id, '_system', null);
            },

            // Return a string to each difficulty
            handleDifficulty(difficulty) {
                if (difficulty === 1) {
                    return 'Muito fácil'
                }
                if (difficulty === 2) {
                    return 'Fácil'
                }
                if (difficulty === 3) {
                    return 'Normal'
                }
                if (difficulty === 4) {
                    return 'Difícil'
                }
                if (difficulty === 5) {
                    return 'Muito difícil'
                }
            },

            // Copy link to clipboard
            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                if (window.cordova) {
                    window.cordova.plugins.clipboard.copy(`https://isaudavel.com/receitas/${ this.recipe.slug }`, '');
                } else {
                    copyToClipboard(`https://isaudavel.com/receitas/${ this.recipe.slug }`)
                }
            },

            // Share Instagram - Just in devices
            shareViaInstagram: function(image){
                let that = this

                const sanitizeText = sanitizeHtml($('#content').html(), {
                    allowedTags: ['p', 'br']
                })
                const ingredients = that.recipe.ingredients.map((ingredient) => ingredient.description).join('\n')
                const preDescription = sanitizeText.replace(/<br\s*[\/]?>/gi, '\r\n').replace(/(<([^>]+)>)/ig, '')

                const fullRecipeTextToShare = `${ that.recipe.title }\r\n\r\nIngredientes:\r\n${ ingredients }\r\n\r\nModo de preparo:\r\n${ preDescription }`


                console.log(fullRecipeTextToShare);

                window.cordova.plugins.clipboard.copy(fullRecipeTextToShare, '');
                that.setLoading({is_loading: true, message: ''})

                window.plugins.socialsharing.shareViaInstagram(null, that.recipe.avatar,
                    function(){
                        successNotify('', 'Abrindo o aplicativo Instagram, aguarde por favor.')
                        that.setLoading({is_loading: false, message: ''})
                    },function(errormsg){
                       errorNotify('', errormsg)
                       that.setLoading({is_loading: false, message: ''})
                    }
                );
            },

            // Facebook share
            openShareFacebook() {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=151705885358217&href=https://isaudavel.com/receitas/${ that.recipe.slug }&display=popup&mobile_iframe=true`;
                    if(window.cordova){
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            var url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Evento compartilhado com sucesso!')
                            }
                        });
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }
            },

            // Whatsapp share
            openShareWhatsapp() {
                var that = this
                var url = `https://api.whatsapp.com/send?text=Encontrei a receita ${that.recipe.title} no iSaudavel, veja o abaixo: https://isaudavel.com/receitas/${ that.recipe.slug }`;
                window.open(url, '_system', null);
            },

            removeMealRecipe(recipe_id){
                let that = this

                that.$swal({
                    title: 'EXCLUIR',
                    text: 'Deseja realmente remover esta receita? Esta ação não poderá ser desfeita. Deseja continuar?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, quero remover',
                    confirmButtonColor: '#E14A45',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#00A369',
                    reverseButtons: true
                }).then(function () {
                    that.$http.post('meal_recipe/destroy', {recipe_id: recipe_id})
                        .then(function (response) {

                            successNotify('', 'Receita removida com sucesso.')

                            that.$router.push({'name': 'landing.meal-recipes.list'})
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(function () {

                })
            }

        }
    }
</script>

/* Scoped Styles */
<style scoped>
    .row-recipe { margin: 0 -5px; }
    .col-recipe { padding: 0 5px; }
    /* Event Cats */
    .event-name {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
        flex-flow: row wrap;
    }

    .ingredients { list-style: none; padding-left: 10px; }

    .ingredients .item {
        margin: 0;
        margin-bottom: 1em;
        padding-left: 1.5em;
        position: relative;
    }

    .ingredients .item:after {
        content: '';
        height: 5px;
        width: 5px;
        background: #7ac358;
        display: block;
        position: absolute;
        transform: rotate(45deg);
        top: 50%;
        left: 0;
        margin-top: -2px;
    }
    /* Recipe */

    .recipe-icon {
        color: #7ac358;
        font-size: 28px;
    }

    .recipe-box {
        background: #fff;
        border-radius: 4px;
        padding: 10px 4px;
        margin-top: 10px;
    }
    .recipe-img { border-radius: 4px; }
    .recipe-swiper-img {
        border-radius: 4px;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 300px;
    }

</style>
