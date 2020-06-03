<template>
  <div class='header'>
      <span class='title'>{{title}}</span>
      <div class='content'>
         <div class="top">
            <van-divider dashed :style="{ width:'80%',height: '1px',color: '#fff', borderColor: '#fff' ,margin: '10px auto'}">{{line}}</van-divider>
         </div>
         <div class="bottom">
             <span>Rp {{amount}}</span>
         </div>
         <div class="time">{{time}}</div>
      </div>
  </div>
</template>

<script>

export default {
  props:{
      amount:{
          type:String
      },
      title:{
          type:String
      },
      time:{
          type:String
      },
      line:{
          type:String
      }
  },
  name: "loan_main_hasorder_page",
  data() {
    return {
      
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../assets/style/var.less";
    .header{
        width:100%;
        height:207px;
        background-image: url('../assets/img/homeStatus/titleImg.png');
        background-size:100% 100%;
        .title{
            display:inline-block; 
            font-size:18px;
            font-family:HelveticaNeue;
            color:rgba(255,255,255,1);
            line-height:22px;
            box-sizing: border-box;
            margin-top:34px;
        }
        .content{
            width:90%;
            height:172px;
            background:@globleColor;
            border-radius:8px;
            margin:22px auto;
            box-sizing: border-box;
            padding:35px 20px;
            position: relative;
            z-index:3;
            .bottom span{
                font-size:38px;
                font-family:HelveticaNeue-Medium,HelveticaNeue;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:40px;
                margin-top:28px;
            }
            .time{
                font-size:13px;
                color:#fff;
                margin-top:10px;
                font-family:HelveticaNeue-Medium,HelveticaNeue;
                font-weight:500;
            }
        }
    }
    .van-coupon-list__empty p, .van-divider{
         font-size:14px;
        font-family:HelveticaNeue-Medium,HelveticaNeue;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:14px;
    }
</style>
<style lang="less">
</style>