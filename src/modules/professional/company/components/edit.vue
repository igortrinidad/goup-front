<template lang="html">

        <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Editar empresa'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container m-t-10">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Dados da empresa</h4>
                </div>



                <div class="card-body card-padding">


                    <div class="form-group m-t-10">
                        <label>Nome</label>
                        <input class="form-control" v-model="company.name">
                    </div>

                    <div class="form-group">
                        <label>Website</label>
                        <input class="form-control" v-model="company.website">
                    </div>

                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea class="form-control" placeholder="Insira uma breve descrição sobre sua empresa" v-model="company.description"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Telefone</label>
                        <input class="form-control" v-model="company.phone" v-mask="'(##) # ####-####'">
                    </div>

                    <div class="checkbox-group">
                        <label class="checkbox">
                        <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="company.is_delivery">
                        <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">

                        </div>
                        <span class="wp-checkbox-text">Atende os clientes em casa ou outros locais?</span></label>
                    </div>

                    <div class="checkbox-group">
                        <label class="checkbox">
                        <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="company.address_is_available">
                        <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">

                        </div>
                        <span class="wp-checkbox-text">Possui endereço fixo de atendimento?</span></label>
                    </div>

                    <div class="" v-if="interactions.changeAddress">

                        <div class="form-group" v-if="company.address_is_available">
                            <label>Endereço</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setCompanyAdress"
                                placeholder="Digite o endereço de atendimento"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                            >
                            </GmapAutocomplete>
                        </div>

                        <div class="form-group" v-if="!company.address_is_available">
                            <label>Cidade</label>
                            <GmapAutocomplete
                                class="form-control"
                                :select-first-on-enter="true"
                                @place_changed="setCity"
                                placeholder="Digite o nome da cidade"
                                :options="{ language: 'pt-BR', componentRestrictions: { country: 'br' } }"
                                :types="['(cities)']"
                            >
                            </GmapAutocomplete>
                        </div>

                    </div>

                    <div class="form-group m-t-20" v-if="!interactions.changeAddress">
                        <label>Endereço atual</label>
                        <p>{{company.address.full_address}}</p>
                    </div>

                    <div class="checkbox-group">
                        <label class="checkbox">
                        <input type="checkbox" class="wp-checkbox-reset wp-checkbox-input" v-model="interactions.changeAddress">
                        <div class="wp-checkbox-reset wp-checkbox-inline wp-checkbox">

                        </div>
                        <span class="wp-checkbox-text">Alterar endereço?</span></label>
                    </div>

                    <hr>

                    <div class="form-group text-right">
                        <button class="btn btn-primary" @click="updateCompanyProfile()">Salvar alterações</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Categories Modal -->
        <div class="modal" id="modal-categories" tabindex="-1" role="dialog" v-if="!interactions.waitingForCategories">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"data-dismiss="modal" aria-hidden="true" aria-label="Close">
                            <span aria-hidden="true"><i class="fa fa-times"></i></span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Categorias</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-info text-center">
                                    <span href="#" class="close" data-dismiss="alert" aria-label="close">
                                        <i class="ion-ios-close-outline"></i>
                                    </span>
                                    <span class="f-300 f-14">Você pode ter até {{ company.categories.length }} categorias adicionadas, categorias extras interferem no valor do plano.</span>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header ch-alt text-center p-relative">
                                        <span class="cat-count m-b-10">{{ interactions.selectedCategories.length }}/{{ categories.length }}</span>
                                        <h3 class="f-300 m-0 f-14">
                                            Escolha as categorias para começar a agendar cliente e profissionais.
                                        </h3>
                                    </div>
                                    <div class="card-body card-padding">
                                        <div class="row">
                                            <div class="col-sm-6 col-xs-6 m-t-15 m-b-15 p-relative text-center" v-for="category in categories">
                                                <!-- <div class="picture-circle picture-circle-l" :style="`background-image: url('${ category.avatar }')`"></div> -->
                                                <img
                                                    class="img-responsive category cursor-pointer m-b-10"
                                                    :class="{'non-active': interactions.selectedCategories.indexOf(category.id) == -1, 'active': interactions.selectedCategories.indexOf(category.id) > -1}"
                                                    @click="toggleSelectedCategories(category.id)"
                                                    :src="category.avatar"
                                                    :alt="category.name"
                                                >
                                                <span class="f-300 f-14 t-overflow">{{ category.name }}</span>
                                                <span class="cat-check" v-if="interactions.selectedCategories.indexOf(category.id) == -1">
                                                </span>
                                                <span class="cat-check active" v-if="interactions.selectedCategories.indexOf(category.id) > -1">
                                                    <i class="ion-checkmark-round"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="saveCategory()">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Categories Modal -->
    </div>
</template>

<script>

    import {apiUrl} from '@/config/'
    import mainHeader from '@/components/main-header.vue'
    import Multiselect from 'vue-multiselect'

    import companyModel from '@/models/Company.js'

    import {mapGetters, mapActions} from 'vuex'
    import slug from 'slug'

    export default{
        name: 'companies-edit',
        components:{
            mainHeader,
            Multiselect
        },
        data(){
            return{
                interactions: {
                    changeAddress: false,
                    selectedCategories: [],
                    waitingForCategories: true
                },
                company: companyModel,
                isMobile: false,
                categories: [],
                selectedCategories:[],
            }
        },
        mounted(){
            this.getCompany();
            this.getCategories();


            if(window.cordova){
                this.isMobile = true
            }
        },
        computed:{
            ...mapGetters(['AuthToken'])
        },
        methods:{

            ...mapActions(['setLoading']),

            saveCategory() {
                this.selectedCategories = this.interactions.selectedCategories.map((categoryId) => categoryId)
            },

            toggleSelectedCategories(categoryId) {
                let that = this

                var index = that.interactions.selectedCategories.indexOf(categoryId);
                if(index > -1){
                    that.$swal({
                        title: 'Atenção',
                        text: 'Remover uma categoria pode afetar a agenda de profissionais e clientes que podem já estar com horários marcados!',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Remover mesmo assim',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: '#00A369',
                        confirmButtonColor: '#E14A45',
                    }).then(function () {
                        that.interactions.selectedCategories.splice(index,1)
                    }).catch(function () {
                        console.log('cancelou a ação');
                    })
                } else {
                    if (that.interactions.selectedCategories.length < that.company.categories.length) {
                        that.interactions.selectedCategories.push(categoryId)
                    } else {
                        that.$swal({
                            title: 'Atenção',
                            text: `Você não pode selecionar mais de ${ that.company.categories.length } categorias. adicionar uma extra influencia no valor do plano mensal.`,
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Adicionar mesmo assim',
                            cancelButtonText: 'Cancelar',
                            cancelButtonColor: '#00A369',
                            confirmButtonColor: '#E14A45',
                        }).then(function () {
                            that.interactions.selectedCategories.push(categoryId)
                        }).catch(function () {
                            console.log('cancelou a ação');
                        })
                    }
                }

            },

            getCategories(){
                let that = this
                that.$http.get(`professional/category/list`)
                    .then(function (response) {
                     that.categories = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            setCategories(selecteds){
                if(selecteds){
                    this.company.categories = selecteds.map((category) => category.id)
                }
            },

            getCompany: function(){
                let that = this

                that.$http.get(`professional/company/show/${that.$route.params.company_id}`)
                .then(function (response) {

                    that.company = response.data.company
                    that.selectedCategories = that.company.categories
                    that.company.categories.map((category) => {
                        that.toggleSelectedCategories(category.id)
                    })
                    that.interactions.waitingForCategories = false

                })
                .catch(function (error) {
                    console.log(error)
                });
            },

            updateCompanyProfile: function(){
                let that = this

                that.company.categories = that.selectedCategories

                that.$http.post(`/professional/company/update`, that.company)
                    .then(function (response) {

                        successNotify('', 'Empresa atualizada com sucesso.')
                        that.$router.push({name: 'admin.companies.show', params: {company_id: that.company.id}});

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            setCity(place) {
                let that = this

                if (place.geometry !== undefined) {

                    that.company.lat = place.geometry.location.lat()
                    that.company.lng = place.geometry.location.lng()

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.company.state = current.short_name
                            }
                            //City
                            if(type == 'administrative_area_level_2'){
                                that.company.city = current.short_name
                            }
                        })
                    })
                }
            },

            setCompanyAdress(place) {
                console.log(place)

                let that = this
                if (place.geometry !== undefined) {

                    that.company.lat = place.geometry.location.lat()
                    that.company.lng = place.geometry.location.lng()

                    that.company.address = {
                        full_address: place.formatted_address,
                        name: place.name,
                        url: place.url
                    }

                    place.address_components.map((current) =>{
                        current.types.map((type) => {
                            //state
                            if(type == 'administrative_area_level_1'){
                                that.company.state = current.short_name
                            }

                            //City
                            if(type == 'administrative_area_level_2'){
                                that.company.city = current.short_name
                            }
                        })
                    })
                }
            },

        },

    }
</script>

<style scoped>
    /* make modal fullscreen on mobile*/
    @media only screen and (max-width : 768px) {
        .modal-dialog {
            width: 100%;
            min-height: 100%;
            padding: 0;
            margin: 0;
        }
        .modal-content {
            height: 100%;
            min-height: 100%;
            height: auto;
            border-radius: 0;
            border: 0px solid transparent;
        }

        .modal-content {
            height: 100%;
            border-radius: 0;
            position:relative;
        }
    }

    /* categories */
    .img-responsive { border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); }
    .img-responsive.active { opacity: 1; }
    .img-responsive.non-active { opacity: .7; }

    /* Cat Count */
    .cat-count {
        display: inline-flex;
        width: 40px; height: 40px;
        background: #00A369;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: 700;
        color: #FFF;
        border: 2px solid #F4F5F5;
    }

    /* Category Check */
    .cat-check {
        display: flex;
        width: 20px; height: 20px;
        position: absolute;
        top: -5px; right: 5px;
        background: #F4F5F5;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
        color: #00A369;
        font-size: 12px;
    }
    .cat-check.active { box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.15); }

    /* Alert */
    .alert.alert-info {
        padding-left: 30px !important;
        padding-right: 30px !important;
        position: relative;
    }
    .alert .close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        opacity: .9;
        font-size: 20px;
        text-shadow: none;
    }
</style>
