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
    console.log("")

   
    var clazz = Java.use("com.tencent.mm.storagebase.a");
    clazz.b.implementation = function(){
        var result =  this.b.apply(this,arguments);
        
        if(arguments[0].search("EnMicroMsg.db") != -1 || arguments[0].search("EnMicroMsg2.db")!= -1 ){
        for(var i = 0 ; i < arguments.length ; ++i){
            console.log("b function arg" + i + ": " + arguments[i])
        }
        //var result =  this.b.apply(this,arguments);
        console.log("b function result : " + result);
        showStacks3("com.tencent.mm.storagebase.a.b")
       }
       return result;}



    var cls = Java.use("com.tencent.mm.storagebase.f")
    cls.E.implementation = function(){
        if(arguments[0].search("EnMicroMsg.db")!=-1 || arguments[0].search("EnMicroMsg2.db") != -1){
            for(var j = 0 ; j < arguments.length ; ++j){
                console.log("E function arg" + j + ": " + arguments[j])
            }
            showStacks3("com.tencent.mm.storagebase.f.E")
        }       
        //showStacks3("com.tencent.mm.storagebase.f.E")
        return this.E.apply(this,arguments);
    }

    var JavaString = Java.use("java.lang.String");
    var utils = Java.use("com.tencent.wcdb.database.SQLiteDatabase"); // 类的加载路径
    utils.openDatabase.overload('java.lang.String', '[B', 'com.tencent.wcdb.database.SQLiteCipherSpec', 'com.tencent.wcdb.database.SQLiteDatabase$CursorFactory', 'int', 'com.tencent.wcdb.DatabaseErrorHandler', 'int').implementation = function(a,b,c,d,e,f,g){   
       // console.log("Hook start......");
        //var JavaString = Java.use("java.lang.String");
        //send(a);
        //console.log(JavaString.$new(b));
        if(arguments[0].search("EnMicroMsg.db")!=-1 || arguments[0].search("EnMicroMsg2.db") != -1 ){
            for(var j = 0 ; j < arguments.length ; ++j){
                if(j==1)
            {    console.log("opendatabase1 function arg" + j + ": " + JavaString.$new(arguments[j]))
            //      arguments[j] = Java.array("byte",[99, 53, 48, 102, 48, 52, 101])    
        }
               else if(j==2){
                var fields = Java.cast(arguments[j].getClass(),Java.use('java.lang.Class')).getDeclaredFields();
//console.log(fields);
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                field.setAccessible(true);
                var name = field.getName();
                var value =field.get(arguments[j])
                console.log("\t\tname:"+name+"\tvalue:"+value);
            }
               }else
               console.log("opendatabase1 function arg" + j + ": " + arguments[j])
            }
            showStacks3("com.tencent.wcdb.database.SQLiteDatabase.openDatabase")
        }
        //send("Hook ending......");
        return this.openDatabase.apply(this,arguments);
    };
    
    
  
   /* var sql_connection = Java.use("com.tencent.wcdb.database.SQLiteConnection")
    sql_connection.open.overload('com.tencent.wcdb.database.SQLiteConnectionPool', 'com.tencent.wcdb.database.SQLiteDatabaseConfiguration', 'int', 'boolean', '[B', 'com.tencent.wcdb.database.SQLiteCipherSpec').implementation = function(){

        for(var j = 0 ; j < arguments.length ; ++j){
            if(j==4)
            console.log("com.tencent.wcdb.database.SQLiteConnection open function arg" + j + ": " + JavaString.$new(arguments[j]))
           else 
           console.log("com.tencent.wcdb.database.SQLiteConnection open arg" + j + ": " + arguments[j])
        }



        return this.open.apply(this,arguments);
    }
    */
    
    


})}
setImmediate(a,10)