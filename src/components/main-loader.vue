<template lang="html">
    <div id="modal-loader" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          </div>
          <div class="modal-body">
            <span class="pulse">
                <i class="ion-load-a"></i>
            </span>

            <p class="pulse-msg f-14 f-300">
                {{ language === 'pt' ? 'Carregando' : 'Loading' }}
            </p>
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
}

.pulse {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 60px; height: 60px;
    font-size: 50px;
    cursor: pointer;
    animation: pulse 3s infinite;
    position: absolute;
    left: calc(50% - 30px);
    top: calc(50% - 50px);
    padding: 0;
}

.pulse i {
    position: relative;
    animation: rotate 1s infinite linear;
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

@keyframes rotate {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
}


</style>
