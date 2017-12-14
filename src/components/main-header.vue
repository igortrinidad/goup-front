<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">

                <!-- Header Type === Back -->
                <div v-if="type === 'back'">

                    <div class="row">
                        <div class="col-md-3 col-xs-3 text-left">
                            <img
                                v-if="title !== 'settings'"
                                class="icon-header"
                                :class="{'bounce' : interactions.bounce == 'back' }"
                                src="../assets/icons/header/left-arrow.svg"
                                @click="back()"
                                style="left: 0"
                            >
                        </div>

                        <div class="col-md-6 col-xs-6 text-center">
                            <div class="f-success f-16 m-t-30">
                                {{ title }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Header Type === Back -->

                <!-- Header Type === Main -->
                <div v-if="type === 'main'">

                    <div class="row">

                        <div class="col-md-3 col-xs-3 text-left">
                            <!-- LEFT -->
                            <div>
                                <img
                                    v-if="title !== 'settings'"
                                    class="icon-header"
                                    :class="{'bounce' : interactions.bounce == 'profile' }"
                                    src="../assets/icons/header/profile_white.svg"
                                    @click="redirectTo('general.user.settings', 'profile')"
                                >
                                <img
                                    v-if="title === 'settings'"
                                    class="icon-header"
                                    :class="{'bounce' : interactions.bounce == 'profile' }"
                                    src="../assets/icons/header/profile_pink.svg"
                                    @click="redirectTo('general.user.settings', 'profile')"
                                >
                            </div>
                            <!-- / LEFT -->

                        </div>

                        <div class="col-md-6 col-xs-6 text-center">
                            <!-- CENTER -->
                            <div>
                                <div class="" @click="redirectTo('general.explorer', 'explorer')" :class="{'bounce' : interactions.bounce == 'explorer'}">
                                    <img
                                        class="icon-header icon-header-lg"
                                        v-if="title === 'home' && !categorySelected"
                                        src="../assets/icons/header/hand_pink.svg"
                                    >
                                    <img
                                        class="icon-header icon-header-lg"
                                        v-if="title !== 'home' && !categorySelected"
                                        src="../assets/icons/header/hand_white.svg"
                                    >
                                    <img
                                        class="icon-header icon-header-lg"
                                        v-if="categorySelected"
                                        :src="categorySelected.photo_url"
                                    >
                                </div>
                            </div>
                            <!-- / CENTER -->
                        </div>

                        <div class="col-md-3 col-xs-3 text-right">
                            <!-- RIGHT -->
                            <div @click="redirectTo('general.events.list', 'ranking')" >
                                <img
                                    v-if="title !== 'ranking' && !rankingCategorySelected"
                                    class="icon-header"
                                    :class="{'bounce' : interactions.bounce == 'ranking' }"
                                    src="../assets/icons/header/star_white.svg"
                                >
                                <img
                                    v-if="title === 'ranking' && !rankingCategorySelected"
                                    class="icon-header"
                                    :class="{'bounce' : interactions.bounce == 'ranking' }"
                                    src="../assets/icons/header/star_pink.svg"
                                >
                                <img
                                    class="icon-header"
                                    :class="{'bounce' : interactions.bounce == 'ranking' }"
                                    v-if="rankingCategorySelected"
                                    :src="rankingCategorySelected.photo_url"
                                >
                            </div>
                            <!-- / RIGHT -->
                        </div>

                    </div>


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

    .main{
        -webkit-backface-visibility: hidden;
    }

    .icon-header{
        margin: 22px 1px;
        width: auto;
        height: 35px;
        cursor: pointer;
    }

    .icon-header-lg{
        margin: 15px 1px;
        width: auto;
        height: 50px;
        cursor: pointer;
    }

    .left-icon{
        left: 10px;
    }

    .right-icon{
        right: 10px;
    }

    .navbar {
        margin-bottom: 0;
        background-color: #561F9F;
        box-shadow: 0px 3px 12px -2px rgba(0,0,0,0.36);
        z-index: 20 !important;
    }

    .container-fluid{
        position: relative;
        height: 80px;
    }

</style>
