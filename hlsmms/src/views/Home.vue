<template>
  <el-container id="home">
    <!-- 左侧 导航菜单-->
    <el-aside width="230px">
      <!-- 左侧顶部的标题 -->
      <div id="leftTitle">
        <h1>华联超市管理系统</h1>
        <p>你好，Admin</p>
        <p>
          <a>管理首页</a> |
          <a>退出系统</a>
        </p>
      </div>
      <!-- 左侧菜单 -->
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true">
        <!-- 第1个菜单 -->
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="1-1">分类管理</el-menu-item>
          <el-menu-item index="1-2">添加分类</el-menu-item>
        </el-submenu>

        <!-- 第2个菜单 -->
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="1-1">商品管理</el-menu-item>
          <el-menu-item index="1-2">添加商品</el-menu-item>
        </el-submenu>

        <!-- 第3个菜单 -->
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item index="1-1">库存管理</el-menu-item>
          <el-menu-item index="1-2">添加库存</el-menu-item>
        </el-submenu>

        <!-- 第4个菜单 -->
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item index="1-1">销售列表</el-menu-item>
          <el-menu-item index="1-2">商品出库</el-menu-item>
          <el-menu-item index="1-3">商品退货</el-menu-item>
        </el-submenu>

        <!-- 第5个菜单 -->
        <el-submenu index="5">
          <template slot="title">
            <span>统计管理</span>
          </template>
          <el-menu-item index="1-1">销售统计</el-menu-item>
          <el-menu-item index="1-2">进货统计</el-menu-item>
        </el-submenu>

        <!-- 第6个菜单 -->
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="1-1">账号管理</el-menu-item>
          <el-menu-item index="1-2">添加账号</el-menu-item>
          <el-menu-item index="1-3">密码修改</el-menu-item>
        </el-submenu>
        <!-- 第7个菜单 -->
        <el-submenu index="7">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="1-1">账号管理</el-menu-item>
          <el-menu-item index="1-2">添加账号</el-menu-item>
        </el-submenu>

        <!-- 第8个菜单 -->
        <el-submenu index="8">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">系统信息</el-menu-item>
          <el-menu-item index="1-2">系统配置</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
          <el-menu-item index="1-4">添加管理组</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 页头 -->
      <el-header height="auto">
        <h1>你好,Admin</h1>
        <p>查看详细的系统信息</p>
      </el-header>
      <!-- 中间内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>系统信息</h3>
          </div>
          <div class="text item">
            <el-alert title="商品总数:5。已经销售的总金额:890.00。库存商品总价:1235.82" type="warning" show-icon>
            </el-alert>
            <el-alert title="导入数据" type="warning" show-icon>
            </el-alert>
            <!-- 栅格系统 一行两列 -->
            <el-row :gutter="40">
              <!-- 左侧 -->
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h3>销售排行</h3>
                  </div>
                  <div class="text item">
                    <el-table :data="tableData" stripe style="width: 100%">
                      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                      <el-table-column prop="salenum" label="销量"></el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
              <!-- 右侧 -->
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h3>缺货的商品</h3>
                  </div>
                  <div class="text item">
                    <el-table :data="tableData2" stripe style="width: 100%">
                      <el-table-column prop="nogood" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="goodnum" label="库存">
                      </el-table-column>
                      <el-table-column prop="handle" label="操作">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-main>

      <!-- 页脚 -->
      <el-footer height="50px">
        <p>&copy;Copyright2018华联超市管理系统</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isOpened: true,
      tableData: [
        { goodsname: "海飞丝去屑洗发水", salenum: 8 },
        { goodsname: "茅台酒", salenum: 6 },
        { goodsname: "龙凤呈祥", salenum: 5 },
        { goodsname: "龙凤呈祥2", salenum: 2 }
      ],
      tableData2: [{ nogood: "我的优乐美", goodnum: 0, handle: "入库" }]
    };
  },
  components: {},
  //菜单展开和收起的方法
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */
</style>

