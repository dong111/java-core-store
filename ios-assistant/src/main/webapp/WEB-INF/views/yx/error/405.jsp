<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="org.springframework.http.HttpStatus" %>

<%response.setStatus(HttpStatus.BAD_REQUEST.value());%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="author" content="易淘软件"/>
    <title>405 - 请求方法不被支持</title>
</head>

<body>
错误码:<%=request.getAttribute("javax.servlet.error.status_code")%><br>
信息:<%=request.getAttribute("javax.servlet.error.message")%><br>
异常:<%=request.getAttribute("javax.servlet.error.exception_type")%><br>
</body>
</html>
