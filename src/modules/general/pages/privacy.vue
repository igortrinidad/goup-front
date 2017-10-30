<template lang="html">
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Privacidade'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <span>privacy</span>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'privacy',
        components: {
	    	mainHeader
	    }
    }
    </script>

<style scoped>

</style>
