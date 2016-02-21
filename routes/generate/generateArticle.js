//文章生成,更新
//

var db = require('monk')('127.0.0.1:27017/article');
var generateHtml = require('./generateHtml');
var fs = require('fs');


module.exports = {

//新建文章 
new: function (art){
   
   //取集合名
   var theme = gettheme(art.theme);
   
   var dt = new Date();
   //取出描述图片
   var re=/src="([^"]*)"/g;
   var img=re.exec(art.content);
   if (img) {
     img=img[1];
   };

      //初始化 文件目录 
     var folder = dt.getFullYear() +'/' + parseInt(dt.getMonth()+1) +'-'+dt.getDate();
     
     //检查目录是否 存在 
     if(!fs.existsSync(folder))
     {
        //创建文章 存储 目录 
        fs.mkdirSync(folder);
     }
     
    //获取上一篇文章.
    //在回调函数内部进行操作
    previous(theme.name, function(previous){
        console.log(previous);
         //文章数据段 
         var   data = {
                         laiyuan:art.laiyuan,
                         laiyuanhtml: art.laiyuanhtml,
                         time:new Date(),  
                         content:art.content, //内容
                         browse : 0,
                         //存储上一篇文章
                         previous: previous,
                         //存储下一篇文章
                         next    :null,

                         //介绍图片和标题 ,文本 用于在主页和版块内缩略显示
                         describe:{img:img,
                                   title:art.title,
                                   txt:art.txt,
                                   keywords:art.keywords,//关键字                    
                                   url:folder+ "/"}
                        }
          
                  

         //插入文章到主题
         db.get(theme.name).insert(data);
         console.log(data.previous);
              //更新上一篇文章,下一篇文章指向新建文章
              update(theme.name, 
                     data.previous, 
                     {next:{title:art.title,
                           url:  art.url ,
                           id:   data._id
                           }});
              //更新新建文章
              generate(data, theme) 
  
         

    })//end previous
}, 
//更新文章
update : function(art){
     
    //body.id 有数据,该项目是编辑文章
   if (art.id !=null) {
     var re=/src="([^"]*)"/g;
     var img=re.exec(art.content)[1];
     //console.log(art.content);
     //首先更新主题
     db.get(art.srctheme).update({ _id: art.id }, 
        { $set: { laiyuan:art.laiyuan,
                  laiyuanhtml:art.laiyuanUrl,
                  content:art.content, //内容
                  describe:{img:img,
                            title:art.title,
                            txt:art.txt,
                            url:art.url,
                            keyword:art.keyword,
                            }
                 }
     });
     
     db.get(art.srctheme).findById(art.id, function(err, docs){
        //获取源    
      //进行移动主题操作
      if (art.srctheme != art.theme) {

         //更新上一篇的下一篇
         update(art.srctheme, docs.previous._id, {next:docs.next});
         //更新下一篇的上一篇
         update(art.srctheme, docs.next._id, {previous:docs.previous});  
         //移除原有主题
         db.get(art.srctheme).removeById(art.id);
         //插入数据到新主题
         db.get(art.theme).insert(docs);
         //获取上一篇文章并进行操作
         previous(art.theme, function(previous){
           //上一篇存在
           if (previous) {
              //更新上一篇的下一篇文章为移动文章
              update(art.theme, 
                  docs.previous._id, 
                  {next:{id:docs._id,
                         title: docs.title,
                         url:docs.describe.url

                  }});
           }
              db.get(art.theme).updateById(docs._id, {$set:{previous:previous}});
              //下一篇置空
              update(art.theme.name, docs, {next:null});

      
          
         });
      
      }
     
      
      });
    }//if
  },//update
 //移除文章
 remove:function(theme, id, callback){
   //寻找删除id数据
    db.get(theme).findById(id, function(err, doc){
      //更新上一篇的下一篇
      update(theme, doc.previous, {next:doc.next});
      //更新下一篇的上一篇
      update(theme, doc.next, {previous:doc.previous});  
      //删除本地文件
      fs.unlink(doc.describe.url+doc._id+".html", function(err) {
         if (err) {
         //操作失败
         callback(false);   
         return console.error(err);
         }
         
         //移除数据库信息
         db.get(theme).removeById(doc._id);
         //操作成功
         callback(true);
         return console.log("文件删除成功！");
      });

      
      
    })
  }//end remove
}//end exports




//取集合
function gettheme(theme){
  var coll=[
     {name:"weijie",forum:"未解之谜"},
     {name:"lingyi",forum:"灵异事件"},
     {name:"ufo",forum:"寻找UFO"},
     {name:"yuzhou",forum:"探索宇宙"},
     {name:"qiwen",forum:"奇闻趣事"}
  ]

  for(var i in coll){
    if (theme == coll[i].name) {
      return coll[i];
    };
  }
}

//生成文章模板
function generate( data, theme){
var text= 
'<div class="container">' +
  '<div class="row">'+
    '<div class="col-md-offset-1 col-md-7 col-xs-12">'+  
    '<div  class="row">您当前的位置 :<a href="http://www.hinews.cn/index.shtml">南海网</a> &nbsp;&gt;&nbsp; <a name="theme" href="/'+theme.name+'.html"">'+theme.forum+'</a> &nbsp;&gt;&nbsp; </div>'+
  
      '<div class="row">'+
        '<h2 class="title">'+ data.describe.title+'</h2>'+
        
          '<div class="row art">'+ 
           '<span class="col-md-2"> '+ 
             '<a  href="'+data.laiyuanhtml+'" target="_blank" rel="nofollow">'+ data.laiyuan +
             '</a></span>'+
           
           '<span class="col-md-3">'+ getDateTime(data.time) +'</span>'+
           '<span class="col-md-2">浏览:<p name="browse" class="browse">'+ data.browse +'</p></span>'+        
          '</div>'+
        '<div class="row" style="padding-right: 0; padding-left: 0;">'+
          data.content + 
          
        '</div>'+
        
      '</div>'+
      '<div class="row"><p>上一篇:';
      if (data.previous !=null) {

        text+='<a  href="'+data.previous.url+data.previous.id+'.html">'+data.previous.title+'</a><br>下一篇:';     
      }else{
        text+='已经到顶了!<br>下一篇:';
      }
      if (data.next !=null) {

        text+='<a href="'+data.next.url+data.next.id+'.html">'+data.next.title+'</a>';     
      }else{
        text+='已经到底了!';
      }
  
text+='</p></div>'+
      '<div class="row">'  +  //下面 推荐 或者同类文章

      '</div>'  +                            
    '</div>'  +
                  //动态加载 右侧文章信息
    '<div class="col-md-4 co-xs-12">'+
      '<div id="rightarticle"></div>'+
        '</div>' +  //右侧热点 
    '</div>'  +

  '</div>';
    
    var val= {
      css:  ['article'],
      js:   '',
      file:data.describe.url+data._id+".html",
      title:   data.describe.title,
      content : text
    }
    
    //建立静态网页文件
    generateHtml.new(val, theme.name);

}


//更新数据段位
function update(theme, col, data){

   if (theme != null && col != null) {

      db.get(theme).updateById(col.id,{$set:data});

        
       db.get(theme).findById(col.id, function(err, obj ){
            //更新数据
              //取集合名
          var themename = gettheme(theme);
          generate(obj, themename);
        });

    };

}
 //取上一篇文章  
function previous(theme, callback){
   
   var query = {limit:1, sort:{"time":-1}};   
   db.get(theme).find({}, query, function(err, previous){
          
    
    if(previous[0]){
     callback({ title:previous[0].describe.title,
                url:previous[0].describe.url,
                id:previous[0]._id
             });
     }else{
      callback(null);
     }
         
   });
}

//局部函数
////取日期
function getDateTime(val){
  var dt = new Date(val);
  return dt.getFullYear() +'-'+
         parseInt(dt.getMonth()+1) +'-'+
         dt.getDate() +' '+
         dt.getHours() +':'+
         dt.getMinutes();

}