import Comments from './Comments'

export default {
    id: 'company01',
    name: 'Mais Bartenders',
    slug: 'mais-bartenders',
    avatar: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png',
    city: 'Belo Horizonte',
    state: 'MG',
    description: 'Os melhores drinks estão aqui!',
    best_day: 'Quarta-feira',
    style: 'Rustíco',
    phone: '41 999999999',
    rating: 3,

    // Address
    address: {
        name: '',
        full_address: '',
        url: ''
    },
    lat: -19.9025412,
    lng: -44.03409,

    // Photos
    photos: [
        {
            photo_url: 'https://maisbartenders.com.br/img/portfolio/Mais_Bartenders_TRINIDAD.JPG',
            is_cover: true
        },
        {
            photo_url: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png',
            is_cover: false
        },
        {
            photo_url: 'https://maisbartenders.com.br/img/portfolio/Lichia_martini.png',
            is_cover: false
        },
        {
            photo_url: 'https://maisbartenders.com.br/img/portfolio/di_souza2.JPG',
            is_cover: false
        },
    ],

    // Comments
    comments: [
        Comments, Comments, Comments
    ]

}
