<template>

    <div class="row">

        <div class="col-md-12 col-xs-12" :class="alignClass">
            <div class="wp-rating-div">
                <span
                    class="wp-star-rating"
                    v-for="(rating, $index) in ratings"
                    @click.prevent="set(rating)"
                    :disabled="disabled"
                    :style="{color: colorOfIcon}"
                >
                    <i :class="[classOfIcon, classObject, {'icon-gray': handleStarClass(value, $index+1).outline, 'ion-ios-star-half': handleStarClass(value, $index+1).halfstar}]"></i>
                </span>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        props: {
            value: Number,
            max: Number,
            size: {
                default: 0
            },
            alignClass: {
                default: 'text-center'
            },
            disabled: {
                default: true
            },
            classOfIcon: {
                default: 'ion-ios-star'
            },
            colorOfIcon: {
                default: '#ffff00',
            }
        },

        computed: {

            ratings: function () {

                if (!this.max) {
                    return [1, 2, 3, 4, 5];
                }

                var numberArray = [];

                for (var i = 1; this.max >= i; i++) {
                    numberArray.push(i);
                }
                return numberArray;
            },

            classObject: function () {
                return {
                    'fa-lg': this.size == 2,
                    'fa-2x': this.size == 3,
                    'fa-3x': this.size == 4,
                    'fa-4x': this.size == 4,
                    'fa-5x': this.size == 5
                }
            }

        },

        data: function () {
            return {}
        },

        methods: {

            set: function (value) {

                if (this.disabled) {
                    return false
                }
                ;

                this.$emit('rating-changed', value)
            },

            handleStarClass(value, $index) {

                let outline = false
                let halfstar = false

                //empty star
                if (value < $index) {
                    outline = true
                }
                //handle with half star
                if (value >= ( $index - 0.50) && value <= ($index - 0.10)) {
                    halfstar = true
                }

                //a star can have only one class
                if (outline && halfstar) {
                    outline = false
                }

                return {outline, halfstar}
            }
        }


    }

</script>

<style scoped>

    .action-rating-button {
        display: block;
        height: 20px;
    }

    .wp-rating-div {
        width: 100%;
    }

    .icon-gray{
        color: #CBC3C6;
    }

    .wp-star-rating {
        display: inline-block;
        font-size: 25px;
        margin: -5px 5px 0px 0px;
        z-index: 2;
        transition: color .2s ease-out;
    }


    .wp-star-rating:hover:not([disabled]) {
        color: #75C258;
        transition: color .2s ease-out;
        z-index: 3;
        cursor: pointer;
    }


</style>
