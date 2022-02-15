Java.perform(function() {
    var clazz = Java.use('com.tencent.mm.pluginsdk.ui.chat.ChatFooter');
    clazz.a.overload('com.tencent.mm.pluginsdk.ui.chat.ChatFooter', 'java.lang.String').implementation = function(a) {
        console.log("Send Message",a[1]);
        return clazz.a.apply(this, a);
    }
});