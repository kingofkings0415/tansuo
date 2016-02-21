$(function(){ 
   $.post("/admin/article/browse", {theme:$("[name='theme']").attr("href")}, 
    function(data, status) {
          $("[name='browse']").text(data.browse + "次");
    });
});
