<template lang="html">
    <div class="first-container">
        <span>plans</span>
    </div>
</template>

<script>
export default {
    name: 'plans',
    components: {
    },

    data() {
        return {
        }
    },

    computed: {
    },

    methods: {
    }
}
</script>

<style scoped>

    .first-container{
        background-color: #F2F2F2;
    }

    /* Slick Settings */
    .slick {
        margin-left: -15px;
        margin-right: -15px;
    }
    .slick-item {
        float: left;
        padding: 0 5px;
        position: relative;
        position: relative;
    }

    .slick-container{
        margin-top: 50px;
    }

    .slick-item:focus {
        outline: none;
    }
    /* Plans */

    .plan {
        background-color: rgba(255, 255, 255, 1);
        height: auto;
        width: 100%;
        position: relative;
        padding: 15px 0;
    }

    .plan .title {
        padding: 15px 10px 10px 10px;
        font-size: 22px;
        font-weight: 700;
    }

    .plan .title.price {
        display: inline-block;
        font-weight: 500;
        background: #7bccc6;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 18px !important;
        color: #4A5464;
        margin-top: 5px;
    }

    .plan-items .item {
        display: block;
        width: 100%;
        padding: 6px 10px;
    }

    .item span {
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 40px;
    }
    .item i{
        margin-right: 15px;
    }
    .item span i.success { color: #82CB7D }
    .item span i.danger { color: #ED7461}

    @media(max-width: 768px) {
        .plan-items .item { font-size: 12px; }
    }

</style>
