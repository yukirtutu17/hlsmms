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
            <!-- 会员管理-添加账号 -->
            <h3>添加编辑账号</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="真实名字:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="会员卡卡号:" prop="memCard">
                <el-input v-model="ruleForm.memCard"></el-input>
              </el-form-item>

              <el-form-item label="用户组:" prop="memgroup">
                <el-select v-model="ruleForm.memgroup" placeholder="普通会员-99%">
                  <el-option label="普通会员-99%" value="普通会员"></el-option>
                  <el-option label="高级会员-1%" value="高级会员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号:" prop="idCard">
                <el-input v-model="ruleForm.idCard"></el-input>
              </el-form-item>

              <el-form-item label="用户状态" prop="state">
                <el-radio-group v-model="ruleForm.state">
                  <el-radio label="启用"></el-radio>
                  <el-radio label="禁用"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item label="座机号码:" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
              </el-form-item>

              <el-form-item label="邮箱地址:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>

              <!-- 三级联动选择器 -->

              <el-form-item label="详细地址:" prop="adress">
                <el-input v-model="ruleForm.adress"></el-input>
              </el-form-item>

              <el-form-item label="邮政编码:" prop="zip">
                <el-input v-model="ruleForm.zip"></el-input>
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
        menCard: "",
        region: "",
        idCard: "",
        state: "",
        phone: "",
        tel: "",
        email: "",
        adress: "",
        zip: "",
        delivery: false
        // type: [],
        // desc: ""
      },
      //验证规则
      rules: {
        //添加真实姓名验证规则
        name: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "真实姓名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "真实姓名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        //添加会员卡号验证规则
        memCard: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "会员卡号必须填写" },
          //min: 1 最小长度   max: 18 最大长度
          {
            min: 1,
            max: 18,
            message: "会员卡号长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        //请选择用户组验证规则--拷贝elementUI修改
        memgroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ],
        //添加身份证号码验证规则
        idCard: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 18 最小长度   max: 19 最大长度
          {
            min: 18,
            max: 19,
            message: "用户名长度在 18个字符",
            trigger: "blur"
          }
        ],
        //用户状态验证规则
        state: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ]
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加成功");
          this.$router.push("/memberlist");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  //三级联动菜单

};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
</style>

