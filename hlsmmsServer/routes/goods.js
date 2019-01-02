var express = require('express');
var router = express.Router();

//引入mssql模块
const mysql = require('mysql');

//数据库连接配置（创建数据库连接）
const conn = mysql.createConnection({
    host: 'localhost', //数据库主机名
    user: 'root',         //数据库账号
    password: 'ROOT',    //密码
    database: 'hlsmms'      //使用哪个数据库
});

//打开数据库链接
conn.connect(err => {
    if (err) {
        console.log("× 数据库链接失败！", err.message);
    }
    else {
        console.log("√ 数据库链接成功！");
    }
});

/* 百度的解决办法
* app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
* */
//通用的跨域路由
// router.all("*", (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next(); //放行执行下面的路由
// });
//通用的跨域路由
router.all("*",(req,res,next)=>{//*是所有请求的路由
    //res.header("Access-Control-Allow-Origin","*"); //携带cookie证书是，跨域不能使用通配符*就改成下面这个↓
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:8080"); //允许携带cookie证书的域名
    res.header("Access-Control-Allow-Credentials",true);  //值是一个布尔值，表示是否允许发送Cookie
    next(); //放行执行下面的路由
});

//1. 添加商品路由--------------------------------------------------------------------------------
router.post("/add", (req, res) => {

    //res.header("Access-Control-Allow-Origin", "*");//后端设置响应头，允许跨域
    //添加商品的路由中接收数据
    let {classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details}=req.body;

    //构造sql语句

    //三个问号表示占位符，后期使用参数数组替换 添加商品的路由中构造sql语句和参数数组
    let sqlStr="insert into goodinfo(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqlParams=[classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details];
     //执行sql语句
    //语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
    conn.query(sqlStr, sqlParmas, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {

            //根据执行的结果返回数据给前端
            //3）后端——根据执行是否成功返回json给前端
            if(result.affectedRows>0){
                res.json({"isOk":true,"msg":"商品添加成功!"});
            }
            else{
                res.json({"isOk":false,"msg":"商品添加失败!"});
            }

        }
    });
    //res.send("接收到的值:"+username+"_"+pass+"_"+usergroup);
});

//2.获取商品列表的路由-------------------------------------------------------------------------------------
router.get("/getgoods",(req,res)=>{
    res.send("获取商品列表的路由");
 });
 


/* GET users listing. */

// router.get('/', function (req, res, next) {
//     res.send('路由通了');
// });

module.exports = router;
