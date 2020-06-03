<template>
  <div class="bankinfo_page">
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="3"></md-steps>
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceBank"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeBank"
        @childClick="handleChooseOpInfoBank"
      />
    </div>

    <!--授权-->
    <van-cell
      v-if="!isCallBookAuth"
      class="unauth"
      title="Beri otorisasi kontak"
      @click="handleAuthClick"
      value="Tidak"
    >
      <img slot="right-icon" class="myicon" src="../../../../assets/img/common/arrowright.png" alt />
    </van-cell>
    <van-cell v-if="isCallBookAuth" class="auth" title="Beri otorisasi kontak" value="Sudah">
      <img slot="right-icon" class="myicon" src="../../../../assets/img/common/arrowright.png" alt />
    </van-cell>

    <!--附加信息-->
    <div class="stepLabel">
      <stepLabel title="Informasi tambahan" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceFJ"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeFJ"
        @childClick="handleChooseOpInfoBank"
      />
    </div>
    <div class="tip">Informasi tambahan akan sangat meningkatkan tingkat kelulusan verifikasi</div>

    <van-button
      @click="handleCommitBankInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >KIRIM</van-button>

    <!--底部弹框 银行名称-->
    <van-popup v-model="showBtmPalForBankName" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsBankName"
        :default-index="defaultBankNameIndex"
        @confirm="onBankNameConfirm"
        @cancel="showBtmPalForBankName = false"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import stepLabel from "../../../../components/stepLabel";
import noorderServiceApi from "../../../../services/api/noorder.service";
import androidIosServiceApi from "../../../../services/androidIos.service";
import formatVertify from "../../../../lib/formatVertify";
import process from "../../../../lib/process";

import { Steps } from "mand-mobile";
export default {
  name: "bankinfo_page",
  data() {
    return {
      orderId: "",
      isCallBookAuth: false,
      active: 2,
      steps: [
        {
          name: "Tentang Anda"
        },
        {
          name: "Informasi Dasar"
        },
        {
          name: "Dokumen"
        },
        {
          name: "Rekening Bank"
        }
      ],
      //银行名称
      showBtmPalForBankName: false,
      columnsBankName: [],
      defaultBankNameIndex: 0,
      selectBankNameIndex: "0",
      bankList: [],

      itemSourceBank: [
        {
          key: 1,
          minLabel: "Nama bank", //银行名称
          paramValue: "",
          placeHolder: "Nama bank",
          readOnly: true,
          showIcon: true
        },
        {
          key: 2,
          minLabel: "Nomor rekening bank", //帐号
          paramValue: "",
          placeHolder: "Nomor rekening bank",
          readOnly: false,
          showIcon: false,
          maxLength: 16
        },
        {
          key: 3,
          minLabel: "Nama lengkap pemegang rekening", //持卡人姓名
          paramValue: "",
          placeHolder: "Nama lengkap pemegang rekening",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      //附加信息
      itemSourceFJ: [
        {
          key: 4,
          minLabel: "Mohon mengisi Nomor NPWP", //附加信息
          paramValue: "",
          placeHolder: "Mohon mengisi Nomor NPWP",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      //底部按钮是否可用
      btnBottomDisable: true
    };
  },
  components: {
    myheader,
    [Steps.name]: Steps,
    inputMiniLabel,
    stepLabel
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/idinfo", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleAuthClick() {
      androidIosServiceApi.authCallBook();
    },

    handleCommitBankInfo() {
      if(this.btnBottomDisable){
        return
      }
      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
            return;
          }



          //名字--持卡人
          if (
            !formatVertify.vertifyNameFormat(this.itemSourceBank[2].paramValue)
          ) {
            return;
          }

          //银行账号
          if (
            !formatVertify.vertifyBankAcountNoFormat(
              this.itemSourceBank[1].paramValue
            )
          ) {
            return;
          }

          let param = {};
          param.orderId = Number(this.orderId);
          //银行信息
          param.bankName = this.itemSourceBank[0].paramValue;
          param.bankCode = this.bankList[this.selectBankNameIndex].code;

          param.bankAccount = this.itemSourceBank[1].paramValue;
          param.holderName = this.itemSourceBank[2].paramValue;

          param.taxNo = this.itemSourceFJ[0].paramValue;

          // this.$router.push({
          //   name: "loandetail",
          //   params: { orderId: this.orderId, param: param }
          // });

          noorderServiceApi.commitOtherInfo(param).then(res => {
            if (res.code == 0) {
              process.goToProcessPage();
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    //子控件值变化回调函数--银行信息********************************
    handleChildChangeBank(val, key) {
      let _index = this.itemSourceBank.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceBank[_index].paramValue = val;
      this.monitorData();
    },
    //子控件值变化回调函数--附加信息********************************
    handleChildChangeFJ(val, key) {
      let _index = this.itemSourceFJ.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceFJ[_index].paramValue = val;
      this.monitorData();
    },
    //选择控件--银行信息
    handleChooseOpInfoBank(key) {
      switch (key) {
        case 1: //银行名称
          {
            this.showBtmPalForBankName = true;
          }
          break;
          break;
        default:
          break;
      }

      console.log("click " + key);
    },

    //银行名称
    onBankNameConfirm(value, index) {
      this.itemSourceBank[0].paramValue = value;
      this.selectBankNameIndex = index;
      this.showBtmPalForBankName = false;
      console.log(value, index);
      this.monitorData();
    },

    //监测数据是否填写
    monitorData() {
      let _indexBank = this.itemSourceBank.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      let _indexFJ = this.itemSourceFJ.findIndex(function(value, index, arr) {
        return value.paramValue.trim() == "";
      });

      if (_indexBank < 0 && _indexFJ < 0 && this.isCallBookAuth) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //获取银行数据
    getBankList() {
      noorderServiceApi.getBankList().then(res => {
        if (res.code == 0) {
          this.bankList = res.data;
          this.columnsBankName = this.bankList.map(n => n.name);
        }
      });
    },

    //获取银行信息
    getBankInfo() {
      noorderServiceApi.getOtherInfo().then(res => {
        if (res.code == 0) {
          this.itemSourceBank[0].paramValue = res.data.bankName;
          this.itemSourceBank[1].paramValue = res.data.bankAccount;
          this.itemSourceBank[2].paramValue = res.data.holderName;

          this.itemSourceFJ[0].paramValue = res.data.taxNo;

          this.isCallBookAuth = res.data.callBook == 1 ? true : false;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;

    this.getBankList();
    //this.getBankInfo()

    window["phoneCallBack"] = () => {
      this.isCallBookAuth = true;
      this.monitorData();
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.bankinfo_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .steparea {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 120px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(174, 174, 174, 0.13);

    .step {
      width: 322px;
      margin-top: 10px;
    }
  }
  .stepLabel {
    width: 342px;
    height: 49px;
  }
  .item {
    width: 342px;
    .title {
      margin-top: 22px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(69, 69, 69, 1);
      line-height: 14px;
      text-align: left;
    }
  }
  .tip {
    width: 342px;
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: @globleColor;
    line-height: 18px;
    text-align: left;
  }
  .btnnext {
    width: @component-width;
    height: 48px;
    margin: 33px 0 40px 0;
    background: @globleColor;
    box-shadow: 0px 4px 10px 0px @globleColor;
    border-radius: 24px;
    border-width: 0;

    font-size: @font-size-base;
    font-family: LucidaGrande;
    color: rgba(255, 255, 255, 1);
  }
  .btnBottomDisable {
    background: rgba(200, 200, 200, 1) !important;
    box-shadow: 0px 4px 10px 0px rgba(226, 226, 226, 1) !important;
  }
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.bankinfo_page {
  .step {
    padding: 0 10px 45px 10px;
    .step-wrapper {
      .icon-wrapper {
        .md-icon {
          font-size: 20px;
          color: @globleColor;
        }
      }
      .text-wrapper {
        padding-top: 0px;
        .name {
          font-size: 14px;
          width: 72px;
          word-wrap: break-word;
          white-space: normal;
          line-height: 16px;
        }
      }
    }
    .step-wrapper.current .text-wrapper .name {
      color: @globleColor;
    }
    .step-wrapper.reached .icon-wrapper .step-node-default-icon {
      background: @globleColor;
    }
    .bar.horizontal-bar .bar-inner {
      background-color: @globleColor;
    }
  }
  .van-popup--bottom {
    .van-picker {
      .van-picker__toolbar {
        .van-picker__cancel {
          font-size: 15px;
        }
        .van-picker__confirm {
          font-size: 15px;
        }
      }
      .van-picker__columns {
        .van-picker-column {
          overflow-x: auto;
          overflow-y: hidden;
          font-family: Pingfang SC;
          .van-ellipsis {
            overflow: auto;
            text-overflow: unset;
          }
        }
      }
    }
  }
  .auth {
    display: flex;
    align-items: center;
    width: 342px;
    height: 63px;
    padding: 10px 0;
    // line-height: 63px;
    border-bottom: 0.5px solid rgba(230, 230, 230, 1);
    .van-cell__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 2;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      margin-right: 8px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: @globleColor;
      line-height: 14px;
      // span{
      //   line-height: 100%;
      // }
    }
    .myicon {
      display: block;
      width: 8px;
      height: 12px;
    }
  }
  .unauth {
    display: flex;
    align-items: center;
    width: 342px;
    height: 63px;
    padding: 10px 0;
    // line-height: 63px;
    border-bottom: 0.5px solid rgba(230, 230, 230, 1);
    .van-cell__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 2;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      margin-right: 8px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: red;
      line-height: 14px;
      // span{
      //   line-height: 100%;
      // }
    }
    .myicon {
      display: block;
      width: 8px;
      height: 12px;
    }
  }
}
</style>