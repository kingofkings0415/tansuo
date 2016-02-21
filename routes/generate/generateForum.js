var async = require('async'),
    db = require('monk')('127.0.0.1:27017/article'),
    generateHtml = require('./generateHtml');
    
module.exports = {

//生成分类版块文件
//
new: function (){
    
  async.parallel({
    weijie:function(callback){
    db.get("weijie").count( {}, function(err, counts){
        callback(err,counts);

    })},
    ufo:function(callback){
    db.get("ufo").count( {},       function(err, counts){
        callback(err,counts);

    })},
    yuzhou:function(callback){
    db.get("yuzhou").count( {},   function(err, counts){
        callback(err,counts);

    })},
    qiwen:function(callback){
    db.get("qiwen").count( {},  function(err, counts){
        callback(err,counts);

    })},
    lingyi:function(callback){
    db.get("lingyi").count( {}, function(err, counts){
        callback(err,counts)
    })}
    },function(err,result){
      console.dir(result);//{a:a_reuslt,b:b_result}


   var forums =[
{title:"未解之谜",url:"weijie",counts:result.weijie},
{title:"灵异事件",url:"lingyi",counts:result.lingyi},
{title:"奇闻趣事",url:"qiwen",counts:result.qiwen},
{title:"寻找UFO",url:"ufo",counts:result.ufo},
{title:"探索宇宙",url:"yuzhou",counts:result.yuzhou} 
];


    for(var i in forums){
    var html=
'<div class="container"><div class="row MarginRow">'+
        //-主页左侧活动区 内容区
   '<hr />'+
  '<div class="col-xs-12  col-md-7 article-block">'+
  '<div class="bg2_p h28 style="height:28px"><div class="sp5"></div><table width="643" border="0" cellspacing="0" cellpadding="0" height="28">'+
    '<tbody><tr>'+
    '<td width="390" valign="top" align="left">'+
    '<div class="sp3"></div>'+
    '<div id="posion" class="fl f12">　您当前的位置 ：<a href="http://www.hinews.cn/index.shtml">南海网</a>&nbsp;&gt;&nbsp;<a href="/'+forums[i].url+'.html">'+forums[i].title+'</a></div></td>'+
    '</tr>'+
    '</tbody></table></div>';
    
      for(var x= 0; x < 10; ++x){
    html +='<div class="row MarginRow" id="blogs'+x+'">'+
          '<div class="col-md-4 col-xs-4 col-lg-4">'+
            '<img class="article-img" href="" src="" width="100%" height="128px;" border="0" alt="文章图片" id="img-'+x+'"/></div>'+
          '<div class="col-md-8 col-xs-8 col-lg-8" style="padding-left: 0px;">'+
            '<em><a class="title" href="" id="title-'+x+'"></a></em></div></div>';
       }           
          //-分页控件                                  
html += '<div class="row">'+
  '<div class="col-md-offset-1">'+
    '<div class="pagination">'+
      '<li class="page-previous"><a class="page"  href="javascript:;">上页</a></li>';
      var n = Math.ceil(forums[i].counts/10);
      console.log(n);
      for(var y = 1; y < n + 1; ++y){
       
       html+=
        '<li class="page-'+y+'">'+
        '<a class="page" href="javascript:;">'+y+'</a></li>';
      }              
    html+=  '<li class="page-next"> <a class="page" href="javascript:;">下页</a></li></div></div></div></div>'+
        //-右侧推荐 热点  
    '<div class="col-md-4 col-xs-12 "> <div id="rightarticle"></div></div></div></div>';
    var data = {
      css:  ["forum"],
      js:   ["home"],
      file: forums[i].url+'.html',
      title:   forums[i].title,
      content : html
    }
  
   // console.log(html);
      generateHtml.new(data, forums[i].url);
      html ="";
    } //end for
    });//end async
                                                     
  }//end new func
}




