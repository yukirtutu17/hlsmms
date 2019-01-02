import Vue from 'vue'
import App from './App.vue'
import router from './router'

//elementUI的js和css
import './plugins/element.js'

//引入公共样式
import './assets/styles/public.css'
// Vue.config.productionTip = false

//引入axios
import axios from 'axios'
//把axios挂载在vue的原型上，vue实例中就可以无限使用（页面组件中去使用）
Vue.prototype.axios=axios;
//引入qs处理axios的post参数
import qs from 'qs'
//挂载原型方便后期的vue实例使用
Vue.prototype.qs=qs;
//配置后端服务器的主机
let serverApiHost="http://127.0.0.1:9090";
Vue.prototype.apiHost=serverApiHost;

//构造全局守卫
router.beforeEach((to, from, next) => {//to就是要进入的路由 
  //alert("全局守卫");
  //next(); //放行：只有登录成功的才放行
  //************************ 让ajax携带cookie证书********************************
  axios.defaults.withCredentials=true;

  //发起ajax到后端路由获取cookie，cookie存在就放行，否则去登录页面
  axios.get(serverApiHost+"/user/getCookie").then(result=>{//更改
    console.log("验证的结果",result);
    //如果登录成或者是访问的页面时登录页面就放行
    if(result.data.isOk || to.path=="/login"){//有cookie||访问登录页就放行
      next(); //录成功放行
    }
    //否则就跳转到登录页面
    else{
      //console.log("to",to);
      next("/login");
    }
  }).catch(err=>{
    console.error("错误了!"+err.message);
  });
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
