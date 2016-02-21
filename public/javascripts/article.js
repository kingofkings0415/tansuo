$(function(){
  $("#getcomments").click(function() {

    $.post('/article/comment', {}, function(data, s){
    
    if(data != null){
        $(".panel-body").html(data);
    }
    
    

    });
  });

  
  

});
