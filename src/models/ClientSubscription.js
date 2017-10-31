
import {cleanPlanModel} from './Plan'

export function cleanSubscription() {
	return {
		id: '',
		company_id: '',
		client_id: '',
		plan_id: '',
		quantity: 10,
		value: 400,
		start_at: '10/10/2017', // A subscription do cliente pode ter data inicial diferente da criação
		expire_at: '10/12/2017',
		auto_renew: false,
		is_active: true,
		workdays: [],
		created_at: '',
		updated_at: '',
		is_new: true,

		//RELATS
		plan: cleanPlanModel(),
		invoices: [],
	}
}