<template>
  <div class="baseinfo_page">
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="0"></md-steps>
    </div>
    <div class="loanInfo">
      <div class="title">Produk dipilih</div>
      <div class="detailInfo">
        <span class="count">Rp.{{amount}}</span>
        <span class="time">{{days}} Hari</span>
      </div>
      <div class="discribe">
        <span class="countdis">Jumlah Pinjaman</span>
        <span class="timedis">Durasi</span>
      </div>
    </div>
    <div class="stepLabel">
      <stepLabel title="Tentang Anda" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSource"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChange"
        @childClick="handleChooseOpInfo"
      />
    </div>
    <div class="tip">contoh: JI.H.Muhi rt *** rt** no.20 pondok pinang kebayoran lama jakarta selata</div>

    <van-button
      @click="handleCommitBaseInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Berikutnya</van-button>
    <!--底部弹框 性别-->
    <van-popup v-model="showBtmPalForSex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsSex"
        :default-index="defaultSexIndex"
        @confirm="onSexConfirm"
        @cancel="showBtmPalForSex = false"
      />
    </van-popup>

    <!--底部弹框 学历-->
    <van-popup v-model="showBtmPalForEducation" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsEducation"
        :default-index="defaultEducationIndex"
        @confirm="onEducationConfirm"
        @cancel="showBtmPalForEducation = false"
      />
    </van-popup>

    <!--底部弹框 职业-->
    <van-popup v-model="showBtmPalForProfession" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsProfession"
        :default-index="defaultProfessionIndex"
        @confirm="onProfessionConfirm"
        @cancel="showBtmPalForProfession = false"
      />
    </van-popup>

    <!--底部弹框 地址-->
    <van-popup v-model="showBtmPalForAddress" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        @change="onChange"
        @cancel="showBtmPalForAddress = false"
        @confirm="onAddressConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import stepLabel from "../../../../components/stepLabel";
import addressData from "../../../../assets/data/region.json";
import moment from "moment";
import noorderServiceApi from "../../../../services/api/noorder.service";
import androidIosServiceApi from "../../../../services/androidIos.service";
import formatVertify from "../../../../lib/formatVertify";

import { Steps } from "mand-mobile";

export default {
  name: "baseinfo_page",
  data() {
    return {
      amount: "", //金额
      days: "", //天数

      //性别
      showBtmPalForSex: false,
      columnsSex: ["wanita", "Laki-laki"], //女、男
      defaultSexIndex: 0,
      selectSexIndex: "0",

      //学历
      showBtmPalForEducation: false,
      columnsEducation: [
        "sekalah dasar", //小学
        "smp", //初中
        "sma", //高中
        "junior college", //大专
        "universitas", //大学
        "tuan", //硕士
        "doktor" //博士学位
      ],
      defaultEducationIndex: 0,
      selectEducationIndex: "0",

      //职业
      showBtmPalForProfession: false,
      columnsProfession: [
        "karyawan swasta", //私人雇员
        "wiraswasta", //企业家
        "karyawan bumn", //国有企业员工
        "pegawai negeri sipil", //公务员
        "mahasiswa/pelajar", //学生
        "TNI/polisi", //警察
        "penslunan", //退休
        "profesional/dokter", //医生
        "pengacara", //律师
        "menganggur", //失业
        "other" //其他
      ],
      defaultProfessionIndex: 0,
      selectProfessionIndex: "0",

      //居住地址
      showBtmPalForAddress: false,
      //areaList: addressInfo,
      selectAddressInfo: [],

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
      itemSource: [
        {
          key: 1,
          minLabel: "Nama lengkap", //全名
          paramValue: "",
          placeHolder: "Nama lengkap",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 2,
          minLabel: "Nama lbu Kandung", //母姓
          paramValue: "",
          placeHolder: "Nama lbu Kandung",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 3,
          minLabel: "Jenis kelamin", //性别
          paramValue: "",
          placeHolder: "Jenis kelamin",
          readOnly: true,
          showIcon: true
        },
        {
          key: 4,
          minLabel: "Pendidikan terakhir", //学历
          paramValue: "",
          placeHolder: "Pendidikan terakhir",
          readOnly: true,
          showIcon: true
        },
        {
          key: 5,
          minLabel: "Pekerjaan", //职业
          paramValue: "",
          placeHolder: "Pekerjaan",
          readOnly: true,
          showIcon: true
        },
        {
          key: 6,
          minLabel: "NIK",
          paramValue: "",
          placeHolder: "NIK",
          readOnly: false,
          showIcon: false,
          maxLength: 16
        },
        {
          key: 7,
          minLabel: "Kota tinggal", //居住地址
          paramValue: "",
          placeHolder: "Kota tinggal",
          readOnly: true,
          showIcon: true
        },
        {
          key: 8,
          minLabel: "Alamat lengkap", //详细地址
          paramValue: "",
          placeHolder: "Alamat lengkap",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 9,
          minLabel: "Email",
          paramValue: "",
          placeHolder: "Email",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      columns: [
        {
          values: [],
          className: "column1"
        },
        {
          values: [],
          className: "column2",
          defaultIndex: 0
        },
        {
          values: [],
          className: "column3",
          defaultIndex: 0
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
    //回退
    handleGoBack() {
      this.$router.push({ path: "/home/loanmainnoorder", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    //基础信息提交
    handleCommitBaseInfo() {
      if (this.btnBottomDisable) {
        return;
      }
      if (!this.amount || !this.days) {
        this.$toast({
          message: "Harap kembali ke beranda untuk memilih nomor dan hari!"
        });
        return;
      }
      //名字 邮箱校验
      if (!formatVertify.vertifyNameFormat(this.itemSource[0].paramValue)) {
        return;
      }

      if (!formatVertify.vertifyNameFormat(this.itemSource[1].paramValue)) {
        return;
      }

      if (!formatVertify.vertifyIdFormat(this.itemSource[5].paramValue)) {
        return;
      }

      if (!formatVertify.vertifyEmailFormat(this.itemSource[8].paramValue)) {
        return;
      }

      let param = {};
      param.amount = this.amount;
      param.days = this.days;
      param.name = this.itemSource[0].paramValue;
      param.motherName = this.itemSource[1].paramValue;
      param.sex = this.selectSexIndex;
      param.education = this.selectEducationIndex;
      param.occupation = this.selectProfessionIndex;
      param.idCardNo = this.itemSource[5].paramValue;
      //param.maritalStatus = this.selectMarryIndex + 1;
      param.privince = this.selectAddressInfo[0];
      param.city = this.selectAddressInfo[1];
      param.district = this.selectAddressInfo[2];
      param.addressDetail = this.itemSource[7].paramValue;
      param.email = this.itemSource[8].paramValue;

      noorderServiceApi.commitBaseInfo(param).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/workinfo",
            query: { orderId: res.data }
          });
        }
      });
    },
    //子控件值变化回调函数
    handleChildChange(val, key) {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSource[_index].paramValue = val;

      this.monitorData();
    },
    //点击控件显示相应底部面板回调
    handleChooseOpInfo(key) {
      switch (key) {
        case 3: //性别
          {
            this.showBtmPalForSex = true;
          }
          break;
        case 4: //学历
          {
            this.showBtmPalForEducation = true;
          }
          break;
        case 5: //职业
          {
            this.showBtmPalForProfession = true;
          }
          break;
        case 7: //居住地址
          {
            this.showBtmPalForAddress = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },
    //性别确认
    onSexConfirm(value, index) {
      this.itemSource[2].paramValue = value;
      this.selectSexIndex = index;
      this.showBtmPalForSex = false;

      this.monitorData();
      console.log(value, index);
    },
    //学历
    onEducationConfirm(value, index) {
      this.itemSource[3].paramValue = value;
      this.selectEducationIndex = index;
      this.showBtmPalForEducation = false;

      this.monitorData();
      console.log(value, index);
    },
    //职业
    onProfessionConfirm(value, index) {
      this.itemSource[4].paramValue = value;
      this.selectProfessionIndex = index;
      this.showBtmPalForProfession = false;

      this.monitorData();
      console.log(value, index);
    },
    //地址
    onAddressConfirm(value, index) {
      this.itemSource[6].paramValue = value.map(n => n).join(",");
      this.selectAddressInfo = value;
      this.showBtmPalForAddress = false;

      this.monitorData();
      console.log(value, index);
    },
    initAddressPicker() {
      let firstColumnArr, secColumnArr, thirdColumnArr;
      firstColumnArr = addressData.map(item => {
        return item.label;
      });
      this.columns[0].values = firstColumnArr;

      secColumnArr = addressData[0].children;

      this.columns[1].values = secColumnArr.map(item => {
        return item.label;
      });

      thirdColumnArr = secColumnArr[0].children;
      this.columns[2].values = thirdColumnArr.map(item => {
        return item.label;
      });
    },
    //地址三级变化
    onChange(picker, values) {
      //每次设置完一列数据要重新获取values最新值
      let _value = values;
      let secColumnArr, thirdColumnArr;
      for (let i = 0; i < addressData.length; i++) {
        if (addressData[i].label == _value[0]) {
          secColumnArr = addressData[i].children;
          break;
        }
      }

      picker.setColumnValues(
        1,
        secColumnArr.map(item => {
          return item.label;
        })
      );
      _value = picker.getValues();

      for (let j = 0; j < secColumnArr.length; j++) {
        if (secColumnArr[j].label == _value[1]) {
          thirdColumnArr = secColumnArr[j].children;
          break;
        }
      }
      picker.setColumnValues(
        2,
        thirdColumnArr.map(item => {
          return item.label;
        })
      );
    },
    //监测数据是否填写
    monitorData() {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.paramValue.trim() == "";
      });

      console.log("index " + _index);

      if (_index < 0) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    getBaseInfo() {
      //获取基本信息
      noorderServiceApi.getBaseInfo().then(res => {
        if (res.businessCode == "0000" || res.businessCode == "0002") {
          //姓名
          this.itemSource[0].paramValue = res.data.name;
          //母姓
          this.itemSource[1].paramValue = res.data.motherName;

          //性别
          this.defaultSexIndex = res.data.sex;
          this.selectSexIndex = res.data.sex;
          this.itemSource[2].paramValue = this.columnsSex[res.data.sex];

          //学历
          this.defaultEducationIndex = res.data.education;
          this.selectEducationIndex = res.data.education;
          this.itemSource[3].paramValue = this.columnsEducation[
            res.data.education
          ];
          //职业
          this.defaultProfessionIndex = res.data.occupation;
          this.selectProfessionIndex = res.data.occupation;
          this.itemSource[4].paramValue = this.columnsProfession[
            res.data.occupation
          ];
          //NIK
          this.itemSource[5].paramValue = res.data.idCardNo;

          //现居地址
          this.selectAddressInfo.push(res.data.province);
          this.selectAddressInfo.push(res.data.city);
          this.selectAddressInfo.push(res.data.district);
          this.itemSource[6].paramValue =
            res.data.province + "," + res.data.city + "," + res.data.district;

          //详细地址
          this.itemSource[7].paramValue = res.data.addressDetail;
          //邮箱
          this.itemSource[8].paramValue = res.data.email;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    let _query = this.$route.query;
    this.amount = _query.amount;
    this.days = _query.days;

    this.getBaseInfo();

    this.initAddressPicker();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.baseinfo_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .loanInfo {
    width: 295px;
    height: 80px;
    padding: 20px 25px;
    margin-top: 16px;
    background: @globleColor;
    border-radius: 4px;
    .title {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 12px;
      text-align: left;
    }
    .detailInfo {
      display: flex;
      justify-content: space-between;
      margin: 18px 0 10px 0;
      .count {
        font-size: 17px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
      .time {
        width: 70px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 26px;
        text-align: left;
      }
    }
    .discribe {
      display: flex;
      justify-content: space-between;
      .countdis {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
      }
      .timedis {
        display: inline-block;
        width: 70px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
        text-align: left;
      }
    }
  }
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
    margin: 20px 0 40px 0;
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

.baseinfo_page {
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
}
</style>