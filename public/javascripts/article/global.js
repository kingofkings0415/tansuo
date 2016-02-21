$(function() {
    $.post("/admin/right", {}, 
    function(data, status) {
         
        $("#rightarticle").html(data);
        
    });
});

