## 小说家模拟器2

version 1.5.10T

新手刚入门android手游，就想找个帖子复现一下，在52上找了个不错的帖子https://www.52pojie.cn/thread-1419648-1-1.html，但是版本太老了，新版改了很多，于是决定自己试试（毕竟就是个小厂的游戏）

（）

il2cppdumper使用，报错失败了，估计是global-metadata.dat加密了

打开libil2cpp.so

![ida_no_recover](D:\app项目\小说家模拟器\ida_no_recover.PNG)

看到这函数名和 这么多数据没反编译，第一反应 混淆加壳了，于是去看看init_array

![init_array](D:\app项目\小说家模拟器\init_array.PNG)

里面还有好多xor,各种加减 忙猜应该是smc 加壳混淆了 而且搜索字符长“global-metadata.dat” ,根本没有，估计是字符串混淆了，但是这个字符串是一定要的，否则不可能MetadataCache::Initialize加载资源阿，所以肯定解密，既然如此，那我就去内存里dump不久好了，frida启动(居然没有反调试)

(由于权限问题， 我属实懒得搞，就这么应付一下)

```
adb shell
su
cd /data/local/tmp
touch 1.so
chmod 777 1.so
```

之后使用frida

```
var exports = Module.enumerateExportsSync("libil2cpp.so");
var libxx = Process.getModuleByName("libil2cpp.so");
console.log("*****************************************************");
console.log("name: " +libxx.name);
console.log("base: " +libxx.base);
console.log("size: " +ptr(libxx.size));

var exports = Module.enumerateExportsSync("libil2cpp.so");
for(var i = 0; i < exports.length; i++) {
        console.log(exports[i].name + ": " + (exports[i].address - libxx.base));
}
// dump so
var file_path = "/data/local/tmp/" +  "1.so";
var file_handle = new File(file_path, "wb");
if (file_handle && file_handle != null) {
    Memory.protect(ptr(libxx.base), libxx.size, 'rwx');
    var libso_buffer = ptr(libxx.base).readByteArray(libxx.size);
    file_handle.write(libso_buffer);
    file_handle.flush();
    file_handle.close();
    console.log("[dump]:", file_path);
}

```

再adb pull一下，就得到了解密好的so

不过对于MetadataCache::Initialize函数，我也没仔细看，它对global-metadata.dat加了什么密，之后可以看看，拿到解密好的so,关键我就是想搜一下unity的版本

![image-20211214214740567](C:\Users\24657\AppData\Roaming\Typora\typora-user-images\image-20211214214740567.png)

之后使用[Riru-Il2CppDumper](https://github.com/Perfare/Riru-Il2CppDumper)

改一下包名和版本 magisk再装一下

```
#define GamePackageName "cs.xsjmn2.com"
#define UnityVersion 2018.3.8f1
```

得到dump.cs

之后找到get_money 和get_light函数 frida改一下就行了

```c
setImmediate(function(){
    Interceptor.attach(Module.load("libil2cpp.so").base.add(0x993338),{
    onEnter:function(args){
      //  for(var i = 0 ; i < )
     
    },
    onLeave:function(retval){
        //retval.replace(0xffff)
        retval.replace(0xffff)
        console.log("get light :" + retval)
    }
})
})
```

最终实现的功能

![IMG_3401(20211214-215347)](D:\app项目\小说家模拟器\IMG_3401(20211214-215347).JPG)