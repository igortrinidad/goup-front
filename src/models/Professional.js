
import CategoriesModel from './Categories'

const UUID = require('uuid-js')

export default {
	id: UUID.create().toString(),
	name: 'John',
	last_name: 'Doe',
	email: 'john@doe.com',
	slug: '',
    avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
	functions: ['Massagista'],
	password: '',
	remember_token: '',
	created_at: '',
	updated_at: '',

    full_name: 'John Doe',

	//RELATIONS
    current_rating: 4,
    total_rating: 0,
	categories: CategoriesModel,
	companies: [],
	photos: [],
	professional_workdays: [],
	certifications: [],
	last_ratings: [],
}


export function cleanProfessionalModel(){
	return {
		id: UUID.create().toString(),
		name: '',
		last_name: '',
		email: '',
		slug: '',
        avatar: '',
		password: '',
		remember_token: '',
		created_at: '',
		updated_at: '',
	    full_name: '',
		//RELATIONS
		//categories: CategoriesModel,
		photos: [],
		companies: [],
		certifications: [],
        current_rating: 0,
        total_rating: 0,
        last_ratings: [],
		calendar_settings: {
			slot_duration: 60,
			is_active: true,
			workdays: [],
            unavailable_dates_range: []

		}
	}
}

export function clearProfessionalObject() {
    return {
        name: '',
        last_name: '',
        email: '',
        phone: '',
        bday: '',
        categories: []
    }
}
