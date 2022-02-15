// tools
function rgb2hex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}
if (typeof Node != 'undefined') {
    Node.prototype.getParentElementByTagName = function(tagName){
        /**
         * 寻找node的父元素且该父元素的标签名必须为tagName
         * @type {String} tagName － 指定的标签名
         */
        var targetNodeName = tagName.toLowerCase();
        var targetNode = this.parentElement;
        while (targetNode && targetNode.tagName.toLowerCase() != targetNodeName) {
            targetNode = targetNode.parentElement;
        }
        return targetNode;
    }
    Node.prototype.remove = function(){
        /**
         * 移除node
         */
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    }
    Node.prototype.wrapBy = function(tagName){
        /**
         * 为node包一个标签
         */
        var wrapDom = document.createElement(tagName);
        wrapDom.prependBefore(this);
        wrapDom.appendChild(this);
    }
}
if (typeof HTMLElement != 'undefined') {
    HTMLElement.prototype.appendAfter = function(targetEle){
        /**
         * 将element插到targetEle后
         */
        var parentEle = targetEle.parentElement;

        if (parentEle.lastChild === targetEle){
            parentEle.appendChild(this);
        } else {
            parentEle.insertBefore(this,targetEle.nextElementSibling);
        }
    }
    HTMLElement.prototype.prependBefore = function(targetEle){
        /**
         * 将element插到targetEle前面
         */
        targetEle.parentElement.insertBefore(this, targetEle);
    }
    HTMLElement.prototype.unwrap = function(){
        /**
         * 将element的所有子node取出组成新的fragment并替换掉该element inspired by medium-editor
         * @returns {DocumentFragment} fragment
         */
        var self = this;
        if(!self.childNodes.length){
            self.parentNode.removeChild(self);
            return;
        }
        var fragment = document.createDocumentFragment(),
            nodes = Array.prototype.slice.call(self.childNodes);
        for (var i = 0; i < nodes.length; i++) {
            fragment.appendChild(nodes[i]);
        }
        self.parentNode.replaceChild(fragment, self);
        return fragment;
    }
}


(function(win, doc){

    var QMUIEditor = win.QMUIEditor = {};

    //分析url
    var _oUrlSearchs = location.search.substr(1).split("&"),
        _oUrlParams = {};
    for (var i = 0, l = _oUrlSearchs.length, _oUrlParam; i < l; i++) {
        _oUrlParam = _oUrlSearchs[i].split("=");
        _oUrlParams[_oUrlParam[0]] = _oUrlParam[1];
    }
    var _needAutoFormat = _oUrlParams["autoFormat"] == "true"
    var autoFormatClass = "autoFormat"
    var isDarkMode = _oUrlParams["isDarkMode"] == "true"
/**
 * 配置
 */
    var CONST = {
        defaultParagraph: 'div', // 段落标签，div或者p
        stateScheme: 'qmuire-state://',  // 传递编辑器当前光标选区状态
        contentScheme: 'qmuire-content://',  // 传递编辑器当前innerHTML
        contentReadyScheme: 'qmuire-contentReady://',  // 传递编辑器是否已经setHtml完毕
        rawContentScheme: 'qmuire-RawContent://',
        eventScheme: 'qmuire-event://',  // 传递图片点击的事件给native
        audioScheme: 'qmuire-audio://',  // 传递录音数据给native
        emptyScheme: 'qmuire-empty://',  // 传递当前内容是否为空给native
        focusScheme: 'qmuire-focus://',  // 编辑器被聚焦
        blurScheme: 'qmuire-blur://',  // 编辑器失焦
        logScheme: 'qmuire-log://',  // 传递编辑器log信息
        inputScheme: 'qmuire-input://',  // 告知业务层目前有输入发生
        scrollYScheme: 'qmuire-scrolly://', // 传递需要scroll的y值
        scrollYMapScheme: 'qmuire-scrolly-map://', // 插入地图时，传递需要scroll的y值
        signScheme: 'qmuire-sign', // 点击名片事件
        atScheme: 'qmuire-at://',  // at输入检测
        atClickScheme: 'qmuire-click-at://',  // at点击
        atDeleteScheme: 'qmuire-delete-at://',  // at删除
        scrollToSelect: 'qmuire-scroll-to-select://', // 滚动到光标所在位置
        getSelectionData: 'qmuire-get-selection-data://', // 获取选择文本
        fontSizeSmall: 3,
        fontSizeNormal: 4,
        fontSizeBig: 5,
        fontSizeLarge: 6
    };

/**
 * nativeNotify: 原生通信相关
 */
    var nativeNotify = QMUIEditor.nativeNotify = function(type, data){
        var scheme = '';
        switch(type){
            case 'state': scheme = CONST.stateScheme; break;
            case 'content': scheme = CONST.contentScheme; break;
            case 'rawContent' : scheme = CONST.rawContentScheme; break;
            case 'event': scheme = CONST.eventScheme; break;
            case 'audio': scheme = CONST.audioScheme; break;
            case 'log': scheme = CONST.logScheme; break;
            case 'empty': scheme = CONST.emptyScheme; break;
            case 'blur': scheme = CONST.blurScheme; break;
            case 'focus': scheme = CONST.focusScheme; break;
            case 'input': scheme = CONST.inputScheme; break;
            case 'scrolly': scheme = CONST.scrollYScheme; break;
            case 'scrollyMap': scheme = CONST.scrollYMapScheme; break;
            case 'contentReady': scheme = CONST.contentReadyScheme; break;
            case 'sign': scheme = CONST.signScheme; break;
            case 'at': scheme = CONST.atScheme; break;
            case 'atClick': scheme = CONST.atClickScheme; break;
            case 'atDeleteClick': scheme = CONST.atDeleteScheme; break;
            case 'scrollToSelect': scheme = CONST.scrollToSelect; break;
            case 'getSelectionData': scheme = CONST.getSelectionData; break;
        }
        console.log(scheme + data);
    }

    function removeAutoFormat(content, virtualDom) {
        var autoFormatDom = virtualDom.querySelectorAll(".autoFormat");
        console.log('autoFormatDom.length: ' + autoFormatDom.length)
        for (var i = 0;i < autoFormatDom.length;i++) {
            console.log('outerHTML: ' + autoFormatDom[i].outerHTML)
            console.log('innerText: ' + autoFormatDom[i].innerText)
            content = content.replace('<span>' + autoFormatDom[i].outerHTML + '</span>', autoFormatDom[i].innerText)
        }
        return content
    }

    var hasContentEditable = false
    function changeHrefEditable(isEditable) {
        hasContentEditable = true
        var nodes = document.getElementsByTagName("a")
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i]
            node.setAttribute("contenteditable", isEditable);
        }
    }

    function removeHrefEditable(virtualDom) {
        if (hasContentEditable) {
            var nodes = virtualDom.getElementsByTagName("a")
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i]
                node.removeAttribute("contenteditable")
            }
        }
    }

    function autoFormat() {
        getCurrentTime();
        var content = document.getElementById('QMUIEditor');
        var start = +new Date;
        var ret = linkify(content, [
            urlTransform,
            emailTransform,
            phoneTransform
        ]);
        checkHref()
    }

    // 防止 A 标签中的xss攻击。
    function checkHref() {
        var nodes = document.getElementsByTagName("a")
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i]
            var href = node.href
            if (href != null) {
                href = href.replace(new RegExp("<","gm"),"&lt;")
                node.href = href
            }
        }
    }

    var IGNORE_NODE_NAMES = ['A', 'STYLE', 'SCRIPT']
    function ignoreNode(node) {
        return node.parentNode &&
            (IGNORE_NODE_NAMES.indexOf(node.parentNode.nodeName.toUpperCase()) != -1
            || node.parentNode.hasAttribute('ignore'));
    }

    function linkify(el, transforms) {
        var node, nodes = [],
            count = 0, loop = 0, match = 0;

        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
            // Android 2.3 Webkit 533.1 BUG:
            // https://bugs.webkit.org/show_bug.cgi?id=35296
            acceptNode: function(node) {
                if (ignoreNode(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }, false);

        while (node = walker.nextNode()) {
            nodes.push(node);
        }

        while (node = nodes.shift()) {
            count++;
            (function transform(node, i) {
                i = i || 0;
                var originalText = node.textContent;
                //createTreeWalker会进行转义字符解析，可能造成xss漏洞，这里需要替换回来
                originalText = originalText.replace(new RegExp("<","gm"),"&lt;");
                originalText = originalText.replace(new RegExp('"',"gm"),"&quot;");
                if (!transforms[i] || originalText.trim().length == 0) return;
                if (ignoreNode(node)) return;
                loop++;
                var newText = transforms[i](originalText);
                if (originalText != newText) {
                    match++;
                    var newNode = document.createElement('span');
                    newNode.innerHTML = newText;
                    node.parentNode.insertBefore(newNode, node);
                    node.parentNode.removeChild(node);
                    linkify(newNode, transforms);
                } else {
                    transform(node, i+1)
                }
            })(node);
        }
        return [count, loop, match]
    }

    function phoneTransform(content) {
        phone.lastIndex = 0;
        return content.replace(phone, function(m) {
            var c = 0;
            for (var i = 0, l = m.length; i < l; i++) {
                if (/\d/.test(m.charAt(i))) c++;
            }
            if (c >= 5 && c <= 20) {
                var arr = m.split(/(\s|-)/)
                arr = arr.slice(arr.length - 3)
                if (arr.length > 0) {
                    for (var i = 0, l = arr.length; i < l; i++) {
                        if (arr[i].length > 2) {
                            return '<a href="tel:' + m + '" class="' + autoFormatClass + '">' + m + '</a>';
                        }
                    }
                } else {
                    return '<a href="tel:' + m + '" class="' + autoFormatClass + '">' + m + '</a>';
                }
            }
            return m;
        });
    }

    function emailTransform(content) {
        email.lastIndex = 0;
        return content.replace(email, '<a href="mailto:$&" class="' + autoFormatClass + '">$&</a>');
    }

    function urlTransform(content) {
        url.lastIndex = 0;
        return content.replace(url, function(m) {
            if (/^http/.test(m)) {
                return '<a href="' + m + '" class="' + autoFormatClass + '">' + m + '</a>';
            }
            return '<a href="http://' + m + '" class="' + autoFormatClass + '">' + m + '</a>';
        });
    }

    function dateTransform(content) {
        return content.replace(date, function(m){
            date.lastIndex = 0;
            var myGroup = date.exec(m.trim());
            var yearExist = true;
            var monthExist = true;
            var dayExist = true;
            var hourExist = true;
            var minuteExist = true;
            var secondExist = true;
            var oneDay = 86400000;
            var wrongFormat = false;

            //判空保护
            if(myGroup == null){
                return m;
            }
            //根据正则分组，填坑式匹配年月日时分秒
            //myGroup[23]与myGroup[4]代表年	myGroup[25]与myGroup[6]代表月	myGroup[26]与myGroup[7]代表日
            //myGroup[12]代表时		myGroup[13]代表分		myGroup[16]代表秒
            if(myGroup[23] == null){
                if(myGroup[4] == null){
                    yearExist = false;
                    myGroup[23] = myYear;
                }else{
                    myGroup[23] = myGroup[4];
                }
            }

            if(myGroup[23]<100){
                //如果年份是两位数，且字符串中有"年"，则识别，否则不识别
                //if((myGroup[19] != null && /年/.test(myGroup[19])) || (myGroup[3] != null && /年/.test(myGroup[3]))  && myGroup[23]<60){
                if (/年/.test(myGroup[0])) {
                    myGroup[23] = +myGroup[23] + 2000;
                }
                else{
                    myGroup[23] = +myGroup[23] + 1900;
                }
            }
            //日历上限为2036年12月31日
            if(myGroup[23] > 2036){
                return m;
            }
            if(myGroup[25] == null){
                if(myGroup[6] == null){
                    monthExist = false;
                    myGroup[25] = myMonth;
                }else{
                    myGroup[25] = myGroup[6];
                }
            }
            if(myGroup[26] == null){
                if(myGroup[7] == null){
                    dayExist = false;
                    myGroup[26] = myDay;
                }else{
                    myGroup[26] = myGroup[7];
                }
            }
            if(myGroup[12] == null){
                hourExist = false;
                myGroup[12] = myHour;
            }
            if(myGroup[13] == null){
                minuteExist = false;
                myGroup[13] = myMinute;
            }
            if(myGroup[16] == null){
                secondExist = false;
                myGroup[16] = mySecond;
            }

            if(myGroup[19] == "pm" || myGroup[19] == "PM" ){
                if(myGroup[12] > 12){
                    wrongFormat = true;
                }
                else if(myGroup[12] < 12){
                    myGroup[12] = +myGroup[12] + 12;
                }
            }

            if(myGroup[19] == "am|AM" && myGroup[12] > 12){
                wrongFormat = true;
            }

            if(myGroup[9] != null && (myGroup[9] == "下午" || myGroup[9] == "晚上") ){
                if(myGroup[12] < 12){
                    if(myGroup[9] == "下午"){
                        myGroup[12] = +myGroup[12] + 12;
                    }
                    else{
                        if(myGroup[12] > 4){
                            myGroup[12] = +myGroup[12] + 12;
                        }
                    }
                }
            }

            //对"中午1点"，"中午2点"，"中午3点"进行特殊处理
            if( myGroup[9] != null && myGroup[9] == "中午" && myGroup[12] != null && myGroup[12] < 4 ){
                myGroup[12] = +myGroup[12] + 12;
            }

            var UTCTime = myGroup[23]+"/"+myGroup[25]+"/"+myGroup[26]+" "+myGroup[12]+":"+myGroup[13]+":"+myGroup[16];
            var myTransformDate = Date.parse(UTCTime);//不用getTime()转换已经是Long值，与java不同...
            //如果“时”存在但“分”不存在，说明是整点，对数据进行抺平
            if( hourExist && !minuteExist ){
                myTransformDate = parseInt(myTransformDate / (oneDay/24)) * (oneDay/24);
            }
            //对"下午12点"，"晚上12点"，"12:00pm"进行特殊处理
            if(myGroup[12] == 12 && (myGroup[9] == "下午" || myGroup[9] == "晚上" || myGroup[19] == "pm" || myGroup[19] == "PM")){
                myTransformDate += oneDay/2
            }

            //对后面包含am、pm，但是前面的值大于12进行处理
            if(wrongFormat){
                if( (myTransformDate - myReadMailDate) >= 0 ){
                    return '<a href="date:' + m.substr(0,m.length-2) + ',' + myTransformDate + '">'
                        + m.substr(0,m.length-2) + '</a>' + m.substr(m.length-2, m.length);
                }
                else {
                    return '<a href="date:' + m.substr(0,m.length-2) + ',' + (myTransformDate+oneDay) + '">'
                        + m.substr(0,m.length-2) + '</a>' + m.substr(m.length-2, m.length);
                }
            }
            //只有时分秒的情况
            if( !(yearExist || monthExist || dayExist) && hourExist ){
                if (hourExist && !minuteExist) {
                    if (!/时/.test(myGroup[0]) && !/点/.test(myGroup[0]) ) {
                        return m;
                    };
                };
                if ( hourExist || /分/.test(myGroup[0]) || (minuteExist && myGroup[13].length == 2) ) {
                    if( (myTransformDate - myReadMailDate) >= 0 ){
                        return '<a href="date:' + m + ',' + myTransformDate + '">' + m + '</a>';
                    }
                    else {
                        return '<a href="date:' + m + ',' + (myTransformDate+oneDay) + '">' + m + '</a>';
                    }
                };
            }
            //判断日期合法性
            if( myGroup[25] == 2 ){
                if( myGroup[26] > 29 ){
                    return m;
                }
                else if( myGroup[26] == 29 ){
                    //2月29 没指明年份 特殊处理
                    if( !yearExist && (myTransformDate - myReadMailDate < 0) ){
                        var deltaYear = 4 - myGroup[23]%4;
                        return '<a href="date:' + m + ',' + (myTransformDate+oneDay*365*deltaYear) + '">' + m + '</a>';
                    }
                    if( !((myGroup[23]%100 == 0 && myGroup[23]%400 == 0) || (myGroup[23]%100 != 0 && myGroup[23]%4 == 0)) ){
                        return m;
                    }
                }
            }
            else {
                if( myGroup[26] == 31 ){
                    if( (myGroup[25]==4 || myGroup[25]==6 || myGroup[25]==9 || myGroup[25]==11) ) {
                        return m;
                    }
                }
            }

            //没有时分秒的情况（包括 年月日 或 月日）
            var deltaTime = 2000;//阀值2000ms
            if ( yearExist || /月/.test(myGroup[0]) || myGroup[26].length == 2 ) {
                if( myTransformDate - myReadMailDate >= 0 ){
                    return '<a href="date:' + m + ',' + myTransformDate + '">' + m + '</a>';
                }
                //正好是当天的特殊情况，假定阀值为2秒，待调整(load完页面pageFinished的时间"myReadMailDate"与运算加载得出的"myTransformDate"存在一定偏差)
                else if( myTransformDate + deltaTime - myReadMailDate  >= 0 ){
                    return '<a href="date:' + m + ',' + (myTransformDate+deltaTime) + '">' + m + '</a>';
                }
                else{
                    if(!yearExist){
                        return '<a href="date:' + m + ',' + (myTransformDate+oneDay*365) + '">' + m + '</a>';
                    }
                }
            };
            return '<span ignore>' + m + '</span>';
        })
    }

    var phone = /(\+[0-9]+[\- ]*)?(\([0-9]+\)[\-]*)?([0-9][0-9\-][0-9\-]+[0-9]{2,})(?!\.)(?!\d)/g;
    var email = /[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})+/g;

    // copy webmail 的版本
    var url = /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:(&amp;amp;)|(&amp;)|[^\s`!()\uff08\uff09\[\]{};'"<>\u201c\u201d\u2018\u2019\u3002\uff0c\uff1b]|([(\uff08][^\s()\uff08\uff09<>]+[)\uff09])|([(\uff08][^\s()\uff08\uff09<>]*?[(\uff08][^\s()\uff08\uff09<>]*?[)\uff09][)\uff09]))+(?:([(\uff08][^\s()\uff08\uff09<>]+[)\uff09])|([(\uff08][^\s()\uff08\uff09<>]*?[(\uff08][^\s()\uff08\uff09<>]*?[)\uff09][)\uff09])|[^\s`!()\uff08\uff09\[\]{};:'".,<>?\u201c\u201d\u2018\u2019\u3002\uff0c\uff1b]))/g;
    var date = /((((?!0000)([0-9]{4}|[0-9]{2})[-/\.年])?((0[1-9]|1[0-2]|[1-9])[-/\.月](0[1-9]|1[0-9]|2[0-9]|3[01]|[1-9])[日号,，]?))\s*)?((上午|中午|下午|晚上)\s*)?\b((([01]?[0-9]|2[0-3])[:：时点]([0-5]?[0-9])?分?((:([0-5][0-9]))|(([0-5]?[0-9])秒))?)\s?(am|pm|AM|PM)?)(?!\d)|\b((((?!0000)([0-9]{4}|[0-9]{2})[-/\.年])?((0[1-9]|1[0-2]|[1-9])[-/\.月](0[1-9]|1[0-9]|2[0-9]|3[01]|[1-9])[日号]?)))(?!\d)/g;

    var myYear,myMonth,myDay,myHour,myMinute,mySecond,myReadMailDate;

    function getCurrentTime(){
        var myDate = new Date();
        myYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        myMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        myDay = myDate.getDate();        //获取当前日(1-31)
        myHour = myDate.getHours();       //获取当前小时数(0-23)
        myMinute = myDate.getMinutes();     //获取当前分钟数(0-59)
        mySecond = myDate.getSeconds();     //获取当前秒数(0-59)
        myReadMailDate = myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
        //  		console.log("helloworld_"+myYear+","+myMonth+","+myDay+","+myHour+","+myMinute+","+mySecond+","+myReadMailDate)
    }


    /**
     * state: 编辑器状态
    */
    var state = QMUIEditor.state = {};
    state.map = {
        bold: 'BOLD',
        strikeThrough: 'STRIKETHROUGH',
        insertUnorderedList: 'UNORDEREDLIST',
        justifyCenter: 'JUSTIFYCENTER',
        color: {
            hook: function(output){
                var colorArr = doc.queryCommandValue('forecolor').replace("rgb(",'').replace(")",'').replace(/\s/g,'').split(',');
                output.push('COLOR='+rgb2hex(colorArr[0], colorArr[1], colorArr[2]));
            }
        },
        fontSize: {
            hook: function(output){
                function getSizeName(size){
                    switch(size){
                        case CONST.fontSizeLarge: return 'LARGE';
                        case CONST.fontSizeBig: return 'BIG';
                        case CONST.fontSizeNormal: return 'NORMAL';
                        case CONST.fontSizeSmall: return 'SMALL';
                        default: return 'UNKNOWN';
                    }
                }
                var size = parseInt(doc.queryCommandValue('fontSize'));
                output.push('FONTSIZE='+getSizeName(size));
            }
        },
        formatBlock: {
            hook: function(output){
                var formatBlock = doc.queryCommandValue('formatBlock')
                if(formatBlock.length > 0){
                    output.push('FORMATBOLCK=' + formatBlock.toUpperCase())
                }
            }
        },
        selectionContent: {
            hook: function(output){
                if (win.getSelection().toString().length > 0) {
                    output.push('SELECTIONCONTENT=' + win.getSelection().toString());
                }
            }
        }
    }
    state.current = '';
    state.push = function() {
        var self = this,
            states = [];
        for(var key in self.map){
            if(Object.prototype.hasOwnProperty.call(self.map, key)){
                var val = self.map[key]
                if(val.hook){
                    val.hook(states)
                }else{
                    doc.queryCommandState(key) && states.push(val);
                }
            }
        }
        states = states.join('&');
        if(self.current === states){
            return;
        }
        self.current = states;
        nativeNotify('content', editor.getHtml());
        nativeNotify('state', states);
    }


/**
 * selection: 光标选区相关
 */
    var selection = QMUIEditor.selection = {};
    selection.current = {
        'startContainer': null,
        'startOffset': 0,
        'endContainer': null,
        'endOffset': 0
    };
    selection.backup = function(){
        /**
         * 备份当前选区到selection.current
         */
        var sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            this.current = {
                'startContainer': range.startContainer,
                'startOffset': range.startOffset,
                'endContainer': range.endContainer,
                'endOffset': range.endOffset
            };
        }
    }
    selection.restore = function(){
        /**
         * 将selection.current还原到编辑器里
         */
        var sel = win.getSelection();
        sel.removeAllRanges();
        var range = doc.createRange();
        if(this.current.startOffset > this.current.startContainer.length){
            this.current.startOffset = this.current.startContainer.length;
        }
        if(this.current.endOffset > this.current.endContainer.length){
            this.current.endOffset = this.current.endContainer.length;
        }
        range.setStart(this.current.startContainer, this.current.startOffset);
        range.setEnd(this.current.endContainer, this.current.endOffset);
        sel.addRange(range);
    }
    selection.getYCoods = function(){
        /**
         * 取得光标位置在y方向的数据，包括height,top,bottom,其中:
         * top: 光标上边缘到window上边缘的距离
         * bottom: 光标下边缘到window上边缘的距离
         * height: 光标上边缘
         * 上述“光标”指的是光标形成的rect
         * inspired by http://stackoverflow.com/questions/11126047/find-y-coordinate-for-cursor-position-in-div-in-uiwebview#answer-12300505
         */
        var sel = doc.selection,
            range,
            top = 0,
            bottom = 0,
            height = 0;
        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                var rect;
                if (range.getClientRects().length > 0) {
                    range.collapse(true);
                    // 然而因为该方法只会在input事件中调用，也就是用户用按键并输入的行为完成后调用，因此此时只有一个 rect
                    rect = range.getClientRects()[0];
                    top = rect.top;
                    height = rect.height;
                    bottom = rect.bottom;
                } else {
                    var currentNode = range.endContainer,
                        currentOffset = range.endOffset,
                        children = Array.prototype.slice.call(currentNode.childNodes);
                    if(children[currentOffset - 1]){
                        rect = children[currentOffset - 1].getBoundingClientRect();
                    }else{
                        rect = currentNode.getBoundingClientRect();
                    }
                    top = rect.top;
                    height = rect.height;
                    bottom = rect.bottom;
                }
            }
        }
        return {
            top: top,
            bottom: bottom,
            height: height
        };
    }
    selection.selectNodeAndCollapse = function(node, begin){
        /**
         * 选择一个node并将光标聚焦在它的开始或结束位置
         * @param {Bool} begin - 与系统range.collapse()方法的参数作用一致，true表示开始位置，false表示结束位置
         */
        var sel = win.getSelection(),
            range = doc.createRange();
        range.selectNodeContents(node);
        range.collapse(begin);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    selection.setCursor = function(parentNode, index){
        /**
         * 设置光标
         */
         const range = document.createRange();
         const selection = window.getSelection();
         range.selectNodeContents(parentNode);
         range.setStart(parentNode, index);
         range.setEnd(parentNode, index);
         if (selection) {
               selection.removeAllRanges();
               selection.addRange(range);
         }
         this.focus();
    }

    /**
     * 选择一个node并选中node的范围
     * @param {*} node
     */
    selection.selectNode = function (node) {
        var sel = win.getSelection(), range = doc.createRange();
        range.selectNodeContents(node);
        sel.removeAllRanges();
        sel.addRange(range);
    }

/**
 * editor: 编辑器div拓展
 */
    var editor = QMUIEditor.editor =  doc.querySelector('#QMUIEditor');
    var header = doc.querySelector('#QMUIEditorHead');
    editor.setHeaderHeight = function(height) {
        /**
         * 设置编辑器头部区域高度，该区域用来放业务需要的view
         */
        header.style.cssText = 'height:' + height + 'px';
//        this.style.cssText = 'min-height:' + (win.innerHeight - height) + 'px';
//        win.onresize = function(){
//            editor.style.cssText = 'min-height:' + (win.innerHeight - height) + 'px';
//        }
    }
    editor.clear = function(){
        /**
         * 清空编辑器内容还原为最初状态
         * 邮箱里编辑器需要有一个 <div><sign class="qqmail_sign"></sign></div> 给客户端设置签名
         */
        console.log("editor clear")
        this.innerHTML = '<' + CONST.defaultParagraph + '><br><br><br><br><br><br></' + CONST.defaultParagraph + '><div><sign class="qqmail_sign"></sign></div>';
    }
    editor.enableEditable = function() {
        console.log('enableEditable')
        var editableStyle = '-webkit-user-modify: read-write !important;'
        if (isDarkMode) {
            editableStyle = editableStyle + "background-color: #fefeff;"
        }
        document.getElementById('QMUIEditor').style = editableStyle
    }
    editor.disableEditable = function() {
        console.log('disableEditable')
        var disableEditableStyle = '-webkit-user-modify: read-only !important;'
        if (isDarkMode) {
            disableEditableStyle = disableEditableStyle + "background-color: #fefeff;"
        }
        document.getElementById('QMUIEditor').style = disableEditableStyle
    }
    editor.isFocused = function(){
        return doc.activeElement === this;
    }
    editor.isEmpty = function(){
        /**
         * 检查编辑器的内容是否为空，按顺序遵循以下规则：
         * 若存在具有特殊视觉表现的标签，则返回 false
         * 当innerText长度为1且br个数为1，相当于当前编辑器只有一个空的段落，返回 true
         * 判断innerText的长度，这里不判断trim后的情况，因为当在第一行执行回车，编辑器的innerText为两个空字符（获取innerText时一个br就是一个空字符），此时不能说浏览器为空。同理当用户已开始猛敲空格，我们也不能将它定义为 空 ，因为有可能这就是用户想要执行的输入行为
         */
        if(this.querySelectorAll('img, iframe, canvas, object, blockquote, ul, h1, h2, h3, h4, h5, h6').length > 0){
            return false;
        }
        if(this.innerText.length === 1 && this.innerText.length === this.querySelectorAll('br').length){
            console.log("editor is empty innerText = 1")
            return true;
        }
        var empty = this.innerText.length <= 0
        if (empty) {
            console.log("editor is empty innerText <= 0")
        }
        return empty;
    }
    editor.setPlaceholder = function(text){
        this.setAttribute('placeholder', text);
    }
    editor.togglePlaceholder = function(){
        /**
         * 切换placeholder的显示
         */
        if(this.isEmpty()){
            this.classList.add('QMUIEditor_empty');
        }else{
            this.classList.remove('QMUIEditor_empty');
        }
    }
    editor.focusEditorAtStartSelection = function(){
         selection.selectNodeAndCollapse(this, true);
         this.focus();
    }
    editor.blurfocus = function(){
        // 备份一下选区,以防失焦状态下插入失败
        // selection.backup();
        this.blur();
        win.getSelection().removeAllRanges();
    }
    editor.focusEditorAtBackupSelection = function(){
        /**
         * 聚焦编辑器并将光标恢复到上一次backup的位置
         * 如果没有backup过则将光标移动到编辑器的最末尾
         */
        if(selection.current.startContainer) {
            selection.restore();
            this.focus();
            if (window.getSelection().focusNode != selection.current.startContainer) {
                selection.selectNodeAndCollapse(selection.current.startContainer, false);
            }
        }else{
            selection.selectNodeAndCollapse(this, false);
            this.focus();
        }
    }
    editor.updatingScrollY = false;
    var mSelectionBottom;
    editor.updateScrollY = function(extraHeight){
        /**
         * 调整页面的scrollTop，保证光标聚焦的地方可见且不会紧贴window下边缘
         */
            var caretTopToWindowTop = selection.getYCoods().top,
                caretBottomToWindowTop = selection.getYCoods().bottom,
                windowHeight = win.innerHeight,
                scrollTop = win.scrollY,
                comfortableOffset = 20,
                offset = 0;
                mSelectionBottom = caretBottomToWindowTop;
            if(caretBottomToWindowTop + comfortableOffset + extraHeight >= windowHeight && !editor.updatingScrollY){
                editor.updatingScrollY = true;
                offset = caretBottomToWindowTop - windowHeight + comfortableOffset;
                window.scrollTo(0, scrollTop + offset + extraHeight);
                editor.updatingScrollY = false;
            }
    }
    editor.scrollAfterInsertMap = function() {
        var top = selection.getYCoods().top,
            bottom = selection.getYCoods().bottom,
            windowHeight = win.innerHeight,
            scrollTop = win.scrollY,
            comfortableOffset = 20,
            offset = 0;
        offset = 150 + mSelectionBottom + comfortableOffset + scrollTop - windowHeight;
        console.log('scrollAfterInsertMap, offset: ' + offset + ', top: ' + scrollTop + ', bottom: ' + mSelectionBottom + ', h: ' + windowHeight);
        nativeNotify('scrollyMap', offset);
        return offset;
    }

    editor.scrollToSelect = function () {
        var caretTopToWindowTop = selection.getYCoods().top,
            caretBottomToWindowTop = selection.getYCoods().bottom,
            windowHeight = win.innerHeight,
            scrollTop = win.scrollY,
            comfortableOffset = 30,
            offset = 0;
        if (caretBottomToWindowTop + comfortableOffset >= windowHeight) {
            editor.updatingScrollY = true;
            offset = 150 + caretBottomToWindowTop + comfortableOffset + scrollTop - windowHeight;
            console.log("zkzk scrollToSelect: scrollTop:" + scrollTop + ", windowheight:" + windowHeight + ", caretBottomToWindowTop:" + caretBottomToWindowTop + ", offset:" + offset)
            nativeNotify('scrollToSelect', offset);
        }
    }

    editor.setHtml = function(contents){
        /**
         * 设置编辑器的内容
         * @param {String} html.
         */
        this.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
        nativeNotify('contentReady', true)
    }
    editor.insertAtContent = function(html){
        /**
         * 插入光标处at内容
         * @param {String} html.
         */
         edit.delete();
        edit.insertAfterFocusNoBreak(html);
    }
    editor.getHtml = function(){
        /**
         * 获取编辑器的原始内容
         * 去掉所有系统生成的带style的span
         * 邮箱业务需要, 将blockquote的样式全部内联到标签里
         * @returns {String}
         */
        var output = '';
        var virtualDom = doc.createElement('div');
        virtualDom.innerHTML = this.innerHTML;
        var bq = this.querySelector('blockquote'),
            spanWithStyle = this.querySelectorAll('span[style]');
        if(bq){
            var cssObj = win.getComputedStyle(bq, null);
            var cssText = 'margin:' + cssObj['margin'] + ';' +
                            'padding:' + cssObj['padding'] + ';' +
                            'color:' + cssObj['color'] + ';' +
                            'background-color: ' + cssObj['background-color'];
            var bqs = virtualDom.querySelectorAll('blockquote');
            for(var i=0; i< bqs.length; i++){
                bqs[i].style.cssText += cssText;
            }
        }
        if(spanWithStyle.length > 0){
            var spanWithStyle = virtualDom.querySelectorAll('span[style]');
            for(var i = 0; i < spanWithStyle.length; i++){
                spanWithStyle[i].unwrap();
            }
        }
        // 去掉contenteditable
        removeHrefEditable(virtualDom)
        output = virtualDom.innerHTML;
        console.log('getHtml, _needAutoFormat: ' + _needAutoFormat)
        if (_needAutoFormat) {
            // 返回内容要去除掉autoformart的
            output = removeAutoFormat(output, virtualDom)
        }
        nativeNotify('content', output);
        return output;
    }
    editor.getSelectionData = function(){
        /**
         * 返回完整的innerHTML
         */
        var txt;
        if (window.getSelection) {
            txt = window.getSelection().toString();
        } else if (window.document.getSelection) {
            txt = window.document.getSelection().toString();
        } else if (window.document.selection) {
            txt = window.document.selection.createRange().text;
        }
        nativeNotify('getSelectionData', txt);
        return txt;
    }
    editor.getRawHtml = function(){
        /**
         * 返回完整的innerHTML
         */
        var html = this.innerHTML;
        nativeNotify('rawContent', html);
        return html;
    }
    editor.addEventListener('input', function(){
        /*
         * 监听输入事件，完成：
         * 1 保证编辑器首行有一个默认段落标签
         * 2 更新placeholder的显示状态
         * 3 更新页面scrollTop保证input的内容完整可见
         * 4 input事件的其他处理
         * 5 回调页面内容给app
         */
        if(editor.isEmpty()){
            nativeNotify('empty', "true");
            console.log("editor isEmpty")
            this.clear();
            selection.selectNodeAndCollapse(editor.firstChild, true);
        } else {
            nativeNotify('empty', "false");
        }
        this.togglePlaceholder();
        this.updateScrollY(0);
        edit.inputHandler();

        if((event.inputType && event.inputType.match('insert'))||(event.inputType == null && event.type && event.type.match('input'))){
            var selection = window.getSelection();
            var inputData = (event.data || selection.anchorOffset > 0) && selection.anchorNode
             && selection.anchorNode.textContent ? selection.anchorNode.textContent.substr(selection.anchorOffset - 1, 1) : null;

            if(inputData && inputData.match('@')){
                console.log("input @");
                nativeNotify('at', '');
            }
        }
    });
    editor.onImgClick = function(e){
        var img = e.target,
            src = img.getAttribute('src'),
            data = src;
        nativeNotify('event', data);
        selection.selectNodeAndCollapse(e.target.parentNode, false);
        this.focus();
    }
    editor.onAudioClick = function(e){
            var img = e.target,
                src = img.getAttribute('qmpath'),
                data = src;
        nativeNotify('audio', data);
    }
    editor.onSignClick = function (url) {
        nativeNotify('sign', url);
    }
    editor.addEventListener('click', function(e){
        /**
         * 监听编辑器内的img的点击并回调数据给app
         */
         console.log('click, node: ' + e.target.nodeName)
        if (e.target.nodeName.toLowerCase() == 'img') {
            if (e.target.hasAttribute("qmpath")) {
                this.onAudioClick(e);
            } else if (e.target.parentNode.nodeName.toLowerCase() == 'a'&& (e.target.parentNode.getAttribute('href').startsWith('https://apis.map.qq.com/uri/v1/marker?') || e.target.parentNode.getAttribute('href').startsWith('http://apis.map.qq.com/uri/v1/marker?'))) {
                // 地图，留给上层处理
                console.log('click map')
            } else {
                this.onImgClick(e);
            }
        } else {
            if (e.target.getParentElementByTagName('a')) {
                var url = e.target.getParentElementByTagName('a').getAttribute('href');
                if (url.indexOf('https://dev.mail.qq.com/home/index?t=readmail_businesscard_midpage') == 0
                    || url.indexOf('https://wx.mail.qq.com/home/index?t=readmail_businesscard_midpage') == 0
                    || url.indexOf('https://work.weixin.qq.com/wework_admin/user/h5/qqmail_user_card') == 0) {
                    console.log('click sign')
                    this.onSignClick(url);
                    return;
                }
            } else if(e.target.nodeName.toLowerCase() == 'a'){
                var url = e.target.getAttribute('href');
                var name = e.target.text;
                var email = e.target.getAttribute('data-wemail-alias');
                if(email){
                    console.log('on at click!')
                    nativeNotify('atClick', email+name);
                }
               return;
            }
            this.enableEditable()
            this.focus()
        }
    });
    editor.addEventListener('focus', function(e){
        /**
         * 编辑器聚焦时通知native
         */
        nativeNotify('focus', "true");
    });
    editor.addEventListener('blur', function(e){
        /**
         * 编辑器失焦时通知native
         */
         nativeNotify('focus', "false");
    });


/**
 * 编辑器操作的相关方法
 */
    var edit = QMUIEditor.edit = {};
    edit.scrollWithToolBarHeight = function (toolBarHeight) {
        editor.updateScrollY(toolBarHeight)
    }
    edit.changeHrefEditable = function (isEditable) {
        changeHrefEditable(isEditable)
    }
    edit.autoFormat = function () {
        autoFormat()
    }
    edit.delete = function() {
        /**
         * 调用系统命令进行退格删除
         */
        var sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            if (range.endOffset == 0 && range.startOffset == 0) {
                //如果刚好光标在当前节点的最前面，且上个节点的是个contenteditable=false的节点，应该把光标移动到上个节点的后面。
                //直接使用delete，光标还是会保留在当前位置。
                var focusNode = sel.focusNode;
                if (focusNode != null && focusNode.parentNode != null
                            && focusNode.parentNode.previousElementSibling != null
                            && focusNode.parentNode.previousElementSibling.hasAttribute("contenteditable")
                            && focusNode.parentNode.previousElementSibling.getAttribute("contenteditable") == "false") {
                      selection.selectNodeAndCollapse(focusNode.parentNode.previousElementSibling, false);
                      return;
                }
            }
        }
        //检测at联系人删除
        var atNode = null;
//        console.log('found focus  selection! ' + sel.anchorOffset + " " + sel.focusNode.childNodes.length);
        if(sel.anchorOffset > 0){
            //光标在整个节点的最后，比如段落
            atNode = sel.focusNode.childNodes[sel.anchorOffset-1];
            if(atNode && atNode.outerHTML !== "undefined"){
//                console.log('found focus atNode! ' + atNode.outerHTML);
            }
        }else{
            for(var i=1;i<sel.focusNode.parentNode.childNodes.length;i++){
                var childNode = sel.focusNode.parentNode.childNodes[i];
                if(sel.focusNode == childNode){
                    atNode = sel.focusNode.parentNode.childNodes[i-1];
//                    console.log('found focus pre node! ' + atNode.outerHTML);
                }
            }
        }
//        console.log('found focus  node! ' + sel.focusNode.outerHTML);
//        console.log('found focus parent  node! ' + sel.focusNode.parentNode.outerHTML);
        if(atNode && atNode.tagName && atNode.tagName.toLowerCase() == 'a'){
            var email = atNode.getAttribute('data-wemail-alias');
            if(email){
                nativeNotify('atDeleteClick', email+','+name);
            }
        }
        doc.execCommand('delete', false, null);
    }
    edit.deleteSelection = function() {
        // 删除选中的内容
        window.getSelection().deleteFromDocument();
    }
    edit.undo = function() {
        /**
         * 撤销最近执行的命令
         */
        doc.execCommand('undo', false, null);
    }
    edit.redo = function() {
        /**
         * 重做被撤销的操作
         */
        doc.execCommand('redo', false, null);
    }
    edit.insert = function(content, onlyText){
        /**
         * 原生的insert命令需要存在selection时候才可以进行，与是否被聚焦无关。这里加个通用方法做下判断确保有一个selection
         * @param {String} content - 插入的内容
         * @param {Bool} onlyText - 是否用纯文本
         */
        if(win.getSelection().rangeCount <= 0){
            if(selection.current.start){
                selection.restore();
            }else{
                selection.selectNodeAndCollapse(editor, false);
            }
        }
        doc.execCommand(onlyText?'insertText':'insertHTML', false, content);
    }
    edit.insertHtml = function(html){
        /**
         * 插入html片段，用的是默认的系统命令
         */
        this.insert(html);
    }
    edit.insertText = function(text){
        /**
         * 插入文本，用的是默认的系统命令
         */
        this.insert(text, true);
    }
    edit.insertImage = function(img){
        /**
         * 插入图片
         * @param {Object} img
         * @param {String} img.src
         * @param {String} img.alt
         * @param {Int} img.w - 图片原始高度
         * @param {Int} img.h - 图片原始高度
         * @param {String} img.addition - 附加数据
         */
        if(!img.src){
            console.log('img src not found');
            return;
        }
        var imgHtml = '<div><img src="' + img.src + '" width="' + (img.w || '') + '" height="' + (img.h || '') + '" data-addition="' + (img.addition || '') + '" alt="' + (img.alt || '') + '" /><br><br></div>';
        this.insert(imgHtml);
    }
    edit.insertMap = function(map) {
        /**
        * 插入地图
        * @param {Object} map
        * @param {String} map.jump
        * @param {Object} map.src
        * @param {Int} map.w
        * @param {Int} map.h
        */
        if (!map.src) {
            console.log('map img not found')
            return;
        }
        var mapHtml = '<a href="' + map.jump + '" target="_blank" notforedit="true" attr-hasmapwrap="1"><img src="' + map.src + '" width="' + (map.w || '') + '" height="' + (map.h || '') + '"></a><br>'
        this.insert(mapHtml);
    }
    edit.setBold = function(){
        /**
         * 加粗
         */
        doc.execCommand('bold', false, null);
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.strikeThrough = function(){
        /**
         * 中划线
         */
        doc.execCommand('strikeThrough', false, null);
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.setTextColor = function(color){
        doc.execCommand('forecolor', false, color);
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.setFontSize = function(size){
        /**
         * 设置字号
         * @param {int} size 字号的档次，三个值看CONST里的设定
         * https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
         * <font size=”?“>  CSS font-size; ?
         *      1               10px 太小，忽略
         *      2               ~14px
         *      3               15px-16px
         *      4               17px-20px
         *      5               21px-27px
         *      6               28px-39px
         *      7               40px~
         */
        doc.execCommand("fontSize", false, size);
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.setLargeFontSize = function(){
        edit.setFontSize(CONST.fontSizeLarge);
    }
    edit.setBigFontSize = function(){
        edit.setFontSize(CONST.fontSizeBig);
    }
    edit.setNormalFontSize = function(){
        edit.setFontSize(CONST.fontSizeNormal);
    }
    edit.setSmallFontSize = function(){
        edit.setFontSize(CONST.fontSizeSmall);
    }

    edit.setJustifyCenter = function(){
        /**
         * 设置居中，对居中的内容调用则会取消居中
         */
        if (doc.queryCommandState('justifyCenter')) {
            doc.execCommand('justifyLeft', false, null);
        }else{
            doc.execCommand('justifyCenter', false, null);
        }
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.setTitle = function(titleTag) {
        /**
         * 设置标题
         * h1[h2 h3 ...]不与其他段落格式共存，设置其中一个都需要取消另外两个
         */

        var formatBlock = doc.queryCommandValue('formatBlock');
        if (formatBlock === 'blockquote') {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>')
        }
        if (formatBlock.length > 0 && formatBlock.toLowerCase() === titleTag) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        } else {
            doc.execCommand('formatBlock', false, '<' + titleTag + '>');
        }
        if (doc.queryCommandState('insertUnorderedList')) {
            doc.execCommand('InsertUnorderedList', false, null);
        }
        edit.removeSpanWithStyle();
    }
    edit.setBlockquote = function() {
        /**
         * 设置引用段落
         * 允许引用里存在列表
         */
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }
        if (formatBlock == 'blockquote') {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>')
        } else {
            doc.execCommand('formatBlock', false, '<blockquote>');
        }
        edit.removeSpanWithStyle();
    }
    edit.saveFontTagWithSpace = function(){
        /**
         * 编辑器里生成font标签后设置列表
         * 如果
         * 1 当前光标所在的font标签的parent的唯一子node就是这个font
         * 2 当前光标所在的font标签的parent的子node只有这个font和一个br标签
         * 设置／取消列表的操作就会导致font标签消失，系统会主动做类似unwrap的行为
         * 这里在需要的时候为font标签前（或者后）加一个任意的字符node，就能避免这个行为
         * 步骤：
         * 保存选区，加字符－－执行需要的操作－－去掉字符，恢复选区
         * 选区的保存和恢复是必要的，因为任意dom的增减都会导致选区丢失
         */
        selection.backup();
        var fonts = doc.querySelectorAll('font');
        for(var i = 0;i <fonts.length; i++){
            var font = fonts[i],
                fontParent = font.parentNode;
            if((font == fontParent.firstChild && font == fontParent.lastChild) ||
                (font == fontParent.firstChild && fontParent.lastChild.nodeName.toLowerCase() == 'br' && fontParent.childNodes.length == 2)){
                var spaceTag = document.createElement('i');
                spaceTag.className = 'fontTag_space';
                spaceTag.innerHTML = '&nbsp;';
                spaceTag.prependBefore(font);
            }
        }
        selection.restore();
    }
    edit.removeSpaceTag = function(){
        selection.backup();
        var spaces = doc.querySelectorAll('.fontTag_space');
        for(var i = 0; i < spaces.length; i++){
            spaces[i].remove();
        }
        selection.restore();
    }
    edit.setUnorderedList = function () {
        /**
         * 设置无序列表
         */
        edit.saveFontTagWithSpace();
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }
        doc.execCommand('InsertUnorderedList', false, null);
        var ulRange = doc.getSelection().getRangeAt(0);
        var cloneContent = ulRange.cloneContents();
        // 有li是还原操作，没有是添加操作
        if (cloneContent.querySelector('li')) {
            // 添加时会在ul上多添加div父元素，删掉，保存下一个兄弟节点，用于记录插入位置
            var newNode = doc.createElement('ul');
            newNode.appendChild(cloneContent);
            var parent = ulRange.endContainer.parentNode.parentNode.parentNode;
            var next = parent.nextSibling;
            if (parent && parent !== QMUIEditor.editor && QMUIEditor.editor.contains(parent)) {
                QMUIEditor.editor.removeChild(parent);
                if (next) {
                    QMUIEditor.editor.insertBefore(newNode, next);
                } else {
                    QMUIEditor.editor.appendChild(newNode);
                }
                selection.selectNode(newNode);
            }
        }
        edit.removeSpanWithStyle();
        // 移除还原时多余的br
        edit.removeExtraBr();
        edit.removeSpaceTag();
    }
    edit.setOrderedList = function () {
        /**
         * 设置顺序列表
         */
        edit.saveFontTagWithSpace();
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }
        doc.execCommand('InsertOrderedList', false, null);
        var ulRange = doc.getSelection().getRangeAt(0);
        var cloneContent = ulRange.cloneContents();
        // 有li是还原操作，没有是添加操作
        if (cloneContent.querySelector('li')) {
            // 添加时会在ul上多添加div父元素，删掉，保存下一个兄弟节点，用于记录插入位置
            var newNode = doc.createElement('ol');
            newNode.appendChild(cloneContent);
            var parent = ulRange.endContainer.parentNode.parentNode.parentNode;
            var next = parent.nextSibling;
            if (parent && parent !== QMUIEditor.editor && QMUIEditor.editor.contains(parent)) {
                QMUIEditor.editor.removeChild(parent);
                if (next) {
                    QMUIEditor.editor.insertBefore(newNode, next);
                } else {
                    QMUIEditor.editor.appendChild(newNode);
                }
                selection.selectNode(newNode);
            }
        }
        edit.removeSpanWithStyle();
        // 移除还原时多余的br
        edit.removeExtraBr();
        edit.removeSpaceTag();
    }
    edit.isHeadingFormat = function(formatName){
        return ['h1','h2','h3','h4','h5','h6'].indexOf(formatName) >= 0;
    }
    edit.changeSign = function(content){
        var sign = doc.getElementsByClassName("qqmail_sign")[0];
        if(sign) {
            sign.innerHTML = content;
        }
    }
    edit.changeCardSign = function(content) {
      var sign = doc.getElementsByClassName("qqmail_sign")[0];
      if(sign) {
         sign.innerHTML = decodeURIComponent(content.replace(/\+/g, '%20'));
      }
    }
    edit.changeImgSrc = function(lastSrc, newSrc) {
        var imgs = doc.querySelectorAll("img");
        var currSrc;
        for(var i = 0; i < imgs.length; i++){
           currSrc = imgs[i].src;
           currSrc = decodeURIComponent(currSrc.replace(/\+/g, '%20'));
           if(currSrc.endsWith(lastSrc)) {
               currSrc = currSrc.replace(lastSrc, newSrc);
               imgs[i].src = currSrc;
           }
        }
    }
//    备用,勿删
//    edit.addLineForBlockquote = function(){
//        // 如果blockquote后面是一个不可聚焦的行,则补一个空行在后面给用户聚焦,否则当blockquote包着ul>li时,按回车永远跳不出blockquote
//        var node = win.getSelection().focusNode,
//            blockquote = null;
//        if(node.getParentElementByTagName('blockquote')){
//            blockquote = node.getParentElementByTagName('blockquote');
//        }else if(node.nodeName.toLowerCase() == 'blockquote'){
//            blockquote = node;
//        }else{
//            return;
//        }
//        if((blockquote.nextElementSibling && blockquote.nextElementSibling.textContent.length == 0) || !blockquote.nextElementSibling){
//            var newLine = doc.createElement('div');
//            newLine.innerHTML = '<br>';
//            newLine.appendAfter(blockquote);
//        }
//    }
    edit.inputHandler = function(){
        // 监听input事件并执行需要的特殊操作
        // 目前有:
        // 避免在blockquote里产生段落,重现路径:在blockquote里设置列表,回车取消列表,这时会产生一个段落元素。理想的情况应该在这时候光标跳出blockquote
        var node = win.getSelection().focusNode,
            div = null,
            blockquote = null;
        if(node.nodeName.toLowerCase() == CONST.defaultParagraph){
            div = node;
        }else if(node.getParentElementByTagName(CONST.defaultParagraph)){
            div = node.getParentElementByTagName(CONST.defaultParagraph);
        }else {
            return;
        }
        if(div.getParentElementByTagName('blockquote')){
            blockquote = div.getParentElementByTagName('blockquote');
            div.appendAfter(blockquote);
            if(!blockquote.innerHTML){
                blockquote.remove();
            }
            selection.selectNodeAndCollapse(div, false);
        }
        nativeNotify('input', "");
    }
    edit.removeSpanWithStyle = function(){
        // 在input事件里去掉所有span
        var spans = QMUIEditor.editor.querySelectorAll('span[style]');
       if(spans.length > 0){
          for(var i = 0; i<spans.length; i++){
              selection.backup();
              var span = spans[i];
              if(span.parentNode == editor){
                  span.wrapBy('div');
              }
              spans[i].unwrap();
              selection.restore();
          }
       }
    }
    edit.removeExtraBr = function () {
        var brs = QMUIEditor.editor.querySelectorAll('#QMUIEditor>br')
        for (var i = 0; i < brs.length; i++) {
            selection.backup();
            QMUIEditor.editor.removeChild(brs[i]);
            selection.restore();
        }
    }
    edit.insertAfterFocusNoBreak = function(html){
            /**
            * 插入内容，要求插入当前光标的后面,并且不能有换行
            */
        var node = win.getSelection().anchorNode;
        var parentNode = win.getSelection().anchorNode.parentNode;
        var atPosition = win.getSelection().anchorOffset;

        var insertParentNode = null;
        var sameInsertCount = 0;
        var notYeatInsert = true;
        if (node.id === "QMUIEditor") {
            this.insertAfterFocus(html)
        } else if (node.nodeType == Node.TEXT_NODE) {
            insertParentNode = parentNode;
            var newInnerHTML = '';
            for (var i = 0; i < parentNode.childNodes.length; i++) {
                var childNode = parentNode.childNodes[i];
                if (node != childNode) {
                    if (childNode.nodeType != Node.TEXT_NODE) {
                        newInnerHTML += childNode.outerHTML;
                        if (notYeatInsert && childNode.outerHTML == html) {
                            sameInsertCount++;
                        }
                    } else {
                        newInnerHTML += childNode.textContent;
                    }
                } else if (childNode.textContent.length == 0) {
                    if (childNode.nodeType != Node.TEXT_NODE) {
                        newInnerHTML += childNode.outerHTML;
                    } else {
                        newInnerHTML += childNode.textContent;
                    }
                    newInnerHTML += html;
                    notYeatInsert = false;
                } else if(notYeatInsert){
                    var textContent = node.textContent;
                    notYeatInsert = false;
                    newInnerHTML += textContent.substring(0, atPosition) + html + textContent.substring(atPosition, textContent.length);
                }
            }
            parentNode.innerHTML = newInnerHTML;
        } else {
            insertParentNode = node;
            var newInnerHTML = '';
            for (var i = 0; i < node.childNodes.length; i++) {
                var childNode = node.childNodes[i];
                if (childNode.nodeType != Node.TEXT_NODE) {
                    if (node.childNodes.length != 1 || childNode.tagName.toLowerCase() != 'br') {
                        newInnerHTML += childNode.outerHTML;
                    }
                    if (notYeatInsert && childNode.outerHTML == html) {
                        sameInsertCount++;
                    }
                } else {
                    newInnerHTML += childNode.textContent;
                }
                if (i >= atPosition - 1 && notYeatInsert) {
                    newInnerHTML += html;
                    notYeatInsert = false;
                }

            }
            node.innerHTML = newInnerHTML;
        }

        if (insertParentNode) {
            for (var i = 0; i < insertParentNode.childNodes.length; i++) {
                var childNode = insertParentNode.childNodes[i];
                if (childNode.outerHTML == html) {
                    if (sameInsertCount > 0) {
                        sameInsertCount--;
                        continue;
                    }

                    selection.setCursor(insertParentNode, i + 1);
                    break;
                }
            }
        }
    }
    edit.insertAfterFocus = function(html){
            /**
            * 插入内容，要求插入当前光标的后面
            */
            var node = win.getSelection().focusNode;
            if (node == null) {
                editor.focusEditorAtBackupSelection();
                node = win.getSelection().focusNode;
            }

            if (node.id === "QMUIEditor") {
                this.insert(html)
            } else {
                var insertNode = document.createElement("div");
                insertNode.innerHTML=html;
                insertNode.appendAfter(node);
                selection.selectNodeAndCollapse(insertNode, false);
            }
        }

    edit.insertAfterFocusNode = function(html){
        /**
        * 插入内容，要求插入在editor根节点, 且在当前光标的后面, 如果当前无聚焦
        */
        var node = win.getSelection().focusNode;
        if (node == null) {
            editor.focusEditorAtBackupSelection();
            node = win.getSelection().focusNode;
        }

        if (node.id === "QMUIEditor") {
            this.insert(html)
        } else {
            var insertNode = document.createElement("div");
            insertNode.innerHTML=html;
            var parent = node.parentElement;
            while (parent.id != "QMUIEditor") {
                node = parent;
                parent = node.parentElement;
            }
            insertNode.appendAfter(node);
            selection.selectNodeAndCollapse(insertNode, false);
        }
    }

/*
 * 初始化:
 * 设置默认首行段落标签
 * 设置默认的段落标签
 * 监听光标选区变化事件，完成：
 * 1 editor.togglePlaceholder();
 * 2 回调当前光标选区所在位置的标志给app，具体标志见 state.map
 * 3 及时备份选区
 */
    QMUIEditor.init = function(){
        doc.execCommand('defaultParagraphSeparator', false, CONST.defaultParagraph);
        console.log("editor init")
        editor.clear();
        doc.addEventListener('selectionchange', function(){
            editor.togglePlaceholder();
            state.push();
            selection.backup();
        });
        if (isDarkMode) {
            doc.getElementById('QMUIEditor').style.backgroundColor = "#fefeff"
        }
    }

})(window, document);

QMUIEditor.init();