<template>
    <!-- 赵大宝还款页 -->
    <div class='repayZhaoDaBao'>
        <div class='header'>
            <span class='title'>Uang datang</span>
            <div class='content'>
                <div class="top">
                    <van-divider dashed :style="{ width:'80%',height: '1px',color: '#fff', borderColor: '#fff' ,margin: '10px auto'}"> Sisa pengembalian</van-divider>
                </div>
                <div class="middle">
                    <span>Rp {{amountNumber}}</span>
                </div>
                <div class="time">Jatuh Tempo:{{deadLine}}</div>
                <div class="bottom" v-if='isOverdue == 1'>
                     <div class="left">
                       {{notice}}
                     </div>
                     
                     <div class="right">
                         Terlambatothari:{{overdueDays}}
                     </div>
                </div>
                <div class="bottom isNoOver" v-else>
                     <div class="left">
                         {{notice}}
                     </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <em></em><span>Pilih metode pembayaran untuk mendapatkan kode pembayaran</span>
            </div>
            <div class="moneyInput">
                <span>Jumlah pembayaran</span>
                <input type="text" placeholder="Silakan masukkan jumlah pembayaran" v-model="getrepayMentPostList.amount">
            </div>
            <div class="selectATM">
                <span>Metode pembayaran</span>
                <van-cell  tabindex="0"  @click="handleChooseParam(1)"  class="loaninfoparam"  is-link  arrow-direction="down"  :value="columnsValType[selectValTypeIndex]">
                    <img slot="right-icon" style="display:block;width:14px;height:8px;"  src="../../../../assets/img/loan/arrowdown.png"   alt/>
                </van-cell>
            </div>
            <div class="selectBank selectATM" ref='selectBank'>
                <span>Jenis bank</span>
                <!-- is-link在单元格右侧显示箭头 arrow-direction属性控制箭头方向-->
                <van-cell  tabindex="0" @click="handleChooseParam(2)"  class="loaninfoparam"  is-link  arrow-direction="down"  :value="columnsBankType[selectBankTypeIndex]">
                     <img slot="right-icon"  style="display:block;width:14px;height:8px;"  src="../../../../assets/img/loan/arrowdown.png" alt />
                </van-cell>
            </div>
            <button @click='getRepaymentCode'>Dapatkan kode pembayaran</button>
            <div class='prompt'>Harap bayar tepat waktu, kode pembayaran tidak valid atau dapat diperoleh kembali setelah pembayaran</div>
            <ul>
                <li v-for='item in this.repaymentCodeReaps'> 
                    <a :href='item.guidLink' style='display:block'>
                        <div class='name'><em></em>{{item.payType}}</div>  
                        <div class="cardNumber">{{item.repaymentCode}}</div>  
                        <div class="time">Masa berlaku:{{expiredAt}}</div>
                        <div class='payMoney'>
                            <span class='money'>Jumlah pembayaran:{{item.amount}}</span>
                            <span class='cara'>Cara pembayaran</span>
                        </div>
                     </a>
                </li>
                <!-- <li>
                    <div class='name'><em></em>Alfamart</div>  
                    <div class="cardNumber">8888 8888 0000 2222</div>  
                    <div class="time">Masa berlaku:17/12/2019—25/12/2020</div>
                    <div class='payMoney'>
                        <span class='money'>Jumlah pembayaran:10000</span>
                        <span class='cara'>Cara pembayaran</span>
                    </div>
                </li> -->
               
            </ul>
        </div>
        <!--付款方式 底部弹出框-->
        <!-- 通常选择器组件会传入show-toolbar属性以展示顶部操作栏，并可以监听对应的confirm和cancel事件 -->
        <van-popup  class="bompanlfeedback"  v-model="showBtmPalForAcount"  position="bottom"  :style="{ height: '40%' }">
            <van-picker  show-toolbar  :columns="columnsValType" :default-index="defaultAcountIndex"  @confirm="onAcountConfirm"  @cancel="showBtmPalForAcount = false" />
        </van-popup>
        <!--银行类型 底部弹出框-->
        <van-popup class="bompanlfeedback" v-model="showBtmPalForDay" position="bottom" :style="{ height: '40%' }">
            <van-picker show-toolbar :columns="columnsBankType"  :default-index="defaultDayIndex"  @confirm="onDayConfirm"  @cancel="showBtmPalForDay = false" />
        </van-popup>
    </div>
</template>

<script>
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";
import numOperation from "../../../../lib/numOperation";
import moment from "moment";
import { Toast } from 'vant';
import { Notify } from 'vant'
   export default {
        data() {
            return {
                isOverdue:'', //是否有逾期
                amountNumber:'',
                deadLine: "",//截止日期
                notice:'',

                overdueDays:'', //逾期天数
                

                showBtmPalForAcount: false,
                columnsValType: [],
                defaultAcountIndex: 0,
                selectValTypeIndex: "0", //默认选中
                selectValType: "",
                valTypeList: [],

                showBtmPalForDay: false,
                columnsBankType: [],
                defaultDayIndex: 0,
                selectBankTypeIndex: "0",
                selectBankType: '',
                getrepayMentPostList:{
                    vaType: 0,
                    amount:'',
                    bankType:''
                },


                 
                expiredAt:'',

                repaymentCodeReaps:[]

            };
        },
        methods: {
            handleChooseParam(index) {
                if (index == 1) {
                    this.showBtmPalForAcount = true;
                } else {
                    this.showBtmPalForDay = true;
                }
            },
            onAcountConfirm(value, index) {
                this.selectValType = value;
                this.selectValTypeIndex = index;
                this.showBtmPalForAcount = false;
                if(this.selectValTypeIndex==1){
                    this.$refs.selectBank.style.display='none'
                }else{
                     this.$refs.selectBank.style.display='block'
                }
            },
            onDayConfirm(value, index) {
                this.getrepayMentPostList.bankType = value
                this.selectBankType = value;
                this.selectBankTypeIndex = index;
                this.showBtmPalForDay = false;
            },
            getOrderStatus() {
                homeServiceApi.getOrderProcess().then(res => {
                    // console.log(res)
                    this.amountNumber = numOperation.amountFormat(parseFloat(res.data.amount))
                    this.isOverdue = res.data.overdue
                    this.deadLine =moment(res.data.deadLine).utcOffset(0).format("YYYY-MM-DD");
                    this.notice = res.data.notice
                    this.overdueDays = res.data.overdueDays
                });
            },
            getrepayMentGet(){
                hasorderServiceApi.getrepayMentGet().then(res=>{
                    // console.log(res)
                     this.columnsBankType =res.data.bankList
                     this.valTypeList = res.data.vaTypeList

                    for(var i=0;i<res.data.vaTypeList.length;i++){
                        let value=[]
                        value = res.data.vaTypeList[i].name                       
                        this.columnsValType.push(value) 
                    }
                   
                    this.selectValType = this.columnsValType[0]
                    this.getrepayMentPostList.bankType = this.columnsBankType[0]
                })
            },
             getRepaymentCode(){
                let _index = this.valTypeList.findIndex((item) => {
                    return item.name == this.selectValType
                })
                this.getrepayMentPostList.vaType = this.valTypeList[_index].code
                if(this.getrepayMentPostList.amount<100000){
                    // Notify({ type: 'danger', message: '输入金额不能低于10万' })
                    // alert('输入金额不能低于10万')
                     Toast('Jumlah input tidak boleh kurang dari 100.000');
                    //  Jumlah input tidak boleh kurang dari 100.000
                    return
                }
               
                let content = JSON.parse(JSON.stringify(this.getrepayMentPostList))
                if(this.getrepayMentPostList.vaType == 2){
                    delete content.bankType
                }
                hasorderServiceApi.getrepayMentPost(content).then(res=>{
                     hasorderServiceApi.getrepayMentGet().then(data=>{
                        this.repaymentCodeReaps = data.data.repaymentCodeReaps
                        this.expiredAt =moment(data.data.repaymentCodeReaps.expiredAt).format("YYYY-MM-DD")
                    })
                })
            },
    
  },
  mounted() {
     this.getOrderStatus();
     this.getrepayMentGet()
     hasorderServiceApi.getrepayMentGet().then(data=>{
        this.repaymentCodeReaps = data.data.repaymentCodeReaps
        this.expiredAt =moment(data.data.repaymentCodeReaps.expiredAt).format("YYYY-MM-DD")
    })
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/style/var.less";
    .repayZhaoDaBao{
        .header{
            width:100%;
            height:207px;
            background-image: url('../../../../assets/img/homeStatus/titleImg.png');
            background-size:100% 100%;
            .title{
                display:inline-block; 
                font-size:18px;
                font-family:HelveticaNeue;
                color:rgba(255,255,255,1);
                line-height:22px;
                box-sizing: border-box;
                margin-top:34px;
            }
            .content{
                width:95%;
                height:199px;
                background:@globleColor;
                border-radius:8px;
                margin:22px auto;
                box-sizing: border-box;
                padding:18px 5px;
                position: relative;
                z-index:3;
                .middle span{
                    font-size:38px;
                    font-family:HelveticaNeue-Medium,HelveticaNeue;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:40px;
                    margin-top:11px;
                }
                .time{
                    font-size:12px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:33px;
                }
                .bottom{
                    width:95%;
                    text-align: left;
                    margin:auto;
                    display:flex;
                    justify-content: space-around;
                    // background:red;
                    .left{
                        width:100%;
                        font-size:12px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        color:rgba(255,255,255,1);
                        
                    }
                    .right{
                        height:23px;
                        text-align: center;
                        padding:3px 10px;
                        line-height:23px;
                        background:rgba(255,236,238,1);
                        border-radius:6px;
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(255,74,88,1);
                        margin-top:5px;
                    }
                }
                .isNoOver{
                    text-align: center;
                }
            }
        }
        .content{
            width:100%;
            height:calc(100vh - 207px);
            background-image:url('../../../../assets/img/homeStatus/background.png');
            // background:red;
            position: relative;
            z-index: 1;
            top:-10px;
            .title{
                width:90%;
                margin:auto;
                text-align: left;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:20px;
                margin-bottom:20px;
                box-sizing: border-box;
                padding-top:80px;
                em{
                    font-style: normal;
                    display: inline-block;
                    width:5px;
                    height:20px;
                    background:@globleColor;
                    border-radius: 30px;
                }
                span{
                    display: inline-block;
                    margin-left: 15px;
                    margin-top:-30px;
                }
            }
            .moneyInput{
                width:90%;
                margin:auto;
                text-align: left;
                span{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:20px;
                }
                input{
                    width:100%;
                    height:50px;
                    margin-top:10px;
                    outline: none;
                    box-sizing: border-box;
                    padding:0 10px; 
                }
            }
            .selectATM,.selectBank{
                 width:90%;
                 margin:20px auto;
                 text-align: left;
                 span{
                    font-size:14px;
                    display: block;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:20px;
                    margin-bottom:10px;
                }
                 
            }
            button{
                width:80%;
                margin:auto;
                height:48px;
                background:@globleColor;
                border-radius:100px;
                outline: none;
                border:0;
                color:#fff;
            }
            .prompt{
                width:90%;
                font-size:12px;
                margin:10px auto;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:@globleColor;
                line-height:16px;
                margin-bottom:36px;    
            }
            ul{
                width:90%;
                margin:auto;
                padding-bottom:50px;
                li{
                    text-align: left;
                    font-family:PingFangSC-Medium,PingFang SC;
                    margin-bottom:50px;
                   .name{
                        font-size:17px;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:24px;
                        em{
                            display: inline-block;
                            font-style: normal;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background:@globleColor;
                            margin-right:10px;
                        }
                   }
                   .cardNumber{
                        font-size:24px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:32px;
                        margin-left:15px;
                   }
                   .time{
                        font-size:12px;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:20px;
                        margin-left:15px;
                   }
                   .payMoney{
                       display: flex;
                       justify-content: space-between;
                       
                       span{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(102,102,102,1);
                            line-height:20px;
                       }
                        .money{
                            margin-left:15px;
                        }
                        .cara{
                            color:@globleColor;
                        }
                   } 
                }
            }
        }
    }
    .repayZhaoDaBao /deep/ .van-dropdown-menu__item{
        width:90%;
        border:1px solid rgba(230,230,230,1);
        .van-dropdown-item .van-dropdown-item--down{
            width:90%;
            .van-popup .van-popup--top .van-dropdown-item__content{
                width:100%;
            }
        }
        .van-ellipsis{
            width:170px;
            margin-right:100px;
        }
    }
</style>
<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.repayZhaoDaBao {
  .content {
    .selectATM {
      .van-cell {
        height:50px;
        border:1px solid #a9a9a9;
        // margin-top:30px;
        line-height:30px;
        .van-cell__value {
          span {
            //color: #4d6dfd !important;
            margin-top:5px;
          }
        }
        img{
            margin-top:10px;
        }
      }
    }
  }
}
 .van-coupon-list__empty p, .van-divider{
        width:70%;
        margin:12px auto;
        font-size:14px;
        font-family:HelveticaNeue-Medium,HelveticaNeue;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:14px;
    }
</style>