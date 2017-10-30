<template lang="html">


        <div class="first-container">

        	<main-header
                :type="'center'"
                :title="'Logs'"
                :cursor="false"
                :action="function(){ return false}"
                :hasback="true"
            >
            </main-header>

	        <div class="container">
                <h1>Log de erros</h1>
                <div class="p-10" v-for="(erro, index) in errorsLocal">
                    <pre>{{erro}}</pre>
                </div>
            </div>
        </div>

</template>

<script>
	import mainHeader from '@/components/main-header.vue'
	export default {
	    name: 'errors',
	    components: {
	    	mainHeader
	    },
        data() {
            return {
                errorsLocal: []
            }
        },
        mounted: function(){
            let that = this
            
            var errorsLocal = JSON.parse(localStorage.getItem('errors') );
            this.errorsLocal = errorsLocal
        },
	}

</script>

<style scoped>

</style>
