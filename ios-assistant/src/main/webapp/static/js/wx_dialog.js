var portal_path = "http://yingxiao.zhushou001.com/";
var EV_MsgBox_ID = ""; // 重要

var max_msg_index = 0;
var max_bg_index = 0;

var msg = '<div class="dialog_default dialog_tips" id="wx_msg" style="display: none;">'+
	'<span class="dialog_text icon_warning"><h2 id="msg_content"></h2></span>'+
	'</div>';


$(function (){
	var wx_loading_html = '<div class="dialog_default dialog_tips" id="wx_loading" style="display: none;">'+
							'<span class="dialog_text icon_loading"><h2 id="loading_content">加载中……</h2></span>'+
							'</div>';

	var auth_div_full = '<div class="dialog_default" id="wx_auth" style="display: none;">'+
					'<div class="dialog_auth" style="display:block;">'+
				'<div class="dialog_auth_text">'+
			        '<h2>请先授权！</h2>'+
			    	'<span>请点下面的按钮到新页面授权后再回来提交!</span>'+
			   	'</div>'+
			    '<div class="clear"></div><div class="dialog_link">'+
			    	'<a target="_blank" id="auth_btn" onclick="change_btn()" class="t_btn_yellow" href="#">去淘宝授权</a>'+
			    '</div>'+
			'</div>'+
			'<div class="dialog_auth_continue" style="display:none;">'+
				'<div class="dialog_auth_text">'+
			        '<h2>完成授权后，请点继续操作！</h2>'+
			    	'<span>如果您已经到新页面授权了，请点击继续操作!</span>'+
			   	'</div>'+
			    '<div class="clear"></div><div class="dialog_link">'+
			    	'<a id="auth_continue" onclick="continue_to_create()" class="t_btn_green">继续操作</a>'+
			    '</div>'+
			'</div>'+
			'<div class="dialog_auth_fail" style="display:none;">'+
				'<div class="dialog_auth_text">'+
			        '<h2>授权失败，请重新授权！</h2>'+
			    	'<span>可能由于网络原因导致授权失败，请重新授权!</span>'+
			   	'</div>'+
			   '<div class="clear"></div><div class="dialog_link">'+
			    	'<a target="_blank" id="auth_again" onclick="change_btn()" class="t_btn_blue" href="#">重新授权</a>'+
			    '</div>'+
			'</div>'+
			'</div>';



	var confirm_div = '<div id="wx_confirm_dialog" class="dialog_default" style="display: none;">'+
					        '<div class="dialog_center icon_help" style="height: 135px;padding: 35px 0px 0px 20px;width: 377px;background-position: 18px 28px;">'+
					    '<div class="dialog_text">'+
					        '<h2 id="wx_confirm_dialog_title" style="padding-left: 40px;margin-bottom: 12px;">温馨提示！</h2>'+
					        '<span id="wx_confirm_dialog_sub_title"><span style="font-size:14px;font-weight:bold;color:#CD3700;line-height: 22px;">亲爱的淘助手用户您好！生成手机详情页功能目前处于公测阶段.体验会有一些风险哦！您确定要优先体验吗？（暂不支持天猫用户）</span></span>'+
					    '</div>'+
						'</div>'+
						'<div class="dialog_link">'+
							'<a class="t_btn_yellow" href="javascript:wx_confirm_yes();">我知道了</a>'+
//							'<a class="t_btn_gray" href="javascript:wx_confirm_no();">以后再用</a>'+
						'</div>'+
					  '</div>';

	$('body').append(msg);
	$('body').append(wx_loading_html);
	$('body').append(auth_div_full);
	$('body').append(confirm_div);



	wx_dialog('wx_msg', {
		title : "温馨提示",
		autoOpen : false,
		width : 450,
		close:"close_wx_alert_dialog"
	});

	wx_dialog('wx_loading', {
		title : "温馨提示",
		autoOpen : false,
		width : 450
	});

	wx_dialog('wx_auth', {
		title : "授权提示",
		autoOpen : false,
		width : 450,
		close:"initAuthDialog"
	});

	wx_dialog('wx_confirm_dialog', {
		title : "温馨提示",
		autoOpen : false,
		width : 450,
        close:"wx_confirm_no"
	});

});

function wx_alert(_content){
	if(_content.indexOf('&lt;')>=0){
		_content = _content.replace(/&lt;/g,'<');
	}
	if(_content.indexOf('&gt;')>=0){
		_content = _content.replace(/&gt;/g,'>');
	}
	if(_content.indexOf('&quot;')>=0){
		_content = _content.replace(/&quot;/g,'"');
	}
	$('#wx_msg #msg_content').html(_content);
	wx_dialog_show('wx_msg');
}

function wx_loading(_content){
	if(_content==undefined||_content=='undefined'){
		_content = '正在处理中   ... ...';
	}
	$('#wx_loading #loading_content').html(_content);
	wx_dialog_show('wx_loading');
}


function wx_loading_close(){
	wx_dialog_close('wx_loading');
}


function close_wx_alert_dialog(){
	wx_dialog_close('wx_msg');
}


// 弹出对话窗口(msgID-要显示的div的id)
function EV_modeAlert(msgID) {
	// 创建大大的背景框

	var bgObj = document.createElement("div");
	bgObj.setAttribute('id', msgID + '_bg');
	//$(bgObj).css('display','none');
	document.body.appendChild(bgObj);
	// 背景框满窗口显示
	EV_MsgBox_ID = msgID;
	EV_Show_bgDiv(bgObj);
	// 把要显示的div居中显示
	EV_Show_msgDiv();


	var len = $('div[id$="_bg"]').length;
	$('#'+EV_MsgBox_ID).css('zIndex',10002+len+"");
	max_msg_index = 10002+len;
	var curr_msg_zindex = $('#'+EV_MsgBox_ID).css('zIndex');
	$('#'+EV_MsgBox_ID+'_bg').css('zIndex',(Number(curr_msg_zindex) - 1)+"");
	max_bg_index = Number(curr_msg_zindex) - 1;
}

// 关闭对话窗口
function EV_closeAlert(msgID) {
	var msgObj = document.getElementById(msgID);
	var bgObj = document.getElementById(msgID + "_bg");
	//msgObj.style.display = "none";
	$(msgObj).hide();
	document.body.removeChild(bgObj);
	EV_MsgBox_ID = "";
//	EV_MsgBox_ID = $('div[id$="_bg"]').eq($('div[id$="_bg"]').length-1).attr('id').replace('_bg','');
}

// 窗口大小改变时更正显示大小和位置
window.onresize = function() {
	if ($('div[id$="_bg"]').length <= 0) {
		return;
	}
	$('div[id$="_bg"]').each(function() {
		EV_Show_bgDiv(this);
		EV_Show_msgDiv();
	});
}

// 窗口滚动条拖动时更正显示大小和位置
window.onscroll = function() {
	if ($('div[id$="_bg"]').length <= 0) {
		return;
	}
	$('div[id$="_bg"]').each(function() {
		EV_Show_bgDiv(this);
		EV_Show_msgDiv();
	});
}


// 把要显示的div居中显示
function EV_Show_msgDiv() {
	var msgObj = document.getElementById(EV_MsgBox_ID);
//	msgObj.style.display = "block";
	$(msgObj).show();
	var msgWidth = msgObj.scrollWidth;
	var msgHeight = msgObj.scrollHeight;
	var bgTop = EV_myScrollTop();
	var bgLeft = EV_myScrollLeft();
	var bgWidth = EV_myClientWidth();
	var bgHeight = EV_myClientHeight();
	var msgTop = bgTop + Math.round((bgHeight - msgHeight) / 2);
	var msgLeft = bgLeft + Math.round((bgWidth - msgWidth) / 2);
	msgObj.style.position = "absolute";
	msgObj.style.top = msgTop + "px";
	msgObj.style.left = msgLeft + "px";


	msgObj.style.zIndex = (max_msg_index==0)?"10002":max_msg_index+"";

}


// 背景框满窗口显示
function EV_Show_bgDiv(bgObj) {
	var msgObj=document.getElementById(EV_MsgBox_ID);
	var bgWidth = EV_myClientWidth();
	var bgHeight = EV_myClientHeight();
	var bgTop = EV_myScrollTop();
	var bgLeft = EV_myScrollLeft();
	bgObj.style.position = "absolute";
	bgObj.style.top = bgTop + "px";
	bgObj.style.left = bgLeft + "px";
	bgObj.style.width = bgWidth + "px";
	bgObj.style.height = bgHeight + "px";

    if(msgObj==undefined){
        msgObj = "wx_loading";
    }

	if(msgObj.style.zIndex == ""){
		msgObj.style.zIndex = "10001";
	}
	if(bgObj.getAttribute("id").indexOf(EV_MsgBox_ID)!=-1){
		bgObj.style.zIndex = (max_bg_index==0)?"10000":max_bg_index+"";
	}else{
		bgObj.style.zIndex = "10000";
	}
	bgObj.style.background = "#000";
	bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60,finishOpacity=60);";
	bgObj.style.opacity = "0.6";
}
// 网页被卷去的上高度
function EV_myScrollTop() {
	var n = window.pageYOffset || document.documentElement.scrollTop
			|| document.body.scrollTop || 0;
	return n;
}
// 网页被卷去的左宽度
function EV_myScrollLeft() {
	var n = window.pageXOffset || document.documentElement.scrollLeft
			|| document.body.scrollLeft || 0;
	return n;
}
// 网页可见区域宽
function EV_myClientWidth() {
	var n = document.documentElement.clientWidth || document.body.clientWidth
			|| 0;
	return n;
}
// 网页可见区域高
function EV_myClientHeight() {
	var n = document.documentElement.clientHeight || document.body.clientHeight
			|| 0;
	return n;
}

function bindDrag(divId) {
	$('#' + divId).children('div').eq(0).mousedown(function(event) {
		var x = 0, y = 0;
		var moveable = true;
		var notice = $('#' + divId);
		x = event.clientX - parseInt(notice.css("left"));
		y = event.clientY - parseInt(notice.css("top"));
		$("body").mousemove(function(event) {
			if (moveable) {
				var nowX = event.clientX - x;
				var nowY = event.clientY - y;
				notice.css("top", nowY);
				notice.css("left", nowX);
			}
		}).mouseup(function() {
			if (moveable) {
				moveable = false;
			}
		})
	});
}

function saveDefaultContent(div_id){
	var default_content_div = '<div id="'+div_id+'_default_content" style="display: none;"></div>';
	$('body').append(default_content_div);
	var default_content = $('#'+div_id).html();
	$('#'+div_id+'_default_content').html(default_content);
}

/* 注册dialog */
function wx_dialog(div_id, params_obj) {

	var parent_div = $("#" + div_id);
	parent_div.css('position', 'relative');

	/* 设置dialog的宽度 */
	if (params_obj.width != "" && params_obj.width != undefined) {
		parent_div.css('width', params_obj.width + 'px');
	}

	/* 设置dialog的高度 */
	if (params_obj.height != "" && params_obj.height != undefined) {
		parent_div.css('height', params_obj.height + 'px');
	}

	/* 显示标题 */
	var dialog_title = params_obj.title;
	var title_div = "";
	var basePath = $('#basePath').val();
	if (dialog_title != "" && dialog_title != undefined) {
		if(params_obj.close != "" && params_obj.close != undefined){
			title_div = '<div id="'+div_id+'_title_div" class="dialog_title">'
			+ '<span>'+dialog_title+'</span>'
			+ '<a href="javascript:'+params_obj.close+'();" class="dialog_btn_close" title="关闭" >关闭</a></div>';
		}else{
			title_div = '<div id="'+div_id+'_title_div" class="dialog_title">'
			+ '<span>'+dialog_title+'</span>'
			+ '<a class="dialog_btn_close" href="javascript:wx_dialog_close(\''
			+ div_id
			+ '\');" title="关闭" >关闭</a></div>';
		}

	}

	parent_div.prepend(title_div);

	bindDrag(div_id);

	/* 是否默认显示 */
	if (params_obj.autoOpen == false) {
		parent_div.css('display', 'none');
	} else {
		parent_div.css('display', 'block');
	}

	var buttons = params_obj.buttons;
	if(buttons){
		var btn_div = "<div style='width:100%; bottom:0; left:0;margin-top:60px; text-align:right; float:right;'>";
		for ( var i in buttons) {
			var fun = 'javascript:(' + buttons[i] + ')();';
			fun = fun.replace(/'+/g, "\"");
			var a_btn = "";

			if(i=="我要马上去抢!"){
				a_btn = "<a style='float:right; margin:2px 10px 2px 0px; display:block ;padding:2px 4px; height:25px; line-height:25px; ' class='btn-use ui-btn-grad_v' href='"
					+ fun + "'>" + i + "</a>";
			}else{
				a_btn = "<a style='float:right; margin:2px 10px 2px 0px; display:block ;padding:2px 4px; height:25px; line-height:25px; ' class='btn-use ui-btn-grad' href='"
					+ fun + "'>" + i + "</a>";
			}
			btn_div += a_btn;

		}
		btn_div += '</div>';
		parent_div.append(btn_div);
	}

	//saveDefaultContent(div_id);
}

function wx_dialog_hash(div_id){
	/*锚记*/
	var hash=(window.location.hash == "#"+div_id)?"#"+div_id+"_title_div":"#"+div_id;
	window.location.hash = hash;
}

function wx_dialog_show(div_id) {
	EV_modeAlert(div_id);
}

function wx_dialog_close(div_id) {
	//$('#'+div_id).html($('#'+div_id+'_default_content').html());
	EV_closeAlert(div_id);
}

/*
*每个需要短授权的应用都需要引用这个js，然后在需要判断是否短授权的时候调用这个方法
*/
var global_sessionId = "";
var short_callback = "";
var short_param = [];


function wx_short_auth(auth_obj){
	global_sessionId = auth_obj.sessionId;
	short_callback = auth_obj.callback;
	var _short_param = auth_obj.auth_param;
	if(_short_param== undefined ||_short_param== 'undefined' ){
		_short_param = [];
	}
	short_param = _short_param;
	has_short_auth(true);
}

function has_short_auth(is_server){
	/*本地测试时，不需要短授权，直接返回true*/
	if(is_server===false){
		return true;
	}
	$.ajax({
        type: "get",
        async: false,
        cache:false,
        url: portal_path+"author_contact!needAuthor.action?format=json",
        dataType: "jsonp",
        jsonp: "jsoncallback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"process_short_auth_result",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(json){
//			process_short_auth_result(json);
        },
        error: function(){
//            alert('fail');
        }
    });
	//$.getJSON(portal_path+"author_contact!needAuthor.action?format=json&jsoncallback=?",process_short_auth_result);
}

function process_short_auth_result(data){
	var isok = data.isAlreadyAuthor;
	var isSubUser = $.trim(data.isSubUser);
	isok = $.trim(isok);
	if(isok=="true"){
		if(short_param.length == 0){
			eval(short_callback+"();");
		}else{
			var param_str = "";
			for ( var i = 0; i < short_param.length; i++) {
				param_str += "'"+short_param[i]+"',";
			}
			param_str = param_str.substring(0,(param_str.length - 1));
			eval(short_callback+"("+param_str+");");
		}
	}else{
		global_sessionId = $.trim(global_sessionId);
		var authHref = '';
		if(global_sessionId==""||global_sessionId==undefined||global_sessionId=="undefined"||isSubUser=='1'){
			authHref = 'http://container.api.taobao.com/container?appkey=12157195';
		}else{
			authHref = 'http://container.api.taobao.com/container?appkey=12157195&sessionkey='+global_sessionId;
		}
		$('#auth_btn').attr('href',authHref);
		wx_dialog_show('wx_auth');
	}
}


function change_btn(){
	/*显示继续创建按钮*/
	$('#wx_auth div[class="dialog_auth_continue"]').show();
	$('#wx_auth div[class="dialog_auth"]').hide();
	$('#wx_auth div[class="dialog_auth_fail"]').hide();
}

function continue_to_create(){

	$.ajax({
        type: "get",
        async: false,
        cache:false,
        url: portal_path+"author_contact!needAuthor.action?format=json",
        dataType: "jsonp",
        jsonp: "jsoncallback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"process_short_auth_result_again",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(json){
//			process_short_auth_result(json);
        },
        error: function(){
//            alert('fail');
        }
    });
	/*再去验证是否授权*/
//	$.getJSON(portal_path+"author_contact!needAuthor.action?format=json&jsoncallback=?",process_short_auth_result_again);

}

function process_short_auth_result_again(data){
	var isok = data.isAlreadyAuthor;
	var isSubUser = $.trim(data.isSubUser);
	isok = $.trim(isok);
	if(isok=="true"){
		wx_dialog_close('wx_auth');
		if(short_param.length == 0){
			eval(short_callback+"();");
		}else{
			var param_str = "";
			for ( var i = 0; i < short_param.length; i++) {
				param_str += "'"+short_param[i]+"',";
			}
			param_str = param_str.substring(0,(param_str.length - 1));
			eval(short_callback+"("+param_str+");");
		}
	}else{
		/*改为重新授权*/
		var authHref = '';
		if(global_sessionId==""||global_sessionId==undefined||global_sessionId=="undefined"||isSubUser=='1'){
			authHref = 'http://container.api.taobao.com/container?appkey=12157195';
		}else{
			authHref = 'http://container.api.taobao.com/container?appkey=12157195&sessionkey='+global_sessionId;
		}

		$('#auth_again').attr('href',authHref);
		$('#wx_auth div[class="dialog_auth_continue"]').hide();
		$('#wx_auth div[class="dialog_auth"]').hide();
		$('#wx_auth div[class="dialog_auth_fail"]').show();
	}
}

function initAuthDialog(){

	$('#wx_auth div[class="dialog_auth_continue"]').hide();
	$('#wx_auth div[class="dialog_auth"]').show();
	$('#wx_auth div[class="dialog_auth_fail"]').hide();
	wx_dialog_close('wx_auth');

}


/*
*  当某个操作需要用户确认时，可以调用这个方法
*
*  点击确定时，调用用户传过来的方法
*
*  点击取消时，关闭窗口。
*/

var confirm_callback;
var confirm_param;

function wx_confirm(confirmParam){
	var title = $.trim(confirmParam.title);
	if(title==''||title==undefined||title=='undefined'){
		title = '确定要执行操作吗？';
	}
	var subTitle = $.trim(confirmParam.subTitle);
	if(subTitle==''||subTitle==undefined||subTitle=='undefined'){
		subTitle = '点击确定执行，取消则返回。';
	}
	confirm_callback = confirmParam.callback;
	confirm_param = confirmParam.confirmParam;

	$('#wx_confirm_dialog_title').html(title);
	$('#wx_confirm_dialog_sub_title').html(subTitle);
	wx_dialog_show('wx_confirm_dialog');
}

function wx_confirm_yes(){
	var param_str = "";
	if(confirm_param!=''&&confirm_param!=undefined&&confirm_param!='undefined'){
		for ( var i = 0; i < confirm_param.length; i++) {
			param_str += "'"+confirm_param[i]+"',";
		}
	}
	param_str = param_str.substring(0,(param_str.length - 1));
	eval(confirm_callback+"("+param_str+");");
	wx_dialog_close('wx_confirm_dialog');
}

function wx_confirm_no(){
	wx_dialog_close('wx_confirm_dialog');
    var rediControl = $("#floderCtrol").val();
    if(rediControl=="yl"){
        window.location.href = "http://yinliu.zhushou001.com/index.jsp";
    }else if(rediControl=="yx"){
        window.location.href = "http://yingxiao.zhushou001.com/index.jsp";
    }

}

function wx_version_upgrade(msg,chnl){
	pop_insufficient_permission_dialog(msg,chnl);
}
