<template>
    <div class="first-container">

        <main-header
            :type="'logo'"
            :title="'Home'"
            :cursor="false"
            :action="function(){ return false}"
            :hasback="true"
        >
        </main-header>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'landing',
        components: {
            mainHeader,
        },
        data () {
            return {
                interactions: {
                    lat: 0,
                    lng: 0,
                },
                placeholder: {
                },
                inviteEmail: '',
                lastEvents: [],
                lastMealRecipes: [],
                lastArticles: []
            }
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
        },
        methods: {
            ...mapActions(['setLoading']),
        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    /* Swiper Arrows */
    .swiper-button-prev { left: 0px; }
    .swiper-button-next { right: -10px; }
    .swiper-button-prev,
    .swiper-button-next {
        background-image: none !important;
        font-size: 40px;
    }

    .swiper-slide.swiper-slide-active {
        transform: scale(1);
        transition: ease .3s;
    }
    .swiper-slide {
        transform: scale(.9);
        transition: ease .3s;
    }

    /* Search */
    .wrapper.search {
        width: 100%;
        min-height: 120px;
        background: #88C657;
        font-weight: 300;
        margin-top: -20px;
    }
    .wrapper.search .search-label { color: #fff; }

    .wrapper .form-control {
        border-width: 1px; border-right: 0;
        transition: none;
        font-weight: 300;
    }

    .wrapper .form-control:focus { border-right: 0; transition: none; }

    .wrapper .form-control:focus + .btn.btn-light { border-color: #383938; transition: none; }
    .wrapper .btn.btn-light {
        border-color: #dce4ec;
        border-width: 1px;
        border-left: 0 !important;
        transition: none;
        color: #8cc63f !important;
    }
    /* Rotate */
    .rotate { transform: rotate(180deg); }

    .card-picture-header {
        box-sizing: border-box;
        margin: 0 auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
        border: solid 1px #EBECEC;
    }
    /* Event Cats */
    .list-cats {
        height: 78px; width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
    }

    .recipe-info{
        width: 50%;
        box-sizing: border-box;
        float: left;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
    }

    .time-info{
        border-right: 1px solid #d8d8d8;
    }

</style>
