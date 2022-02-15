(function() {
  function insertBeforeEnd(targetDom, html)
  {
    if (!targetDom){
      return false;
    }

    try{
      if (targetDom.insertAdjacentHTML){
        targetDom.insertAdjacentHTML('beforeEnd', html);
      } else {
        var range = targetDom.ownerDocument.createRange()
        var lastChild = targetDom.lastChild;
        if (lastChild){
          range.setStartAfter(lastChild);
          targetDom.appendChild(range.createContextualFragment(html), lastChild);
        }
      }
      return true;
    }
    catch (_oError){}
  }

  function htmlEncode(str)
  {
    return str && str.replace ? (str.replace(/&(?!#x)/g, "&amp;").replace(/\"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;")) : str;
  }

  // 恶心啊，mailapp ios 会出现在viewport里面设置不同的scale
  var SCALE_REGEXP = /initial-scale\s*?=\s*?([0-9.]+?)([^0-9.]|$)/i
  function getInitScale() {
    var scale = 1
    var viewport = document.querySelector('meta[name=viewport]')
    if (viewport) {
      var content = viewport.getAttribute('content')
      scale = SCALE_REGEXP.test(content) && RegExp.$1 || scale
    }
    return scale
  }

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  function getMinHeight(angle) {
    return window.innerWidth * Math.sin(toRadians(angle))
  }

  function autoWaterMark(markKey) {
    // 确保最小显示高度
    document.body.style.minHeight = getMinHeight(20) + "px";
    var scale = getInitScale()
    var bounds = (document.body).getBoundingClientRect();
    var numMarks = /*Math.ceil(bounds.width / 200) **/ Math.ceil(bounds.height / 200)
    var waterMarkerHtml = ['<div class="qm_watermark" style="width:', bounds.width, 'px;height:', bounds.height, 'px;',
      'position: absolute;left: 0;right: 0;top: 0;bottom: 0;overflow: hidden;-webkit-user-select: none;',
      '-moz-user-select: none;-ms-user-select: none;user-select: none;pointer-events: none;font-weight:bold">'].join('')

    var fontSize = 24/scale
    var translateX = '3.5%'
    var translateY = getMinHeight(15)/2 - 50

    var i = 0
    while (i < numMarks) {
      waterMarkerHtml += ['<li class="qm_watermark_item" style="width: 100%;padding:50px 0 150px;/*height: 150px;padding-bottom: 0;line-height: 150px;*/',
      'overflow: hidden;text-overflow: ellipsis;white-space: nowrap;',
        'position: relative;display: inline-block;font-size: ', 24/scale, 'px;text-align: center;',
        'color: rgba(51, 49, 46, 0.15); -webkit-transform: translate(', translateX, ', ', translateY, 'px) rotate(-15deg); -ms-transform: translate(', translateX, ', ', translateY, 'px) rotate(-15deg);',
        ' transform: translate(', translateX, ', ', translateY, 'px) rotate(-15deg);  -webkit-transform-origin: center; -ms-transform-origin: center;',
        ' transform-origin: center;">', htmlEncode(markKey), '</li>'].join('')
      i++;
    }

    waterMarkerHtml += '</div>'
    insertBeforeEnd(document.body, waterMarkerHtml)

    // 绑定更新
    var resizer = function () {
      var waterMarkDom = document.body.querySelectorAll('div.qm_watermark')

      if (waterMarkDom && waterMarkDom.length > 0) {
        waterMarkDom = waterMarkDom[0]
        waterMarkDom.parentNode && waterMarkDom.parentNode.removeChild(waterMarkDom);
      }
      window.removeEventListener('resize', resizer)
      autoWaterMark(markKey)
    }

    window.addEventListener('resize', resizer)
  }
  

  window.autoWaterMark = autoWaterMark
})()
