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
    <link href="<%=basePath%>/static/css/sonpage.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=basePath%>static/js/wap/yitao-tool.js"></script>
   <script type="text/javascript" src="<%=basePath%>static/js/wap/recordList.js"></script>
   <script type="text/javascript" src="<%=basePath%>static/js/wap/show_dialog.js"></script>
    <style type="text/css">
        .input_text {
            background-color: #FFF;
            border: 1px solid #D3D3D3;
            padding: 2px 8px;
        }
    </style>
</head>

<body>
<%@ include file="../../common/wapPreview.jsp" %>
<%@ include file="../../common/wapEditPreview.jsp" %>
<div class="intercept_record">
    <div class="list-type">
        <ul id="type_option">
            <li class="current" id="status_3" >
                <%--<a href="javascript:void(0);" >全部宝贝(<span ></span>)</a>--%>
                <a href="javascript:void(0);" >全部宝贝<span ></span></a>
            </li>
            <li id="status_1" data-val="1">
                <%--<a href="javascript:void(0);" >发布中宝贝(<span ></span>)</a>--%>
                <a href="javascript:void(0);" >发布中宝贝<span ></span></a>
            </li>
            <li id="status_2" data-val="2">
                <%--<a href="javascript:void(0);" >发布成功宝贝(<span ></span>)</a>--%>
                <a href="javascript:void(0);" >发布成功宝贝<span ></span></a>
            </li>
            <li id="status_4" data-val="4">
                <%--<a href="javascript:void(0);" >发布失败宝贝(<span></span>)</a>--%>
                <a href="javascript:void(0);" >发布失败宝贝<span></span></a>
            </li>
            <li id="status_6" data-val="6">
                <%--<a href="javascript:void(0);" >已过滤(<span></span>)</a>--%>
                <a href="javascript:void(0);" >已过滤<span></span></a>
            </li>
        </ul>
        <div class="right" style="width:140px;">
            <a href="../wap/record" class="tzs-btn btn-large green" style="margin-right: 20px;margin-top:10px;">查看已有计划</a>
        </div>
    </div>
</div>
<div class="clear" style="height:10px;"></div>
<div class="depot-option">
    <div class="depot-type">
        <div class="depot-left imitate_select sort_select_05 select_result margin-10">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_05" data-value="-8" value="全部">
            <input type="hidden" id="approveStatus" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_06"></i></div>
            <ul class="Imitate_select_list" id="approve_status_ul" style="display: none;">
                <li data="-8" title="全部" class="">全部</li>
                <li data="onsale" title="出售中" class="">出售中</li>
                <li data="instock" title="仓库中" class="">仓库中</li>
            </ul>
        </div>
        <div class="depot-left imitate_select sort_select_01 select_result margin-10">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_01" data-value="-8" value="自定义类目">
            <input type="hidden" id="seller_cid" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_02"></i></div>
            <ul class="Imitate_select_list" id="seller_cids_ul" style="display: none;"></ul>
        </div>
        <div class="depot-left imitate_select sort_select_03 select_result margin-10">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_03" data-value="-8" value="自动分类类目">
            <input type="hidden" id="top_seller_cid" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_04"></i></div>
            <ul class="Imitate_select_list" id="top_seller_cids_ul" style="display: none;"></ul>
        </div>
        <div class="depot-left margin-10">
            关键字：
            <input class="input-text-1 input-height-28 input-250" id="keywords" value="关键字、链接">
        </div>
        <div class="depot-left margin-5">
            <a class="tzs-btn btn-large dark-blue" id="search">搜索</a>
        </div>
        <div class="depot-left margin-5" style="margin-top: 2px;">
            共 <span class="b-red" id="record_list_count">0</span> 个宝贝
        </div>
    </div>
</div>
<table class="item-table depot-tab ck-table" cellpadding="0" cellspacing="0" width="1000" style="margin:0;margin-top:-1px;" id="taskList_container">
    <tr><td style="text-align: center;"> <img src="<%=basePath%>static/img/loading.gif"></td></tr>
</table>
<div class="scott" id="listItemsPager">


</div>
<div class="clear" style="height:40px;"></div>

<%--<div class="depot-content">--%>
    <%--<div class="depot-title">发布详情--%>
    <%--</div>--%>
    <%--<table class="item-table list-table" cellpadding="0" cellspacing="0" width="970">--%>
        <%--<thead><tr>--%>
            <%--<th width="200" align="left">操作时间</th>--%>
            <%--<th width="100" align="left">成功数</th>--%>
            <%--<th width="100" align="left">失败数</th>--%>
            <%--<th width="150" align="left">发布进度</th>--%>
            <%--<th width="150" align="left">发布类型</th>--%>
            <%--<th width="100" align="left">状态</th>--%>
            <%--<th align="left">操作</th>--%>
        <%--</tr>--%>
        <%--</thead>--%>
        <%--<tbody id="tasks_container">--%>
        <%--</tbody></table>--%>
    <%--<div class="query-page" id="listItemsPager">--%>

    <%--</div>--%>
<%--</div>--%>

<script id="cats_list_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var cat = list[i],name = cat.name;%}
    <li data="{%=cat.cid%}" title="{%=name%}">{%=name.length > 12 ? name.substr(0,11):name%}</li>
    {%}}else{%}
    <li data="-8">没有分类</li>
    {%}%}
</script>


<script id="top_cats_list_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var cat = list[i],name = cat.name;%}
    <li data="{%=cat.cid%}" title="{%=name%}">{%=name.length > 12 ? name.substr(0,11):name%}</li>
    {%}}else{%}
    <li data="-8">没有分类</li>
    {%}%}
</script>

<script id="record_list_template" type="text/template">
    <thead><tr>
        <th width="30%">宝贝名称</th>
        <th width="15%">操作时间</th>
        <th width="15%">状态</th>
        {%if(status == 4 ||status == 6|| status == ""){%}
            <th width="20%">说明</th>
        {%}%}
        {%if(status == 4 ||status == 2 ||status == 6|| status == ""){%}
            <th width="20%">操作</th>
        {%}%}
    </tr>
    </thead>
    <tbody  >
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var task = list[i];%}
        <tr>
            <td >
                    <span class="item_img" style="margin-right: 10px;">
                    <a href="http://item.taobao.com/item.htm?id={%=task.iid%}" target="_blank">
                        <img class="pic_list" src="{%=task.itemPic%}" style="width:60px;height:60px;">
                    </a>
                    </span>

                <div class="vertical-center" style="width: 200px;">
                    <a href="http://item.taobao.com/item.htm?id={%=task.iid%}" target="_blank">{%=task.itemTitle%}</a>
                </div>
            </td>
            <td>{%=task.updateDateTime%}</td>
            <td>
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
                <td>{%=task.exeMessage%}</td>
                <td>{%=task.deploy%}</td>
            {%}else if(task.status == 6){%}
            <td>{%=task.exeMessage%}</td>
            <td><a href="javascript:void(0);" class="preview_btn" data-id="{%=task.id%}" data-val="{%=task.iid%}">查看已有手机详情</a>
            </td>
            {%}else if(task.status == 2){%}
                {%if(status == ""){%}
                    <td></td>
                {%}%}
            <td><a href="javascript:void(0);" class="preview_btn" data-id="{%=task.id%}" data-val="{%=task.iid%}">查看手机详情</a> |
                <a  href="javascript:recordList.retry({%=task.id%},{%=task.iid%});">重新发布</a>
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
    </tbody>

</script>

<input id="left_nav_current_id" type="hidden" value="left_nav_1_3">
</body>
</html>