<!-- 业务代码 -->
(function() {
    document.addEventListener("touchend", _gobalTouchEnd, true);
    
    function _gobalClick() {
        console.log("APP.gobleClick()");
        //_sharkMask();
    }
    function _sharkMask() {
       dom(".qqmail_mask").style.height = (document.body.clientHeight + 10) + "px";
       dom(".qqmail_mask").style.display = "";
       setTimeout(_hideMask, 250);
    }
    
    function _hideMask() {
        dom(".qqmail_mask").style.display = "none";
    }
    
    function _gobalDoubleClick() {
        console.log("APP.gobleDoubleClick()");
    }
    
    function _gobalTouchEnd() {
        var touchTime = _gobalTouchEnd.lastTime;
        _sharkMask();
        if(touchTime == null || touchTime == 0) {
            //_gobalClick();
            
        }

        if(!touchTime || ((new Date()).getTime() - touchTime > 500)) {
            _gobalTouchEnd.lastTime = (new Date()).getTime();
            _gobalTouchEnd.timer =  setTimeout(_gobalClick, 500);
        } else {
            if(_gobalTouchEnd.timer){
            clearTimeout(_gobalTouchEnd.timer)
            }
            _gobalTouchEnd.lastTime = 0;
            _gobalDoubleClick();
        }
    }
})();