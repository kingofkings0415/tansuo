var db = require('monk')('127.0.0.1:27017/article');
var generateHtml = require('./generateHtml');
var async = require('async');
module.exports = {

//生成index 
//
new: function (){

  var query = {skip: 0, limit:3, sort:{"time":-1}};
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
     
    
  
        

var html = '<div class = "container">' +
  //顶部第一列
  '<div class="row">' +
    //-左侧图片新闻
    '<div class="col-md-offset-1 col-md-7 col-xs-12">'+
      '<div class="row">'+
        
          carousel(result.weijie) +
        
      '</div>'+
      //第二行 
      '<div class="row ">'+
         
    
          theme("未解之谜", "weijie", result.weijie) +
          theme("奇闻趣事", "qiwen", result.qiwen) +
          theme("寻找UFO", "ufo", result.ufo) +
          theme("探索宇宙", "yuzhou", result.yuzhou) +
        
      '</div>'+
    '</div>'+//end left
    //-右侧热点标题
    '<div class="col-md-4 col-xs-12">'+
      
    '</div>'+//end right
  '</div>'+  //end row
'</div>';

   
    var data = {
      css:  '',
      js:   '',
      file:"index.html",
      title:   "主页",
      content : html
    }
  
   // console.log(html);
    generateHtml.new(data, "index");
                                                                  
                
  })

}
}

function carousel(data){

  //-主页轮播图
  //
  //console.log(data);
 var html = '<div id="myCarousel" class="carousel slide" style="margin-bottom:20px;">'+
  '<ol class="carousel-indicators">'+
    '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
    '<li data-target="#myCarousel" data-slide-to="1" ></li>'+
    '<li data-target="#myCarousel" data-slide-to="2" ></li>'+
    '<li data-target="#myCarousel" data-slide-to="3" ></li>'+
  '</ol>' +
    //- 轮播（Carousel）项目 -->
  '<div class="carousel-inner">'+
    '<div class="item active">'+
      '<img src="'+
      data[0].describe.img +
      '"  alt="First slide" width="100%" height="300" border="0"   id="img-mwsf-21" class="photo"/>'+
      '<div class="carousel-caption">'+
      '<a calss="title" href="' + 
          data[0].describe.url+'" >'+ 
          data[0].describe.title+
        '</a>'+
      '</div>'+
    '</div>';  
    for (var i = 1; i < 3; ++i) {
      html +='<div class="item">'+
        '<img src="'+
        data[1].describe.img +
        '"  alt="Second slide" width="100%" height="300" border="0"   id="img-mwsf-21" class="photo"/>'+
      '<div class="carousel-caption">'  +'<a href="' + data[1].  describe.url+'" >'
          + data[1].describe.title+
          '</a>'+
      '</div>'+
    '</div>';  
    };
    
                    
 return  html +  '</div>' +
    //-- 轮播（Carousel）导航 -->
  '<a class="carousel-control left" href="#myCarousel" data-slide="prev"></a>'+      
   '<a class="carousel-control right" href="#myCarousel" data-slide="next"></a>'+ 
  
'</div>';

}

function theme(title, url, data){

 var html = 
  '<div class=" article-box">'+
    '<a href="/' + url+'.html" class="theme" target="_blank"> ' +title+'</a></div>';
  
  for(var i in data){
html+=  '<div class="row  MarginRow ">'+
  '<div class="col-md-4 col-xs-4 ">'+
    '<img class="article-img" src="'+data[i].describe.img +'" width="100%" height="128px;" border="0" alt="文章图片" />'+
  '</div>'+
  '<div class="col-md-8 col-xs-8" style="padding-left: 0px;">'+
    '<h3>'+
      '<a href="' + data[i].describe.url +data[i]._id + '.html">'+data[i].describe.title+
      '</a>'+  
         
    '</h3>'+
    '<div class="cont">'+
      data[i].describe.txt +
      '<div class="pull-right theme">'+
        '<a href="' + data[i].describe.url +data[i]._id + '.html" class="">阅读</a>'+
      '</div>'   +
    '</div>'+             
  '</div> '+
'</div>' ;
 }

 
  return html ;
}


