<template>
    <div class="main" ref="draggable">
        <h1 class="title m-t-30 m-b-30">{{ company.name }}</h1>
        <div
            class="picture-circle picture-circle-xl bordered-primary"
            :style="{ backgroundImage: `url(${ company.avatar  })`}"
        >
        </div>

        <router-link
            type="button"
            class="btn btn-primary"
            :to="{ name: 'general.auth.login' }"
            exact
        >
        Login
        </router-link>
    </div>
</template>

<script>
    import interact from 'interactjs'

    import CompanyModel from '@/models/Company'

    export default {
        name: 'landing',

        components: {
        },

        data () {
            return {
                placeholder: true,
                company: {}
            }
        },

        computed: {

        },

        mounted(){
            this.nextCompany()
            this.draggable()
        },

        methods: {
            nextCompany() {
                this.company = CompanyModel
            },

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

                    console.log(event);
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
    .main {
        border: 1px solid red
    }

</style>
