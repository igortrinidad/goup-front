<template>

    <div class="row" v-on:mouseover="toggleEdit('on')" v-on:mouseout="toggleEdit('out')">

        <div class="col-md-12 col-xs-12 text-center">
            <div class="wp-rating-div">

                <span 
                    class="wp-star-rating"
                    v-for="(rating, $index) in ratings"
                    @click.prevent="set(rating)"
                    :class="{'wp-start-selected' : value >= $index+1, 'wp-star-rating-hover' : !disabled}"
                >
                    <i class="fa fa-star" :class="{
                        'fa-lg': size == 2,
                        'fa-2x': size == 3,
                        'fa-3x': size == 4,
                        'fa-4x': size == 4,
                        'fa-5x': size == 5,
                        }"></i>
                </span>
            </div>
            
        </div>

        <div class="col-md-12 col-xs-12 text-right action-rating-button" >
            <span v-show="editable">
                <a  v-show="showEdit && !inEdit" @click="toggle('toggle')">Editar</a>

                <div v-show="inEdit">
                    <a @click="save()">Salvar</a>
                    <a  class="cancel" @click="toggle('cancel')">Cancelar</a>
                </div>
            </span>
        </div>


        
    </div>


    

</template>

<script>

    var Vue = require('vue');

    export default {
        props: {
            value: Number,
            max: Number,
            disabled: Boolean,
            blocked: Boolean,
            inEdit: Boolean,
            editable: {
                type: Boolean,
                default: function(){
                    return true
                }
            },
            onChange: {
                type: Function,
                default() {
                    return false
                }
            },
            size: {
                default: 0
            }
        },
        computed : {
          ratings : function(){
              
            if(!this.max) { 
                return [1, 2, 3, 4, 5]; 
            }

            var numberArray = [];

            for(var i = 1; this.max >= i; i++){
                numberArray.push(i);
            }
              return numberArray;
          }
        },
        data: function() {
            return {
                showEdit: false,
                oldValue: 5,
            }
        },
        methods: {

            save: function(){

                this.inEdit = false
                this.disabled = true

                if(this.onChange()){
                    this.onChange()
                }
                
            },
            toggle(action){
                var that = this
                this.inEdit = !this.inEdit;
                this.disabled = false
                

                if (this.inEdit) {

                    that.oldValue = that.value

                }
                if (action == 'cancel') {
                    that.value = that.oldValue
                    this.disabled = true

                }
            },
            toggleEdit(action){
                if(action == 'on' && !this.blocked){
                    this.showEdit = true
                }

                if(action == 'out'){
                    this.showEdit = false
                }

            },
            set: function (value) {
                if (this.disabled) {
                    return;
                }

                this.temp_value = value;
                this.value = value;
            }
        }

    }

</script>

<style scoped>

    .action-rating-button{
        display: block;
        height: 20px;
    }
    .wp-rating-div{
        width: 100%;
    }

    .wp-star-rating{
        display: inline-block;
        font-size: 25px;
        margin: 0px 5px 0px 0px;
        z-index: 2;
        transition: color .2s ease-out;
        color: #5D5E5E;
    }

    .wp-start-selected{
        color: #FAC232;
    }

    .wp-star-rating-hover:hover:not([disabled]){
        color: #30A6A9;
        transition: color .2s ease-out;
        z-index: 3;
        cursor: pointer;
    }

    a{
        cursor: pointer;
    }
    .cancel{
        color: #c4c4c4;
    }
    .cancel:hover{
        color: #198DE6;
    }

</style>