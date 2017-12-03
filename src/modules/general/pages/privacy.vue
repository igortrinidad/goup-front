<template lang="html">
    <div class="first-container">
        <main-header
            :type="'back'"
            :title="translations.privacy_title"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="first-container">
            <div class="container">
                <div class="docs-container">
                    <iframe
                        width="100%"
                        height="700px"
                        src="https://docs.google.com/document/d/e/2PACX-1vQYmUJE_eP_xPoLrdfdxoh3HRzhfbABRoD0tGgFC3WuVpbccLjVl1pSj1JqVzNFnyAC3Tx60a0smn36/pub?embedded=true"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'
    import * as translations from '@/translations/pages/general';
    import {mapGetters} from 'vuex'
    
    export default {
        name: 'privacy',
        components: {
	    	mainHeader
	    },
        computed: {
            ...mapGetters(['language']),

            'translations': function() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }
        }
    }
    </script>

<style scoped>

</style>
