$(function() {
    getTheme($("#theme").val(), 1);
    

    
    $("#theme").change(function() {
       getTheme($("#theme").val(), 1);
    });
    //请求页面
    function getTheme(val, page){
    $.post("/admin/article/manager",{theme:val},function(data, status){
       var html =  '<li class="page-previous"><a class="page"  href="javascript:;">上页</a></li>';
      
      var n = Math.ceil(data.counts/10);
      
      for(var y = 1; y < n + 1; ++y){
       
       html+=
        '<li class="page-'+y+'">'+
        '<a class="page" href="javascript:;">'+y+'</a></li>';
      }              
      html+=  '<li class="page-next"> <a class="page" href="javascript:;">下页</a></li>';

        $(".pagination").html(html);
        $("#articlecounts").text("文章数 :"+data.counts);
        getPage(page);
        //添加单击事件
        $(".page").append($(".page").click(function(){
              
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
            

          }     
      
          //页码数超出无效
          if($("li").hasClass("page-"+page) ==   false || 
             $("page-"+page).hasClass("active")){
            console.log("无效页"+ page);
            return;
          }

          getPage( page );
          })
      );
    });
  }
  function getPage(val){
    //刷新页面
    $.post("/admin/article/page",{theme:$("#theme").val(),page:val},function(data, status){
        //移除活动类
        
        $(".pagination>.active").removeClass("active");
          //选取选择页数类 .添加活动类
        $(".page-"+val).addClass("active");
        for(var i = 1; i < 11 ;++i){
          $("#title-"+i).text("");
          $("#date-"+i).text("");
          
          $("#browse-"+i).text("");
          $("#item-"+i).hide();
        }
        
        for(var i = 0; i < data.length;++i){
          $("#title-"+(i+1)).text(data[i].describe.title);
          $("#date-"+(i+1)).text(getDateTime(data[i].time));
          
          $("#checkbox-"+(i+1)).attr("value", data[i]._id)
          $("#browse-"+(i+1)).text(data[i].browse);
          $("#item-"+(i+1)).show();
        }
    });
  }
  
  $("#allsel").change(function(){
      
      
      if($(this).is( ":checked" )){
           
        $("[name='checkbox']").prop('checked',true);
        $("tr").addClass("success");
        //全选
      }else{
        $("[name='checkbox']").prop('checked',false); //反选
        $("tr").removeClass("success");
      }
      
  });
  $("[name='checkbox']").change(function(){
      if($(this).is( ":checked" )){
        $("#item-"+$(this).attr("num")).addClass("success");
        $("#item-"+$(this).attr("num")).removeClass("warning");
      }else{
        $("#item-"+$(this).attr("num")).removeClass("success");
      }
  });//end allsel

  //批量删除
  $("#DelSelData").click(function(){
    $(".moveTitle").text("批量删除:"+$("input[name='checkbox']:checked").length+"个文章!");
  });
  
  //编辑
  $(".ico").click(function(){
    var n = $(this).attr("value");
    //console.log( $("#checkbox-"+n).attr("value"));
    $(".moveTitle").text($("#title-"+n).text())
    $(".moveTitle").attr("id", $("#checkbox-"+n).attr("value"))
    $("tr").removeClass("warning");
    $("#item-"+n).addClass("warning");
  });
  
  $(".delArticle").click(function(){
     $.post("/article/del",
            {id:$(".moveTitle").attr("id"),
             theme:$("#theme").val()},
            function(data, status){
                //console.log(data);
                getTheme($("#theme").val(),
                         parseInt($(".pagination>.active").text()));
              //$("#delModal").css("display"," none");
               // getPage ();
            });
  });
  //编辑模态框载入后
  $('#editModal').on('shown.bs.modal', function () {
  // 执行一些动作...
  
  //$('.articleEdit').click(function() {
 
     $.post("/admin/article/edit",
            {id:$(".moveTitle").attr("id"),
             theme:$("#theme").val()},
            function(data, status){
               
              //初始化编辑器内容
               $("[name='theme']").val($("#theme").val());
               //设置原始主题
               $("[name='theme']").attr("id",$("#theme").val());
               $("[name='theme']").attr("url",data.describe.url);
               $("[name='title']").val(data.describe.title);
               $("[name='txt']").val(data.describe.txt);
               $("[name='laiyuan']").val(data.laiyuan);
               $("[name='laiyuanhtml']").val(data.laiyuanhtml);
               $("[name='keyword']").val(data.describe.keyword);
               window.editor.html(data.content);  
               
               
            });
  });
  //更新文章
  $("#updateArtilce").click(function(event) {
    /* Act on the event */
     window.editor.sync();
    
     if ($(".moveTitle").attr("id")) {
       $.post("/admin/article/update",{
        id :$(".moveTitle").attr("id"),
        theme:$("[name='theme']").val(),
        srctheme:$("[name='theme']").attr("id"),//判断是否更改主题使用
        url:$("[name='theme']").attr("url"),
        title:$("[name='title']").val(),
        txt:$("[name='txt']").val(),
        keywords:$("[name='keywords']").val(),
        laiyuan:$("[name='laiyuan']").val(),
        laiyuanhtml:$("[name='laiyuanhtml']").val(),
        content:$("#editor_id").val()
       } ,
        function(data, status){
       });
     }else{
       $.post("/admin/article/new",{
        theme:$("[name='theme']").val(),
        title:$("[name='title']").val(),
        txt:$("[name='txt']").val(),
        laiyuan:$("[name='laiyuan']").val(),
        keywords:$("[name='keywords']").val(),
        laiyuanhtml:$("[name='laiyuanhtml']").val(),
        content:$("#editor_id").val()
      },function(data, status){

      });

       getTheme($("#theme").val(),
                  parseInt($(".pagination>.active").text()));
        
     }
      
  });
});


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

