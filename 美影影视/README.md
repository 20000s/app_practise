给52添麻烦了，新人发帖属实不懂，我修改一下，重新发，不会再违反规则了
声明一下 ： 我只是向大家做技术分享，成品一律不给，拒绝伸手党，从我做起
打开jeb，查看

看到java层熟悉的函数，可以猜测是第一代壳了
查看so的名字，可以知道加了通付盾的壳了，查看so里面的内容

可以看到加了混淆和frida的检验，一旦运行frida就退出，（目前主流的检测frida的手段是map中检测libfrida的存在和dbus信号）
用某大佬写的魔改版frida-server启动(抹去了frida字符串痕迹)，启动frida-dexdump(葫芦娃yyds),成功脱壳
ps:这只是第一代壳，网上有一大堆工具都可以用，不用过于执着frida，hook的话也可以用xposed,我只是提供思路
tencent shadow 开发的 是插件化app
 
脱壳后，找到它的类
hook 得到它的url(frida 或 xposed)

将下载下来的插件与脱壳后的比对，可以发现脱壳后的是集成插件的了
之后https://bbs.pediy.com/thread-258772.htm的阅读 了解该怎么hook
[mw_shl_code=asm,true]function a(){

Java.perform(function () {
Java.enumerateClassLoaders({
"onMatch": function(loader) {
if (loader.toString().startsWith("com.tencent.shadow.core.loader.classloaders.PluginClassLoader")) {
Java.classFactory.loader = loader; // 将当前class factory中的loader指定为我们需要的
}
},
"onComplete": function() {
// console.log("success :" + Java.classFactory.loader);
}
});

// Java.perform(function(){
// var clz = Java.use("com.yensbcyabet.cmsnaygeste.bean.EntityBean$DataBean")
// clz.getPluginUrl.implementation = function(){
// var ret = this.getPluginUrl.apply(this,arguments)
// console.log("plugin url :" + ret)
// return ret
// }
// })

//var vip_act = Java.use("")

//此处需要使用Java.classFactory.use
var clz = Java.classFactory.use("com.yensbcyabet.cmsnaygeste.mvp.model.entity.InfoBean");
clz.getVipLevel.implementation = function(){
var ret = this.getVipLevel.apply(this,arguments)
console.log("getviplevel :"+ret)
//showStacks3("getviplevel")
return 2;
}



var JavaString = Java.use("java.lang.String");
clz.getVipEndTime.implementation = function(){
var ret = this.getVipEndTime.apply(this,arguments)
console.log("getVipEndTime:" + JavaString.$new(ret))
// showStacks3("getvipEndtime")
return JavaString.$new("2022.12.12")
}

clz.getGold.implementation = function(){
var ret = this.getGold.apply(this,arguments)
console.log("getGold:"+ret)
// showStacks3("getviplevel")
return 10000;
}


});


}
setImmediate(a)[/mw_shl_code]
[mw_shl_code=javascript,true]frida -U -n com.yensbcyabet.cmsnaygeste:plugin -l 1.js --no-pause[/mw_shl_code]
之后开通vip，再退出就充值成功了
（别私信问我要成品，我只做技术分享，如果和我讨论技术，欢迎）