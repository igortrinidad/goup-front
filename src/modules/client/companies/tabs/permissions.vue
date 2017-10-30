<template lang="html">
    <div class="container m-t-30">
        <h3 class="f-300 text-center">Permissões</h3>

        <div class="card m-t-30">
            <div class="card-body card-padding">

                <div class="border-inside-card m-t-0">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="f-300">Treinamentos</h4>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Visualizar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.trainnings_show">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>

                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Gerenciar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.trainnings_edit">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-inside-card">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="f-300">Dietas</h4>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Visualizar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.diets_show">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Gerenciar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.diets_edit">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-inside-card">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="f-300">Avaliações</h4>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Visualizar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.evaluations_show">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Gerenciar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.evaluations_edit">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-inside-card">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="f-300">Restrições</h4>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Visualizar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.restrictions_show">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>

                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Gerenciar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.restrictions_edit">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-inside-card">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center">
                            <h4 class="f-300">Exames</h4>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Visualizar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.exams_show">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="form-group m-t-10">
                                <label>Gerenciar</label><br>
                                <label class="switch">
                                    <input type="checkbox" v-model="selectedCompanyPermissions.exams_edit">
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-info btn-block p-5 m-t-20" @click="updateCompanyPermissions()">
                    Salvar
                </button>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'permissions-tab',
        components: {
        },
        props: {
            company: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                interactions: {},
                selectedCompanyPermissions: {}
            }
        },

        computed: {

        },

        mounted() {
            
            this.selectedCompanyPermissions = this.company.pivot

        },

        methods: {

            ...mapActions(['setLoading']),

            updateCompanyPermissions() {
                let that = this
                that.setLoading({is_loading: true, message: ''})
                that.$http.post('client/company/update_relationship', that.selectedCompanyPermissions)
                    .then(function (response) {
                        successNotify('', 'Permissões atualizadas com sucesso')
                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        errorNotify('', 'Não foi possivel atualiuzar as permissões com a empresa')
                        console.log(error)
                        that.setLoading({is_loading: false, message: ''})
                    });
            }
        }
    }
</script>

<style scoped>

    .border-inside-card {
        margin-top: 18px;
    }

</style>
