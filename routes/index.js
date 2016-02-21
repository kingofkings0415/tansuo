var express = require('express');
var router = express.Router();


var db = require('monk')('127.0.0.1:27017/article')

/* GET home page. */
router.get("/weijie", function(req, res) {
  res.redirect("weijie.html");
});
router.get("/ufo", function(req, res) {
  res.redirect("ufo.html");
});
router.get("/lingyi", function(req, res) {
  res.redirect("lingyi.html");
});
router.get("/yuzhou", function(req, res) {
  res.redirect("yuzhou.html");
});
router.get("/qiwen", function(req, res) {
  res.redirect("qiwen.html");
});


//请求广告连接
router.post("/advertisement",  function(req, res) {
  res.send(null);

}); 
   
//更新文章列表
router.post("/page",  function(req, res) {
   
    var page = req.body.pages;
        
    if (page == 1) {
       page = 0;
    }else{
       page = (page-1)*10 - 1;
    }
    
    var query = {skip: page, limit:10, sort:{"time":-1}};
    
   
    
   db.get(getPostUrl(req.headers['referer'])).find({}, query,  function(err, docs)   
     {

       res.send(docs); 
       
     });
    
});
//取请求页面url
function getPostUrl(path){
   //取url  前半段
  path = path.substr(path.lastIndexOf('/') , path.length);
  //path = path.slice(1, path.length);
  //取 .html 前面的id1
  return path.substr(1, path.indexOf(".") -1);
}

module.exports = router;
