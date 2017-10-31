export default [
    {
        id: 'n0',
    	content: 'Aprovou sua solicitação',
        created_at: '23/10/2017',
        was_readed: false,
    	updated_at: '',
        from: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
        	name: 'Manolo',
        	last_name: 'da Silva',
            full_name: 'Manolo da Silva'
        }
    },
    {
        id: 'n1',
    	content: 'Aprovou sua solicitação',
        created_at: '23/10/2017',
        was_readed: false,
    	updated_at: '',
        from: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
        	name: 'Manolo',
        	last_name: 'da Silva',
            full_name: 'Manolo da Silva'
        }
    },
    {
        id: 'n2',
    	content: 'Aprovou sua solicitação',
        created_at: '23/10/2017',
        was_readed: false,
    	updated_at: '',
        from: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
        	name: 'Manolo',
        	last_name: 'da Silva',
            full_name: 'Manolo da Silva'
        }
    },
    {
        id: 'n3',
    	content: 'Aprovou sua solicitação',
        created_at: '23/10/2017',
        was_readed: false,
    	updated_at: '',
        from: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
        	name: 'Manolo',
        	last_name: 'da Silva',
            full_name: 'Manolo da Silva'
        }
    }
]

export function cleanNotificationModel() {
    return {
        client_id:'',
        from_id: '',
        from_type: '',
    	title: '',
    	content: '',
        is_readed: false,
        readed_at:'',
    	created_at: '',
    	updated_at: '',
        client: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
            name: 'Jon',
            last_name: 'Snow',
            full_name: 'Jon snow'
        },
        from: {
            avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png',
        	name: 'Manolo',
        	last_name: 'da Silva',
            full_name: 'Manolo da Silva'
        }
    }
}
