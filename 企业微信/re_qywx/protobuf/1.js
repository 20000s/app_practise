function a(){
Java.perform(function(){
    var cls = Java.use("OooO0OO.OooO00o.OooO00o.OooO0O0.OooO00o.OooO0o")
    cls.OooO0OO.implementation = function(){
        var ret = this.OooO0OO.apply(this,arguments)
        console.log("ret : "+ ret)
        return ret;
    }
})
}
setTimeout(a,100)