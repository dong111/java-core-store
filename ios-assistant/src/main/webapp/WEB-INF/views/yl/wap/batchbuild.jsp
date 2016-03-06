<%@ page import="com.yitaosoft.entity.wapDesc.Task" %>
<%@ page import="java.util.List" %>
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
    <link href="<%=basePath%>static/css/sonpage.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>/static/css/yl/wap.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=basePath%>static/js/wap/yitao-tool.js"></script>
    <script type="text/javascript" src="<%=basePath%>/static/js/wap/batchbuild.js?v=20150113"></script>
    <script type="text/javascript" src="<%=basePath%>/static/js/wap/show_dialog.js?v=20150113"></script>
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
<%@ include file="../../common/filtModuleDialog.jsp" %>
<%@ include file="../../common/filtModuleDemo.jsp" %>

<div class="right-nav">    <!--分类title开始-->
    <div class="step-2-content">
        <div class="depot-left imitate_select sort_select_07 select_result">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_07" data-value="-8" value="全部状态">
            <input type="hidden" id="wapStatus" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_08"></i></div>
            <ul class="Imitate_select_list" id="wap_status_ul" style="display: none;">
                <li data="-8" title="全部状态" class="">全部状态</li>
                <li data="-1" title="未发布" class="">未发布</li>
                <li data="0" title="发布中" class="">发布中</li>
                <li data="4" title="已发布图文" class="">已发布图文</li>
                <li data="3" title="已发布图片" class="">已发布图片</li>
            </ul>
        </div>
        <div class="depot-left imitate_select sort_select_05 select_result">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_05" data-value="onsale" value="出售中">
            <input type="hidden" id="approveStatus" value="onsale"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_06"></i></div>
            <ul class="Imitate_select_list" id="approve_status_ul" style="display: none;">
                <li data="onsale" title="出售中" class="">出售中</li>
                <li data="instock" title="仓库中" class="">仓库中</li>
            </ul>
        </div>
        <div class="depot-left imitate_select sort_select_01 select_result">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_01" data-value="-8" value="自定义类目">
            <input type="hidden" id="seller_cid" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_02"></i></div>
            <ul class="Imitate_select_list" id="seller_cids_ul" style="display: none;"></ul>
        </div>
        <div class="depot-left imitate_select sort_select_03 select_result">
            <input type="text" class="input_text Imitate_select_text" style="padding: 0 8px;"
                   id="sort_select_id_03" data-value="-8" value="自动分类类目">
            <input type="hidden" id="top_seller_cid" value="-8"/>

            <div class="Imitate_select_btn"><i id="sort_select_id_04"></i></div>
            <ul class="Imitate_select_list" id="top_seller_cids_ul" style="display: none;"></ul>
        </div>
        <div class="search">
            <form>
                    <span class="keyword">
                        <input type="text" value="输入宝贝关键字或链接" id="search-key" title="输入宝贝关键字或链接">
                    </span>
                <span id="search-icon" class="search-icon"><i class="list-icon i-search"></i></span>
            </form>
        </div>
    </div>
    <!--宝贝信息开始-->
    <table id="itemList" class="item-table" cellpadding="0" cellspacing="0" width="770" style="">
        <thead><tr>
            <th colspan="2" align="left" class="category-content th-category">
                    <span class="chklist"><label class="checkbox-fx checked-fx" name="SelectAll" style="line-height: 17px;width: 110px;margin-right: 10px;">全选全部宝贝</label></span>
					<span class="chklist"><label class="checkbox-fx checked-fx" name="SelectCurrentPage" style="line-height: 17px;width: 110px;">全选当前页</label></span>
            </th>
            <th colspan="3" style="text-align: right">
                <a onclick="syncItemList()" class="tzs-btn btn-xlarge dark-blue" style="line-height: 24px;">同步宝贝</a>&nbsp;
            </th>
        </tr>
        <tr>
            <th align="left" width="70">选择</th>
            <th align="left" width="350">宝贝名称 </th>
            <th align="left" width="200">操作时间</th>
            <th align="left" width="150">状态</th>
            <th align="left" width="100">编辑</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <!--分页开始-->
    <div class="query-page">
        <div id="pager_history" class="scott"  style="width: 800px;margin-left: -150px;">

        </div>
    </div>
    <div class="clear line" style="height:40px;"></div>
    <div id="batch-chk" class="multi">
        <span class="chklist"><input type="checkbox" style="display: none;"><label  id="skip" class="checkbox-fx checked-fx" style="margin-right:20px;">过滤已发布手机详情的宝贝</label></span>
        <span class="chklist"><input type="checkbox" style="display: none;"><label id="filtModule" class="checkbox-fx checked-fx">过滤详情页模板</label></span>
        <a href="javascript:showFilterDemo()"><img src="<%=basePath%>static/imges/query.png"  style="position:absolute;margin-top: 4px;"></a>
    </div><br>
    <div id="btn-center" class="btn-center" style="margin:20px 0 30px 0;">
        <a onclick="batchTwSave()" class="tzs-btn btn-xlarge dark-blue">批量发布图文</a>&nbsp;
        <a onclick="batchTpSave()" class="tzs-btn btn-xlarge dark-blue">批量发布图片</a>
    </div>
</div>

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
<input type="hidden" id="left_nav_current_id" value="left_nav_1_1">
<input type="hidden" id="filtModuleSingle" value="1">
</div>
</body>
</html>