<template>
    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/contract.png" alt="">
                <h3 class="f-300">Planos e preços</h3>
            </div>

            <div class="alert alert-info text-center">
                Administre seus planos e preços de serviços aqui
            </div>
        </div>

        <div class="container" v-if="!isCompanyAdmin(currentCompany.id)">

            <div class="col-sm-12 text-center" >
                <div class="box d-block">
                    <p class="m-t-10">Você <b>não</b> tem permissão para acessar este recurso.</p>
                </div>
            </div>

        </div>

        <div class="container" v-if="isCompanyAdmin(currentCompany.id)">

            <div class="row">
                <div class="col-sm-12">
                    <router-link tag="button" :to="{name: 'admin.companies.plans.create-edit', params: {company_id: currentCompany.id}}" type="button" class="btn f-20 btn-light btn-block f-300" name="button">
                        <span><i class="ion-ios-plus-outline m-r-5"></i>Novo plano</span>
                    </router-link>
                </div>
            </div>

            <!-- <pre>{{plans[0]}}</pre> -->


            <div class="text-center" v-if="!plans.length">
            <span class="d-block m-t-30 f-300">
                <i class="d-block ion-sad-outline f-24"></i>
                Nenhum plano adicionado.
            </span>

            </div>

            <div class="row m-t-30">
                <!-- List Plans -->

                <card-placeholder
                    v-if="placeholder"
                    :onlyHeader="true"
                    :onlyHeaderNoImage="true"
                    :onlyHeaderOpened="true"
                    :cols="' col-sm-4 col-xs-12'"
                >
                </card-placeholder>

                <div class="col-sm-4 col-xs-12" v-for="(plan, indexPlan) in plans">
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header ch-alt text-center">
                            <h3 class="f-300 m-0">{{plan.name}}</h3>
                            <span class="label label-primary p-5 m-t-10">{{ plan.category.name }}</span>
                            <span class="label label-success p-5 m-t-10" v-if="plan.is_active">Ativo</span>
                            <span class="label label-danger p-5 m-t-10" v-if="!plan.is_active">Desativado</span>
                        </div>
                        <!-- / Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding">
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Descrição: </strong>
                                {{ plan.description ? plan.description : 'Não possui descrição' }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Valor: </strong>
                                {{ plan.value | formatCurrency }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Período: </strong>
                                {{ plan.expiration }} (meses)
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Ativo? </strong>
                                {{ plan.is_active | handleTrueFalse }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Visível para clientes? </strong>
                                {{ plan.is_starred | handleTrueFalse }}
                            </span>
                            <span class="d-block f-300">
                                <strong class="f-400">Quantidade: </strong>
                                {{ plan.limit_quantity ? `${ plan.quantity }` : 'Por período' }}
                            </span>

                            <div class="text-center">
                                <hr>
                                <router-link
                                    tag="button"
                                    class="btn btn-info btn-sm btn-block"
                                    :to="{name: 'admin.companies.plans.create-edit', params: {company_id: currentCompany.id}, query: {isUpdate: true, plan_id: plan.id}}"
                                >
                                    Editar plano
                                </router-link>

                                <button class="btn btn-danger btn-sm btn-block m-t-10" @click.prevent="removePlan(indexPlan, plan.id)">Excluir plano</button>
                            </div>
                        </div>
                        <!-- / Card Body -->
                    </div>
                </div>
                <!-- /Plans -->

            </div>

            <div class="row">
                <div class="text-center m-t-20">
                    <button class="btn btn-sm btn-info" @click="getDestoyedPlans()">Carregar planos excluídos</button>
                </div>
            </div>

            <div class="row">
                <!-- Destroyed Plans -->
                <div class="col-sm-4 col-xs-12 m-t-20" v-for="(plan, indexDestroyedPlan) in destroyed_plans">
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header ch-alt text-center">
                            <h3 class="f-300 m-0">{{plan.name}}</h3>
                            <span class="label label-primary p-5 m-t-10">{{ plan.category.name }}</span>
                            <span class="label label-success p-5 m-t-10" v-if="plan.is_active">Ativo</span>
                            <span class="label label-danger p-5 m-t-10" v-if="!plan.is_active">Desativado</span>
                        </div>
                        <!-- / Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding">
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Descrição: </strong>
                                {{ plan.description ? plan.description : 'Não possui descrição' }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Valor: </strong>
                                {{ plan.value | formatCurrency }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Período: </strong>
                                {{ plan.expiration }} (meses)
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Ativo? </strong>
                                {{ plan.is_active | handleTrueFalse }}
                            </span>
                            <span class="d-block f-300 m-b-10">
                                <strong class="f-400">Destaque? </strong>
                                {{ plan.is_starred | handleTrueFalse }}
                            </span>
                            <span class="d-block f-300">
                                <strong class="f-400">Quantidade: </strong>
                                {{ plan.limit_quantity ? `${ plan.quantity }` : 'Sem limites de' }} {{plan.label}}(s)
                            </span>

                            <div class="text-center">
                                <hr>

                                <button class="btn btn-info btn-xs btn-block" @click.prevent="restorePlan(indexDestroyedPlan, plan.id)">Reativar plano</button>
                            </div>
                        </div>
                        <!-- / Card Body -->
                    </div>
                </div>
                <!-- /Destroyed Plans -->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import cardPlaceholder from '@/components/card-placeholder.vue'

    export default{
        name: 'company-plans-tab',
        components: {
            cardPlaceholder
        },
        data() {
            return {
                plans: [],
                destroyed_plans: [],
                placeholder: true
            }
        },

        computed:{
            ...mapGetters(['currentUser', 'currentCompany', 'isCompanyAdmin']),
        },
        mounted(){
            this.getCompanyPlans();
        },
        methods: {

            getCompanyPlans: function(){
                let that = this
                that.placeholder = true;
                that.$http.get(`professional/company/plan/list/${that.$route.params.company_id}`)
                .then(function (response) {
                    that.plans = response.data.plans
                    that.placeholder = false;
                })
                .catch(function (error) {
                    console.log(error)
                    that.placeholder = false;
                });
            },

            removePlan(index, plan_id){
                let that = this

                that.$swal({
                    title: 'Excluir plano',
                    text: 'Tem certeza que gostaria de excluir este plano?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.get(`professional/company/plan/destroy/${plan_id}`)
                        .then(function (response) {
                            that.plans.splice(index, 1)

                            successNotify('', 'Plano excluído com sucesso.')
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(function () {

                })
            },

            getDestoyedPlans: function(){
                let that = this
                that.$http.get(`professional/company/plan/list/destroyed/${that.$route.params.company_id}`)
                    .then(function (response) {
                        that.destroyed_plans = response.data.destroyed_plans
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            restorePlan(index, plan_id){
                let that = this

                that.$swal({
                    title: 'Reativar plano',
                    text: 'Tem certeza que gostaria de reativar este plano?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.get(`professional/company/plan/undestroy/${plan_id}`)
                        .then(function (response) {
                            that.destroyed_plans.splice(index, 1)

                            successNotify('', 'Plano reativado com sucesso.')

                            that.getCompanyPlans()
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

                }).catch(function () {

                })
            },
        }
    }
</script>

<style scoped>


</style>
