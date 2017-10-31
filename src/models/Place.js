
import {cleanUser} from './User'

export function cleanPlace(){
	return {

		name: 'Espetinho Balada',
		google_id: '123123',
		city: 'Belo Horizonte',
		state: 'MG',
		lat: '-20.23123',
		lng: '-20.23123',
		full_address: 'Rua do Espeto Balada, 290',

		//Transformers
		city_position: 10,

		//RELATS
		created_by: cleanUser(),
		best_week_day: '5',
		specific_date: '2018-10-10',
		photos: [],
		friends_that_liked: [ cleanUser(), cleanUser() ],

	}
}