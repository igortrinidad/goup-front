<template>

    <div class="modal-wp-wrapper" v-if="isvisible">
        <div class="wp-overlay"></div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-xs-12 ">

                <div class="modal-wp" v-show="isvisible">
                    <div class="modal-wp-dialog">

                        <div class="modal-wp-header">
                            <h2 class="modal-title" id="modalLabel"><span class="f-primary">{{translations.title}}</span>
                                <button type="button" class="close" @click="close()" aria-label="Close">
                                    <span aria-hidden="true"><i class="ion-close"></i></span>
                                </button>
                            </h2>
                        </div>
                        <div class="modal-wp-body">

                            <div id="upload-box" class="upload-box">
                                <a class="btn btn-primary file-btn btn-lg">
                                    {{translations.buttons.filePick}}
                                    <input type="file" value="Select a file"
                                           @change="loadFile($event)"
                                           accept="image/*"
                                    />
                                </a>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" @click="close()">{{translations.buttons.cancel}}</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    var UUID = require('uuid-js');
    import * as translations from '@/translations/components/photo-uploader'
    import {mapGetters} from 'vuex'

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
        computed: {
            ...mapGetters(['language']),

            'translations': function() {
                const language = this.language

                if (language === 'en' || !language) {
                    return translations.en
                }
                if (language === 'pt') {
                    return translations.pt
                }
            }
        },

        mounted(){
            let that = this

        },
        methods: {

            loadFile(event) {
                let that = this

                let input = event.target
                let reader = new FileReader()

                let img = new Image();

                img.src = window.URL.createObjectURL( input.files[0] )

                img.onload = function () {
                    that.close()

                    //Prevent show image size warning on profile picture
                    if(that.$route.path === '/settings/edit-profile') {
                        that.sendAction({file: input.files[0]})
                        return true
                    }


                    if(this.width < 1400){

                        that.$swal({
                            title: that.translations.sizeWarning.title,
                            text:  that.translations.sizeWarning.message,
                            type: 'info',
                            showCancelButton: true,
                            confirmButtonText:  that.translations.sizeWarning.continue,
                            confirmButtonColor: '#583694',
                            cancelButtonText: that.translations.sizeWarning.cancel,
                            cancelButtonColor: '#48C3D1',
                            reverseButtons: true
                        }).then(function () {
                            that.sendAction({file: input.files[0]})
                        }).catch(function () {

                        })
                    }

                   if(this.width >= 1400){
                       that.sendAction({file: input.files[0]})
                   }
                };
            },

            close(){
                let that = this

                that.$emit('close-photo-uploader-modal', false)
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
