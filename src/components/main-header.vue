<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">

                <!-- Header Type === Back -->
                <div v-if="type === 'back'">

                    <img 
                            v-if="title !== 'settings'"
                            class="left-icon"
                            :class="{'bounce' : interactions.bounce == 'back' }"
                            src="../assets/icons/header/left-arrow.svg"
                            @click="back()"
                        >
                    <div class="logo full text-center f-success f-18">
                        {{ title }}
                    </div>
                </div>
                <!-- Header Type === Back -->

                <!-- Header Type === Main -->
                <div v-if="type === 'main'">
                    <!-- LEFT -->
                    <div>

                        <img 
                            v-if="title !== 'settings'"
                            class="left-icon"
                            :class="{'bounce' : interactions.bounce == 'profile' }"
                            src="../assets/icons/header/profile_white.svg"
                            @click="redirectTo('general.user.settings', 'profile')"
                        >

                        <img 
                            v-if="title === 'settings'"
                            class="left-icon"
                            :class="{'bounce' : interactions.bounce == 'profile' }"
                            src="../assets/icons/header/profile_pink.svg"
                            @click="redirectTo('general.user.settings', 'profile')"
                        >

                    </div>
                    <!-- / LEFT -->

                    <!-- CENTER -->
                    <div>
                        <div class="logo cursor-pointer" @click="redirectTo('general.explorer', 'explorer')" :class="{'bounce' : interactions.bounce == 'explorer'}">
                            <img 
                                v-if="title === 'home' && !categorySelected" 
                                src="../assets/icons/header/hand_pink.svg" 
                                style="width: 90px; margin-top: -8px; margin-left: 5px;">
                            <img 
                                v-if="title !== 'home' && !categorySelected" 
                                src="../assets/icons/header/hand_white.svg" 
                                style="width: 90px; margin-top: -8px; margin-left: 5px;">

                            <img 
                                class="m-l-25 m-t-15 text-center" 
                                v-if="categorySelected" 
                                :src="categorySelected.photo_url" 
                                style="height: 50px">
                        </div>
                    </div>
                    <!-- / CENTER -->

                    <!-- RIGHT -->
                    <div @click="redirectTo('general.events.list', 'ranking')" >

                        <img 
                            v-if="title !== 'ranking' && !rankingCategorySelected"
                            class="right-icon"
                            :class="{'bounce' : interactions.bounce == 'ranking' }"
                            src="../assets/icons/header/star_white.svg"
                           
                        >

                        <img 
                            v-if="title === 'ranking' && !rankingCategorySelected"
                            class="right-icon"
                            :class="{'bounce' : interactions.bounce == 'ranking' }"
                            src="../assets/icons/header/star_pink.svg"
                        >

                        <img 
                            class="right-icon m-t-5" 
                            :class="{'bounce' : interactions.bounce == 'ranking' }"
                            v-if="rankingCategorySelected" 
                            :src="rankingCategorySelected.photo_url" 
                            style="height: 50px">
                    </div>
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
                interactions: {
                    bounce: null,
                },
                sideMenuStatus: false,
                categorySelected: null,
                rankingCategorySelected: null
            }
        },
        computed: {
        },

        mounted: function(){
            var that = this;

            bus.$on('close-menu', () => this.sideMenuStatus = false);

            bus.$on('category-selected', function(category){
                that.categorySelected = category;
                that.bounceImg('explorer');
            });
            bus.$on('category-cleaned', () => this.categorySelected = null);
            
            bus.$on('ranking-category-cleaned', () => this.rankingCategorySelected = null);

            bus.$on('ranking-category-selected', function(category){
                that.rankingCategorySelected = category;
                that.bounceImg('ranking');
            });

        },

        destroyed: function(){
            bus.$off('category-selected');
            bus.$off('ranking-category-selected');
            bus.$off('category-cleaned');
        },

        methods:{
            back: function(){
                this.bounceImg('back');
                window.history.back()
            },

            redirectTo: function(target, bounce){
                let that = this
                
                if(bounce == 'explorer'){
                    that.refreshExplorer();
                }

                if(bounce == 'ranking'){
                    that.refreshRanking();
                }

                that.bounceImg(bounce);
                setTimeout(function() {
                    that.$router.push({name: target});
                }, 100);
            },

            bounceImg: function(type){
                let that = this
            
                that.interactions.bounce = type;

                setTimeout(function() {
                    that.interactions.bounce = null;
                }, 400);
                
            },

            refreshExplorer: function(){
                this.categorySelected = null;
                bus.$emit('refresh_explorer');
            },

            refreshRanking: function(){
                this.rankingCategorySelected = null;
                bus.$emit('refresh-ranking');
            },

        }
    }
</script>

<style scoped>

    .left-icon{
        width: 65px;
        position: absolute;
        cursor: pointer;
        left: 4px;
        top: 10px;
    }

    .right-icon{
        width: 65px;
        position: absolute;
        right: 4px;
        top: 10px;
        cursor: pointer;
    }

    .active-header svg path, .active-header svg text{
        color: red !important;
    }


    .navbar {
        margin-bottom: 0;
        background-color: #561F9F;
        box-shadow: 0px 3px 12px -2px rgba(0,0,0,0.36);
        z-index: 20 !important;
    }

    .container-fluid { position: relative; }

    .logo {
        width: 120px; margin: 0px auto; padding: 0px 10px 5px 10px;
    }

    .logo.full { width: 100%; padding: 32px 50px; }

    .circle-profile {
        position: absolute;
        top: 55%;
        margin-top: -22px;
        color: rgba(255, 255, 255, .8);
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
