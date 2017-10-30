import ClientModel from './Client'
import ProfessionalModel from './Professional'
import CommentModel from './Comment'

const UUID = require('uuid-js')

export default {
    id: UUID.create().toString(),
    modality_id: '',
    name: '',
    slug: '',
    avatar: '',
    from: {
        full_name: '',
        avatar: '',
    },
    company_id: '',
    description: '',
    avatar: '',
	is_free: true,
    value: 0,
    date: '',
    time: '10:00',
    lat: -19.8725915,
    lng: -43.9710057,
    city: '',
    state: '',
    address: {
        name: '',
        full_address: '',
        url: '',
    },
	created_at: '',

    total_comments: 0,
    total_participants: 0,

    //RELATS
    photos: [],
    comments: [CommentModel],
    participants: [ClientModel, ClientModel, ClientModel, ClientModel],
    modality: {},
    sub_modalities: []
}

export function cleanEvent() {
    return {
        id: UUID.create().toString(),
        modality_id: '',
        name: '',
        slug: '',
        avatar: '',
        from: {
            full_name: '',
            avatar: '',
        },
        company_id: '',
        description: '',
        avatar: '',
        is_free: true,
        value: 0,
        date: '',
        time: '',
        lat: -19.8725915,
        lng: -43.9710057,
        city: '',
        state: '',
        address: {
            name: '',
            full_address: '',
            url: '',
        },
        created_at: '',

        total_comments: 0,
        total_participants: 0,

        //RELATS
        photos: [],
        comments: [],
        participants: [],
        modality: {},
        sub_modalities: []
    }

}
