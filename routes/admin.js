var express = require('express');
var router = express.Router();

var db = require('monk')('127.0.0.1:27017/article')
//自定义模块
var generateIndex = require('./generate/generateIndex');
var generateForum = require('./generate/generateForum');
var generateArticle = require('./generate/generateArticle');
/* GET admin listing. */
var async= require('async');
router.get('/', function(req, res) {
  res.render("admin/admin");
});
router.get('/user', function(req, res) {
   
   var data = [{"id": "1",
            "user"  : "admin",
            "post" : "-1",          
           },
           {"id": "2",
            "user"  : "admin22223",
            "post" : "-1",          
           }];
    res.render("admin/user", 
    { title: '首页' ,
      admin : true,
      data : data 
    });
});
router.get('/layout', function(req, res) {

    res.render("admin/layout", 
    { title: '首页' ,
      admin : true,
      data : null
    });
});

//用户举报页面
router.get('/user_report', function(req, res) {


});
//更新主页
router.post('/updateindex', function(req, res) {
    generateIndex.new();
   
    res.send();
});
//更新分类版块
router.post('/updateforum', function(req, res) {
    generateForum.new();
    res.send();
   
    
});

//系统状态
router.get('/system_status', function(req, res) {

res.render("admin/article/status", 
    { title: '系统信息'     
    });
});


router.get('/depot/seo', function(req, res) {
  
});
/*
 后台文章部分
*/
//今日最新文章
router.get('/article/newart', function(req, res) {
    
    //var dt = new Date();
    //获取今天最新文章
    res.render("admin/article/article_new", 
    { title: '首页' ,
      admin : true 
    });
});
router.get('/article/manager', function(req, res) {

    res.render("admin/article/manager", 
    { title: '文章管理' ,
      admin : true,
      data : null 
    });
});
router.get('/article/new', function(req, res) {

    res.render("admin/article/new");
});

router.post('/article/new', function(req, res) {
    console.log("new");
   generateArticle.new(req.body);
   res.send(true); 
});

router.post('/article/move', function(req, res) {
    
    db.get(req.body.theme).findById(req.body.id, function(err, data){      
      //移动插入
      db.get(req.body.move).insert(data);

    });
});

router.post('/article/edit', function(req, res) {
    
    db.get(req.body.theme).findById(req.body.id, function(err, data){      
     
      res.send(data);
    });
});
//获取文章列表
router.post('/article/page', function(req, res) {
    var page = req.body.page;
       
    if (page == 1) {
       page = 0;
    }else{
       page = (page-1)*10;
    }
    
    var query = {skip: page, limit:10, sort:{"time":-1}};
   
   
      db.get(req.body.theme).find({}, query, function(err, docs){
         
        res.send(docs);
      });
});
   //获取文章列表
router.post('/article/manager', function(req, res) {

 var query = {skip: 0, limit:10, sort:{"time":-1}};
   db.get(req.body.theme).count({}, function(err, counts){    
        res.send({counts:counts});
   });
   

});

//G更新文章
router.post('/article/update', function(req, res) { 
   generateArticle.update(req.body);
   res.send();

});  


//后台删除文章操作
router.post('/article/del', function(req, res) {

    generateArticle.remove(req.body.theme, 
                           req.body.id, 
                           function(issucceed){
                             res.send({succeed:issucceed})
                          });
  
});

//增加浏览次数
router.post('/article/browse', function(req, res) {

    var theme = getPostUrl(req.body.theme);
    //获取请求页面ID
    var id= getPostUrl(req.headers["referer"]);
    //被操作文章更新增长1次浏览数 
    db.get(theme).update({_id : id},{$inc:{"browse" : 1}});
    db.get(theme).findById(id,function(err, doc){
      //console.log(doc.browse);
      //输出浏览次数
      res.send({browse:doc.browse});
    }) 
    
}); 
//推荐文章
router.post('/article/right', function(req, res) {
  
  //取浏览数较多的文章
  var query = {skip: 0, limit:3, sort:{"browse":-1}};
  async.parallel({
    weijie:function(callback){
    db.get("weijie").find( {}, query, function(err, data){
        callback(err,data);
        
    })},
    ufo:function(callback){
    db.get("ufo").find( {}, query, function(err, data){
        callback(err,data);
        
    })},
    yuzhou:function(callback){
    db.get("yuzhou").find( {}, query, function(err, data){
        callback(err,data);
    
    })},
    lingyi:function(callback){
    db.get("lingyi").find( {}, query, function(err, data){
        callback(err,data);

    })},
    qiwen:function(callback){
    db.get("qiwen").find( {}, query, function(err, data){
        callback(err,data);
        
    })}

    },function(err,result){        
                var html =
                right(result.weijie, "未解之谜","weijie")+
                right(result.qiwen,  "奇闻异事", "qiwen")+
                right(result.ufo,    "寻找UFO", "ufo")+
                right(result.yuzhou, "探索宇宙","yuzhou")+
                right(result.lingyi, "灵异事件", "lingyi");
                res.send(html);
               
    });

});

function right(data, title, url){
  var html =  '<div class="article-box">'+
  '<a href="/'+url+'.html"> '+
        title+
      '</a>'+
'</div>';
        
      
  for(var i in data){
html+= 
'<div class="row  MarginRow">'+
  '<div class="col-md-4 col-xs-4 ">'+
    '<img class="article-img" src="'+data[i].describe.img +'" width="100%" height="80px;" border="0" alt="文章图片" />'+
  '</div>'+
  '<div class="col-md-8 col-xs-8" style="padding-left: 0px;">'+
    '<em>'+
      '<a  href="' + data[i].describe.url +data[i]._id + '.html">'+data[i].describe.title+
      '</a>'+       
    '</em>'+          
  '</div> '+
'</div>' ;
  }
  return html;
}

//取请求页面url
function getPostUrl(path){
   //取url  前半段
  path = path.substr(path.lastIndexOf('/') , path.length);
  //path = path.slice(1, path.length);
  //取 .html 前面的id1
  return path.substr(1, path.indexOf(".") -1);
}
module.exports = router;
