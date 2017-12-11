export function Default() {
    return {
        id: '123123',
        name: 'John',
        last_name: 'Doe',
        full_name: 'John Doe',
        slug: 'john-doe',
        age: '23',
        city:{
            name: 'Presidente Prudente',
            state:'SP',
            lat: 0,
            lng: 0,
        },
        avatar: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png',
        photos: [
            {
                photo_url: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png'
            },
            {
                photo_url: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png'
            },
            {
                photo_url: 'https://maisbartenders.com.br/img/portfolio/My_garden_Mais_Bartenders.png'
            }
        ]
    }
}

export function CleanUserModel() {
    return  {
        id: '',
        name: '',
        last_name: '',
        full_name: '',
        slug: '',
        age: '',
        city:{
            name: '',
            state:'',
            lat: 0,
            lng: 0,
        },
        avatar: '',
        photos: [
        ],
    }
}
