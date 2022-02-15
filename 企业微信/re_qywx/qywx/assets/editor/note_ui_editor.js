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
    Node.prototype.getChildElementByTagName = function(tagName){
        /**
         * 寻找node的子元素且该子元素的标签名必须为tagName
         * @type {String} tagName － 指定的标签名
         */
        var targetNodeName = tagName.toLowerCase();
        var children = this.childNodes
        for (var i = 0;i < children.length;i++) {
            var child = children[i]
            if (child && child.tagName.toLowerCase() == targetNodeName) {
                return child
            }
            if (child.hasChildNodes()) {
                // 递归调用
                var target = child.getChildElementByTagName(tagName)
                if (target != null) return target
            }
        }
        return null
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
    var _enableFocus = _oUrlParams["focus"] == "true"
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
        scrollToSelect: 'qmuire-scroll-to-select://', // 滚动到光标所在位置
        shareWebView: 'qmuire-share-webview://',  // 分享记事前将音频置灰
        clickCheckList: 'qmuire-click-check-list://', // 点击checkbox的回调,用于统计
        scheduleTitleScheme: 'qmuire-scheduleTitle://',//点击日期链接会抓取同一行后面的文字作为日程的标题
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
            case 'scrollToSelect': scheme = CONST.scrollToSelect; break;
            case 'contentReady': scheme = CONST.contentReadyScheme; break;
            case 'shareWebView': scheme = CONST.shareWebView; break;
            case 'clickCheckList': scheme = CONST.clickCheckList; break;
            case 'scheduleTitleScheme': scheme = CONST.scheduleTitleScheme; break;
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

    function replaceAutoFormatToSpan() {
        var autoFormatNodes = document.querySelectorAll(".autoFormat");
        for (var i = 0;i < autoFormatNodes.length;i++) {
            var autoFormatNode = autoFormatNodes[i];
            var spanNode = document.createTextNode(autoFormatNode.innerText);
            if (autoFormatNode.parentNode != null
                && autoFormatNode.parentNode.nodeName.toLowerCase() == "span"
                && autoFormatNode.parentNode.parentNode != null) {
                // A标签连同span标签一起替换成纯文本
                autoFormatNode.parentNode.parentNode.replaceChild(spanNode, autoFormatNode.parentNode)
            }
        }
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

    function removeAllImageLoadBefore(virtualDom) {
        var images = virtualDom.querySelectorAll('img');
        for (var i = 0;i < images.length;i++) {
            images[i].classList.remove('imageLoadBefore');
        }
    }

    function replaceImgWithAudio(virtualDom) {
        // 找出所有audio的img
        var audioImages = virtualDom.querySelectorAll('.audioImage');
        for (var i = 0;i < audioImages.length;i++) {

            var item = audioImages[i];
            var qmtitle = item.getAttribute('qmtitle');
            var qmpath = item.getAttribute('qmpath');
            var qmsize = item.getAttribute('qmsize');

            var audioNode = document.createElement('audio');
            audioNode.setAttribute('src', qmpath);
            audioNode.setAttribute('qmtitle', qmtitle);
            audioNode.setAttribute('qmsize', qmsize);
            audioNode.setAttribute('class', 'ios-upload-audio');
            audioNode.setAttribute('controls', 'true');
            audioNode.setAttribute('preload', 'metadata');
            audioNode.setAttribute('qmduration', '0');
            audioNode.appendAfter(item);
        }
        // console.log("zkzk before audioImages size:" + audioImages.length);
        for (var i = 0;i < audioImages.length;i++) {
            audioImages[i].remove();
        }
        // console.log("zkzk after audioImages size:" + audioImages.length);
    }

    function autoFormat(needDate) {
        getCurrentTime();
        var content = document.getElementById('QMUIEditor');
        var start = +new Date;
        if (needDate) {
            var ret = linkify(content, [
                urlTransform,
                emailTransform,
                phoneTransform,
                dateTransform,
            ]);
        } else {
            var ret = linkify(content, [
                urlTransform,
                emailTransform,
                phoneTransform,
            ]);
        }
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
            if (myGroup == null) {
                return m;
            }

            //根据正则分组，填坑式匹配年月日时分秒
            //myGroup[23]与myGroup[4]代表年
            //myGroup[25]与myGroup[6]代表月
            //myGroup[26]与myGroup[7]代表日
            //myGroup[12]代表时
            //myGroup[13]代表分
            //myGroup[16]代表秒

            // 处理年份
            if (myGroup[23] == null) {
                if (myGroup[4] == null) {
                    yearExist = false;
                    myGroup[23] = myYear;
                } else {
                    myGroup[23] = myGroup[4];
                }
            }
            if (myGroup[23] < 100) {
                //如果年份是两位数，且字符串中有"年"，则识别，否则不识别
                //if((myGroup[19] != null && /年/.test(myGroup[19])) || (myGroup[3] != null && /年/.test(myGroup[3]))  && myGroup[23]<60){
                if (/年/.test(myGroup[0])) {
                    myGroup[23] = +myGroup[23] + 2000;
                }
                else{
                    myGroup[23] = +myGroup[23] + 1900;
                }
            } else if (myGroup[23] > 2036) {
                //日历上限为2036年12月31日
                return m;
            }

            // 判断月份
            if (myGroup[25] == null) {
                if (myGroup[6] == null) {
                    monthExist = false;
                    myGroup[25] = myMonth;
                } else {
                    myGroup[25] = myGroup[6];
                }
            }
            // 判断日期
            if (myGroup[26] == null) {
                if (myGroup[7] == null) {
                    dayExist = false;
                    myGroup[26] = myDay;
                } else {
                    myGroup[26] = myGroup[7];
                }
            }
            // 判断时
            if(myGroup[12] == null){
                hourExist = false;
                myGroup[12] = myHour;
            }
            // 判断分
            if(myGroup[13] == null){
                minuteExist = false;
                myGroup[13] = myMinute;
            }
            // 判断秒
            if(myGroup[16] == null){
                secondExist = false;
                myGroup[16] = mySecond;
            }

            if (myGroup[19] == "pm" || myGroup[19] == "PM"){
                if (myGroup[12] > 12) {
                    wrongFormat = true;
                } else if (myGroup[12] < 12) {
                    myGroup[12] = +myGroup[12] + 12;
                }
            }
            if (myGroup[19] == "am|AM" && myGroup[12] > 12){
                wrongFormat = true;
            }

            // 对"下午4点"，"晚上9点"进行处理
            if (myGroup[9] != null && (myGroup[9] == "下午" || myGroup[9] == "晚上")){
                if (myGroup[12] < 12) {
                    if (myGroup[9] == "下午") {
                        myGroup[12] = +myGroup[12] + 12;
                    } else {
                        if (myGroup[12] > 4) {
                            myGroup[12] = +myGroup[12] + 12;
                        }
                    }
                }
            }

            //对"中午1点"，"中午2点"，"中午3点"进行特殊处理
            if(myGroup[9] != null && myGroup[9] == "中午" && myGroup[12] != null && myGroup[12] < 4){
                myGroup[12] = +myGroup[12] + 12;
            }

            // 当前时间戳
            var UTCTime = myGroup[23]+"/"+myGroup[25]+"/"+myGroup[26]+" "+myGroup[12]+":"+myGroup[13]+":"+myGroup[16];
            var myTransformDate = Date.parse(UTCTime);//不用getTime()转换已经是Long值，与java不同...

            //如果“时”存在但“分”不存在，说明是整点，对数据进行抺平
            if (hourExist && !minuteExist) {
                myTransformDate = parseInt(myTransformDate / (oneDay/24)) * (oneDay/24);
            }

            //对"下午12点"，"晚上12点"，"12:00pm"进行特殊处理
            if(myGroup[12] == 12 && (myGroup[9] == "下午" || myGroup[9] == "晚上" || myGroup[19] == "pm" || myGroup[19] == "PM")){
                myTransformDate += oneDay/2
            }

            //对后面包含am、pm，但是前面的值大于12进行处理
            if (wrongFormat) {
                if((myTransformDate - myReadMailDate) >= 0) {
                    return '<a id="date_text_underline" href="date:' + m.substr(0,m.length-2) + ',' + myTransformDate + '" class="' + autoFormatClass + '">'
                        + m.substr(0,m.length-2) + '</a>' + m.substr(m.length-2, m.length);
                } else {
                    return '<a id="date_text_underline" href="date:' + m.substr(0,m.length-2) + ',' + (myTransformDate+oneDay) + '" class="' + autoFormatClass + '">'
                        + m.substr(0,m.length-2) + '</a>' + m.substr(m.length-2, m.length);
                }
            }

            //只有时分秒的情况
            if(!(yearExist || monthExist || dayExist) && hourExist) {
                if (hourExist && !minuteExist) {
                    if (!/时/.test(myGroup[0]) && !/点/.test(myGroup[0]) ) {
                        return m;
                    };
                };
                if (hourExist || /分/.test(myGroup[0]) || (minuteExist && myGroup[13].length == 2)) {
                    if( (myTransformDate - myReadMailDate) >= 0 ) {
                        return '<a id="date_text_underline" href="date:' + m + ',' + myTransformDate + '" class="' + autoFormatClass + '">' + m + '</a>';
                    } else {
                        return '<a id="date_text_underline" href="date:' + m + ',' + (myTransformDate+oneDay) + '" class="' + autoFormatClass + '">' + m + '</a>';
                    }
                };
            }

            //判断日期合法性
            if (myGroup[25] == 2) {
                if (myGroup[26] > 29) {
                    return m;
                } else if (myGroup[26] == 29) {
                    //2月29 没指明年份，找到下一个闰年的2月29号
                    if (!yearExist && (myTransformDate - myReadMailDate < 0)) {
                        var deltaYear = 4 - myGroup[23] % 4;
                        var deltaDays = 365 * (deltaYear - 1) + 366;
                        return '<a id="date_text_underline" href="date:' + m + ',' + (myTransformDate + oneDay * deltaDays) + '" class="' + autoFormatClass + '">' + m + '</a>';
                    }
                    if (!((myGroup[23]%100 == 0 && myGroup[23]%400 == 0) || (myGroup[23]%100 != 0 && myGroup[23]%4 == 0))) {
                        return m;
                    }
                }
            } else {
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
                    return '<a id="date_text_underline" href="date:' + m + ',' + myTransformDate + '" class="' + autoFormatClass + '">' + m + '</a>';
                }
                //正好是当天的特殊情况，假定阀值为2秒，待调整(load完页面pageFinished的时间"myReadMailDate"与运算加载得出的"myTransformDate"存在一定偏差)
                else if( myTransformDate + deltaTime - myReadMailDate  >= 0 ){
                    return '<a id="date_text_underline" href="date:' + m + ',' + (myTransformDate+deltaTime) + '" class="' + autoFormatClass + '">' + m + '</a>';
                }
                else{
                    if(!yearExist) {
                        var nextYearDays = 365;
                        if (myGroup[25] > 2) {
                            // 看下一年是不是闰年
                            if (isLeapYear(myYear + 1)) {
                                nextYearDays = 366;
                            }
                        } else {
                            // 看今年是不是闰年
                            if (isLeapYear(myYear)) {
                                nextYearDays = 366;
                            }
                        }
                        return '<a id="date_text_underline" href="date:' + m + ',' + (myTransformDate + oneDay * nextYearDays) + '" class="' + autoFormatClass + '">' + m + '</a>';
                    }
                }
            };
            return '<span ignore>' + m + '</span>';
        })
    }

    function isLeapYear(year) {
        return !(year % (year % 100 ? 4 : 400));
    }

    function isNodeNextLine(node) {
        var nodeName = node.nodeName.toLowerCase()
        return nodeName == 'li' || nodeName == 'ul' || nodeName == 'blockquote' || nodeName == 'div' || nodeName == 'p'
    }


    /**
     * 获取日期同一行后面的文字作为日程的标题
     */
    function getLineText(node) {
        var scheduleTitle = ""
        while (!isNodeNextLine(node)) {
            var brotherNode = node.nextSibling
            if (brotherNode != null) {
                var info = dfs(brotherNode, scheduleTitle)
                scheduleTitle = info["content"]
                if (info["stop"]) break
                node = brotherNode
            } else {
                node = node.parentNode
            }
        }
        return scheduleTitle
    }

    function dfs(node, scheduleTitle) {
        //node的tagName是A标签的情况是下一个日期
            if (isNodeNextLine(node) || (node.nodeName.toLowerCase() == "a" && node.id == "date_text_underline")) {
            return {"stop": true, "content": scheduleTitle};
        }

        var stop = false
        if (node.childNodes.length > 0) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var info = dfs(node.childNodes[i], scheduleTitle)
                scheduleTitle = info["content"]
                if (info["stop"]) {
                    stop = true
                    break
                }
            }
        } else {
            scheduleTitle += node.textContent;
        }
        return {"stop": stop, "content": scheduleTitle}
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
        insertUnorderedList: {
              hook: function(output) {
                  if (win.getSelection().focusNode != null) {
                      var curNode = win.getSelection().focusNode.parentElement;
                      if(curNode.tagName.toLowerCase() == 'li'){
                          var parent = curNode.parentElement;
                          if(!parent.classList.contains("qmTaskList")){
                              output.push('UNORDEREDLIST');
                          }
                      } else if(curNode.tagName.toLowerCase() == 'ul'&&!curNode.classList.contains("qmTaskList")){
                          output.push('UNORDEREDLIST');
                      }
                  }
              }
        },
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
        },
        checkList: {
             hook: function(output) {
                 if (win.getSelection().focusNode != null) {
                     var curNode = win.getSelection().focusNode.parentElement;
                     //有内容的时候是li，没有内容，会变成ul
                     if(curNode.tagName.toLowerCase() == 'li'){
                         var parent = curNode.parentElement;
                         if(parent.classList.contains("qmTaskList")){
                             output.push('CHECKLIST');
                         }
                     } else if(curNode.tagName.toLowerCase() == 'ul'&&curNode.classList.contains("qmTaskList")){
                         output.push('CHECKLIST');
                     }
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
    /**
     * 选择一个node并将光标聚焦在它的开始或结束位置
     * @param {Bool} begin - 与系统range.collapse()方法的参数作用一致，true表示开始位置，false表示结束位置
     */
    selection.selectNodeAndCollapse = function(node, begin){
        var sel = win.getSelection(), range = doc.createRange();
        range.selectNodeContents(node);
        range.collapse(begin);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /**
     * 选择一个node并选中node的范围
     * @param {*} node
     */
    selection.selectNode = function(node) {
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
         */
        console.log("editor clear")
        this.innerHTML = '<' + CONST.defaultParagraph + '><br></' + CONST.defaultParagraph + '>';
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
         document.getElementById('QMUIEditor').setAttribute("contenteditable", false)
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
        }else{
            selection.selectNodeAndCollapse(this, false);
        }
        this.focus();
    }
    editor.updatingScrollY = false;
    var mSelectionBottom;
    editor.updateScrollY = function(){
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
        if(caretBottomToWindowTop + comfortableOffset >= windowHeight && !editor.updatingScrollY) {
            editor.updatingScrollY = true;
            offset = caretBottomToWindowTop + comfortableOffset + scrollTop - windowHeight ;
            console.log("zkzk scrollTop:" + scrollTop + ",windowheight:" + windowHeight + ", mSelectionBottom:" + mSelectionBottom + ",offset:" + offset)
            window.scrollTo(0, offset);
            editor.updatingScrollY = false;
        }
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
            offset = caretBottomToWindowTop + comfortableOffset + scrollTop - windowHeight;
            console.log("zkzk scrollToSelect: scrollTop:" + scrollTop + ", windowheight:" + windowHeight + ", caretBottomToWindowTop:" + caretBottomToWindowTop + ", offset:" + offset)
            nativeNotify('scrollToSelect', offset);
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
        console.log('zkzk scrollAfterInsertMap, offset: ' + offset + ', top: ' + scrollTop + ', bottom: ' + mSelectionBottom + ', h: ' + windowHeight);
        nativeNotify('scrollyMap', offset);
        return offset;
    }

    editor.setHtml = function(contents){
        /**
         * 设置编辑器的内容
         * @param {String} html.
         */
        this.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
        edit.setImageLoadBefore()
        edit.removeBlockQuoteStyle()
        nativeNotify('contentReady', true)
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
        var virtualBqs = virtualDom.querySelectorAll('blockquote');
        var bqs = this.querySelectorAll('blockquote')

        for (var i = 0;i < bqs.length;i++) {
            var cssObj = win.getComputedStyle(bqs[i], null);
            var cssText = 'margin:' + cssObj['margin'] + ';' +
                'padding:' + cssObj['padding'] + ';' +
                'color:' + cssObj['color'] + ';' +
                'background-color: ' + cssObj['background-color'];
            var htmlStyle = bqs[i].getAttribute('style')
            if (htmlStyle != '') {
                cssText = cssText + ';' + htmlStyle;
            }

            virtualBqs[i].style.cssText += cssText;
        }

        var spanWithStyle = this.querySelectorAll('span[style]');
        if (spanWithStyle.length > 0) {
            var spanWithStyle = virtualDom.querySelectorAll('span[style]');
            for (var i = 0; i < spanWithStyle.length; i++) {
                spanWithStyle[i].unwrap();
            }
        }
        // 去掉contenteditable
        removeHrefEditable(virtualDom)
        removeAllImageLoadBefore(virtualDom)
        replaceImgWithAudio(virtualDom)
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
        this.updateScrollY();
        edit.inputHandler();
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
    editor.addEventListener('click', function(e){
        /**
         * 监听编辑器内的img的点击并回调数据给app
         */
        console.log('click, node: ' + e.target.nodeName)
        if (e.target.nodeName.toLowerCase() == 'img') {
            if (e.target.hasAttribute("qmpath")) {
                this.onAudioClick(e);
            } else if (e.target.parentNode.nodeName.toLowerCase() == 'a' && (e.target.parentNode.getAttribute('href').startsWith('https://apis.map.qq.com/uri/v1/marker?') || e.target.parentNode.getAttribute('href').startsWith('http://apis.map.qq.com/uri/v1/marker?'))) {
                // 地图，留给上层处理
                console.log('click map')
            } else {
                this.onImgClick(e);
            }
        } else if (e.target.nodeName.toLowerCase() == 'a' && e.target.id == 'date_text_underline') {
            // 监听对于日期链接的点击事件
            var data = getLineText(e.target)
            // 如果和日期同行的文字多于20个字，也只截取前20个字符
            if (data.length > 20) {
                data = data.substring(0, 20)
            }
            nativeNotify('scheduleTitleScheme', data)
        } else if (_enableFocus) {
            this.enableEditable()
            this.focus()
        }
    });
    editor.addEventListener('focus', function(e){
        /**
         * 编辑器聚焦时通知native
         */
         if (_enableFocus) {
            nativeNotify('focus', "true");
         }
    });
    editor.addEventListener('blur', function(e){
        /**
         * 编辑器失焦时通知native
         */
         nativeNotify('focus', "false");
    });

    editor.onCheckListClick = function(e){
	    console.log('onCheckListClick: '+e);
	    var target = e.target;
	    //由于css 的li pointer-events属性，只有在:before伪类里有all，li里是none，所以如果li收到event就是伪类的点击
	    if (target && target.nodeName.toLowerCase() === "li") {
		    // 此时点击的应该是伪类，改变checkbox的行为
    		if (target.classList.contains('item-completed')) {
	    		target.classList.remove('item-completed');
		    } else {
    			target.classList.add('item-completed');
    		}
    		e.preventDefault();
    		e.stopPropagation();
            nativeNotify('clickCheckList', '')
    	}
    }
    editor.onCheckListInserted = function(e) {
	    console.log('onCheckListInserted: '+e);
    	var relatedNode = e.relatedNode;
    	var target = e.target;
    	if (relatedNode.classList.contains('qmTaskList')) {
    		if (target.nodeName.toLowerCase() === 'li') {
    			if (target.classList.contains('item-completed')) {
    				target.classList.remove('item-completed');
    			}
    		}
	    }
    }
    editor.addEventListener('DOMNodeInserted', function(e){
         console.log('DOMNodeInserted: '+e);
         var target = e.target;
         var relatedNode = e.relatedNode;
    	//判断是否是check list, 设置样式
         if(relatedNode && relatedNode.classList && relatedNode.classList.length > 0 && relatedNode.classList.contains('qmTaskList')){
             this.onCheckListInserted(e);
         }
    });
    editor.addEventListener('touchend', function(e){
	    console.log('touchend: '+e);
    	var target = e.target;
    	//判断是否是check list，添加事件
    	//为啥要在这里添加，而不是在setCheckList()加？因为ul标签可能会被拆分成两个ul，导致其中一个没有绑定事件
    	if(target.nodeName.toLowerCase() == 'li'){
            var parent = target.getParentElementByTagName('ul');
            if (parent && parent.classList.length > 0 && parent.classList.contains('qmTaskList')) {
                this.onCheckListClick(e);
            }
	    }
    });


/**
 * 编辑器操作的相关方法
 */
    var edit = QMUIEditor.edit = {};
    edit.replaceAutoFormatToSpan = function () {
        replaceAutoFormatToSpan()
    }
    edit.changeHrefEditable = function (isEditable) {
        changeHrefEditable(isEditable)
    }
    edit.autoFormat = function (needDate) {
        autoFormat(needDate)
    }
    edit.delete = function() {
        /**
         * 调用系统命令进行退格删除
         */
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
    edit.isInBlockQuote = function () {
        /**
         * 判断当前是否在引用内
         */
        var currentNode = window.getSelection().focusNode
        if (typeof currentNode.tagName == 'undefined' || currentNode.tagName.toLowerCase() != 'blockquote') {
            // 再看看父亲有没有blockquote
            currentNode = currentNode.getParentElementByTagName("blockquote");
        }
        return currentNode != null;
    }
    edit.insertBrAfterBlockQuote = function () {
        var blockQuoteNode = edit.findCurrentBlockQuote();
        var blockQuoteBr = document.createElement('blockquote');
        blockQuoteBr.innerHTML = '<br>'
        blockQuoteBr.appendAfter(blockQuoteNode)
        selection.selectNodeAndCollapse(blockQuoteBr, true)
        // blockQuoteNode.insertAdjacentHTML('afterend', '<blockquote><br></blockquote>');
    }
    edit.insertAudio = function (html) {
        if (edit.isInBlockQuote()) {
            // 如果在blockquote里面,用<blockqupte><br></blockquote>代替<br><br>
            this.insert(html);
            edit.insertBrAfterBlockQuote();
        } else {
            html += '<br><br>';
            this.insert(html);
        }
    }
    edit.prepareShareWebView = function (sharePdf) {
        var audioImages = document.querySelectorAll('.audioImage');
        for (var i = 0;i < audioImages.length;i++) {
            audioImages[i].classList.add('audioImageShare');
            // audioImages[i].setAttribute('class', 'audioImageShare')
        }
        nativeNotify('shareWebView', sharePdf)
    }
    edit.resetWebViewAudio = function () {
        var audioImages = document.querySelectorAll('.audioImage');
        for (var i = 0;i < audioImages.length;i++) {
            audioImages[i].classList.remove('audioImageShare');
            // audioImages[i].setAttribute('class', 'audioImage')
        }
    }
    edit.setImageLoadBefore = function () {
        var images = document.querySelectorAll('img');
        // 给http的图片加上占位图
        for (var i = 0;i < images.length;i++) {
            if (images[i].src != null && (images[i].src.indexOf("http://") == 0 || images[i].src.indexOf("https://") == 0)) {
                images[i].classList.add('imageLoadBefore');
            }
        }
    }
    edit.setImageLoadFinish = function (url) {
        var images = document.getElementsByTagName('img');
        for (var i = 0;i < images.length;i++) {
            if (images[i].src == url) {
                // console.log("zkzk, remove imageLoadBefore");
                images[i].classList.remove('imageLoadBefore');
                if (images[i].classList.length == 0) {
                    images[i].removeAttribute('class');
                }
                break;
            }
        }
    }
    edit.insertImage = function(img, isLast, isFirst){
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
        var imgHtml = '<img src="' + img.src + '" width="' + (img.w || '') + '" height="' + (img.h || '') + '" data-addition="' + (img.addition || '') + '" alt="' + (img.alt || '') + '" />';
        if (edit.isInBlockQuote()) {
            // 如果在blockquote里面,用<blockqupte><br></blockquote>代替<br><br>
            this.insert(imgHtml);
            if (isLast) {
                edit.insertBrAfterBlockQuote();
            }
        } else {
            if (isFirst) {
                if (window.getSelection().focusNode != null &&
                    ((window.getSelection().focusNode.tagName != null && window.getSelection().focusNode.tagName.toLowerCase() == 'li') || window.getSelection().focusNode.getParentElementByTagName('li'))) {
                    // li里面的br不用删掉
                    imgHtml = '<br>' + imgHtml;
                } else {
                    imgHtml = '<br class="deleteBr">' + imgHtml;
                }
            }
            if (isLast) {
                imgHtml += '<br><br>';
            }
            this.insert(imgHtml);
        }
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
        var mapHtml = '<a href="' + map.jump + '" target="_blank" notforedit="true" attr-hasmapwrap="1"><img src="' + map.src + '" width="' + (map.w || '') + '" height="' + (map.h || '') + '"></a>'
        if (!edit.isInBlockQuote()) {
            // 如果在blockquote里面,用<blockqupte><br></blockquote>代替<br><br>
            mapHtml += '<br><br>';
        }
        this.insertAfterFocus(mapHtml)
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
            var insertNode = document.createElement("div");
            insertNode.innerHTML=html;
            insertNode.appendAfter(node);
            selection.selectNodeAndCollapse(insertNode, false);
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
    edit.findCurrentBlockQuote = function () {
        // 找到当前blockquote
        var currentNode = window.getSelection().focusNode
        if (typeof currentNode.tagName == 'undefined' || currentNode.tagName.toLowerCase() != 'blockquote') {
            // 再从父亲中找
            var blockNode = currentNode.getParentElementByTagName("blockquote")
            if (blockNode == null) {
                // 再从孩子中找
                blockNode = currentNode.getChildElementByTagName('blockquote')
            }
            currentNode = blockNode
        }
        return currentNode
    }
    edit.findNextElement = function (targetNode) {
        while (true) {
            // 找到顶都没有就是没有了
            if (targetNode == null || targetNode.className == 'QMUIEditor')
                break
            var nextNode = targetNode.nextSibling
            // 最后总有个签名div不算
            if (nextNode != null)
                return true
            targetNode = targetNode.parentNode
        }
        return false
    }
    edit.findPreElement = function (targetNode) {
        while (true) {
            if (targetNode == null || targetNode.className == 'QMUIEditor')
                break
            var preNode = targetNode.previousSibling
            if (preNode != null)
                return true
            targetNode = targetNode.parentNode
        }
        return false
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
            edit.removeBlockQuoteStyle()
            // 找到当前blockquote
            var currentNode = edit.findCurrentBlockQuote()
            // 得在执行formatblock前找到parentNode
            var parentNode = null;
            if (currentNode != null) {
                parentNode = currentNode.parentElement
            }
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>')
            if (parentNode != null && parentNode.className == 'blockQuoteDiv') {
                selection.backup()
                var blocks = parentNode.childNodes
                if (blocks.length > 0) {
                    blocks.forEach(function (item) {
                        if (item.tagName && item.tagName.toLowerCase() == 'blockquote') {
                            var para = document.createElement(CONST.defaultParagraph);
                            para.innerHTML = item.innerHTML;
                            para.prependBefore(item);
                            item.remove();
                        }
                    })
                    parentNode.unwrap()
                }
                selection.restore()
            }
        } else {
            doc.execCommand('formatBlock', false, '<blockquote>');
            // 找到当前blockquote
            var currentNode = edit.findCurrentBlockQuote()
            var parentNode = null
            // 看是否已经被div包起来
            if (currentNode != null) {
                parentNode = currentNode.parentElement
            }
            if (currentNode != null && (parentNode == null || parentNode.className != 'blockQuoteDiv')) {
                selection.backup()
                currentNode.wrapBy("div")
                parentNode = currentNode.parentElement
                parentNode.setAttribute("class", "blockQuoteDiv")
                selection.restore()
            }

            var hasNext = false
            var hasPre = false
            // 简单这么找找兄弟
            if (parentNode != null) {
                hasNext = edit.findNextElement(parentNode)
                hasPre = edit.findPreElement(parentNode)
            }
            if (!hasNext) {
                parentNode.insertAdjacentHTML('afterEnd', '<div style="margin-top: 10px"><br></div>')
            }
            if (!hasPre) {
                parentNode.insertAdjacentHTML('beforebegin', '<div><br></div>')
            }
            edit.removeBlockQuoteStyle()
        }
        edit.removeSpanWithStyle()
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
    edit.setUnorderedList = function() {
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
            if (parent) {
                QMUIEditor.editor.removeChild(parent);
            }
            if (next) {
                QMUIEditor.editor.insertBefore(newNode, next);
            } else {
                QMUIEditor.editor.appendChild(newNode);
            }
            selection.selectNode(newNode);
        }
        edit.removeSpanWithStyle();
        // 移除还原时多余的br
        edit.removeExtraBr();
        edit.removeSpaceTag();
    }
    edit.setOrderedList = function() {
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
            if (parent) {
                QMUIEditor.editor.removeChild(parent);
            }
            if (next) {
                QMUIEditor.editor.insertBefore(newNode, next);
            } else {
                QMUIEditor.editor.appendChild(newNode);
            }
            selection.selectNode(newNode);
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
        var sign = doc.querySelectorAll("sign")[0];
        if(sign) {
            sign.innerHTML = content;
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
        if (div.getParentElementByTagName('blockquote')) {
            blockquote = div.getParentElementByTagName('blockquote');
            div.appendAfter(blockquote);
            if(!blockquote.innerHTML){
                blockquote.remove();
            }
            selection.selectNodeAndCollapse(div, false);
        }

        // 删掉因为插入图片多处的头部换行
        var deleteBrs = document.querySelectorAll('.deleteBr');
        for (var i = 0;i < deleteBrs.length;i++) {
            deleteBrs[i].remove();
        }
        edit.enterInBlockQuote()
        nativeNotify('input', "");
    }
    /**
     * 从一个空blockquote里面按回车，离线情况是取消blockquote，像从一个空的li里面回车一样
     */
    edit.enterInBlockQuote = function(){
        var target = doc.querySelector('blockquote + blockquote:last-of-type');
        if(!target) return;
        var targetPrev = target.previousSibling;
        if (target.childNodes.length == 1 && target.firstChild.nodeName.toLowerCase() == 'br' && targetPrev.childNodes.length == 1 && targetPrev.firstChild.nodeName.toLowerCase() == 'br') {
            var newPara = doc.createElement(CONST.defaultParagraph);
            newPara.innerHTML = '<br>';
            var parentNode = target.parentElement
            if (parentNode != null) {
                // 放到包裹blockquote的div后面
                newPara.appendAfter(parentNode)
            }
            target.remove();
            targetPrev.remove();
            selection.selectNodeAndCollapse(newPara, false);
        }
    }
    edit.removeBlockQuoteStyle = function () {
        var blockquotes = QMUIEditor.editor.querySelectorAll("blockquote")
        for(var i = 0;i < blockquotes.length;i++) {
            // 只保留style中text-align部分
            var style = blockquotes[i].getAttribute("style");
            var keepStyle = '';
            if (style != null && style.indexOf('text-align') != -1) {
                var start = style.indexOf('text-align');
                var end = style.indexOf(';', start);
                keepStyle = style.substring(start, end + 1);
            }
            blockquotes[i].removeAttribute("style");
            if (keepStyle != '') {
                blockquotes[i].setAttribute('style', keepStyle);
            }
        }
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
    edit.removeExtraBr = function() {
        var brs = QMUIEditor.editor.querySelectorAll('#QMUIEditor>br')
        for(var i = 0; i < brs.length; i++) {
            selection.backup();
            QMUIEditor.editor.removeChild(brs[i]);
            selection.restore();
        }
    }
    edit.setCheckList = function() {
        /**
         * 设置任务列表
         */
        edit.saveFontTagWithSpace();
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }

        var curElement = win.getSelection().focusNode.parentElement;
        while(curElement.id!="QMUIEditor"){
            if (curElement.tagName.toLowerCase() == 'li') {
                if (curElement.classList.contains('item-completed')) {
	    		     curElement.classList.remove('item-completed');
		         }
                break;
            }else{
                curElement = curElement.parentElement;
                if(curElement == undefined){
                    break;
                }
            }
        }

        doc.execCommand('InsertUnorderedList', false, null);

        //有内容的时候是li，没有内容，会变成ul
        curElement = win.getSelection().focusNode.parentElement;
        var isQMTaskList = false;
        while(curElement.id!="QMUIEditor"){
            if (curElement.tagName.toLowerCase() == 'ul') {
                if (!curElement.classList.contains("qmTaskList")) {
                    curElement.classList.add("qmTaskList");
                    isQMTaskList = true;
                }
                break;
            }else{
                curElement = curElement.parentElement;
                if(curElement == undefined){
                    break;
                }
            }
        }
        var ulRange = doc.getSelection().getRangeAt(0);
        var cloneContent = ulRange.cloneContents();
        // 有li是还原操作，没有是添加操作
        if (cloneContent.querySelector('li')) {
            // 添加时会在ul上多添加div父元素，删掉，保存下一个兄弟节点，用于记录插入位置
            var newNode = doc.createElement('ul');
            if (isQMTaskList) {
                newNode.classList.add('qmTaskList');
            }
            newNode.appendChild(cloneContent);
            var parent = ulRange.endContainer.parentNode.parentNode.parentNode;
            var next = parent.nextSibling;
            if (parent) {
                QMUIEditor.editor.removeChild(parent);
            }
            if (next) {
                QMUIEditor.editor.insertBefore(newNode, next);
            } else {
                QMUIEditor.editor.appendChild(newNode);
            }
            selection.selectNode(newNode);
        }
        edit.removeSpanWithStyle();
        edit.removeExtraBr();
        edit.removeSpaceTag();
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