import { Validator } from 'vee-validate';
var accounting = require('accounting')

Validator.extend('currency', {
    getMessage: field => '',
    validate: value => {
        var value = accounting.unformat(value)
        return value > 0;
    }
});