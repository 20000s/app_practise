/**
 * Created by jesusxiong on 2020/8/7
 * 双列表 左边固定，右边滚动
 */

var Safe = {
    /**
     * 过滤URL脚本，目前此方法已经废弃，可以直接使用 $.filterScript 代替
     * @method filterScript
     * @param str 字符串
     * @return {String} 进行XSS过滤后的字符串
     */
    filterScript: function (str) {
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
    outputSafeContent: function (str) {
        return str.replace('&', '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;');
    },
    /**
     * @function unescapeHTML 还原html脚本 < > & " '
     * @param a -
     *            字符串
     */
    unescapeHTML: function (a) {
        a = '' + a;
        return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    }
};

function Table(options) {
    this.options = options;
    this.leftHeadTable = this.options.leftTableConfig.tableSelector.find('.hd-table');
    this.leftContentTable = this.options.leftTableConfig.tableSelector.find('.bd-table');
    this.rightHeadTable = this.options.rightTableConfig.tableSelector.find('.hd-table');
    this.rightContentTable = this.options.rightTableConfig.tableSelector.find('.bd-table');

    this._buildTable();
    this._bindEvent();
}

Table.prototype.Safe = Safe;

Table.prototype.reloadData = function (list) {
    this.leftContentTable.empty();
    this.rightContentTable.empty();
    this.appendData(list);
}

Table.prototype.appendData = function (list) {
    var self = this,
        leftTable = [],
        rightTable = [];

    list.map(function (item, idx) {
        leftTable.push(self._buildTableBD(self.options.leftTableConfig, item, idx));
        rightTable.push(self._buildTableBD(self.options.rightTableConfig, item, idx));
    });

    this.leftContentTable.append(leftTable.join(''));
    this.rightContentTable.append(rightTable.join(''));
}

Table.prototype._bindEvent = function () {
    var self = this;
    var sortFunction = function (e) {
        var $target = $(e.currentTarget);
        var name = $target.data('name');
        var $arrow = $target.find('.arrow');
        var sortType;

        if ($arrow.css('visibility') === 'hidden') {
            sortType = 'down';
        } else {
            sortType = $arrow.hasClass('arrow_down') ? 'up' : 'down';
        }

        self.leftHeadTable.find('.arrow').css('visibility', 'hidden');
        self.rightHeadTable.find('.arrow').css('visibility', 'hidden');
        $arrow.toggleClass('arrow_up', sortType === 'up').toggleClass('arrow_down', sortType !== 'up');
        $arrow.css('visibility', 'visible');

        self.options.sortChange && self.options.sortChange(sortType, name);
    }
    this.leftHeadTable.on(this.options.tapEventName, '.table_header_sort', sortFunction);
    this.rightHeadTable.on(this.options.tapEventName, '.table_header_sort', sortFunction);
}

// 更新右侧表格的宽度
Table.prototype.resetRightTableSize = function (containerWidth) {
    var $rightTable = this.options.rightTableConfig.tableSelector;
    var $leftTable = this.options.leftTableConfig.tableSelector;

    if (!containerWidth) {
        containerWidth = document.documentElement.clientWidth;
    }

    $rightTable.css('width', containerWidth - $leftTable.width() - 2 + "px");
}

// 处理表头
Table.prototype._buildTable = function () {
    // 初始化表头
    this.leftHeadTable.append(this._buildTableHD(this.options.leftTableConfig));
    this.rightHeadTable.append(this._buildTableHD(this.options.rightTableConfig));
}

// render table head
Table.prototype._buildTableHD = function (tableConfig) {
    var row = tableConfig.config.map(function (item, idx) {
        var thHtml = [];
        thHtml.push('<th class="col_', idx, item.sort ? ' table_header_sort ' : '', '" data-name="', item.dataIndex, '">')
        thHtml.push('<span>', item.title, '</span>');
        if (item.sort) {
            thHtml.push('<i class="arrow arrow_down arrow_small"></i>')
        }
        thHtml.push('</th>')
        return thHtml.join('');
    });

    return '<tr>' + row.join('') + '</tr>';
}

// render table content
Table.prototype._buildTableBD = function (tableConfig, rowData, rowIdx) {
    var row = tableConfig.config.map(function (item, idx) {
        var thHtml = [];
        thHtml.push('<td class="col_', idx,' ',item.extClass || '',  '">');
        if (typeof item.renderItem === "function") {
            thHtml.push(item.renderItem(rowData[item.dataIndex], rowData, rowIdx));
        } else {
            thHtml.push(Safe.outputSafeContent(String(rowData[item.dataIndex])));
        }
        thHtml.push('</td>')
        return thHtml.join('');
    });

    return '<tr>' + row.join('') + '</tr>';
}

window.initTable = function (options) {
    return new Table(options);
}

// var options = {
//     tapEventName: 'tap or click',
//     leftTableConfig: {
//         tableSelector: $('#table_left'),
//         config: [{
//             title: '成员',
//             dataIndex: 'memberName',
//             sort: false,
//             renderItem: function (val, row, idx) {
//                 return val;
//             }
//         }]
//     },
//     rightTableConfig: {
//         tableSelector: $('#table_right'),
//         config: [{
//             title: '分享产品次数',
//             dataIndex: 'memberName',
//             sort: false,
//             renderItem: function (val, row, idx) {
//                 return val;
//             }
//         }]
//     },
//     sortChange: function (sortType, sortName) {
//         console.log(sortType, sortName)
//     }
// }