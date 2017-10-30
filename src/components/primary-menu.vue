<template lang="html">
    <div>
        <div id="side-menu-global-id" :class="{ 'side-menu': true, 'active': isOpened }">
            <!-- NAO LOGADO -->
            <div class="header text-center" v-if="!isLogged">
                <img class="logo" src="../assets/logos/LOGO-1-01.png" />
                <button
                    type="button"
                    id="close-menu"
                    class="navbar-toggle to-close"
                    @click="handleMenuIOS()"
                    v-if="checkIOS"
                >
                    <span class="sr-only">Toggle navigation</span>
                    <i class="ion-ios-close-empty f-26"></i>
                </button>
            </div>

            <!-- Notifications Professional -->
            <router-link
                tag="span"
                class="user-notification cursor-pointer"
                :to="{ name: 'professional.notifications' }"
                exact
                v-if="checkRole('professional')"
            >
                <i class="ion-ios-bell-outline"></i>
                <span class="badge badge-primary user-notification-count">3</span>
            </router-link>

            <!-- Notifications Client -->
            <router-link
                tag="span"
                class="user-notification cursor-pointer"
                :to="{ name: 'client.notifications' }"
                exact
                v-if="checkRole('client')"
            >
                <i class="ion-ios-bell-outline"></i>
                <span class="badge badge-primary user-notification-count">{{clientUnreadedNotifications}}</span>
            </router-link>

            <!-- LOGADO -->
            <div class="header text-center" v-if="isLogged">

                <button
                    type="button"
                    id="close-menu"
                    class="navbar-toggle to-close"
                    @click="handleMenuIOS()"
                    v-if="checkIOS"
                >
                    <span class="sr-only">Toggle navigation</span>
                    <i class="ion-ios-close-empty f-26"></i>
                </button>

                <!-- CLIENTE -->
                <div class="full p-relative" v-if="checkRole('client')">

                        <div class="" @dblclick="goProfileClient()">

                            <div class="picture-circle picture-circle-l" :style="`background-image:url('${ currentUser.avatar }')`"></div>
                            <span class="profile-tip">Clique duas vezes para editar</span>
                        </div>

                        <div class="full m-t-10 text-center">
                            <span class="user-name f-300 f-20">{{currentUser.full_name}}</span>
                            <div class="full m-t-10">
                                <span class="label label-success f-14 p-l-15 p-r-15">{{currentUser.total_xp}} pontos</span>
                            </div>
                        </div>

                    <!--
                    <div class="progress progress-primary full m-t-15">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="userProgress.percent" aria-valuemin="0" aria-valuemax="100" :style="`width: ${ userProgress.percent }%;`">
                        </div>
                    </div>
                    -->
                </div>

                <!-- PROFISSIONAL -->
                <span class="full p-relative" v-if="checkRole('professional')">

                    <div @dblclick="goProfileProfessional()">
                        <div class="picture-circle picture-circle-l" :style="`background-image:url('${ currentUser.avatar }')`"></div>
                        <span class="profile-tip">Clique duas vezes para editar</span>
                    </div>

                    <div class="full m-t-10 text-center">
                        <span class="user-name f-300 f-20">{{currentUser.full_name}}</span>
                    </div>
                </span>
            </div>


            <div class="menu-items">

                <ul class="main-menu">

                    <li>
                        <router-link class="home-link" to="/" exact>
                            <span>
                                <i class="ion-ios-home-outline m-r-5 f-20"></i> Home
                            </span>
                        </router-link>
                    </li>
                </ul>

                <!-- NAO LOGADO -->
                <ul class="main-menu" v-if="!isLogged" @click="handleMenuIOS()">

                    <li>
                        <router-link to="/cliente/login" exact>
                            <span>
                                <i class="ion-log-in m-r-5 f-20"></i> Login <strong>Usuário</strong>
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link to="/login" exact>
                            <span>
                                <i class="ion-log-in m-r-5 f-20"></i> Login <strong>Profissional</strong>
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link to="/cadastrar" exact>
                            <span>
                                <i class="ion-ios-personadd-outline m-r-5 f-20"></i> Cadastre-se
                            </span>
                        </router-link>
                    </li>

                </ul>
                <!-- /NAO LOGADO -->

                <!-- CLIENTE LOGADO -->
                <ul class="main-menu" v-if="checkRole('client')">

                    <li class="sub-menu">
                        <a href="#" class="sub-menu">
                            <i class="ion-clipboard m-r-5 f-20"></i> Dashboard
                        </a>
                        <ul>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'calendar')">
                                    Agenda
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'companies')">
                                    Empresas
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'trainnings')">
                                    Treinamentos
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'diets')">
                                    Dietas
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'evaluations')">
                                    Avaliações
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'restrictions')">
                                    Restrições
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'exams')">
                                    Exames
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteClient('client.dashboard', currentUser.id, 'photos')">
                                    Fotos
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>


                <!-- CLIENTE LOGADO -->
                <ul class="main-menu" v-if="checkRole('client')" >


                    <li >
                        <router-link :to="{name: 'client.profile.show'}" exact>
                            <span>
                                <i class="ion-ios-body-outline m-r-5 f-20"></i> Minha conta
                            </span>
                        </router-link>
                    </li>


                </ul>
                <!-- CLIENTE LOGADO -->

                <!-- PROFISSIONAL LOGADO -->
                <ul class="main-menu" v-if="isLogged && checkRole('professional')" >

                    <!-- DASHBOARD PROFISSIONAL -->
                    <li class="sub-menu">
                        <a href="#" class="sub-menu">
                            <i class="ion-clipboard m-r-5 f-20"></i> Dashboard
                        </a>
                        <ul>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'calendar')">
                                    Agenda
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'workdays')">
                                    Horários
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'companies')">
                                    Empresas
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'ratings')">
                                    Avaliações
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'courses')">
                                    Cursos
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'about')">
                                    Sobre
                                </a>
                            </li>
                            <li>
                                <a @click="pushDashboardRouteProfessional('admin.professional.dashboard', 'photos')">
                                    Fotos
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- COMPANIES -->
                    <li class="sub-menu" >
                        <a href="#" class="sub-menu">
                            <i class="ion-ios-briefcase m-r-5 f-20"></i> Empresas
                        </a>
                        <ul>

                            <li class="sub-menu" v-for="company in currentUser.companies">
                                <a href="#" class="sub-menu">
                                    {{company.name}}
                                </a>
                                <ul>
                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'calendar')">
                                            Agenda
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'clients')">
                                            Clientes
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'invoices')">
                                            Faturas
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'plans')">
                                            Planos
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'professionals')">
                                            Profissionais
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'recomendations')">
                                            Recomendações
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'ratings')">
                                            Avaliações
                                        </a>
                                    </li>

                                    <li>
                                        <a @click="pushCompanyDashboard('admin.companies.show', company.id, 'photos')">
                                            Fotos
                                        </a>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </li>

                    <li >
                        <router-link class="home-link" :to="{name: 'professional.profile.edit'}" exact>
                            <span>
                                <i class="ion-ios-body-outline m-r-5 f-20"></i> Minha conta
                            </span>
                        </router-link>
                    </li>

                </ul>
                <!-- PROFISSIONAL LOGADO -->

                <!-- GERAL -->
                <ul class="main-menu">

                    <li >
                        <router-link :to="{name: 'landing.companies.list'}" exact>
                            <span>
                                <i class="ion-ios-search m-r-5 f-20"></i> Procurar empresas
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link :to="{name: 'landing.professionals.list'}" exact>
                            <span>
                                <i class="ion-ios-search m-r-5 f-20"></i> Procurar profissionais
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link :to="{name: 'landing.events.list'}" exact>
                            <span>
                                <i class="ion-android-bicycle m-r-5 f-20"></i> Eventos
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link :to="{name: 'landing.meal-recipes.list'}" exact>
                            <span>
                                <i class="ion-ios-nutrition m-r-5 f-20"></i> Receitas
                            </span>
                        </router-link>
                    </li>

                    <li >
                        <router-link :to="{name: 'landing.about'}" exact>
                            <span>
                                <i class="ion-ios-information-outline m-r-5 f-20"></i> Sobre ISaudavel
                            </span>
                        </router-link>
                    </li>
                </ul>

                <ul class="main-menu">

                    <li class="sub-menu">
                        <a href="#" class="sub-menu">
                            <i class="ion-android-share-alt m-r-5 f-20"></i> Compartilhar com um amigo
                        </a>
                        <ul>
                            <li>
                                <a @click="openShareWhatsapp()">
                                    Enviar por WhatsApp
                                </a>
                            </li>
                            <li>
                                <a @click="openShareFacebook()">
                                    Enviar por Facebook
                                </a>
                            </li>

                            <li >
                                <router-link :to="{name: 'landing.new-invite'}" exact>
                                    Convidar por email
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <!-- SAIR PROFISSIONAL -->
                    <li  v-if="checkRole('professional')">
                        <router-link :to="{name: 'auth.logout'}" exact >
                            <span>
                                <i class="ion-log-out m-r-5 f-20"></i> Logout
                            </span>
                        </router-link>
                    </li>

                    <!-- SAIR CLIENTE -->
                    <li  v-if="checkRole('client')">
                        <router-link :to="{name: 'client.auth.logout'}" exact>
                            <span>
                                <i class="ion-log-out m-r-5 f-20"></i> Logout
                            </span>
                        </router-link>
                    </li>

                </ul>

                <router-link :to="{name: 'landing.about'}" class="credits">Created by <strong>We-Planner</strong></router-link>

                <br><br><br><br>
            </div>
            <!-- END MENU ITENS -->


        </div>

    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Avatar from '@/components/avatar.vue'
    let packagejson = require('@/../package.json');
    let packageversion = packagejson.version;
    import moment from 'moment';

    export default {
        name: 'primary-menu',
        components: {
            Avatar
        },
        props: {
            isOpened: { type: Boolean, required: true },
        },
        data() {
            return {
                interactions: {
                    dashboardClient: false,
                    dashboardProfessional: false,
                },
                isIOS: false,
                isMobile: false,
                has_new_app_version: false,
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'checkRole','userProgress', 'checkIOS', 'currentEnv', 'clientUnreadedNotifications']),
        },

        mounted() {
            //this.checkAppVersion();

            if(window.cordova){
                this.isMobile = true
                this.isIOS = this.checkIOS;
            }

            if(this.checkRole('client')){
                this.getCurrentXP()
            }

        },

        methods: {

            ...mapActions(['setClientTotalXp', 'setClientUnreadNotifications']),

            pushDashboardRouteClient(route, id, tab) {
                this.$router.push({
                    name: route,
                    params: {
                        client_id: id
                    },
                    query: {
                        tab: tab
                    }
                })
            },

            pushDashboardRouteProfessional(route, tab) {
                this.$router.push({
                    name: route,
                    query: {
                        tab: tab
                    }
                })
            },

            pushCompanyDashboard(route, company_id, tab) {
                this.$router.push({
                    name: route,
                    params: {
                        company_id: company_id
                    },
                    query: {
                        tab: tab
                    }
                })
            },

            handleMenuIOS() {
                if (this.checkIOS) {
                    $('#side-menu-global-id').removeClass('active')
                }
            },
            goProfileClient: function(){
                this.$router.push('/cliente/mostrar-perfil')
            },
            goProfileProfessional: function(){
                this.$router.push('/dashboard/profissional/mostrar-perfil')
            },

            openSystemUrl: function(url){
                window.open(url, '_system');
            },

            checkAppVersion: function(){
                let that = this

                var check_last_update_ask = localStorage.getItem('last_update_asked');
                if(!check_last_update_ask || moment().isAfter(moment(check_last_update_ask, 'YYYY-MM-DD').add(1, 'days'))){
                    that.$http.get(`tools/system/get_last_production_version`)
                        .then(function (response) {

                            if(response.data.version != packageversion){
                                that.has_new_app_version = true;

                                if(!that.isMobile){
                                    that.askUserIfHeWantsToUpdate();
                                }

                            }

                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }
            },

            askUserIfHeWantsToUpdate(){
                var that = this;

                var check_last_update_ask = localStorage.getItem('last_update_asked');
                if(!check_last_update_ask || moment().isAfter(moment(check_last_update_ask, 'YYYY-MM-DD').add(7, 'days'))){

                    that.$swal({
                        title: 'Nova versão',
                        text: `Localizamos uma nova versão, você gostaria de atualizar a página para baixar as novidades do iSaudavel?`,
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Atualizar',
                        confirmButtonColor: '#00A369',
                        cancelButtonText: 'Agora não',
                        cancelButtonColor: '#E14A45',
                        }).then(function () {

                            window.location.reload();

                        }).catch(function () {
                            localStorage.setItem('last_update_asked', moment().format('YYYY-MM-DD'));
                        })
                }
            },

            getCurrentXP(){
                let that = this
                that.$http.get('client/infos')
                    .then(function (response) {
                        //Set client current total xp
                        that.setClientTotalXp(response.data.total_xp)
                        that.setClientUnreadNotifications(response.data.unreaded_notifications)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            // Facebook share
            openShareFacebook() {
                let that = this
                var url = `https://www.facebook.com/dialog/share?app_id=151705885358217&href=https://isaudavel.com&display=popup&mobile_iframe=true`;
                    if(window.cordova){
                        var ref = window.open(url, '_blank', 'location=yes');
                        ref.addEventListener('loadstart', function(event) {
                            var url = "https://www.facebook.com/dialog/return/close";
                            if (event.url.indexOf(url) !== -1) {
                                ref.close();
                                successNotify('', 'Compartilhado com sucesso!')
                            }
                        });
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }
            },

            // Whatsapp share
            openShareWhatsapp() {
                var url = `https://api.whatsapp.com/send?text=O aplicativo iSaudavel conecta você com os melhores profissionais de saúde. Acesse o site https://isaudavel.com e saiba mais.`;
                window.open(url, '_system', null);
            },
        }
    }
</script>

<style scoped>

    /* User Notification */
    .user-notification {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 34px;
        color: #88C657;
        z-index: 99999;
    }

    .user-notification-count {
        position: absolute;
        top: 6px;
        right: -10px;
        font-weight: 700;
        background-color: #fff !important;
        color: #88C657 !important;
        border: 1px solid #88C657;
        padding: 1px 7px;
    }

    /* User  */
    .user-pic {
        border-radius: 50%;
        display: block;
        margin: 0 auto;
    }

    .user-lastbadge {
        display: flex;
        position: absolute;
        width: 30px;
        height: 30px;
        color: #fff;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        bottom: -10px;
        right: 50%;
        margin-right: -40px;
    }

    /* Menu */
    .menu-items{
        max-height: 80vh;
        overflow-y: auto;
        padding-bottom: 100px;
        margin-bottom: 200px;
    }
    strong { color: #88C657; font-weight: 300; }
    .side-menu {
        position: fixed;
        top: -100vh;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 8888;
        transition: ease .4s;
        padding: 0;
        overflow-y: hidden;
    }

    .side-menu.active + .side-menu-bg { display: block; }
    .side-menu.active {
        transform: translateY(100vh);
        transition: ease .4s;
    }

    /* Menu Header */
    .side-menu .header {
        padding: 11px 40px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-flow: row wrap;
    }
    .side-menu .header .avatar {
        margin: 20px auto;
        border-radius: 50%;
        max-width: 80px;
    }

    .side-menu .header .logo {
        margin: 20px auto;
        max-width: 140px;
    }

    .side-menu .header .name { color: #FFF; }

    .main-menu {
        list-style: none;
        padding-left: 0;
    }

    .main-menu > li {
        padding: 0;
        display: block;
        font-weight: 500;
        position: relative;
        margin: 0;
        background: #fff;
        border-top: 1px solid #f4f5f5;
    }

    .main-menu.sub {
        position: relative;
        background-color: #f4f5f5;
    }
    .main-menu > li:first-child { border-top: none; }
    .main-menu.sub > li {
        background-color: #f4f5f4;
        position: relative;
        border-color: rgba(56, 57, 56, .3);
    }

    .main-menu.sub > li > a { color: rgba(56, 57, 56, .8) !important; }
    .main-menu.sub > li > a:hover,
    .main-menu.sub > li > a:active { color: rgba(56, 57, 56, 1) !important; }

    .main-menu.sub > li .arrow {
        position: absolute;
        top: 50%;
        margin-top: -17.5px;
        left: 17px;
        font-size: 25px;
        color: rgba(56, 57, 56, .8);
        display: none;
    }
    @media (max-width: 768px) {
        .main-menu.sub > li .arrow { display: block; }
        .main-menu.sub > li { padding-left: 30px; }
    }

    .main-menu > li:last-child { border-bottom: 1px solid #f4f5f5; }
    .main-menu > li > a {
        padding: 15px 10px;
        display: block;
        color: #383938 !important;
        font-weight: 300;
        position: relative;
        margin: 0 auto;
        max-width: 768px;
    }

    .sub-menu > a:before,
    .sub-menu > a:after {
        -webkit-transition: all;
        -o-transition: all;
        transition: all;
        -webkit-transition-duration: 250ms;
        transition-duration: 250ms;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .sub-menu ul {
        list-style: none;
        display: none;
        padding: 0;

    }

    .sub-menu.active > ul {
        display: block;
    }


    .sub-menu a:hover a,
    .sub-menu a:active a { background-color: transparent; color: #88C657 !important;}

    .main-menu > li > a > i {
        left: 16px;
        font-size: 20px;
        top: 0;
        width: 25px;
        text-align: center;
        padding: 13px 0;
    }

    .main-menu > li > a.active {
        color: #383938;
        background-color: transparent;
    }

    /* Credits */
    .credits {
        color: #383938;
        font-weight: 300;
        display: block;
        width: 100%;
        text-align: center;
        position: absolute;
        padding: 20px;
        bottom: 0px;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 100
    }

    .side-menu .header{
        border-bottom: 1px solid RGBA(56, 57, 56, 0.15);
    }

    .main-menu{
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .profile-tip{
        display:block;
        opacity: 0;
        position: absolute;
        left: 0px;
        top: 5px;
        padding: 5px;
        width: auto;
        height: auto;
        background-color: white;
        border-radius: 3px;
    }
    .avatar-hover:hover + .profile-tip, .avatar-hover:active + .profile-tip {
        opacity: 0.8;
    }

    .to-close{
        top: 10px;
    }

.sub-menu > a:after {
    content: "\f107";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
}


.sub-menu.toggled > a:after {
  content: "\f106";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}


.sub-menu ul > li > a {
    padding: 15px 10px 10px 40px;
    display: block;
    color: #383938 !important;
    font-weight: 300;
    position: relative;
    margin: 0 auto;
    max-width: 768px;
    cursor: pointer;
}

.main-menu > li > a.active, .main-menu > li > a:hover{
        background-color: #F2F2F5;
}

.sub-menu ul > li > a.active,
.sub-menu ul > li > a:hover {
    color: #000;
    background-color: #F2F2F5;
}

.sub-menu ul > li:first-child > a {
    padding-top: 14px;
}

.sub-menu ul > li:last-child > a {
    padding-bottom: 16px;
}

.sub-menu ul > li ul {
    font-size: 12px;
    margin: 10px 0;
    padding-left: 20px;
}

.sub-menu.active > ul {
    display: block;

}

a{
    text-decoration: none;
}









</style>
