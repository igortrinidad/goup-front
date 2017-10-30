<template lang="html">
    <div class="">
        <div v-if="url">
            <div class="picture-circle" :style="`background-image:url('${ url }')`" :class="customClass"></div>
        </div>
        <div v-if="!url">
            <div :class="`avatar ${ size } ${ center ? 'center' : '' } no-img ${ theme }`">
                {{ handleInitialCharacters(firstName, lastName) }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'avatar',

    components: {
    },

    props: {
        size: { type: String, required: true },
        theme: { type: String, required: true },
        center: { type: Boolean, required: false },
        url: { type: String, required: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        customStyle: { type: String, required: false },
        customClass: { type: String, required: false }
    },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        handleInitialCharacters(firstName, lastName) {
            return `${ firstName.charAt(0)} ${lastName.charAt(0) }`
        }
    }
}
</script>

<style scoped>
    /* scoped styles */
</style>
