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
            <h3>添加管理员账号</h3>
          </div>
          <div class="text item">
            <!-- 模板内容-插入Login.vue表单模板 -->
            <!-- 表单组件:登录的表单 增加标签对齐方式为顶部对齐-->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="用户名:" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码:" prop="passCheck">
                <el-input type="password" v-model="ruleForm2.passCheck" autocomplete="off"></el-input>
              </el-form-item>
              <!-- elementUI找Form 表单  -v-model改成:model一致 -->
              <el-form-item label="选择用户组" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
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
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //返回的数据
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        username: "",
        passCheck: "",
        usergroup: ""
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
        ],
        passCheck: [
          { required: true, trigger: "blur", message: "确认密码必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          },
          //调用自定义的验证方法验证两次密码是否一致
          { validator: validatePassword, trigger: "blur" }
        ],
        //请选择用户组验证规则--拷贝elementUI修改
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
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
          //this.$router.push("/");

          //实现用户添加功能!!!!
          //1）获取用户数据
          console.log(this.ruleForm2);
          //2）使用axios发送请求到后端api:   http://172.16.4.254:9090/user/useradd
          this.axios
            .post(
              this.apiHost + "/user/useradd",
              this.qs.stringify(this.ruleForm2) //使用qs处理post的参数
            )
            .then(result => {
              console.log("服务器成功返回的结果", result);
              //result   {"isOk":true,"code":1,"msg":"用户添加成功！"}

              //3）根据返回的结果处理业务逻辑
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/userlist");
                }, 100);
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              console.error("服务器错误返回的信息", err);
            });
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

