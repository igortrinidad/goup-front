<template lang="html">
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Termos de uso'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <span>terms</span>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'terms',
        components: {
	    	mainHeader
	    }
    }
    </script>

<style scoped>

</style>
