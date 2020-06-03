<template>
    <div class="bankDetails">
         <div class="top">
            <img class='back' @click='back()' src="../../../../assets/img/homeStatus/marketDeatails3.png" alt="">
            <div class="content">
                <div class='isbalance' v-if='isOverdue != 0'>
                    <span>Terlambat {{overdueDays}}hari</span>
                </div> 
                <div class='isbalance' v-else style='display:none'></div>   
                 <p>Jumlah Dicairkan</p>
                <span class='num'>Rp {{amount}}</span>
                <div class="time">
                    <span>Jatuh Tempo : {{deadLine}}</span>
                </div>
            </div>   
         </div>
         <div class="middle">
            <p class='middleTitle'>Rekening Virtual</p>
            <ul>
                <!-- bankList用li循环 -->
                <li v-for='item in bankList'>
                    <div>
                        <span class='bankName'>{{item.bankCode}}</span>
                        <span class='bankNum'>{{item.bankAccount}}</span>
                    </div>
                </li>
                <!-- <li>
                    <div>
                        <span class='bankName'>Bank Central Asia</span>
                        <span class='bankNum'>88081 2000 0006 204</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span class='bankName'>Bank Rakyat Indonesia</span>
                        <span class='bankNum'>88081 2000 0006 204</span>
                    </div>
                </li> -->
            </ul>
         </div>
         <div class="bottom">
             <p class='bottomTitle'>Panduan Pembayaran</p>
             <ol>
                 <li>
                    <div class='liTitle'><em></em><span>Dari bank yang sama</span></div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/Mandiri88608.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>Mandiri 88608</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/Mandiri88908.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>Mandiri 88908</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/BRI.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>BRI</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/BNI.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>BNI</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                 </li>

                  <li>
                    <div class='liTitle lipadding'><em></em><span>Dari bank yang lain</span><div>(kami merekomendasikan rekening BNI）</div></div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/BNI-otherBanks1.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>BNI</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/BRI-otherBanks.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>BRI</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a class="btntoguide" href="http://oic74zs8j.qnssl.com/Mandiri-otherBanks.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText'>Mandiri</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                    <div class='li_one'>
                        <a href="http://oic74zs8j.qnssl.com/BNI-otherBanks2.html">
                            <div class="left">
                                <span class='blackText'>Bagaimana cara membayar</span>
                                <span class='redText' style='display:block'>BNI VAs from BCA</span>
                            </div>
                            <div class="right">
                                <img src="../../../../assets/img/homeStatus/bankDetails1.png" alt="">
                            </div>
                        </a>
                    </div>
                 </li>
             </ol>
         </div>
        
    </div>
</template>
<script>
   import hasorderServiceApi from "../../../../services/api/hasorder.service";
   export default{
       data(){
           return{
               amount:'',//还款金额
               bankList:[],//银行列表
               deadLine:'',//生效时间

               isOverdue:'',
               overdueDays:'',
           }
       },
       methods:{
        //    
            getBankRepay(){
                hasorderServiceApi.getBankRepay().then(res=>{
                    console.log(res)
                    this.amount = res.data.amount
                    this.bankList = res.data.bankList
                    this.deadLine = res.data.deadLine
                })
            },
            back(){
               this.$router.push({
                   name:'shouldrepayhasorder'
               })
           },
            
       },
       mounted(){
           this.getBankRepay()
           this.isOverdue = this.$route.params.isOverdue
           this.overdueDays = this.$route.params.overdueDays
       }
   }
</script>
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
    .bankDetails{
        .top{
            width:100%;
            height:216px;
            background-image: url('../../../../assets/img/homeStatus/shouldRepay1.png');
            box-sizing: border-box;
            padding-top:32px;
            position: relative;
            .back{
                width:10px;
                height:17px;
                position:absolute;
                left:20px;
                top:30px;
            }
            .content{
                width:85%;
                height:172px;
                margin:38px auto;
                background:#fff;
                border-radius: 8px;
                box-shadow:0px 2px 20px 0px rgba(216,216,216,0.5);
                box-sizing: border-box;
                padding:12px 25px;
                text-align: left;
                position: relative;
                z-index: 1;
                p{
                    font-size:14px;
                    font-family:HelveticaNeue-Medium,HelveticaNeue;
                    font-weight:500;
                    color:rgba(41,41,41,1);
                    line-height:14px;
                    margin-top:30px;
                }
                .num{
                    font-size:34px;
                    font-family:HelveticaNeue-Medium,HelveticaNeue;
                    font-weight:500;
                    color:rgba(255,79,92,1);
                    line-height:40px;
                }
                .time{
                    width:180px;
                    height:27px;
                    border-radius:14px;
                    border:1px solid @globleColor;
                    text-align: center;
                     margin-top:15px;
                    span{
                        font-size:12px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:@globleColor;
                        line-height:25px;
                       
                    }
                }
                .isbalance{
                    position: absolute;
                    right:25PX;
                    width:120px;
                    height:20px;
                    background:rgba(255,79,92,1);
                    border-radius:62px;
                    z-index: 3;
                    text-align: center;
                   
                    span{
                        font-size:12px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height:12px;
                    }
                }
            }
         }
         .middle{
             width:85%;
             margin:70px auto;
             text-align: left;
             font-family:PingFangSC-Medium,PingFang SC;
             .middleTitle{
                font-size:14px;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:20px;
                padding-left:5px;
                border-left:5px solid @globleColor;
             }
             ul {
                margin-left:35px;
                list-style-type: disc;
                li{
                   color:@globleColor;font-size:20px;
                   margin-bottom:15px;
                   div{
                       display:inline-block;
                       .bankName{
                            display: block;
                            font-size:12px;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                            line-height:12px;
                            margin-bottom:3px;
                        }
                        .bankNum{
                            font-size:18px;
                            font-weight:400;
                            color:rgba(102,102,102,1);
                            line-height:18px;
                        }
                   }
                    
                }
             }
           
         }
         .bottom{
            width:85%;
            margin:70px auto;
            text-align: left;
            font-family:PingFangSC-Medium,PingFang SC;
             .bottomTitle{
                font-size:14px;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:20px;
                padding-left:5px;
                border-left:5px solid @globleColor;
                margin:-40px 0 30px 0;
             }
             ol{
                 width:100%;
                 margin-bottom:24px;
                 li{
                     width:100%;
                     border-radius:8px;
                     border:1px solid rgba(230,230,230,1);
                     margin-bottom:30px;
                     box-shadow:0px 0px 5px 0px rgba(225,233,255,1);
                    .liTitle{
                        width:100%;
                        padding:8px 0;
                        background:rgba(234,240,255,1);
                        line-height:30px;
                        box-sizing: border-box;
                        color:@globleColor;
                        padding:15px 0 15px 16px;

                        em{
                            font-style:normal;
                            display: inline-block;
                            width:7px;
                            height:7px;
                            border-radius: 50%;
                            background:@globleColor;
                            margin-right:15px
                        }
                        div{
                            font-size:10px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            line-height:10px;
                            margin-left:20px;
                        }
                        
                    }
                    .lipadding{
                        padding-bottom:20px;
                    }
                    .li_one{
                        width:100%;
                        height:50px;
                        border-bottom:1px solid rgba(230,230,230,1);
                        display: flex;
                        justify-content: space-between;
                            align-items: center;
                        a{
                            display:block;
                            width:94.5%;
                            margin:auto;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            // padding:10px 0;
                          .left{
                                width:70%;
                                margin-left:20px;
                                font-size:14px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                .blackText{
                                    color:rgba(102,102,102,1);
                                    line-height:16px;
                                }
                                .redText{
                                    color:#FF4A58;
                                    line-height:16px;
                                }
                            }
                            .right{
                                img{
                                    width:8px;
                                    height:13px;
                                }
                            }
                        }
                    }
                    .li_one:last-child{
                        border:0;
                    }
                    

                 }
             }
         }
        
    }
</style>