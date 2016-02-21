
var fs = require('fs');

module.exports = {
    new : function(data, res) {
        var html = head(data.title)+
                   link(data.css) +
                   body() + 
                   data.content +                                  
                   footer()+
                   js(data.js)+
                   "</body></html>";
        fs.writeFile(data.file,html, function(err){
          if(err){
             return console.error(err);
          }
          res.redirect("/" + data.file);
        })

    }

}


function head(title){

   return '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'+
      '<link rel="icon" href="/images/favicon.ico"><title>' + 
      title +'</title>';
}

function link(css){
    var html='<link rel="stylesheet" href="/stylesheets/bootstrap/bootstrap.min.css"><link rel="stylesheet" href="/stylesheets/font-awesome-4.3.0/css/font-awesome.min.css">';
    for (var i = css.length - 1; i >= 0; i--) {
        
       html += '<link rel="stylesheet" href="/stylesheets/'+css[i]+'.css">';

    };
    return html;
}
function body(){
   //导航菜单
   return   '<body style="margin-top:80px;">'+
              '<nav role="navigation" class="navbar navbar-inverse navbar-fixed-top">'+

                 '<div class="navbar-header">'+
                    '<button type="button" data-toggle="collapse" data-target="#navbar-ex-collapse" class="navbar-toggle">'+
                      '<span class="sr-only">collapse-navbar</span>'+
                      '<span class="icon-bar"></span>'+
                      '<span class="icon-bar"></span>'+
                      '<span class="icon-bar"></span>'+
                    '</button>'+
                    '<a href="http://127.0.0.1:3000/article/test#" class="navbar-brand">爱宝宝</a>'+
                  '</div>'+
                  '<div id="navbar-ex-collapse" class="collapse  navbar-collapse">'+
                    '<ul class="nav navbar-nav nav-bar">'+
                      '<li class="active">'+
                        '<a href="http://127.0.0.1:3000/">主页 </a>'+
                      '</li>'+
                      '<li class="dropdown">'+
                        '<a href="http://127.0.0.1:3000/article/test#" data-toggle="dropdown" id="select-forum" class="dropdown-toggle ">分类 '+
                          '<span class="caret">'+
                          '</span>'+
                        '</a>'+
                        '<div class="dropdown-menu">'+
                        '</div>'+
                      '</li>'+
                    '</ul>'+
                    '<ul class="nav navbar-nav pull-right"> '+          
                      '<li>'+
                        '<a href="http://127.0.0.1:3000/article/test#" data-toggle="modal" data-target="#loginModal">登录'+
                        '</a>'+
                      '</li>'+
                      '<li>'+
                        '<a href="http://127.0.0.1:3000/user/reg">注册</a>'+
                      '</li>'+
                    '</ul>'+
                  '</div>'+              
              '</nav>';     
 }

//.底部链接  和
function footer(){
  return '<div class="container pull-bottom">'+
            '<div class="row">'+
              '<div class="col-offset-sm/-1 col-sm-11  col-md-offset-2 col-md-10">'+
                '<hr>'+
                '<footer> '+
                  '<p>'+ 
                    '<a href="http://127.0.0.1:3000/article/test#">BY 爱宝宝</a>'+
                  '</p>'+
                '</footer>'+
              ' </div>'+
            '</div>'+
          '</div>'+
          '<div id="loginModal" tabindex="-1" role="dialog" aria-labelleaby="loginModalLabel" aria-hidden="true" class="modal fade">'+
            '<div class="modal-dialog">'+
              '<div style="background-color: rgba(0,0,0,.4);" class="modal-content">'+
                '<div class="modal-body">'+
                  '<button type="button" data-dismiss="modal" aria-hidden="true" class="color">×</button>'+
                  '<h1 id="loginModalLabel" style="text-color:#fff;" class="modal-title">登录</h1>'+
                 
                  '<form name="loginForm" role="form" class="form-signin">'+
                    '<input name="username" type="text" placeholder="输入帐号" required="" autofocus="" class="form-control">'+
                    '<br>'+
                    '<input name="password" type="password" placeholder="输入密码" required="" class="form-control">'+
                    '<br>'+
                    '<label style="margin-left: 20px;" class="checkbox"></label>'+
                    '<input type="checkbox" value="remember-me">'+
                    '<label>记住?</label>'+
                    '<label style="margin-right: 20px;" class="checkbox">'+
                    '</label>'+
                    '<label>注册</label>'+
                    '<br>'+
                    '<button id="userlogin" type="button" class="btn btn-lg btn-primary btn-block">登录</button>'+

                  '</form>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';
}

function js(js){
 
  var html='<script src="/javascripts/jquery-1.11.3.min.js"></script><script src="/javascripts/bootstrap.js"></script>';
    
    for (var i = js.length - 1; i >= 0; i--) {
        
       html += '<script src="/javascripts/'+js[i]+'.js"></script>';

    };
    return html;
}