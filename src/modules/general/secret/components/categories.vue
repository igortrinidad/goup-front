<template>
    <div>

        <main-header
            title="Categorias"
            :type="'back'"
            :cursor="false"
        ></main-header>

        <transition appear mode="in-out" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="main first-container">

                <div class="container">

                    <!-- Unauthenticated -->
                    <div class="card m-t-30 card-rounded text-center" v-if="!interactions.authenticated">
                        <div class="card-body card-padding">
                            <p>Enter the secret password to continue</p>
                            <div class="form-group">
                                <input type="password" class="form-control" v-model="interactions.secret_password" placeholder="Secret password" @keyup.enter="checkPassword">
                            </div>
                            <button class="btn btn-primary" @click.prevent="checkPassword">Enter</button>

                        </div>
                    </div>
                    <!-- /Unauthenticated -->

                    <!-- Authenticated -->
                    <div v-show="interactions.authenticated">

                        <button class="btn btn-primary btn-block m-b-20" @click.prevent="interactions.addNewCategory = true">Adicionar categoria</button>

                       <div v-show="!interactions.addNewCategory">
                           <ul class="list-group list-rounded m-t-10 m-0 text-left">
                               <li
                                   class="list-group-item transparent"
                                   v-for="category in categories"
                               >
                                   {{ category[`name_${language}`] }}

                                   <span class="label label-primary pull-right cursor-pointer" @click.prevent="removeCategory(category.id)"><i class="ion-trash-a fa-lg"></i></span>

                               </li>
                           </ul>

                           <div class="row">
                               <div class="col-sm-12" v-show="categories.length">
                                   <div class="text-center">
                                       <pagination :source="pagination" @navigate="getCategories" :range="6"></pagination>
                                   </div>
                               </div>
                           </div>
                       </div>

                        <div class="card m-t-30 card-rounded text-center" v-if="interactions.addNewCategory">
                            <div class="card-body card-padding">
                                <p>Adicionar nova categoria</p>
                                <div class="form-group">
                                    <label class="f-700 f-primary">Nome em Português</label>
                                    <input type="text" class="form-control" v-model="newCategory.name_pt" placeholder="Nome em Português">
                                </div>

                                <div class="form-group">
                                    <label class="f-700 f-primary">Nome em Inglês</label>
                                    <input type="text" class="form-control" v-model="newCategory.name_en" placeholder="Nome em Inglês">
                                </div>

                                <a class="btn btn-success file-btn text-center m-b-20" v-if="!newCategory.image">
                                    Selecionar imagem
                                    <input type="file" @change="onFileChange"  accept="image/*">
                                </a>

                                <div class="text-center m-b-10" v-if="newCategory.image">
                                    <img class="img-responsive center-block" :src="img_preview" width="120">

                                    <span class="label label-success m-t-10" @click="newCategory.image = ''" >Alterar</span>
                                </div>

                                <div class="text-center">
                                    <button class="btn btn-error" @click.prevent="cancel">Cancelar</button>
                                    <button class="btn btn-primary" @click.prevent="store" :disabled="!newCategory.name_pt|| !newCategory.name_en || !newCategory.image">Adicionar</button>
                                </div>

                            </div>
                        </div>


                    </div>
                    <!-- /Authenticated -->
                </div>

            </div>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header'

    import User from '@/models/User'
    import * as translations from '@/translations/user/components/about'
    import {mapGetters, mapActions} from 'vuex'
    import pagination from '@/components/pagination'
    import {secret_password} from '@/config'

    export default {
        name: 'secret-categories',

        components: {
            mainHeader,
            pagination
        },

        data () {
            return {
                interactions: {
                    tries: 0,
                    secret_password: '',
                    authenticated: false,
                    addNewCategory: false,
                    editCategory: false,
                },
                categories: [],
                pagination: {},
                currentCategory: null,
                newCategory:{
                    name_pt: '',
                    name_en: '',
                    image: ''
                },
                img_preview: ''
            }
        },

        computed: {
            ...mapGetters(['language'])
        },

        mounted(){

            let already_authenticated = localStorage.getItem('goup_auth') ? true : false

            this.interactions.authenticated = already_authenticated

            if(already_authenticated){
                this.getCategories()
            }

        },

        methods: {

            ...mapActions(['setLoading']),

            checkPassword(){
                let that = this

                if(that.interactions.secret_password !== secret_password){
                    that.interactions.tries++

                    if(that.interactions.tries >= 3){
                        errorNotify('', 'Você não tem autorização para acessar esta área.')
                        that.$router.push({path: '/'})
                        return false
                    }

                    warningNotify('', 'Senha incorreta')
                }

                if(that.interactions.secret_password === secret_password){
                    that.interactions.authenticated = true

                    localStorage.setItem('goup_auth', true)

                    that.getCategories()

                    successNotify('', 'Bem vindo')
                }
            },

            getCategories(page){
                let that = this

                page = page ? page : 1

                that.$http.get(`category/list?page=${page}`)
                    .then(function (response) {

                        that.categories = response.data.categories
                        that.pagination = response.data.pagination
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            onFileChange(e) {
                let that = this
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                that.createImage(files[0]);
                that.newCategory.image = files[0]
            },

            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let that = this

                reader.onload = (e) => {
                    that.img_preview = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            cancel(){
                this.interactions.addNewCategory = false
                this.newCategory.name_pt = ''
                this.newCategory.name_en = ''
                this.newCategory.image = ''
            },

            store() {
                let that = this

                that.setLoading({is_loading: true, message: 'Enviado, aguarde'})

                let formData = new FormData();
                formData.append('name_pt', that.newCategory.name_pt)
                formData.append('name_en', that.newCategory.name_en)
                formData.append('file', that.newCategory.image)

                that.$http.post('category/store', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {

                        that.categories.unshift(response.data.category)
                        that.cancel()
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            },


            removeCategory(category_id) {

                let that = this

                that.$swal({
                    title: 'Remover categoria',
                    text: 'Deseja realmente remover esta categoria?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, remover',
                    confirmButtonColor: '#583694',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#48C3D1',
                    reverseButtons: true
                }).then(function () {

                    that.setLoading({is_loading: true, message: ''})

                    that.$http.get(`category/destroy/${category_id}`)
                        .then(function (response) {
                            that.categories = that.categories.filter((category) => category.id != category_id)

                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {
                            console.log(error)
                            that.setLoading({is_loading: false, message: ''})
                        });

                }).catch(function () {

                })
            },


        }
    }
</script>

<style scoped>

    .file-btn {
        position: relative;
    }

    .file-btn input[type="file"] {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
    }

    input[type="file"] {
        cursor: pointer;
    }
</style>
