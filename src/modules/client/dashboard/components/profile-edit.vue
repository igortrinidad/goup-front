<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Editar perfil'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>


        <div class="header-profile">
            <div class="container">
                <div class="text-center">
                    <router-link to="/cliente/mostrar-perfil">
                        <div class="picture-circle picture-circle-p" :style="`background-image:url('${ currentUser.avatar }')`">
                        </div>
                    </router-link>
                    <h2 class="f-300 m-15">{{ currentUser.full_name }}</h2>
                </div>
            </div>
        </div>

        <div class="container m-t-10">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Meus dados</h4>
                </div>

                <div class="card-body card-padding">

                    <div class="alert alert-dismissible alert-info" v-if="currentUser.blank_password">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4>Configurar senha</h4>
                        <p>É necessário que você configure uma senha para conectar-se utilizando e-mail e senha.</p>
                    </div>

                    <div class="form-group">
                        <label>Primeiro nome</label>
                        <input class="form-control" type="text" v-model="client.name">
                    </div>

                    <div class="form-group">
                        <label>Sobrenome</label>
                        <input class="form-control" type="text" v-model="client.last_name">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" type="email" v-model="client.email">
                    </div>

                    <div class="form-group">
                        <label>Telefone</label>
                        <input class="form-control" type="tel" v-model="client.phone">
                    </div>

                    <div class="form-group">
                        <label>Nascimento</label>
                        <datepicker
                            id="client-bday"
                            input-class="form-control"
                            v-model="client.bday"
                            language="pt-br"
                            placeholder="Data de nascimento"
                            format="dd/MM/yyyy"
                            :required="true"
                        >
                        </datepicker>
                    </div>

                    <div class="form-group">
                        <label>Meu objetivo</label>
                        <input class="form-control" type="text" v-model="client.target">
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300 m-0">Segurança</h4>
                </div>
                <div class="card-body card-padding">
                    <fieldset>
                        <!--Usuário não possui uma senha cadastrada-->
                        <div v-if="currentUser.blank_password">
                            <div class="form-group">
                                <label>Senha</label>
                                <input v-validate="'min:6'" type="password" class="form-control"
                                       data-vv-as="senha" name="password_confirmation" placeholder="Sua senha"
                                       v-model="client.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div class="form-group">
                                <label>Confirmar senha</label>
                                <input v-validate="'confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar senha"
                                       name="password" placeholder="Confirmar senha" v-model="client.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>
                        </div>
                        <!--Usuário não possui uma senha cadastrada-->

                        <!--Usuário possui uma senha cadastrada-->
                        <div v-if="!currentUser.blank_password">

                            <p class="text-info m-t-20 m-b-20">Para alterar a senha atual preencha os campos abaixo.</p>

                            <div class="form-group">
                                <label>Senha atual</label>
                                <input v-validate="'min:6'" type="password"
                                       class="form-control" data-vv-name="current_password"
                                       data-vv-as="senha atual senha"
                                       placeholder="Informe sua senha atual" v-model="client.current_password">
                                <p class="help-block" v-if="errors.has('current_password')">
                                    {{errors.first('current_password')}}</p>
                            </div>

                            <div class="form-group">
                                <label>Nova senha</label>
                                <input v-validate="'min:6'" type="password" class="form-control"
                                       data-vv-as="nova senha" name="password_confirmation" placeholder="Informe a nova senha"
                                       v-model="client.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div class="form-group">
                                <label>{{ !currentUser.blank_password ? 'Confirmar nova senha' : 'Confirmar senha'}}</label>
                                <input v-validate="'confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar nova senha"
                                       name="password" placeholder="Confirmar nova senha"
                                       v-model="client.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>
                        </div>
                        <!--Usuário possui uma senha cadastrada-->
                    </fieldset>

                </div>
            </div>

            <div class="row">
                <div class="col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
                    <button class="btn btn-primary btn-block btn-sm" @click="updateProfile()">Salvar alterações</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    import mainHeader from '@/components/main-header.vue'
    import Datepicker from 'vuejs-datepicker'
    import moment from 'moment'


    import Avatar from '@/components/avatar.vue'
    import {apiUrl} from '@/config/'

    import {cleanClientModel} from '@/models/Client'

    export default{
        name: 'client-profile-edit',
        components:{
            mainHeader,
            Avatar,
            photoUploader: require('@/components/photo-uploader.vue'),
            Datepicker
        },
        data(){
            return{
                isMobile: false,
                photoUploader:{
                    isvisible: false
                },
                client: cleanClientModel()
            }
        },
        mounted(){

            if(window.cordova){
                this.isMobile = true
            }

            this.getClient()
        },
        computed: {

            ...mapGetters(['currentUser', 'AuthToken'])
        },
        methods:{

            ...mapActions(['authSetUser', 'setLoading']),

            getClient(){
                let that = this

                that.$http.post(`client/profile/show`, {client_id: that.$route.query.client_id})
                    .then(function (response) {

                        that.client = response.data.client
                        that.client.bday = moment(that.client.bday, 'DD/MM/YYYY').toDate()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },


            updateProfile: function(){
                let that = this

                that.$validator.validateAll().then(() => {

                    delete that.client.slug;
                    that.client.bday = moment(that.client.bday).format('DD/MM/YYYY')


                    that.$http.post(`client/profile/update`, that.client)
                        .then(function (response) {

                            if (response.data.error) {
                                that.$validator.errorBag.add('current_password', 'Senha atual incorreta.');
                                errorNotify('', 'Senha atual incorreta.')
                            }

                            if (!response.data.error) {
                                that.authSetUser(response.data.client)

                                that.$router.push({name: 'client.profile.show'})

                                successNotify('', 'Dados atualizados com sucesso.')
                            }

                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(() => {

                });
            },

        },
    }
</script>
