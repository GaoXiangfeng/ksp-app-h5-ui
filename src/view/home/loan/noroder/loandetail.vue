<template>
  <div class="loandetail_page">
    <myheader @goback="handleGoBack" title="Chi tiết khoản vay" />
    <van-cell title="Số tiền vay" :value="'Rp.' + otherInfo.amount" />
    <van-cell title="Thời hạn cho vay" :value="otherInfo.days" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="Số lượng đến" name="1" :value="otherInfo.realAmount">
        <van-cell
          title="Lãi suất"
          :value="otherInfo.realAmountDetail.find(n => n.key == 'Lãi suất').value"
        />
        <van-cell
          title="Phí xử lý"
          :value="otherInfo.realAmountDetail.find(n => n.key == 'Phí dịch vụ').value"
        />
      </van-collapse-item>
    </van-collapse>

    <van-cell title="Số tiền đến hạn" :value="otherInfo.totalRepayAmount" />

    <van-button class="btnCommit" type="default" @click="handleCommitOtherInfo">Nộp</van-button>
  </div>
</template>

<script>
import process from "../../../../lib/process";
import myheader from "../../../../components/header";
import noorderServiceApi from "../../../../services/api/noorder.service";
import numOperation from "../../../../lib/numOperation";

export default {
  name: "loandetail_page",
  data() {
    return {
      activeNames: ["1"],
      orderId: "",
      bankInfo: {},
      otherInfo: {
        amount: "",
        days: 0,
        realAmount: "",
        realAmountDetail: [
          { key: "Lãi suất", value: "" },
          { key: "Phí dịch vụ", value: "" }
        ],
        totalRepayAmount: "1500000"
      }
    };
  },
  components: {
    myheader
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/bankinfo", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    getOtherInfo() {
      noorderServiceApi.getOtherInfo().then(res => {
        if (res.code == 0) {
          res.data.amount = numOperation.amountFormat(
            parseFloat(res.data.amount)
          );
          res.data.realAmount = numOperation.amountFormat(
            parseFloat(res.data.realAmount)
          );
          let lixi = res.data.realAmountDetail.find(n => n.key == "Lãi suất")
            .value;
          res.data.realAmountDetail.find(
            n => n.key == "Lãi suất"
          ).value = numOperation.amountFormat(parseFloat(lixi));
          let shouxufei = res.data.realAmountDetail.find(
            n => n.key == "Phí dịch vụ"
          ).value;
          res.data.realAmountDetail.find(
            n => n.key == "Phí dịch vụ"
          ).value = numOperation.amountFormat(parseFloat(shouxufei));
          res.data.totalRepayAmount = numOperation.amountFormat(
            parseFloat(res.data.totalRepayAmount)
          );

          this.otherInfo = res.data;
        }
      });
    },
    //提交其他信息
    handleCommitOtherInfo() {
      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          if (this.bankInfo && this.bankInfo != "") {
            noorderServiceApi.commitOtherInfo(this.bankInfo).then(res => {
              if (res.code == 0) {
                process.goToProcessPage()
              }
            });
          } else {
            this.$toast("Vui lòng quay lại bước trước để điền thông tin liên quan.!");
          }
        } else {
          process.goToProcessPage();
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.bankInfo = this.$route.params.param;
    this.getOtherInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.loandetail_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .btnCommit {
    width: @component-width;
    height: 48px;
    margin: 100px 0 40px 0;
    background: @globleColor;;
    box-shadow: 0px 4px 10px 0px @globleColor;;
    border-radius: 24px;
    border-width: 0;

    font-size: @font-size-base;
    font-family: LucidaGrande;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
.loandetail_page {
  .van-cell {
    width: 342px;
    padding: 10px 0;
    border-bottom: 1px solid #ebedf0;
    .van-cell__title {
      text-align: left;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(126, 126, 126, 1);
    }
    .van-cell__value {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(21, 21, 21, 1);
    }
  }
  .van-cell:not(:last-child)::after {
    left: 0px;
  }
  .van-collapse {
    width: 342px;
    padding: 0;
    border-top-width: 0;
    .van-collapse-item__wrapper {
      .van-collapse-item__content {
        padding: 0;
        text-align: right;
        .van-cell {
          width: 322px;
          padding: 10px 0;
          margin-left: 20px;
        }
      }
    }
    .van-cell:not(:last-child)::after {
      left: 0px;
    }
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top-width: 0;
  }
}
</style>