<template>
    <div>

        <primary-menu :isOpened="sideMenuStatus"></primary-menu>

        <button
            type="button"
            id="navbar-menu-button"
            class="hamburger-menu"
            :class="{ 'is-opened' : sideMenuStatus }"
            @click="handleMenu()"
            v-if="!checkIOS"
        >
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
        </button>

        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header" v-if="checkIOS">
                    <button
                        type="button"
                        id="navbar-menu-button"
                        class="navbar-toggle navbar-button-ios"
                        @click="handleMenuIOS()"
                    ><span class="sr-only">Toggle navigation</span><i class="ion-navicon f-26 m-r-5 m-l-5"></i>
                    </button>
                </div>

                <div v-if="type === 'logo'">
                    <router-link tag="div" class="logo" to="/">
                    </router-link>
                </div>

                <div v-if="type === 'left'" @click="action()">
                    <div class="title-header-left" :class="{'cursor-pointer': cursor}">
                        <i class="fa fa-chevron-left m-r-10"></i>
                        <h1 class="title-prop m-0">{{ title }}</h1>
                    </div>
                </div>

                <div v-if="type === 'center'" @click="action()">
                    <div class="title-header-center" :class="{'cursor-pointer': cursor}">
                        <h1 class="title-prop text-center">
                            <i class="fa fa-chevron-left back-button cursor-pointer" v-if="hasback" @click="back()"></i>
                            <span class="text-center f-300 m-0 m-b-10">
                                {{ title }}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import PrimaryMenu from '@/components/primary-menu.vue'
    import { mapGetters } from 'vuex'
    import bus from '@/utils/event-bus'
    export default{
        name: 'landing-header',
        props: {
            title: {
                type: String,
                default: null
            },
            type: {
                default: 'logo'
            },
            action: {
                type: Function,
                default: function(){
                    window.history.back();
                }
            },
            cursor: {
                default: false,
            },
            hasback: {
                default: false
            }
        },
        components: {
            PrimaryMenu
        },
        data(){
            return {
                sideMenuStatus: false
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'checkRole', 'checkIOS']),
        },
        mounted: function(){
            bus.$on('close-menu', () => this.sideMenuStatus = false);

        },
        methods:{
            handleMenu() {
                this.sideMenuStatus = !this.sideMenuStatus
            },
            handleMenuIOS() {
                $('#side-menu-global-id').addClass('active')
            },
            back: function(){
                window.history.back()
            },
        }
    }
</script>

<style scoped>
    .logo {
        width: 120px; margin: 0 auto; padding: 22px 0 20px 0;
    }
    .title-header-left {
        width: 100%; height: 40px;
        margin: 22px 0 20px 0;
        display: flex;
        align-items: center;
        color: #fff;
    }
    .title-header-center{
        height: 50px;
        margin-top: 33px;
    }
    .title-prop {
        font-size: 20px;
        color: #fff;
    }
    .back-button{
        position: absolute;
        left: 15px;
    }
    .navbar-button-ios{
        height: 40px !important;
        padding: 2px 10px !important;
        top: 10px !important;
    }
    /* Menu Hamburger */
    .hamburger-menu {
        background: transparent;
        border: none;
        display: flex;
        flex-flow: row wrap;
        width: 40px; height: 40px;
        position: fixed;
        top: 23px; right: 15px;
        justify-content: flex-end;
        font-size: 25px;
        overflow: hidden;
        z-index: 88888;
    }
    .hamburger-menu .burger {
        display: block;
        width: 100%;
        height: 2px;
        margin: 3px 0;
        border-radius: 6px;
        transition: ease .3s;
        transform: rotate(0deg);
        background: #fff;
        position: relative;
    }
    /* Is Opened */
    .hamburger-menu.is-opened .burger { transition: ease .3s; background-color: #88C657; }
    .hamburger-menu.is-opened .burger:nth-child(1) { transform: rotate(45deg); top: 4px; }
    .hamburger-menu.is-opened .burger:nth-child(2) { display: none; }
    .hamburger-menu.is-opened .burger:nth-child(3) { transform: rotate(-45deg); top: -4px; }
</style>
