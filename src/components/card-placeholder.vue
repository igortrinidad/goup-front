<template lang="html">
    <div class="col-sm-12">
        <div class="card card-placeholder p-0">
            <div class="card-body">
                <div class="effect text-placeholder" style="width: 100%; height: 200px;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card-placeholder',
    components: {},
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
.d-block { width: 70%; margin: 0 auto; }
/* Card Placeholder */
.card-placeholder {
    height: 100%;
    overflow: hidden !important;
}

.full { width: 100% !important; }

.effect {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background-color: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0
    }
    100% {
        background-position: 468px 0
    }
}

.text-placeholder {
    border-radius: 4px;
    position: relative;
    display: inline-block;
}

.t-overflow {
    text-overflow: clip !important;
}

.invisible {
    opacity: 0;
}


</style>
