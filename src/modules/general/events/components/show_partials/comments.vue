<template lang="html">
    <div>
        <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img class="img-icon" src="../../../../../assets/icons/comments.png" alt="">
                    <h3 class="f-300 text-center">Comentários</h3>
                </div>

                <div class="col-sm-12 text-center m-t-30">
                    <p class="f-300"  v-if="!comments.length">Este evento ainda não possui comentários</p>

                    <!-- Buttons call to user do a comment -->
                    <button
                        class="btn btn-primary m-t-10"
                        v-if="isLogged && !interactions.formOpenned"
                        @click="interactions.formOpenned = !interactions.formOpenned"
                    >
                        Inserir novo comentário
                    </button>
                    <p v-if="!isLogged">Faça o login para comentar no evento</p>
                </div>
            </div>
        </div>

        <!-- Form New Comment -->
        <div class="container m-t-30" v-if="interactions.formOpenned">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header ch-alt text-center">
                            <h4 class="f-300 m-0">Novo comentário</h4>
                        </div>
                        <div class="card-body card-padding clearfix">
                            <div class="form-group">
                                <label for="comment">Comentário:</label>
                                <textarea v-model="newComment.content" class="form-control" rows="5" id="comment"></textarea>
                            </div>

                            <button class="btn btn-info btn-xs pull-right" :disabled="newComment.content.length < 5" @click="saveComment()" >Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Form New Comment -->

        <div class="container m-t-30" v-if="comments.length">
            <div class="row">
                <div class="col-sm-12" >

                    <div class="card">

                        <div class="card-body card-padding text-center">
                            <div class="" v-for="(comment, commentIndex) in comments">
                                <img class="picture-circle picture-circle-p" :style="`background-image:url('${ comment.from.avatar }')`" />
                                <h5>{{comment.from.full_name}}</h5>
                                <p class="f-13">{{comment.content}}</p>
                                <p class="f-12 m-t-0" v-if="comment.created_at"><i class="ion-ios-clock-outline"></i>
                                    {{comment.created_at | moment('DD/MM/YYYY HH:mm:ss')}}
                                </p>
                                <button class="btn btn-xs btn-danger" @click="removeComment(comment, commentIndex)" v-if="currentUser.id == comment.created_by_id">Excluir</button>
                                <hr>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12" v-show="comments.length">
                    <div class="text-center">
                        <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import EventModel from '@/models/Event'

    export default {
        name: 'event-tab-comments',
        components: {
            pagination: require('@/components/pagination.vue'),
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {
                    formOpenned: false
                },
                comments: [],
                newComment:{
                    event_id: '',
                    content: ''
                },
                pagination: {},
                navigate_url: null,
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'currentUser', 'checkRole']),
        },
        mounted() {
            this.newComment.event_id = this.$route.params.event_id

            this.getComments();
        },
        methods: {

            getComments: function(){
                let that = this

                this.$http.get(`event/comment/list/${that.$route.params.event_id}`).then(response => {

                    that.comments = response.data.data;
                    that.pagination = response.data.pagination;
                    that.navigate_url = `event/comment/list/${that.$route.params.event_id}`;


                }, response => {
                    // error callback
                });

            },

            saveComment: function(){
                let that = this

                this.$http.post(`event/comment/store`, that.newComment).then(response => {

                    that.interactions.formOpenned = false;
                    that.newComment.content = '';
                    that.comments.unshift(response.data.comment)
                    successNotify('Comentário salvo com sucesso');

                }, response => {
                    // error callback
                });

            },

            removeComment: function(comment, index){
                let that = this

                this.$http.post(`event/comment/destroy`, comment).then(response => {

                    that.comments.splice(index, 1)
                    errorNotify('', 'Comentário deletado.');

                }, response => {
                    // error callback
                });

            },

            navigate(page) {
                let that = this

                that.$http.get(`${that.navigate_url}?page=${page}`)
                    .then(function (response) {
                        that.comments = response.data.data;
                        that.pagination = response.data.pagination;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .btn-xs { padding: 5px 10px !important; }

</style>
