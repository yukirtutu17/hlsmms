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
            <h3>商品管理</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <!-- 搜索 eleUI-form的行内表单调换位置-->
            <div>
              <!-- 设置 inline 属性可以让表单域变为行内的表单域 -->
              <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-form-item label="所属分类">
                  <el-select v-model="formSearch.classname" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关键词">
                  <el-input id="keywords" v-model="formSearch.keywords" placeholder="查询商品名称、条形码"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="onSearch()" icon="el-icon-search">查询</el-button>
                </el-form-item>
              </el-form>
              <!-- 关键字加id-->
              <!-- 查询内放一个放大镜图标,在type内改颜色  -->

            </div>
            <div id="searchBox"></div>
            <!-- 管理列表 -->
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="日期" width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" width="180">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>姓名: {{ scope.row.name }}</p>
                      <p>住址: {{ scope.row.address }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                      <i class="el-icon-delete"></i>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 页码  -->
            <!-- 设置background属性可以为分页按钮添加背景色。 -->
            <div id="pagerBox">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,2,3,5,10,20,50,100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" background :total="36">
              </el-pagination>
            </div>
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
      //查询的表单
      formSearch: {
        //↓替换掉上面的名字
        classname: "",
        keywords: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
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
    },
    //查询按钮执行的方法
    onSearch() {
      //上面的进行改名
      console.log("submit!");
    },
    //分页执行的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
</style>

