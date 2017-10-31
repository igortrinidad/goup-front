<template lang="html">

   <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/notepad.png" alt="">
                <h3 class="f-300">Observações</h3>

                <div class="alert alert-info m-t-20 text-center">
                Adicione aqui as observações, notas e informações adicionais sobre o cliente {{client.full_name}}. Estas observações são privadas da sua empresa e seus profissionais, o cliente não terá acesso à elas.
            </div>
            </div>
        </div>

        <div class="container">
            <button class="btn btn-info btn-block m-t-30" data-toggle="modal" data-target="#modal-add-observation">
                Adicionar nova observação
            </button>
        </div>

        <div class="container m-t-30">

            <card-placeholder
                v-if="placeholder"
                :onlyHeader="true"
                :onlyHeaderNoImage="true"
                :onlyHeaderOpened="true"
                :cols="'col-xs-12 col-sm-12'"
            >
            </card-placeholder>

            <p class="text-center" v-if="!company_client_observations.length">Nenhuma observação adicionada</p>

            <div class="card" v-for="(observation, index) in company_client_observations">
                <div class="card-header ch-alt text-center">
                    <div class="picture-circle picture-circle-xs" :style="`background-image:url('${ observation.professional.avatar }')`"></div>
                    <h4>{{observation.professional.full_name}}</h4>
                    <p>{{observation.created_at | moment('DD/MM/YYYY HH:mm:ss')}}</p>
                    
                </div>
            
                <div class="card-body text-center card-padding">
                    {{observation.content}}
                    <hr>
                    <button class="btn btn-danger btn-xs m-b-0" @click="removeObservation(observation.id, index)">Excluir observação</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="text-center">
                    <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                </div>
            </div>
        </div>

        <!-- ADD OBS -->
        <div class="modal" id="modal-add-observation" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Nova observação</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label>Observação</label>
                            <textarea type="text" class="form-control" v-model="newObservation.content" placeholder="Insira uma observação"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" @click.prevent="saveNewObservation()" :disabled="!newObservation.content">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ADD OBS -->
        
   </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'company-client-observations',
        components: {
            pagination: require('@/components/pagination.vue'),
            cardPlaceholder: require('@/components/card-placeholder.vue')
        },
        props: ['client'],
        data(){
        	return {
                newObservation: {
                    client_id: '',
                    company_id: '',
                    professional_id: '',
                    content: ''
                },
                company_client_observations: [],
                pagination: {},
                navigate_url: null,
                placeholder: true,
        	}
        },
        computed: {
            ...mapGetters(['currentUser']),
        },
        mounted: function(){
            this.newObservation.company_id = this.$route.params.company_id;
            this.newObservation.client_id = this.$route.params.client_id;
            this.newObservation.professional_id = this.currentUser.id;
            this.getCompanyClientObservations();
        },
        methods: {

            ...mapActions(['setLoading']),

            saveNewObservation: function(){
                let that = this
            
                that.$http.post('professional/company/client/observation/create', that.newObservation)
                    .then(function (response) {

                        successNotify('', 'Observação adicionada com sucesso.')

                        $('#modal-add-observation').modal('hide')
                        that.getCompanyClientObservations();
                        that.newObservation.content = '';

                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {
                        that.setLoading({is_loading: false, message: ''})
                    });

            },

            getCompanyClientObservations: function(){
                let that = this
            
                that.placeholder = true;

                that.$http.post('professional/company/client/observation/list', that.newObservation)
                    .then(function (response) {

                        that.company_client_observations = response.data.data;
                        that.pagination = response.data.pagination;

                        that.navigate_url = 'professional/company/client/observation/list';

                        that.placeholder = false;

                    })
                    .catch(function (error) {
                        
                    });

            },

            navigate(page) {
                let that = this

                that.$http.post(`${that.navigate_url}?page=${page}`, that.newObservation)
                    .then(function (response) {

                        that.company_client_observations = response.data.data;
                        that.pagination = response.data.pagination;

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            removeObservation: function(observation_id, index){
                let that = this
            
                that.$http.get(`professional/company/client/observation/destroy/${observation_id}`)
                    .then(function (response) {

                        that.company_client_observations.splice(index, 1)

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                
            },
        }
    }
</script>

<style scoped>


</style>
