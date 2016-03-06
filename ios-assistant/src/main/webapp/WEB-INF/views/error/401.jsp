<%@ page contentType="text/html;charset=UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>401 - 淘宝授权接口错误</title>
</head>

<body>
<h2>401 - 淘宝授权接口错误.</h2>

<p>${msg}</p>

<p><a href="<c:url value="/"/>">返回首页</a></p>
</body>
</html>
