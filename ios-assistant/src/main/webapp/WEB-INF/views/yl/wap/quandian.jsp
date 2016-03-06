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
    String staticCommonPath = "http://static.zhushou001.com/common/";
%>
<html>
<head>
    <link href="<%=basePath%>/static/css/yl/wap.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>static/css/sonpage.css" rel="stylesheet" type="text/css" />
    <%--<link rel="stylesheet" type="text/css"--%>
          <%--href="<%=staticCommonPath%>css/dialog.css"/>--%>
    <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/4.0.3/highcharts.js"></script>
    <script type="text/javascript" src="<%=basePath%>static/js/wap/yitao-tool.js"></script>
    <script type="text/javascript" src="<%=basePath%>static/js/wap/quandian.js"></script>
</head>

<body>
<%@ include file="../../common/filtModuleDemo.jsp" %>

<div class="right-nav">
    <div class="sj-title">发布宝贝手机详情可以提升买家在店铺移动端的浏览体验，并提升淘宝移动端流量，赶快来试一下吧！</div>
    <div class="picture-option">
        <div class="sj-option-center">
            <div name="nodeTypeDiv" class="sj-left current" title="保留宝贝详情页的图片与文字，均生成手机详情！">
                <div class="sj-bg-center">
                    <img src="<%=basePath%>static/imges/icon.png">
                    <div  class="phone_radio">
                        <input name="nodeTypeChck" type="checkbox" value="1" style="display:none;"><label name="nodeTypeLab" class="checkbox" data-value="1">发布图文详情</label>
                    </div>
                </div>
            </div>
            <%--<div class="ui-tip" id="fenxiao_tip_div" style=" display: block;">--%>
                <%--<span id="fenxiao_tip">保留宝贝详情页的图片与文字，均生成手机详情！</span>--%>
                <%--<s class="x-align-arrow"></s>--%>
            <%--</div>--%>
            <div name="nodeTypeDiv" class="sj-left" title="仅保留宝贝详情页的图片，生成手机详情！">
                <div class="sj-bg-center">
                    <img src="<%=basePath%>static/imges/icon-1.png">
                    <div id="chklist" class="phone_radio">
                        <input name="nodeTypeChck" value="0" style="display:none;"><label name="nodeTypeLab" class="checkbox checked" data-value="0">发布图片详情</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="multi">
            <span class="chklist"><input type="checkbox" style="display: none;"><label class="checkbox-fx checked-fx"  id="skip" style="margin-right:20px;">过滤已发布手机详情的宝贝</label></span>
            <span class="chklist"  style="position:relative;"><input type="checkbox" style="display: none;">
                <label class="checkbox-fx checked-fx" id="filtModule">过滤详情页模板</label></span>
            <a href="javascript:showFilterDemo()"><img src="<%=basePath%>static/imges/query.png"  style="position:absolute;margin-top: 4px;"></a>
        </div><br>
        <div class="btn-center">
            <a id="quandianBtn" href="javascript:saveConfirm()" class="tzs-btn btn-xlarge dark-green">&nbsp;&nbsp;&nbsp;全店一键发布&nbsp;&nbsp;&nbsp;</a>
        </div>
        <div class="btn-center b-red">
            <span>注意：全店一键发布操作会重新生成所有出售中宝贝的手机详情，宝贝原手机详情会被替换，且不可恢复，请谨慎操作。</span>
        </div>

    </div>
    <table id="quandianList" class="tab-list" cellpadding="0" cellspacing="0" width="730">
        <thead>
            <tr>
                <th height="45">最后全店发布时间</th>
                <th>发布成功</th>
                <th>发布失败</th>
                <th>当前状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>

        </tbody></table>
    <div class="clear" style="height:10px;"></div>

    <!--饼图-->
    <div id="pieArea" style="min-width:400px;height:250px;text-align: center;"></div>
    <div style="text-align: center;">宝贝数据更新于：<span id="syn_date"></span>  <a href="javascript:syncWapInfo()" >刷新数据</a></div>
    <input type="hidden" id="left_nav_current_id" value="left_nav_1_1">
    <!--饼图-->


    <!-- 全店发布弹窗 -->
    <div id="quandianConfirmDialog" class="dialog_default dialog_tips" style="display:none; overflow: hidden;">
        <div>
        <span class="dialog_text icon_warning" style="margin-top: 30px"><h2 id="low_msg_content">
            全店发布操作会替换宝贝原手机详情，请谨慎操作！</h2></span>
        </div>
        <div style="">
            <a class="t_btn_yellow t_btn_yellow_new1" href="javascript:save();">
                <p class="btn_text1">确认发布</p></a>
            <a class="t_btn_yellow t_btn_yellow_new1" href="javascript:close_quandianConfirmDialog();">
                <p class="btn_text1">暂不发布</p></a>
        </div>
    </div>


    <div class="sj-hint">
        <div class="sui-msg msg-large msg-tips width-right">
            <div class="msg-con">温馨提示：<br>
          <span class="font-st">
              1、亲，如果使用手机详情的用户过多，投放详情页可能需要30分钟~3小时左右，亲无需在该页面等待，可稍后再查看发布情况.（关闭当前页面不会影响手机详情投放进度，请放心）。<br>
              2、过滤模板仅针对淘助手创建的促销模块的宝贝有效<br>
              3、全店一键发布仅针对出售中的宝贝生成，您仓库中的宝贝不会生成。
          </span>
            </div>
            <s class="msg-icon"></s>
        </div>
    </div>
</div>
<input type="hidden" id="left_nav_current_id" value="left_nav_1_2">
</body>
</html>