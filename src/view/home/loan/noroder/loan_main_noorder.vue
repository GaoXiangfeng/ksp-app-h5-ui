<template>
  <div class="loan_main_noorder_page">
    <div class="title">Detik Pinjaman</div>
    <div class="content">
      <productType class="product"  v-for="(product,index) in products" :key="index"
        v-if="product.enable == 1"
        name="Jumlah Dicairkan" 
        :count="product.amount"
        :realCount="product.realAmount"
        discribe="Jumlah Pinjaman"
        @handleLoanChild="handleLoan(product)"/>
    </div>
    <master :showMaster="showMaster"/>
  </div>
</template>

<script>
import numOperation from "../../../../lib/numOperation";
import process from "../../../../lib/process";
import homeServiceApi from "../../../../services/api/home.service";
import androidIosServiceApi from "../../../../services/androidIos.service";
import userService from "../../../../services/user.service";
import productType from "../../../../components/productType";
import master from "../../../../components/master";

export default {
  name: "loan_main_noorder_page",
  data() {
    return {
      products:[],
      showMaster: true
    };
  },
  methods: {
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        if(res.data.status == -1 || res.data.status == 1){
          this.products = res.data.products
          this.showMaster =false
        }else{
          process.goToProcessPage().then(()=>{
            this.showMaster =false
          })
        }
      })
    },
    handleLoan(product){
      this.$router.push({
        path: "/baseinfo",
        query:{
          amount: product.amount,
          days: product.days
        }
      })
    }
  },
  components: {
    productType,
    master
  },
  mounted() {
    this.getOrderStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.loan_main_noorder_page {
  padding: 15px;
  position: relative;
  .title {
    margin-top:29px;
    font-size:18px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(70,70,70,1);
    line-height:25px;
    text-align:left; 
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .product {
      width: 345px;
      height: 122px;
      margin-top: 16px;
    }
  }
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.loan_main_noorder_page {
}
</style>