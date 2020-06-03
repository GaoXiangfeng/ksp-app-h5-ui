<template>
  <div class="master_page">
    <div v-if="showMaster" class="master">
      <van-loading size="24px" vertical>memuat...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "master",
  data() {
    return {};
  },
  props: {
    showMaster: {
      type: Boolean,
      default: false,
    }
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.master {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 998;
  pointer-events: none; //不能操作
}
</style>