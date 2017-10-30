<template lang="html">
    <div>
        <div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Sobre</h3>
            </div>
        </div>

        <div class="container m-t-20">

            <div class="card">
                <div class="card-body">
                    
                </div>
            </div>

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
