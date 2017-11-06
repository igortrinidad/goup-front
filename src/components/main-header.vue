<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">

                <!-- Header Type === Back -->
                <div v-if="type === 'back'">
                    <button
                        type="button"
                        class="circle-profile left active back"
                        @click="back()"
                    >
                        <i class="ion-ios-arrow-back"></i>
                    </button>
                    <div class="logo full">
                        {{ title }}
                    </div>
                </div>
                <!-- Header Type === Back -->

                <!-- Header Type === Main -->
                <div v-if="type === 'main'">
                    <!-- Settings & Profile -->
                    <router-link
                        tag="button"
                        :to="{ name: 'general.user.settings' }"
                        :class="{ 'circle-profile left': true, 'active': title === 'settings' }"
                    >
                        <i class="ion-person"></i>
                    </router-link>
                    <!-- / Settings & Profile -->

                    <!-- Logo -->
                    <div>
                        <router-link tag="div" class="logo" to="/">
                            <img v-if="title === 'home'" src="../assets/logos/LOGOS-06.png" alt="" style="width: 100%">
                            <img v-if="title !== 'home'" src="../assets/logos/LOGOS-07.png" alt="" style="width: 100%">
                        </router-link>
                    </div>
                    <!-- / Logo -->

                    <!-- Search -->
                    <router-link
                        tag="button"
                        :to="{ name: 'general.search' }"
                        :class="{ 'circle-profile right': true, 'active': title === 'search' }"
                    >
                        <i class="ion-search"></i>
                    </router-link>
                    <!-- / Search -->
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

        }
    }
</script>

<style scoped>
    .navbar { margin-bottom: 0; }

    .container-fluid { position: relative; }

    .logo {
        width: 120px; margin: 0 auto; padding: 7px 10px 5px 10px;
    }

    .logo.full { width: 100%; padding-left: 50px; padding-top: 20px; }
    .circle-profile {
        position: absolute;
        top: 50%;
        margin-top: -22px;
        background-color: transparent;
        border: 0;
        color: rgba(255, 255, 255, .8);
        width: 40px; height: 40px;
        border-radius: 50%;
        background: transparent;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 2px solid rgba(255, 255, 255, .8);
    }

    .circle-profile.left { left: 10px; }
    .circle-profile.right { right: 10px; }

    .circle-profile.left.back{ top: 10px; margin: 0 }


    .circle-profile.active {
        color: rgba(236, 63, 129, .8);
        border-color: rgba(236, 63, 129, .8);
    }
</style>
