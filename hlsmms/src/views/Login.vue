<template>
  <!-- 最外层用一个loginbox包裹 -->
  <div id="loginbox">
    <!-- 卡片组件： 登录的外框 -->
    <!-- 添加id="login" -->
    <el-card class="box-card" id="login">
      <div slot="header" class="clearfix">
        <h2>用户登录</h2>
      </div>
      <div class="text item">
        <!-- 表单组件:登录的表单 -->
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//暴露一个模块:login登录组件
export default {
  data() {
    //返回的数据
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        username: ""
      },
      //到elementUI拷贝验证规则进行修改
      //验证规则
      rules2: {
        //添加登录名验证规则
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          }
        ]
      }
    };
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
          alert("表单验证失败哦!!");
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

<style>
/* 自己更改的样式*/
#loginbox {
  background: rgb(99, 201, 96);
}
#login {
  width: 550px;
  /* 让盒子水平和垂直绝对居中 */
  height: 280px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.el-card__header {
  padding: 0px 20px !important;
}
.el-button--default {
  margin-left: 200px !important;
}
</style>

