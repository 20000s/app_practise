// hook 投色子的
Java.perform(function(){
    var clazz = Java.use("com.tencent.mm.emoji.panel.a.d");
    clazz.a.overload('android.view.View', 'android.content.Context', 'int', 'com.tencent.mm.emoji.a.b.ac').implementation = function(){
        //console.log("arg2A:",arguments[1]);
        var ar4_type= arguments[3].type
      //  var h1 = Java.cast(arguments[3].value,Java.use("com.tencent.mm.emoji.a.b.h"))
        //console.log(h1.ggJ);
        console.log("ar4_type",ar4_type.value); 

        //console.log()
        clazz.a.apply(this,arguments);
    }

    var clazz1 = Java.use("com.tencent.mm.storage.emotion.EmojiInfo");
    clazz1.getGroup.implementation = function(){
    
        var ret_val = clazz1.getGroup.apply(this,arguments);
        console.log("get group:",ret_val);
        return ret_val;   
     }

     var clazz2 = Java.use("com.tencent.mm.ca.a");
     clazz2.p.implementation = function(){
       console.log("com.tencent.mm.ca.a.p:",arguments[0]);
       var ret1 = clazz2.p.apply(this,arguments);
       console.log("com.tencent.mm.ca.a.p ret:",ret1);
       return ret1;
     }

     var clazz3 = Java.use("com.tencent.mm.plugin.emoji.e.f");
     clazz3.p.implementation = function(){
       console.log("com.tencent.mm.plugin.emoji.e.f.p:",arguments[0])
       var ret2 = clazz3.p.apply(this,arguments);
       console.log("com.tencent.mm.plugin.emoji.e.f.p ret:",ret2);
       return ret2;

     }

     var clazz4 = Java.use("com.tencent.mm.sdk.platformtools.bu")
     clazz4.jE.implementation = function(){
       console.log("JE angr[0]:",arguments[0]);
       var ret4 = clazz4.jE.apply(this,arguments);
       console.log("JE ret:",ret4);
       if(arguments[0] == 5)
       ret4 = 5
       else ret4 = 2
       return ret4;
       
     }
    

     
  

    

 
})