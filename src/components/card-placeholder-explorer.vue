<template lang="html">
    <div class="col-sm-12">
        <div class="row">
            <div class="card m-0">
                <!-- Card Header -->
                <div class="effect text-placeholder" style="width: 100%; height: 200px;"></div>
                <!-- / Card Header -->

                <!-- Card Body -->
                <div class="card-body card-padding">
                    <div class="effect text-placeholder" style="width: 100%; height: 25px;"></div>
                    <div style="opacity: .8;">
                        <div class="effect text-placeholder" style="width: 100%; height: 15px;"></div>
                    </div>
                </div>
                <!-- Card Footer -->
                <div class="card-footer p-10">
                    <div class="row">
                        <div class="col-xs-8" style="opacity: .8;">
                            <small>
                                <div class="effect text-placeholder" style="width: 15%; height: 15px;"></div>
                            </small>
                        </div>
                        <div class="col-xs-4 text-right">
                            <small class="f-primary">
                                <div class="effect text-placeholder" style="width: 100%; height: 15px;"></div>
                            </small>
                        </div>
                    </div>
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
    background-color: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
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
