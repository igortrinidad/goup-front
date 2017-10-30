import { vuex as general } from '../modules/general'
// create a new object and preserv original keys
export default { ...professional.modules, ...client.modules, ...general.modules }
