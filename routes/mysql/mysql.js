
var sql = require('mysql');

var pool = sql.createPool({
  connectionLimit : 10,  //最大连接数 10
  host     : 'localhost',
  user     : 'root',
  password : '100415',
  database : 'usersql'
});
//扩展mysql 作为数据库中间件

//数据格式
//  data{
//  table 表名
//  sql   语句
//  c
//  }
//

module.exports = {
   //插入表数据
   insert : function(data) {

          pool.getConnection(function(err, connection) {
          
          var str = "INSERT INTO " +  
                    data.table +  
                    "values('"+ 
                     data.username +  "','" +
                     data.password + "','"+ 
                     "CURRENT_DATE');" ;
                    
          
                

          connection.query( data  , function(err, rows) {
              
          if (err != 'null') console.log(err);         
          // 释放连接 
          connection.release();
            });


     })
   },
   //取数据 
   get    : function(req, res, data) {
       
   },
   //按条件查找数据
   where  : function(req, res, data) {
       
   },
    //删除数据
   delete  : function(req, res, data) {
       
   },
    //更新数据
   update  : function(req, res, data) {
       
   },
   

};