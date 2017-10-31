import ProfessionalModel from './Professional'
import ClientModel from './Client'

export default {
	//Uma restrição pode ser adicionada por um cliente ou por um profissional
	client_id: '',
	from_id: '',
	from_type: '',
	type: 'medication', // medication, food or exercise,
	restriction: 'Dipirona',
	observation: 'Alergia',
	created_at: '2017-10-10 09:09:09',
	updated_at: '2017-10-10 09:09:09',
	deleted_at: '',
	share_profile: false,

	from: ProfessionalModel,
}

export function cleanRestrictionModel(){
	return {
		client_id: '',
		from_id: '',
		from_type: '',
		type: '', // medication, food or exercise,
		restriction: '',
		observation: '',
		created_at: '2017-10-10 09:09:09',
		updated_at: '2017-10-10 09:09:09',
		deleted_at: '',
		share_profile: false,

		from: ProfessionalModel,
	}
}
