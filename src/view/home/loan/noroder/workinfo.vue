<template>
  <div class="workinfo_page">
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="1"></md-steps>
    </div>
    <!--基本信息-->
    <div class="stepLabel">
      <stepLabel title="Informasi Dasar" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceBaseInfo"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeBaseInfo"
        @childClick="handleChooseOpInfo"
      />
    </div>
    <!--工作信息-->
    <div class="stepLabel">
      <stepLabel title="Informasi Pekerjaan" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceWork"
        :key="key"
        :inputType="item.inputType"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeWorkInfo"
        @childClick="handleChooseOpInfo"
      />
    </div>
    <!--家庭成员-->
    <div class="stepLabel">
      <stepLabel title="Anggota keluarga" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceFamily"
        :key="key"
        :inputType="item.inputType"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeFamily"
        @childClick="handleChooseOpInfo"
      />
    </div>
    <!--朋友-->
    <div class="stepLabel">
      <stepLabel title="Teman" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceFrient"
        :key="key"
        :inputType="item.inputType"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeFrient"
        @childClick="handleChooseOpInfo"
      />
    </div>

    <!--同事-->
    <div class="stepLabel">
      <stepLabel title="Reken kerja" />
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceColleague"
        :key="key"
        :gKey="item.key"
        :inputType="item.inputType"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeColleague"
        @childClick="handleChooseOpInfo"
      />
    </div>

    <van-button
      @click="handleCommitWorkInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Berikutnya</van-button>

    <!--底部弹框 贷款目的-->
    <van-popup v-model="showBtmPalForLoanpurpose" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsLoanpurpose"
        :default-index="defaultLoanpurposeIndex"
        @confirm="onLoanpurposeConfirm"
        @cancel="showBtmPalForLoanpurpose = false"
      />
    </van-popup>

    <!--底部弹框 月薪-->
    <van-popup v-model="showBtmPalForSalary" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsSalary"
        :default-index="defaultSalaryIndex"
        @confirm="onSalaryConfirm"
        @cancel="showBtmPalForSalary = false"
      />
    </van-popup>

    <!--*******************家庭成员*******************-->
    <!--底部弹框 关系-->
    <van-popup v-model="showBtmPalForFamilyRelation" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnRelation"
        :default-index="defaultFamilyRelationIndex"
        @confirm="onFamilyRelationConfirm"
        @cancel="showBtmPalForFamilyRelation = false"
      />
    </van-popup>
    <!--底部弹框 性别-->
    <van-popup v-model="showBtmPalForFamilySex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnSex"
        :default-index="defaultFamilySexIndex"
        @confirm="onFamilySexConfirm"
        @cancel="showBtmPalForFamilySex = false"
      />
    </van-popup>

    <!--*******************朋友*******************-->
    <!--底部弹框 性别-->
    <van-popup v-model="showBtmPalForFriendSex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnSex"
        :default-index="defaultFriendSexIndex"
        @confirm="onFriendSexConfirm"
        @cancel="showBtmPalForFriendSex = false"
      />
    </van-popup>
    <!--*******************同事*******************-->
    <!--底部弹框 性别-->
    <van-popup v-model="showBtmPalForColleagueSex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnSex"
        :default-index="defaultColleagueSexIndex"
        @confirm="onColleagueSexConfirm"
        @cancel="showBtmPalForColleagueSex = false"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import stepLabel from "../../../../components/stepLabel";
import moment from "moment";
import noorderServiceApi from "../../../../services/api/noorder.service";
import androidIosServiceApi from "../../../../services/androidIos.service";
import process from "../../../../lib/process";

import { Steps } from "mand-mobile";
import formatVertify from "../../../../lib/formatVertify";
export default {
  name: "workinfo_page",
  data() {
    return {
      orderId: "",
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
      itemSourceBaseInfo: [
        {
          key: 1,
          minLabel: "Tujuan pinjaman", //贷款目的
          paramValue: "",
          placeHolder: "Tujuan pinjaman",
          readOnly: true,
          showIcon: true
        }
      ],
      itemSourceWork: [
        {
          key: 2,
          minLabel: "Nama perusahaan", //公司名称
          paramValue: "",
          placeHolder: "Nama perusahaan",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 3,
          minLabel: "Telepon perusahaan", //公司电话
          paramValue: "",
          placeHolder: "Telepon perusahaan",
          readOnly: false,
          showIcon: false,
          maxLength: 14
        },
        {
          key: 4,
          minLabel: "Alamat perusahaan", //公司地址
          paramValue: "",
          placeHolder: "Alamat perusahaan",
          readOnly: false,
          showIcon: false,
          maxLength: 100
        },
        {
          key: 5,
          minLabel: "Gaji bulanan", //月薪
          paramValue: "",
          placeHolder: "Gaji bulanan",
          readOnly: true,
          showIcon: true
        },
        {
          key: 6,
          minLabel: "Tanggal gajian(1-31)", //发薪日
          paramValue: "",
          placeHolder: "Tanggal gajian(1-31)",
          readOnly: false,
          showIcon: false,
          maxLength: 2,
          inputType: "number"
        }
      ],

      //家庭成员
      itemSourceFamily: [
        {
          key: 7,
          minLabel: "Nama lengkap", //姓名
          paramValue: "",
          placeHolder: "Nama lengkap",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 8,
          minLabel: "Jenis kelamin", //性别
          paramValue: "",
          placeHolder: "Jenis kelamin",
          readOnly: true,
          showIcon: true
        },
        {
          key: 9,
          minLabel: "Nomor telepon", //手机号
          paramValue: "",
          placeHolder: "Nomor telepon",
          readOnly: false,
          showIcon: false,
          maxLength: 14,
          inputType: "number"
        },
        {
          key: 10,
          minLabel: "Orang dua", //关系
          paramValue: "",
          placeHolder: "Orang dua",
          readOnly: true,
          showIcon: true
        }
      ],

      //朋友
      itemSourceFrient: [
        {
          key: 11,
          minLabel: "Nama lengkap", //姓名
          paramValue: "",
          placeHolder: "Nama lengkap",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 12,
          minLabel: "Jenis kelamin", //性别
          paramValue: "",
          placeHolder: "Jenis kelamin",
          readOnly: true,
          showIcon: true
        },
        {
          key: 13,
          minLabel: "Nomor telepon", //手机号
          paramValue: "",
          placeHolder: "Nomor telepon",
          readOnly: false,
          showIcon: false,
          maxLength: 14,
          inputType: "number"
        }
      ],

      //同事
      itemSourceColleague: [
        {
          key: 14,
          minLabel: "Nama lengkap", //姓名
          paramValue: "",
          placeHolder: "Nama lengkap",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 15,
          minLabel: "Jenis kelamin", //性别
          paramValue: "",
          placeHolder: "Jenis kelamin",
          readOnly: true,
          showIcon: true
        },
        {
          key: 16,
          minLabel: "Nomor telepon", //手机号
          paramValue: "",
          placeHolder: "Nomor telepon",
          readOnly: false,
          showIcon: false,
          maxLength: 14,
          inputType: "number"
        }
      ],

      //贷款目的
      showBtmPalForLoanpurpose: false,
      columnsLoanpurpose: [
        "perawatan kesehatan", //健康医疗
        "pembayaran hutang", //偿还债务
        "kewiraswastaan paruh waktu", //兼职创业
        "produk digital", //数码产品
        "pendidikan dan pelatihan", //教育培训
        "bedah plastik kosmetik", //美容整形
        "biaya perjalanan", //旅行消费
        "rumah/dekorasi", //家居／装修
        "menyewa", //租房
        "omset operasi", //运营周转
        "menikah", //结婚
        "beli mobil", //买车
        "beli rumah" //买房
      ],
      defaultLoanpurposeIndex: 0,
      selectLoanpurposeIndex: "0",

      //月薪
      showBtmPalForSalary: false,
      columnsSalary: [
        "0-2 Juta",
        "2-4 Juta",
        "4-6 Juta",
        "6-8 Juta",
        "8-10 Juta",
        "Lebih dari 10 Juta"
      ],
      defaultSalaryIndex: 0,
      selectSalaryIndex: "0",

      //性别
      columnSex: [
        "wanita", //女
        "Laki-laki" //男
      ],

      //家庭成员--性别
      showBtmPalForFamilySex: false,
      defaultFamilySexIndex: 0,
      selectFamilySexIndex: "0",

      //朋友--性别
      showBtmPalForFriendSex: false,
      defaultFriendSexIndex: 0,
      selectFriendSexIndex: "0",

      //同事--性别
      showBtmPalForColleagueSex: false,
      defaultColleagueSexIndex: 0,
      selectColleagueSexIndex: "0",

      //关系
      columnRelation: [
        "orang tua", //父母 key值为8
        "pasangan", //配偶 9
        "anak", //孩子 10
        "kerabat tidak serumah" //亲戚 11
      ],

      //家庭成员
      showBtmPalForFamilyRelation: false,
      defaultFamilyRelationIndex: 0,
      selectFamilyRelationIndex: "0",

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
      this.$router.push({ path: "/firststep", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleCommitWorkInfo() {
      if (this.btnBottomDisable) {
        return;
      }

      if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
        return;
      }

      if (
        !formatVertify.vertifyPayDayFormat(this.itemSourceWork[4].paramValue)
      ) {
        return;
      }

      if (
        !formatVertify.vertifyTelFormat(this.itemSourceFamily[2].paramValue)
      ) {
        return;
      }

      if (
        !formatVertify.vertifyTelFormat(this.itemSourceFrient[2].paramValue)
      ) {
        return;
      }

      if (
        !formatVertify.vertifyTelFormat(this.itemSourceColleague[2].paramValue)
      ) {
        return;
      }

      if (
        !formatVertify.vertifySameTelFormat(
          this.itemSourceFamily[2].paramValue,
          this.itemSourceFrient[2].paramValue
        )
      ) {
        return;
      }
      if (
        !formatVertify.vertifySameTelFormat(
          this.itemSourceFamily[2].paramValue,
          this.itemSourceColleague[2].paramValue
        )
      ) {
        return;
      }

      if (
        !formatVertify.vertifySameTelFormat(
          this.itemSourceFrient[2].paramValue,
          this.itemSourceColleague[2].paramValue
        )
      ) {
        return;
      }

      process.getProcessStatus().then(res => {
        if (res == -1 || res == 1) {
          let param = {};
          param.orderId = this.orderId;
          param.companyName = this.itemSourceWork[0].paramValue;
          param.companyPhoneNo = this.itemSourceWork[1].paramValue;
          param.detailAddress = this.itemSourceWork[2].paramValue;
          param.purpose = this.selectLoanpurposeIndex;
          param.salary = this.selectSalaryIndex;
          param.payday = this.itemSourceWork[4].paramValue;

          let contacts = [];
          contacts.push({
            name: this.itemSourceFamily[0].paramValue,
            phoneNo: this.itemSourceFamily[2].paramValue,
            relation: this.selectFamilyRelationIndex + 8,
            gender: this.selectFamilySexIndex
          });

          contacts.push({
            name: this.itemSourceFrient[0].paramValue,
            phoneNo: this.itemSourceFrient[2].paramValue,
            relation: 13,
            gender: this.selectFriendSexIndex
          });

          contacts.push({
            name: this.itemSourceColleague[0].paramValue,
            phoneNo: this.itemSourceColleague[2].paramValue,
            relation: 14,
            gender: this.selectColleagueSexIndex
          });
          param.contacts = contacts;

          noorderServiceApi.commitWorkInfo(param).then(res => {
            if (res.code == 0) {
              // this.$router.push({
              //   path: "/idinfo",
              //   query: { orderId: this.orderId }
              // });
              androidIosServiceApi.toOCR(this.orderId.toString());
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    //基础信息--子控件值变化回调函数
    handleChildChangeBaseInfo(val, key) {
      let _index = this.itemSourceBaseInfo.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceBaseInfo[_index].paramValue = val;
      this.monitorData();
    },
    //工作信息--子控件值变化回调函数
    handleChildChangeWorkInfo(val, key) {
      let _index = this.itemSourceWork.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceWork[_index].paramValue = val;
      this.monitorData();
    },
    //家庭成员--子控件值变化回调函数
    handleChildChangeFamily(val, key) {
      let _index = this.itemSourceFamily.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceFamily[_index].paramValue = val;
      this.monitorData();
    },
    //朋友--子控件值变化回调函数
    handleChildChangeFrient(val, key) {
      let _index = this.itemSourceFrient.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceFrient[_index].paramValue = val;
      this.monitorData();
    },
    //同事--子控件值变化回调函数
    handleChildChangeColleague(val, key) {
      let _index = this.itemSourceColleague.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceColleague[_index].paramValue = val;
      this.monitorData();
    },
    //点击控件显示相应底部面板回调
    handleChooseOpInfo(key) {
      switch (key) {
        case 1: //贷款目的
          {
            this.showBtmPalForLoanpurpose = true;
          }
          break;
        case 5: //月薪
          {
            this.showBtmPalForSalary = true;
          }
          break;
        case 8: //家庭成员--性别
          {
            this.showBtmPalForFamilySex = true;
          }
          break;
        case 10: //家庭成员--关系
          {
            this.showBtmPalForFamilyRelation = true;
          }
          break;
        case 12: //朋友--性别
          {
            this.showBtmPalForFriendSex = true;
          }
          break;
        case 15: //同事--性别
          {
            this.showBtmPalForColleagueSex = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },
    //贷款目的
    onLoanpurposeConfirm(value, index) {
      this.itemSourceBaseInfo[0].paramValue = value;
      this.selectLoanpurposeIndex = index;
      this.showBtmPalForLoanpurpose = false;

      this.monitorData();
      console.log(value, index);
    },
    //职业
    onJobConfirm(value, index) {
      this.itemSource[1].paramValue = value;
      this.selectJobIndex = index;
      this.showBtmPalForJob = false;

      this.monitorData();
      console.log(value, index);
    },

    //月薪
    onSalaryConfirm(value, index) {
      this.itemSourceWork[3].paramValue = value;
      this.selectSalaryIndex = index;
      this.showBtmPalForSalary = false;

      this.monitorData();
      console.log(value, index);
    },
    //家庭成员--关系
    onFamilyRelationConfirm(value, index) {
      this.itemSourceFamily[3].paramValue = value;
      this.selectFamilyRelationIndex = index;
      this.showBtmPalForFamilyRelation = false;

      this.monitorData();
      console.log(value, index);
    },
    //家庭成员--性别
    onFamilySexConfirm(value, index) {
      this.itemSourceFamily[1].paramValue = value;
      this.selectFamilySexIndex = index;
      this.showBtmPalForFamilySex = false;

      this.monitorData();
      console.log(value, index);
    },
    //朋友--性别
    onFriendSexConfirm(value, index) {
      this.itemSourceFrient[1].paramValue = value;
      this.selectFriendSexIndex = index;
      this.showBtmPalForFriendSex = false;

      this.monitorData();
      console.log(value, index);
    },
    //同事--性别
    onColleagueSexConfirm(value, index) {
      this.itemSourceColleague[1].paramValue = value;
      this.selectColleagueSexIndex = index;
      this.showBtmPalForColleagueSex = false;

      this.monitorData();
      console.log(value, index);
    },
    //监测数据是否填写
    monitorData() {
      let _indexBaseInfo = this.itemSourceBaseInfo.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      let _indexWork = this.itemSourceWork.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      let _indexFamily = this.itemSourceFamily.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      let _indexFrient = this.itemSourceFrient.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      let _indexColleague = this.itemSourceColleague.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue.trim() == "";
      });

      if (
        _indexBaseInfo < 0 &&
        _indexWork < 0 &&
        _indexFamily < 0 &&
        _indexFrient < 0 &&
        _indexColleague < 0
      ) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //获取工作信息
    getWorkInfo() {
      noorderServiceApi.getWorkInfo().then(res => {
        if (res.code == 0) {
          //贷款目的
          this.defaultLoanpurposeIndex = res.data.purpose;
          this.selectLoanpurposeIndex = res.data.purpose;
          this.itemSourceBaseInfo[0].paramValue = this.columnsLoanpurpose[
            res.data.purpose
          ];

          //公司名称
          this.itemSourceWork[0].paramValue = res.data.companyName;

          //公司电话
          this.itemSourceWork[1].paramValue = res.data.companyPhoneNo;

          //公司地址
          this.itemSourceWork[2].paramValue = res.data.detailAddress;

          //薪资
          this.defaultSalaryIndex = res.data.salary;
          this.selectSalaryIndex = res.data.salary;
          this.itemSourceWork[3].paramValue = this.columnsSalary[
            res.data.salary
          ];

          //发薪日
          this.itemSourceWork[4].paramValue =
            (res.data.payday && res.data.payday.toString()) || "";

          let contacts = res.data.contacts;
          //***********家庭成员**************/

          this.itemSourceFamily[0].paramValue =
            res.data.familyContacts[res.data.familyContacts.length - 1].name;

          this.defaultFamilySexIndex =
            res.data.familyContacts[res.data.familyContacts.length - 1].gender;
          this.selectFamilySexIndex =
            res.data.familyContacts[res.data.familyContacts.length - 1].gender;
          this.itemSourceFamily[1].paramValue = this.columnSex[
            res.data.familyContacts[res.data.familyContacts.length - 1].gender
          ];

          this.itemSourceFamily[2].paramValue =
            res.data.familyContacts[res.data.familyContacts.length - 1].phoneNo;

          this.defaultFamilyRelationIndex =
            res.data.familyContacts[
              res.data.familyContacts.length - 1
            ].relation;
          this.selectFamilyRelationIndex =
            res.data.familyContacts[
              res.data.familyContacts.length - 1
            ].relation;
          console.log(
            res.data.familyContacts[res.data.familyContacts.length - 1].relation
          );

          this.itemSourceFamily[3].paramValue = this.columnRelation[
            res.data.familyContacts[res.data.familyContacts.length - 1]
              .relation - 8
          ];

          //***********朋友**************/
          this.itemSourceFrient[0].paramValue =
            res.data.friendContacts[res.data.friendContacts.length - 1].name;

          this.defaultFriendSexIndex =
            res.data.friendContacts[res.data.friendContacts.length - 1].gender;
          this.selectFriendSexIndex =
            res.data.friendContacts[res.data.friendContacts.length - 1].gender;
          this.itemSourceFrient[1].paramValue = this.columnSex[
            res.data.friendContacts[res.data.friendContacts.length - 1].gender
          ];

          this.itemSourceFrient[2].paramValue =
            res.data.friendContacts[res.data.friendContacts.length - 1].phoneNo;

          //***********同事**************/
          this.itemSourceColleague[0].paramValue =
            res.data.coworkerContacts[
              res.data.coworkerContacts.length - 1
            ].name;

          this.defaultColleagueSexIndex =
            res.data.coworkerContacts[
              res.data.coworkerContacts.length - 1
            ].gender;
          this.selectColleagueSexIndex =
            res.data.coworkerContacts[
              res.data.coworkerContacts.length - 1
            ].gender;
          this.itemSourceColleague[1].paramValue = this.columnSex[
            res.data.coworkerContacts[
              res.data.coworkerContacts.length - 1
            ].gender
          ];

          this.itemSourceColleague[2].paramValue =
            res.data.coworkerContacts[
              res.data.coworkerContacts.length - 1
            ].phoneNo;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;

    this.getWorkInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.workinfo_page {
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
  }
  .btnnext {
    width: @component-width;
    height: 48px;
    margin: 20px 0 40px 0;
    background: @globleColor;
    box-shadow: 0px 4px 10px 0px @globleColor;;
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

.workinfo_page {
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