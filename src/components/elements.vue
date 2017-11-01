<template lang="html">
    <div class="">
        <h1 class="title m-b-30">Buttons</h1>

        <button type="button" class="btn btn-block btn-default">Default</button>
        <button type="button" class="btn btn-block btn-primary">Primary</button>
        <button type="button" class="btn btn-block btn-success">Success</button>
        <button type="button" class="btn btn-block btn-info">Info</button>
        <button type="button" class="btn btn-block btn-danger">Danger</button>

        <hr>

        <h1 class="title m-b-30">Card</h1>

        <div class="card">
            <div class="card-header ch-alt">
                <h2 class="title">Título do card</h2>
            </div>
            <div class="card-body card-padding">
                <p>
                    Some content to card
                </p>
            </div>
        </div>

        <hr>

        <h1 class="title m-b-30">Form</h1>

        <div class="form-group">
            <input type="text" class="form-control" placeholder="Qualquer valor">
        </div>

    </div>
</template>

<script>

    export default {
        name: 'ui-element',

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
</style>
