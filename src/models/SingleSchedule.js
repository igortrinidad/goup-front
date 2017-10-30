import {cleanClientModel} from './Client'
import {cleanProfessionalModel} from './Professional'
import {cleanCategoryModel} from './Category'

export function cleanSingleSchedule() {
    return {
        company_id: '',
        company_id: '',
        category_id: '',
        professional_id: null,
        date: '',
        time: '',
        observation: '',
        is_trial: false,
        is_confirmed: false,
        confirmed_at: '',
        confirmed_by: '',
        is_canceled: false,
        canceled_at: '',
        canceled_by: '',
        is_reschedule: false,
        reschedule_by: '',
        reschedule_at: '',
        created_at: '',
        updated_at: '',
        professional: cleanProfessionalModel(),
        client: cleanClientModel(),
        category: cleanCategoryModel()
    }
}
