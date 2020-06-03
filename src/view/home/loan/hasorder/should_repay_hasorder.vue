<template>
   <!-- KSP还款页面 -->
  <div class="should_repay_page">
      <div class="top">
          <span class='remaining'>Sisa Pengembalian</span>
          <span class='money'>Rp {{amount}}</span>
          <span class='num'>Jatuh Tempo:{{deadLine}}</span>
          
          <!-- 在这要做个判断判断是否有逾期 -->
          <div class='overdue' v-if='isOverdue == 1'><span>Terlambatothari:{{overdueDays}}</span></div> 
          <div class='overdue' v-else style='display:none'></div>   
      </div>
      <div class="bottom">
          <div class="content">
             <div class="title">
                 <span class='line'></span> <span class='wenzi'>Pilih metode pembunasan</span> 
             </div>
             <ul>
               <!-- repayMethod用来循环li -->
               <li v-for='item in repayMethod'>
                  <div class='li-content' @click='goMarketDetails(item)'>
                      <img class='left' :src="item.icon" alt="">
                      <div>
                          <span class='transfer'>{{item.name}}</span>
                          <span class='only'>{{item.desc}}</span>
                      </div>
                      <img class='right' src="../../../../assets/img/homeStatus/shouldRepay4.png" alt="">
                  </div>
               </li>
               <!-- <li>
                  <div class='li-content' @click='goBankDetails()'>
                      <img class='left' :src="item[1].icon" alt="">
                      <div>
                          <span class='transfer'>{{item[1].name}}</span>
                          <span class='only'>{{item[1].desc}}</span>
                      </div>
                      <img class='right' src="../../../../assets/img/homeStatus/shouldRepay4.png" alt="">
                  </div>
               </li> -->
             </ul>
          </div>
      </div>
  </div>
</template>

<script>
import process from "../../../../lib/process";
import btnRepay from "../../../../components/btnRepay";
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";
import moment from "moment";

import { Steps } from "mand-mobile";
export default {
  name: "should_repay_page",
  data() {
    return {
      amount: "", //金额
      isOverdue:'',//是否逾期
      deadLine: "", //截止日期
      overdueDays:'',//逾期天数
      bankList:'',//虚拟账户列表
      repayMethod:''//还款方式
    };
  },
  components: {
    // myheader,
    btnRepay
  },
  methods: {
   
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        //将结果存在store中
        console.log(res)
        this.amount = numOperation.amountFormat(parseFloat(res.data.amount));
        this.deadLine =moment(res.data.deadLine).format("YYYY-MM-DD");
        this.overdue = res.data.overdue
        // this.isOverdue = res.data.overdue == 0 ? false : true;
        this.isOverdue = res.data.overdue
        this.overdueDays = res.data.overdueDays
        this.bankList = res.data.bankList
        this.repayMethod = res.data.repayMethod
      });
    },
     // 点击进入Market Transfer详情页
    goMarketDetails(item){
      if(item.name=='Market Transfer'){
         this.$router.push({
          name: "marketDeatails",
        });
      }else{
        this.$router.push({
          name: "bankDetails",
          params:{
            isOverdue:this.isOverdue,
            overdueDays:this.overdueDays
          }
        });
      }
       
    },
  },
  mounted() {
    this.getOrderStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.should_repay_page {
  .top{
     width:100%;
     height:216px;
     background-image: url('../../../../assets/img/homeStatus/shouldRepay1.png');
     background-size:100% 100%;
     box-sizing: border-box;
     padding-top:48px;
     font-weight:500;
     color:rgba(255,255,255,1);
     .remaining{
        font-size:13px;
        font-family:PingFangSC-Medium,PingFang SC;
        line-height:18px;
        display:block;
        margin-bottom:7px;
     }
     .money{
        font-size:38px;
        font-family:HelveticaNeue-Medium,HelveticaNeue;
        line-height:39px;
     }
     .num{
        display:block;
        font-size:13px;
        font-family:PingFangSC-Medium,PingFang SC;
        line-height:18px;
        margin:10px 0;
     }
     .overdue{
       display:inline-block;
       width:150px;
       height:23px;
       border-radius:6px;
       background:#fff;
       span{
          font-size:11px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          line-height:22px;
          color:rgba(255,74,88,1);
       }
     }
  }
  .bottom{
      width:100%;
      height:calc(100vh - 216px);
      background:rgba(248,248,248,1);
      box-sizing: border-box;
      padding-top:21px;
     .content{
       width:90%;
       margin:auto;
       .title{
           text-align: left;
            .wenzi{  
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:30px;
              padding-left:10px;
              border-left:5px solid @globleColor;
            }
           
        }
        ul{
            width:100%;
            margin:25px auto;
            li{
              width:100%;
              height:125px;
              background:#fff;
              margin-bottom:20px;
              box-sizing: border-box;
              padding-top:18px;
              .li-content{
                  width:97%;
                  margin:auto;
                  display:flex;
                  justify-content:space-around;
                  align-items: center;
                  .left{
                    width:112px;
                    height:88px
                  }
                  .right{
                    width:10px;
                    height:16px;
                  }
                  div{
                    text-align: left;
                    .transfer{
                        display:block;
                        font-size:16px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:23px;
                      }
                      .only{
                        display: block;
                        width:150px;
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:16px;
                      }
                  }
              }
            }
        }
     }
  }
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";


</style>