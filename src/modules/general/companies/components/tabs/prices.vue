<template>
    <div>

        <div class="container m-t-30">
            <div class="row">
                <!-- Plans -->
                <div class="col-sm-12">
                    <div class="text-center">
                        <img class="img-icon" src="../../../../../assets/icons/price.png" alt="">
                        <h3 class="f-300 m-b-30">Planos</h3>
                    </div>
                    <div class="row">
                        <div class="col-sm-4 col-sm-6" v-for="plan in company.plans">
                            <!-- Card -->
                            <div class="card">
                                <div class="card-header ch-alt text-center" @click="interactions.plansCardOpenned.toggleSelected(plan.id)">
                                    <h4 class="f-300">
                                        <i class="ion-ios-star m-r-5" v-if="plan.is_favorite"></i>
                                        {{ plan.name }}
                                    </h4>
                                </div>
                                <div class="card-body card-padding text-center">

                                    <span class="label label-primary f-20 p-10 f-300">{{ plan.value | formatCurrency }}</span>
                                    <p class="f-300 m-t-10">{{ plan.description }}</p>
                                    <p class="f-300" v-if="!plan.description">Sem descrição</p>

                                    <hr>
                                    
                                    <div class="dropup">
                                        <button class="btn btn-primary dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Entrar em contato
                                        <span class="caret"></span></button>
                                        <ul class="dropdown-menu text-center" role="menu" aria-labelledby="menu1">
                                            <li role="presentation text-center" v-show="company.phone"><a role="menuitem" :href="'tel:'+company.phone">Ligar</a></li>
                                            <li role="presentation" v-show="company.website"><a role="menuitem" href="#" @click.prevent="openSystemUrl(company.website)">Website</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- /Card -->
                        </div>
                        <!-- Company Has No Plans -->
                        <div class="col-sm-12 text-center" v-if="!company.plans.length">
                            <span class="f-300 f-danger">Nenhum plano informado</span>
                        </div>
                        <!-- /Company Has No Plans -->
                    </div>
                </div>
                <!-- / Plans -->

            </div>
        </div>

        <div class="container m-t-30" v-if="company.plans.length">
            <div class="text-center">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum plano adicionado
                </span>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'landing-company-prices',
        props: {
            company: {
                type: Object
            }
        },
        data(){
            return {
                interactions: {
                    plansCardOpenned: [],
                    promosCardOpenned: [],
                },
                promos: [],
            }
        },
        mounted(){

        },
        methods: {
            openSystemUrl: function(url){
                window.open(url, '_system');
            },
        }
    }
</script>

<style scoped>


</style>
