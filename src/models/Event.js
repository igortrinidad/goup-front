const UUID = require('uuid-js')
export default{
    id: '',
    user_id: '',
    category_id: '',
    google_place_id: '',
    name: '',
    slug: '',
    description: '',
    recurrency_type: null,
    recurrency_info: null,
    time_uninformed: false,
    time: null,
    value_uninformed: false,
    value: 0,
    whatsapp: '',
    website: '',
    email: '',
    lat: 0,
    lng: 0,

    city:{
        name: '',
        state:'',
        lat: 0,
        lng: 0,
    },

    categories:[],

    place:{},
    created_by: {},
    tags:[],
    photos:[]
}
export function cleanEventModel() {
    return {
        id: UUID.create().toString(),
        user_id: '',
        category_id: '',
        google_place_id: '',
        name: '',
        slug: '',
        description: '',
        recurrency_type: null,
        recurrency_info: null,
        time_uninformed: false,
        time: null,
        value_uninformed: false,
        value: 0,
        whatsapp: '',
        website: '',
        email: '',
        lat: 0,
        lng: 0,

        city:{
            name: '',
            state:'',
            lat: 0,
            lng: 0,
        },

        categories:[],

        place:{},
        created_by: {},
        tags:[],
        photos:[]

    }
}
