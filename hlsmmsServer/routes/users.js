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
        console.log("× 数据库链接失败！",err.message);
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
router.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    next(); //放行执行下面的路由
});

//1. 添加用户路由-----------------------
router.post("/useradd", (req, res) => {
    /*
   要接收的值
   pass: 111111
   username: aaaaaaa
   usergroup: 超级管理员
    */
    res.header("Access-Control-Allow-Origin", "*");//后端设置响应头，允许跨域
    //添加用户的路由中接收数据
    let { username, pass, usergroup } = req.body;
    //构造sql语句
    /*
    username
    userpwd
    usergroup
    */
    //三个问号表示占位符，后期使用参数数组替换 添加用户的路由中构造sql语句和参数数组
    let sqlStr = "insert into userinfo(username,userpwd,usergroup) values(?,?,?)";
    let sqlParmas = [username, pass, usergroup];
    //执行sql语句
    //语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
    conn.query(sqlStr, sqlParmas, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            //执行的结果
            console.log(result);
            /*
            *
            OkPacket {
            fieldCount: 0,
            affectedRows: 1,  //受影响的行数，大于0表示执行成功
            insertId: 2,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 }
            */
            //res.send("执行的结果"+result);
            //根据执行的结果返回数据给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "用户添加成功！" });
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "用户添加失败！" });
            }

        }
    });
    //res.send("接收到的值:"+username+"_"+pass+"_"+usergroup);
});

//2.获取用户列表的路由----------------------------
router.get("/getusers",(req,res)=>{
    //1. 构造sql语句    查询userinfo表
    let sqlStr="select * from userinfo order by userid DESC"; //按用户id降序排列

    //2. 执行SQL语句  users--形参
    conn.query(sqlStr,(err,users)=>{
      if(err){
        throw err;
      }
      else{
        //3. 返回查询的用户数据给前端---是对象数组
        res.send(users);
      }
    })
})

/* GET users listing. */

// router.get('/', function (req, res, next) {
//     res.send('路由通了');
// });

module.exports = router;
