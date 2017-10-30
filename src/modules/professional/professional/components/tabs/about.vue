<template lang="html">
    <div>
        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../assets/icons/infos.png" alt="">
                <h4 class="f-300">Sobre</h4>
            </div>
        </div>

        <div class="container m-t-10">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300">Meus dados</h4>
                </div>

                <div class="card-body card-padding">

                    <div class="form-group">
                        <label>Nome:</label>
                        <p>{{ currentUser.full_name }}</p>
                    </div>

                    <div class="form-group">
                        <label>Email:</label>
                        <p>{{ currentUser.email }}</p>
                    </div>

                    <div class="form-group">
                        <label>Telefone:</label>
                        <p>{{ currentUser.phone ?  currentUser.phone : 'Não disponível' }}</p>
                    </div>

                    <div class="form-group">
                        <label>Especialidades:</label>
                        <span class="label label-success p-5 f-12 m-r-5" v-for="(category, indexCategory) in currentUser.categories">
                            {{ category.name }}
                        </span>
                    </div>

                    <hr>
                    <div class="form-group">
                        <router-link to="/dashboard/profissional/editar-perfil" tag="button" class="btn btn-info btn-block">
                            Editar Perfil
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
    export default{
        name: 'admin-professional-about',
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
