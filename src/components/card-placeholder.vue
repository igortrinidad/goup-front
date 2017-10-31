<template lang="html">
    <div class="row">
        <div :class="cols" v-for="n in loop">
            <div class="card card-placeholder">
                <!-- Placeholder para quando tem a imagem de perfil + titulo no header do card -->
                <!-- Usado nas empresas -->
                <div v-if="circleImage">
                    <div class="card-header ch-alt text-center">
                        <div class="picture-circle picture-circle-m effect"></div>
                        <h3 class="text-placeholder m-b-0 effect">
                            <span class="invisible">{{ title }}</span>
                        </h3>
                    </div>
                    <div class="card-body card-padding text-center" v-if="!onlyHeader">
                        <div class="m-t-15">
                            <div class="m-b-0 text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-15">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-15">
                            <div class="m-b-0 text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-15" v-if="!small">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-15" v-if="!small">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- / Placeholder para quando tem a imagem de perfil + titulo no header do card -->

                <!-- Placeholder para quando tem a imagem de perfil inteira no header -->
                <!-- Usado nas receitas e eventos -->
                <div v-if="headerFullImage">
                    <div class="card-header ch-alt effect" style="height: 150px">
                    </div>
                    <div class="card-body card-padding text-center">
                        <h3 class="text-placeholder m-t-5 effect">
                            <span class="invisible">{{ title }}</span>
                        </h3>

                        <div class="m-t-20">
                            <div class="m-b-0 text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-20">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-20">
                            <div class="m-b-0 text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-20">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                        <div class="m-t-20">
                            <div class="m-b-0 d-block text-placeholder effect">
                                <span class="invisible">placeholder</span>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- / Placeholder para quando tem a imagem de perfil inteira no header -->

                <!-- Placeholder para quando tem a imagem de perfil inteira no header -->
                <!-- Usado nas atividades com toggle -->
                <div v-if="onlyHeader && !circleImage">
                    <div class="card-header ch-alt" style="height: 96px">
                        <div class="row" v-if="!onlyHeaderNoImage">
                            <div class="col-xs-4 col-sm-4">
                                <div class="picture-circle picture-circle-p effect">
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8">
                                <h4 class="f-300 t-overflow m-0 m-b-5 text-placeholder effect">
                                    <span class="invisible">{{ title }}</span>
                                </h4>
                                <span class="t-overflow m-t-10 text-placeholder effect">
                                    <span class="invisible">Sexta-feira</span>
                                </span>
                            </div>
                        </div>

                        <!-- EXEPTION: USADO APENAS NOS CERTIFICADOS NO DASHBOARD DO PROFISSIONAL -->
                        <div v-if="onlyHeaderNoImage" class="text-center">
                            <h3 class="text-placeholder m-b-0 effect">
                                <span class="invisible">{{ title }}</span>
                            </h3>
                        </div>
                        <!-- / EXEPTION -->
                    </div>

                    <!-- EXEPTION: USADO APENAS NA AGENDA DA EMPRESA ONDE OS CARDS VEM COMO PADRÃO ABERTO -->
                    <div v-if="onlyHeaderOpened">
                        <div class="card-body card-padding">
                            <div class="m-t-15">
                                <div class="m-b-0 full d-block text-placeholder effect">
                                    <span class="invisible">placeholder</span>
                                </div>
                            </div>
                            <div class="m-t-15">
                                <div class="m-b-0 full d-block text-placeholder effect">
                                    <span class="invisible">placeholder</span>
                                </div>
                            </div>
                            <div class="m-t-15">
                                <div class="m-b-0 full d-block text-placeholder effect">
                                    <span class="invisible">placeholder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / EXEPTION -->

                </div>
                <!-- / Placeholder para quando tem a imagem de perfil inteira no header -->

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card-placeholder',
    components: {},
    props: {
        cols: {
            type: String,
            default: 'col-xs-12 col-sm-4'
        },
        loop: {
            type: Number,
            default: 1
        },
        circleImage: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        headerFullImage: {
            type: Boolean,
            default: false
        },
        onlyHeader: {
            type: Boolean,
            default: false
        },
        onlyHeaderOpened: {
            type: Boolean,
            default: false
        },
        onlyHeaderNoImage: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            title: 'Isaudavel Placeholder'
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

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0
    }
    100% {
        background-position: 468px 0
    }
}
</style>
