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
            <h3>账号管理</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 table自定义列模板-->
            <el-table :data="tableData" style="width: 100%">

              <!-- 编号userid -->
              <el-table-column label="编号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.userid }}
                </template>
              </el-table-column>

              <!-- 账号 username-->
              <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.username }}
                </template>
              </el-table-column>

              <!-- 日期addData -->
              <el-table-column label="添加日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.addDate | foramtData }}</span>
                </template>
              </el-table-column>

              <!-- 用户组 usergroup-->
              <el-table-column label="用户组" width="180">
                <template slot-scope="scope">
                  {{ scope.row.usergroup }}
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"></i>编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>
      <!-- 修改用户资料的对话框 eleUI拷贝-->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 拷贝☆useradd.vue☆的表单 还需拷贝script的代码-->
                  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="用户名:" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码:" prop="userpwd">
                <el-input type="text" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
              </el-form-item>

              <!-- elementUI找Form 表单  -v-model改成:model一致 -->
              <el-form-item label="选择用户组" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              </el-form-item> -->
            </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定修改</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
// 引入导航组件
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightBottom from "../components/rightBottom";

//引入momentjs
import moment from "moment";

export default {
  data() {
    return {
      tableData: [
        //tableData相当于一个数组对象[{},{},{}...]
        //scope.row就是一行数据(数据对象)
        //清空静态数据，数据动态从数据库中获取
      ],
      dialogVisible: false, //控制对话框的显示true和隐藏false   
      //数据对象
      ruleForm2: {
        userpwd: "",
        username: "",
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
        userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "blur"
          }
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
    //6)-2组件实例化之后执行的钩子内的代码进行封装 方便下面两次调用
    getusers() {
      this.axios
        .get("http://127.0.0.1:9090/user/getusers")
        .then(result => {
          console.log("后端返回的数据", result.data);
          //处理前端的业务逻辑 把后端处理的用户的数据赋值给tableData属性
          this.tableData = result.data; //把返回的数据赋值给表格数据属性
          //前端的vue会自动渲染视图【自动】
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //编辑
    handleEdit(userid) {
      //(1)前端——点击编辑按钮：绑定事件执行修改的方法，获取编辑的id
      //console.log("编辑的用户id",userid);
      //(2)前端——发起ajax请求到后端获取旧的数据
      this.axios
        .get("http://127.0.0.1:9090/user/getuserbyid?userid=" + userid)
        .then(oldUserData => {
          console.log("服务器返回旧的数据", oldUserData);
          //5)前端——把旧的数据回填的表单中  data[0]才是需要的数据
          this.ruleForm2 = oldUserData.data[0]; //把旧的数据赋值给表单数据对象
          //5.1准备模态框 eleUI对话框  <el-dialog></el-dialog>放在底部下面 script内的也要复制
          //5.2使用双向数据绑定回填数据
          //显示eleUI拷贝的对话框 把false改成true
        this.dialogVisible=true;  //显示对话框          
        })
        .catch(err => {
          //调用eleUI代码
        this.$message.error('出错了：'+err.message); //调用消息框给用户提示          
        });
    },

    //删除按钮执行的方法  把index删除 只要对象:row:指每一行这个对象
    handleDelete(userid) {
      //1）前端—点击删除按钮：绑定事件执行删除的方法，根据id执行删除
      console.log("删除用户的id", userid);
      //2)前端-发起ajax请求到后端
      this.axios
        .get("http://127.0.0.1:9090/user/deluser?userid=" + userid)
        .then(result => {
          console.log("服务器返回的结果", result); //{"isOk":true,"code":1,"msg":"用户删除成功!"}
          //6)前端-根据返回的结果处理业务逻辑（删除成功就更新用户列表）
          result = result.data; //把它的对象赋值给它自己
          if (result.isOk) {
            // 删除成功
            //添加eleUI的成功提示代码
            this.$message({
              message: result.msg,
              type: "success"
            });
            //更新用户列表-再发起ajax请求删除后的数据并赋值给tableData利用mvvm的特点自动实现无刷新更新
            //如果使用 this.$router.push("/userlist");  //页面会整体刷新，用户体验差
            //把下面(组件实例化之后执行的钩子的代码再复制进来)--太麻烦 封装成方法 放在上面methods内
            //通过vue实例调用自定义方法,要加this
            this.getusers();
          } else {
            //删除失败 拷贝eleUI进行更改
            this.$message.error("出错了：" + result.msg);
          }
        })
        .catch(err => {
          //添加eleUI的消息提示代码
          his.$message.error("出错了：" + err.message); //调用消息框给用户提示
        });
    },
    //关闭对话框的确认方法-拷贝
   handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
   } 
  },
  //组件实例化之后执行的钩子  视图挂载完毕
  created() {
    //在复制↓在上面的methods进行封装 只需调用即可
    // this.axios
    //   .get("http://127.0.0.1:9090/user/getusers")
    //   .then(result => {
    //     console.log("后端返回的数据", result.data);
    //     //处理前端的业务逻辑 把后端处理的用户的数据赋值给tableData属性
    //     this.tableData = result.data; //把返回的数据赋值给表格数据属性
    //     //前端的vue会自动渲染视图【自动】
    //   })
    //   .catch(err => {
    //     console.error(err.message);
    //   });
    this.getusers();
  },
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY年MM月DD日");
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
</style>

