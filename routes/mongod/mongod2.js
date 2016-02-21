//操作 mongodb 数据库中间件
var monk = require('monk');


//初始化 Mongo 模块
function Mongo(dbname){
  //数据库指针
  this.db = null;
  //配置
  this.config ={
        mongodbhost: "127.0.0.1:27017/" + dbname
  };
};
//倒出模块
module.exports = Mongo;
//打开数据库
//@1: 数据库文件名
Mongo.prototype.open = function(){
  this.db  = monk(this.config.mongodbhost);
};
//关闭数据库
Mongo.prototype.close = function(){
  if( this.db != null){
    this.db.close();
    this.db = null;
  }
}

// 更新分类页面
// @1: 分类名
// @2: 查询选项
// @3: 回调函数
Mongo.prototype.updatePage = function(_collection,  _query , callback){
   
   
   var collection = this.db.get(_collection);

    collection.find(_query_find, function(err, docs){
      
      callback(docs);
    });
  
   
};
//插入数据
//@1: 集合名
//@2: 插入数据
Mongo.prototype.insert = function(_collection, _data){
  
  if()

  this.db.get(_collection).insert(_data);

  db.close();
};