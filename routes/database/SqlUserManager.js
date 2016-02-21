
var sql = require('mysql');

var pool = sql.createPool({
  connectionLimit : 10,  //最大连接数 10
  host     : 'localhost',
  user     : 'root',
  password : '100415',
  database : 'usersql'
});
/**
 * Module exports.
 */

module.exports = SqlUserManager;

function SqlUserManager () {

}

//插入用户
/*

用户结构
user,  用户
pass,  密码
email, 邮箱
sign,  签名
head,  头像
date,  日期
clock,  时长
Post,   职位
Num,    积分
article  文章
*/
SqlUserManager.prototype.insert = function(req){
      
      pool.getConnection(function(err, connection) {

           var str = 'insert into table_user'+
                     '(user,pass,email,head,date,post,num,article) '+ 
                     "VALUES('" + 
                     req.body.username +  "','"  +
                     req.body.password +  "','"  +
                     req.body.email    +  "','"  + 
                     "images/head/head.jpg'," + 
                     'NOW(),1,1,"1");';
                                
   
        connection.query( str  , function(err, rows) {
                console.log(str);
                console.log(err);
                // 释放连接 
                connection.release();
            });
      });
}

//更新用户
SqlUserManager.prototype.update = function(name, data){
    

      pool.getConnection(function(err, connection) {

        var str = "UPDATE  table_user SET pass="+name+";";
                            
        connection.query( str  , function(err, rows) {
                console.log(str);
                console.log(err);
                // 释放连接 
                connection.release();
            });
      });
}

//移除用户
SqlUserManager.prototype.remove = function(name){
   
   

   pool.getConnection(function(err, connection) {

        var str = "DELETE FROM table_user WHERE user="+name ;
                            
        connection.query( str  , function(err, rows) {
                console.log(str);
                console.log(err);
                // 释放连接 
                connection.release();
            });
      });
}

SqlUserManager.prototype.find = function (user, callback) {
  // body...
  pool.getConnection(function(err, connection) {
        
        var str = 'SELECT * from table_user WHERE user=' + user;
                            
        connection.query( str  , function(err, rows) {
                
                console.log(err);
                
                // 释放连接 
                connection.release();
                //匹配用户密码是否正确
                //如果用户不存在密码将是空值
                callback(rows);
                
            });
      });
}
