// wx的防撤销
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
Java.perform(function(){


   
    var sql = Java.use('com.tencent.wcdb.database.SQLiteDatabase');
// int updateWithOnConflict(String str, ContentValues contentValues, String str2, String[] strArr, int i)
sql.updateWithOnConflict.implementation=function(a1,a2,a3,a4,a5)
{  
  console.log("----------------------------------------------------------------------------------------------------------------------------------------")
  console.log("hook update start");
  console.log("a1:"+a1);
  console.log("a2:"+a2);
  console.log("a3:"+a3);
  console.log("a4:"+a4);
  console.log("a5:"+a5);
  console.log("rtn:"+this.updateWithOnConflict(a1,a2,a3,a4,a5));
  
  //  var threadef = Java.use('java.lang.Thread');
  //  var threadinstance = threadef.$new();
  //  var stack = threadinstance.currentThread().getStackTrace();
  //  function Where(stack){
  //   for(var i = 0; i < stack.length; ++i){
  //     console.log(stack[i].toString());
  //   }
  // }
  //  console.log("Full call stack:" + Where(stack));
  showStacks3("updateWithOnConflict")
  console.log("----------------------------------------------------------------------------------------------------------------------------------------")
    return this.updateWithOnConflict(a1,a2,a3,a4,a5)
}
}



)
}
setTimeout(a,10)