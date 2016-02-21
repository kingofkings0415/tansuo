var express = require('express');
var router = express.Router();
var nodemailer  = require("nodemailer");
var fs = require('fs');


//取用户信息
router.post('/get', function(req, res) {
  //取用户信息
  var db = new sql();
  db.find(req.body.username, function(rows){
   
     console.log("rows");
            //res.send( user);
      });
});

//用户手动登录
router.post('/userlogin', function(req, res) {
  //用户登录建立会话
  var db = new sql();
  db.find(req.body.username, function(rows){
      
      if (rows != ""  && req.body.password == rows[0].pass) {
          console.log("用户匹配");       
          req.session.username = req.body.username;
          req.session.password = rows[0].pass
          
          res.send({vaild:true, user:req.body.username} );//用户信息存在
      }else{
          console.log("用户不存在");
          res.send({vaild:false,user:null});     
      }
                 
  });
});
//用户自动登录
router.post("/autologin",  function(req, res) {
    
    if (req.session.username != undefined) {
        res.send({vaild:true, user: req.session.username});
        return
    }
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || "" ).trim();
       
        });
    
      if (Cookies.username != undefined) {
       
        var db = new sql();
        db.find(Cookies.username, function(rows){
        if ( rows[0].pass ==Cookies.password ) {
          req.session.username = Cookies.username;
          req.session.password = Cookies.password
          res.send({vaild:true, user: Cookies.username}); //用户存在
          
          }else{
            // p'l'pl';nm              }else{
         //cookies 没有存储用户或者没有该用户
            res.send({vaild:false, user: null});
         } 
      
        });
     
      }else{
                      
        //cookies 没有存储用户或者没有该用户
        res.send({vaild:false, user: null});
      } 
});
//注册用户
router.post('/reg', function(req, res) {
   
  var db = new sql();
  db.find(req.body.username, function(rows){
         
           
      if (rows != "") {
          db.insert(req);
        //注册成功
        res.send({vaild:true});  
      }else{//防止客户端恶意注册,直接刷新到主页
        res.redirect("/index.html");
      }          
  });
});
//验证用户是否存在
router.post("/valid", function(req, res){
  
  var db = new sql();
  db.find(req.body.username, function(rows){
         
      var valid = true;             
      if (rows != "") {
          valid = false;
      };     
      res.send({valid:valid});
  });
});

//接收举报用户
router.post('/report', function(req, res) {
  
});

router.post("/validate", function(req, res){
  res.send("/images/yanzheng/" +getValidate());
});
router.post("/email",  function(req, res) {

var user = '327088552@qq.com';
  
  
var smtpTransport = nodemailer.createTransport("SMTP", {
      service: "QQ"
    , auth: {
        user: user,
        pass:"tian1990"
    }
  });
  var html = "<p>"+ req.body.username + ",您好：<p/>" + 
             "<p>我们收到您在 爱宝宝论坛发起注册申请，请点击下面的链接激活帐户：</p>"+
            "<a href='#{config.app.host}/account/active?token=#{token}&email=#{email}'>请点击本链接激活帐号 </a>";
  smtpTransport.sendMail({
    from    : 'Kris<' + user + '>'
  , to      : '<Chinese_tianzilong@hotmail.com>'
  , subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件'
  , html    :   html

  }, function(err, res) {
    console.log(err, res);
   });
});

function getValidate(){
  var files=fs.readdirSync(process.cwd()+"/public/images/yanzheng");
    
    return files[Math.ceil(Math.random()*files.length - 1)];
}

module.exports = router;
