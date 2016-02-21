//用户权限管理
var sql = require('./database/SqlUserManager');

module.exports = {
userPost : function(req, res, data) {
    //存放用户数据
    var Cookies = {};

  //查找会话中是否有数据
  if (req.session.username != undefined) {
        Cookies.username = req.session.username;
        Cookies.password = req.session.password;
  }else{
    //查找cookie中是否有数据
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
    var parts = Cookie.split('=');
    Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || "" ).trim();
       
    });
  }
  if (Cookies.username != undefined) {
  //用户登录建立会话
  var db = new sql();
 
  db.find(Cookies.username, function(rows){
    
   if(rows != "" && rows[0].pass == Cookies.password){
       if(rows[0].post >= data.post){
        console.log(rows[0]);
        res.render(data.render); 
       }else{
      res.render("error", {error:{status:"用户权限不够!请与管理员联系!"}});  
        }
     }else{
       res.render("error", {error:{status:"用户密码已更改或者不存在!"}});  
     } 
   });
   }else{
       res.render("error", {error:{status:"用户未登录!"}});  
   }

  }
}

