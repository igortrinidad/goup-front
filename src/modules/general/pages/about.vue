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
        </div>

    </div>

</template>

<script>
	import mainHeader from '@/components/main-header.vue'

	export default {
	    name: 'about',
	    components: {
	    	mainHeader,

	    },
        data(){
            return {
            }
        },
        methods: {

        }
	}

</script>

<style scoped>

</style>
