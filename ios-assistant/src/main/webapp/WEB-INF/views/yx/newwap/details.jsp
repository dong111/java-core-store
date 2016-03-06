<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="yitao" uri="http://www.yitaosoft.com/tag/yitao" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String port = request.getServerPort() == 80 ? "" : ":" + request.getServerPort();
    String basePath = request.getScheme() + "://" + request.getServerName() + port + path + "/";
    String taskId = request.getParameter("taskId");
    String status = request.getParameter("status");
    if (StringUtils.isBlank(status)){
        status = "3";
    }
%>
<html>
<head>
    <yitao:addContent index="1">
        <yitao:static pathType="project">
            static/css/wap/phonetinfo.css
            static/js/wap/yitao-tool.js
            static/js/wap/newjs/detail.js
        </yitao:static>
    </yitao:addContent>
</head>
<body class="container">
<div class="phonetinfo">
    <div class="operating-record">
        <div class="detail-records">
            <a href="javascript:void(0)" style="color: #333;font-size: 15px;">详情记录（<span id="count-lab"></span>）</a>
            <a href="javascript:void(0)" style="margin-left: 15px;" class="sync-btn">刷新宝贝</a>
        </div>
        <div class="sync-cowry">
            <a href="<%=basePath%>yx/newwap/batchpublish?type=history">返回操作记录&gt;&gt;</a>
        </div>
    </div>


    <div class="row-spaces select-item project-team">
        <div class="clearfix">
            <div class="ui-custom">
                <div class="clearfix js-display-seller-cat">
                    <span class="current js-cat-name">自定义宝贝分类</span>

                    <div class="text-entire ">
                        <input class="form-control input-xs js-display-names" type="text" value="全部" readonly>
                        <span class="caret"></span>
                    </div>
                </div>
                <div id="seller_cats" class="search-cats">

                </div>
            </div>
            <div class="ui-custom">
                <div class="clearfix js-display-item-cat">
                    <span class="todo js-cat-name">自动宝贝分类</span>

                    <div class="text-entire">
                        <input class="form-control input-xs js-display-names" type="text" value="全部" readonly>
                        <span class="caret"></span>
                    </div>
                </div>
                <div id="item_cats" class="search-cats">

                </div>
            </div>
            <div class="input-group pull-left" style="width: 282px;">
                <input type="text" id="item_keywords" class="form-control" aria-label="Amount (to the nearest dollar)"
                       value="输入宝贝关键字或链接">
                <span class="input-group-btn">
                    <button class="btn btn-default glyphicon glyphicon-search" type="button"></button>
                </span>
            </div>
        </div>
        <div class="clearfix" style="margin-top: 20px">
            <div class="a-options pull-left approve_Status" style="width: 338px;">
                <a href="javascript:void(0)" class="current" data-status="">全部</a>
                <a href="javascript:void(0)" data-status="onsale">出售中的宝贝</a>
                <a href="javascript:void(0)" data-status="instock">仓库中的宝贝</a>
            </div>
            <div class="a-options pull-left item-wap-status">
                <a href="javascript:void(0)" data-status="3" class="current">全部宝贝</a>
                <a href="javascript:void(0)" data-status="1">发布中宝贝</a>
                <a href="javascript:void(0)" data-status="2">发布成功宝贝</a>
                <a href="javascript:void(0)" data-status="4">发布失败宝贝</a>
                <a href="javascript:void(0)" data-status="6">已过滤</a>
            </div>
        </div>
    </div>

    <table class="table">
        <thead>
        <tr>
            <th>宝贝名称</th>
            <th>操作时间</th>
            <th>状态</th>
            <th>说明</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody class="details-list">
        </tbody>
    </table>
    <div id="details-pagination">

    </div>

    <%@include file="./wap_dialog.jsp"%>

</div>


<input type="hidden" id="taskId_hid" value="<%=taskId%>"/>
<input type="hidden" id="status_hid" value="<%=status%>"/>











<div class="modal fade task-setttings">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-dialog" data-name="task-setttings" data-dixsiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body clearfix">
                该宝贝取消过滤模板设置，将重新生成。
            </div>
            <div class="modal-footer">
                <div class="col-xs-4 col-xs-offset-3">
                    <button type="button" class="btn btn-primary sure-retry"  data-name="task-setttings">确定</button>
                    <button type="button" class="btn btn-default close-dialog" data-name="task-setttings" data-dixsiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>







<script id="detail_list_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var task = list[i];%}
    <tr>
        <td scope="row" width="376px">
            <a href="http://item.taobao.com/item.htm?id={%=task.iid%}" target="_blank">
            <img src="{%=task.itemPic%}" class="pull-left" width="80" height="80">
            </a>
            <div class="product-info">
                <a href="http://item.taobao.com/item.htm?id={%=task.iid%}" target="_blank">{%=task.itemTitle%}</a>
            </div>
        </td>
        <td>{%=task.updateDateTime%}</td>
        <td width="98">
            {%if(task.status == 2){%}
            <span class="b-green">已发布</span>
            {%}else if(task.status == 0 || task.status ==1){%}
            <span class="b-orange">发布中</span>
            {%}else if(task.status == 6){%}
            <span class="b-orange">已过滤</span>
            {%}else{%}
            <span class="b-orange">发布失败</span>
            {%}%}
        </td>
        {%if(task.status == 4){%}
        <td width="180px">
            {%=task.exeMessage%}
            <%--提供操作--%>
            {%if(task.exeMessage.indexOf("不过滤模板")>0){%}

            {%}else if(task.exeMessage.indexOf("添加详情图片")>0){%}
            <a href="https://upload.taobao.com/auction/publish/edit.htm?item_num_id={%=task.iid%}"
               target="_blank">编辑</a>
            {%}%}
        </td>
        {%if(task.exeMessage.indexOf("不过滤模板")>0){%}
        <td class="{%=task.iid%}-retry" data-value="unfitmod">{%=task.deploy%}</td>
        {%}else{%}
        <td>{%=task.deploy%}</td>
        {%}%}
        {%}else if(task.status == 6){%}
        <td width="180px">{%=task.exeMessage%}</td>
        <td><a href="javascript:void(0);" class="preview_btn" data-id="{%=task.id%}" data-val="{%=task.iid%}">查看已有手机详情</a>
        </td>
        {%}else if(task.status == 2){%}
        {%if(status == ""){%}
        <td></td>
        {%}%}
        <td width="200px"><a href="javascript:void(0);" class="preview_btn" data-id="{%=task.id%}" data-val="{%=task.iid%}">查看手机详情</a> |
            <a  href="javascript:detailsFinder.retry({%=task.id%},{%=task.iid%});">重新发布</a>
        </td>
        {%}else if(status == ""){%}
        <td></td>
        <td></td>
        {%}%}
    </tr>
    {%}%}
    {%}else{%}
    <tr><td colspan="7" style="text-align: center;">
        <div>
            <div>暂时没有手机详情发布记录.</div>
        </div></td></tr>
    {%}%}
</script>







</body>
</html>