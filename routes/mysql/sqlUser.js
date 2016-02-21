var sql = require('mysqlBase');


module.exports = {
    //Add a new user 
    addUser: function (req, res, data) {
        var toDay = new Date();
        pool.getConnection(function(err, connection) {
         var str = sqlstr.insert +  "'" +
                    data.username +  "'," + "'" +
                    data.password + "',"+ "'" +
                    toDay.toLocaleDateString() + "')";
         connection.query( str  , function(err, rows) {
                console.log(str);
                console.log(err);
                // 释放连接 
                connection.release();
            });


     })}, //End  add function
    //更新用户密码等信息
    updateUser: function(req, res, data, next){


    },
    //注销用户
    deleteUser: function(req, res, data, next){

     
    },
    //寻找用户是否存在
    findUser: function(req, res, data, next){

      return true;
    }

};
