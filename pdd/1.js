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




Java.perform(function(){
//     let a = Java.use("com.aimi.android.common.http.a");
// a.c.implementation = function(str, z){
//     console.log('c is called' + "  " +str + "   " + z);
//     let ret = this.c(str, z);
//     var Map = Java.use("java.util.HashMap");
//     var args_x = Java.cast(ret, Map);
//     console.log('c ret value is ' + args_x);
//    // showStacks3("com.aimi.android.common.http.a.c")
   
//     return ret;
// };

// a.j.implementation = function(str){
//     console.log('j is called');
//     console.log("j arg " + str)
//     let ret = this.j(str);
//     var Map = Java.use("java.util.HashMap");
//     var args_x = Java.cast(ret, Map);
//     console.log('j ret value is ' + args_x);
//     return ret;
// };

// let d = Java.use("com.aimi.android.common.service.d");
// d.a.implementation = function(){
//     console.log('a is called');
//     let ret = this.a();
//     console.log('a ret value is ' + JSON.stringify(ret));
//     return ret;
// };

let s = Java.use("com.xunmeng.pinduoduo.secure.s");
s.f.implementation = function(context, str){
    console.log('f is called arg0 : '+ context + " arg1:" + str );
    let ret = this.f(context, str);
    console.log('f ret value is ' + ret);
    return ret;
};

let C36280EU = Java.use("com.xunmeng.pinduoduo.secure.EU");
C36280EU.gad.implementation = function(){
    console.log('gad is called');
    let ret = this.gad();
    console.log('gad ret value is ' + ret);
    return ret;
};

})