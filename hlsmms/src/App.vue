<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

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
/* 让背景有高度而能在login.vue设置背景颜色 */
html,body,#app,#loginbox,#home{
  height:100%;
  margin:0;
}
</style>
