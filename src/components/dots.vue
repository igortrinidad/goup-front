<template lang="html">
    <svg width="260" height="150" viewBox="0 0 260 150">
        <!-- First -->
        <circle
            r="7"
            cy="80"
            cx="50"
            id="circle1"
            style="opacity:1;fill:#29F39F;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        <!-- Second -->
        <circle
            r="7"
            cy="80"
            cx="80"
            id="circle2"
            style="opacity:1;fill:#8BF3FB;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        <!-- Third -->
        <circle
            r="7"
            cy="80"
            cx="110"
            id="circle3"
            style="opacity:1;fill:#FF4B89;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        <!-- Fourth -->
        <circle
            r="7"
            cy="80"
            cx="140"
            id="circle4"
            style="opacity:1;fill:#FF4B89;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        <!-- Fifth -->
        <circle
            r="7"
            cy="80"
            cx="170"
            id="circle5"
            style="opacity:1;fill:#8BF3FB;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
        <!-- Sixth -->
        <circle
            r="7"
            cy="80"
            cx="200"
            id="circle6"
            style="opacity:1;fill:#29F39F;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.13007832;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        />
    </svg>
</template>

<script>
    import { tween, svg, easing, valueTypes } from 'popmotion';

    const { color } = valueTypes

    console.log(easing);
    export default {
        name: 'dots',
        data() {
            return {
                colors: {
                    rotating: [ '#FF4B89', '#29F39F', '#8BF3FB' ],
                    center: [ 'rgb(255, 75, 137)', 'rgb(41, 243, 159)', 'rgb(139, 243, 251)' ],
                    others: [ '#FF4B89', '#29F39F', '#8BF3FB' ]
                },
                colorIndex: 0
            }
        },

        mounted() {
            this.animateDots()
        },

        methods: {
            animateDots() {
                let that = this

                setInterval(() => {

                    that.bounce('#circle3', 60)
                    that.bounce('#circle4', 100)

                    that.changeColors()

                    console.log(that.colorIndex);
                    if (that.colorIndex < 2) {
                        that.colorIndex++
                    } else {
                        that.colorIndex = 0
                    }

                }, 1500);
            },

            bounce(el, value) {
                let that = this

                const styler = svg(document.querySelector(el))

                tween({
                    from: 80,
                    to: value,
                    duration: 300,
                    ease: easing.backOut
                })
                .start({
                    update:(v) => {
                        styler.set({
                            cy: v
                        })
                    },
                    complete: function() {
                        tween({
                            from: value,
                            to: 80,
                            duration: 300,
                        }).start(styler.set('cy'))
                    }
                })

            },

            changeColors() {
                let that = this
                const styler = svg(document.querySelector('#circle3'))

                setTimeout(function () {
                    tween({
                        from: '#9B65DE',
                        to: '#14D790',
                        duration: 300
                    }).start(styler.set('fill'))

                }, 300);
            },

            rotate(el) {
            }
        }
    }
</script>

<style scoped>

</style>
