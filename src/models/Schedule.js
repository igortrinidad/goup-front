import {cleanClientModel} from './Client'
import {cleanProfessionalModel} from './Professional'

export function cleanSchedule() {
	return {
		id: '',
		company_id: '',
		professional_id: '',
		invoice_id: '',
		subscription_id: '',
		date: '',
		time: '',
		points_earned: 0,//default 0
		confirmed_at: '',
		confirmed_by: '',
		reschedule_by: '',
		reschedule_at: '',
		created_at: '',
		updated_at: '',

		//Relats
		invoice: {
			subscription: {
				plan: {
					name: '',
				},
				client: cleanClientModel()
			}
		},
		professional: cleanProfessionalModel()
	}
}
