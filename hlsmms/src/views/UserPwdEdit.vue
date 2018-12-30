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
            <h3>修改账号密码</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">

              <el-form-item label="原密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="新密码:" prop="passCheck">
                <el-input type="password" v-model="ruleForm2.passCheck" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="新密码:" prop="passCheck2">
                <el-input type="password" v-model="ruleForm2.passCheck2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
    //自定义验证2次密码是否一致--拷贝自定义校验规则 并去下面调用
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.passCheck) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    //返回的数据
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        passCheck: "",
        passCheck2: ""
      },
      //到elementUI拷贝验证规则进行修改
      //验证规则
      rules2: {
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          }
        ],
        passCheck: [
          { required: true, trigger: "blur", message: "新密码必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          }
        ],
        passCheck2: [
          { required: true, trigger: "blur", message: "新密码确认必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          },
          //调用自定义的验证方法验证两次密码是否一致
          { validator: validatePassword, trigger: "blur" }
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
    //提交表单的方法
    submitForm(formName) {
      //调用组件的验证方法提交表单验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果,true表示验证通过false表示验证失败
        if (valid) {
          //alert("表单验证成功啦!!");
          //发起ajax请求去后端做数据库验证
          //使用路由对象push实现跳转到首页Home
          this.$router.push("/");
        } else {
          //alert("表单验证失败哦!!");
          return false;
        }
      });
    },
    //重置表单的方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
</style>

