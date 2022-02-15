//数据库
Java.perform(function(){  
    var utils = Java.use("com.tencent.wcdb.database.SQLiteDatabase"); // 类的加载路径
    
    utils.openDatabase.overload('java.lang.String', '[B', 'com.tencent.wcdb.database.SQLiteCipherSpec', 'com.tencent.wcdb.database.SQLiteDatabase$CursorFactory', 'int', 'com.tencent.wcdb.DatabaseErrorHandler', 'int').implementation = function(a,b,c,d,e,f,g){   
        console.log("Hook start......");
        var JavaString = Java.use("java.lang.String");
        var database = this.openDatabase(a,b,c,d,e,f,g);
        send(a);
        console.log(JavaString.$new(b));
        send("Hook ending......");
        return database;
    };
    
});