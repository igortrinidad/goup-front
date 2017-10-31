
import ProfessionalModel from './Professional'

export default {
	//Um treinamento pode ser adicionado por um cliente ou por um profissional
	id: '',
	created_by_id: '',
	created_by_type: '',
	dow: 1,//dia da semana
    observation: '',
    heart_rate: '',
	series: [],
	created_at: '2017-06-18 08:00:00',
	updated_at: '',
	deleted_at: '',
	share_profile: false,

    //RELATIONS
    from: ProfessionalModel
}

export function cleanTrainningModel(){
	return {
		//Um treinamento pode ser adicionado por um cliente ou por um profissional
		id: '',
		created_by_id: '',
		created_by_type: '',
		dow: 1,//dia da semana
	    observation: '',
	    heart_rate: '',
		series: [],
		created_at: '2017-06-18 08:00:00',
		updated_at: '',
		deleted_at: '',
		share_profile: false,

	    //RELATIONS
	    from: ProfessionalModel
	}
}
