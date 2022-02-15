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
            'listdata': [],
            'filterInfo': {date: '2019-03', sort: 'down', type: 'chatNum', partyName: '中南海'},
            'platform': {},
        };

        for (var i = 0; i < num; i++) {
            var item = {
                memberName: '&lt;123&gt;', //成员名称
                partyInfo: '部门信息' + parseInt(Math.random() * 1000000000000),// 部门信息
                vid: '111',
                applyContactNum: parseInt(Math.random() * 100),
                customerIncr: parseInt(Math.random() * 100),
                chatNum: parseInt(Math.random() * 100),//聊天总数
                sendMsgNum: parseInt(Math.random() * 100),//成员发送消息数
                replyPer: parseInt(Math.random() * 100),//聊天回复比例,
                firstReplyTime: parseInt(Math.random() * 100),//平均首次回复时长
                feedbackNum: parseInt(Math.random() * 100), //负面反馈数
                hongbao_cnt: parseInt(Math.random() * 100),
                hongbao_money: parseInt(Math.random() * 100),
            };

            debugInfo.listdata.push(item);
        }
        return debugInfo;
    },
};

var Safe = {
    /**
     * 过滤URL脚本，目前此方法已经废弃，可以直接使用 $.filterScript 代替
     * @method filterScript
     * @param str 字符串
     * @return {String} 进行XSS过滤后的字符串
     */
    filterScript: function(str) {
        str = str || '';
        str = str.replace(/<.*>/g, ''); // 过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
        return str;
    },
    /**
     * 转义<>&字符
     * 安全输出innerHTML内容
     *
     * @method outputSafeContent
     * @param {String} str 需要进行安全输出的字符串
     * @return {String} 进行安全处理后的字符串
     */
    outputSafeContent: function(str) {
        return str.replace('&', '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;');
    },
    /**
     * @function unescapeHTML 还原html脚本 < > & " '
     * @param a -
     *            字符串
     */
    unescapeHTML: function(a) {
        a = '' + a;
        return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    }
};

var basetool = {
    formatNum: function (num) {

        if(num-0<0){
            return '--';
        }

        var afterPart = (num + '').split('.');

        var arr = [],
            str = afterPart[0],
            count = str.length;

        while (count >= 3) {
            arr.unshift(str.slice(count - 3, count));
            count -= 3;
        }

        // 如果是不是3的倍数就另外追加到上去
        str.length % 3 && arr.unshift(str.slice(0, str.length % 3));

        if (afterPart && afterPart.length && afterPart[1]) {
            return arr.toString() + '.' + afterPart[1];
        }
        return arr.toString();
    },
    formatDate:function (time, p) {
        var date = new Date(time);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var yesterday = today - 1000 * 60 * 60 * 24;//当前日期时间戳减去一天时间戳

        if (yesterday == time) {
            return language['yesterday'] ;
        }

        var Y = date.getFullYear(),
            M = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        p = p || '%Y-%M-%d %h:%m:%s';
        p = p.replace(/%Y/g, Y).replace(/%M/g, M).replace(/%d/g, d).replace(/%h/g, h).replace(/%m/g, m).replace(/%s/g, s);


        return p;
    }
}

/* 主逻辑 */
var Table = {
    FilterType: 'chatNum',
    FilterDate: 'yesterday',
    FilterSort: 'down',

    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove', // scroll
    TAP: 'tap',

    init: function (listdata, filterInfo, type) {
        this.FilterDate = filterInfo.date || 'yesterday';
        this.FilterType = filterInfo.type || 'chatNum';
        this.FilterSort = filterInfo.sort || 'down';

        // todo 是pc、mac增加选择器
        // PLATFORM =3;
        if (PLATFORM > 2) {
            $('body').addClass('pc');
            this.TOUCHSTART = 'click';
            this.TOUCHMOVE = 'scroll';
            this.TAP = 'click'
        } else {
            $('body').removeClass('pc').addClass('ios');
            this.TOUCHSTART = 'touchstart';
            this.TOUCHMOVE= 'scroll';
            this.TAP = 'tap';
        }


        Table.bindEvent();
        Table.bindSortEvent();

        Table.renderList(listdata, type);
        Table.renderFilter(filterInfo);

        if (!HONGBAOFLAG || HONGBAOFLAG == false) {
            $('.js_hongbao_type').hide()
        }
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



        if(PLATFORM <=2 ){
            self.initDatePicker();
            $('.js-filter-date,.js_range_btn').off(self.TOUCHSTART);
            $('.js-filter-date,.js_range_btn').on(self.TOUCHSTART, function (e) {
                self.FilterDate = $(e.currentTarget).data('date');
                $('.js-filter-date').removeClass('current');
                $('.js-filter-date').removeClass('ww_btn_Active');
                $(e.currentTarget).addClass('current');
                $(e.currentTarget).addClass('ww_btn_Active');
                self.onUpFilter();

                e.stopPropagation();
                $('.js_range_btn').removeClass('worknote_dateSelect_item_checked');
                $(this).addClass('worknote_dateSelect_item_checked');
                $('.js_datePicker_text').text($(this).text());
                self.hideDateSelect();
            });

        }else{

            $('.js-filter-date').off(this.TOUCHSTART);
            $('.js-filter-date').on(this.TOUCHSTART, function (e) {
                self.FilterDate = $(e.currentTarget).data('date');
                $('.js-filter-date').removeClass('current');
                $('.js-filter-date').removeClass('ww_btn_Active');
                $(e.currentTarget).addClass('current');
                $(e.currentTarget).addClass('ww_btn_Active');
                self.onUpFilter();
            });

        };


        $('.js-party').off(this.TAP);
        $('.js-party').on(this.TAP, function () {
            self.onPartyPicker();
        });

        $(window).off('scroll');

        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop == 0) return;// 回到顶部了，无需判断
            if ((Math.ceil(scrollTop + windowHeight) >= scrollHeight)) {
                Table.onScrollBottom();
            }
        });
    },

    // 绑定查看成员信息
    bindMemberInfo: function () {
        var self = this;
        $('.js-member-info').off(this.TAP);

        $('.js-member-info').on(this.TAP, function (e) {
            var id = $(e.currentTarget).data('vid');
            self.onMemberInfo(id);
        });
    },

    // 绑定排序
    bindSortEvent: function () {
        $('.table_header_sort').off(this.TOUCHSTART);
        $('.table_header_sort').on(this.TOUCHSTART, function (e) {
            var arrow = $(e.currentTarget).find('.arrow');
            var sortType;
            var sortName = $(e.currentTarget).data('name');

            // 第一次点击先回到降序
            if (arrow.css('visibility') == 'hidden') {
                $('.table_header_sort .arrow').css('visibility','hidden');
                arrow.css('visibility', 'visible');
                arrow.removeClass('arrow_up').addClass('arrow_down');
                sortType = 'down';
                Table.onSortList(sortType, sortName);
                return;
            }
            // 第一次点击先回到降序

            $('.table_header_sort .arrow').css('visibility','hidden')
            arrow.css('visibility', 'visible');

            if (arrow.hasClass('arrow_down')) {
                console.log('升序');
                sortType = 'up';
                arrow.removeClass('arrow_down').addClass('arrow_up');
            } else {
                sortType = 'down';
                console.log('降序');
                arrow.removeClass('arrow_up').addClass('arrow_down');
            }


            Table.onSortList(sortType, sortName);
        });
    },

    // 划到页面底部了
    onScrollBottom: function () {
        this.hideLoading('false');

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(1);
            setTimeout(function () {
                // Table.init(debugInfo.listdata, debugInfo.filterInfo, 'loadmore');
            }, 2000);
        } else {
            location.href = 'wxwork://jump?target=member_analysis_record_loadmore';
        }

    },

    // 日期筛选
    onUpFilter: function () {
        var filterScheme = '';
        var self = this;

        if (this.FilterDate == 'other') {
            filterScheme = 'wxwork://jump?target=member_analysis_record_filter_datePicker';
            location.href = filterScheme;
            console.log(filterScheme);
        } else {
            this.upFilterScheme();
        }

    },

    // 排序重新reloadlist
    onSortList: function (sortType, sortName) {
        this.FilterType = sortName;
        this.FilterSort = sortType;

        this.upFilterScheme();

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(2);
            Table.init(debugInfo.listdata, debugInfo.filterInfo, 'reload');
        }
    },

    // 选人组件
    onPartyPicker: function () {
        location.href = 'wxwork://jump?target=member_analysis_record_filter_partyPicker';
    },

    // 查看联系人详情
    onMemberInfo: function (id) {
        var shemeurl = 'wxwork://jump?target=member_analysis_record_memberInfo&vid=' + id;
        console.log(shemeurl);
        location.href = shemeurl;
    },

    // 筛选列表
    upFilterScheme: function () {
        if (DEBUG.getQueryVariable('debug')) return;
        var sortScheme = 'wxwork://jump?target=member_analysis_record_filter&type=' + this.FilterType + '&sort=' + this.FilterSort + '&date=' + this.FilterDate;

        setTimeout(function () {
            location.href = sortScheme;
        },100);

    },

    // 渲染列表
    renderList: function (data, type) {
        this.hideLoading('true');

        if ((!data || data.length <= 0) && type == 'reload') {
            this.showListEmpty(true);
            return;
        }

        this.showListEmpty(false);

        if (type == 'reload') {
            $("#left_table2").empty();
            $("#right_table2").empty();
        }

        $.each(data, function (index, item) {
            $("#left_table2").append(Table.getTableRowTpl('member', item));
        });

        $.each(data, function (index, item) {
            $("#right_table2").append(Table.getTableRowTpl('others', item));
        });

        this.bindMemberInfo();
        this.setRightTableWidth();
    },

    // 渲染列表为空
    showListEmpty: function (show) {
        if (show) {
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

        $('.js-filter-date').removeClass('current').removeClass('worknote_dateSelect_item_checked').removeClass('ww_btn_Active');
        $('.js-filter-type').removeClass('current');

        $('.js-filter-type[data-name=' + filterInfo.type + ']').addClass('current');

        // 如果是字符串，则为自定义日期
        if (filterInfo.date != 'yesterday' && filterInfo.date != 'week' && filterInfo.date != 'month') {
            var dateStr;
            try {
                dateStr = decodeURI(filterInfo.date);
            } catch (e) {
                dateStr = filterInfo.date;
            }

            $('.js-filter-date[data-date=other]').addClass('current').addClass('worknote_dateSelect_item_checked').addClass('ww_btn_Active');
            $('.js-filter-date[data-date=other]').text(dateStr);
            $('.js_datePicker_text').text(dateStr);
            $('.js_range_btn[data-date= other]').text(language.other);
        } else {
            $('.js-filter-date[data-date=' + filterInfo.date + ']').addClass('current').addClass('worknote_dateSelect_item_checked').addClass('ww_btn_Active');
            $('.js-filter-date[data-date= other]').text(language.other);
            $('.js_datePicker_text').text($('.js_range_btn.current').text());
        }

        if (filterInfo.partyName) {
            $('.js-party-title').text(filterInfo.partyName);
        }

    },

    /**
     * 隐藏loading
     * @param hide
     */
    hideLoading: function (hide) {
        if (hide == 'true') {
            $('.js-loading').hide();
        } else {
            $('.js-loading').show();
        }
    },

    getTableRowTpl: function (type, item) {

        var memberName_val = Safe.unescapeHTML(item.memberName.toString());
        var partyName_val = Safe.unescapeHTML(item.partyInfo.toString());
        var chatNum_val = Safe.outputSafeContent(basetool.formatNum(item.chatNum));
        var applyContactNum_val = Safe.outputSafeContent(basetool.formatNum(item.applyContactNum));
        var customerIncr_val = Safe.outputSafeContent(basetool.formatNum(item.customerIncr));
        var feedbackNum_val = Safe.outputSafeContent(basetool.formatNum(item.feedbackNum));
        var sendMsgNum_val = Safe.outputSafeContent(basetool.formatNum(item.sendMsgNum));
        var hongbao_cnt_val = Safe.outputSafeContent(basetool.formatNum(item.hongbao_cnt));
        var hongbao_money_val = Safe.outputSafeContent(basetool.formatNum((item.hongbao_money / 100).toFixed(2))) + language['yuan'];
        var replyPer_val = Safe.outputSafeContent(basetool.formatNum(item.replyPer) == '--'?'--':basetool.formatNum(item.replyPer)+'%');
        var firstReplyTime_val = Safe.outputSafeContent(basetool.formatNum(item.firstReplyTime) == '--'?basetool.formatNum(item.firstReplyTime):basetool.formatNum(item.firstReplyTime)+language['minute']);

        var memberRowTpl = "<tr><th class='col_1 member-info js-member-info' data-vid='" + item.vid + " '><div class='table_cell_title paddingLeft'>" + memberName_val + "</div><div class='table_cell_subtitle paddingLeft'>" + partyName_val + "</div></th></tr>";
        var normalCellTpl = "<tr><td class='col_2'><span class='paddingLeft'>" + applyContactNum_val + "</span></td><td" +
            " class='col_3'><span class='paddingLeft'>" + customerIncr_val + "</span></td><td class='col_4'><span" +
            " class='paddingLeft'>" + chatNum_val + "</span></td>"+
            "<td class='col_5'><span class='paddingLeft'>" + sendMsgNum_val + "</span></td>"+
            "<td class='col_9 js_hongbao_type'><span class='paddingLeft'>" + hongbao_cnt_val + "</span></td>"+
            "<td class='col_10 js_hongbao_type'><span class='paddingLeft'>" + hongbao_money_val + "</span></td>"+
            "<td class='col_6'><span class='paddingLeft'>" + replyPer_val + "</span></td>"+
            "<td class='col_7'><span class='paddingLeft'>" + firstReplyTime_val + "</span></td>"+
            "<td class='col_8'><span class='paddingLeft'>" + feedbackNum_val + "</span></td>"+
            "</tr>";

        if (type == 'member') {
            return memberRowTpl;
        }

        return normalCellTpl;
    },

    setRightTableWidth: function () {
        $("#table_right").css('width', document.documentElement.clientWidth - $("#table_left_headerWrap").width() - 2 + "px");
        this.showPage();
    },

    showPage: function () {
        $('body').css(' visibility', 'visible');
        $('.js_first_arrow').show();
        $('.fullpage').css(' visibility', 'visible');
    },

    initDatePicker: function () {
        var self = this;
        // self.hideDateSelect();

        $('.worknote_dateSelect,.mask').hide();

        $('.js_datePicker').off(self.TAP);
        $('.js_datePicker').on(self.TAP, function (e) {
            e.stopPropagation();
            self.showDateSelect();
        });

        $('.mask, .dateSelect_cancel').off(self.TAP);
        $('.mask, .dateSelect_cancel').on(self.TAP, function (e) {
            e.preventDefault();
            self.hideDateSelect();
        });

        $('.mask').off(self.TOUCHSTART);
        $('.mask').on(self.TOUCHSTART,function (e) {
            e.preventDefault();
        });

    },

    showDateSelect: function () {
        $(".worknote_dateSelect").slideDown(150);
        $('.mask').show();
        location.href = 'wxwork://jump?target=member_analysis_record_portrait&portrait=true';
    },

    hideDateSelect: function () {
        var self = this;
        $(".worknote_dateSelect").slideUp(150);
        $('.mask').hide();
        if(self.FilterDate != 'other'){
            location.href = 'wxwork://jump?target=member_analysis_record_portrait&portrait=false';
        }
    },


    setScrollTip: function () {
        var $tableWrap = $("#table_right_contentWrap");
        var sLeft = $tableWrap.scrollLeft();
        var viewWidth = $tableWrap.width();
        var tableWidth = $tableWrap.find('table').width();
        // console.log(tableWidth, viewWidth, sLeft, $tableWrap, $tableWrap[0].offsetWidth)

        $('#js-scroll-tip').toggle(tableWidth > (viewWidth + sLeft));
    },


};

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * 设置表格数据
     * @param data = [{
            memberName: '', //成员名称
            vid:'',//vid
            partyInfo: '',// 部门信息
            chatNum: '',//聊天总数
            sendMsgNum: '',//成员发送消息数
            replyPer: ''//聊天回复比例
        }]
     */
    upDataForClient: function (content) {
        try {
            content = JSON.parse(content);
        } catch (e) {
            content = content;
        }
        console.log(content);

        if (content) {
            Table.init(content.listdata, content.filterInfo, content.type);
        }

    },

    //是否隐藏加载更多
    hideLoading: function (hide) {
        Table.hideLoading(hide);
    },

    showExportIng: function(show) {
        if (show || show === 'true') {
            $('.js_export_ing').show();
            $('.js_export_default').hide();
        } else {
            $('.js_export_ing').hide();
            $('.js_export_default').show();
        }
    },

    hideExportArea: function (show) {
        if (show || show ==='true') {
            $('.js_inner_export').show()
        } else {
            $('.js_inner_export').hide()
        }
    }
}

/* 初始化 */
var mainFunc = {
    init: function () {

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(100);
            Table.init(debugInfo.listdata, debugInfo.filterInfo, 'reload');

            // JSAPI.upDataForClient('{"type":"reload","filterInfo":{"partyName":"全部","partyNameHiglight":"false","sort":"up","type":"applyContactNum","date":"yesterday"},"listdata":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')

            // JSAPI.upDataForClient('{"type":"reload","filterInfo":{"partyName":"全部","partyNameHiglight":"false","sort":"down","type":"applyContactNum","date":"yesterday"},"listdata":[{"firstReplyTime":-1,"vid":1688850933687415,"chatNum":84,"memberName":"陈敏","replyPer":0,"feedbackNum":0,"sendMsgNum":128,"applyContactNum":16,"partyInfo":"服务数据统计666","customerIncr":0},{"firstReplyTime":2,"vid":1688850933687416,"chatNum":74,"memberName":"代云浩","replyPer":100,"feedbackNum":5,"sendMsgNum":156,"applyContactNum":17,"partyInfo":"服务数据统计666","customerIncr":26}]}')



        } else {
            if (CONTENT) {
                Table.init(CONTENT.listdata, CONTENT.filterInfo, CONTENT.type);
            }
        }

    }
};
mainFunc.init();

//todo debug开关
// initDebug();
