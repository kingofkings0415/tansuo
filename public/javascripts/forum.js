$(function(){

  $(".title").click(function(){
    
    $.post("/article/browse", {data:getPostUrl($(".title").attr("href"))},
      function(data, status) )

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