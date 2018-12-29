<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {},
  data() {
    return {

    }
  },
  methods: {
    
  }
};
</script>

<style>
/* 让背景有高度而能在login.vue设置背景颜色  剪切到公共样式*/
/* html,body,#app,#loginbox,#home,.el-aside{
  min-height:100%;
  margin:0;
} */
</style>
