import frida  
import sys    

jscode = """
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
"""


def on_message(message,data): #js中执行send函数后要回调的函数
    if message["type"] == "send":
        print("[*] {0}".format(message["payload"]))
    else:
        print(message)
    
process = frida.get_usb_device()
pid = process.spawn(['com.tencent.mm']) #spawn函数：进程启动的瞬间就会调用该函数
session = process.attach(pid)  # 加载进程号
script = session.create_script(jscode) #创建js脚本
script.on('message',on_message) #加载回调函数，也就是js中执行send函数规定要执行的python函数
script.load() #加载脚本
process.resume(pid)  # 重启app
sys.stdin.read()