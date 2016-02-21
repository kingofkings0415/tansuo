//文章处理路由
//插入 查询 更新 删除
var express = require('express');
var router = express.Router();



var formidable = require('formidable');
var db = require('monk')('127.0.0.1:27017/article');
var fs = require('fs');
var async= require('async');
//自定义模块
var generateArticle = require('./generate/generateArticle');




/*router.get('/new', function(req, res) {
  
  post.userPost(req, res, 
    {post:2, render:"article/new"});   
});*/

   

router.get('/new', function(req, res) {
   res.render("article/new");
});
//上传文件
router.post('/upload', function(req, res) {
   //最大文件大小
   var max_size = 3000; 
   //定义允许上传的文件扩展名
   var ext_arr ={
    'image' : ['gif', 'jpg', 'jpeg', 'png', 'bmp'],
    'flash' : ['swf', 'flv'],
    'media' : ['swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg','asf', 'rm', 'rmvb'],
    'file' :  ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2']
    };
     
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    var dt =new Date();
    
    

      //获取文件类型
      var fileType = req['query'].dir;
    
      //检查类型 清分文件夹
      if( ext_arr[fileType] != null){
          fileType ='/'+fileType +'/'+ dt.toDateString() ;
      }else{
      console.log('无效的类型');
      return;

      }
      

    form.uploadDir = __dirname + '/../public'+ fileType;

    fs.mkdir( form.uploadDir ,function(err){
        if (err) {
          console.log(err);
    };
        
    });

   
   form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        var image = files.imgFile;
        
        
        var path = image.path;
        
        path = path.replace(/\\/g, '/');
        console.log(path);
        var url = fileType+ path.substr(path.lastIndexOf('/') , path.length);
        
        var info = {
            "error": 0,
            "url": url
        };
        
        res.send(info);
    });
});
router.post('/new', function(req, res) {

   generateArticle.new(req.body);
   res.render("article/new");  
});

 //G更新文章
router.post('/update', function(req, res) { 
   generateArticle.update(req.body);
   res.send();

});  


//后台删除文章操作
router.post('/del', function(req, res) {

    generateArticle.remove(req.body.theme, 
                           req.body.id, 
                           function(issucceed){
                             res.send({succeed:issucceed})
                          });
  
});

//增加浏览次数
router.post('/browse', function(req, res) {

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
//更新右侧信息
router.post('/right', function(req, res) {
  
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
                right(result.qiwen, "奇闻异事", "qiwen")+
                right(result.ufo, "寻找UFO", "ufo")+
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