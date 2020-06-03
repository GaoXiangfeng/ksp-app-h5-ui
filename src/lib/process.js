import router from '../router/index'
import homeServiceApi from "../services/api/home.service";
import Promise from "../services/promise.service";


export default {
    goToProcessPage() {
        // -1 未登录展示首页
        // 1 开始有提交信息
        // 2 审核中
        // 3 审核拒绝
        // 4 审核通过
        // 5 放款失败
        // 6 放款成功
        // 7 贷款结清
        return new Promise((resolve,reject) => {
          homeServiceApi.getOrderProcess().then(res => {
            // console.log(res)
              let orderStatus = res.data.status
              let isMfOrder =  res.data.isMfOrder
  
              if (orderStatus == -1 || orderStatus == 1) {
                  router.push({ path: "loanmainnoorder", query: "" });
                } else if (orderStatus == 2) {
                  router.push({
                    path: "underreviewhasorder",
                    query: ""
                  });
                } else if (orderStatus == 3) {
                  router.push({ path: "rejecthasorder", query: "" });
                } else if (orderStatus == 4) {
                  router.push({ path: "underreviewhasorder", query: "" });
                } else if (orderStatus == 5) {
                  router.push({ path: "failedhasorder", query: "" });
                } else if (orderStatus == 6) {
                  if(isMfOrder == true && isMfOrder != null){
                    router.push({
                      path: "shouldRepayZhaoDaBaohasorder",
                      query: ""
                    });
                  }else{
                    router.push({
                      path: "shouldrepayhasorder",
                      query: ""
                    });
                  }
                  
                } else if (orderStatus == 7) {
                  router.push({
                    path: "repaysuccessedhasorder",
                    query: ""
                  });
                }
          });

          resolve()
        })
        
    },
    //获取订单状态（加判断订单状态判断，防止浏览器或者手机回退键）
    getProcessStatus(){
      return new Promise((resolve,reject) => {
        homeServiceApi.getOrderProcess().then(res => {
          resolve(res.data.status)
        })
      })
    }
}