const moment  = require('moment')
import store from '../store'

export function recurrencTypes() {
    return [
        {label_en: 'Daily', label_pt: 'Diário', value: 'daily'},
        {label_en: 'Weekly', label_pt: 'Semanal', value: 'weekly'},
        {label_en: 'Monthly', label_pt: 'Mensal', value: 'monthly'},
        {label_en: 'Date', label_pt: 'Data', value: 'date'}
    ]
}

export function weekdays() {
   moment.locale(store.getters.language)

    let weekDays = moment.weekdays(true)

    let result = []

    weekDays.map((dayName, dow) =>{
        result.push({value: dow, text: dayName})
    })

    return result
}

export function months() {
    moment.locale(store.getters.language)

    let months = moment.months()

    let result = []

    months.map((monthName, monthNumber) =>{
        result.push({value: monthNumber, text: monthName})
    })

    return result
}

export function monthWeeks() {
    return [
        {value: 1, label_pt: 'Primeira semana', label_en: 'First week'},
        {value: 2, label_pt: 'Segunda semana', label_en: 'Second week'},
        {value: 3, label_pt: 'Terceira semana', label_en: 'Third week'},
        {value: 4, label_pt: 'Quarta semana', label_en: 'Fourthy week'},
        {value: 5, label_pt: 'Quinta semana', label_en: 'Fifth week'},
    ]
}


