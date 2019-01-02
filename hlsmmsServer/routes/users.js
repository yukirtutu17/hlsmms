var express = require('express');
var router = express.Router();

//引入自定义的数据库连接模块
var conn=require("./conn");

// //引入mssql模块
// const mysql = require('mysql');

// //数据库连接配置（创建数据库连接）
// const conn = mysql.createConnection({
//     host: 'localhost', //数据库主机名
//     user: 'root',         //数据库账号
//     password: 'ROOT',    //密码
//     database: 'hlsmms'      //使用哪个数据库
// });

// //打开数据库链接
// conn.connect(err => {
//     if (err) {
//         console.log("× 数据库链接失败！", err.message);
//     }
//     else {
//         console.log("√ 数据库链接成功！");
//     }
// });

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

//1. 添加用户路由--------------------------------------------------------------------------------
router.post("/useradd", (req, res) => {
    /*
   要接收的值
   pass: 111111
   username: aaaaaaa
   usergroup: 超级管理员
    */
    //res.header("Access-Control-Allow-Origin", "*");//后端设置响应头，允许跨域
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

//2.获取用户列表的路由-------------------------------------------------------------------------------------
router.get("/getusers", (req, res) => {
    //1. 构造sql语句    查询userinfo表
    let sqlStr = "select * from userinfo order by userid DESC"; //按用户id降序排列

    //2. 执行SQL语句  users--形参
    conn.query(sqlStr, (err, users) => {
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端---是对象数组
            res.send(users);
        }
    })
});

//删除用户的路由--------------------------------------------------------------------------------------------
router.get("/deluser", (req, res) => {
    //3)后端-接收要删除的id
    let userid = req.query.userid;
    //4)后端-连接数据库，构造sql语句，执行sql删除命令 delete from 表名 where 条件
    /*let sqlStr="delete from userinfo where userid=?";
      let sqlParams=[userid]; ↓*/
    let sqlStr = `delete from userinfo where userid=${userid}`;
    //连接数据库
    conn.query(sqlStr, (err, result) => {
        //5)后端-根据是否删除成功返回一个json结果给前端   
        if (err) {
            throw err;
        } else {
            //result对象中有属性 affectedRows: 1, 受影响的行数
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "msg": "用户删除成功" })
            } else {
                res.json({ "isOk": false, "msg": "用户删除失败" })
            }
        }
    });
});

//获取单个用户的信息的路由(根据userid)---------------------------------------------------------
router.get("/getuserbyid", (req, res) => {
    //3)后端——接收用户的id，根据id执行sql查询，获取旧数据
    let userid = req.query.userid;
    let sqlStr = "select * from userinfo where userid=" + userid;//直接拼接
    //执行查询
    conn.query(sqlStr, (err, oldUserData) => {
        if (err) {
            throw err;
        } else {
            //4)后端——把查询到旧数据返回前端
            res.send(oldUserData);
        }
    });
})
//修改用户资料的路由---------------------------------------------------------
router.post("/usersave", (req, res) => {
    //3)后端——接收新的的数据，根据用户id执行更新 update 表名 set 字段=新的值 where 条件
    /*userpwd: "",
    username: "",
    usergroup: ''*/
    let { username, userpwd, usergroup, userid } = req.body;
    //let sqlStr="update userinfo set username='?',userpwd='?',usergroup='?' where userid=?";
    //参数数组在替换是会自动添加单引号，所有我们自己构造sql是不用再加单引号
    let sqlStr = "update userinfo set username=?,userpwd=?,usergroup=? where userid=?";
    let sqlParams = [username, userpwd, usergroup, userid];

    conn.query(sqlStr, sqlParams, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //4)后端——根据执行的结果（受影响的行数）返回json给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "msg": "用户修改成功！" })
            } else {
                res.json({ "isOk": false, "msg": "用户修改失败！" })

            }
        }
    })
});

//验证用户登录身份的路由---------------------------------------------------------
router.post("/checkLogin",(req,res)=>{
    /*2）后端——接收账号和密码，根据账号和密码到数据库中查询
    Select * from userinfo where username=’账号’ and userpwd=’密码’
    账号和密码2个条件同时成立，找到了结果就是合法的，没有找到结果就非法。*/
    let {username,userpwd}=req.body;
    let sqlStr="select * from userinfo where username=? and userpwd=?";
    let sqlParams=[username,userpwd];

    //执行sql语句
    conn.query(sqlStr,sqlParams,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            //3）后端——返回json结果给前端
            //[] 空数组表示验证失败   [].length>0数组非空就表示验证成功
            if(result.length>0){
                // [{"userid":35,"username":"yinhonxia","userpwd":"123456","usergroup":"超级管理员","addDate":"2018-12-31T08:23:57.000Z","isLocked":0}]
                //登录成功：写入cookie
                res.cookie("userid",result[0].userid);
                res.cookie("username",username);

                res.send({"isOk":true,"msg":"用户登录成功！"});
            }
            else{
                //登录失败
                res.send({"isOk":false,"msg":"用户登录失败！"});
            }
        }
    });
});

//验证cookie是否存在---------------------------------------------------------
router.get("/getCookie",(req,res)=>{
    let userid=req.cookies.userid;
    let username=req.cookies.username;
    //如果存在就有cookie就合法
    if(userid && username){
        res.send({"isOk":true});
    }
    else{
        res.send({"isOk":false});
    }
});

//清除cookie的路由---------------------------------------------------------
router.get("/loginOut",(req,res)=>{
    res.clearCookie("userid");
    res.clearCookie("username");
    res.send({"isOk":true});
});


//添加商品-------------拷贝上面添加用户进行更改-----------------------------------------------

//管理商品列表------------------拷贝上面管理用户进行更改---------------------------------------


/* GET users listing. */

// router.get('/', function (req, res, next) {
//     res.send('路由通了');
// });

module.exports = router;
