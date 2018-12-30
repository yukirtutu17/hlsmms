import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//引入登录组件
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/useradd',
      //账号管理-添加账号
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserAdd.vue')
    },
    //账号管理-账号管理
    {
      path: '/userlist',
      component: () => import(/* webpackChunkName: "UserList" */ './views/UserList.vue')
    },
    //账号管理-密码修改
    {
      path: '/pwdedit',
      component: () => import(/* webpackChunkName: "PwdEdit" */ './views/UserPwdEdit')
    },
    // ------------------分类管理--------------------------
    //分类管理-分类管理
    {
      path: '/sortmanage',
      component: () => import(/* webpackChunkName: "SortManage" */ './views/SortManage.vue')
    },
    //分类管理-添加分类
    {
      path: '/manageadd',
      component: () => import(/* webpackChunkName: "ManageAdd" */ './views/ManageAdd.vue')
    },

    //------------------------ 商品管理--------------------------
    //商品管理-商品管理
    {
      path: '/goodsmanage',
      component: () => import(/* webpackChunkName: "GoodsManage" */ './views/GoodsManage.vue')
    },
    //商品管理-添加商品
    {
      path: '/goodsadd',
      component: () => import(/* webpackChunkName: "GoodsAdd" */ './views/GoodsAdd.vue')
    },

    //--------------------------进货管理---------------------------------
    //进货管理-库存管理
    {
      path: '/stockmanage',
      component: () => import(/* webpackChunkName: "StockManage" */ './views/StockManage.vue')
    },
    //进货管理-添加库存
    {
      path: '/stockadd',
      component: () => import(/* webpackChunkName: "StockAdd" */ './views/StockAdd.vue')
    },

    //--------------------------出货管理---------------------------------
    //出货管理-商品退货
    {
      path: '/returngoods',
      component: () => import(/* webpackChunkName: "ReturnGoods" */ './views/ReturnGoods.vue')
    },
    //出货管理-销售列表
    {
      path: '/marketlist',
      component: () => import(/* webpackChunkName: "MarketList" */ './views/MarketList.vue')
    },
    //出货管理-商品出库
    {
      path: '/output',
      component: () => import(/* webpackChunkName: "Output" */ './views/Output.vue')
    },

    //-----------------------------统计管理--------------------------------
    //统计管理-销售统计
    {
      path: '/marketstats',
      component: () => import(/* webpackChunkName: "MarketStats" */ './views/MarketStats.vue')
    },
    //统计管理-进货统计
    {
      path: '/stockstats',
      component: () => import(/* webpackChunkName: "StockStats" */ './views/StockStats.vue')
    },

    //-----------------------------会员管理-----------------------------------
    //会员管理-账号管理
    {
      path: '/memberlist',
      component: () => import(/* webpackChunkName: "MemberList" */ './views/MemberList.vue')
    },
    //会员管理-添加账号
    {
      path: '/memberadd',
      component: () => import(/* webpackChunkName: "MemberAdd" */ './views/MemberAdd.vue')
    },
  ]
})
