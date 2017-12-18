<template lang="html">
    <div id="modal-loader" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Title</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'modal-loader',
        data() {
            return {

            }
        },

        computed: {

        },

        mounted() {
            $('#modal-loader').modal('show')
        },

        methods: {

        }
    }
</script>

<style lang="css">
</style>
