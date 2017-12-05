const UUID = require('uuid-js')
export default{
    id: '',
    user_id: '',
    category_id: '',
    google_place_id: '',
    name: '',
    slug: '',
    description: '',
    recurrency_type: '',
    recurrency_info: '',
    date: '',
    time: '',
    value_uninformed: true,
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

    place:{

    },
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
        recurrency_type: '',
        recurrency_info: '',
        date: '',
        time: '',
        value_uninformed: true,
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

        place:{

        },
        tags:[],
        photos:[]

    }
}
