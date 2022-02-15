function a(){
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

}
setTimeout(a,10)