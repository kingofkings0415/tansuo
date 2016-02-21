var url = require('url');

var mongo = require('../mongod/mongod');
module.exports = {
	
	get : function(req, res)
	 {   
    
    //传递请求到管理员路由,取出管理数据
    var pathname = url.parse(req.url).pathname;
    
    var criteria = { url :pathname.slice(9,pathname.length)}; // 查询条件
  
    //获取数据库集合
    
    var collection= mongo.open("article", "content");
    collection.findOne(criteria,  function(err, docs){           
          assert.equal(null, err);     
         

          console.log(docs);
     
          res.render("article/article-post", {
            title: '微博首页',
            data  :docs,
            Name : "博主名字",     
            });
           
         mongo.close();
    });

   

},
 
	 //对发布的文章进行处理
	 post : function(req, res){
	
			
        
    }
}
	

