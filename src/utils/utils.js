export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const parseCurrency = (value) => {
    if (!['string', 'number'].includes(typeof value)) return
    if (/[^$,.\d\-+]/.test(value)) return false

    const amount = parseFloat((value.toString()).replace(/[$,]/g, '')).toFixed(2)

    if (typeof amount === 'string') {
        return amount
    } else {
        return false
    }
}

export const prettyCurrency = (value, _symbol = 'R$') => {
    let parsed = parseFloat(value)
    let leader = ''
    if (parsed < 0) leader = '-'
    parsed = Math.abs(parsed)
    const number_string = parseCurrency(parsed)
    const symbol = _symbol || ''
    return `${ leader } ${ symbol } ${ number_string.replace(/(\d)(?=(\d{3})+\.)/g, '$1.') }`
}
