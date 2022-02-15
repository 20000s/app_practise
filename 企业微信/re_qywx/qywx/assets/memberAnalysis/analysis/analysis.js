/**
 * 统计业务逻辑
 *
 * @author borgzheng
 */

/* 生成debug数据 */
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

/* 时间格式化方法 */
var basetool = {
    formatNum: function (num) {
        if (num - 0 < 0) {
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
    formatDate: function (time, p) {
        var date = new Date(time);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var yesterday = today - 1000 * 60 * 60 * 24;//当前日期时间戳减去一天时间戳

        if (yesterday == time) {
            return language['yesterday'];
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
            'generalInfo': {
                chatNum: -1,//聊天总数
                sendMsgNum: 0,//成员发送消息数
                replyPer: 123,//聊天回复比例,
                firstReplyTime: -1,//平均首次回复时长
                feedbackNum: 2, //负面反馈数
                applyContactNum: 10,
                customerIncr: 20,
                hongbao_cnt: 0,
                hongbao_money: 1212312378,
            },
            'filterInfo': {
                'type': 'hongbao_money',
                'date': 'month',
                'partyName': '1123,123123',
                'partyNameHiglight': 'true'
            },
            'platform': {},
            'DailyPushStatus': false,
        };

        debugInfo.listdata = [{
            date: '1554048000',
            total: 5,
        }, {
            date: '1554134400',
            total: 10,
        }, {
            date: '1554220800',
            total: 15,
        }, {
            date: '1554307200',
            total: 20,
        }, {
            date: '1554393600',
            total: -1,
        }, {
            date: '1554480000',
            total: 35,
        }, {
            date: '1554566400',
            total: 0,
        }
        ]
        return debugInfo;
    },
};

var FIRSTTIMESHOW = true;

var initHighChart = {
    initChart: function (listArry, tipsWording) {
        var self = this;

        // 生成样式及数据配置
        var styleOption = self.getStyleOption();

        // 如果是大于7天的数据则生成截取 -- start
        if (listArry.x.length > 7) {
            var number = listArry.x.length - 1;
            var tickPositionsArry = [number];
            var count = Math.ceil(listArry.x.length / 7);

            for (var i = 0; i < 7; i++) {
                if (number <= 0) {
                    break;
                }
                number = number - count;
                tickPositionsArry.push(number);
            }

            tickPositionsArry = tickPositionsArry.reverse();

            styleOption.xAxis.tickPositions = tickPositionsArry;
        }
        // 如果是大于7天的数据则生成截取 -- end

        var option = $.extend(true, styleOption, self.getConfigOption(listArry));

        self.renderChart(option, listArry, tipsWording);
    },

    renderChart: function (option, listArry, tipsWording) {
        var theChart;
        var tooltipWidth = PLATFORM > 2 ? 30 : 60;

        var configOption = {
            chart: {
                renderTo: 'use_analysis_container',
            },
            xAxis: {
                categories: option.xAxisArray,
            },
            yAxis: {
                max: option.tickOption.y_Max,
                min: option.tickOption.y_Min,
                allowDecimals: true,
                title: '',
                labels: {
                    // format: '{value:.2f}',
                    formatter: function () {
                        return parseFloat(this.value);
                    }
                }
            },

            tooltip: {
                positioner: function (x, y, point) {
                    var x = point.plotX;
                    if (point.plotX + theChart.tooltip.label.width + tooltipWidth > window.innerWidth + 14 * 2) {
                        x = window.innerWidth - theChart.tooltip.label.width - tooltipWidth - 14 * 2;
                    }

                    return {
                        x: x,
                        y: 0
                    }
                },
                formatter: function (data) {
                    return '<div class="log_chartPanel" id="log_chartPanel">'
                        + '<div class="log_chartPanel_item log_chartPanel_item_dateWrap"><div class="log_chartPanel_item_date">'
                        + listArry.x[this.point.index]
                        + '</div></div>'
                        + '<div class="log_chartPanel_item log_chartPanel_item_Use"><div class="log_chartPanel_item_label">' + tipsWording + '</div><div class="log_chartPanel_item_value">'
                        + listArry.tipsArry[this.point.index]
                        + '</div></div></div>'
                }
            },

            series: [{
                type: 'area',
                data: option.initdata
            }],
            plotOptions: {
                series: {
                    animation: option.animation,
                    events: {
                        click: function (e) {
                            console.log(e);
                        }
                    }
                },
            }
        };

        var option = $.extend(true, configOption, option);

        theChart = new Highcharts.Chart(option);
    },

    // 区间计算
    getTickOption: function (yData) {
        //最大值
        var useMax = Math.max.apply(null, yData);
        //最小值
        var useMin = 0;

        var yTick = parseInt((useMax - useMin) / 3);
        var yMax = useMax;


        var result = {
            x_Tick: 1,
            y_Tick: yTick,
            y_Max: yMax + yTick,
            y_Min: useMin
        };

        return result;
    },

    // 生成样式配置
    getStyleOption: function () {
        // 趋势图样式配置
        var defaultOptions = {
            chart: {
                type: 'areaspline',
                backgroundColor: 'transparent',
            },
            credits: {
                enabled: false // 禁用版权信息
            },
            legend: {
                enabled: false
            },
            xAxis: {
                tickmarkPlacement: 'on',
                gridLineDashStyle: 'ShortDash',
                gridLineWidth: 0,
                gridLineColor: window.__dark_theme ? "rgba(120, 121, 122, 50%)" : "#E4E6E9",
                lineColor: window.__dark_theme ? "rgba(65, 66, 66, 50%)" : "#CBD3DD",
                lineWidth: 0,
                tickLength: 0,
                labels: {
                    style: {
                        color: window.__dark_theme ? "rgba(180, 182, 184, 50%)" : '#B2B2B2',
                    }
                },
            },
            yAxis: {
                tickAmount: 6,
                tickmarkPlacement: 'between',
                gridLineDashStyle: 'ShortDash',
                gridLineWidth: 1,
                gridLineColor: window.__dark_theme ? "rgba(120, 121, 122, 50%)" : "#F7F7F7",
                lineColor: window.__dark_theme ? "rgb(55, 56, 56)" : "#CBD3DD",
                lineWidth: 0,
                tickLength: 0,
                labels: {
                    style: {
                        color: window.__dark_theme ? "rgba(180, 182, 184, 50%)" : '#B2B2B2',
                    },
                },
                align: 'left',
                x: 4,
                y: 4,
                opposite: true
            },
            title: {
                text: ''
            },
            tooltip: {
                shape: 'circlepin',
                backgroundColor: "#3685DC",
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#3685DC',
                useHTML: true,
                shadow: false,
                stickyTracking: false,
                hideDelay: 0,
                animation: false,
                padding: 0,
                crosshairs: {
                    width: 1,
                    color: '#3685DC',
                    dashStyle: 'Solid'
                },
                style: {
                    color: '#B6CFEE',
                    fontFamily: '"Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", sans-serif',
                    'z-index': 10000
                }
            },
            plotOptions: {
                line: {
                    lineColor: '#2D78CB'
                },
                area: {
                    lineColor: "#2D78CB",
                    marker: {
                        fillColor: "#fff",
                        lineColor: "#2D78CB",
                        states: {
                            hover: {
                                fillColor: "#2D78CB"
                            }
                        }
                    },
                },
                series: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    marker: {
                        fillColor: '#2D78CB',
                        enabled: false,
                        radius: 2.6,
                        lineWidth: 0,
                        states: {
                            hover: {
                                fillColor: '#2D78CB',
                                lineWidth: 0
                            },
                            select: {
                                lineColor: null
                            }
                        }

                    },

                    fillColor: {
                        linearGradient: [0, 0, 0, 200],
                        stops: [
                            [0, 'rgba(76, 167, 254, .5)'],
                            [1, 'rgba(235, 245, 255, .1)']
                        ]
                    }

                }
            }
        }

        //mark pc端样式差异 -- start
        if (PLATFORM > 2) {
            defaultOptions = {
                chart: {
                    type: 'areaspline',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                credits: {
                    enabled: false // 禁用版权信息
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    gridLineDashStyle: 'ShortDash',
                    gridLineWidth: 0,
                    gridLineColor: "#E6E6E6",
                    lineColor: "#D9D9D9",
                    tickLength: 0,
                    labels: {}
                },
                yAxis: {
                    min: 0,
                    gridLineDashStyle: 'ShortDash',
                    gridLineWidth: 1,
                    gridLineColor: "#E6E6E6",
                    lineColor: "#D9D9D9",
                    tickAmount: 6,
                    title: '',
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                title: {
                    text: ''
                },
                tooltip: {
                    shape: 'circlepin',
                    backgroundColor: "#1478E6",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#1478E6',
                    useHTML: true,
                    shadow: false,
                    stickyTracking: false,
                    hideDelay: 0,
                    animation: false,
                    padding: 0,
                    crosshairs: {
                        width: 1,
                        color: '#1478E6',
                        dashStyle: 'Solid'
                    },
                    style: {
                        color: '#1478E6',
                        fontFamily: '"Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", sans-serif',
                        'z-index': 10000
                    }
                },
                plotOptions: {
                    area: {
                        lineColor: "#1478E6",

                        marker: {
                            fillColor: "#fff",
                            lineColor: "#1478E6",
                            states: {
                                hover: {
                                    fillColor: "#1478E6"
                                }
                            }
                        },
                    },
                    series: {
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 2
                            }
                        },
                        marker: {
                            radius: 2.6,
                            lineWidth: 0,
                            states: {
                                hover: {
                                    fillColor: '#1478E6',
                                    lineWidth: 0
                                },
                                select: {
                                    lineColor: null
                                }
                            },
                            enabled: false
                        },
                        fillColor: {
                            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                            stops: [
                                [0, "rgba(76,167,254, 0.4)"],
                                [1, "rgba(255, 255, 255, 0.2)"]
                            ]
                        },

                    }
                }
            }
        }

        // 首次进入无动画，更新才有动画
        defaultOptions.animation = FIRSTTIMESHOW ? 0 : 1000;
        //mark pc端样式差异 -- end

        return defaultOptions;
    },

    // 生成数据配置
    getConfigOption: function (listArry) {
        // 趋势图数据配置
        var chartOption = {
            xAxisArray: [],
            tickOption: [],
            initdata: listArry.y,
        }

        chartOption.tickOption = this.getTickOption(listArry.y);
        chartOption.xAxisArray = listArry.x;

        return chartOption;
    }

}

/* 主逻辑 */
var Analysis = {
    FilterType: 'chatNum',
    FilterDate: 'yesterday',
    TOUCHSTART: 'touchstart',
    PushStatus: false,


    init: function (listdata, generalInfo, filterInfo) {
        this.FilterDate = filterInfo.date || 'yesterday';
        this.FilterType = filterInfo.type || 'chatNum';

        // todo 是pc、mac增加选择器
        // PLATFORM = 3;
        if (PLATFORM > 2) {
            $('body').addClass('pc');
            this.TOUCHSTART = 'click';
            this.TAP = 'click';
        } else {
            $('body').removeClass('pc').addClass('ios');
            this.TOUCHSTART = 'touchstart';
            this.TAP = 'tap';
        }

        if (typeof IS_MANAGER !== 'undefined' && IS_MANAGER) {
            $(".show-when-member").remove();
        } else {
            $('.show-when-manager').remove();
        }

        // if (typeof IS_MANAGER !== 'undefined' && IS_MANAGER) {
        //     $(".show-when-member").remove();
        // } else {
        //     $('.show-when-member').remove();
        // }

        if (!(typeof IS_ADMIN_FOR_PUSH !== 'undefined' && IS_ADMIN_FOR_PUSH)) {
            $(".show_when_btn").remove();
        }

        this.renderGeneralInfo(generalInfo);
        this.renderFilter(filterInfo);
        this.renderHighChart(listdata, filterInfo);
        this.bindEvent();

        setTimeout(function () {
            $('body').css(' visibility', 'visible');
        }, 0);
    },

    initDailyPush: function (dailyPushStatus) {
        var self = this;
        this.PushStatus = dailyPushStatus;
        if (this.PushStatus) {
            $('.contact_open_status').show();
            $('.contact_close_status').hide();
        } else {
            $('.contact_open_status').hide();
            $('.contact_close_status').show();
        }

        $('.js_push_btn').off('click');
        // 推送开关的事件绑定
        $('.js_push_btn').on('click',function (e) {
            self.PushStatus = !self.PushStatus;
            if (self.PushStatus) {
                $('.contact_open_status').show();
                $('.contact_close_status').hide();
            } else {
                $('.contact_open_status').hide();
                $('.contact_close_status').show();
            }
            self.onUpPushStatus(e);
        })

        $('.js_show_example').off('click');
        // 收起示例事件的绑定
        $('.js_show_example').on('click', function (e) {
            if ($('.example_container').css('display') === 'none') {
                $('.example_container').show()
                $('.show_sample_one').hide()
                $('.show_sample_two').show()
            } else {
                $('.example_container').hide()
                $('.show_sample_one').show()
                $('.show_sample_two').hide()
            }
            self.resizeFooter();
        })
    },
    // upDataForDailyPushStatus
    onUpPushStatus: function (e) {
        var self = this;
        var filterScheme = '';

        filterScheme = 'wxwork://jump?target=member_analysis_set_top_rank_switch&open=' + self.PushStatus;
        // if (self.autoClick) filterScheme += '&auto=true';
        if (!DEBUG.getQueryVariable('debug')) location.href = filterScheme;
        console.log(filterScheme);
        // self.autoClick = false;
    },

    // 绑定事件
    bindEvent: function () {
        var self = this;

        $('.js-filter-type').off(self.TOUCHSTART);

        $('.js-filter-type').on(self.TOUCHSTART, function (e) {
            self.FilterType = $(e.currentTarget).data('name');
            $('.js-filter-type').removeClass('current');
            $(e.currentTarget).addClass('current');
            self.onUpFilter(e);
        });

        $('.js-filter-date').off(self.TOUCHSTART);

        $('.js-filter-date').on(self.TOUCHSTART, function (e) {
            self.FilterDate = $(e.currentTarget).data('date');
            $('.js-filter-date').removeClass('current');
            $(e.currentTarget).addClass('current');

            if (self.FilterDate == 'other') {
                var filterScheme = 'wxwork://jump?target=member_analysis_filter_datePicker';
                location.href = filterScheme;
            }
            else {
                self.onUpFilter(e);
            }

        });

        $('.js-party-wrap').off(self.TAP);
        $('.js-party-wrap').on(self.TAP, function (e) {
            e.stopPropagation();
            self.onPartyPicker();
        });

        $('.js_tab_click').off(self.TOUCHSTART);
        $('.js_tab_click').on(self.TOUCHSTART, function (e) {
            if (self.tabClicking) return;
            self.tabClicking = true;
            var $target = $(e.currentTarget);
            var tab = $target.attr('name');
            if (e.cancelable) e.preventDefault();
            $('.js_tab').removeClass('analysisFilter_item_Current');
            var targetTab = '.js_' + tab;
            var targetSec = '.js_secTable_' + tab;
            $(targetTab).addClass('analysisFilter_item_Current');

            // 点击第一个子 card
            // console.log($(targetTab).find('.js-filter-type'))
            // $(targetSec).find('.js-filter-type').first().css('background', 'red')
            self.autoClick = true;
            $(targetSec).find('.js-filter-type').first().trigger(self.TOUCHSTART);
            $('.js_secTable').addClass('util_d_n');
            $(targetSec).removeClass('util_d_n');
            self.resizeFooter();
            setTimeout(function(){
                self.tabClicking = false;
            }, 0)
        });

        if (!self.isNotFirst) {
            // hashChangeEvent();
            setTimeout(function () {
                self.autoClick = true;
                $('.js_secTable_tabAddCustomer .js-filter-type').first().trigger(self.TOUCHSTART);
            }, 0)
        }

        self.isNotFirst = true;

        self.resizeFooter();
    },

    resizeFooter: function () {
        // 屏幕溢出
        if ($(('.js_wrap')).height() + 60 + 34 > window.innerHeight) {
            $('.js_analysis_desc').removeClass('analysis_desc_Fixed');
        } else {
            $('.js_analysis_desc').addClass('analysis_desc_Fixed');
        }
    },
    // 渲染概况
    renderGeneralInfo: function (generalInfo) {
        if (!generalInfo) {
            return;
        }

        $.each(generalInfo, function (key, item) {
            var value = item;
            if (key.toLowerCase() == 'hongbao_money') {
                value = value + '';
                // 特殊处理 w 以上的数据
                if (value.length > 7) {
                    value = value.substring(0, value.length - 4);
                    value = (+value / 100).toFixed(2);
                    value = value + 'w'
                } else {
                    value = (+value / 100).toFixed(2);
                }
            }

            value = basetool.formatNum(value + '');
            $('.js-filter-type[data-name=' + key + ']').find('.analysisSection_card_subTitle label').text(value);
            $('.js-filter-type[data-name=' + key + ']').find('.analysisSection_card_subTitle sub').show();

            if (value == '--' && (key.toLowerCase() == 'replyper' || key.toLowerCase() == 'firstreplytime')) {
                $('.js-filter-type[data-name=' + key + ']').find('.analysisSection_card_subTitle sub').hide();
            }
        });

        $('.js-analysis-title').text();

        // 红包灰度标志位
        if (!HONGBAOFLAG || HONGBAOFLAG == false) {
            $('.js_hongbao_type').hide();
        } else {
            if (PLATFORM > 2) $('.js_analysisContent').css('top', '286px');
        }
    },

    // 渲染概况图表
    renderHighChart: function (listdata, filterInfo) {

        if (!listdata || listdata.length <= 0) {
            this.renderHighChartEmpty();
            return;
        }

        var unit = '';

        var listArry = {
            x: [],
            y: [],
            tipsArry: []
        }

        if (filterInfo && filterInfo.type) {
            if (filterInfo.type == 'replyPer') {
                unit = '%';
            }
            if (filterInfo.type == 'firstReplyTime') {
                unit = language['minute'];
            }
            if (filterInfo.type == 'hongbao_money' || filterInfo.type == 'room_hongbao_money') {
                unit = language['yuan'];
            }
        }

        $.each(listdata, function (key, item) {
            listArry.x.push(basetool.formatDate((item.date - 0) * 1000, '%M-%d'));
            listArry.y.push(item.total < 0 ? 0 : item.total);
            if (filterInfo.type == 'hongbao_money' || filterInfo.type == 'room_hongbao_money') {
                var xx = item.total < 0 ? '0' : '' + (+item.total / 100).toFixed(2) + unit;
                listArry.tipsArry.push(xx);
            } else {
                listArry.tipsArry.push(item.total < 0 ? '--' : item.total + unit);
            }
        });

        var tipsWording = $('.js-analysis-title').text();
        initHighChart.initChart(listArry, tipsWording);
    },

    // todo 数据为空的渲染 -- 待设计
    renderHighChartEmpty: function () {
        $('#use_analysis_container').html('<p class="use_analysis_container_empty js-use-analysis-container-empty">' + language['empty'] + '</p>');
        $('.js-use-analysis-container-empty').show();
    },

    // 渲染过滤数据
    renderFilter: function (filterInfo) {
        if (!filterInfo) {
            return;
        }

        $('.js-filter-date').removeClass('current');
        $('.js-filter-type').removeClass('current');

        $('.js-filter-type[data-name=' + filterInfo.type + ']').addClass('current');
        $('.js-analysis-title').text($('.js-filter-type[data-name=' + filterInfo.type + ']').find('.analysisSection_card_title').text());

        // 如果是字符串，则为自定义日期
        if (filterInfo.date != 'yesterday' && filterInfo.date != 'week' && filterInfo.date != 'month') {
            var dateStr;
            try {
                dateStr = decodeURI(filterInfo.date);
            } catch (e) {
                dateStr = filterInfo.date;
            }

            $('.js-filter-date[data-date=other]').addClass('current');
            if (PLATFORM < 3) {
                $('.js-filter-date[data-date=other] label').text(dateStr);
            } else {
                $('.js-filter-date[data-date=other]').text(dateStr);
            }
        } else {
            $('.js-filter-date[data-date=' + filterInfo.date + ']').addClass('current');

            if (PLATFORM < 3) {
                $('.js-filter-date[data-date=other] label').text(language['other']);
            } else {
                $('.js-filter-date[data-date=other]').text(language['other']);

            }
        }

        // 处理组织名
        if (filterInfo.partyName) {
            filterInfo.partyName = filterInfo.partyName.split(',');
            $('.js-party-title').text(filterInfo.partyName.toString());
        }

        if (filterInfo.partyNameHiglight == 'true') {
            $('.js-party-wrap').addClass('highlight');
        } else {
            $('.js-party-wrap').removeClass('highlight');
        }
    },

    //
    onUpFilter: function (e) {
        var self = this;
        var filterScheme = '';

        filterScheme = 'wxwork://jump?target=member_analysis_filter&type=' + self.FilterType + '&date=' + self.FilterDate;
        if (self.autoClick) filterScheme += '&auto=true';
        if (!DEBUG.getQueryVariable('debug')) location.href = filterScheme;
        console.log(filterScheme);
        self.autoClick = false;
    },

    // 选人组件
    onPartyPicker: function () {
        location.href = 'wxwork://jump?target=member_analysis_filter_partyPicker';
    },
}

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * @param
     *  面板数据
     var listdata = [{date:'',total:''}]

     var generalInfo = {
        chatNum: '',//聊天总数
        sendMsgNum: '',//成员发送消息数
        replyPer: '',//聊天回复比例,
        firstReplyTime: '',//平均首次回复时长
        feedbackNum: '' //负面反馈数
        }

     var filterInfo = {type:'',date:''}
     */

    upDataForClient: function (content) {
        console.log(content);
        FIRSTTIMESHOW = false;
        try {
            content = JSON.parse(content);
        } catch (e) {
            content = content;
        }

        if (content) {
            Analysis.init(content.listdata, content.generalInfo, content.filterInfo);
        }
    },
    upDataForDailyPushStatus: function (content) {
        console.log(content);
        var flag = (content + '') === '1'
        Analysis.initDailyPush(flag);
    }
}

/* 初始化 */
var mainFunc = {
    init: function () {

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData(20);
            Analysis.init(debugInfo.listdata, debugInfo.generalInfo, debugInfo.filterInfo);
            Analysis.initDailyPush(debugInfo.DailyPushStatus);
        } else {
            if (CONTENT) {
                Analysis.init(CONTENT.listdata, CONTENT.generalInfo, CONTENT.filterInfo);
            }
            if ((typeof IS_MANAGER !== 'undefined' && IS_MANAGER) && (typeof IS_ADMIN_FOR_PUSH !== 'undefined' && IS_ADMIN_FOR_PUSH)) {
                Analysis.initDailyPush(DAILY_PUSH_STATUS);
            }
            // Analysis.initDailyPush(DAILY_PUSH_STATUS);
            console.log(CONTENT);
        }
    }
};
mainFunc.init();

//todo debug开关
// initDebug();
