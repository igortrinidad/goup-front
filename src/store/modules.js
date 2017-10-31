import { vuex as professional } from '../modules/professional'
import { vuex as client } from '../modules/client'
import { vuex as general } from '../modules/general'
// create a new object and preserv original keys
export default { ...general.modules }
