var DarkThemeManager = (function(win, doc){

    //分析url
    var _oUrlSearchs = location.search.substr(1).split("&"),
        _oUrlParams = {};
    for (var i = 0, l = _oUrlSearchs.length, _oUrlParam; i < l; i++) {
        _oUrlParam = _oUrlSearchs[i].split("=");
        _oUrlParams[_oUrlParam[0]] = _oUrlParam[1];
    }
    var useDarkClass = _oUrlParams["useDarkClass"] == "true"

    function forceDark() {
        doc.getElementById('QMUIEditor').classList.add("darkMode")
        doc.getElementById('QMUIEditorHead').classList.add("darkMode")
    }
    var darkThemeManager = {}
    darkThemeManager.init =  function() {
        if (useDarkClass) {
            forceDark();
        }
    }
    return darkThemeManager;
})(window, document);

DarkThemeManager.init();