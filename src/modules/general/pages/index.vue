<template>
    <div class="main">
        <div class="container">

            <h1 class="title m-b-30">Buttons</h1>

            <button type="button" class="btn btn-block btn-default">Default</button>
            <button type="button" class="btn btn-block btn-primary">Primary</button>
            <button type="button" class="btn btn-block btn-success">Success</button>
            <button type="button" class="btn btn-block btn-info">Info</button>
            <button type="button" class="btn btn-block btn-warning">Warning</button>
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

            <h1 class="title m-b-30">Interact.js</h1>

            <div id="drag-1" class="draggable" ref="draggable">
                <p> You can drag one element </p>
            </div>

        </div>
    </div>
</template>

<script>
    import interact from 'interactjs'

    export default {
        name: 'landing',

        components: {
        },

        data () {
            return {
            }
        },

        computed: {

        },

        mounted(){
            this.draggable()
        },

        methods: {
            draggable() {
                // target elements with the "draggable" class
                interact(this.$refs.draggable)
                    .draggable({
                        // enable inertial throwing
                        inertia: true,
                        // keep the element within the area of it's parent
                        restrict: {
                            restriction: "parent",
                            endOnly: true,
                            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                        },
                        // enable autoScroll
                        autoScroll: true,
                        // call this function on every dragmove event
                        onmove: dragMoveListener,
                        // call this function on every dragend event
                        onend: function (event) {
                            var textEl = event.target.querySelector('p');

                            textEl && (textEl.textContent =
                                'moved a distance of '
                                + (Math.sqrt(event.dx * event.dx +
                                    event.dy * event.dy)|0) + 'px');
                        }
                    });

                function dragMoveListener (event) {
                    var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                    target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }

                // this is used later in the resizing and gesture demos
                window.dragMoveListener = dragMoveListener;
            }
        }
    }
</script>

<style scoped>
    #drag-1{
        width: 100%;
        height: 100%;

        background-color: #29e;
        color: white;

        border-radius: 0.75em;
        padding: 4%;

        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
    }

    #drag-me::before {
        content: "#" attr(id);
        font-weight: bold;
    }
</style>
