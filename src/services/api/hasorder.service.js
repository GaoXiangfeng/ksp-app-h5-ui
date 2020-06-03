import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //获取审核中信息
    getOrderProcess: () => {
        return axios.post(`${ApiBaseUrl}/ex/order/orderProgress`)
    },
    getRepayUrl: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/getRepayUrl`, params)
    },
    //再次申请
    applyAgain: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/closeOrder`, qs.stringify(params))
    },
    //获取银行列表信息
    getBankList: () => {
        return axios.get(`${ApiBaseUrl}/app/bankList`)
    },
    // market还款页面
    getMarketRepay: () => {
        return axios.get(`${ApiBaseUrl}/api/repay/invoice`)
    },
    // bank还款页面
    getBankRepay: () => {
        return axios.get(`${ApiBaseUrl}/api/repay/atm`)
    },
    // 关闭订单，跳转到首页
    getcloseLoan: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/closeLoan`,qs.stringify(params))
    },
    // 赵大宝生成还款码
    getrepayMentPost: (params) => {
        return axios.post(`${ApiBaseUrl}/pt/order/repaymentCode`,params)
    },
    getrepayMentGet: () => {
        return axios.get(`${ApiBaseUrl}/pt/order/repaymentCode`)
    },

}
