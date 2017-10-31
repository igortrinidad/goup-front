<template lang="html">
    <div class="first-container">

        <main-header
            :type="'center'"
            :title="'Convidar um amigo'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

        <div class="container">
            <div class="col-sm-12">
                <h3 class="text-center" style="max-width: 200px; margin: 0 auto;">
                    <!-- <img src="../../../assets/logos/LOGO-1-01.png" width="100%" class="d-block m-t--10"> -->
                </h3>
            </div>
        </div>

        <div class="container m-t-10">
            <div class="container-form">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="notification notification-default text-center">
                            <p>Convide um <b>Amigo</b> ou um <b>Profissional</b> para usar o Isaudavel (melhorar esse texto haha).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <form class="form" method="post">

            <!-- CurrentUser Erros Validation -->
            <div v-if="errors.has('user-name') || errors.has('user-email')" class="text-center m-t-10">
                <div class="container">
                    <div class="row m-b-10">
                        <div class="col-sm-12">
                            <label for="user-name" class="btn btn-danger btn-block btn-xs" v-if="errors.has('user-name')">
                                <i class="ion-alert m-r-5"></i>
                                {{ errors.first('user-name') }}
                            </label>
                        </div>
                        <div class="col-sm-12 m-t-10">
                            <label for="user-email" class="btn btn-danger btn-block btn-xs" v-if="errors.has('user-email')">
                                <i class="ion-alert m-r-5"></i>
                                {{ errors.first('user-email') }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /CurrentUser Erros Validation -->

            <!-- CurrentUser Or Invite Sender -->
            <div class="container-form">

                <legend class="text-center f-300 f-white">Informe seus dados</legend>

                <div class="m-t-20" :class="{'form-group': true, 'has-error': errors.has('user-name')}">
                    <label class="control-label" for="user-name">Seu Nome</label>
                    <input
                        id="user-name"
                        v-validate="'required'" type="text"
                        class="form-control" data-vv-name="user-name" data-vv-as="nome"
                        v-model="invite.user.name"
                        placeholder="Seu Nome"
                        >
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('user-email')}">
                    <label class="control-label" for="user-email">Seu E-mail</label>
                    <input
                        id="user-email"
                        v-validate="'required|email'" type="text"
                        class="form-control" data-vv-name="user-email" data-vv-as="email"
                        v-model="invite.user.email"
                        placeholder="Seu E-mail">
                </div>
            </div>
            <!-- / CurrentUser Or Invite Sender -->

            <!-- Invited Erros Validation -->
            <div v-if="errors.has('invited-name') || errors.has('invited-email')" class="text-center m-t-10">
                <div class="container">
                    <div class="row m-b-10 m-t-10">
                        <div class="col-sm-12" v-if="errors.has('invited-name')">
                            <label for="user-invited-name" class="btn btn-danger btn-block btn-xs">
                                <i class="ion-alert m-r-5"></i>
                                {{ errors.first('invited-name') }}
                            </label>
                        </div>
                        <div class="col-sm-12 m-t-10" v-if="errors.has('invited-email')">
                            <label for="user-invited-email" class="btn btn-danger btn-block btn-xs">
                                <i class="ion-alert m-r-5"></i>
                                {{ errors.first('invited-email') }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Invited Erros Validation -->

            <!-- Invited -->
            <div class="container-form m-t-10">

                <legend class="text-center f-300 f-white">Informe os dados do seu amigo ou profissional</legend>

                <div :class="{'form-group': true, 'has-error': errors.has('invited-name')}">
                    <label class="control-label" for="user-invited-name">Nome</label>
                    <input
                        id="user-invited-name"
                        v-validate="'required'" type="text"
                        class="form-control" data-vv-name="invited-name" data-vv-as="nome"
                        v-model="invite.user_invited.name"
                        placeholder="Nome"
                        >
                </div>

                <div :class="{ 'form-group': true }">
                    <label class="control-label" for="user-invited-last-name">Sobrenome</label>
                    <input
                        id="user-invited-last-name"
                        type="text"
                        class="form-control"
                        v-model="invite.user_invited.last_name"
                        placeholder="Sobrenome">
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('invited-email')}">
                    <label class="control-label" for="user-invited-email">E-mail</label>
                    <input
                        id="user-invited-email"
                        v-validate="'required|email'" type="text"
                        class="form-control" data-vv-name="invited-email" data-vv-as="email"
                        v-model="invite.user_invited.email"
                        placeholder="Email">
                </div>

                <button class="btn btn-primary-inverse btn-block" @click.prevent="sendInvite">Enviar convite</button>
            </div>
            <!-- / Invited -->
        </form>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'new-invite',
        components: {
            mainHeader
        },
        data() {
            return {
                invite: {
                    user: { name: '', email: '' },
                    user_invited: { name: '', last_name: '', email: '' }
                }
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted() {
            if (this.isLogged) {
                this.invite.user.name = this.currentUser.full_name
                this.invite.user.email = this.currentUser.email
            }
        },
        methods: {
            sendInvite() {
                let that = this

                that.$validator.validateAll().then(() => {
                    // invite validated
                    console.log(that.invite);
                    that.$swal({
                        title: 'Convite enviado!',
                        text: `Estaremos entrando em contato para que ${ that.invite.user_invited.name } venha fazer parte do Isaudavel`,
                        type: 'info',
                        showCancelButton: false,
                        confirmButtonColor: '#488FEE',
                        confirmButtonText: 'Voltar'
                    })

                }).catch(() => {
                    // eslint-disable-next-line
                });
            },
        }
    }
</script>

<style scoped>

</style>
