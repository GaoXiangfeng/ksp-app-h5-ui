<template>
  <!-- 贷款结清 -->
  <div class="repaySuccessed_hasorder_page">
    <img  class="resultimg" src="../../../../assets/img/homeStatus/repaySuccess.png" alt=""> 
    <div class="discribe">Selamat<br/> Pinjaman Lunas Bos!</div>
    <div class='discribeB'>Anda bisa mengajukan pinjaman berikutnya.</div>
    <van-button class="btnApplyagain" @click="handleApplyAgain" type="default">AJUKAN KEMBALI</van-button>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";
import process from "../../../../lib/process";

export default {
  name: "repaySuccessed_hasorder_page",
  data() {
    return {
      orderId: ""
    };
  },
  components: {
    myheader
  },
  methods: {
    handleGoBack() {
      process.goToProcessPage();
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleApplyAgain() {
      hasorderServiceApi.getcloseLoan({orderId:this.orderId}).then(res=>{
        //  console.log(res) 
        this.$router.push({
          name:'loanmainnoorder'
        })
      })
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.orderId = res.data.orderId;
      });
    }
  },
  mounted() {
    this.getOrderStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.repaySuccessed_hasorder_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .resultimg {
    display: block;
    width: 130px;
    height: 112px;
    margin: 64px 0 32px 0;
  }
  .discribe {
    font-size:26px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,75,89,1);
    line-height:34px;
    word-wrap: break-word;
    white-space: normal;
  }
  .discribeB{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:14px;
    margin:18px;
  }
  .btnApplyagain {
    width: 280px;
    height: 48px;
    margin-top: 23px;
    // background: linear-gradient(
    //   135deg,
    //   rgba(77, 107, 253, 1) 0%,
    //   rgba(77, 124, 253, 1) 100%
      
    // );
    background:@globleColor;
    box-shadow: 0px 4px 10px 0px rgba(164, 187, 255, 1);
    border-radius: 24px;
    border-width: 0;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
  }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>