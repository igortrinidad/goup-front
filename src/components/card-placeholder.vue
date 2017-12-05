<template lang="html">
    <div class="col-sm-12">
        <div class="card card-placeholder p-0">
            <!-- Card Header -->
            <div class="card-header effect p-5" style="height: 150px">
            </div>
            <!-- Card Body -->
            <div class="card-body card-padding">
                <div class="m-b-5">
                    <h4 class="text-placeholder effect">
                        <span class="invisible">{{ title }}</span>
                    </h4>
                </div>

                <div class="effect text-placeholder" style="width: 100%; height: 50px;">
                </div>

            </div>
            <!-- Card Footer -->
            <div class="card-footer p-10">
                <span class="text-placeholder effect">
                    <span class="invisible">placeholder</span>
                </span>
                <span class="text-placeholder effect pull-right">
                    <span class="invisible">placeholder</span>
                </span>
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
            title: 'GoUp Placeholder'
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
