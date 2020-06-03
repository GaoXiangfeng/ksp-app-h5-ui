import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    getOrderProcess: () => {
        return axios.post(`${ApiBaseUrl}/ex/order/orderProgress`)
    },
}
