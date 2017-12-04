import accounting from 'accounting';
const moment = require('moment')
import Vue from 'vue'

export default function(){

	//Filters
Vue.filter('handleTrueFalse', function(value, vtrue = 'Sim', vfalse = 'Não'){
    if(value){
        return vtrue
    } else {
        return vfalse
    }
})

Vue.filter('limitChar', function(value, count, finish){
    if (value.length >= count && finish){
        return value.substring(0,count) + finish;
    } else {

         return value.substring(0,count)
    }
})


accounting.settings = {
    currency: {
        symbol : "$ ",   // default currency symbol is '$'
        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
        decimal : ",",  // decimal point separator
        thousand: ".",  // thousands separator
        precision : 2   // decimal places
    },
    number: {
        precision: 2,  // default precision on numbers is 0
        thousand: ".",
        decimal : ","
    }
}

Vue.filter('formatCurrency', function(value){
    return accounting.formatMoney(parseFloat(value))
})

Vue.filter('momentwp', function(value, format = 'DD/MM/YYYY HH:mm:ss'){
    return moment(value).format(format);
})

Vue.filter('momentwpfrom', function(value, from = 'YYYY-MM-DD', format = 'DD/MM/YYYY'){
    return moment(value, from).format(format);
})


Vue.filter('breakline', function(value){
    if (value){
        return value.replace(/\r?\n/g, '<br />');
    }
});

}
