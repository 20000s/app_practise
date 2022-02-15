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

        if(num-0<0){
            return '--';
        }

        var arr = [],
            str = num + '',
            count = str.length;

        while (count >= 3) {
            arr.unshift(str.slice(count - 3, count));
            count -= 3;
        }

        // 如果是不是3的倍数就另外追加到上去
        str.length % 3 && arr.unshift(str.slice(0, str.length % 3));

        return arr.toString();
    },
    formatDate: function (time, p) {
        var date = new Date(time);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var yesterday = today - 1000 * 60 * 60 * 24;//当前日期时间戳减去一天时间戳

        if (today.getTime() == time) {
            return language['today'];
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
    },
    UtilsortBy : function (name) {
        /* eslint-disable */
        return function (o, p) {
            var a,
                b;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }

            throw 'error';

        };
        /* eslint-enable */
    },
    isWeek :function (time) {
        var input = new Date(time * 1000);
        return Math.abs(input - new Date()) < 7 * 24 * 3600 * 1000;
    },
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
    genDebugData: function () {
        var debugInfo = {
            'title': '商品趋势',
            'timeRange': [{
                name: '近7日',
                count: 7
            },{
                name: '近15日',
                count: 15
            }, {
                name: '近30日',
                count: 30
            }],
            'chartCategory': [{
                name: "sharecnt",
                text: "商品曝光件数",
                unit: '件'
            }, {
                name: "viewtime",
                text: "商品浏览次数",
                unit: '次'
            }, {
                name: "salescnt",
                text: "商品售卖件数",
                unit: '件'
            }, {
                name: "salesmoney",
                text: "商品售卖金额",
                unit: '元'
            }],
            'chartData': [],
            'platform': '',
        };

        var createNum = function () {
            var number = Math.random();
            number.toFixed(1);
            number = parseInt(number * 10);
            return number;
        }

        var date = new Date();
        date.setHours(0, 0, 0, 0);
        for (var i = 0; i < 30; i++) {
            debugInfo.chartData.push({
                timestamp: date / 1000,
                data: {
                    sharecnt: createNum(),
                    viewtime: createNum(),
                    salescnt: createNum(),
                    salesmoney: createNum(),
                }
            });
            date.setDate(date.getDate() - 1);
        }

        return debugInfo;
    },
};

var FIRSTTIMESHOW = true;

var initHighChart = {

    initChart: function (listArry, name, unit) {
        var self = this;

        // 生成样式及数据配置
        var styleOption = self.getStyleOption();

        // 如果是大于7天的数据则生成截取 -- start
        if (listArry.date.length > 7) {
            var number = listArry.date.length - 1;
            var tickPositionsArry = [number];
            var count = Math.ceil(listArry.date.length / 7);

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

        self.renderChart(option, listArry, name, unit);
    },

    renderChart: function (option, listArry, name, unit) {
        var self = this;

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
                tickInterval: option.tickOption.y_Tick,
                title: '',
                labels: {
                    formatter: function () {
                        return this.value + (unit || '');
                    }
                }
            },

            tooltip: {
                positioner: function (x, y, point) {
                    var x = point.plotX;
                    if (point.plotX + self.theChart.tooltip.label.width + tooltipWidth > window.innerWidth) {
                        x = window.innerWidth - self.theChart.tooltip.label.width - tooltipWidth;
                    }

                    return {
                        x: x,
                        y: 0
                    }
                },
                formatter: function (data) {
                    return '<div class="log_chartPanel" id="log_chartPanel">'
                        + '<div class="log_chartPanel_item log_chartPanel_item_dateWrap"><div class="log_chartPanel_item_date">'
                        + listArry.date[this.point.index]
                        + '</div></div>'
                        + '<div class="log_chartPanel_item log_chartPanel_item_Use"><div class="log_chartPanel_item_label">' + (name || '') + '</div><div class="log_chartPanel_item_value">'
                        + self.numToFixed(listArry.total[this.point.index]) + (unit || '')
                        + '</div></div><div class="log_chartPanel_item "></div></div>'
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
                            // console.log(e);
                        }
                    }
                },
            }
        };

        var option = $.extend(true, configOption, option);

        self.theChart = new Highcharts.Chart(option);

        console.log('renderChart');
    },

    numToFixed: function(num) {
        if (this.isFloat(num)) {
            return num.toFixed(2);
        } else {
            return num;
        }
    },

    isFloat: function(num){
        return (num + '').indexOf('.') !== -1
    },
    isAllInt: function (arr){
        for (var i = 0;i<arr.length-1;i++) {
            if(this.isFloat(arr[i])) {
                return false;
            }
        }
        return true;
    },

    // 区间计算
    getTickOption: function (yData) {
        //最大值
        var useMax = Math.max.apply(null, yData);
        //最小值
        var useMin = 0;

        var yTick = Number(((useMax - useMin) / 3).toFixed(2));
        var yMax = useMax;

        // 只有小于1的情况才保留小数
        if (yTick >= 1) {
            yTick = parseInt(yTick);
        } else if (this.isAllInt(yData)) {
            yTick = 1;
        }

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
                backgroundColor: 'transparent'
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
                allowDecimals: false,
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
                    }
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
                    allowDecimals: false,
                    min: 0,
                    gridLineDashStyle: 'ShortDash',
                    gridLineWidth: 1,
                    gridLineColor: "#E6E6E6",
                    lineColor: "#D9D9D9",
                    tickAmount: 5,
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
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
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
            initdata: listArry.total,
        }

        chartOption.tickOption = this.getTickOption(listArry.total);
        chartOption.xAxisArray = listArry.date;

        return chartOption;
    },

    // 隐藏tip
    hideToolTip:function () {
        var self = this;

        if(!self.theChart){
            return;
        }

        self.theChart.tooltip.hide();
        self.theChart.xAxis[0].hideCrosshair();
        self.theChart.xAxis[0].series[0].points.forEach(function (point) {
            point.setState('');
        });
        self.theChart.xAxis[0].removePlotLine('plot-line-1');
    }

};

/* 主逻辑 */
var Analysis = {

    init: function (data) {
        console.log('Analysis Data: ', data);
        var self = this;

        // 设置标题
        // $('#js-title').text(data.title);

        // 设置范围筛选器
        var timeRangeHtml = [];
        (data.timeRange || []).forEach(function (item, idx) {
            timeRangeHtml.push('<li data-date="', item.count, '"');
            timeRangeHtml.push('class="ww_horizontalTab_Nav_item ', idx === 0 ? ' ww_horizontalTab_Nav_item_left ' : '', idx === (data.timeRange.length - 1) ? ' ww_horizontalTab_Nav_item_right ww_horizontalTab_Nav_item_Curr ' : '', '"')
            timeRangeHtml.push('>');
            timeRangeHtml.push('<a href="javascript:;" class="ww_horizontalTab_Nav_itemLink">', item.name, '</a>')
            timeRangeHtml.push('</li>');
        });
        $('#js-timeRange').html(timeRangeHtml.join(''));

        // // 设置图表项目
        // var categoryHtml = [];
        // (data.chartCategory || []).forEach(function (item, idx) {
        //     categoryHtml.push('<li data-prop-name="', item.name, '">', item.text, '</li>');
        // });
        // $('#js-category-option').html(categoryHtml.join(''))

        // 排序
        data.chartData = data.chartData.sort(basetool.UtilsortBy('timestamp'));


        // todo 是pc、mac增加选择器
        // PLATFORM = 2;
        if (PLATFORM > 2) {
            $('body').addClass('pc');
            this.TOUCHSTART = 'click';
            this.TAP = 'click';
        } else {
            $('body').removeClass('pc').addClass('ios');
            this.TOUCHSTART = 'touchstart';
            this.TAP = 'tap';

            if(/(Android)/i.test(navigator.userAgent)) {
                $('body').addClass('adr');
            }
        }

        this.chartData = data.chartData || [];
        this.chartCategory = data.chartCategory || [];
        this.currentChartCategory = this.chartCategory[0];

        // 事件
        this.bindEvent();

        // 第一次渲染
        this.renderPage();

        /*
        $(".highcharts-tooltip").on("touchmove", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        */

        setTimeout(function () {
            $('body').css(' visibility', 'visible');
        }, 0);
    },

    bindEvent:function () {
        var self = this;

        $('.ww_horizontalTab_Nav_item').on(self.TAP,function (e) {
            FIRSTTIMESHOW  = false;
            var $target = $(e.currentTarget);
            $('.ww_horizontalTab_Nav_item').removeClass('ww_horizontalTab_Nav_item_Curr');
            $target.addClass('ww_horizontalTab_Nav_item_Curr');
            self.renderPage();
        });

        var $categoryCurrent = $('#js-category-current');
        // var $categoryOption = $('#js-category-option');
        // $('body').on('click', function (){
        //     $categoryOption.hide();
        // });
        $categoryCurrent.on(self.TAP, function (e) {
            // e.stopPropagation();
            // $categoryOption.toggle();
            // 使用native的弹窗 结果在 JSAPI.upDataForClient 中获取
            location.href = 'wxwork://action?target=sharecnt&data=' + encodeURIComponent(JSON.stringify(self.chartCategory));
        });
        // $categoryOption.on(self.TAP,  'li', function (e) {
        //     var $this = $(e.target);
        //     var propName = $this.data('propName');
        //     $categoryCurrent.text($this.text());
        //     $categoryCurrent.data('propName', propName);
        //     self.renderPage();
        // });

    },

    getDataWithTimeRange: function (list, timeRange) {
        if (timeRange && !isNaN(timeRange) && list.length > timeRange) {
            return list.slice(list.length - timeRange, list.length);
        }

        return list;
    },

    refreshWithFilter: function (filter) {
        const item = this.chartCategory.find(function (item){
            return  item.name === filter;
        });

        if(item) {
            this.currentChartCategory = item;
            this.renderPage();
        }
    },

    renderPage: function () {
        if (!this.currentChartCategory) {
            return;
        }

        // 获取分类数据
        var $categoryCurrent = $('#js-category-current');
        var categoryItem = this.currentChartCategory;

        var timeRange = $('#js-timeRange').find('.ww_horizontalTab_Nav_item_Curr').data('date');
        // 折线图数据
        var listData = this.chartData.map(function (item) {
            return {
                total: item.data[categoryItem.name] || 0,
                timestamp: item.timestamp
            }
        })

        $categoryCurrent.text(categoryItem.text);
        this.renderHighChart(this.getDataWithTimeRange(listData, timeRange), categoryItem.text, categoryItem.unit);
    },

    // 渲染概况图表
    renderHighChart: function (listdata, name, unit) {
        var listArry = {
            date: [],
            total: []
        };

        $.each(listdata, function (key, item) {
            listArry.date.push(basetool.formatDate((item.timestamp - 0) * 1000, '%M.%d'));
            listArry.total.push(item.total);
        });

        initHighChart.initChart(listArry, name, unit);
    },

};

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * @param
     *  面板数据
     */
    upDataForClient: function (content) {
        console.log('JSAPI.upDataForClient: ', content);
        Analysis.refreshWithFilter(content);
    },

    /**
     * 隐藏趋势图的tips
     * @param bool
     */
    hideTooltip:function (bool) {

        if(bool){
            initHighChart.hideToolTip();
        }
    }

};

/* 初始化 */
var mainFunc = {
    init: function () {

        if (DEBUG.getQueryVariable('debug')) {
            var debugInfo = DEBUG.genDebugData();
            // debugInfo = {"chartCategory":[{"name":"sharecnt","text":"商品曝光件数","unit":"件"},{"name":"viewtime","text":"商品浏览次数","unit":"次"},{"name":"salescnt","text":"商品已售次数","unit":"次"},{"name":"salesmoney","text":"商品已售金额","unit":"元"},{"name":"sharetime","text":"商品分享次数","unit":"次"}],"chartData":[{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595260800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595347200},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595433600},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595520000},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595606400},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595692800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595779200},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595865600},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1595952000},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596038400},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596124800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596211200},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596297600},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596384000},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596470400},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596556800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596643200},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596729600},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596816000},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596902400},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1596988800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1597075200},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":0,"viewtime":0},"timestamp":1597161600},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":1,"sharetime":4,"viewtime":213},"timestamp":1597248000},{"data":{"salescnt":3,"salesmoney":0.03,"sharecnt":10,"sharetime":202,"viewtime":535},"timestamp":1597334400},{"data":{"salescnt":4,"salesmoney":0.05,"sharecnt":9,"sharetime":66,"viewtime":208},"timestamp":1597420800},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":0,"sharetime":2,"viewtime":0},"timestamp":1597507200},{"data":{"salescnt":4,"salesmoney":0.05,"sharecnt":12,"sharetime":122,"viewtime":66},"timestamp":1597593600},{"data":{"salescnt":5,"salesmoney":0.05,"sharecnt":13,"sharetime":37,"viewtime":158},"timestamp":1597680000},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":3,"sharetime":9,"viewtime":71},"timestamp":1597766400},{"data":{"salescnt":0,"salesmoney":0.0,"sharecnt":5,"sharetime":1,"viewtime":16},"timestamp":1597852800}],"timeRange":[{"count":7,"name":"近7日"},{"count":30,"name":"近30日"}],"title":"商品趋势"}
            Analysis.init(debugInfo);
            // JSAPI.upDataForClient('salesmoney')
        } else {
            if (CONTENT) {
                Analysis.init(CONTENT);
            }
            console.log('CONTENT: ', CONTENT);
        }

    }
};
mainFunc.init();

//todo debug开关
// initDebug();
