<template>
 <!-- 审核中 -->
  <div class='under_revier'>
    <div>
      <homeStatusHeader :amount='amount' title='Uang datang' line='Jumlah Dicairkan'></homeStatusHeader>
    </div>
    <div class='content'>
      <div class="top">
          <img src="../../../../assets/img/homeStatus/under1.png" alt="">
          <div>
            <span>Daftar</span>
            <span>Verifikasi</span>
            <span>Pencairan</span>
          </div>
      </div>
      <div class="middle">
          <img src="../../../../assets/img/homeStatus/under2.png" alt="">
          <p>Verifikasik</p>
          <span>Menunggu pemeriksaan harap bersabar</span>
      </div>
    </div>
  </div>
</template>

<script>
import homeStatusHeader from '../../../../components/homeStatusHeader';
import process from "../../../../lib/process";
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";
export default {
  name: "loan_main_hasorder_page",
  data() {
    return {
      amount: '',
      desc: '',
    };
  },
  components: {
    homeStatusHeader
  },
  methods: {
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.amount = numOperation.amountFormat(parseFloat(res.data.amount))
      });
    }
  },
  mounted() {
    this.getOrderStatus()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../../assets/style/var.less";
    .under_revier{
      .content{
        width:100%;
        height:calc(100vh - 207px);
        background-image:url('../../../../assets/img/homeStatus/background.png');
        position: relative;
        z-index: 1;
        top:-10px;
        .top{
          box-sizing: border-box;
          padding-top:85px;
          img{
            width:197px;
            height:22px;
          }
          div span{
            display: inline-block;
            width:90px;
            font-size:12px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:@globleColor;
            line-height:12px;
            margin-bottom:25px;
          }
          div span:last-child{
            color:rgba(153,153,153,1);
          }
        }
        .middle{
          img{
            width:105px;
            height:108px;
          }
          p{
            font-size:26px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:@globleColor;
            line-height:26px;
          }
          span{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:14px;
          }
        }
      }
      
    }
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>