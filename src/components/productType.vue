<template>
  <div class="productType">
    <div class="header">
      <div class="name">{{name}}</div>
      <div class="count">{{count}}</div>
    </div>
    <van-divider
      dashed
      :style="{ height: '1px',width: '94%',color: '#C5C5C5', borderColor: '#C5C5C5', padding: '0 12px' ,margin: '8px 0 14px 0'}"
    ></van-divider>
    <div class="detail">
      <div class="realinfo">
        <div class="realCount">{{realCount}}</div>
        <div class="discribe">{{discribe}}</div>
      </div>
      <button class="btnloan" @click="handleLoan">pinjaman</button>
    </div>
  </div>
</template> 

<script>
export default {
  name: "btnRepay",
  data() {
    return {};
  },
  props: {
    name: {
      type: String
    },
    count: {
      type: String
    },
    realCount: {
      type: String
    },
    discribe: {
      type: String
    },
  },
  methods: {
      //借款
      handleLoan(){
          this.$emit('handleLoanChild')
      }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.productType {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(223, 223, 223, 0.38);
  border-radius: 4px;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 21px;
    margin-top: 17px;
    .name {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 48, 1);
      line-height: 22px;
    }
    .count {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
  }
  .detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 21px;
    .realinfo {
      .realCount {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: @globleColor;
        line-height: 25px;
      }
      .discribe {
        margin-top: 6px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
    }
    .btnloan {
      width: 89px;
      height: 28px;
      background: @globleColor;
      border-radius: 15px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      outline: none;
      border:0;
    }
  }
}
</style>