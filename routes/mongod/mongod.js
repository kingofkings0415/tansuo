var fs = require('fs');
var monk = require('monk');


function Mongo(dbname){
  this.url =  JSON.parse(fs.readFileSync('config/config-host.json')).mongodbhost + dbname;
 // this.collection = collection;
  this.db = null;
};

module.exports = Mongo;


Mongo.prototype.open = function(collection, callback){
    if (this.url == "") {
      throw "Mongo: url invalid! err: url == null!"
      return;
    };
    //连接数据库 
    this.db = monk(this.url);
    if (null == this.db  || 'function' !== typeof callback   ) {
        throw "Mongo: call exec function failure! err:db == null || callback not is a function!"
        return;
      } 
    //console.log(this.db);
    callback(this.db.get(collection));
    
};
Mongo.prototype.close =function(){
   if(this.db != null){
    console.log("close");
     this.db.close();
     this.db = null;
   }
}
Mongo.prototype.insert = function(collection, data, opt){
      
       if ( data == null) {
        throw "Mongo: insert data failure! err: data == null!"
        return;
      } 
      this.open(collection, function(coll){
          coll.insert(data);
        console.log("insert data");
      });
       console.log(this.db);
      if(this.db != null) {
            console.log("insert close");
            this.db.close();
            this.db = null;
          }
      
      
      
 };
/*update : function(dbname, collection, data, ){
      this.open(dbname, function(db){
          
         db.get(collection).insert( data);
         


         db.close();
          
          
        });
 
 }*/








