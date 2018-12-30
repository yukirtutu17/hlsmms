<template>
  <el-container id="home">
    <!-- 左侧 导航菜单-->
    <LeftMenu></LeftMenu>
    <!-- 右侧 -->
    <!-- 伸缩布局 -->
    <el-container id="mainContent">
      <!-- 顶部 -->
      <RightTop></RightTop>
      <!-- 中间内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加分类</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <!-- 典型表单拷贝 -->
            <el-form ref="form" :model="form" label-width="80px">

              <el-form-item label="所属分类:">
                <el-select v-model="form.region">
                  <el-option label="商品管理" value="商品管理"></el-option>
                  <el-option label="进货管理" value="进货管理"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="分类名称:" prop="sort" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-radio-group v-model="form.resource">
                  <el-radio label="启用"></el-radio>
                  <el-radio label="禁用"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>

<script>
// 引入导航组件
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightBottom from "../components/rightBottom";

export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        resource: ""
      },
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
  /* 修改表单元素的默认宽度100% */

</style>

