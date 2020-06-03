import Promise from "./promise.service";
import axios from 'axios'
import userService from "./user.service";
import androidIosService from './androidIos.service'
import { Toast } from 'vant';
import router from '../router';

// 每一个请求都会进入队列并附带一个定时，在请求成功后清除，当请求时间超过200Ms时会自动唤起全局的loading，在 timeout/所有请求结束后清空
import store from '../store/index'
let httpQueue = [],
	timeout = 200,
	loadingTimeOut,
	closeTimeOut

function beforeRequest(url) {
	httpQueue.push(url)

	loadingTimeOut = setTimeout(() => {
		if (httpQueue.length !== 0 && !store.state.module.loading.open) {
			store.commit('OPEN_LOADING')
		}
	}, timeout)
	closeTimeOut = setTimeout(() => {
		if (store.state.module.loading.open) {
			store.commit('CLOSE_LOADING')
		}
	}, 5000)
}

function afterRequest(url) {
	clearTimeout(loadingTimeOut)
	var index = httpQueue.indexOf(url);
	if (index > -1) {
		httpQueue.splice(index, 1);
	}
	if (httpQueue.length == 0) {
		setTimeout(() => {
			store.commit('CLOSE_LOADING')
		}, 200)
	}
}
//axios
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;

const _options = {
	headers: {
		//'x-auth-token': userService.getToken(),
		'deviceId': '',
		'channelId': 10001,
		'channel': 10001,
		'version': '1.0',
		'lang': 'en',
		'Content-Type': 'application/x-www-form-urlencoded',
	}
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	let returnData = response.data

	if (returnData.code == '0000' || returnData.code == 0) {
		// if (returnData.businessCode === '0001' && returnData.msg) { // 默认非0000 有msg都要底层弹提示信息的
		// 	//Toast(returnData.msg)
		// 	// router.replace({name: 'error'})
		// 	return Promise.reject(returnData)
		// } else {
		// 	return returnData
		// }
		return returnData
	}else if(returnData.code == 1 && returnData.businessCode == '0401'){
		//没有权限
		androidIosService.noPermission()
		Toast(returnData.msg);
	} else {
		Toast(returnData.msg);
		//router.push({name: 'error'})
		// return Promise.reject(returnData)
		return returnData
	}
}, function (error) {
	// 对响应错误做点什么
	if (error.code === 'ECONNABORTED' || !error.response) { // 请求超时
		//Toast('Request time out, please try again')
		let data = {
			businessCode: '0100',
			code: '0100',
			data: 'Request time out'
		}
		//androidIosService.noPermission()
		Toast(returnData.msg);
		return Promise.reject(data)
	}
	let errorData = error.response
	let returnData = error.response.data

	if (errorData.status === 401 || returnData.code === '0401') {
		androidIosService.noPermission()
		Toast(returnData.msg);
		//userService.goLogin()
		return
	}
	if (errorData.status === 404) {
		router.replace({ name: '' })
		return
	}
	//router.push({name: 'error'})
});
function formatParams(data) {
	let key = Object.keys(data)
	let result = ''
	key.map((ele) => {
		result += `${ele}=${encodeURIComponent(data[ele])}&`
	})
	return result.slice(0, -1)
}
export default {
	get(url, options = JSON.parse(JSON.stringify(_options))) {
		if (!options.headers) {
			options.headers = {};
		}
		options.headers['X-Auth-Token'] = userService.getToken()
		options.headers['channelId'] = userService.getCookieValue('channelId')
		options.headers['channel'] = userService.getCookieValue('channel')
		options.headers['version'] = userService.getCookieValue('version')
		options.headers['deviceId'] = userService.getCookieValue('deviceId')

		//options.headers['X-Auth-Token'] = 'c30a62fb-91dc-4157-b1c7-4ba0704c3bc2'
		beforeRequest(url)
		return new Promise((resolve, reject) => {
			axios.get(url, options).then((response) => {
				afterRequest(url)
				resolve(response)
			}).catch((response) => {
				afterRequest(url)
				reject(response)
			}) 
		})
	},
	post(url, data, options = JSON.parse(JSON.stringify(_options))) {
		if (!options.headers) {
			options.headers = {};
		}
		options.headers['X-Auth-Token'] = userService.getToken()
		options.headers['channelId'] = userService.getCookieValue('channelId')
		options.headers['channel'] = userService.getCookieValue('channel')
		options.headers['version'] = userService.getCookieValue('version')
		options.headers['deviceId'] = userService.getCookieValue('deviceId') || ""

		//options.headers['X-Auth-Token'] = 'c30a62fb-91dc-4157-b1c7-4ba0704c3bc2'
		//登录模块与其他模块接口不同
		if(!url.includes('order/bindBankCardAccount') && !url.includes('order/closeLoan')){//
			//options.headers['Content-Type'] = 'application/json;charset=UTF-8'
			options.headers['Content-Type'] = 'application/json'
		}else{
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		}
        // if(url.includes('order/repaymentCode')){
		// 	alert(options.headers['Content-Type'])
		// }
		
		beforeRequest(url)
		if (options.headers && options.headers['Content-Type'] === 'application/json') {
			// data = data
		} else {
			//data = formatParams(data)
		}
		return new Promise((resolve, reject) => {
			axios.post(url, data, options).then((response) => {
				afterRequest(url)
				resolve(response)
			}).catch((response) => {
				afterRequest(url)
				reject(response)
			})
		})
	}
}
