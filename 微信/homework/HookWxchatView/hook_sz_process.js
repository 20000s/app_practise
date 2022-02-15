// 看看wx 逆塞子的过程
Java.perform(function(){
    var clazz = Java.use("com.tencent.mm.emoji.panel.a.d")
    clazz.a.overload('android.view.View', 'android.content.Context', 'int', 'com.tencent.mm.emoji.a.b.ac').implementation = function(){
        var clz = Java.cast(arguments[3],Java.use("com.tencent.mm.emoji.a.b.ac"));
        var fields = Java.cast(clz.getClass(),Java.use('java.lang.Class')).getDeclaredFields();
                    //console.log(fields);
                    console.log("arg3:" +clz)
                    for (var j = 0; j < fields.length; j++) {
                        var field = fields[j];
                        field.setAccessible(true);
                        var name = field.getName();
                        var value =field.get(clz)
                        console.log("\t\tname:"+name+"\tvalue:"+value)}
        
        
        this.a.apply(this,arguments)
    }
})