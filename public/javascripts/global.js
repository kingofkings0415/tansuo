$(function() {
  $(window).load(function() {
    
    
    $.post("/user/autologin",null
    , function(data,status){
       
       loginShow(data);
    });
    
    $.post("/advertisement",null
    , function(data,status){
       if(data != null){
        $(".leftadvertisement").html(data.leftadvertisement);  
        $(".rightadvertisement").html(data.rightadvertisement);  
        }
           
    });

   
  });
  
  $("#btn-login").click(function() {
  
  $.post("/user/userlogin",
  {
    username: $("#username").val(),
    password: $("#password").val()
  },
  function(data,status){
  loginShow(data.vaild);
  if(data){
  var save = $("#saveuser").is(':checked');
 
  if (save) {
    $.cookie('username', x, { expires: 7, path: '/' });
    $.cookie('password', y, { expires: 7, path: '/' });
    
    }else{
      var d = new Date();
      d.setTime(d.getTime()+(30*60*1000));

      $.cookie('username', x, { expires: d, path: '/' });
      $.cookie('password', y, { expires: d, path: '/' });
    }
    return; 
  }
   alert("用户名或者密码有误!");
  });

   });
});
function loginShow(data){

  if (data.vaild) {
        
        
        $('#nav-user').css('display','block');
        $('#nav-reg').css('display','none');
        $('#nav-login').css('display','none');
        $("#showusername").text(data.user)
       }else{
        
        $('#nav-user').css('display','none');
        $('#nav-reg').css('display','block');
        $('#nav-login').css('display','block');

       }
}
