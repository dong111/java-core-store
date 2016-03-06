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
    <link href="<%=basePath%>/static/css/yl/wap.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>static/css/sonpage.css" rel="stylesheet" type="text/css" />
   <script type="text/javascript" src="<%=basePath%>static/js/wap/record.js"></script>
    <%--<style type="text/css">--%>
        <%--div.scott {--%>
            <%--padding-right: 3px;--%>
            <%--padding-left: 3px;--%>
            <%--padding-bottom: 0px;--%>
            <%--margin: 3px;--%>
            <%--padding-top: 3px;--%>
            <%--text-align: center--%>
        <%--}--%>

        <%--div.scott a {--%>
            <%--background: #FFF;--%>
            <%--border: #ddd 1px solid;--%>
            <%--padding-right: 5px;--%>
            <%--padding-left: 5px;--%>
            <%--padding-bottom: 2px;--%>
            <%--color: #88af3f;--%>
            <%--margin-right: 2px;--%>
            <%--padding-top: 2px;--%>
            <%--text-decoration: none;--%>
        <%--}--%>

        <%--div.scott a:hover {--%>
            <%--border: #85bd1e 1px solid;--%>
            <%--color: #638425;--%>
            <%--background-color: #f1ffd6;--%>
        <%--}--%>

        <%--div.scott a:active {--%>
            <%--border: #85bd1e 1px solid;--%>
            <%--background-color: #f1ffd6;--%>
        <%--}--%>

        <%--div.scott span.current {--%>
            <%--border: #b2e05d 1px solid;--%>
            <%--padding-right: 5px;--%>
            <%--padding-left: 5px;--%>
            <%--font-weight: bold;--%>
            <%--padding-bottom: 2px;--%>
            <%--color: #fff;--%>
            <%--margin-right: 2px;--%>
            <%--padding-top: 2px;--%>
            <%--background-color: #b2e05d--%>
        <%--}--%>

        <%--div.scott span.disabled {--%>
            <%--border: #ddd 1px solid;--%>
            <%--padding-right: 5px;--%>
            <%--padding-bottom: 2px;--%>
            <%--color: #ccc;--%>
            <%--margin-right: 2px;--%>
            <%--padding-top: 2px;--%>
        <%--}--%>
        <%--.btn_gray_small {--%>
            <%--display: inline-block;--%>
            <%--height: 20px;--%>
            <%--line-height: 20px;--%>
            <%--padding: 0px 10px;--%>
            <%--background-color: #EEE;--%>
            <%--border: 1px solid #CCC;--%>
            <%--margin: 0px 5px;--%>
            <%--font-size: 12px;--%>
            <%--font-family: "宋体";--%>
            <%--color: #000;--%>
        <%--}--%>
    <%--</style>--%>
</head>

<body>
<div class="right-nav" style="border: none;">
<div class="depot-content">
    <div class="depot-title">操作记录
        <div class="right" style="width:120px;">
            <a class="tzs-btn btn-large dark-blue" id="syn_task" style="margin-right: 20px;margin-top:-3px;text-indent: 0px;">刷新任务</a>
            <%--<a href="javascript:record.load();" class="tzs-btn btn-large green" style="margin-right: 20px;margin-top:-3px;text-indent: 0px;">刷新任务</a>--%>
        </div>
    </div>
    <table class="item-table list-table" style="margin: 10px 15px 0 15px;" cellpadding="0" cellspacing="0" width="778">
        <thead><tr>
            <th width="170" align="left">操作时间</th>
            <th width="80" align="left">成功数</th>
            <th width="80" align="left">失败数</th>
            <th width="100" align="left">发布进度</th>
            <th width="160" align="left">发布类型</th>
            <th width="100" align="left">状态</th>
            <th align="left">操作</th>
        </tr>
        </thead>
        <tbody id="tasks_container">
        </tbody></table>

    <div class="scott" id="listItemsPager">

    </div>
    <div class="clear" style="height: 15px;"></div>
</div>
<script id="record_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var task = list[i];%}
        <tr>
            <td>{%=task.createDateTime%}</td>
            <td><a href="../wap/recordList?taskId={%=task.id%}&status=2">{%=task.successCount%}</a></td>
            <td><a href="../wap/recordList?taskId={%=task.id%}&status=4">{%=task.failCount%}</a></td>
            <td>{%=task.successCount+task.failCount+task.filterCount%}/{%=task.totalCount%}</td>
            <td>{%=task.name%}</td>
            <td>{%var finishedCount = task.successCount + task.failCount + task.filterCount;%}
                {%if(task.successCount + task.filterCount + task.failCount == task.totalCount){%}
                已完成
                {%} else if(finishedCount == task.totalCount && task.successCount > 0){%}
                部分成功
                {%} else if(task.failCount == task.totalCount){%}
                失败
                {%}else{%}
                进行中
                {%}%}
            </td>
            <td> {%if(task.failCount > 0){%}
                <a href="../wap/recordList?taskId={%=task.id%}&status=4">查看失败宝贝 </a>
                {%}%}
                <a href="../wap/recordList?taskId={%=task.id%}">查看详情</a>
             </td>
        </tr>
    {%}%}
    {%}else{%}
    <tr><td colspan="7" style="text-align: center;"><div>
        <div style="line-height: 35px;"><img style="width: 63px;height: 60px;" src="<%=basePath%>static/img/lmt.png" />暂时没有手机详情发布记录.</div>
        <div style="line-height: 35px;">发布宝贝手机详情可以提升买家在亲店铺移动端的浏览体验，并提升淘宝移动端流量，现在就来试试吧！</div>
        <div style="line-height: 35px;">&nbsp;&nbsp;&nbsp;&nbsp;<a href="../wap/batchbuild">批量发布手机详情</a></div>
    </div></td></tr>
    {%}%}
</script>
<input id="left_nav_current_id" type="hidden" value="left_nav_1_3">
</div>
</body>
</html>