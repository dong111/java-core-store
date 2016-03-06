<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="decorator"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String portalPath = "http://yingxiao.zhushou001.com/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script type="text/javascript">
// <![CDATA[
	function bookmark(){
		var title=document.title
		var url=document.location.href
		if (window.sidebar) window.sidebar.addPanel(title, url,"");
		else if( window.opera && window.print ){
		var mbm = document.createElement('a');
		mbm.setAttribute('rel','sidebar');
		mbm.setAttribute('href',url);
		mbm.setAttribute('title',title);
		mbm.click();}
		else if( document.all ) window.external.AddFavorite( url, title);
	}
	
	//同步宝贝数据
	function syncItemData(){
		$('#updateItemsLoadingDiv').show();
		$.post("updateItemDataSession.action","",function(){
			$('#updateItemsLoadingDiv').hide();
			return;
		});
	}
// ]]>
</script>

		<title>淘助手_营销工具平台</title>
		<link type="image/x-icon" rel="icon" href="<%=basePath%>img/favicon.ico" />
		<script src="<%=basePath%>js/jquery/jquery-1.5.1.min.js"
			type="text/javascript"></script>
		<script src="<%=basePath%>js/PNG_Transparence.js"
			type="text/javascript"></script>
		<script src="<%=basePath%>js/jquery/jquery-ui-1.8.11.custom.min.js"
			type="text/javascript"></script>
		<script
			src="<%=portalPath%>js/header/header_config.js?t=<%=System.currentTimeMillis()%>"></script>
		<script src="<%=portalPath%>js/header/init_head.js"></script>
		<script src="<%=portalPath%>js/header/init_left_menu_current.js"></script>
		<script src="<%=portalPath%>js/version.js"></script>
		<script src="<%=portalPath%>js/wx_dialog.js"></script>

		<link href="<%=basePath%>css/sonpage.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/table.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=portalPath%>css/base.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=portalPath%>css/dialog.css" rel="stylesheet"
			type="text/css" />
		<decorator:head />
	</head>

	<body>
		<div class="loading" id="updateItemsLoadingDiv" style="display: none;">
			<img src="<%=basePath%>img/loadding.gif"/>
			<span>正在同步宝贝中…</span>
		</div>
		<div class="top">
			<div class="center">
				<div class="top_bar">
					<div class="logo">
					</div>
					<div class="top_link">
						<a class="top_link_B" href="javascript:bookmark();">收藏</a>
						<a class="top_link_C" target="_blank"
							href="<%=portalPath %>short_url.jsp">下载</a>
						<a class="top_link_D" href="javascript:syncItemData();">同步</a>
					</div>
					<div class="top_user_info">
						<span id="wangwang_span"></span>
						您好，${sessionScope.SESSION_USER_DATA.DISPLAY_NICK}！
						<a href="<%=basePath%>logout.action">退出</a>
					</div>
				</div>
				<div class="menu" id="div_menu"></div>
				<div class="clear"></div>
				<div class="center">
					<div id="banner_div">
					</div>
				</div>
				<div class="clear"></div>
				<div class="center">
					<div id="tip_div"></div>
				</div>
				<script type="text/javascript">
					DD_belatedPNG.fix('.logo , .current , .top_link , .nav_link_BPai , .nav_link_help , .son_nav_FG , .foot_logo , .step_1_icon , .step_2_icon , .step_3_icon , .step_4_icon , .step_5_icon , .quantity,.nav_friendlink');
		        	initHeader("apro",{nav_current:"基础工具",son_nav_current:"批量修改"});
		        	
		        	function logList(){
		        		 params2 = {"proId": ""};
						$.post("searchLogProId.action", params2,null,"json");
		        	}
		        </script>
				<div class="clear"></div>
			</div>
		</div>
		<div class="clear"></div>

		<div class="center">
			<div class="left marginTop">
				<div class="left_nav">
					<ul id="ul_left_nav">
							<li class="left_nav_title">
								描述管理
							</li>
							<li id="left_nav_2_1">
								<a href="<%=basePath%>jsp/batchTools/updateDesc/install.jsp">添加描述</a>
							</li>
							<li id="left_nav_2_2">
								<a href="<%=basePath%>jsp/batchTools/uninstallDesc/step1.jsp">描述管理</a>
							</li>
							<li class="left_nav_title">
								库存管理
							</li>
							<li id="left_nav_6_1">
								<a href="<%=basePath%>jsp/batchTools/subStock/install.jsp">修改库存计数</a>
							</li>
							<li id="left_nav_6_2">
								<a href="<%=basePath%>jsp/batchTools/updateQuantity/install.jsp">修改库存量</a>
							</li>
							<li class="left_nav_title">
								标题管理
							</li>
							<li id="left_nav_1_1">
								<a href="<%=basePath%>jsp/batchTools/updateTitle/install.jsp">修改标题</a>
							</li>
							<li class="left_nav_title">
								价格管理
							</li>
							<li id="left_nav_5_1">
								<a href="<%=basePath%>jsp/batchTools/updatePrice/install.jsp">修改价格</a>
							</li>
<%--							<li id="left_nav_2_2">--%>
<%--								<a href="<%=basePath%>jsp/batchTools/oldDesc/delectOldDesc.jsp">卸载老活动</a>--%>
<%--							</li>--%>
						<li class="left_nav_title">
							我要查询
						</li>
						<li id="left_nav_3_1">
							<a href="<%=basePath%>jsp/log/initial_log.jsp" onclick="logList();">操作记录</a>
						</li>
						<li class="left_nav_title">
							使用帮助
						</li>
						<li>
							<a target="_blank"
								href="http://bangpai.taobao.com/group/thread/1242508-267629044.htm">帮助文档</a>
						</li>
						<li id="left_nav_4_1">
							<a target="_blank" href="<%=basePath%>video.jsp">视频教程</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="right marginTop" style="width: 790px;">
				<decorator:body />
			</div>
		</div>

		<div class="clear"></div>
		<div class="center">
			<div class="copyRight">
				<div class="foot_logo"></div>
				<ul>
					<li>
						Copyright © 2010 - 2012 YITAOSOFT. All Rights Reserved.
					</li>
					<li>
						易淘软件科技有限公司&nbsp;
						版权所有 浙ICP备11061471号-2
					</li>
				</ul>
			</div>
		</div>
		<input type="hidden" id="version_no"
			value="${sessionScope.SESSION_USER_SUBSCRIBE.code}" />
		<input type="hidden" id="user_session_id"
			value="${sessionScope.SESSION_USER_DATA.SESSION_ID}" />
		<input type="hidden" id="version_name"
			value="${sessionScope.SESSION_USER_SUBSCRIBE.msg}" />
		<input type="hidden" id="be_promoted_num_version1" value="4" />
		<input type="hidden" id="be_promoted_num_version2" value="10" />
		<input type="hidden" id="promote_num_version1" value="4" />
		<input type="hidden" id="promote_num_version2" value="10" />
		<input type="hidden" id="promote_sub_app_type" value="${sessionScope.SESSION_CHECK_RESULT_DATA}"/>
		<input type="hidden" id="promote_sub_app_type_pro" value="${sessionScope.SESSION_CHECK_RESULT_DATA_PROID}"/>
		<input type="hidden" id="promote_sub_app_type_oldPro" value="${sessionScope.SESSION_CHECK_RESULT_DATA_PROIDLIST}"/>
		<input type="hidden" id="delOldProList" type="hidden" value="${sessionScope.SESSION_CHECK_RESULT_DATA_DELPROIDLIST}"/>
		<input type="hidden" id="batch_base_path" type="hidden" value="<%=basePath%>"/>
		
		<div id=upgrade_dialog title="温馨提示" style="display: none">
			<span id="upgrade_dialog_msg">对不起，您的版本太低，不能使用此功能，如果想使用此功能请选择升级到更高版本，我们将给您提供更优质的服务！</span>
		</div>
	</body>
</html>