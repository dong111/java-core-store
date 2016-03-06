<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("basePath",basePath);
    String portalPath = "http://yinliu.zhushou001.com/";
%>
<html>
<head>
    <link href="<%=basePath%>/static/css/wap.css" rel="stylesheet" type="text/css" />
   <%--<script type="text/javascript" src="<%=basePath%>static/js/jquery/jquery.pagination.js"></script>--%>
   <script type="text/javascript" src="<%=basePath%>static/js/wap/wapDown.js"></script>
</head>

<body>
<div class="depot-content">
    <div class="depot-title">CSV文件
    </div>
    <table class="item-table list-table" style="margin: 10px 15px 0 15px;" cellpadding="0" cellspacing="0" width="970">
        <thead><tr>
            <th width="50" align="left">序号</th>
            <th width="200" align="left">文件名称</th>
            <th width="200" align="left">生成时间</th>
            <th width="150" align="left">状态</th>
            <th width="150" align="left">进度</th>
            <th align="left">操作</th>
        </tr>
        </thead>
        <tbody id="wap_container">
        </tbody></table>
    <div class="scott" id="listItemsPager">

    </div>
</div>
<script id="wap_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var csv = list[i];%}
    {%  var array =  csv.filepath.split("/");%}
    {%  var fileName =  array[array.length-1];%}
        <tr>
            <td>{%=csv.index%}</td>
            <td>{%=fileName%}</td>
            <td>{%=csv.createTime%}</td>
            <td>{%=csv.statusDesc%}</td>
            <td>{%=csv.percent%}%</td>
            <td>
                {%=csv.opration%}
             </td>
        </tr>
    {%}%}
    {%}else{%}
    <tr><td colspan="6" style="text-align: center;">
        您没有老版CSV文件下载！
        </td></tr>
    {%}%}
</script>
<input id="left_nav_current_id" type="hidden" value="left_nav_1_4">
</body>
</html>