<template lang="html">


        <div class="first-container">

        	<main-header
                :type="'center'"
                :title="'Sobre'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

	        <div class="container">
                <h3 style="max-width: 200px; margin: 0 auto;">
                </h3>

		        <span class="notification notification-primary m-t-10">
                    <b class="f-400">ISaudavel</b> é uma ferramenta criada para integrar as pessoas com os profissionais da área da saúde. Conectando as mais diversas especialidades em um único espaço para que todos os profissionais auxiliem seus clientes a atingirem seus objetivos e tornem o processo e toda comunicação entre esses profissionais centralizada no perfil do cliente, dando total controle a você cliente sobre sua saúde e objetivos.
                </span>

                <div class="text-center m-t-20">
                    <h4 class="f-300">Para Usuários</h4>
                </div>

                <div class="box">
                    <ul class="f-300">
    		        	<li>Encontre profissionais da área da saúde conhecendo o perfil profissional e suas capacitações e avaliações de outros clientes.</li>
    		        	<li>Agende horários com estes profissionais diretamente da plataforma.</li>
                        <li>Controle sua programação de treinamentos e exercícios físicos juntamente com os profissionais responsáveis por suas atividades físicas.</li>
                        <li>Controle sua dieta juntamente com os profissionais responsáveis por suas dietas.</li>
    		        	<li>Adicione exames para que todos os profissionais que auxiliam na sua saúde possam ter acesso aos exames mais importantes como raio-x, hemograma, colesterol e outros que você queira compartilhar com seus profissionais.</li>
                        <li>Adicione restrições de exercícios, medicamentos e alimentos para que todos os profissionais possam ter acesso à estas informações na hora de elaborar seus planos de atividades e alimentação.</li>
                        <li>Adicione observações sobre sua rotina diária de atividade, dieta e tudo que envolva a sua saúde para você ter um controle histórico sobre sua saúde e bem estar.</li>
    		        </ul>
                </div>
		        <hr>
                <div class="text-center">
                    <h4 class="f-300">Para profissionais e empresas de saúde</h4>
                </div>
                <div class="box">
                    <ul class="f-300">
    		        	<li>Divulgue seu perfil profissional para toda a plataforma ISaudavel.</li>
    		        	<li>Controle os horários de atendimento e de sua equipe.</li>
    		        	<li>Controle os pagamentos dos planos de seus clientes.</li>
    		        	<li>Notifique automáticamente seus clientes quando os planos deles vencerem.</li>
    		        </ul>
                </div>
		        <hr>
                <div class="text-center">
                    <h4 class="f-300">Antes de utilizar, leia os Termos de uso e Politica de privacidade</h4>
                </div>
                <div class="text-center">
                    <button class="btn btn-info btn-sm" @click="openSystemUrl('https://isaudavel.com/politicas')">Política de privacidade</button>
    		        <button class="btn btn-info btn-sm" @click="openSystemUrl('https://isaudavel.com/termos-de-uso')">Termos de uso</button>
                </div>
                <hr>
                <div class="text-center">
                    <h4 class="f-300">Versão do aplicativo</h4>
                </div>
                <h3 class="text-center">{{version}}</h3>
	        </div>
        </div>

</template>

<script>
	import mainHeader from '@/components/main-header.vue'
    import packagejson from '@/../package.json'

	export default {
	    name: 'about',
	    components: {
	    	mainHeader,

	    },
        data(){
            return {
                version: packagejson.version
            }
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
