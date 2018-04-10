const corLib = {
    getDate(type) {
        var time;
        switch (type) {
            case 0:
            time = this.format('yyyy-MM-dd hh:mm:ss');
            break;
            case 1:
            time = this.format('yyyy-MM-dd');
            break;
            case 2:
            time = this.format('hh:mm:ss');
            break;
            default:
            "";
            break
        }
        return time;
    },
    format(format) {
        var o = {
            "M+": new Date().getMonth() + 1, //month
            "d+": new Date().getDate(), //day
            "h+": new Date().getHours(), //hour
            "m+": new Date().getMinutes(), //minute
            "s+": new Date().getSeconds(), //second
            "q+": Math.floor((new Date().getMonth() + 3) / 3), //quarter
            "S": new Date().getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    getDayNum(strDateStart, strDateEnd) {
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;
        oDate1 = strDateStart.split(strSeparator);
        oDate2 = strDateEnd.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
        var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
        iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
        return iDays == 0 ? "1" : iDays;
    },
      /*
      * 是否为手机号
      **/
    isTelPhone(mobile) {
        if ((/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
            return true;
        } else {
            return false;
        }
    },
      /*
      * 判断是否为固定电话
      **/
    isTel(mobile) {
        if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(mobile)) {
            return true;
        } else {
            return false;
        }
    },
    /*
    * 判断是否为email
    **/
    isEmail(email) {
        var sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
        if (sReg.test(email)) {
            return true;
        } else {
            return false;
        }
    },
    /*
    * 获取滚动条滚动距离
    **/
    getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },
    /*
    * 滚动条回到顶部
    **/
    goScrollTop() {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
            scrollBy(0, -20);
            timer = requestAnimationFrame(fn);
            } else {
            cancelAnimationFrame(timer);
            }
        });
    },
    /*
    * 去掉字符串首尾空格
    **/
    trim(str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    /*
    * 去掉字符串所有空格
    **/
    trimAll(str) {
        return str.replace(/\s*/g, '');
    },
    /*
    * 是否为数组
    **/
    isArray(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array
        }
    },
    /*
    * 是否为数组
    **/
    isObject(obj) {
        if (typeof (obj) == "object" && !Array.isArray(obj)) {
            return true
        } else {
            return false
        }
    }
}
module.exports = corLib;
