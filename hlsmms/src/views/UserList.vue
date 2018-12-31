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
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
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
      ]
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
    getusers(){
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
    handleEdit(index, row) {
      console.log(index, row);
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
            type: 'success'
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
          his.$message.error('出错了：'+err.message); //调用消息框给用户提示
        });
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

