const UUID = require('uuid-js')

export default {
	company_id: '',
    id: UUID.create().toString(),
	name: 'Plano de aulas',
	label: 'aula', // sessao / aula / consulta
	description: '',
	value: 0,
    limit_quantity: true,
	quantity: 8,
	expiration: 2,//months
	is_starred: true,
	is_active: true,
}

export function cleanPlanModel(){
    return {
        id: UUID.create().toString(),
        company_id: '',
        category_id: '',
        name: 'Plano',
        label: 'aula', // sessao / aula / consulta
        description: '',
        value: 0,
        limit_quantity: false,
        quantity: 8,
        expiration: 2,//months
        is_starred: true,
        is_active: true,
    }
}
