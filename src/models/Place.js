import Comments from './Comments'

export function cleanPlaceModel() {
	return {
        id: '',
        google_placeId: '',
        name: '',
        slug: '',
        avatar: '',
        description: '',
        best_day_is_weekly: false,
        best_day: '',
        is_owner: true,
        category: {
            name_en: '',
            name_pt: '',
            subcategories: [

            ]
        },
        style: '',
        phone: '',
        website: '',
        ranking: 0,

        // Address
        city: '',
        state: '',
        address: '',
        lat: 0,
        lng: 0,

        // Photos
        photos: [
        ],

        // Comments
        comments: [
        ]

    }
}
