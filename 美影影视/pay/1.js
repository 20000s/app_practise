function showStacks3(str_tag) 
{
   var Exception=  Java.use("java.lang.Exception");
   var ins = Exception.$new("Exception");
   var straces = ins.getStackTrace();

   if (undefined == straces || null  == straces) 
   {
       return;
   }

   console.log("=============================" + str_tag + " Stack strat=======================");
   console.log("");

   for (var i = 0; i < straces.length; i++)
   {
       var str = "   " + straces[i].toString();
       console.log(str);
   }

   console.log("");
   console.log("=============================" + str_tag + " Stack end=======================\r\n");
   Exception.$dispose();
};
function a(){

    Java.perform(function () {
        Java.enumerateClassLoaders({
            "onMatch": function(loader) {
                if (loader.toString().startsWith("com.tencent.shadow.core.loader.classloaders.PluginClassLoader")) {
                    Java.classFactory.loader = loader; // 将当前class factory中的loader指定为我们需要的
                }
            },
            "onComplete": function() {
             //   console.log("success :" + Java.classFactory.loader);
            }
        });

        // Java.perform(function(){
        //     var clz = Java.use("com.yensbcyabet.cmsnaygeste.bean.EntityBean$DataBean")
        //     clz.getPluginUrl.implementation = function(){
        //         var ret = this.getPluginUrl.apply(this,arguments)
        //         console.log("plugin url :" + ret)
        //         return ret
        //     }
        // })

        //var vip_act = Java.use("")
     
        //此处需要使用Java.classFactory.use
        var clz = Java.classFactory.use("com.yensbcyabet.cmsnaygeste.mvp.model.entity.InfoBean");
        clz.getVipLevel.implementation = function(){
            var ret = this.getVipLevel.apply(this,arguments)
            console.log("getviplevel :"+ret)
            //showStacks3("getviplevel")
            return 2;
        }

     

        var JavaString = Java.use("java.lang.String");
        clz.getVipEndTime.implementation = function(){
            var ret = this.getVipEndTime.apply(this,arguments)
            console.log("getVipEndTime:" + JavaString.$new(ret))
           // showStacks3("getvipEndtime")
            return JavaString.$new("2022.12.12")
        }
    
        clz.getGold.implementation = function(){
            var ret = this.getGold.apply(this,arguments)
            console.log("getGold:"+ret)
           // showStacks3("getviplevel")
            return 10000;
        }

       
    });
       

}
setImmediate(a)
