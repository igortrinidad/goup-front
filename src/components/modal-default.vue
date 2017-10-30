<template>
    <div class="modal" :id="modalId" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{ modalTitle }}</h4>
                </div>
                <div class="modal-body" :class="{ 'p-0': removePadding }">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer text-center" v-if="modalAction">
                    <button data-dismiss="modal" type="button" :class="`btn btn-${ modalAction.theme }`">{{ modalAction.name }}</button>
                </div>
                <div class="modal-footer text-center" v-if="!modalAction">
                    <slot name="footer"></slot>
                </div>
            </div>
            <button type="button" class="close-modal" data-dismiss="modal">
                <i class="ion-ios-close-outline"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'modal-default',
        props: {
            modalId: { type: String, required: true },
            modalTitle: { type: String, required: true },
            modalAction: { type: Object, required: false },
            removePadding: { type: Boolean, required: false }
        },
        components: {

        },
        data () {
            return {
            }
        },
        computed: {

        },
        mounted(){
        },
        methods: {
        }
    }
</script>

<style scoped>
    /* Scoped Styles */

    .modal {
        background-color: rgba(0, 0, 0, .9) !important;
        z-index: 99999;
    }

    .modal-title {
        text-align: center;
        font-weight: 300;
    }

    .modal-footer {
        text-align: center !important;
        background: #fff;
        border-radius: 0 0 4px 4px;
    }
    .modal-body{ background: #F4F5F5; }
    .modal-content {
        box-shadow: none;
        border: 0;
        border-radius: 4px;
    }

    .close-modal {
        background: transparent;
        color: #fff;
        border: 0;
        font-size: 40px;
        display: block;
        margin: 0 auto;
    }

</style>
