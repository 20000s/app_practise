; (function(window) {
    var enc = window.encodeURIComponent;

    try {
        window.wwperf = {

            config: function(env) {
                var perf = window.performance;
                var doc = window.document;
                var timing = perf.timing;

                var hasReport = false;

                try {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!ua.match('wxwork')) {
                        return;
                    }

                    if (window.WeixinJSBridge) {
                        loadComplete();
                    } else {
                        doc.addEventListener('WeixinJSBridgeReady', loadComplete, false);
                    }

                    if (doc.readyState === 'complete') {
                        loadComplete();
                    } else {
                        window.addEventListener('load', loadComplete, false);
                    }
                } catch (error) {
                    return reportError(error, env);
                }

                function loadComplete() {
                    try {
                        if (window.WeixinJSBridge && doc.readyState === 'complete') {
                            window.setTimeout(report, 0);
                        }
                    } catch (error) {
                        return reportError(error, env);
                    }
                }

                function report() {
                    try {
                        if (hasReport) {
                            return
                        }
                        hasReport = true

                        var redirectCount = -1;
                        if (perf.navigation && perf.navigation.redirectCount != null) {
                            redirectCount = perf.navigation.redirectCount;
                        }

                        var resourceCount = -1;
                        if (typeof perf.getEntries === 'function') {
                            var entries = perf.getEntries();
                            resourceCount = 0;
                            for (var i = entries.length - 1; i >= 0; i--) {
                                if (entries[i].entryType == 'resource') {
                                    resourceCount += 1;
                                }
                            }
                        }

                        window.WeixinJSBridge.invoke('innerSaveWebPerformance', {
                            perf_data: JSON.stringify({
                                env: env,
                                url: window.location.href,
                                redirect_count: redirectCount,
                                resource_count: resourceCount,
                                dns_time: Math.max(0, timing.domainLookupEnd - timing.domainLookupStart),
                                connect_time: Math.max(0, timing.connectEnd - timing.connectStart),
                                request_time: Math.max(0, timing.responseEnd - timing.requestStart),
                                loading_time: Math.max(0, timing.domLoading - timing.navigationStart),
                                interactive_time: Math.max(0, timing.domInteractive - timing.navigationStart),
                                complete_time: Math.max(0, timing.domComplete - timing.navigationStart),
                                log_time: Math.floor((+new Date) / 1000),
                            }),
                        }, function() {
                            // noop
                        });
                    } catch (error) {
                        return reportError(error, env);
                    }
                }
            },
        };
    } catch (error) {
        return reportError(error);
    }

    function reportError(error, env) {
        try {
            var src = 'https://open.work.weixin.qq.com/wwopen/report/wwperf?e=' + enc(error.message.slice(0, 100));
            if (env != null) {
                src += '&v=' + enc(JSON.stringify(env));
            }
            var img = new window.Image();
            img.src = src;
        } catch (error) {
            // noop
        }
    }

})(this);
