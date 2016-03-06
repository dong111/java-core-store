<%@ page import="com.yitaosoft.entity.wapDesc.Task" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("basePath", basePath);
%>
<html>
<head>
    <link href="<%=basePath%>/static/css/wap.css" rel="stylesheet" type="text/css"/>
    <script src="<%=basePath%>/static/js/wap/task.js"></script>
</head>

<body>
<div class="right marginTop">
    <div class="right">
        <div class="searchBar" style="height: 20px; margin-left:0px;margin-top: 0px;padding-bottom: 12px;width: 783px;">
            <span>状态：</span>
			<span>
				<input type="hidden" id="hidden_log_proid" value="0">
				<input type="hidden" id="hidden_log_succeed_img" value="/tpro_v3/img/succeed.png">
				<input type="hidden" id="hidden_log_fial_img" value="/tpro_v3/img/fail.png">
				<select id="proStyleState" name="proStyleState" style="height: 23px;">
                    <option value="-2">
                        所有状态
                    </option>
                    <option value="0">
                        待生成
                    </option>
                    <option value="1">
                        正在生成
                    </option>
                    <option value="2">
                        生成成功
                    </option>
                    <option value="3">
                        部分成功
                    </option>
                    <option value="4">
                        生成失败
                    </option>
                </select>
			</span>
            <button class="button_1 button-blue" style="margin-left:10px;" onclick="javascript:refresh()">手动刷新</button>
        </div>
        <table class="table-list" id="taskDetails">
            <tbody>
            <tr class="table-list-title ">
                <th>序号</th>
                <th>文件名称</th>
                <th>生成时间</th>
                <th>状态</th>
                <th>进度</th>
                <th>操作</th>
            </tr>
            </tbody>
        </table>

        <div id="pager_history" class="scott">

        </div>

    </div>
</div>
<input type="hidden" id="left_nav_current_id" value="left_nav_2_1">
</body>
</html>