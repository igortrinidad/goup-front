<template lang="html">
    <div id="modal-loader" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Title</h3>
          </div>
          <div class="modal-body">
            <span class="pulse">
                Loading...
            </span>
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
            ...mapGetters(['loader', 'language']),
        },

        mounted() {
            $('#modal-loader').modal('show')
        },

        methods: {

        }
    }
</script>

<style scoped>

.modal-body {
    height: calc(100% - 50px);
    border: 1px solid red;
}

.pulse {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 40px;
    width: 100px; height: 100px;
    font-size: 14px;
    cursor: pointer;
    animation: pulse 2s infinite;
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% + 50px);
    margin-top: -20px;
    padding: 0;
}

.pulse .ion-navigate {
    position: relative;
    left: -3px; top: 2px;
}

.pulse-msg {
    position: absolute;
    width: 100%;
    top: calc(50% + 30px);
    left: 0; right: 0;
}

/* Animate */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(86, 31, 159, 0.5);
    color: rgba(86, 31, 159, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(86, 31, 159, 0);
    color: rgba(86, 31, 159, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(86, 31, 159, 0);
    color: rgba(86, 31, 159, 0);
  }
}

</style>
