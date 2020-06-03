
<template>
    <div class="repayPageBankInfo">
        <div class='title'>Mandiri 88608</div>
        <img class='backBankDetails' @click='backBankDetails()' src="../../../../assets/img/homeStatus/repayPage1.png" alt="">
        <div class="content">
            <ol>
                <div><em></em>ATM</div>
                <li>1. Masukkan kartu ATM danpilih "Bahasa Indonesia"</li>
                <li>2. Ketik nomor PIN dantekan BENAR</li>
                <li>3. Pilih menu “BAYAR/BELI”</li>
                <li>4. Ketik kode perusahaan,yaitu"88608"</li>
                <li>5. Ketik kode perusahaan,yaitu"88608" (Xendit 88608​), tekan "BENAR"</li>
                <li>6. Pilih menu “BAYAR/BELI”</li>
            </ol>    
        </div>
    </div>
</template>
<script>
   export default{
       methods:{
         backBankDetails(){
             this.$router.push({
                name:'bankDetails'
             })
         }
       }
   }
</script>
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
    .repayPageBankInfo{
        position: relative;
       .title{
           width:100%;
           margin-top:20px;
           border-bottom:1px solid rgba(230,230,230,1);
           font-size:18px;
           font-family:PingFangSC-Regular,PingFang SC;
           font-weight:400;
           color:rgba(51,51,51,1);
           line-height:40px;
       }
       .backBankDetails{
           width:10px;
           height:17px;
           position: absolute;
           top:10px;
           left:20px;
       }
        .English{
            width:80%;
            margin-left:73%;
            p{
                width:75px;
                height:24px;
                border-radius:70px;
                border:1px solid @globleColor;
                text-align: center;
                margin-top:16px;
                span{
                    font-size:12px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:@globleColor;
                    line-height:20px;
                }
            }
            
        }
        .content{
            ol{
                width:100%;
                text-align: left;
                div{
                    width:100%;
                    padding:15px 30px;
                    background:rgba(234,240,255,1);
                    margin-bottom:20px;
                    em{
                        font-style: normal;
                        display: inline-block;
                        width:7px;
                        height:7px;
                        background: @globleColor;
                        border-radius: 50%;
                        margin-right:8px;
                    }
                }
                li{
                    width:80%;
                    margin:auto;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:20px;
                    margin-bottom:15px;
                }
            }
        }
        
    }
</style>