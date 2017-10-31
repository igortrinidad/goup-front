
import {cleanProfessionalModel} from './Professional';

var categories = [
    { name: 'Pilates', slug: 'pilates' },
    { name: 'Personal Trainer', slug: 'personal' },
    { name: 'Nutrição', slug: 'nutricao' },
    { name: 'Fisioterapia', slug: 'fisioterapia' },
    { name: 'Massagem', slug: 'massagem' },
    { name: 'Saúde', slug: 'saude' }
];

export function cleanCategoryModel(){
	return {
		name: 'Pilates',
		slug: 'Pilates',
		is_active: true,
		calendar_settings: {
			is_professional_scheduled: false,
			wordkays: [],
		},
		professionals: [cleanProfessionalModel(),cleanProfessionalModel()]
	}
}