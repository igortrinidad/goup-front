

export function cleanUser(){
	return {
		name: 'John',
		last_name: 'Doe',
		email: 'john@doe.com',
		remember_token: '',
		password: '',
		password_confirmation: '',

		//Mutators
		full_name: 'John Doe',

		//RELATS
		favorites: [],
		liked: [],
		unliked: [],

	}
}