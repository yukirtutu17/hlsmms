<template>
  <el-container id="home">
    <!-- 左侧 导航菜单-->
    <el-aside width="200px">
      <!-- 左侧菜单 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
      >
        <!-- 第1个菜单 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item index="1-1">分类管理</el-menu-item>
          <el-menu-item index="1-2">添加分类</el-menu-item>
        </el-submenu>

        <!-- 第2个菜单 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="1-1">商品管理</el-menu-item>
          <el-menu-item index="1-2">添加商品</el-menu-item>
        </el-submenu>

        <!-- 第3个菜单 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>进货管理</span>
          </template>
          <el-menu-item index="1-1">库存管理</el-menu-item>
          <el-menu-item index="1-2">添加库存</el-menu-item>
        </el-submenu>

        <!-- 第4个菜单 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>出货管理</span>
          </template>
          <el-menu-item index="1-1">销售列表</el-menu-item>
          <el-menu-item index="1-2">商品出库</el-menu-item>
          <el-menu-item index="1-3">商品退货</el-menu-item>
        </el-submenu>

        <!-- 第5个菜单 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>统计管理</span>
          </template>
          <el-menu-item index="1-1">销售统计</el-menu-item>
          <el-menu-item index="1-2">进货统计</el-menu-item>
        </el-submenu>

        <!-- 第6个菜单 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="1-1">账号管理</el-menu-item>
          <el-menu-item index="1-2">添加账号</el-menu-item>
          <el-menu-item index="1-2">密码修改</el-menu-item>          
        </el-submenu>   
        <!-- 第7个菜单 -->
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>会员管理</span>
          </template>
          <el-menu-item index="1-1">账号管理</el-menu-item>
          <el-menu-item index="1-2">添加账号</el-menu-item>
        </el-submenu>  

        <!-- 第8个菜单 -->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">系统信息</el-menu-item>
          <el-menu-item index="1-2">系统配置</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
          <el-menu-item index="1-3">添加管理组</el-menu-item>          
        </el-submenu>                 
      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 页头 -->
      <el-header></el-header>
      <!-- 内容 -->
      <el-main></el-main>
      <!-- 页脚 -->
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  //菜单展开和收起的方法
  methods: {
    handleOpen(key, keyPath) {
    //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
    //console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>

