<template>
    <div class="martDeatils">
         <div class="top">
                <span class='title'>Market Transfer</span>
                <img class='back' @click='back()' src="../../../../assets/img/homeStatus/marketDeatails3.png" alt="">
                <van-divider dashed>Sisa Pengembalian</van-divider>
                <div class="content">
                    <img class='logo' src="../../../../assets/img/homeStatus/marketDeatails1.png" alt="">
                    <div class="text">
                         <div class="textTitle">Kode Market</div>
                         <div class="num">{{code}}</div>
                         <p class="time">Waktu efektif:{{expiryDate}}</p>
                    </div>
                    <div class="article">
                        <div class="articleTitle">
                            <img class='articleImg' src="../../../../assets/img/homeStatus/marketDeatails2.png" alt="">
                            <span>Panduan Pelunasan</span>
                            <img class='articleImg' src="../../../../assets/img/homeStatus/marketDeatails2.png" alt="">
                            <div>
                                <!-- {{help}} -->
                                Kunjungi Alfamart terdekat sebelum waktu tertera pada invoice berakhir <br/>Informasikan Kasir untuk melakukan membayar ke "Qcash" <br/>Apabila Kasir tidak mengenali "Qcash", maka tunjukkanlah nama "Qcash" kepada Kasir tersebutb Beritahu atau tunjukkan kode pembayaran tertera di invoice kepada Kasir<br/> Lakukanlah pembayaran sesuai dengan jumlah yang tertera di invoice<br/> Terimalah tanda terima pembayaran dari Alfamart sebagai bukti pembayaran <br/>Selamat! Pembayaran sudah selesai.
                            </div>
                        </div>
                    </div>
                </div>
         </div>
       
    </div>
</template>
<script>
   import hasorderServiceApi from "../../../../services/api/hasorder.service"
   export default{
       data(){
           return {
               expiryDate:'',//过期时间
               help:'',//便利店还款指南
               amount:'',//还款金额
               code:'',//还款码
           }
       },
       methods: {
           back(){
               this.$router.push({
                   name:'shouldrepayhasorder'
               })
           },
           getMarketRepay(){
               hasorderServiceApi.getMarketRepay().then(res=>{
                //    console.log(res)
                   this.expiryDate = res.data.expiryDate
                //    this.help = res.data.help.replace('<br>','\n')
                   this.amount = res.data.amount
                   this.code = res.data.code
               })
           }

       },
        mounted(){
            this.getMarketRepay()
        }
   }
</script>
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
    .martDeatils{
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
            .title{
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:14px;
            }
            .content{
                width:90%;
                height:475px;
                margin:-10px auto;
                background:#fff;
                box-sizing: border-box;
                padding:15px;
                text-align: left;
                .logo{
                    width:72px;
                    height:27px;
                }
                .text{
                    text-align: center;
                    margin:14px 0 30px 0;
                    box-sizing: border-box;
                    padding-bottom:10px;
                    border-bottom:1px dashed #ddd;
                    .textTitle{
                        font-size:13px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:14px;
                    }
                    .num{
                        font-size:32px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:45px;
                        margin-top:7px;
                    }
                    .time{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:17px;
                    }
                    .line{
                        width:80%;
                        color:#fff;
                    }
                   
                }
                .article{
                    text-align: center;
                    .articleTitle{
                        // display: flex;
                        // align-items: center;
                        span{
                            font-size:16px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height:23px;
                        }
                        .articleImg{
                            width:20px;
                            height:19px;
                            vertical-align: middle;
                        }
                        div{
                            text-align: left;
                            width:300px;
                            margin-top:15px;
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height:20px;
                        }
                    }
                }
            }
        }
        
    }  
    .van-coupon-list__empty p, .van-divider{
        width:75%;
        margin:36px auto;
        color:#fff; 
    }
   
</style>