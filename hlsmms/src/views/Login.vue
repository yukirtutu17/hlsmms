<template>
  <div id="loginbox">
        <!-- 卡片组件： 登录的外框 -->
        <el-card class="box-card" id="login">
            <div slot="header" class="clearfix">
            <h2>用户登录</h2>
            </div>
            <div class="text item">
            <!-- 表单组件：登录的表单 -->
            <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userpwd">
                <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
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
// 暴露一个模块： 登录组件
export default {
    data() {
      //返回的数据
      return {
        //数据对象  
        ruleForm2: {
          userpwd: '',
          username: ''
        },
        //验证规则
        rules2: {
          username: [
            //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息" 
            { required: true, trigger: 'blur', message: "用户名必须填写" },
            //min: 6 最小长度   max: 18 最大长度
            { min: 6, max: 18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          userpwd: [
            { required: true, trigger: 'blur', message: "密码必须填写" },
            { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //提交表单的方法
      submitForm(formName) {
        //调用组件的验证方法提交表单是验证  
        this.$refs[formName].validate((valid) => {
          //valid参数表示验证的结果，true表示验证通过，false验证失败
          if (valid) {
            //alert('√ 表单验证成功!');
            //发起ajax请求去后端做数据库的验证
            //location.href="/";
            /* 1）前端——完成表单验证后直接发起ajax请求到后端 http://127.0.0.1:8080/#/login 
            合法： 写入cookie，返回成功true标识，   非法：不写cookie，返回失败false标识
            4）前端——根据返回的结果提示登录成功还是失败
            登录成就跳转到管理中心首页，登录失败不跳转 */

            //************************ 让ajax携带cookie证书********************************
            this.axios.defaults.withCredentials=true;

            let reqUrl="http://127.0.0.1:9090/user/checkLogin"; //后端的api地址
            this.axios.post(
              reqUrl,
              this.qs.stringify(this.ruleForm2)
            ).then(result=>{
               if(result.data.isOk){
                  //登录成功
                   this.$message({
                      message: '恭喜你，'+result.data.msg,
                      type: 'success'
                   });
                   this.$router.push("/"); //使用路由对象的push实现跳转
               }
               else{
                 //登录失败
                 this.$message.error(result.data.msg);
               }
            }).catch(err=>{
               this.$message.error('错了哦'+err.message);
            });
          } else {
            alert('× 表单验证失败!');
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
   #loginbox{
       background-color: rgb(54, 54, 54);
   }
   #login{
       width: 520px;
       height: 300px;
       /* 让盒子水平和垂直绝对居中 */
       position: absolute;
       left: 0;
       top: 0;
       right: 0;
       bottom: 0;
       margin: auto;
   }

   .el-card__header{
       padding: 0px 20px !important;
   }
</style>


