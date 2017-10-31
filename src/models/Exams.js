
const UUID = require('uuid-js')
const moment = require('moment')

import ProfessionalModel from './Professional'
import ClientModel from './Client'

export default {
	id: UUID.create().toString(),
	from_id: '',
	from_type: '',
	client_id: '',
	type: 'Imagem',
	observation: 'Machucou um pouco',
	attachment_url: 'http://www.abc.net.au/news/image/8718770-3x4-700x933.jpg',//attachment
	created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	updated_at: '',
	deleted_at: '',
	share_profile: false,

	//RELATIONS
	attachments: [],
	from: ProfessionalModel
}

export function cleanExamModel(){
	return	{
		id: UUID.create().toString(),
		created_by_id: '',
		created_by_type: '',
		client_id: '',
		type: '',
		observation: '',
		created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
		deleted_at: '',
		share_profile: false,
		//RELATIONS
		attachments: [],
		from: ProfessionalModel
	}
}
