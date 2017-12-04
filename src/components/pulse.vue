<template lang="html">
    <div class="text-center">
        <span class="pulse">
            <i :class="icon"></i>
        </span>

        <p class="pulse-msg f-14 f-300">{{ msg }}</p>
    </div>
</template>

<script>
    export default {
        name: 'pulse',
        props: {
            icon: {
                type: String,
                required: true
            },
            msg: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .pulse {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 40px;
        width: 60px; height: 60px;
        cursor: pointer;
        animation: pulse 2s infinite;
        position: absolute;
        left: calc(50% - 30px);
        top: calc(50% - 30px);
        margin-top: -20px;
        padding: 0;
    }

    .pulse i {
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
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
        color: rgba(255, 255, 255, 0.4);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0);
      }
    }
</style>
