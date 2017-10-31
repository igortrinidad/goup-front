<template lang="html">

   <div>
   		<div class="container m-t-30">
            <div class="text-center">
                <h3 class="f-300">Sobre</h3>
            </div>
        </div>

        <div class="container m-t-20">
            
            <div class="card">

                <div class="card-body card-padding">
                    <span class="d-block f-300 m-t-5">
                        <strong class="f-400"><i class="ion-email m-r-5"></i>E-mail:</strong>
                        <small>{{ client.email ? client.email : 'Não disponível' }}</small>
                    </span>
                    <hr>
                    <span class="d-block f-300 m-t-5">
                        <strong class="f-400"><i class="ion-ios-telephone m-r-5"></i>Telefone:</strong>
                        <small>{{ client.phone ? client.phone : 'Não disponível' }}</small>
                    </span>
                    <hr>
                    <span class="d-block f-300 m-t-5">
                        <strong class="f-400"><i class="fa fa-birthday-cake f-12 m-r-5"></i>Nascimento:</strong>
                        <small>{{ client.bday ? client.bday : 'Não disponível' }}</small>
                    </span>

                </div>
            </div>
        </div>

        <div class="container">

            <button class="btn btn-danger btn-block m-t-20" @click.prevent="removeClient">
                Excluir cliente
            </button>

            <div class="alert alert-info m-t-20 text-center">
                Ao excluir um cliente você não poderá acessar o Dashboard do cliente e o mesmo não será mais listado na lista de clientes da empresa. Porém todos os agendamentos, planos, faturas e etc deste cliente ainda irão existir para seu controle. Se precisar, você pode solicitar ao cliente novo acesso para listado novamente em sua lista de clientes com todas as informações.
            </div>
        </div>
        
   </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'company-client-about',
        props: ['client'],
        data(){
        	return {
        	}
        },
        computed: function(){
            let that = this
        },
        mounted: function(){
            let that = this
        },
        methods: {

            ...mapActions(['setLoading']),

            removeClient(){
                let that = this

                that.$swal({
                    title: 'Atenção',
                    text: 'Se você remover este cliente você não poderá acessar as informações da Dashboard e perfil do cliente em sua empresa. Você tem certeza que quer excluir este cliente?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Remover',
                    confirmButtonColor: '#E14A45',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                }).then(function () {

                    that.setLoading({is_loading: true, message: ''})

                    that.$http.post('professional/company/client/remove_solicitation', {
                        company_id: that.$route.params.company_id,
                        client_id:  that.client.id
                    })
                        .then(function (response) {

                            successNotify('', 'Cliente removido com sucesso')

                            that.$router.push({name: 'admin.companies.show', params: {company_id: that.$route.params.company_id}})

                            that.setLoading({is_loading: false, message: ''})

                        })
                        .catch(function (error) {

                            console.log(error)

                            that.setLoading({is_loading: false, message: ''})
                        });

                }).catch(function () {

                })
            },
        }
    }
</script>
