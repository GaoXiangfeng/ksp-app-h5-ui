<template>
  <div class="loginpage">
    <div class="regist">
      <span @click="handleToRegist">Đăng ký</span>
    </div>
    <div class="logo">
      <img class="img" src="../../assets/img/logo.png" alt />
      <div class="name">Creditdong</div>
    </div>
    <van-field
      class="phone"
      v-model="form.phoneNo"
      clearable
      label="+84"
      maxlength="9"
      label-width="40px"
      placeholder="Nhập số điện thoại"
      @input="monitorData"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/phone.png"
        alt
      />
    </van-field>
    <van-field
      class="vertifyCode"
      maxlength="4"
      v-model="form.imageCode"
      placeholder="Mời nhập mã xác nhận"
      v-if="showImgCode"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/vertifycode.png"
        alt
      />
      <img :src="image" class="vertifyImg" slot="button" alt />
    </van-field>
    <van-field
      class="passworld"
      type="password"
      v-model="form.password"
      placeholder="Nhập mật khẩu"
      maxlength="10"
      @input="monitorData"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/password.png"
        alt
      />
    </van-field>
    <div class="forgetPassword">
      <span @click="handleForgetPassword">Quên mật khẩu</span>
    </div>
    <van-button
      @click="handleLogin"
      class="btnlogin"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Đăng nhập</van-button>
  </div>
</template>

<script>
import loginServiceApi from "../../services/api/login.service";
import formatVertify from "../../lib/formatVertify";
import userService from "../../services/user.service";
import localStorage from "../../services/localStorage.service";
import { Toast } from "vant";

export default {
  name: "login",
  data() {
    return {
      form: {
        phoneNo: "", //手机号
        password: "", //密码
        imageCode: "", //验证码
        imageCodeId: "" //验证码id
      },
      showImgCode: false, //是否显示验证吗
      image: "",
      //底部按钮是否可用
      btnBottomDisable: true
    };
  },
  methods: {
    //to注册
    handleToRegist() {
      this.$router.push({ path: "/regist", query: "" });
    },
    //登录
    handleLogin() {
      //验证格式
      if (!formatVertify.vertifyPhoneFormat(this.form.phoneNo)) {
        return;
      }
      if (!formatVertify.vertifyPasswordFormat(this.form.password)) {
        return;
      }

      let param = JSON.parse(JSON.stringify(this.form));
      param.phoneNo = "84" + param.phoneNo;

      loginServiceApi.login(param).then(res => {
        if (res.code == 0) {
          this.showImgCode = false;
          userService.saveToken(res.data.token);
          localStorage.set("acount", this.form.phoneNo);

          this.$router.push({ path: "/" });
        } else {
          this.getImageCode();
          //如果连续输入错误，显示验证吗
          if (res.businessCode == "0008" || res.businessCode == "0010") {
            this.showImgCode = true;
          }
        }
      });
    },
    //获取图片验证码
    getImageCode() {
      loginServiceApi.getImageCode().then(res => {
        if (res.code == 0) {
          this.image = "data:image/png;base64," + res.data.image;
          this.form.imageCodeId = res.data.imageCodeId;
        }
      });
    },
    //监测数据是否填写
    monitorData() {
      if (this.form.phoneNo != "" && this.form.password != "") {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //忘记密码
    handleForgetPassword() {
      this.$router.push({ path: "/password", query: "" });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/style/var.less";
.loginpage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: Pingfang SC;
  .regist {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: @component-width;
    height: @header-height;
    margin-top: 20px;
    font-size: @font-size-base;
    text-align: right;
  }
  .logo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 38px;
    .img {
      display: block;
      width: 60px;
      height: 60px;
    }
    .name {
      font-size: @font-size-base;
      color: #999999;
    }
  }
  .phone {
    width: @component-width;
    height: 48px;
    margin-top: 45px;
    border: 1px solid #999999;
    border-radius: 2px;
  }
  .vertifyCode {
    width: @component-width;
    height: 48px;
    margin-top: 20px;
    border: 1px solid #999999;
    border-radius: 2px;
    .vertifyImg {
      display: block;
      width: 86px;
      height: 28px;
      border: 0px solid lightgreen;
      background: rgba(216, 216, 216, 1);
    }
  }
  .passworld {
    width: @component-width;
    height: 48px;
    margin-top: 20px;
    border: 1px solid #999999;
    border-radius: 2px;
  }
  .forgetPassword {
    width: @component-width;
    height: 12px;
    margin-top: 16px;
    text-align: right;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(77, 108, 253, 1);
    line-height: 12px;
  }
  .btnlogin {
    width: @component-width;
    height: 48px;
    margin-top: 55px;
    background: linear-gradient(
      140deg,
      rgba(77, 107, 253, 1) 0%,
      rgba(77, 124, 253, 1) 100%
    );
    box-shadow: 0px 4px 10px 0px rgba(164, 187, 255, 1);
    border-width: 0;
    border-radius: 24px;

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
<style lang="less">
@import "../../assets/style/var.less";
@import "../../assets/iconfont/iconfont.css";
//登录页面
.loginpage {
  .van-cell {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 6px;
    font-size: @font-size-field;
    line-height: @line-height-field;
    .van-field__left-icon {
      margin-right: 5px;
    }
    .van-cell__title {
      height: 26px;
      line-height: 29px;
      padding-right: 3px !important;
    }
    .van-cell__value {
      height: 26px;
      line-height: 29px;
      font-size: 20px!important;
      .van-field__control{
        letter-spacing:.5px;
      }
    }
  }
}
</style>
