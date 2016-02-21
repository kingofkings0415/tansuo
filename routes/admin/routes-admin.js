//后台管理路由

module.exports = {

   
   use : function(routes)
   {
    console.log(routes);
       switch(routes)
       {
        //解析seo
        case "seo":

        break;
        //获取成员列表
        case "member-list":      
        
          return getAdminMemberList();
        
        case "member":
        break;

        default:
           console.log("无效的后台请求!");
           return undefined;//返回无效
       }

   }
   
};

//获取后台 管理成员列表.
function getAdminMemberList() {
   
    return [{"member": "admin",
            "post"  : "admin",
            "jurisdiction" : "-1",
            "注册时间":"1990-04-03",
            "离开时间": "1990-06-03"
           },
           {"member": "admin1",
            "post"  : "domain",
            "jurisdiction" : "3",
            "注册时间":"1990-02-03",
            "离开时间": "1990-05-03"
           }];
}