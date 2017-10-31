<template lang="html">
    <div :class="{ 'form-group': true, 'has-error': interactions.hasError && validate }">
        <label v-show="label">
            {{ label }}
            <small v-show="validate">(obrigatório)</small>
        </label>
        <div style="position: relative">
            <span class="currency">R$</span>
            <input
                v-model="inputValue"
                class="form-control currency-padding"
                type="tel"
                @input="input()"
                @blur="fieldBlurred()"
                :placeholder="placeholder"
            >
        </div>
        <small class="f-300 f-danger" v-show="interactions.hasError && validate">
            Campo {{ label ? `${ label } obrigatório` : 'obrigatório' }}
        </small>
    </div>
</template>

<script>
    import accounting from 'accounting'
    import * as utils from '@/utils/utils'

    export default {
        name: 'currency',
        props: {
            label: {
                type: String,
                require: false
            },
            placeholder: {
                type: String,
                default: '0.00'
            },
            validate: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                inputValue: this.value > 0 ? this.value : 0,
                interactions: {
                    hasError: false
                }
            }
        },

        mounted() {
            this.input()
        },

        methods: {

            input() {
                this.inputValue = accounting.unformat(this.inputValue)
                this.inputValue = (this.inputValue / 100).toFixed(2);
                this.$emit('input', this.inputValue)
            },

            fieldBlurred() {
                if (this.inputValue && this.inputValue !== '0.00') {
                    this.interactions.hasError = false
                }
                if (!this.inputValue || this.inputValue === '0.00') {
                    this.interactions.hasError = true
                }
            },
        }
    }
</script>

<style scoped>
    .currency-padding { padding-left: 30px; }
    .currency {
        position: absolute;
        top: 50%; left: 15px;
        font-weight: 300;
        font-size: 12px;
        height: 17px;
        margin-top: -8.5px;
    }
</style>
