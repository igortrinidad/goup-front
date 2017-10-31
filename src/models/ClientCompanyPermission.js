export function cleanClientCompanyPermissionModel() {
	return {
		client_id: '',
		company_id: '',
		requested_by_client: true,
		diets_edit: true,
		diets_show: true,
		evaluations_edit: true,
		evaluations_show: true,
		exams_edit: true,
		exams_show: true,
		is_confirmed: true,
		restrictions_edit: true,
		restrictions_show: true,
		trainnings_edit: true,
		trainnings_show: true,
	}
}