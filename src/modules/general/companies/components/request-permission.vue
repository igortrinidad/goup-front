<template>

   <div>

   		<!--Permissions Modal-->
        <div class="modal" id="modal-company-permissions" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title text-center" id="myModalLabel">{{company.name}}</h4>
                    </div>
                    <div class="modal-body text-center">
                        <p>
                            Você está adicionando esta empresa na sua lista de empresas, selecione abaixo quais módulos esta empresa poderá visualizar e editar.
                        </p>
                        <p>
                        	Os profissionais cadastrados nessa empresa também terão acesso aos módulos que você conceder permissões para a empresa.
                        </p>
                        <p>
                        	Você poderá rever ou alterar as informacões a qualquer momento.
                        </p>

                        <div class="row m-t-20">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Treinamentos</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.trainnings_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.trainnings_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Dietas</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.diets_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.diets_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Avaliações</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.evaluations_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.evaluations_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Restrições</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.restrictions_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>


                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.restrictions_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 text-center">
                                <h4>Exames</h4>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Visualizar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.exams_show">
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 text-center">
                                <div class="form-group m-t-10">
                                    <label>Gerenciar</label><br>
                                    <label class="switch">
                                        <input type="checkbox" v-model="clientCompanyPermissions.exams_edit">
                                        <div class="slider round"></div>
                                    </label>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal"
                                @click="createClientCompanyPermission()">Adicionar empresa
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Permissions Modal-->

   </div>

</template>

<script>

	import {cleanClientCompanyPermissionModel} from '@/models/ClientCompanyPermission'
	import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'landing-companies-show-request-permission',
        props: {
        	company: {
        		type: Object
        	}
        },
        data(){
        	return {
        		clientCompanyPermissions: cleanClientCompanyPermissionModel(),
        	}
        },
        mounted: function(){
            let that = this

            if(this.checkRole('client')){
	        	this.clientCompanyPermissions.client_id = this.currentUser.id
	        	this.clientCompanyPermissions.company_id = this.$route.params.company_id
            }

        },
        computed: {
        	...mapGetters(['isLogged', 'currentUser', 'checkRole', 'checkCompanyRelation'])
        },
        methods: {

            ...mapActions(['addClientCompany']),

        	createClientCompanyPermission() {
                let that = this

                that.$http.post('client/company/solicitation', that.clientCompanyPermissions)
                    .then(function (response) {


                    	if(response.data.status == 422){
                    		warningNotify('', 'Você já adicionou esta empresa.');
                    	} else {

                            that.addClientCompany(response.data.company)
	                        successNotify('', 'Permissões atualizadas com sucesso')

                    	}

                        $('#modal-company-permissions').modal('hide');

                    })
                    .catch(function (error) {
                    	if(error.data.status == 422){
                    		warningNotify('', 'Você já adicionou esta empresa.');
                    	}
                        console.log(error)
                    });
            }
        }
    }
</script>
