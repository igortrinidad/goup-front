export function cleanInvoice(){
	return {
		id: '',
       	company_id: '',
       	subscription_id: '',
       	value: '',
       	expire_at: '',
       	is_confirmed: false,
       	confirmed_at: '',
       	is_canceled: false,
       	canceled_at: '',
       	history: [],
       	created_at: '',
       	updated_at: '',

       	//RELATS
       	schedules: [],
	}
}
