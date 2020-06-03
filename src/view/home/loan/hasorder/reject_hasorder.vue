<template>
<!-- 审核拒绝 -->
  <div class="reject_hasorder_page">
    <div class='under_revier'>
      <div>
        <homeStatusHeader :amount='amount' title='Uang datang' line='Jumlah Dicairkan'></homeStatusHeader>
      </div>
      <div class='content'>
        <div class="top">
            <img src="../../../../assets/img/homeStatus/reject1.png" alt="">
            <div>
              <span>Daftar</span>
              <span>Verifikasi</span>
              <span>Pencairan</span>
            </div>
        </div>
        <div class="middle">
            <img src="../../../../assets/img/homeStatus/reject2.png" alt="">
            <span class='textT'>Hasil review di tolak</span>
            <span class='reason'>{{desc}}</span>
        </div>
        <button @click='goloanmainnoorder()'>Ajukan Kembali</button>
      </div>
  </div>
   
  </div>
</template>

<script>
import homeStatusHeader from '../../../../components/homeStatusHeader';
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";

export default {
  name: "reject_hasorder_page",
  data() {
    return {
      amount: '',
      desc: '',
      orderId:''
    };
  },
  components: {
    homeStatusHeader
  },
  methods: {
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        // console.log(res)
        this.amount = numOperation.amountFormat(parseFloat(res.data.amount));
        this.desc = res.data.desc;
        this.orderId = res.data.orderId
      });
    },
    goloanmainnoorder(){
      hasorderServiceApi.getcloseLoan({orderId:this.orderId}).then(res=>{
        //  console.log(res)
        this.$router.push({ path: "/loanmainnoorder", query: "" });
      })
     
    },
  },
  mounted() {
    this.getOrderStatus()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.reject_hasorder_page {
  .under_revier{
      .content{
        width:100%;
        height:calc(100vh - 207px);
        // background:red;
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
          .textT{
            display: block;
            font-size:26px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(238,89,89,1);
            line-height:26px;
            margin:20px 0;
          }
          .reason{
            display: block;
            width:92%;
            margin:auto;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:14px;
          }
        }
        button{
           border:0;
           outline: none;
           width: 280px;
           height: 45px;
           background:@globleColor;
           color:#fff;
           border-radius: 30px;
           margin-top:19px;
        }
      }

      
    }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>