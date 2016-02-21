$(function(){
   $("#getcomments").click(function() {
    $.post('/article/comment', {}, function(data, s){
    console.log(data);
    //for(var obj in data){
    // $("#comment").append(obj);
    //}

    });
    });
});