<template>
        <div class="first-container">

            <main-header
                :type="'center'"
                :title="'Cadastro'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            ></main-header>

            <div class="container m-t-20">
            <div class="row">
                <div class="col-sm-6 col-xs-12">
                    <div class="box">
                        <div class="text-center" style="width: 100%;">
                            <span class="f-300 f-22">Para Usuários</span>
                            <hr style="margin:10px 0 0 0 !important;">
                        </div>
                        <div class="m-t-5 text-center" style="width: 100%;">
                            <span class="f-300">
                                <i class="d-block ion-ios-calendar-outline f-40"></i>
                                No <b>iSaudavel</b> você encontrará profissionais especializados em sua saúde como instrutores e estúdios de Pilates, Personal Trainners e diversas clinícas de saúde e bem estar. Agende horários com estes profissionais diretamente do aplicativo, controle suas aulas, seus treinos, dietas e muito mais. Sua saúde esta em boas mãos!
                            </span>
                        </div>
                        <router-link
                            to="/cliente/cadastro"
                            tag="button"
                            type="button"
                            class="btn btn-sm btn-block btn-primary m-t-10"
                            name="button"
                        >
                            Cadastrar agora
                        </router-link>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12">
                    <div class="box">
                        <div class="text-center" style="width: 100%;">
                            <span class="f-300 f-22">Para profissionais</span>
                            <hr style="margin:10px 0 0 0 !important;">
                        </div>
                        <div class="m-t-5 text-center" style="width: 100%;">
                            <span class="f-300">
                                <i class="d-block ion-ios-time-outline f-40"></i>
                                O <b>iSaudavel</b> foi criado para você profissional da área da saúde e seu cliente economizarem o mais importante da vida: <b>TEMPO</b>. Uma plataforma dedicada para você divulgar seus serviços e organizar o atendimento a seu cliente de forma simplificada.
                                <router-link
                                    tag="button"
                                    to="/cadastro"
                                    type="button"
                                    class="btn btn-sm btn-block btn-primary m-t-10"
                                    name="button"
                                >
                                    Cadastrar agora
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default{
        name: 'signup-chooser',
        components: {
            mainHeader,
        },
        data(){
            return {}
        },
        mounted(){

        },
        methods: {}
    }
</script>
<style scoped>

</style>
