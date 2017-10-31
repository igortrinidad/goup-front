
import ProfessionalModel from './Professional'


export function cleanDietModel(){
	return { 
		client_id: '',
		created_by_id: '',
		created_by_type: '',
		is_active: true,
		daily_total_kcal: 0,
		daily_total_protein: 0,
		daily_total_carb: 0,
		daily_total_fat: 0,
		daily_total_fiber: 0,
		observation: '',
		created_at: '',
		share_profile: false,
		meals: [],

		from: ProfessionalModel,
	}	
}