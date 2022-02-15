// 工具方法
function throttle(fn, wait, immediate)
{
    var timeout;

    return function ()
    {
        var ctx = this, args = arguments;

        var throttler = function ()
        {
            timeout = null;
            fn.apply(ctx, args);
        };

        if (!immediate) clearTimeout(timeout);
        if (!immediate || !timeout) timeout = setTimeout(throttler, wait);
    }
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
    }
}


(function(win, doc){

    var QMUIEditor = win.QMUIEditor = {};

/**
 * 配置
 */
    var CONST = {
        defaultParagraph: 'div', // 段落标签，div或者p
        statesSeparator: 'Q_U_E_S', // 光标所在位置格式关键字的分隔符，与app中保持一致。不使用$&等符号，避免解析url出错

        empty_div: '<div><br></div>',
        empty_div_with_ol: '<div><ol><li><br></li></ol></div>',

        fontSizeSmall: 3,
        fontSizeNormal: 4,
        fontSizeBig: 5,
        fontSizeLarge: 6
    };

/**
 * state: 编辑器状态
 */
    var state = QMUIEditor.state = {};
    state.map = {
        bold: 'BOLD',
        insertUnorderedList: 'UNORDEREDLIST',
        insertOrderedList: 'ORDEREDLIST',
        justifyCenter: 'JUSTIFYCENTER',
        fontSize: {
            hook: function(output){
                function getSizeName(size){
                    //console.log("getSizeName size="+size);
                    switch(size){
                        case CONST.fontSizeLarge: return 'LARGE';
                        case CONST.fontSizeBig: return 'BIG';
                        case CONST.fontSizeNormal: return 'NORMAL';
                        case CONST.fontSizeSmall: return 'SMALL';
                        default: return 'UNKNOWN';
                    }
                }

                var focusNode = win.getSelection().focusNode,
                    anchorNode = win.getSelection().anchorNode;
                if(focusNode == null || anchorNode == null){
                    output.push('FONTSIZE='+getSizeName(CONST.fontSizeNormal));
                }else{
                    var endSize, startSize;
                    if(focusNode.nodeType == 3 && focusNode.getParentElementByTagName('font')){
                        var fontNode = focusNode.getParentElementByTagName('font');
                        endSize = parseInt(fontNode.getAttribute('size'));
                    }else if(focusNode.nodeName && focusNode.nodeName.toLowerCase() == 'font'){
                        endSize = parseInt(focusNode.getAttribute('size'));
                    }else{
                        endSize = 4;
                    }
                    if(anchorNode.nodeType == 3 && anchorNode.getParentElementByTagName('font')){
                        var fontNode = anchorNode.getParentElementByTagName('font');
                        startSize = parseInt(fontNode.getAttribute('size'));
                    }else if(anchorNode.nodeName && anchorNode.nodeName.toLowerCase() == 'font'){
                        startSize = parseInt(anchorNode.getAttribute('size'));
                    }else{
                        startSize = 4;
                    }
                    if(focusNode == anchorNode){
                        output.push('FONTSIZE='+getSizeName(endSize));
                    }else{
                        output.push('FONTSIZE='+getSizeName(0));
                    }
                }
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
        if(editor.isEmpty()){
            states.push('EMPTY');
        }
        states = states.join(CONST.statesSeparator);
        if(self.current === states){
            return;
        }
        self.current = states;
        console.log("javascript::editor.states=" + states);
//        QMUIJsBridge.call('updateState', states, function(successOrNot, data){
//            // do sth if needed
//        });
    }


/**
 * selection: 光标选区相关
 */
    var selection = QMUIEditor.selection = {};
    selection.ignoreBackup = false;
    // 记录当前选区
    selection.current = {
        'startContainer': null,
        'startOffset': 0,
        'endContainer': null,
        'endOffset': 0
    };
    selection.backup = function(){
        /**
         * 备份当前光标选区
         */
        if(selection.ignoreBackup) {
          return;
        }
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
         * 取得光标所在rect在y方向的数据，包括height,top,bottom,其中:
         * top: rect上边缘到window上边缘的距离
         * bottom: rect下边缘到window上边缘的距离
         * height: rect上边缘
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
         * @param {Object} node
         * @param {Bool} begin - 与系统range.collapse()方法的参数作用一致，true表示开始位置，false表示结束位置
         */
        var sel = win.getSelection(),
            range = doc.createRange();
        range.selectNodeContents(node);
        range.collapse(begin);
        sel.removeAllRanges();
        sel.addRange(range);
    }


/**
 * editor: 编辑器div拓展
 */
    var editor = QMUIEditor.editor =  doc.querySelector('#QMUIEditor');
    editor.empty = function(){
        /**
         * 清空编辑器内容还原为最初状态
         */
        this.innerHTML = CONST.empty_div;
    }
    editor.isFocused = function(){
        /**
         * 判断编辑器是否被聚焦
         */
        return doc.activeElement === this;
    }
    editor.isEmpty = function(){
        /**
         * 检查编辑器的内容是否为空，按顺序遵循以下规则：
         * 若存在具有特殊视觉表现的标签，则返回 false
         * 当innerText长度为1且br个数为1，相当于当前编辑器只有一个空的段落，返回 true
         * 判断innerText的长度，这里不判断trim后的情况，因为当在第一行执行回车，编辑器的innerText为两个空字符（获取innerText时一个br就是一个空字符），此时不能说浏览器为空。同理当用户已开始猛敲空格，我们也不能将它定义为 空 ，因为有可能这就是用户想要执行的输入行为
         */
        if(this.querySelectorAll('img, iframe, canvas, object, blockquote, ol, ul, h1, h2, h3, h4, h5, h6').length > 0){
            return false;
        }
        if(this.innerText.length === 1 && this.innerText.length === this.querySelectorAll('br').length){
            return true;
        }
        return this.innerText.length <= 0;
    }
    editor.setPlaceholder = function(text){
        /**
         * 设置placeholder文案
         * @param {String} text
         */
        this.setAttribute('placeholder', text);
        this.togglePlaceholder();
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
        /**
         * 聚焦并将光标置于编辑器最前面的位置
         */
        selection.selectNodeAndCollapse(this, true);
        this.focus();
    }
    editor.blurfocus = function(){
        /**
         * 使编辑器失焦
         * 需要把选区清除掉，否则在编辑器之外的地方的操作有可能会影响到编辑器
         */
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
    editor.forceFocusEditorAtBackupSelection = function(){
        selection.selectNodeAndCollapse(this, false);
        this.focus();
    }
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
        if(caretBottomToWindowTop + comfortableOffset >= windowHeight){
            offset = caretBottomToWindowTop - windowHeight + comfortableOffset;
            window.scrollTo(0, scrollTop + offset);
        }
    }
    editor.setHtml = function(contents){
        /**
         * 设置编辑器的内容
         * @param {String} html.
         */
         contents = contents.replace(/\+/g, '%20');
         contents = decodeURIComponent(contents);
         //console.log(contents);
        this.innerHTML = contents;
    }
    editor.getHtml = function(){
        /**
         * 返回完整的innerHTML
         */
        var html = this.innerHTML;
        // QMUIJsBridge.call('updateContent', html, function(successOrNot, data){
        //     // do sth if needed
        // });
        console.log("javascript::editor.innerHTML=" + html);
        return html;
    }

    var throttleUpdateContent = throttle(function() {
            // QMUIJsBridge.call('updateContent', editor.innerHTML, function(successOrNot, data){
            // // do sth if needed
            // });
            console.log("javascript::editor.innerHTML=" + editor.innerHTML);
        }, 200);
    editor.addEventListener('input', function(){
        /*
         * 监听输入事件，完成：
         * 1 保证编辑器首行有一个默认段落标签
         * 2 更新placeholder的显示状态
         * 3 更新页面scrollTop保证input的内容完整可见
         * 4 input事件的其他处理
         * <del>5 回调页面内容给app</del> <!-- 随着输入回调太频繁，可能导致卡顿 -->
         * 5 回调页面内容给app，利用throttle降低频率
         */
        if(editor.isEmpty()){
            this.empty();
            selection.selectNodeAndCollapse(editor.firstChild, true);
        }
        this.togglePlaceholder();
        this.updateScrollY();
        edit.inputHandler();
        throttleUpdateContent();
    });
    editor.onImgClick = function(e){
        /**
         * 图片点击事件，会将图片的src和data-addition传给native
         */
        var img = e.target,
            src = img.getAttribute('src'),
            addition = img.getAttribute('data-addition'),
            data = {
                'src': encodeURI(src),
                'addition': encodeURI(addition?addition:'')
            };
//        QMUIJsBridge.call('onImgClick', data, function(successOrNot, data){
//            // do sth if needed
//        });
    }
    editor.addEventListener('click', function(e){
        /**
         * 监听编辑器内的img的点击并回调数据给app
         */
        if(e.target.nodeName.toLowerCase() == 'img'){
            if(e.target.hasAttribute("qmpath")) {
                this.onAudioClick(e);
            } else {
                this.onImgClick(e);
            }
        }
    });


/**
 * 编辑器操作的相关方法
 */
    var edit = QMUIEditor.edit = {};
    edit.delete = function() {
        /**
         * 调用系统命令进行退格删除
         */
        doc.execCommand('delete', false, null);
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
    edit.pause = function() {
      console.log('pause')
      selection.ignoreBackup = true;
    }
    edit.resume = function() {
      console.log('resume')
      selection.ignoreBackup = false;
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
        var imgHtml = '<img src="' + img.src + '" width="' + (img.w || '') + '" height="' + (img.h || '') + '" data-addition="' + (img.addition || '') + '" alt="' + (img.alt || '') + '" />';
        this.insert(imgHtml);
    }
    edit.setFontSize = function(size){
        /**
         * 为选中文字设置字号
         * @param {Int} size 三档字号 1、2、3
         */
        doc.execCommand("fontSize", false, size);
        edit.removeSpanWithStyle();
        state.push();
    }
    edit.setBold = function(){
        /**
         * 加粗
         */
        doc.execCommand('bold', false, null);
        edit.removeSpanWithStyle();
        state.push();
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
        if (doc.queryCommandState('insertOrderedList')) {
            doc.execCommand('InsertOrderedList', false, null);
        }

        var focusNode = win.getSelection().focusNode;
        if(focusNode) {
          //console.log(focusNode);
          var hTag = focusNode.getParentElementByTagName(titleTag);
          if(hTag) {
            //console.log(hTag.innerHTML);
            edit.removeNodeAttr(hTag, 'font');
            edit.removeNodeAttr(hTag, 'b[style]');
            //console.log(hTag.innerHTML);
          }
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
    edit.setUnorderedList = function() {
        /**
         * 设置无序列表
         */
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }
        doc.execCommand('InsertUnorderedList', false, null);
        edit.removeSpanWithStyle();
    }
    edit.setOrderedList = function() {
        /**
         * 设置顺序列表
         */
        var formatBlock = doc.queryCommandValue('formatBlock');
        if (this.isHeadingFormat(formatBlock)) {
            doc.execCommand('formatBlock', false, '<' + CONST.defaultParagraph + '>');
        }

        if(editor.innerHTML == CONST.empty_div) {
          doc.execCommand('InsertOrderedList', false, null);
          if(editor.innerHTML == CONST.empty_div) {
            editor.innerHTML = CONST.empty_div_with_ol;
          }
        } else {
          doc.execCommand('InsertOrderedList', false, null);
        }

        edit.removeSpanWithStyle();
    }
    edit.isHeadingFormat = function(formatName){
        return ['h1','h2','h3','h4','h5','h6'].indexOf(formatName) >= 0;
    }
    edit.inputHandler = function(){
        /**
         * 监听input事件并执行需要的特殊操作
         * 避免在blockquote里产生段落,重现路径:在blockquote里设置列表,回车取消列表,这时会产生一个段落元素。理想的情况应该在这时候光标跳出blockquote
         */
        var node = win.getSelection().focusNode,
            para = null,
            blockquote = null;
        if(node.nodeName.toLowerCase() == CONST.defaultParagraph){
            para = node;
        }else if(node.getParentElementByTagName(CONST.defaultParagraph)){
            para = node.getParentElementByTagName(CONST.defaultParagraph);
        }else {
            return;
        }
        if(para.getParentElementByTagName('blockquote')){
            blockquote = para.getParentElementByTagName('blockquote');
            para.appendAfter(blockquote);
            if(!blockquote.innerHTML){
                blockquote.remove();
            }
            selection.selectNodeAndCollapse(para, false);
        }
    }
    edit.removeSpanWithStyle = function(){
        /**
         * 去掉系统生成的 <span style="xxx">标签
         */
        var spans = QMUIEditor.editor.querySelectorAll('span[style]');
        if(spans.length > 0){
           for(var i = 0; i<spans.length; i++){
               selection.backup();
               var span = spans[i];
               if(span.parentNode == editor){
                   span.wrapBy(CONST.defaultParagraph);
               }
               spans[i].unwrap();
               selection.restore();
           }
        }
    }
    edit.removeNodeAttr = function(node, attr){
        var spans = node.querySelectorAll(attr);
        if(spans.length > 0){
           for(var i = 0; i<spans.length; i++){
               selection.backup();
               var span = spans[i];
               if(span.parentNode == editor){
                   span.wrapBy(CONST.defaultParagraph);
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
        editor.empty();
        console.log('init')
        doc.addEventListener('selectionchange', function(){
            editor.togglePlaceholder();
            state.push();
            selection.backup();
        });
    }

})(window, document);

// 暗黑模式切换相关
if((/ColorScheme\/Dark/).test(navigator.userAgent)) {
    document.documentElement.className = 'UI_DARKMODE';
} else {
    document.documentElement.className = '';
}

QMUIEditor.init();
