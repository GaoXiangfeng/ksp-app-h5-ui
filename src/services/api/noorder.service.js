import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //基础信息--提交
    commitBaseInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyLoan`, params)
    },
    //基础信息--获取
    getBaseInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getApplyLoanUserInfo`)
    },
    //工作信息--提交
    commitWorkInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/supplementUserDetail`, params)
    },
    //工作信息--获取
    getWorkInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getLoanDetailInfo`)
    },

    //身份信息--上传照片
    uploadImg: (param) => {
        return axios.post(`${ApiBaseUrl}/ex/order/uploadImage`, param)
    },
    //身份信息--提交信息
    commitIdInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyImageInfo`, params)
    },
    //身份信息--获取信息
    getIdInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getImageInfo`)
    },
    //其他信息--获取银行列表信息
    getBankList: () => {
        return axios.get(`${ApiBaseUrl}/ex/app/getAllBankList`)
    },
    //其他信息--提交银行信息
    commitOtherInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/bindBankCardAccount`, qs.stringify(params))
    },
    //其他信息--获取银行信息
    getOtherInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getBankCardAccount`)
    },
}