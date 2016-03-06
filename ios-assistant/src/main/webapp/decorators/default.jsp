<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="portalPath" value="http://yingxiao.zhushou001.com"/>
<c:set var="basePath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <title>淘助手 - <decorator:title/></title>
    <link rel="shortcut icon" type="image/x-icon" href="${basePath}img/favicon.ico">
    <link href="${portalPath}/css/base.css" rel="stylesheet" type="text/css"/>
    <link href="${portalPath}/css/dialog.css" rel="stylesheet" type="text/css"/>
    <link href="${basePath}/static/css/sonpage.css" rel="stylesheet" type="text/css"/>
    <script src="${basePath}/static/js/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="${portalPath}/js/header/header_config.js"></script>
    <script src="${portalPath}/js/header/init_head.js"></script>
    <script src="${portalPath}/js/header/init_left_menu_current.js"></script>
    <script src="${portalPath}/js/version.js"></script>
    <script src="${portalPath}/js/wx_dialog.js"></script>
    <script type="text/javascript">
        var baseUrl = '${basePath}';
    </script>
    <decorator:head/>
</head>

<body>
<div class="loading" id="updateItemsLoadingDiv" style="display: none;">
    <img src="${basePath}/static/img/loading.gif"/>
    <span>正在同步宝贝中…</span>
</div>
<div class="top clearfix">
    <div class="center">
        <div class="top_bar">
            <div class="logo">
            </div>
            <div class="top_link">
                <a class="top_link_B" href="javascript:bookmark();">收藏</a>
                <a class="top_link_C" target="_blank"
                   href="${portalPath}short_url.jsp">下载</a>
                <a class="top_link_D" href="javascript:void(0);">同步</a>
            </div>
            <div class="top_user_info">
                <span id="wangwang_span"></span>
                您好，${sessionScope.SESSION_USER_DATA.DISPLAY_NICK}！
                <a href="${basePath}logout.action">退出</a>
            </div>
        </div>
        <div id="div_menu"></div>
        <div class="clear"></div>
        <div class="center">
            <div id="banner_div">
            </div>
        </div>
        <div class="clear"></div>
        <div class="center">
            <div id="tip_div"></div>
        </div>
    </div>
</div>
<div class="center clearfix" id="main">
    <div class="left marginTop clearfix">
        <div class="left_nav">
            <ul id="ul_left_nav">
                <li class="left_nav_title">
                    客户管理
                </li>
                <li id="left_nav_1_1">
                    <a href="${ctx}/customer/#main">客户管理</a>
                </li>
                <li class="left_nav_title">
                    订单管理
                </li>
                <li id="left_nav_2_1">
                    <a href="${ctx}/trade/#main">订单管理</a>
                </li>
                <li id="left_nav_2_2">
                    <a href="${basePath}jsp/fileUpload.jsp">导入历史订单</a>
                </li>
                <li class="left_nav_title">
                    使用帮助
                </li>
                <li>
                    <a target="_blank" href="#">帮助文档</a>
                </li>
                <li>
                    <a target="_blank" href="#">视频教程</a>
                </li>
            </ul>
        </div>

    </div>
    <div class="right clearfix">
        <decorator:body/>
    </div>
</div>
<%@ include file="/WEB-INF/layouts/footer.jsp" %>
</body>
</html>
