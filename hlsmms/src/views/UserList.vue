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
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
import moment from 'moment';

export default {
  data() {
    return {
      tableData: [
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  //组件实例化之后执行的钩子  视图挂载完毕
  created() {
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

