<%@ page language="java" pageEncoding="UTF-8"%>
<div id="filt_module_demo_div" class="dialog_default" style="display: none; overflow: hidden;">
    <div>
        <div class="template-content">
            <%--<div class="template-1">--%>
                <%--<img src="<%=basePath%>static/imges/img2.jpg">--%>
            <%--</div>--%>
            <%--<div class="shade">关联推荐模板&gt;&gt;</div>--%>
            <div class="template-2">
                <img id="templateImg"  src="<%=basePath%>static/imges/unmodule.jpg">
            </div>
        </div>
    </div>
    <div class="template-cut" style="position: static;">
        <ul>
            <li name="radius" class="left-radius left-current">
                <a href="#">过滤模板</a>
            </li>
            <li name="radius" class="right-radius"><!--right-current 右边当前样式-->
                <a href="#">保留模板</a>
            </li>
        </ul>
    </div>
    <div style="width: 210px;margin: 66px auto;*margin-top: 20px;">
        请注意：<br/>
        1.投放到手机端后，原有宝贝模板链接将失效，建议您生成手机详情时勾选过滤模板选项.<br/>
        2.过滤模板范围仅限使用淘助手创建的模板.<br/>
    </div>
</div>