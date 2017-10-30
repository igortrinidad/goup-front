<template>
    <div class="first-container">
        <main-header
            :type="'center'"
            :title="'Esqueci minha senha'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container text-center">
            <h2 class="f-300 m-b-30">Recuperar senha</h2>


            <h4 class="f-300 m-t-30">Informe o email de acesso</h4>

            <div class="form-group">
                <input class="form-control" v-model="email" placeholder="E-mail">
            </div>

            <div class="form-group">
                <button class="btn btn-primary f-300 p-5 p-l-10 p-r-10" @click="generateNewPass()">Recuperar senha</button>
            </div>


        </div>
    </div>
</template>

<script>
    import mainHeader from '@/components/main-header.vue'

    export default{
        name: 'landing-reset-password',
        components:{
            mainHeader,
        },
        data(){
            return {
                usertype: 'admin',
                email: '',
            }
        },
        mounted(){

        },
        methods: {
            generateNewPass: function(){
                let that = this

                if(!that.usertype || !that.email){
                    errorNotify('', 'Informe os dados corretamente.');
                    return false
                }

                that.$http.get(`/tools/users/generateNewPass/${that.$route.params.usertype}/${that.email}`)
                .then(function (response) {
                    successNotify('', 'Nova senha enviada para o email informado.');
                    if(that.$route.params.usertype == 'client'){
                        that.$router.push({name: 'client.auth.login'});
                    } else {
                        that.$router.push({name: 'auth.login'});   
                    }

                })
                .catch(function (error) {
                    errorNotify('', 'Usuário/Email não localizado.')
                    console.log(error)
                });

            },
        }
    }
</script>

<style scoped>

</style>
