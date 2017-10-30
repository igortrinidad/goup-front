
import ProfessionalModel from './Professional'
import CategoriesModel from './Categories'
import CompanyPhoto from './CompanyPhoto'
import {cleanCategoryModel} from './Category'

const UUID = require('uuid-js')

export default {
    id: UUID.create().toString(),
    avatar: 'https://s3.amazonaws.com/isaudavel-assets/img/isaudavel_holder550.png',
	owner_id: '',
	is_active: true,
    name: '',
	slug: '1',
    website: '',
    phone: '',
    description: '',
    address_is_available: true,
	is_delivery: false,
	address: {
        name: '',
        full_address: '',
        url: ''
    },
    lat: -19.8725915,
    lng: -43.9710057,
    city: '',
    state:'',
	//RELATIONS
    current_rating: 4,
	photos: [],
	clients: [],
	categories: [],
    professionals: [],
    public_confirmed_professionals: [],
    last_ratings: [],
}

export function cleanCompanyModel() {
    return {
        id: UUID.create().toString(),
        avatar: 'https://s3.amazonaws.com/isaudavel-assets/img/isaudavel_holder550.png',
        owner_id: '',
        is_active: true,
        name: '',
        slug: '1',
        website: '',
        phone: '',
        description: '',
        address_is_available: false,
        is_delivery: false,
        address: {
            name: '',
            full_address: '',
            url: ''
        },
        lat: 0,
        lng: 0,
        city: '',
        state:'',

        //RELATS
        current_rating: 0,
        clients: [],
        photos: [],
        categories:[],
        professionals: [],
        public_confirmed_professionals: [],
        last_ratings: [],
    }
}
