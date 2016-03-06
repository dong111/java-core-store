<%@ page import="com.yitaosoft.common.YitaoProject" %>
<%@ page import="com.yitaosoft.entity.wapDesc.User" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="yitao" uri="http://www.yitaosoft.com/tag/yitao" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	User user = (User) session.getAttribute("USER");
	String path = request.getContextPath();
	String port = request.getServerPort() == 80 ? "" : ":" + request.getServerPort();
	String basePath = request.getScheme() + "://" + request.getServerName() + port + path + "/";
	int projectId = YitaoProject.WAP.getProjectId();
	int version = user.getVersionCode();
%>
<!DOCTYPE html>
<html>
<head>
	<yitao:head title="手机详情"/>
	<yitao:static pathType="project">

	</yitao:static>
	<decorator:head/>
</head>
<body>
<div class="content-container clearfix">
	<div class="yt-left-nav">
	</div>
	<div class="right-content">
		<decorator:body/>
	</div>
</div>

<yitao:addContent index="0">
	<yitao:static pathType="common">common/js/init/ybll.js</yitao:static>
	<yitao:static pathType="project">
	</yitao:static>
	<script type="text/javascript">
		//全局变量设置
		window.System = {};
		System.baseUrl = window.baseUrl = '<%=basePath%>';
	</script>
</yitao:addContent>
<yitao:foot projectId="<%=projectId%>" versionCode="<%=version%>"/>

<input type="hidden" id="left_nav_current_id" value="left_nav_<%=projectId%>"/>
</body>
</html>
