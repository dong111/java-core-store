String.prototype.contains = function (str) {
    return this.indexOf(str) >= 0;
};
String.prototype.notContains = function (str) {
    return this.indexOf(str) < 0;
};


$(function(){


});

function showFilterDemo(){
    wx_dialog_show('filt_module_demo_div');

}


function close_filt_module_demo_div(){
    wx_dialog_close('filt_module_demo_div');
}


// 封装jquery ajax方法
$._ajax = function (param) {
    if (param.loading)param.loading();
    $.ajax({
        url: param.url,
        data: param.param || {},
        type: param.type || 'POST',
        dataType: param.dataType,
        success: function (data, status) {
            param.success(data, status);
            if (param.loading_close)param.loading_close();
        },
        error: function (data) {
            if (data.responseText != '') alert(data.responseText);
            if (param.loading_close)param.loading_close();
        }
    });
};

var NumberUtil = {
    integerRegExp: /^\+?[0-9]+$/, //0 和 正整数
    doubleRegExp: /^[0-9]{1,7}(\.[0-9][0-9]?)?$/,
    discountRegExp: /^[1-9]{1}$|^[0-9]{1}\.[0-9]{1,2}$/,  //0-9.9 折
    regPrice: function (price) {
        return this.doubleRegExp.test(price);
    },
    // 验证折扣，10有效
    regDiscount: function (discount) {
        if (discount == 10)return true;
        if (discount <= 0 || discount > 10) return false;
        return this.discountRegExp.test(discount);
    },
    // 判断整数
    regCount: function (count) {
        return this.integerRegExp.test(count);
    }
};

var Address = {
    go: function (url) {
        window.location.href = url;
    },
    refresh: function () {
        window.location.reload();
    },
    prev: function () {
        window.history.go(1);
    },
    back: function () {
        window.history.go(-1);
    },
    url: function () {
        return window.location.pathname;
    }
};

var DateUtil = {
    toDate: function (date) {
        var head_bottom = date.split(' ');
        var head = head_bottom[0];
        var bottom = head_bottom[1];
        var ymd = head.split('-');
        var year = Number(ymd[0]);
        var month = Number(ymd[1]) - 1;
        var day = Number(ymd[2]);
        var hms = bottom.split(':');
        var hour = Number(hms[0]);
        var min = Number(hms[1]);
        var sec = Number(hms[2]);
        return new Date(year, month, day, hour, min, sec);
    },
    formatToStr: function (dateTime) {
        var date = dateTime;
        if (typeof dateTime == 'number') {
            date = new Date(dateTime);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        var day = date.getDate();
        if (day < 10) day = '0' + day;
        var hour = date.getHours();
        if (hour < 10) hour = '0' + hour;
        var minute = date.getMinutes();
        if (minute < 10) minute = '0' + minute;
        var seconds = date.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
    },
    dateToWeekDay: function (planTime) {
        var weekday = '';
        var planDate = this.toDate(planTime);
        if (planDate.getDay() == 1) weekday = "星期一";
        if (planDate.getDay() == 2) weekday = "星期二";
        if (planDate.getDay() == 3) weekday = "星期三";
        if (planDate.getDay() == 4) weekday = "星期四";
        if (planDate.getDay() == 5) weekday = "星期五";
        if (planDate.getDay() == 6) weekday = "星期六";
        if (planDate.getDay() == 0) weekday = "星期日";
        return weekday;
    }
};

var ObjectUtil = {
    isEmpty: function (obj) {
        if (typeof obj != 'object') throw 'param is not object';
        var len = 0;
        for (var i in obj) {
            len++;
        }
        return len == 0;
    },
    isNotEmpty: function (obj) {
        return !ObjectUtil.isEmpty(obj);
    }
};

var Http = {
    SUCCESS: 200
};

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

var commonPath = 'http://static.zhushou001.com/common/';

var Msg = {
    success: function (content, time) {
        Msg.show('success', content, time);
    },
    warn: function (content, time) {
        Msg.show('warn', content, time);
    },
    error: function (content, time) {
        Msg.show('error', content, time);
    },
    show: function (type, content, time) {
        var template = {};
        template.type = type;
        var msgHtml = _.template(Msg.msgTemplate, {template: template, commonPath: commonPath});
        $('#tip-msg-div').remove();
        $('body').prepend(msgHtml);
        $('#tip-msg-div').slideDown();
        $('#tip-msg-content').html(content);
        time && setTimeout(function () {
            Msg.close();
        }, time * 1000);
    },
    close: function () {
        $('#tip-msg-div').hide();
        $('#tip-msg-content').html('');
    },
    msgTemplate: '<div id="tip-msg-div" class="msg-div msg-div-{%=template.type%}">' +
    '<div class="msg-hint msg-hint-{%=template.type%}">' +
    '<div class="msg-del"><a class="msg-content-{%=template.type%}" href="javascript:Msg.close();">X</a></div>' +
    '<div class="msg-hint-content msg-content-{%=template.type%}">' +
    '<img style="vertical-align:middle;" src="{%=commonPath%}/img/msg-{%=template.type%}.jpg" />' +
    '<span id="tip-msg-content">提示消息</span></div></div></div>'
};

//模拟下拉菜单控件打开列表
function Imitate_select(i, id_01, id_02, true_value_id, changeCallback, obj) {
    //打开列表
    $(i + " .Imitate_select_text," + i + " .Imitate_select_btn i").click(function () {
        $(i + " .Imitate_select_list").toggle();
    });
    //选值
    $(i + " ul.Imitate_select_list li").click(function () {
        var select_val = $(this).text();
        $(i + " input.Imitate_select_text").val(select_val);
        if (true_value_id) {
            var true_val = $(this).attr('data');
            $("#" + true_value_id).val(true_val);
        }
        if (true_value_id == 'seller_cid') {
            $('#top_seller_cid').val("-8");
            $('#top_seller_cid').prev().val("自动分类类目");
        } else if (true_value_id == 'top_seller_cid') {
            $('#seller_cid').val("-8");
            $('#seller_cid').prev().val("自定义类目");
        }
        $(i + " ul.Imitate_select_list").hide();
        if (changeCallback) {
            obj ? changeCallback.call(obj) : changeCallback();
        }
    });
    //元素单击
    $(document).click(function (ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.id != id_01 && target.id != id_02) {
            $(i + " .Imitate_select_list").hide();
        }
    });
    //鼠标经过
    $(i + " .Imitate_select_list li").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })
}



function timestamp(){
    return new Date().getTime();
}
//-----------------------数组操作相关方法-------------------------
Array.indexOf = function (arr, item) {
    return Array.indexOf(arr, item, 0);
};
Array.indexOf = function (arr, item, fromIndex) {
    for (var i = (fromIndex >= 0 ? fromIndex : 0), j = arr.length; i < j; i++) if (arr[i] == item) return i;
    return -1;
};
Array.lastIndexOf = function (arr, item, fromIndex) {
    for (var i = arr.length - 1; i >= (fromIndex >= 0 ? fromIndex : 0); i--) if (arr[i] == item) return i;
    return -1;
};
Array.contains = function (arr, item) {
    return Array.indexOf(arr, item) > -1;
};
Array.remove = function (arr, item) {
    var i = Array.indexOf(arr, item);
    if (i > -1) {
        arr.splice(i, 1);
        return true;
    }
    return false;
};
Array.removeAt = function (arr, index) {
    arr.splice(index, 1);
};
Array.insertAt = function (arr, index, obj) {
    arr.splice(index, 0, obj);
};
Array.clear = function (arr) {
    arr.splice(0, arr.length);
};