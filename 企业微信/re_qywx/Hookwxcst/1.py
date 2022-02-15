import frida 
import sys   

 
jscode = """
function a(){
Java.perform(function(){
    var clz = Java.use("com.tencent.mars.ae.xlog.Xlog")
    clz.setConsoleLogOpen.implementation = function(){
        console.log("setConsoleLogOpen arg0:" + arguments[0])
        arguments[0] = Java.use("java.lang.Boolean").TRUE.value;
        return this.setConsoleLogOpen.apply(this,arguments)
    }
})






Java.perform(function(){
    var cls = Java.use("com.tencent.mars.ilink.xlog.Xlog")
    cls.setConsoleLogOpen.implementation = function(){
        console.log("xlog.Xlog setConsoleLogOpen arg0: " + arguments[0])
        arguments[0] = Java.use("java.lang.Boolean").TRUE.value;
        return this.setConsoleLogOpen.apply(this,arguments)
    }
})

Java.perform(function(){
    var cls = Java.use("com.tencent.mm.sdk.platformtools.Log")
    cls.setConsoleLogOpen.implementation = function(){
        console.log("platformtools.Log setConsoleLogOpen arg0: " + arguments[0])
        arguments[0] = Java.use("java.lang.Boolean").TRUE.value;
        return this.setConsoleLogOpen.apply(this,arguments)
    }
})

Java.perform(function(){
    var cls = Java.use("com.tencent.voip.mars.xlog.Xlog")
    cls.setConsoleLogOpen.implementation = function(){
        console.log("com.tencent.voip.mars.xlog.XLog setConsoleLogOpen arg0: " + arguments[0])
        arguments[0] = Java.use("java.lang.Boolean").TRUE.value;
        return this.setConsoleLogOpen.apply(this,arguments)
    }
})

}
setImmediate(a,10)

"""
 
 
def on_message(message,data): #js中执行send函数后要回调的函数
    if message["type"] == "send":
        print((message["payload"]))
    else:
        print(message)
     
process = frida.get_usb_device()
pid = process.spawn(['com.tencent.wework']) #spawn函数：进程启动的瞬间就会调用该函数
session = process.attach(pid)  # 加载进程号
script = session.create_script(jscode) #创建js脚本
script.on('message',on_message) #加载回调函数，也就是js中执行send函数规定要执行的python函数
script.load() #加载脚本
process.resume(pid)  # 重启app
sys.stdin.read()