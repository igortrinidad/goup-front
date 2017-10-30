<template>

    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Histórico'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="wrapper fixtop primary padding">
            <div class="container">
                <div class="text-center">
                    <router-link to="/cliente/mostrar-perfil">
                        <div class="picture-circle picture-circle-p" :style="`background-image:url('${ currentUser.avatar }')`">
                        </div>
                    </router-link>
                    <h2 class="f-300 m-15">{{ currentUser.full_name }}</h2>
                </div>
            </div>
        </div>

    	<div class="container m-t-30">
            <div class="text-center m-t-10">
                <img class="img-icon" src="../../../../../../assets/icons/exam.png" alt="">
                <h4 class="f-300">Avaliações</h4>
            </div>
            <!-- Card Canvas -->
            <div class="card" id="index-history-chart">
                <div class="card-header ch-alt">
                    <h4 class="f-300 m-0 text-center">Histórico: {{indexHistory}}</h4>
                </div>
                <div class="card-body m-t-20">
                    <canvas width="500" height="400" ref="evaluationChart" id='myChart'></canvas>
                </div>
                <button class="btn btn-sm btn-info btn-block m-t-5" @click="makeBase()">Compartilhar no instagram</button>

                <img :src="photo" />
            </div>
            <!-- / Card Canvas -->
    	</div>
    </div>

</template>

<script>
	import {mapGetters} from 'vuex'
    import Chart from 'chart.js'
    import moment from 'moment'

    import Avatar from '@/components/avatar.vue'
    import mainHeader from '@/components/main-header.vue'

    export default{
        name: 'client-dashbaord-history-evaluations',
        components: {
            mainHeader,
            Avatar
        },
        data(){
            return {
            	indexHistory: '',
                interactions: {
                    evaluationLoading: true,
                },
                photo: '',
            }
        },
        computed: {
        	...mapGetters(['currentUser']),
        },
        mounted: function(){
        	this.indexHistory = this.$route.params.index_history;
        	this.getIndexHistory()
        },

        methods: {

            makeBase: function(){
                let that = this
            
                var url_base64 = document.getElementById('myChart').toDataURL('image/png');

                this.shareViaInstagram(url_base64, this.indexHistory)
                
            },

            shareViaInstagram: function(photo_url, indexator){
                let that = this
            
                window.plugins.socialsharing.shareViaInstagram('Meu histórico de ' + indexator + ' no iSaudavel.', photo_url, 
                    function(){
                        successNotify('', 'Compartilhado com sucesso.')
                    },function(errormsg){
                       errorNotify('', errormsg)
                    }
                );

            },

            initEvaluationChart(evaluation) {
                setTimeout(() => {

                    if (this.evaluationChart) this.evaluationChart.destroy()

                    this.evaluationChart = new Chart(this.$refs.evaluationChart.getContext('2d'), {
                        type: 'line',
                        data: {
                            labels: evaluation.labels.map((label) => moment(label.date).format('D/MM/YYYY')),
                            datasets: [
                                {
                                    label: 'Atual',
                                    fontColor: '#383938',
                                    backgroundColor: 'rgba(255, 204, 95, 1)',
                                    borderColor: 'rgba(255, 204, 95, 1)',
                                    fill: false,
                                    data: evaluation.value,
                                },
                                {
                                    label: 'Objetivo',
                                    fontColor: '#383938',
                                    backgroundColor: 'rgba(0, 163, 105, 1)',
                                    borderColor: 'rgba(0, 163, 105, 1)',
                                    fill: false,
                                    data: evaluation.target,
                                }
                            ]
                        },
                        options: {
                            legend: { labels: { fontSize: 18, fontFamily: 'Roboto', fontColor: '#383938' }},
                            scales: {
                                fontColor: '#383938',
                                xAxes: [
                                    { display: true, }
                                ],
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            }
                        }
                    })
                }, 100)
            },

        	getIndexHistory: function(){
        	    let that = this

        	    var data = {
        	    	client_id: that.currentUser.id,
        	    	index: that.$route.params.index_history
        	    }

                that.$http.post(`client/evaluation/history/index`, data)
                    .then(function (response) {
                        that.evaluations = response.data.evaluations
                        that.initEvaluationChart(that.evaluations)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

        	},
        }
    }
</script>

<style scoped>
    /*Btn Group*/
    .btn-group .btn{ border-width: 1px; }
    .btn-group .btn.btn-light { color: #00A369 !important; border-color: #00A369; }
    .btn:active, .btn.active {
        box-shadow: none !important;
    }

</style>
