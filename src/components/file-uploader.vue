<template>

    <div class="modal-wp-wrapper" v-if="isvisible">
        <div class="wp-overlay"></div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-xs-12 ">

                <div class="modal-wp" v-show="isvisible">
                    <div class="modal-wp-dialog">

                        <div class="modal-wp-header">
                            <h2 class="modal-title" id="modalLabel">Enviar arquivo
                                <button type="button" class="close" @click="close()" aria-label="Close">
                                    <span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
                                </button>
                            </h2>
                        </div>
                        <div class="modal-wp-body">

                            <div id="upload-box" class="upload-box">
                                <a class="btn btn-primary waves-effect file-btn btn-lg">
                                    Selecione um arquivo
                                    <input type="file" value="Select a file"
                                           @change="loadFile($event)"
                                           accept=".xlsx,.xls,image/*,.doc, .docx.,.ppt,.pptx,.txt,.pdf"
                                    />
                                </a>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="close()">Cancelar</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    var $croppieContainer = require('croppie')
    var UUID = require('uuid-js');

    export default{
        props: {
            //Record id para enviar junto com o arquivo que retorna na função
            recordId: String,

            //Função que retorna o arquivo cortado
            sendAction: Function,

            isvisible: {
                required: true,
                twoWay: true
            },

        },

        data(){
            return {}
        },

        mounted(){
            let that = this

        },
        methods: {

            loadFile(event) {
                let that = this

                let input = event.target

                //Returns the file to the parent function
                that.sendAction(input.files[0])

                that.close()

            },

            close(){
                let that = this

                that.$emit('close-upload-modal', false)
            }
        }
    }

</script>

<style scoped>

    .file-btn {
        position: relative;
    }

    .file-btn input[type="file"] {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
    }

    input[type="file"] {
        cursor: pointer;
    }

    .upload-box {
        min-height: 300px;
        text-align: center;
    }

    .upload-box a {
        margin-top: 130px;
    }

    .btn-block-50 {
        width: 48%;
    }

    .croppie-modal {
        z-index: 10;
    }

</style>
