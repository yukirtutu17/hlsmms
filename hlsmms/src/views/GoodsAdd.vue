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
            <h3>添加商品</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <!-- form表单验证 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="所属分类:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="选择分类">
                  <el-option label="优乐美" value="优乐美"></el-option>
                  <el-option label="海飞丝" value="海飞丝"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="商品名称:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="商品售价:" prop="price">
                <el-input v-model="ruleForm.price"></el-input>元
              </el-form-item>

              <el-form-item label="市场价:" prop="marketPrice">
                <el-input v-model="ruleForm.marketPrice"></el-input>元
                <p>默认市场价为售价的1.2倍</p>
              </el-form-item>

              <el-form-item label="商品进价:" prop="openingPrice">
                <el-input v-model="ruleForm.openingPrice"></el-input>元
              </el-form-item>

              <el-form-item label="入库数量:" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
                <p>计重商品单位为千克</p>
              </el-form-item>

              <el-form-item label="商品重量:" prop="weight">
                <el-input v-model="ruleForm.weight"></el-input>
              </el-form-item>

              <el-form-item label="商品单位:" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
              </el-form-item>

              <el-form-item label="会员优惠" prop="discounts">
                <el-radio-group v-model="ruleForm.discounts">
                  <el-radio label="享受"></el-radio>
                  <el-radio label="不享受"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否促销" prop="sale">
                <el-radio-group v-model="ruleForm.sale">
                  <el-radio label="启用"></el-radio>
                  <el-radio label="禁用"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="商品简介:" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                <p>不超过200个汉字</p>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
      ruleForm: {
        name: "",
        price: "",
        marketPrice: "",
        openingPrice: "",
        num: "",
        weight: "",
        unit: "",
        region: "",
        discounts: "",
        sale: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],

        region: [{ required: true, message: "选择分类", trigger: "change" }],

        discounts: [
          { required: true, message: "请选择会员优惠", trigger: "change" }
        ],
        sale: [{ required: true, message: "是否促销", trigger: "change" }],
          desc: [
            { required: true, message: '请填写商品简介', trigger: 'blur' }
          ]
      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
.el-form-item__content{
  line-height:10px !important;
}
</style>

