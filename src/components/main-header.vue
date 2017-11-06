<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <button type="button" class="circle-profile">
                    <i class="fa fa-user-circle"></i>
                </button>

                <div v-if="type === 'logo'">
                    <router-link tag="div" class="logo" to="/">
                        <img v-if="type === 'logo'" src="../assets/logos/LOGOS-06.png" alt="" style="width: 100%">
                        <img v-if="type !== 'logo'" src="../assets/logos/LOGOS-07.png" alt="" style="width: 100%">
                    </router-link>
                </div>

                <div v-if="type === 'left'" @click="action()">
                    <div class="title-header-left" :class="{'cursor-pointer': cursor}">
                        <i class="fa fa-chevron-left m-r-10"></i>
                        <h1 class="title-prop m-0">{{ title }}</h1>
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
    .navbar { margin-bottom: 0; }
    .container-fluid { position: relative; }
    .logo {
        width: 120px; margin: 0 auto; padding: 7px 10px 5px 10px;
    }

    .circle-profile {
        position: absolute;
        top: 50%;
        left: 10px;
        margin-top: -22px;
        background-color: transparent;
        border: 0;
        font-size: 30px;
        color: rgba(255, 255, 255, .8);

    }
</style>
