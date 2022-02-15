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