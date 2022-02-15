Java.perform(function() {
    /*
    * 开启vx全局日志
    */
    var clazz = Java.use('com.tencent.mm.xlog.app.XLogSetup');
    clazz.keep_setupXLog.overload('boolean', 'java.lang.String', 'java.lang.String', 'java.lang.Integer', 'java.lang.Boolean', 'java.lang.Boolean', 'java.lang.String').implementation = function(p0,p1,p2,p3,p4,p5,p6) {
 
        //console.log("arguments",arguments[5]);
        arguments[5] = Java.use("java.lang.Boolean").TRUE.value;
        console.log("已开启vx Log打印");
        return clazz.keep_setupXLog.apply(this, arguments);
    }
});

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
                console.log("name:"+name+"\tvalue:"+value);
            }
               }else
               console.log("opendatabase1 function arg" + j + ": " + arguments[j])
            }
            showStacks3("com.tencent.wcdb.database.SQLiteDatabase.openDatabase")
        }
        //send("Hook ending......");
        return this.openDatabase.apply(this,arguments);
    };