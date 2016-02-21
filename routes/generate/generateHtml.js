var fs = require('fs');
    
module.exports = {
    new : function(data,  navurl) {
        
        var html = head(data.title, data.keywords, data.describe)+
                   link(data.css) +
                   '</head><body>' + 
                   navbar( navurl ) + 
                   advertisement(data.content) +
                   footer()+
                   js(data.js)+
                   "</body></html>";
        fs.writeFile(data.file, html, function(err){
          if(err){
             console.error(err);
          }

        });

    }

}

//参数1 title 网站标题
//参数2 opt   网页css文件
 function head(title, keywords ,describe){
   return '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'+
    '<meta name="keywords" content="'+keywords+'">'+
    '<meta name="description" content="'+describe+'">'+
    '<link rel="icon" href="/images/favicon.ico"><title>' + title +'</title>';
};
//导航栏
function navbar(navurl){

   var html = '<nav role="navigation" class="navbar navbar-inverse navbar-fixed-top">'+ 
      '<div class="col-md-offset-2 col-md-7">'+
        '<div class="navbar-header">'+
          '<button type="button" data-toggle="collapse" data-target="#navbar-ex-collapse" class="navbar-toggle">'+
                '<span class="sr-only">collapse-navbar</span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
          '</button>'+
           '<a href="/yuzhou.html" class="navbar-brand">探索宇宙</a>'+
           
        '</div>'+
        '<div id="navbar-ex-collapse" class="collapse  navbar-collapse">'+
          '<ul class="nav navbar-nav nav-bar">';
            //菜单选项
                
                var menu =[
                  {url:"index",title:"首页"},
                  {url:"weijie",title:"未解之谜"},
                  {url:"ufo",title:"寻找UFO"},
                  {url:"lingyi",title:"灵异事件"},
                  {url:"qiwen",title:"奇闻趣事"},
                  {url:"yuzhou",title:"探索宇宙"}
                ];
                for (var i in menu) {
                  if (navurl == menu[i].url) {
                     html+='<li class="active">'+
                    '<a href="/'+menu[i].url+'.html">'+menu[i].title+'</a></li>';
                    
                  }else{
                     html+='<li>'+
                    '<a href="/'+menu[i].url+'.html">'+menu[i].title+'</a></li>';
                  }
                }
                

        
    return html + '</ul> </div> </div></nav>';
}


//植入左右广告
function advertisement(content){
  

  return content;
   /*'<div class="container ">'+
            '<div class="row">' +
              //左侧广告位
              '<div class="col-md-1">'+
                '<div id="leftadvertisement">' +
                '</div>'+  
               '</div>'+
                '<div class="col-md-10">'+
                content+ //实际内容
               '</div>'+
               //右侧广告位
               '<div class="col-md-1">'+
               '<div id="rightadvertisement">' +
                '</div>'+ 
               '</div>'+
            '</div>'+
          '</div>';*/

}

//底部
function footer(){
    return  
'<div class="container">' +
  '<div class="row">'+
    '<hr/>'+
    '<footer> '+
      '<p>'+ 
        '<a href="http://127.0.0.1:3000/article/test#">BY 爱宝宝</a>'+
      '</p>'+
    '</footer></div></div>';
      

}
//css文件
function link(css){
    var html='<link rel="stylesheet" href="/stylesheets/bootstrap/bootstrap.min.css"><link rel="stylesheet" href="/stylesheets/font-awesome-4.3.0/css/font-awesome.min.css"><link rel="stylesheet" href="/stylesheets/global.css"><link rel="stylesheet" href="/stylesheets/style-main.css"> ';
    if (css !=null) {
      for (var i = 0; i < css.length ; ++i) {
        
       html += '<link rel="stylesheet" href="/stylesheets/'+css[i]+'.css">';

      };
    };
    return html;
}
//js文件
function js(js){
  //必有js文件
  var html='<script src="/javascripts/jquery-1.11.3.min.js"></script><script src="/javascripts/bootstrap.js"></script><script src="/javascripts/jquery.cookie.js"></script><script src="/javascripts/article/global.js"></script><script src="/javascripts/FancyZoom/js-global/FancyZoom.js"></script><script src="/javascripts/FancyZoom/js-global/FancyZoomHTML.js"></script><script src="/javascripts/article/article.js"></script>';       
  if (js !=null) {    
    for (var i = 0; i < js.length ; ++i) {
        
       html += '<script src="/javascripts/'+js[i]+'.js"></script>';

    };
  };
    return html;
}