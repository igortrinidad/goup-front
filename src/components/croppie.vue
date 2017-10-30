<template>

    <div class="modal-wp-wrapper" v-if="isvisible">
        <div class="wp-overlay"></div>
        <div class="row">
            <div class="col-md-12 col-xs-12 ">

                <div class="modal-wp" v-show="isvisible">
                    <div class="modal-wp-dialog">

                        <div class="modal-wp-header">
                            <h2 class="modal-title" id="modalLabel">Imagem <br>
                                <small class="muted">Recorte a imagem a ser gravada.</small>
                                <button type="button" class="close" @click="close()" aria-label="Close">
                                    <span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
                                </button>
                            </h2>
                        </div>
                        <div class="modal-wp-body">

                            <div id="upload-box" class="upload-box" v-if="inputActive">
                                <a class="btn btn-primary waves-effect file-btn btn-lg">
                                    Selecione um arquivo
                                    <input type="file" value="Select a file" accept="image/*"
                                           @change="loadFile($event)"/>
                                </a>
                            </div>

                            <div id="tool-bar" class="tool-bar" v-if="!inputActive">
                                <form class="row">

                                    <div class="col-md-4 col-md-offset-4">
                                        <label>Rotação</label>
                                        <div class="form-group">
                                            <button
                                                class="rotate btn btn-primary btn-block-50"
                                                @click.prevent="rotate(-90)">
                                                <i class="fa fa fa-undo fa-lg"></i>
                                            </button>
                                            <button
                                                class="rotate btn btn-primary btn-block-50" @click.prevent="rotate(90)">
                                                <i class="fa fa-repeat fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div id="croppie-container"></div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="close()">Cancelar</button>
                            <button class="btn btn-primary" @click="removeCroppie()">Alterar foto</button>
                            <button class="btn btn-success" @click.prevent="croppieImage()">Salvar</button>
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

            //Largura da janela de corte
            viewportWidth: {
                default: 400
            },

            //Altura da janela de corte
            viewportHeight: {
                default: 400
            },

            isvisible: {
                required: true,
                twoWay: true
            },

        },

        data(){
            return {
                boundaryWidth: 0,
                boundaryHeight: 0,
                inputActive: true,
                target: {}
            }
        },

        mounted(){
            let that = this

            that.boundaryWidth = parseInt(that.viewportWidth) + 100
            that.boundaryHeight = parseInt(that.viewportHeight) + 100

            that.checkWidth()

        },
        methods: {

            checkWidth () {
                let that = this

                let maxWidth = window.innerWidth - 100;

                if (maxWidth <= that.viewportWidth) {
                    that.viewportWidth = maxWidth;
                    that.viewportHeight = maxWidth;
                    that.boundaryWidth = maxWidth + 20;
                    that.boundaryHeight = maxWidth + 20;

                }

            },
            rotate(deg) {
                $croppieContainer.croppie('rotate', deg);
            },

            loadFile(event) {
                let that = this

                that.readFile(event.target, that.viewportWidth, that.boundaryWidth);

                that.inputActive = false

                that.target = event.target;

                setTimeout(function () {
                    that.setHeightWidthCroppie(that.viewportWidth, that.viewportHeight, that.boundaryWidth, that.boundaryHeight);
                }, 200);

            },

            croppieImage() {

                var that = this

                $('#croppie-container').croppie(
                    'result', {
                        type: 'canvas',
                        size: 'viewport',
                        format: 'jpeg'
                    }).then(function (resp) {

                    that.inputActive = true
                    $('#croppie-modal').modal('hide')

                    //Croped file
                    var croppedFile = {
                        id: UUID.create().toString(), //create a temporary uuid to trait this file
                        photo_url: resp,
                        sending: true,
                        error: false,
                        file: that.dataURItoFile(resp), //gets the coroped file
                        record_id: that.recordId
                    }

                    //Returns the croped file to the parent function
                    that.sendAction(croppedFile)

                    that.close()
                });
            },

            removeCroppie(){
                let that = this

                that.inputActive = true
                $('#croppie-container').croppie('destroy')
            },

            readFile(input, viewport_width, boundary_width) {

                let that = this

                if (input.files && input.files[0]) {

                    var reader = new FileReader();

                    reader.onload = function (e) {

                        $croppieContainer = $('#croppie-container').croppie({
                            enableOrientation: true,
                            enableExif: true,
                            mouseWheelZoom: false,
                            viewport: {
                                width: that.viewportWidth,
                                height: that.viewportHeight,
                                type: 'square'
                            },
                            boundary: {
                                width: that.boundaryWidth,
                                height: that.boundaryHeight
                            }
                        });


                        $('#croppie-container').croppie('bind', {
                            url: e.target.result
                        });

                    }

                    reader.readAsDataURL(input.files[0]);
                }
            },

            setHeightWidthCroppie(viewport_width, viewport_height, boundary_width, boundary_height){

                $('.cr-viewport').css({
                    'max-height': viewport_height + 'px'
                });

                $('.cr-boundary').css({
                    'max-height': boundary_height + 'px'
                });
            },

            dataURItoFile(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});

                return new File([blob], 'croped_image.png')
            },

            close(){
                let that = this

                that.$emit('close-cropie-modal', false)
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
