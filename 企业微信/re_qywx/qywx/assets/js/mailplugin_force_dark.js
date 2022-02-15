/************
 * 深色模式
 ************/

var DarkThemeManager = (function(_aoNS) {
    // 英文颜色解析
    var colorTemplate = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    };

    function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
    }

    // argb(0, 0, 0, 0) 格式 -> [0, 0, 0, 0]
    function getRgba(color) {
        var rgbaStr = color.replace(/[\(\)rgbaRGBA]*/g, "").split(",");
        var rgba = [];
        for (var i = 0; i < rgbaStr.length; i++) {
            rgba.push(parseFloat(rgbaStr[i]));
        }
        return rgba;
    }

    // 把颜色处理成array
    function getColorArray(color) {
        var colorArray = colorTemplate[color]
        if (colorArray != undefined) {
            return colorArray;
        }
        return getRgba(color)
    }

    function rgb2lab(rgb) {
        return xyz2lab(rgb2xyz(rgb))
    }

    function lab2rgb(lab) {
        return xyz2rgb(lab2xyz(lab))
    }

    function rgb2xyz(rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;

        // assume sRGB
        r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
        g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
        b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

        var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
        var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
        var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

        return [x * 100, y * 100, z * 100];
    };

    function xyz2rgb(xyz) {
        var x = xyz[0] / 100;
        var y = xyz[1] / 100;
        var z = xyz[2] / 100;
        var r;
        var g;
        var b;

        r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
        g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
        b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

        // assume sRGB
        r = r > 0.0031308
            ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
            : r * 12.92;

        g = g > 0.0031308
            ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
            : g * 12.92;

        b = b > 0.0031308
            ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
            : b * 12.92;

        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);

        return [r * 255, g * 255, b * 255];
    };

    function lab2xyz(lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var x;
        var y;
        var z;

        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;

        var y2 = Math.pow(y, 3);
        var x2 = Math.pow(x, 3);
        var z2 = Math.pow(z, 3);
        y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
    };

    function xyz2lab(xyz) {
        var x = xyz[0];
        var y = xyz[1];
        var z = xyz[2];
        var l;
        var a;
        var b;

        x /= 95.047;
        y /= 100;
        z /= 108.883;

        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

        l = (116 * y) - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
    }

    // http://www.w3.org/TR/WCAG20/#relativeluminancedef
    function luminosity(rgb) {
        var lum = [];
        for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
        }

        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    }

    // https://www.w3.org/TR/WCAG20-TECHS/G156.html
    // luminance: the relative brightness
    // (lighter + 0.05) / (darker + 0.05)
    // Contrast ratios can range from 1 to 21
    // 作用：判断textColor合法性 contrast is measured with respect to the specified background over which the text is rendered in normal usage
    function contrast(color1, color2) {
       // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
        var lum1 = luminosity(color1);
        var lum2 = luminosity(color2);

        if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
        }

        return (lum2 + 0.05) / (lum1 + 0.05);
    }

    function lighterBg(bgColor) {
        var colorLab = rgb2lab(bgColor);
        var newL = colorLab[0] + 20;
        if (newL > 100) {
            newL = 100;
        }
        var newRgb = lab2rgb([newL, colorLab[1], colorLab[2]]);
        if (bgColor.length == 4) {
            return "rgb(" + newRgb[0] + "," + newRgb[1] + "," + newRgb[2] + ", " + bgColor[3] + ")";
        } else {
            return "rgb(" + newRgb[0] + "," + newRgb[1] + "," + newRgb[2] + ")";
        }
    }

    // L 值的范围 0-100, 从深色到浅色
    // 反色逻辑，直接反转明度
    // 原理： rgb颜色空间转化成lab颜色空间后， 深浅由明度L来决定
    function darkerColor(color, isBg) {
        var colorLab = rgb2lab(color);
        var originL = colorLab[0]

        // L value for the color we need to contrast against
        var newL = originL;
        // 按照android的反色算法，不以50作为对称轴去反色， 而是加了10的偏移量
        if (110 - originL > 100) {
            newL = 100;
        } else {
            newL = 110 - originL;
        }

//        // 背景需要加深
        if (isBg && newL > originL) {
            // 需要变深色， 如果反色后变成浅色了， 则使用原来的颜色
            newL = originL;
        } else if (!isBg && newL < originL) {
            // 非背景需要变浅色， 如果反色后变成深色了， 则使用原来的颜色
            newL = originL;
        }

        // 使用新的L构建新的颜色
        var newRgb = lab2rgb([newL, colorLab[1], colorLab[2]]);
        if (color.length == 4) {
            return "rgb(" + Math.round(newRgb[0]) + "," + Math.round(newRgb[1]) + "," + Math.round(newRgb[2]) + "," + color[3] + ")";
        } else {
            return "rgb(" + Math.round(newRgb[0]) + "," + Math.round(newRgb[1]) + "," + Math.round(newRgb[2]) + ")";
        }
    }

    // The visual presentation of text and images of text has a contrast ratio of at least 4.5:1,
    var VALID_CONTRAST_VALUE = 4.5;
    function isValidContrast(color1, color2) {
        if (color1.length == 4 && color1[3] == 0) return true;
        return contrast(color1, color2) >= VALID_CONTRAST_VALUE;
    }

    function forceDarkElement(element, lastBgColorArray) {
        if (typeof element.className === 'string' && element.className.indexOf(IGNORE_TAG) > 0) return;
        var styles = window.getComputedStyle(element)
        var styleBGColor = element.style.backgroundColor;
        var textColor = styles.color
        var textColorArray = getColorArray(textColor);
        var newTextColor = textColor;
        // 计算文字和基础背景的色差
        if (!isValidContrast(textColorArray, lastBgColorArray)) {
             newTextColor = darkerColor(textColorArray, false);
             element.style.setProperty('color', newTextColor, 'important');
             textColorArray = getColorArray(newTextColor);
        }
        if (styles.backgroundImage && styles.backgroundImage.indexOf("rgb") >= 0) {
            // 处理backgroundImage中的颜色
            element.style.backgroundImage=styles.backgroundImage.replace(rgbReg, function(color) {
                var colorArray = getColorArray(color);
                if (!isValidContrast(colorArray, textColorArray)) {
                     return darkerColor(colorArray, true);
                }
                return color;
            })
        }
        var backgroundColor = styles.backgroundColor ? styles.backgroundColor : styleBGColor;
//        if (styles.backgroundImage != "none") {
//             // 背景是图片, 则当前节点和子节点也不反色了
//             element.setAttribute(ATTR_QQMAIL_TAG, true)
//             return
//        }
        // 计算背景和文字的色差
        var bgColorArray = getColorArray(backgroundColor);
        var newBgColor = backgroundColor;
        if (!isValidContrast(bgColorArray, textColorArray)) {
            newBgColor = darkerColor(bgColorArray, true);
            element.style.setProperty('background-color', newBgColor, 'important');
            bgColorArray = getColorArray(newBgColor);

            // 计算处理后的背景和基础背景的色差，不满足，则加亮一下当前背景
//            if (elementCnt == 0 && !isValidContrast(bgColorArray, lastBgColorArray)) {
//                newBgColor = lighterBg(bgColorArray);
//                element.style.setProperty('background-color', newBgColor, 'important');
//                bgColorArray = getColorArray(newBgColor);
//            }
        }
        var chileElement = element.firstElementChild;
        while (chileElement != null) {
            forceDarkElement(chileElement, bgColorArray)
            chileElement = chileElement.nextElementSibling;
        }
    }

    function forceDarkBody(body) {
        var element = body.firstElementChild;
        while (element != null) {
            forceDarkElement(element, baseBGColorArray);
            element = element.nextElementSibling;
        }
    }

    var ATTR_QQMAIL_TAG = "attr_qqmail_image_bg";
    var IGNORE_TAG = "qm-darkmode-custom"
    //初始化对象
    // darkTheme bg #1c1c1e
    var darkThemeManager = {};
    var baseBGColor = "rgb(28, 28, 30)"; // 默认的深色下的底色
    var baseBGColorArray = [28, 28, 30];
    var baseBGLab = rgb2lab(baseBGColorArray)
    darkThemeManager.isValidContrast = isValidContrast;
    darkThemeManager.darkerColor = darkerColor;
    var rgbReg = /a?rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3},? ?\d?\.?\d{0,}\)/g
    darkThemeManager.forceDarkMode = function forceDarkMode() {
        console.log("forceDarkMode")
        var startTime = new Date;
        document.getElementsByTagName("html")[0].style.backgroundColor=baseBGColor;
        var element = document.documentElement.firstElementChild;

        while (element != null) {
            if (element.tagName === "BODY") {
                element.style.setProperty('background-color', baseBGColor, 'important');
                forceDarkBody(element)
            }
            element = element.nextElementSibling;
        }
        console.log("forceDarkMode done: " + (new Date - startTime))
    }
    return darkThemeManager;
})(window);
