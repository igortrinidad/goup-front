
const UUID = require('uuid-js')
const moment = require('moment')
import ProfessionalModel from './Professional'

export default {
	id: UUID.create().toString(),
	client_id: '',
	items: [],
	observation: '',
	path: '',
	photo_url: 'https://www.bodybuilding.com/fun/images/2006/xrep5a.jpg',
	created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	updated_at: '',
	share_profile: false,

	//RELATIONS
	from: ProfessionalModel,
	photos: []
}

export function cleanEvaluationModel(){
	return {
		id: UUID.create().toString(),
		client_id: '',
		items: [],
		observation: '',
		path: '',
		photo_url: 'https://www.bodybuilding.com/fun/images/2006/xrep5a.jpg',
		created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
		updated_at: '',
		share_profile: false,

		//RELATIONS
		from: ProfessionalModel,
		photos: []
	}
}