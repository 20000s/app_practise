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

/* 时间格式化方法 */ // todo del
var basetool = {
    formatNum: function (num) {

        if (num - 0 < 0) {
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

        // if (today.getTime() == time) {
        //     return language['today'];
        // }

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
    UtilsortBy: function (name) {
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
    isWeek: function (time) {
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
    // todo del
    genDebugData: function (num) {
        var debugInfo = {
            'listdata': [],
            'platform': '',
        };

        var date = new Date();
        date.setHours(0, 0, 0, 0);
        for (var i = 0; i < 30; i++) {
            var number = Math.random();
            number.toFixed(1);
            number = parseInt(number * 10);

            var item = {
                "total": number * 2,
                "amplitude": number,
                "timestamp": date / 1000
            };

            debugInfo.listdata.push(item);
            date.setDate(date.getDate() - 1);
        };

        return debugInfo;
    },
};

var FIRSTTIMESHOW = true;

var initHighChart = {

    initChart: function (listArry, extraArry) {
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


        self.renderChart(option, listArry);
    },

    renderChart: function (option, listArry) {

        var self = this;

        var tooltipWidth = PLATFORM > 2 ? 30 : 60;

        var allConfig = Analysis.allConfig || {
            map: {}
        };

        var configOption = {
            chart: {
                renderTo: 'chartkit_container',
            },
            xAxis: {
                categories: option.xAxisArray,
            },
            yAxis: {
                max: option.tickOption.y_Max,
                min: option.tickOption.y_Min,
                title: '',
                labels: {
                    formatter: function () {
                        return this.value;
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
                    var incHtml = allConfig.map.inc ? '<div class="chartkit_chartPanel_item_label">' + allConfig.map.inc + '</div><div' +
                        ' class="chartkit_chartPanel_item_value">'
                        + listArry.amplitude[this.point.index]
                        + '</div>': '';
                    return '<div class="chartkit_chartPanel" id="chartkit_chartPanel">'
                        + '<div class="chartkit_chartPanel_item chartkit_chartPanel_item_dateWrap"><div class="chartkit_chartPanel_item_date">'
                        + listArry.date[this.point.index]
                        + '</div></div>'
                        + '<div class="chartkit_chartPanel_item chartkit_chartPanel_item_Use">' + incHtml +
                        '</div><div class="chartkit_chartPanel_item "><div class="chartkit_chartPanel_item_label">' + allConfig.map.y + '</div><div class="chartkit_chartPanel_item_value">'
                        + listArry.total[this.point.index]
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
                gridLineColor: "#E4E6E9",
                lineColor: "#CBD3DD",
                lineWidth: 0,
                tickLength: 0,
                labels: {
                    style: {
                        color: '#B2B2B2',
                    }
                },
            },
            yAxis: {
                allowDecimals: false,
                tickAmount: 6,
                tickmarkPlacement: 'between',
                gridLineDashStyle: 'ShortDash',
                gridLineWidth: 1,
                gridLineColor: "#F7F7F7",
                lineColor: "#CBD3DD",
                lineWidth: 0,
                tickLength: 0,
                labels: {
                    style: {
                        color: '#B2B2B2',
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

        if (Analysis && Analysis.allConfig && Analysis.allConfig.highcharts) {
            defaultOptions = $.extend({}, defaultOptions, Analysis.allConfig.highcharts)
        }

        return defaultOptions;
    },

    // 生成数据配置
    getConfigOption: function (listArry) {
        // 趋势图数据配置
        var chartOption = {
            xAxisArray: [],
            tickOption: [],
            initdata: listArry.amplitude,
        }

        chartOption.tickOption = this.getTickOption(listArry.amplitude);
        chartOption.xAxisArray = listArry.date;

        return chartOption;
    },

    // 隐藏tip
    hideToolTip: function () {
        var self = this;

        if (!self.theChart) {
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
    // todo del
    init: function (listdata) {
        var self = this;

        if (PLATFORM > 2) {
            $('body').addClass('pc');
            this.TOUCHSTART = 'click';
            this.TAP = 'click';
        } else {
            $('body').removeClass('pc').addClass('ios');
            this.TOUCHSTART = 'touchstart';
            this.TAP = 'tap';
        }

        self.listdata = listdata.sort(basetool.UtilsortBy('timestamp'));

        this.bindEvent();

        //mark 初始化本周数据

        $('.ww_horizontalTab_Nav_item').removeClass('ww_horizontalTab_Nav_item_Curr');
        $('.ww_horizontalTab_Nav_item_left').addClass('ww_horizontalTab_Nav_item_Curr');

        this.renderHighChart(self.getWeekData(self.listdata));

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

    init2: function (listArray, allConfig) {
        var self = this;

        if (PLATFORM > 2) {
            $('body').addClass('pc');
            this.TOUCHSTART = 'click';
            this.TAP = 'click';
        } else {
            $('body').removeClass('pc').addClass('ios');
            this.TOUCHSTART = 'touchstart';
            this.TAP = 'tap';
        }

        self.listArray = listArray;
        self.allConfig = allConfig;

        this.bindEvent();

        //mark 初始化本周数据
        $('.ww_horizontalTab_Nav_item').removeClass('ww_horizontalTab_Nav_item_Curr');
        $('.ww_horizontalTab_Nav_item_left').addClass('ww_horizontalTab_Nav_item_Curr');

        initHighChart.initChart(listArray);

        setTimeout(function () {
            $('body').css(' visibility', 'visible');
        }, 0);
    },

    bindEvent: function () {
        var self = this;

        $('.ww_horizontalTab_Nav_item').on(self.TAP, function (e) {
            FIRSTTIMESHOW = false;
            var $target = $(e.currentTarget);
            $('.ww_horizontalTab_Nav_item').removeClass('ww_horizontalTab_Nav_item_Curr');
            $target.addClass('ww_horizontalTab_Nav_item_Curr');
            self.onUpListData($target.data('date'));
        });

    },

    onUpListData: function (range) {
        var self = this;
        // console.log(range);

        if (range == 'week') {
            this.renderHighChart(self.getWeekData(self.listdata));
        } else {
            this.renderHighChart(self.listdata);
        }

    },
    // todo del
    getWeekData: function (data) {
        var weekList = [];

        if (data.length > 7) {
            weekList = data.slice(data.length - 7, data.length);
        }
        /*
       $.each(data, function (index, item) {
           if(index >= 24){
               weekList.push(item);
           }
           // 遍历出最近七天的数据
           if (basetool.isWeek(item.timestamp)) {
               weekList.push(item);
           }
        });
        */

        return weekList;
    },

    // 渲染概况图表
    renderHighChart: function (listdata) {
        var unit = '';

        var listArry = {
            date: [],
            amplitude: [],
            total: []
        };

        $.each(listdata, function (key, item) {
            listArry.date.push(basetool.formatDate((item.timestamp - 0) * 1000, '%M.%d'));
            listArry.amplitude.push(item.amplitude);
            listArry.total.push(item.total);
        });

        console.log(listArry, 'listArry')

        initHighChart.initChart(listArry);
    },

    // initChart: function (listArray) {
    //     initHighChart.initChart(listArray);
    // }

};

/* 为客户端提供的调用方法 */
var JSAPI = {

    /**
     * @param
     *  面板数据
     var listdata = [{date:'',total:'',amplitude:''}]
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
            Analysis.init(content.listdata);
        }
    },

    /**
     * 隐藏趋势图的tips
     * @param bool
     */
    hideTooltip: function (bool) {

        if (bool) {
            initHighChart.hideToolTip();
        }
    }

};

/* 初始化 */
var mainFunc = {
    init: function () {
        if (DEBUG.getQueryVariable('debug')) {
            // var debugInfo = DEBUG.genDebugData(20);
            var debugContent = {
                x: ['10.26', '10.27', '10.28', '10.29', '10.30', '11.01', '今日'], // x 轴
                y: [6, 14, 14, 8, 16, 16, 10],
                inc: [3, 7, 7, 4, 8, 8, 5],
                map: {
                    x: '日期',
                    y: '总数',
                    inc: '新增', // 设置为 false 则不显示
                },
                // highcharts: {
                //     tooltip: {
                //         shape: 'circlepin',
                //         backgroundColor: "#000",
                //         borderWidth: 1,
                //         borderRadius: 4,
                //         borderColor: '#000',
                //         useHTML: true,
                //         shadow: false,
                //         stickyTracking: false,
                //         hideDelay: 0,
                //         animation: false,
                //         padding: 0,
                //         crosshairs: {
                //             width: 1,
                //             color: '#000',
                //             dashStyle: 'Solid'
                //         },
                //         style: {
                //             color: '#000',
                //             fontFamily: '"Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", sans-serif',
                //             'z-index': 10000
                //         }
                //     },
                // }
            };

            // Analysis.init(debugInfo.listdata);
            Analysis.init2({
                amplitude: debugContent.inc,
                date: debugContent.x,
                total: debugContent.y,
            }, debugContent)
        } else {
            if (CONTENT) {
                Analysis.init2(CONTENT);
            }
            console.log(CONTENT);
        }

    }
};
mainFunc.init();



//todo debug开关
// initDebug();