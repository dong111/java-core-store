<%@ page language="java" pageEncoding="UTF-8"%>
<div id="filt_module_dialog_div" class="dialog_default" style="display: none; overflow: hidden;">
    <div class="popup-sj-option">
        <div class="popup-auto">
            <div class="sj-popup">
                <img class="sj-popup-img" src="<%=basePath%>static/imges/icon.png">
                <div id="chklist" class="phone_radio">
                    <input name="nodeTypeChck" type="checkbox" value="1" style="display:none;"><label name="nodeTypeLab" class="checkbox">发布图文详情</label>
                </div>
            </div>
            <div class="sj-popup">
                <img class="sj-popup-img" src="<%=basePath%>static/imges/icon-1.png">
                <div id="chklist" class="phone_radio">
                    <input name="nodeTypeChck" type="checkbox" value="0" style="display:none;"><label name="nodeTypeLab" class="checkbox checked">发布图片详情</label>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-content">
        <div class="template-content">
            <div class="template-1">
                <img src="<%=basePath%>static/img/moban2.jpg">
            </div>
            <div class="template-cut">
                <ul>
                    <li class="filter-module left-radius left-current " data-val="1">
                        <a href="javascript:void(0);">过滤模板</a>
                    </li>
                    <li class="filter-module left-radius" data-val="0"><!--right-current 右边当前样式-->
                        <a href="javascript:void(0);">保留模板</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div style="margin-top: 64px;margin-left: 182px;">
        <span class="b-red" id="filtModuleHtml">您选择了过滤模板，模板内容将过滤不显示</span>
    </div>
    <div class=" margin-210" style="width: 130px;">
        <%--<span class="check-left"><input type="checkbox" style="display: none;"><label id="filtModuleSingle" class="checkbox-fx checked-fx">过滤模板</label></span>--%>

        <a href="javascript:void(0);" id="publish_wap" class="tzs-btn btn-xlarge dark-blue">发布手机详情</a>
    </div>
</div>