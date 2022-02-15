(function(doc, win){
	function JB(){
	    // 通过iframe的url发出请求
		this.ifr = doc.createElement('iframe');
		this.ifr.style.cssText = 'width:0;height:0;display:none;';
		this.scheme = 'qmuijb://';
		doc.body.appendChild(this.ifr);

		// 可以执行请求的标识，
		this.shouldStartCall = true;

        // 根据每次请求时的callbackId保存callback，native返回数据时会请求callbackId对应的callback
		this.callbackMap = {};
	}
	JB.prototype.call = function(funcName, params, callback) {
		/**
		 * 调用方法
		 * @type {[type]}
		 * @param {String} funcName - 方法名
		 * @param {Object} params - 参数，接受各种类型，native端会toString处理
		 * @param {Function} callback - 回调函数
		 */
	    var self = this;

        var msg  = {};
        msg['funcName'] = funcName;
        msg['params'] = params;

		var callbackId;
        if(typeof callback == 'function'){
            callbackId = new Date().getTime();
		    this.callbackMap[callbackId] = callback;
        	msg['callbackId'] = callbackId;
        }

        this.callFuncByQueue(function(){
            var url = self.scheme + '_call?msg=' + encodeURI(JSON.stringify(msg));
            self.ifr.src = url;
        });

	};

	// 同时重复修改iframe的url，系统只能拿到最后一次。这里简单加个timeout间隔开
	JB.prototype.callFuncByQueue = function(call){
	    var self = this;
	    if(self.shouldStartCall){
	        call();
	        self.shouldStartCall = false;
	    }else{
	        setTimeout(function(){
                self.shouldStartCall = true;
	            call();
	        }, 16);
	    }
	}

	// jb需要准备一个函数给native调用并传入回调的数据
	JB.prototype.handleCallback = function(callbackData){
		var successOrNot = callbackData['successOrNot'], // 请求回调是否成功
			callbackId = callbackData['callbackId'], // js发出请求时带上的callbackId，回调后通过这个id找到请求对应的回调函数处理数据
			data = callbackData['data']; // 回调的数据
		this.callbackMap[callbackId](successOrNot, data); // 回调方法 function(success, data){ ... }
		delete this.callbackMap[callbackId];
	}

	win['QMUIJsBridge'] = new JB();
})(document, window);