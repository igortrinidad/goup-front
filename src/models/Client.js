
export default {
	id: 'c1',
    avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
	name: 'André',
	last_name: 'Brandão',
    full_name: 'André Brandão',
	email: '',
	slug: '',
	password: '',
	bday: '',
	phone: '',
	target: '',
	current_xp: 0,
	total_xp: 0,
	level: 0,
	created_at: '',
	updated_at: '',

    //APPENDS
    full_name: '',

	//RELATIONS
	photos: [],
	trainnings: [],
	evaluations: [],
	restrictions: [],
	exams: [],
	diets: [],
	subscriptions: [],
	company_client_observations: []
}

export function cleanClientModel(){
	return {
		id: '',
	    avatar: '',
		name: '',
		last_name: '',
		email: '',
		slug: '',
		password: '',
		bday: '',
		phone: '',
		target: '',
		current_xp: 0,
		total_xp: 0,
		level: 0,
		created_at: '',
		updated_at: '',

	    //APPENDS
	    full_name: '',

		//RELATIONS
		photos: [],
		trainnings: [],
		evaluations: [],
		restrictions: [],
		exams: [],
		diets: [],
		subscriptions: [],
		company_client_observations: []
	}
}


export function clearClientObject() {
    return {
        name: '',
        last_name: '',
        email: '',
        phone: '',
        bday: '',
    }
}
