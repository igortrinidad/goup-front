<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">

                <!-- Header Type === Back -->
                <div v-if="type === 'back'">
                    <button
                        type="button"
                        class="circle-profile left active back bounce-effect"
                        @click="back()"
                    >
                        <i class="ion-ios-arrow-back"></i>
                    </button>
                    <div class="logo full text-center">
                        {{ title }}
                    </div>
                </div>
                <!-- Header Type === Back -->

                <!-- Header Type === Main -->
                <div v-if="type === 'main'">
                    <!-- LEFT -->
                    <router-link
                        tag="button"
                        class="bounce-effect circle-profile left"
                        :to="{ name: 'general.user.settings' }"
                        :class="{'active': title === 'settings' }"
                    >
                        <i class="ion-person"></i>
                        <span class="button-layer-left"></span>
                    </router-link>
                    <!-- / LEFT -->

                    <!-- CENTER -->
                    <div>
                        <router-link tag="div" class="logo cursor-pointer bounce-effect" to="/explorer" >
                            <img v-if="title === 'home'" src="../assets/logos/LOGOS-07.png" alt="" style="width: 100%">
                            <img v-if="title !== 'home'" src="../assets/logos/LOGOS-08.png" alt="" style="width: 100%">
                            <span class="button-layer"  @click="refreshExplorer()"></span>
                        </router-link>
                    </div>
                    <!-- / CENTER -->

                    <!-- RIGHT -->
                    <router-link
                        tag="button"
                        class="circle-profile right bounce-effect"
                        :to="{ name: 'general.events.list' }"
                        :class="{'active': title === 'ranking' }"
                    >
                        <i class="ion-podium"></i>
                        <span class="button-layer-right"></span>
                    </router-link>
                    <!-- / RIGHT -->
                </div>
                <!-- / Header Type === Main -->
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
            back: function(){
                window.history.back()
            },

            refreshExplorer: function(){
                bus.$emit('refresh_explorer');
            },

        }
    }
</script>

<style scoped>

    .button-layer{
        display: block;
        width: 80px;
        height: 70px;
        left: 10px;
        top: -70px;
        position: relative;
        cursor: pointer;
        opacity: 0;
    }


    .button-layer-left{
        display: block;
        width: 70px;
        height: 70px;
        left: -10px;
        top: -20px;
        position: absolute;
        cursor: pointer;
        opacity: 0;
    }


    .button-layer-right{
        display: block;
        width: 70px;
        height: 70px;
        left: -30px;
        top: -20px;
        position: absolute;
        cursor: pointer;
        opacity: 0;
    }

    .navbar {
        margin-bottom: 0;
        background-color: #561F9F;
        box-shadow: 0px 3px 12px -2px rgba(0,0,0,0.36);
        z-index: 20 !important;
    }

    .container-fluid { position: relative; }

    .logo {
        width: 120px; margin: 0 auto; padding: 7px 10px 5px 10px;
    }

    .logo.full { width: 100%; padding: 32px 50px; }
    .circle-profile {
        position: absolute;
        top: 55%;
        margin-top: -22px;
        background-color: transparent;
        border: 0;
        color: rgba(255, 255, 255, .8);
        width: 40px; height: 40px;
        border-radius: 50%;
        background: transparent;
        font-size: 22px;
        display: flex;
        align-items: center;
        padding: 0;
        border: 2px solid rgba(255, 255, 255, .8);
    }

    .circle-profile.left { left: 10px; }
    .circle-profile.right { right: 10px; }

    .circle-profile.active {
        color: rgba(236, 63, 129, .8);
        border-color: rgba(236, 63, 129, .8);
    }

    .circle-profile i{
        display: block;
        width: 100%;
        text-align: center;
    }

    .container-fluid{
        height: 80px;
    }
</style>
