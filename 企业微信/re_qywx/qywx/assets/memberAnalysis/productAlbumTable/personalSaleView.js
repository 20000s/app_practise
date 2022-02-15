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
            filterInfo: {
                'date': 'today',
                'partyName': '中南海',
            },
            'platform': {},
        };

        for (var i = 0; i < num; i++) {
            var item = {
                memberName: '&lt;123&gt;', //成员名称
                partyInfo: '部门信息' + parseInt(Math.random() * 1000000000000),// 部门信息
                vid: '111',
                sharecnt: parseInt(Math.random() * 100),
                sharetime: parseInt(Math.random() * 100),
                salescnt: parseInt(Math.random() * 100),
                salesmoney: parseInt(Math.random() * 100),
            };

            debugInfo.listData.push(item);
        }
        return debugInfo;
    },
};

/* 表格配置 */
var tableConfig = {
    tapEventName: 'tap or click',
    leftTableConfig: {
        tableSelector: $('#table_left'),
        config: [{
            title: language['member'],
            dataIndex: 'memberName',
            extClass: 'member-info js-member-info',
            renderItem: function (val, row, idx) {
                return "<div class='table_cell_title paddingLeft js-data-dom' data-vid='" + row.vid + "' >" + val + "</div><div class='table_cell_subtitle paddingLeft'>" + row.partyInfo + "</div>";
            }
        }]
    },
    rightTableConfig: {
        tableSelector: $('#table_right'),
        config: [{
            title: language['sharecnt'],
            dataIndex: 'sharecnt',
            sort: false
        }, {
            title: language['sharetime'],
            dataIndex: 'sharetime'
        }, {
            title: language['salescnt'],
            dataIndex: 'salescnt'
        }, {
            title: language['salesmoney'],
            dataIndex: 'salesmoney'
        }]
    },
    sortChange: function (sortType, sortName) {
        console.log('sortChange: ', sortType, sortName)
    }
}

/* 主逻辑 */
var PersonalSaleView = {

    FilterPartyName: '',
    FilterDate: '',

    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove', // scroll
    TAP: 'tap',

    table: null,

    init: function (listData, partyName, date, type) {
        this.FilterPartyName = partyName;
        this.FilterDate = date;

        // todo 是pc、mac增加选择器
        // PLATFORM =3;
        if (PLATFORM > 2) {
            this.TOUCHSTART = 'click';
            this.TOUCHMOVE = 'scroll';
            this.TAP = 'click'
        } else {
            this.TOUCHSTART = 'touchstart';
            this.TOUCHMOVE= 'scroll';
            this.TAP = 'tap';
        }

        $('body').addClass('ios');

        // 初始化表格
        tableConfig.tapEventName = this.TAP;
        this.table = window.initTable(tableConfig);

        this.bindEvent();

        this.setRightTableWidth();

        this.renderList(listData, partyName, date, type);
        this.renderFilter(partyName, date);

        this.setScrollTip();
    },

    renderList: function (listData, partyName, date, type) {
        this.hideLoading(true);
        if (!this.table) {
            this.init(listData, partyName,date, type);
            return;
        }

        this.renderFilter(partyName, date);

        if (type === 'reload') {
            this.table.reloadData(listData)
        } else {
            this.table.appendData(listData);
        }

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

        $('#js-select-member').on(this.TAP, function (){
            window.location.href = 'wxwork://jump?target=member_analysis_fitler';
        });

        $('#table_left').on(this.TAP, '.js-member-info', function (e){
            window.location.href = 'wxwork://jump?target=member_analysis_memberInfo&vid='+$(e.currentTarget).find('.js-data-dom').data('vid')
        });

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
                // Table.init(debugInfo.listData, debugInfo.partyName, 'loadmore');
            }, 2000);
        } else {
            location.href = 'wxwork://jump?target=member_analysis_loadmore';
        }

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
    renderFilter: function (partyName, date) {
        if (partyName) {
            $('#js-select-member').find('.js-text').text(this.table.Safe.outputSafeContent(partyName));
        }

        if (date) {
            var showDate = date;
            if (['all', 'today', 'yesterday', 'week', 'month'].indexOf(date) === -1) {
                try {
                    showDate = decodeURI(date);
                } catch (e) {
                }
                date = 'other'
            } else {
                showDate = language[date];
            }
            $('#js-select-date').find('.js-text').text(showDate);
            var $datePop = $('#js-date-pop');
            $datePop.find('.js-pop-item').removeClass('pop_select_item_checked');
            $datePop.find('.js-pop-item[data-val="' + date + '"]').addClass('pop_select_item_checked');
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

    // 时间筛选
    onUpFilterDate: function (type) {
        this.screenRotation('false');
        var searchUrl = ''
        if(type !== 'other') {
            searchUrl = 'wxwork://jump?target=member_analysis_filter_date&date=' + type;
        } else {
            searchUrl = 'wxwork://jump?target=member_analysis_datePicker';
        }
        setTimeout(function (){
            window.location.href = searchUrl;
        }, 200)
    },

    screenRotation: function (direction) {
        location.href = 'wxwork://jump?target=member_analysis_portrait&portrait=' + direction;
    },

    showPage: function () {
        $('body').css(' visibility', 'visible');
        $('.fullpage').css(' visibility', 'visible');
    },
};

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * 设置表格数据
     */
    upDataForClient: function (content) {
        try {
            content = JSON.parse(content);
        } catch (e) {
            content = content;
        }
        console.log(content);

        if (content) {
            PersonalSaleView.renderList(content.listData, content.filterInfo.partyName, content.filterInfo.date, content.type);
        }

    },
}

/* 初始化 */
var mainFunc = {
    init: function () {

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(2);
            PersonalSaleView.init(debugInfo.listData, debugInfo.filterInfo.partyName, debugInfo.filterInfo.date, 'reload');

            // JSAPI.upDataForClient('{"type":"reload","partyName":"dddd","listData":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')

            // JSAPI.upDataForClient('{"type":"reload","partyName":"2222","listData":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')



        } else {
            if (CONTENT) {
                PersonalSaleView.init(CONTENT.listData, CONTENT.filterInfo.partyName, CONTENT.filterInfo.date, CONTENT.type);
            }
        }

    }
};
mainFunc.init();

//todo debug开关
// initDebug();
