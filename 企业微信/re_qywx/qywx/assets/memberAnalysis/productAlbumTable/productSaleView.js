/**
 * 报表组件
 *
 * @author borgzheng
 */


/* 初始化调试器 */
var initDebug = function () {
    var times = 0;

    var vconsole = new VConsole();

    $('.analysisTitle').on('touchstart', function () {
        times++;
        if (times == 5) {
            times = 0;
            $('#__vconsole .vc-switch').show();
        }
    })
};

/* 生成debug数据 */
var DEBUG = {
    getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    },
    genDebugData: function (num) {
        var debugInfo = {
            'listData': [],
            'filterInfo': { date: 'today', type: 'all' },
            'platform': {},
        };

        for (var i = 0; i < num; i++) {
            var item = {
                productId: parseInt(Math.random() * 100),
                viewtime: parseInt(Math.random() * 100),
                sharetime: parseInt(Math.random() * 100),
                salescnt: parseInt(Math.random() * 100),
                salesmoney: parseInt(Math.random() * 100),
                ftnFileId: '*0*CTBfpwFfzTIoxF4V027C8Dce4ySRm6LEjrOokL3LPDeAgudwW0KHGNw6OlULRv2XjC1uhcAySo66PpjGyIkWWrywn3RNIbzUT6xZBhs0YrttO%2BG3W0QfsqIJbgqm0V7a9%2Fd%2FUis4%2BPZhz4Ot3HMQaw%3D%3D',
                "creatorName": "noahlong",
                productType: '11111',
                "creatorVid": 324789379853,
                c2cFileId: '11111',
                aeskey: '2222'
            };

            debugInfo.listData.push(item);
        }
        return debugInfo;
    },
};

var imgProxyUrl = 'https://xcx.work.weixin.qq.com/xcx/getCDNFile';

function getImgProxyUrl(file_id, aes_key) {
    return imgProxyUrl + '?file_id=' + (file_id || '') + '&aes_key=' + (aes_key || '');
}

/* 表格配置 */
var tableConfig = {
    tapEventName: 'tap or click',
    leftTableConfig: {
        tableSelector: $('#table_left'),
        config: [{
            title: language['product'],
            dataIndex: 'ftnFileId',
            sort: false,
            renderItem: function (val, row, idx) {
                // return '<img  class="p-img js-product" data-picid="' + row.productId + '" data-ptype="' + row.productType + '" src="' + imgProxyUrl + encodeURIComponent(val) + '"/>';
                return '<div  class="p-img js-product" data-picid="' + row.productId + '" data-ptype="' + row.productType + '" data-vid="' + row.creatorVid + '" style="background-image: url(' + getImgProxyUrl(row.c2cFileId, row.aeskey) + ')"/>';
            }
        }]
    },
    rightTableConfig: {
        tableSelector: $('#table_right'),
        config: [{
            title: language['viewtime'],
            dataIndex: 'viewtime',
            sort: false
        }, {
            title: language['sharetime'],
            dataIndex: 'sharetime',
            sort: false
        }, {
            title: language['salescnt2'],
            dataIndex: 'salescnt',
            sort: false
        }, {
            title: language['salesmoney2'],
            dataIndex: 'salesmoney',
            sort: false
        }, {
            title: language['creatorName'],
            dataIndex: 'creatorName',
            sort: false
        }]
    },
    sortChange: function (sortType, sortName) {
        console.log('sortChange: ', sortType, sortName)
    }
}

/* 主逻辑 */
var ProductSaleView = {

    FilterDate: 'today',
    FilterCreateType: 'all',
    // FilterSortName: 'chatNum',
    // FilterSortType: 'down',

    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove', // scroll
    TAP: 'tap',

    table: null,

    init: function (listData, filterInfo, type) {
        this.FilterDate = filterInfo.date || 'today';
        // this.FilterSortName = filterInfo.sortName || 'chatNum';
        // this.FilterSortType = filterInfo.sortType || 'down';
        this.FilterCreateType = filterInfo.type || 'all';

        // todo 是pc、mac增加选择器
        // PLATFORM =3;
        if (PLATFORM > 2) {
            this.TOUCHSTART = 'click';
            this.TOUCHMOVE = 'scroll';
            this.TAP = 'click'
        } else {
            this.TOUCHSTART = 'touchstart';
            this.TOUCHMOVE = 'scroll';
            this.TAP = 'tap';
        }

        $('body').addClass('ios');

        // 初始化表格
        tableConfig.tapEventName = this.TAP;
        this.table = window.initTable(tableConfig);

        this.bindEvent();

        this.setRightTableWidth();

        this.renderList(listData, filterInfo, type);
        this.renderFilter(filterInfo);

        this.setScrollTip();
    },

    renderList: function (listData, filterInfo, type) {
        this.hideLoading(true);
        if (!this.table) {
            this.init(listData, filterInfo, type);
            return;
        }

        if (type === 'reload') {
            this.table.reloadData(listData);
        } else {
            this.table.appendData(listData);
        }

        this.renderFilter(filterInfo);

        this.showListEmpty();

        this.setRightTableWidth();
    },

    // 绑定日期筛选&选人筛选
    bindEvent: function () {
        var self = this;
        //固定和滚动
        $(window).on('resize', function () {
            self.setRightTableWidth();
        })
        $("#table_right_contentWrap").off(self.TOUCHMOVE);
        $("#table_right_contentWrap").scroll(function (e) {
            setTimeout(function () {
                var $el = e.target;
                var sLeft = $el.scrollLeft;
                var right_div2_top = $el.scrollTop;
                var right_div2_left = $el.scrollLeft;

                $("#table_left_contentWrap").scrollTop(right_div2_top);
                // $("#table_left_contentWrap").css('transform', 'translateY(-' +right_div2_top + 'px)');
                $("#table_right_headerWrap").scrollLeft(right_div2_left);
                // $("#table_right_headerWrap").css('opacity', '0');
                // $("#table_right_headerWrap").css('transform', 'translateX(-' +right_div2_left + 'px)');


                if (sLeft == 0) {
                    $('#table_left').removeClass('scroll-shadow');
                } else {
                    $('#table_left').addClass('scroll-shadow');
                }

                self.setScrollTip();
            });
        });

        $('#table_left').on(self.TAP, '.js-product', function (e) {
            var $this = $(e.currentTarget);
            window.location.href = 'wxwork://jump?target=detail_analysis_detail&picId=' + $this.data('picid')+'&type='+$this.data('ptype')+'&vid='+$this.data('vid')
        })

        // 通用的pop选择浮层
        var hidePop = function () {
            $('.mask').hide();
            $('.js-pop-target').each(function (idx, item) {
                $(item).slideUp(150);
            });
        }
        $('.js-pop-picker').on(self.TAP, function (e) {
            e.stopPropagation();
            $('.mask').show();
            $($(e.currentTarget).data('popTarget')).slideDown(150);
            self.screenRotation('true');
        });
        $('.mask, .js-pop-cancel').on(self.TAP, hidePop);

        $('.js-pop-item').on(this.TAP, function (e) {
            e.stopPropagation();
            var $this = $(e.currentTarget);
            var $parentBox = $this.closest('.js-pop-target')
            var val = $this.data('val');
            var selectCb = $parentBox.data('selectCb');
            $parentBox.find('.js-pop-item').removeClass('pop_select_item_checked');
            $this.addClass('pop_select_item_checked');
            // 执行选择回调
            self[selectCb] && self[selectCb](val);
            hidePop();
        })

        // 加载更多
        $(window).off('scroll').on('scroll', function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop == 0) return;// 回到顶部了，无需判断
            if ((scrollTop + windowHeight == scrollHeight)) {
                self.onScrollBottom();
            }
        });
    },

    setScrollTip: function () {
        var $tableWrap = $("#table_right_contentWrap");
        var sLeft = $tableWrap.scrollLeft();
        var viewWidth = $tableWrap.width();
        var tableWidth = $tableWrap.find('table').width();
        // console.log(tableWidth, viewWidth, sLeft, $tableWrap, $tableWrap[0].offsetWidth)

        $('#js-scroll-tip').toggle(tableWidth > (viewWidth + sLeft));
    },

    // 划到页面底部了
    onScrollBottom: function () {
        this.hideLoading(false);

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(1);
            setTimeout(function () {
                ProductSaleView.renderList(debugInfo.listData, debugInfo.filterInfo, 'loadmore');
            }, 2000);
        } else {
            location.href = 'wxwork://jump?target=detail_analysis_loadmore';
        }

    },

    // 日期筛选
    onUpFilterDate: function (date) {
        this.FilterDate = date;
        $('#js-date-btn').find('.js-text').text($('#js-date-pop').find('[data-val="' + date + '"]').text());
        if (this.FilterDate === 'other') {
            location.href = 'wxwork://jump?target=detail_analysis_datePicker';
        } else {
            this.screenRotation('true');
            this.upFilterScheme();
        }

    },

    // 创建类型筛选
    onUpFilterCreate: function (type) {
        this.screenRotation('false');
        this.FilterCreateType = type;
        $('#js-create-btn').find('.js-text').text($('#js-create-pop').find('[data-val="' + type + '"]').text());
        this.upFilterScheme();
    },

    // 筛选列表
    upFilterScheme: function () {
        var sortScheme = 'wxwork://jump?target=detail_analysis_filter&date=' + this.FilterDate + '&type=' + this.FilterCreateType;

        setTimeout(function () {
            location.href = sortScheme;
        }, 100);

    },

    // 渲染列表为空
    showListEmpty: function () {
        if (!$('#left_table2').find('tr').size()) {
            $('.js-table-data').hide();
            $('.js-table-empty').show();
        } else {
            $('.js-table-data').show();
            $('.js-table-empty').hide();
        }
        this.showPage();

    },

    // 渲染筛选项
    renderFilter: function (filterInfo) {
        if (!filterInfo) {
            return;
        }

        if (filterInfo.type) {
            var $createPop = $('#js-create-pop');
            $('#js-create-btn').find('.js-text').text($createPop.find('[data-val="' + filterInfo.type + '"]').text() || '类型');
            $createPop.find('.js-pop-item').removeClass('pop_select_item_checked');
            $createPop.find('.js-pop-item[data-val="' + filterInfo.type + '"]').addClass('pop_select_item_checked');
        }

        if (filterInfo.date) {
            var realDate = filterInfo.date;

            // 如果是字符串，则为自定义日期
            if (['today', 'yesterday', 'week', 'month'].indexOf(filterInfo.date) === -1) {
                var dateStr;
                try {
                    dateStr = decodeURI(filterInfo.date);
                } catch (e) {
                    dateStr = filterInfo.date;
                }
                realDate = 'other';

                $('#js-date-btn').find('.js-text').text(dateStr);
            } else {
                $('#js-date-btn').find('.js-text').text(language[filterInfo.date]);
            }
            var $datePop = $('#js-date-pop');
            $datePop.find('.js-pop-item').removeClass('pop_select_item_checked');
            $datePop.find('.js-pop-item[data-val="' + realDate + '"]').addClass('pop_select_item_checked');
        }
    },

    /**
     * 隐藏loading
     * @param hide
     */
    hideLoading: function (hide) {
        $('.js-loading').toggle(!hide)
    },

    setRightTableWidth: function () {
        this.table.resetRightTableSize();
        this.showPage();
    },

    showPage: function () {
        $('body').css(' visibility', 'visible');
        $('.fullpage').css(' visibility', 'visible');
    },
    screenRotation: function (direction) {
        location.href = 'wxwork://jump?target=detail_analysis_portrait&portrait=' + direction;
    },
};

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * 设置表格数据
     */
    upDataForClient: function (content) {
        console.log('JSAPI.upDataForClient', content);
        try {
            content = JSON.parse(content);
        } catch (e) {
            content = content;
        }

        if (content) {
            ProductSaleView.renderList(content.listData, content.filterInfo, content.type);
        }

    },
}

/* 初始化 */
var mainFunc = {
    init: function () {

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(10);
            // debugInfo = {"type":"reload","listData":[{"sharetime":2,"salescnt":0,"productId":1,"viewtime":11,"ftnFileId":"*0*30jbHX5lvZDBC3pSaHamK1emXxxgpGDL80CksSkG3asJMErhB3Mr3qmOsM7frNO9MoZQA1Wr5cJo\/zEPaxKs3FDA3yc\/MKxl6ciqc9iu1pDcBCFuht\/R7XllIgJx+X19QSGSJxYhJavuhbNGmLFM7Q==","creatorName":"link2","creatorVid":1688850427719290,"salesmoney":0,"product_type":1},{"sharetime":1,"salescnt":0,"productId":2,"viewtime":8,"ftnFileId":"*0*3uSxnKduxcIz9PaRnCNAfIJH2Bnio37YWPkK20qw\/zjNLhqhCoqaxdWrcw5xx3OcTszz17Pks1CkXbkHQtYEkT1ucB6CiA6xR7ADOYekWR5A5LlsodHNuA3hQP2WT3StqJgJhq29HVZEbkPHy\/lSGA==","creatorName":"Noahlong","creatorVid":1688850427720545,"salesmoney":0,"product_type":2},{"sharetime":2,"salescnt":0,"productId":1,"viewtime":5,"ftnFileId":"*0*O1eDFJjjcmDINOm5P8z7EFZsysQCwc70+q1Gj2LkPquWlBpjYCA+NkFzhWOumjeaY2nsKDJKiptwa4AZtS+sN8v7qbA4RQgIL8mqVh7oqL\/2gTl6HVGFvd8Lk1drjkPE\/mwbHRiI8WzG\/wp3bRUAPw==","creatorName":"link","creatorVid":1688850427719289,"salesmoney":0,"product_type":2},{"sharetime":0,"salescnt":0,"productId":1,"viewtime":4,"ftnFileId":"*0*dYT4zw\/UnEier46zVVxTm4ZKoByjtAguZFuY1EV1yHRFl2jfpOilrJT25jIPXUHSBpGHpI9aTcEyPCWKTvXo2lA+0MiIlJgutEa2Tcleun53qrN4FOCm7HyLmJk0oG9t1YwlolpTt00buC65vQW7mA==","creatorName":"Noahlong","creatorVid":1688850427720545,"salesmoney":0,"product_type":1},{"sharetime":5,"salescnt":0,"productId":2,"viewtime":3,"ftnFileId":"*0*tHtzcHU4JOhctOGWFTpc3+Wu1k4MtnZa6\/Ln1j+ImPXYSED1aXq6yN8NcCr0yZl3HmuJslxgm31lfZ2cmZOkoeHQNLbEW8tTY0v+mazG3SRRm1rU\/elueWfkfH5a8CW\/v4mQRiXKQZudJeHsWOnmLA==","creatorName":"王斌","creatorVid":1688850427720546,"salesmoney":0,"product_type":1},{"sharetime":5,"salescnt":0,"productId":1,"viewtime":3,"ftnFileId":"*0*EvaUpZF4xcywkJnk1+1zjihPWumDJm1OUl4BZ1YCNs65Pdy6mDix+O4dF6yB4LT+k9TAPlMTc\/heUVaZLtONrZkbbvxZN670pvJU\/JUxOnpBQToovHqblLv52W8z2wgSHfb\/SOhWS2WSDnAIQhhOMA==","creatorName":"王斌","creatorVid":1688850427720546,"salesmoney":0,"product_type":1}],"filterInfo":{"date":"week","type":"all"}}
            ProductSaleView.init(debugInfo.listData, debugInfo.filterInfo, 'reload');

            // JSAPI.upDataForClient('{"type":"reload","filterInfo":{"partyName":"全部","partyNameHiglight":"false","sort":"up","type":"applyContactNum","date":"yesterday"},"listData":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')

            // JSAPI.upDataForClient('{"type":"reload","filterInfo":{"partyName":"全部","partyNameHiglight":"false","sort":"down","type":"applyContactNum","date":"yesterday"},"listData":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')


        } else {
            if (CONTENT) {
                ProductSaleView.init(CONTENT.listData, CONTENT.filterInfo, CONTENT.type);
            }
        }

    }
};
mainFunc.init();

//todo debug开关
// initDebug();
