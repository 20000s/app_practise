/**
 * Created by chenzekai on 2019/11/8.
 */

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
        emptyScheme: 'qmuire-empty://',  // 传递当前内容是否为空给native
        focusScheme: 'qmuire-focus://',  // 编辑器被聚焦
        blurScheme: 'qmuire-blur://',  // 编辑器失焦
        logScheme: 'qmuire-log://',  // 传递编辑器log信息
        inputScheme: 'qmuire-input://',  // 告知业务层目前有输入发生
        scrollYScheme: 'qmuire-scrolly://', // 传递需要scroll的y值
        scrollYMapScheme: 'qmuire-scrolly-map://', // 插入地图时，传递需要scroll的y值
        scrollToSelect: 'qmuire-scroll-to-select://', // 滚动到光标所在位置
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
            case 'log': scheme = CONST.logScheme; break;
            case 'empty': scheme = CONST.emptyScheme; break;
            case 'blur': scheme = CONST.blurScheme; break;
            case 'focus': scheme = CONST.focusScheme; break;
            case 'input': scheme = CONST.inputScheme; break;
            case 'scrolly': scheme = CONST.scrollYScheme; break;
            case 'scrollToSelect': scheme = CONST.scrollToSelect; break;
            case 'contentReady': scheme = CONST.contentReadyScheme; break;
        }
        console.log(scheme + data);
    }


    function removeAllImageLoadBefore(virtualDom) {
        var images = virtualDom.querySelectorAll('img');
        for (var i = 0;i < images.length;i++) {
            images[i].classList.remove('imageLoadBefore');
        }
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
        document.getElementById('QMUIEditor').style = disableEditableStyle
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

    editor.setHtml = function(contents){
        /**
         * 设置编辑器的内容
         * @param {String} html.
         */
        this.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
        edit.setImageLoadBefore()
        nativeNotify('contentReady', true)
    }
    editor.getHtml = function(nickName, year, month, day){
        /**
         * 获取整个html的原始内容
         * 去掉所有系统生成的带style的span
         * @returns {String}
         */
        var output = '';
        this.showHeader()
        var virtualDom = doc.createElement('html');
        virtualDom.innerHTML = doc.querySelector(".time_capsule_container").innerHTML;
        // 去掉可编辑
        virtualDom.querySelector('.QMUIEditor').style = '-webkit-user-modify: read-only !important;'
        // 尾部加上日期
        var editorHtml = virtualDom.querySelector('.QMUIEditor').innerHTML
        var current = new Date()

        var tailDate = "<div class='tailText' style='margin-top: 30px;font-size: 13px;color: #8E8E93;text-align: end;'><div><span>"
            + decodeURIComponent(nickName.replace(/\+/g, '%20'))
            + "</span></div>" + "<div><span>写于 " + year + "年"
            + month + "月" + day + "日" + "</span></div></div>"
        virtualDom.querySelector('.QMUIEditor').innerHTML = editorHtml + tailDate
        virtualDom.querySelector('.QMUIEditor').setAttribute('placeholder', "");

        var spanWithStyle = this.querySelectorAll('span[style]');
        if (spanWithStyle.length > 0) {
            var spanWithStyle = virtualDom.querySelector('#QMUIEditor').querySelectorAll('span[style]');
            for (var i = 0; i < spanWithStyle.length; i++) {
                spanWithStyle[i].unwrap();
            }
        }
        removeAllImageLoadBefore(virtualDom)
        output = virtualDom.innerHTML;
        nativeNotify('content', output);
        this.hideHeader()
        return output;
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
        // if (this.innerText.length > 10) {
        //     this.innerText = this.innerText.substr(0, 10)
        // }
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
    editor.setTitleContent = function (des, author) {
        var titleContentSpan1 = doc.getElementById("title_des")
        titleContentSpan1.innerText = decodeURIComponent(des.replace(/\+/g, '%20'))

        var titleContentSpan2 = doc.getElementById("title_author")
        titleContentSpan2.innerText = decodeURIComponent(author.replace(/\+/g, '%20'))
    }
    editor.setYear = function (year) {
        var timeYearSpan = doc.getElementById("time_year")
        timeYearSpan.textContent = decodeURIComponent(year.replace(/\+/g, '%20'))
    }
    editor.hideHeader = function() {
        doc.getElementById("title_group").setAttribute("style", "display:none;")
    }
    editor.showHeader = function() {
        doc.getElementById("title_group").setAttribute("style", "margin-top:20px;")
    }
    /**
     * 编辑器操作的相关方法
     */
    var edit = QMUIEditor.edit = {};
    edit.changeHrefEditable = function (isEditable) {
        changeHrefEditable(isEditable)
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

    edit.prepareShareWebView = function (sharePdf) {
        var audioImages = document.querySelectorAll('.audioImage');
        for (var i = 0;i < audioImages.length;i++) {
            audioImages[i].classList.add('audioImageShare');
            // audioImages[i].setAttribute('class', 'audioImageShare')
        }
        nativeNotify('shareWebView', sharePdf)
    }

    edit.setImageLoadBefore = function () {
        var images = editor.querySelectorAll('img');
        // 给http的图片加上占位图
        for (var i = 0;i < images.length;i++) {
            if (images[i].src != null && (images[i].src.indexOf("http://") == 0 || images[i].src.indexOf("https://") == 0)) {
                images[i].classList.add('imageLoadBefore');
            }
        }
    }
    edit.setImageLoadFinish = function (url) {
        var images = editor.getElementsByTagName('img');
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
        var imgHtml = '<div style="margin-right: 16px"><img style="max-width: 100%;height: auto !important;padding: 8px 8px;border: solid #E9EAEB 1px;border-radius: 5px;" src="'
                + img.src + '" width="' + (img.w || '') + '" height="' + (img.h || '') + '" data-addition="' + (img.addition || '') + '" alt="' + (img.alt || '') + '" /></div>';
        if (isFirst) {
            imgHtml = '<br class="deleteBr">' + imgHtml;
        }
        if (isLast) {
            imgHtml += '<br><br>';
        }
        this.insert(imgHtml);
    }
    edit.removeSpaceTag = function(){
        selection.backup();
        var spaces = doc.querySelectorAll('.fontTag_space');
        for(var i = 0; i < spaces.length; i++){
            spaces[i].remove();
        }
        selection.restore();
    }

    edit.isHeadingFormat = function(formatName){
        return ['h1','h2','h3','h4','h5','h6'].indexOf(formatName) >= 0;
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
    edit.inputHandler = function(){
        // 监听input事件并执行需要的特殊操作
        // 目前有:
        // 避免在blockquote里产生段落,重现路径:在blockquote里设置列表,回车取消列表,这时会产生一个段落元素。理想的情况应该在这时候光标跳出blockquote
        var node = win.getSelection().focusNode,
            div = null;
        if(node.nodeName.toLowerCase() == CONST.defaultParagraph){
            div = node;
        }else if(node.getParentElementByTagName(CONST.defaultParagraph)){
            div = node.getParentElementByTagName(CONST.defaultParagraph);
        }else {
            return;
        }

        // 删掉因为插入图片多处的头部换行
        var deleteBrs = document.querySelectorAll('.deleteBr');
        for (var i = 0;i < deleteBrs.length;i++) {
            deleteBrs[i].remove();
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
            selection.backup();
        });

        if (isDarkMode) {
            doc.getElementById('QMUIEditor').style.backgroundColor = "#fefeff"
        }
    }

})(window, document);

QMUIEditor.init();
document.addEventListener("DOMContentLoaded", function () {
}, false)