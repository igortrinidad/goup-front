<template>

    <div class="">
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/peoples.png" alt="">
                <h3 class="f-300">Profissionais</h3>
            </div>
        </div>

        <div class="container" v-if="interactions.addProfessional">
            <div class="row">
                <div class="col-sm-12">
                    <div class="box">
                        <h3 class="f-300">Novo profissional</h3>

                        <div class="form-group full">
                            <label>Categorias</label>
                            <multiselect
                                v-model="selectedCategories"
                                :options="categories"
                                :multiple="true"
                                :close-on-select="true"
                                :clear-on-select="false"
                                :hide-selected="false"
                                :preserve-search="true"
                                placeholder="Selecione uma ou mais categorias"
                                label="name"
                                track-by="slug"
                                selectLabel="Enter ou clique para selecionar"
                                deselectLabel="Enter ou clique para desselecionar"
                                selectedLabel="Selecionado"
                                @input="setCategories">

                            </multiselect>
                        </div>

                        <div class="form-group full">
                            <label>Nome</label>
                            <input type="text" class="form-control" placeholder="Nome" v-model="professional.name">
                        </div>

                        <div class="form-group full">
                            <label>Sobrenome</label>
                            <input type="text" class="form-control" placeholder="Sobrenome"
                                   v-model="professional.last_name" @blur="checkSlugBlur()">
                        </div>

                        <div class="form-group full">
                            <label>E-mail</label>
                            <input type="text" class="form-control" placeholder="E-mail" v-model="professional.email">
                        </div>

                        <div class="form-group full">
                            <label>Telefone</label>
                            <input type="text" class="form-control" placeholder="Telefone" v-model="professional.phone"
                                   v-mask="'(##) #####-####'">
                        </div>

                        <div class="form-group full">
                            <label>URL única (nome de usuário)</label>
                            <input type="text" class="form-control" placeholder="URL" v-model="professional.slug" @blur="checkSlug()"
                            :class="{'slug_error' : interactions.slug_error && interactions.slug_checked, 'slug-checked': !interactions.slug_error && interactions.slug_checked}">
                        </div>

                        <button class="btn btn-primary btn-block" @click.prevent="saveProfessional">Salvar profisional
                        </button>
                        <button class="btn btn-default btn-block" @click.prevent="cancelAddProfessional()">Cancelar
                        </button>

                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Pesquisar profissionais</h4>
                </div>
                <div class="card-body card-padding">

                    <div class="alert alert-info text-center">
                        <span href="#" class="close" data-dismiss="alert" aria-label="close">
                            <i class="ion-ios-close-outline"></i>
                        </span>
                        <span class="f-300 f-14">Pesquise pelo profissional antes de adicionar um novo usuário profissional em sua empresa.</span>
                    </div>

                    <div class="form-group search">
                        <div class="input-group">
                            <input
                                type="text" class="form-control" v-model="professional_search"
                                placeholder="Procure pelo nome ou e-mail do profissional" value=""
                                @keyup.enter="search"
                            >
                            <span class="input-group-addon btn btn-light" name="span" @click="search">
                                <i class="ion-ios-search f-20"></i>
                            </span>
                        </div>
                    </div>

                    <p v-if="!professionals.length && !interactions.addProfessional && !isCompanyAdmin(currentCompany.id)">Sua busca não retornou nenhum resultado.</p>

                    <div class="text-center" v-if="searched && !interactions.addProfessional && isCompanyAdmin(currentCompany.id)" >
                        <p>Não encontrou o profissional que você procura? Cria agora um novo perfil para o profissional.</p>
                         <button class="btn btn-primary btn-block" @click="interactions.addProfessional = true">
                            Adicionar novo profissional
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- List -->
        <div class="container m-t-10" v-if="professionals.length">

            <card-placeholder
                v-if="placeholder"
                :circleImage="true"
                :small="true"
                :title="professional.full_name"
            >
            </card-placeholder>

            <div class="row" v-if="!placeholder">

                <div class="col-sm-4 col-xs-12" v-for="(professional, $index) in professionals">
                    <div class="card">

                        <div class="card-header ch-alt text-center">
                             <div class="picture-circle" :style="`background-image:url('${ professional.avatar }')`"></div>
                            <h3 class="f-300 m-b-0">
                                {{ professional.full_name }}
                            </h3>
                        </div>
                        <div class="card-body card-padding text-center">
                            <!-- Infos -->
                            <span class="label label-primary f-300 f-14 m-t-5 m-r-5"
                                  v-for="category in professional.categories">
                                {{ category.name }}
                            </span>

                            <span class="d-block m-t-10 f-300 f-14">
                                <strong class="f-400">Email: </strong>{{ professional.email }}
                            </span>
                            <!-- / Infos -->

                            <!--Confirmed professional -->
                            <div  class="m-t-5" v-if="professional.is_professional && professional.is_confirmed && isCompanyAdmin(currentCompany.id)">
                                <hr v-if="smallDevices" class="m-t-20 m-b-20" style="border: 0; border-top: 1px solid rgba(56,57,56,.1) ">

                                <router-link 
                                    :to="{name: 'admin.companies.professional.show', params: {company_id: currentCompany.id, professional_id: professional.id}}" 
                                    type="button" 
                                    class="btn btn-primary btn-sm btn-block m-t-10"
                                >Gerenciar</router-link>
                            </div>
                            <!--Confirmed professional -->

                            <!--Unconfirmed professional-->
                            <div class="m-t-5" v-if="!professional.is_professional && isCompanyAdmin(currentCompany.id)">
                                <button class="btn btn-info btn-xs" @click.prevent="professionalSolicitation(professional.id)">
                                    Enviar solicitação
                                </button>
                            </div>

                            <button class="btn btn-info btn-xs m-r-5 m-t-5 disabled" v-if="professional.is_professional && !professional.is_confirmed && professional.id != currentUser.id && isCompanyAdmin(currentCompany.id)">
                                Solicitação enviada
                            </button>

                            <button class="btn btn-info btn-xs m-r-5 m-t-5" @click.prevent="acceptSolicitation" v-if="professional.is_professional && !professional.is_confirmed && professional.id == currentUser.id">
                                Confirmar solicitação
                            </button>

                            <button class="btn btn-danger btn-xs m-r-5 m-t-5" @click.prevent="removeProfessional(professional.id)" v-if="professional.is_professional && !professional.is_confirmed && isCompanyAdmin(currentCompany.id)">
                                Excluir solicitação
                            </button>

                            <!--Unconfirmed professional-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- / List -->

        <div class="container">


            <div class="row">

                <div class="text-center" v-if="!professionals.length && !searched">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum profissional adicionado
                </span>
                </div>

                <div class="row">
                    <div class="col-sm-12" v-show="professionals.length">
                        <div class="text-center">
                            <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- EDIT SCHEDULE -->
        <div class="modal" id="modal-manage-professional" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Editar profissional</h4>
                    </div>
                    <div class="modal-body">

                        <label class="label label-danger full f-16 p-5">Atenção!</label>
                        <p>Você esta editando as permissões e visibilidade deste profissional na empresa {{currentCompany.name}}.</p>


                        <div class="form-group m-t-10">
                            <label>Habilitar perfil público</label><br>
                            <label class="switch">
                                <input type="checkbox" v-model="companyProfessionalEdit.is_public">
                                <div class="slider round"></div>
                            </label>
                         </div>
                         <p>Usuários com <b>perfil público</b> serão exibidos na lista de profissionais desta empresa.</p>

                         <div class="form-group m-t-10">
                            <label>Acesso administrativo</label><br>
                            <label class="switch">
                                <input type="checkbox" v-model="companyProfessionalEdit.is_admin" :disabled="companyProfessionalEdit.professional_id == currentCompany.owner_id">
                                <div class="slider round"></div>
                            </label>
                            <p v-if="companyProfessionalEdit.professional_id == currentCompany.owner_id">Você é o proprietário desta empresa e não pode deixar de ser administrador desta empresa.</p>
                         </div>
                         <p><b>Usuários administrativos</b> terão acesso completo à todos os módulos da empresa: <b>Clientes, Agenda, Controle, Fotos, Planos e preços, Profissionais, Informações</b> entre outros funções.</p>

                         <hr>
                         <div class="">
                             <button class="btn btn-danger btn-block btn-sm" @click="removeProfessional(companyProfessionalEdit.professional_id)" :disabled="companyProfessionalEdit.professional_id == currentCompany.owner_id">Excluir profissional da empresa</button>
                             <p class="text-center" v-if="companyProfessionalEdit.professional_id == currentCompany.owner_id">Você é o proprietário e não pode excluir a si mesmo desta empresa.</p>
                         </div>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="updateProfessionalCompanyRelationship()">Salvar permissões</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- EDIT SCHEDULE -->
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {clearProfessionalObject} from '@/models/Professional.js'
    import Multiselect from 'vue-multiselect'
    import slug from 'slug'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default {
        name: 'company-professionals-tab',
        components: {
            pagination: require('@/components/pagination.vue'),
            Multiselect,
            cardPlaceholder
        },
        data() {
            return {
                interactions: {
                    addProfessional: false,
                    search: false,
                    slug_error: false,
                    slug_checked: false,
                },
                placeholder: true,
                smallDevices: window.screen.width <= 414 ? true : false,
                professionals: [],
                pagination: {},
                professional_search: '',
                searched: false,
                navigate_url: null,
                professional: clearProfessionalObject(),
                selectedCategories: null,
                companyProfessionalEdit: {
                    company_id: '',
                    professional_id: '',
                    is_admin: false,
                    is_confirmed: false,
                    is_public: false,
                }
            }
        },

        computed: {
            ...mapGetters(['currentUser','currentCompany', 'isCompanyAdmin', 'isCompanyProfessional']),
        },
        mounted() {
            this.getProfessionals()
            this.getCategories()
        },
        methods: {


            ...mapActions(['acceptCompanySolicitation']),

            checkSlugBlur: function(){
                let that = this

                var full_name = this.professional.name + ' ' + this.professional.last_name;
                this.professional.slug = slug(full_name).toLowerCase()
                this.checkSlug();

            },

            checkSlug: function(){
                let that = this

                this.professional.slug = slug(this.professional.slug).toLowerCase()

                that.$http.get(`check_slug/professional/${that.professional.slug}`)
                .then(function (response) {

                    that.interactions.slug_error = response.data.already_exist;
                    that.interactions.slug_checked = true;

                    if(that.interactions.slug_error){
                        that.professional.slug += '-'+Math.floor(Math.random() * 99999) + 1;
                    }

                })
                .catch(function (error) {
                });
            },

            manageProfessional: function(professional){
                let that = this

                that.companyProfessionalEdit.company_id = that.currentCompany.id;
                that.companyProfessionalEdit.professional_id = professional.id;
                that.companyProfessionalEdit.is_admin = professional.is_admin;
                that.companyProfessionalEdit.is_public = professional.is_public;
                that.companyProfessionalEdit.is_confirmed = professional.is_confirmed;

                $('#modal-manage-professional').modal('show');
            },

            updateProfessionalCompanyRelationship: function(){
                let that = this

                that.$http.post(`professional/company/professional/updateProfessionalCompanyRelationship`, that.companyProfessionalEdit)
                    .then(function (response) {

                        that.getProfessionals();

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            getCategories() {
                let that = this
                that.$http.get(`professional/category/list`)
                    .then(function (response) {

                        that.categories = response.data

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setCategories(selecteds) {
                if (selecteds) {

                    this.professional.categories = selecteds.map((category) => category.id)
                }
            },

            getProfessionals: function () {
                let that = this

                that.placeholder = true
                that.$http.post('professional/company/professionals', {company_id: that.$route.params.company_id})
                    .then(function (response) {

                        that.professionals = response.data.professionals
                        that.pagination = response.data.pagination

                        that.navigate_url = 'professional/company/professionals'

                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            navigate(page) {
                let that = this

                that.$http.post(`${that.navigate_url}?page=${page}`, {
                    company_id: that.$route.params.company_id,
                    search: that.professional_search,
                    page: page
                })
                    .then(function (response) {

                        that.professionals = response.data.professionals
                        that.pagination = response.data.pagination

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            search() {
                let that = this

                that.placeholder = true

                if(that.professional_search.length < 4){
                    warningNotify('', 'Informe nome ou email para pesquisar');
                    return false;
                }

                that.$http.post('professional/company/professional/search', {
                    search: that.professional_search,
                    company_id: that.$route.params.company_id
                })
                    .then(function (response) {

                        that.professionals = response.data.professionals
                        that.pagination = response.data.pagination
                        that.searched = true
                        that.navigate_url = 'professional/company/professional/search'
                        setTimeout(() => {
                            that.placeholder = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            professionalSolicitation(professional_id) {
                let that = this

                that.$swal({
                    title: 'Atenção',
                    text: 'Você tem certeza deseja adicionar este profissional?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Adicionar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                that.$http.post('professional/company/professional/solicitation', {
                    company_id: that.$route.params.company_id,
                    professional_id: professional_id,
                    user_full_name: that.currentUser.full_name,
                    company_name: that.currentCompany.name
                })
                    .then(function (response) {

                        successNotify('', 'Solicitação enviada com sucesso')

                        that.getProfessionals()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                })
                .catch(function (error) {

                    console.log(error)
                });
            },

            removeProfessional: function(professional_id){
                let that = this

                $('#modal-manage-professional').modal('hide');

                that.$swal({
                    title: 'Atenção',
                    text: 'Você tem certeza que deseja remover este profissional?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Remover',
                    confirmButtonColor: '#E14A45',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post('professional/company/professional/remove_solicitation', {
                        professional_id: professional_id,
                        company_id: that.currentCompany.id,
                        user_full_name: that.currentUser.full_name,
                        company_name: that.currentCompany.name
                    })
                    .then(function (response) {

                        successNotify('', 'Profissional removido com sucesso')

                        if(that.currentUser.id == professional_id){

                            that.$router.push({name: 'admin.companies.list'})
                            return false
                        }

                        that.getProfessionals()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });

                }).catch(function () {
                    that.interactions.isUpdate = false;
                    that.interactions.EditWorkdays = false;
                    that.workdays_changed = false;
                })

            },

            cancelAddProfessional() {
                this.professional = clearProfessionalObject()
                this.interactions.addProfessional = false
            },

            validate() {

                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (!this.professional.name) return {validated: false, message: 'Informe o nome do profissional'}
                if (!this.professional.last_name) return {validated: false, message: 'Informe o sobrenome do profissional'}
                if (!this.professional.email) return {validated: false, message: 'Informe o e-email do profissional'}
                if (re.test(this.professional.email) !== true) return {validated: false, message: 'Informe um email válido'}
                else return {validated: true}
            },

            saveProfessional() {
                var that = this
                const validate = this.validate()

                that.professional.company_id = that.$route.params.company_id

                if (validate.validated) {

                    that.$http.post('professional/company/professional/create', that.professional)
                        .then(function (response) {

                            if (response.data.status == 422) {
                                errorNotify('', 'Localizamos um profissional com este email.')

                                that.professional_search = that.professional.email
                                that.interactions.addProfessional = false
                                that.search();

                            } else {

                                successNotify('', 'Profissional adicionado com sucesso.')

                                that.getProfessionals()

                                that.cancelAddProfessional()

                            }

                        })
                        .catch(function (error) {

                            console.log(error)
                        });
                } else {
                    errorNotify('', validate.message)
                }
            },

            acceptSolicitation(){
                let that = this

                that.$http.post('professional/company/professional/accept_solicitation', {
                    professional_id: that.currentUser.id,
                    company_id: that.$route.params.company_id
                })
                    .then(function (response) {

                        that.acceptCompanySolicitation(that.currentCompany.id)

                        successNotify('', 'Solicitação confirmada com sucesso')

                        that.getProfessionals()

                    })
                    .catch(function (error) {

                        console.log(error)
                    });
            },

        }
    }
</script>

<style scoped>
    /* default inputsearch */
    .search .form-control {
        border-width: 1px;
        border-right: 0;
        transition: none;
        font-weight: 300;
        height: 45.1px;
    }

    .search .form-control:focus {
        border-right: 0;
        transition: none;
    }

    .search .form-control:focus + .btn.btn-light {
        border-color: #383938;
        transition: none;
    }

    .search .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }

</style>
