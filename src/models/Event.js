const UUID = require('uuid-js')
export default{
    id: '',
    user_id: '',
    category_id: '',
    google_place_id: '',
    name: '',
    slug: '',
    description: '',
    date: '',
    time: '',
    value: 0,
    lat: 0,
    lng: 0,

    city:{
        name: '',
        state:'',
        lat: 0,
        lng: 0,
    },

    category: {
        name_en: '',
        name_pt: '',
    },

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
        date: '',
        time: '',
        value: 0,
        lat: 0,
        lng: 0,

        city:{
            name: '',
            state:'',
            lat: 0,
            lng: 0,
        },

        category: {
            name_en: '',
            name_pt: '',
        },

        place:{

        },

        tags:[],
        photos:[]

    }
}
