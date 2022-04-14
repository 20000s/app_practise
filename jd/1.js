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
}
function a(){
Java.perform(function(){
    var clazz = Java.use("com.jingdong.common.utils.BitmapkitUtils")
    clazz.getSignFromJni.implementation = function(){
        for(var i = 0 ; i < arguments.length; ++i)
            console.log("arg " + i + " : " + arguments[i])
        var ret = this.getSignFromJni.apply(this,arguments)
        console.log("ret: " + ret)
        showStacks3("getSignFromJni")
        return ret
    }

//     let C0287a = Java.use("com.jingdong.jdsdk.network.a$a");
// C0287a.getStatInfoConfigImpl.implementation = function(){
//     console.log('getStatInfoConfigImpl is called');
//     let ret = this.getStatInfoConfigImpl();
//     Java.openClassFile("/data/local/tmp/r0gson.dex").load();
//     const gson = Java.use('com.r0ysue.gson.Gson');
    
//     console.log('getStatInfoConfigImpl ret value is ' + JSON.stringify(ret));
//     return ret;
// };


let StatisticsReportUtil = Java.use("com.jingdong.common.utils.StatisticsReportUtil");
StatisticsReportUtil.readInstallationId.implementation = function(){
    console.log('readInstallationId is called');
    let ret = this.readInstallationId();
    console.log('readInstallationId ret value is ' + ret);
    return ret;
};

})


}

setTimeout(a,1000)