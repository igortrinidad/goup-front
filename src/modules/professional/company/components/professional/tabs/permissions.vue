<template lang="html">
    <div>
        <div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Permissões</h3>
            </div>
        </div>

        <div class="container m-t-20">

        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'

    export default{
        name: 'company-professional-about-tab',
        data(){
            return{
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        mounted(){
        },
    }
</script>
