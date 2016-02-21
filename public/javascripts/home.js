$(function(){
  
   postPage( 1 );//请求内容
  $(".page").click(function(){
      
      var page = $(this).text();
      
      switch(page){
        case "上页":
          //活动标签上移
          page = parseInt($(".pagination>.active").text()) - 1;
          
          break;
        case "下页":
          //活动标签下移
          page = parseInt($(".pagination>.active").text()) + 1;
          
          break;
         //其它值 
         default:
           
           //重复选择无效
           if($("page-"+page).hasClass("active") == true ){
          
           return ;
           }
          break;  

      }     
      
      //页码数超出无效
      if($("li").hasClass("page-"+page) == false){
        
        return;
      }

      postPage( page );

});
  });
function postPage(val){
      
      
      $.post("/page", { pages: val }, function(data, status){
        //移除活动类
        $(".pagination>.active").removeClass("active");
          //选取选择页数类 .添加活动类
        $(".page-"+val).addClass("active");
          
        
        //刷新数据
        for(var i = 0; i < data.length  ; ++i){

          $("#img-"+i).attr("src",data[i].describe.img);
          $("#img-"+i).attr("href",data[i].describe.url + data[i]._id + ".html");
          $("#title-"+i).text(data[i].describe.title);
          $("#title-"+i).attr("href",data[i].describe.url+data[i]._id + ".html");
          
          //显示有内容的 blogs 部分
          $("#blogs"+i).show();
          
        }
        if(data.length != 10){
         for(var i = data.length - 1; i < 9; ++i){
          //隐藏没有内容的 blogs 部分
          $("#blogs"+i).hide();
         }
        }
      });
  }

