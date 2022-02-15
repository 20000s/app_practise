Java.perform(function(){
    var clazz = Java.use("com.tencent.mm.ui.chatting.ChattingUIFragment");
    clazz.zt.implementation = function(){
        console.log("lrn",this.Lrn.value);
        var adapter = Java.cast(this.Lrn.value,Java.use("com.tencent.mm.ui.chatting.a.a"));
        console.log("adapter:",adapter);
        console.log("adapt.getCount",adapter.getCount());
        console.log("LtF",adapter.LtF.value);
        var msg = adapter.getItem(0);
        console.log("msg,",msg);
        return 
        clazz.zt.apply(this,arguments);    
    }
})