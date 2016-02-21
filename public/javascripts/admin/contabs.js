$(function(){
    //后台导航效果
    $(".ad-list ul li dd").click(function(e){
        e.stopPropagation();
        $(this).addClass("on").siblings("dd").removeClass("on");
    })
    
    $(".ad-list ul li").hover(function(){
        $(this).addClass("over2");
    },function(){
        $(this).removeClass("over2");
    })
    $(".ad-list ul li").click(function(){
        if($(this).hasClass("over")){
            $(this).removeClass("over");
        }else{
            $(this).addClass("over").siblings("li").removeClass("over"); 
        }
    })
    
    // 设置IFRAME自适应高度
    $("#ad-iframe").css("height",($(document.body).height()-55)+"px");
  

    
   
})