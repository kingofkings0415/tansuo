$(function() {

  $('#updateindex').click(function(){
    //更新主页
    $.post('/admin/updateindex', null, function(data, status){

    });
  });
  $('#updateforum').click(function(){
    //更新主页
    $.post('/admin/updateforum', null, function(data, status){

    });
  });

});