
import {cleanClientModel} from './Client'

export function cleanActivity() {
    return {
        xp_earned: 100,
    	content: 'Exame do dia',
    	created_at: '2017-08-30 08:30:00',
    	type: 'Exam',

    	//RELATS
    	user: {
            id: '226c5900-8cd0-11e7-815c-39dcf79bf338',
    		full_name: 'John Doe',
    		avatar: 'https://isaudavel-development.s3.amazonaws.com/assets/isaudavel_holder850.png'
    	},
    	about: {
    		type: 'Imagem',
    		observation: 'Fratura',
    		attachments: [
    			{
    				attachment_url: 'http://alunosonline.uol.com.br/upload/conteudo_legenda/45c233fb2130e18fb534c12de18ee8c9.jpg'
    			}
    		],
    	},
    }
}
