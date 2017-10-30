<template lang="html">
    <div>
        <div id="primary-menu-global-id" :class="{ 'primary-menu': true, 'active': isOpened }">

            <!-- MENU HEADER -->
            <div class="header text-center">
                <!-- <img class="logo" src="../assets/logos/LOGO-1-01.png" /> -->
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
            <!-- / MENU HEADER -->

        </div>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex'
    import moment from 'moment';

    export default {
        name: 'primary-menu',
        components: {
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
                    $('#primary-menu-global-id').removeClass('active')
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
        }
    }
</script>

<style scoped>

    /* Menu */
    .menu-items{
        max-height: 80vh;
        overflow-y: auto;
        padding-bottom: 100px;
        margin-bottom: 200px;
    }
    strong { color: #88C657; font-weight: 300; }

    .primary-menu {
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
    .primary-menu.active + .primary-menu-bg { display: block; }
    .primary-menu.active {
        transform: translateY(100vh);
        transition: ease .4s;
    }

    /* Menu Header */
    .primary-menu .header {
        padding: 11px 40px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-flow: row wrap;
    }

    .primary-menu .header .avatar {
        margin: 20px auto;
        border-radius: 50%;
        max-width: 80px;
    }

    .primary-menu .header .logo {
        margin: 20px auto;
        max-width: 140px;
    }

    .primary-menu .header .name { color: #FFF; }

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
    .primary-menu .header{
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
