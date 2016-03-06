<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="yitao" uri="http://www.yitaosoft.com/tag/yitao" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String port = request.getServerPort() == 80 ? "" : ":" + request.getServerPort();
    String basePath = request.getScheme() + "://" + request.getServerName() + port + path + "/";
    String type = request.getParameter("type");
%>
<html>
<head>
    <yitao:addContent index="1">
        <yitao:static pathType="project">
            static/css/wap/phonetinfo.css
            static/js/wap/yitao-tool.js
            static/js/wap/newjs/record.js
            static/js/wap/newjs/batchpublish.js
        </yitao:static>
    </yitao:addContent>
</head>

<body class="container">
<div class="phonetinfo">
    <div class="bs-example">
        <ul class="nav nav-tabs">
            <li class="active">
                <a href="#" data-toggle="tab" data-tag="publish" aria-expanded="false">批量/单个发布</a>
            </li>
            <li>
                <a href="#" data-toggle="tab" data-tag="history" aria-expanded="true">操作记录</a>
            </li>
        </ul>
        <div class="sync-cowry" style="margin-right:0;">
            <button type="button" class="btn btn-primary pull-right sync-items-btn">同步宝贝</button>

            <div class="post-settings">
                <button type="button" class="btn btn-primary pull-right settings-btn">发布设置</button>
                <div class="release-way" style="display: none">
                    <div class="ui-close"><i class="glyphicon glyphicon-remove" style="right: -68px"></i></div>
                    <div style="margin: 10px;">
                        <span>图片详情：</span>
                        <input type="radio" class="js-yt-icheck" name="desc-node-type" data-type="1" checked> 图文方式
                        <input type="radio" class="js-yt-icheck" name="desc-node-type" data-type="0"> 图片方式
                    </div>
                    <div class="clearfix" style="margin: 10px;">
                        <span class="pull-left">过滤详情模板：&nbsp;</span>
                        <input type="checkbox" id="fltmod-options" class="js-yt-icheck"> 过滤详情页模板
                    </div>
                    <div class="clearfix" style="margin: 10px;">
                        <span class="pull-left">过滤已有详情：&nbsp;</span>
                        <input type="checkbox" id="skip-options" class="js-yt-icheck" checked> 过滤已有手机详情
                    </div>
                    <div class="clearfix" style="margin: 10px;">
                        <span class="pull-left">过滤超大详情：&nbsp;</span>
                        <input type="checkbox" id="del-more-options" class="js-yt-icheck">自动删除超2.5M部分详情
                    </div>
                    <div style="text-align: center;margin-bottom: 8px;"><button type="button" class="btn btn-primary settings-save">保存</button></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row-spaces select-item item-condition">
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
                <input type="text" id="item_keywords" class="form-control" aria-label="Amount (to the nearest dollar)" value="输入宝贝关键字或链接">
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
                <a href="javascript:void(0)" data-status="-8" class="current">全部状态</a>
                <a href="javascript:void(0)" data-status="-1">未发布</a>
                <a href="javascript:void(0)" data-status="0">发布中</a>
                <a href="javascript:void(0)" data-status="4">已发布图文</a>
                <a href="javascript:void(0)" data-status="3">已发布图片</a>
            </div>
        </div>
    </div>
    <div class="items-div">
        <div class="clearfix" style="padding: 0 20px 10px 20px;">
            <div class="pull-left" style="margin-top: 6px;width: 238px;">
                <input type="checkbox" class="js-yt-icheck item-select-all">
                <label class="pull-left" style="margin-right: 30px;">全选当前页</label>
            </div>
            <div id="items-pagination_top">

            </div>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>宝贝名称</th>
                <th>操作时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody id="item-list-tb">
            </tbody>
        </table>
        <div id="items-pagination" style="margin-bottom: 100px;">

        </div>
        <div class="right-bottmer">
            <div class="right-bottom-container clearfix text-center">
                <button type="button" class="btn btn-primary batch-publish-btn">&nbsp;批量发布&nbsp;</button>
            </div>
        </div>
    </div>

    <%@include file="./history.jsp"%>
    <%@include file="./wap_dialog.jsp"%>

</div>

<input type="hidden" id="type_hid" value="<%=type%>"/>


<!-- 列表的模板展示-->
<script id="template-item-list" type="text/template">
    {%if(items && items.length > 0){%}
    {%for(var i=0;i < items.length ; i++ ){%}
     {%  var item = items[i]; %}
    <tr class="item-tr" data-iid="{%=item.IID%}">
        <td scope="row" style="position: relative;">
            <div class="multiple-choice">
                <input type="checkbox" class="js-yt-icheck item-chk" data-iid="{%=item.IID%}">
            </div>
            <a href="https://item.taobao.com/item.htm?id={%=item.IID%}" target="_blank">
                <img src="{%=item.PIC_URL%}" class="pull-left" width="80" height="80">
            </a>
            <div class="pull-left description">
                <a href="https://item.taobao.com/item.htm?id={%=item.IID%}" target="_blank">{%=item.TITLE%}</a>
                <i class="glyphicon glyphicon-qrcode" data-iid="{%=item.IID%}"></i>
                {%if(item.STATUS_DESC=='未发布'||item.STATUS_DESC=='发布中'){%}
                    <i class="glyphicon glyphicon-phone text-danger" title="此宝贝未发布手机宝贝详情"></i>
                {%}else{%}
                <i class="glyphicon glyphicon-phone text-primary" title="此宝贝已发布手机宝贝详情"></i>
                {%}%}
            </div>
            <div>
                <i class="glyphicon-left"></i>
                <div class="right-tips help-center-right-help-url" id="{%=item.IID%}-qrcode">
                    <div>手机淘宝扫码，预览手机详情</div>
                    <img src="http://gqrcode.alicdn.com/img?w=170&h=170&item_id={%=item.IID%}&type=ci">
                </div>
            </div>
        </td>
        {%if(item.UPDATE_DATETIME==undefined){%}
            <td  style='text-align: center;'>无</td>
        {%}else{%}
            <td>{%=item.UPDATE_DATETIME%}</td>
        {%}%}
        <td>
            <div class="{%=item.IID%}-status-bar">{%=item.STATUS_DESC%}</div>
        </td>
        <td>
            <button type="button" id="{%=item.IID%}-one-publish" data-iid="{%=item.IID%}" data-loading-text="发布中..." class="btn btn-primary one-publish">一键发布</button>
                {%if(item.STATUS_DESC=='未发布'||item.STATUS_DESC=='发布中'){%}
                {%}else{%}
                <span class="promo-btn">
                    <button type="button" class="btn btn-primary" style="padding: 6px 41px;">更多<span class="caret"></span></button>
                    <span class="promo-type-item">
                        <a href="javascript:void(0)" class="look-wap-btn" data-iid="{%=item.IID%}">查看手机详情</a>
                        <a href="javascript:void(0)"  class="edit-wap-btn" data-iid="{%=item.IID%}">编辑手机详情</a>
                        <a href="javascript:void(0)"  class="del-wap-btn" data-iid="{%=item.IID%}">删除手机详情</a>
                    </span>
                </span>
                {%}%}
        </td>
    </tr>
    {%}%}
    {%}else{%}
    <tr><td colspan="4" style="text-align: center;">
        <div>
            <div>亲,没有找到符合条件的宝贝哦!</div>
        </div></td></tr>
    {%}%}
</script>


<!-- 历史记录的模板展示-->
<script id="template-history-list" type="text/template">
    {%if(lists && lists.length > 0){%}
    {%for(var i = 0; i < lists.length; i++){%}
    {%var task = lists[i];%}
    <tr>
        <td>{%=task.createDateTime%}</td>
        <td><a href="<%=basePath%>yx/newwap/details?taskId={%=task.id%}&status=2">{%=task.successCount%}</a></td>
        <td><a href="<%=basePath%>yx/newwap/details?taskId={%=task.id%}&status=2">{%=task.failCount%}</a></td>
        <td>{%=task.successCount+task.failCount+task.filterCount%}/{%=task.totalCount%}</td>
        <td>{%=task.name%}</td>
        <td>{%var finishedCount = task.successCount + task.failCount + task.filterCount;%}
            {%if(task.successCount + task.filterCount + task.failCount == task.totalCount){%}
            已完成
            {%} else if(finishedCount == task.totalCount && task.successCount > 0){%}
            部分成功
            {%} else if(task.failCount == task.totalCount){%}
            失败
            {%} else if(task.successCount + task.filterCount + task.failCount >= task.totalCount){%}
            失败
            {%}else{%}
            进行中
            {%}%}
        </td>
        <td> {%if(task.failCount > 0){%}
            <a href="<%=basePath%>yx/newwap/details?taskId={%=task.id%}&status=4">查看失败宝贝 | </a>
            {%}%}
            <a href="<%=basePath%>yx/newwap/details?taskId={%=task.id%}">查看详情</a>
        </td>
    </tr>
    {%}%}
    {%}else{%}
    <tr><td colspan="7" style="text-align: center;"><div>
        <div style="line-height: 35px;"><img style="width: 63px;height: 60px;" src="<%=basePath%>static/img/lmt.png" />暂时没有手机详情发布记录.</div>
        <div style="line-height: 35px;">发布宝贝手机详情可以提升买家在亲店铺移动端的浏览体验，并提升淘宝移动端流量，现在就来试试吧！</div>
        <div style="line-height: 35px;">&nbsp;&nbsp;&nbsp;&nbsp;<a href="<%=basePath%>/wap/batchbuild">批量发布手机详情</a></div>
    </div></td></tr>
    {%}%}
</script>




</body>
</html>