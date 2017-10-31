<template>
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Artigos'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper fixtop">
            <div class="recipe-cover" :style="`background-image:url('${ article.avatar }')`"></div>
        </div>

        <div class=" p-15" style="width: 100%; background-color: #383938; min-height: 100px;">
            <h2 style="color: white;">{{article.title}}</h2>
        </div>

        <div class="container m-t-20">
            <div class="row">
                <div class="col-md-12 col-xs-12">

                    <div class="card">

                        <div class="card-body card-padding">
                            <div v-html="article.content" id="content" ref="articleContent" style="white-space: pre-wrap;"></div>

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
                                    </div>
                                <!-- / Share Event -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="container m-t-20">
            <div class="row">
                <div class="col-md-12 col-xs-12">

                    <div class="card">

                        <div class="card-header ch-alt text-center">
                            <h2>Veja também</h2>
                        </div>

                        <div class="card-body card-padding">

                           <div class="" v-for="articleD in articles">

                                    <h3 class="cursor-pointer" @click="showNewArticle(articleD.slug)">{{articleD.title}}</h3>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import copyToClipboard from 'copy-text-to-clipboard'
    import sanitizeHtml from 'sanitize-html'

    export default {
        name: 'landing-articles-show',
        components: {
            mainHeader
        },
        data() {
            return {
                article: {
                    title: '',
                    avatar: '',
                    content: '',
                    views: 0,
                    shares: 0,
                },
                testeString: '',
                articles: [],
                isMobile: false,
            }
        },
        computed: {
            ...mapGetters([]),
        },

        mounted() {

            this.getArticle()
            this.getArticles()

            if(window.cordova){
                this.isMobile = true
            }
        },
        methods: {

            ...mapActions(['setLoading']),

            getArticle() {
                let that = this

                this.$http.get(`article/show/${that.$route.params.slug}`).then(response => {
                    that.article = response.data.article;
                }, response => {
                    // error callback
                });
            },

            showNewArticle(slug){
                this.$router.push({name: 'landing.article.show', params: {slug: slug}})
                this.getArticle();
            },

            getArticles() {
                let that = this

                this.$http.get(`article/list_random/8`).then(response => {
                    that.articles = response.data.articles;
                }, response => {
                    // error callback
                });
            },

            // Copy link to clipboard
            handleCopyLink() {
                successNotify('', 'Link copiado com sucesso')
                if (window.cordova) {
                    window.cordova.plugins.clipboard.copy(`https://isaudavel.com/artigos/${ this.article.slug }`, '');
                } else {
                    copyToClipboard(`https://isaudavel.com/artigos/${ this.article.slug }`)
                }
            },

            // Facebook share
            openShareFacebook() {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=151705885358217&href=https://isaudavel.com/artigos/${ that.article.slug }&display=popup&mobile_iframe=true`;
                    if(window.cordova){
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            var url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Artigo compartilhado com sucesso!')
                            }
                        });
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }
            },

            shareViaInstagram: function(image){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                const regex = /(<([^>]+)>)/ig
                const sanitizeText = sanitizeHtml($('#content').html(), {
                    allowedTags: ['p', 'br']
                })
                
                const textWithLineBreak = sanitizeText.replace(/<br\s*[\/]?>/gi, '\r\n')

                window.cordova.plugins.clipboard.copy(textWithLineBreak.replace(/(<([^>]+)>)/ig, ''));

                if (window.cordova) {

                    window.plugins.socialsharing.shareViaInstagram(null, that.article.avatar,
                        function(){

                            successNotify('', 'Abrindo o aplicativo Instagram, aguarde por favor.')
                            that.setLoading({is_loading: false, message: ''})

                        },function(errormsg){
                           errorNotify('', errormsg)
                           that.setLoading({is_loading: false, message: ''})
                        }
                    );
                }
            },

            // Whatsapp share
            openShareWhatsapp() {
                var that = this
                var url = `https://api.whatsapp.com/send?text=Encontrei artigo ${that.article.title} no iSaudavel, veja o abaixo: https://isaudavel.com/artigos/${ that.article.slug }`;
                window.open(url, '_system', null);
            },

        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .tabs { margin-top: 0; }
    .wrapper-profile-background {
        z-index: 10;
    }
    .wrapper .container { position: relative; z-index: 20; }

    .attachment-image{
        height: 400px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

    }

    .recipe-cover{
        height: 350px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .light {
        background: rgba(255, 255, 255, .9);
        border-radius: 4px;
        padding: 5px 0;
        color: #393838;
    }

</style>
