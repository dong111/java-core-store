<%@ page import="com.yitaosoft.utils.wap.JsonUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page import="com.yitaosoft.entity.wapDesc.User" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
           prefix="decorator" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("basePath", basePath);
    Object user = session.getAttribute("USER");
    String portalPath = "http://yinliu.zhushou001.com/";
    String staticCommonPath = "http://static.zhushou001.com/common/";
%>
<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript">
        //全局变量设置
        window.System = {};
        System.baseUrl = window.baseUrl = '${basePath}';
        System.user = ${USER}
        System.time = new Date(<%=System.currentTimeMillis()%>);
        //兼容已经使用的全局baseUrl
        if (!window.App) {
            window.App = {};
        }
        ///当前选中的宝贝Map
        App.module = <%=JsonUtils.alwaysJsonMapper.toJson(request.getAttribute("pageResult"))%>;
        if (App.module != null) {
            !App.module.itemIds && (App.module.itemIds = []);
            !App.module.items && (App.module.items = {});
            !App.module.pros && (App.module.pros = {});
            //保证pros中的对象和items为同一个对象
            App.module.pros.items = App.module.items;
        }


        function bookmark() {
            var title = document.title
            var url = document.location.href
            if (window.sidebar) window.sidebar.addPanel(title, url, "");
            else if (window.opera && window.print) {
                var mbm = document.createElement('a');
                mbm.setAttribute('rel', 'sidebar');
                mbm.setAttribute('href', url);
                mbm.setAttribute('title', title);
                mbm.click();
            }
            else if (document.all) window.external.AddFavorite(url, title);
        }
        function syncItemData() {
            $('#updateItemsLoadingDiv').show();
            $.post("updateItemDataSession.action", "", function () {
                $('#updateItemsLoadingDiv').hide();
                return;
            });
        }
        // ]]>
    </script>
    <title>淘助手_引流工具平台</title>
    <link type="image/x-icon" rel="icon"
          href="<%=basePath%>static/img/favicon.ico"/>
    <%--<link href="<%=basePath%>/static/css/recommend.css" rel="stylesheet"--%>
    <%--type="text/css" />--%>
    <link href="<%=portalPath%>css/base.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=basePath%>static/css/jquery-ui/jquery-ui-1.8.11.custom.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=basePath%>static/css/jquery-ui/jquery.ui.spinner.css" rel="stylesheet"
          type="text/css"/>
    <script src="<%=basePath%>static/js/base/PNG_Transparence.js"></script>
    <script src="<%=basePath%>static/js/wap/myDialog.js"></script>
    <script src="<%=basePath%>static/js/versionMsg.js"></script>
    <%--<script src="<%=basePath%>static/js/jquery/jquery-1.7.2.min.js"--%>
    <%--type="text/javascript"></script>--%>
    <script src="<%=basePath%>static/js/jquery/jquery-1.7.2.min.js"
            type="text/javascript"></script>
    <script src="<%=basePath%>static/js/jquery/jquery-ui-1.8.11.custom.min.js"
            type="text/javascript"></script>
    <script src="<%=staticCommonPath%>js/authority/authority-validate.js" type="text/javascript"></script>
    <script src="<%=basePath%>static/js/jquery/jquery.ui.spinner.min.js"
            type="text/javascript"></script>
    <script src="<%=basePath%>static/js/jquery/jquery.pagination.js"
            type="text/javascript"></script>
    <script
            src="<%=portalPath%>js/header/header_config.js?t=<%=System.currentTimeMillis()%>"></script>
    <script src="<%=portalPath%>js/header/init_banner.js"></script>
    <script src="<%=portalPath%>js/header/init_nav.js"></script>
    <script src="<%=portalPath%>js/header/init_tip.js"></script>
    <script src="<%=portalPath%>js/header/init_wangwang.js"></script>
    <%--引流版本控制js--%>
    <%--<script src="<%=staticCommonPath%>js/version/version.js"></script>--%>
    <link href="http://yingxiao.zhushou001.com/css/dialog.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css"
          href="<%=staticCommonPath%>css/dialog.css"/>
    <link href="http://yingxiao.zhushou001.com/new_css/base20130702.css" rel="stylesheet" type="text/css"/>
    <%--<script src="http://yingxiao.zhushou001.com/js/wx_dialog.js"></script>--%>
    <script src="<%=basePath%>static/js/wx_dialog.js" type="text/javascript"></script>
    <script src="<%=portalPath%>js/version.js"></script>
    <%--<script src="<%=staticCommonPath%>js/dialog/wx_dialog_min.js"></script>--%>
    <!-- 弹窗 -->
    <%--<script type="text/javascript" src="http://bi.zhushou001.com/set/api/v1/dialog/101007/${sessionScope.SESSION_USER_DATA.USER_ID}.js--%>
    <%--?date=<%=System.currentTimeMillis()%>"></script>--%>

    <%--<script type="text/javascript" src="<%=staticCommonPath%>js/dialog/client_dialog.js"></script>--%>
    <%--<script type="text/javascript"--%>
    <%--src="http://bi.zhushou001.com/set/api/v1/dialog/102004/137009487.js?date=1403162055853"></script>--%>
    <%--<script type="text/javascript"--%>
    <%--src="http://static.zhushou001.com/common/js/dialog/client_dialog.js"></script>--%>


    <%--引流版本控制js--%>

    <script src="<%=portalPath%>js/header/init_header.js"></script>
    <script src="<%=portalPath%>js/header/init_left_menu_current.js"></script>
    <script type="text/javascript">
        var serverTime = new Date(<%=System.currentTimeMillis() %>);
        //引流版本控制
        function versionControl(id) {
            var versionId = $('#versionId').val();
            if (versionId < id) {
                var shoujiStr = formatStr("手机详情");
                showDialogAndMessage("不能使用" + shoujiStr + "，如需使用，请升级为高级版！", 300, 200)
                return true;
            } else {
                return false;
            }

        }

    </script>

    <decorator:head/>
    <%--<link href="<%=basePath%>/static/css/base.css" rel="stylesheet" type="text/css" />--%>
</head>

<body>
<%--<div class="loading" id="updateItemsLoadingDiv" style="display: none;">--%>
    <%--<img src="<%=basePath%>/static/img/loadding.gif"/>--%>
    <%--<span>正在同步宝贝中…</span>--%>
<%--</div>--%>
<div class="top">
    <div class="center">
        <div class="top_bar">
            <div class="logo"></div>
            <div class="top_link">
                <a class="top_link_B" href="javascript:bookmark();">收藏</a>
                <a class="top_link_C" target="_blank"
                   href="<%=portalPath %>short_url.jsp">下载</a>
                <a class="top_link_D" href="javascript:syncItemData();">同步</a>
            </div>
            <div class="top_user_info">
                <span id="wangwang_span"></span>您好，<span
                    class="f14 org">${sessionScope.SESSION_USER_DATA.DISPLAY_NICK}! </span> <a
                    href="<%=basePath%>logout.action">退出</a>
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
            initHeader("wap", {nav_current: "手机详情", son_nav_current: "手机详情"});
        </script>
        <div class="clear"></div>
    </div>
</div>
<div class="center">
    <div class="left marginTop">
        <div class="left_nav" style="width:193px;">
            <ul>
                <li class="left_nav_title">生成手机详情</li>
                <li id="left_nav_1_1"><a href="<%=basePath%>${sessionScope.floder}/wap/batchbuild">批量/单个发布</a></li>
                <%--<li id="left_nav_1_2"><a href="<%=basePath%>${sessionScope.floder}/wap/quandian">全店发布</a></li>--%>
                <li id="left_nav_1_3"><a href="<%=basePath%>${sessionScope.floder}/task/list">发布记录</a></li>
                <li id="left_nav_1_4"><a href="<%=basePath%>${sessionScope.floder}/wap/wapDown">老版cvs文件下载</a></li>
                <li class="left_nav_title">
                    使用帮助
                </li>
                <li>
                    <a target="_blank"
                       href="http://bangpai.taobao.com/group/thread/1242508-290397915.htm?spm=0.0.0.0.w4jUbx">帮助文档</a>
                </li>
                <li id="left_nav_3_2">
                    <a target="_blank" href="<%=basePath%>${sessionScope.floder}/video/helpVideo">视频教程</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="right marginTop">
        <decorator:body/>
    </div>
</div>
<script src="<%=basePath%>static/js/jquery/underscore.js"></script>
<script type="text/javascript">
    _.templateSettings = {
        evaluate: /\{\%(.+?)\%\}/g,
        interpolate: /\{\%=(.+?)\%\}/g,
        escape: /\{\%-(.+?)\%\}/g
    };
</script>

<div class="clear"></div>
<div class="center">
    <div class="copyRight">
        <div class="foot_logo"></div>
        <ul>
            <li>Copyright © 2010 - 2012 YITAOSOFT. All Rights Reserved.</li>
            <li>易淘软件科技有限公司 版权所有 浙ICP备11061471号-2</li>
        </ul>
    </div>
</div>

<!-- 弹窗 -->
<input type="hidden" id="userId" value="${sessionScope.SESSION_USER_DATA.USER_ID}"/>

<input type="hidden" id="versionId"
       value="${sessionScope.versionCtrol}"/>
<input type="hidden" id="versionName"
       value="${sessionScope.versionName}"/>
<input type="hidden" id="charge_item_code" value="${sessionScope.itemCode}"/>
<input type="hidden" id="hidden_basepath_url" value="<%=basePath%>"/>
<input type="hidden" id="floderCtrol" value="${sessionScope.floder}">
<input type="hidden" id="loginSign" value="${sessionScope.loginSign}">
<input type="hidden" id="userShopType" value="${sessionScope.userShopType}">
<input type="hidden" id="proName" value="yl">

<div id="version_dialog_divs"></div>

</body>
</html>
