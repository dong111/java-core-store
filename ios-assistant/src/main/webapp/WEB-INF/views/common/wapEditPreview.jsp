<%@ page language="java" pageEncoding="UTF-8"%>
<div id="edit_wap_dialog_div" class="dialog_default" style="display: none; overflow: hidden;">
    <div>
        <div class="popup-sj-option">
            <div class="popup-auto">
                <div style="width: 450px;float: left;font-size: 14px;">
                    <div id="chklist" class="phone_radio_ui">
                        该宝贝手机详情图片总大小超过淘宝限制，请删除部分图片后重新发布
                    </div>
                </div>

            </div>
        </div>
        <div class=" photo-size">手机详情图片大小：已输入<span id="picSize" class="color-red"></span>
            /最多输入<span style="font-size: 14px;padding: 0 5px;font-weight: bold;">2560</span>KB</div>
    </div>
    <div class="popup-content-edit" >
        <div class="template-content-edit">
            <div id="edit" class="control-panel" style="width:590px;max-height:343px;overflow: auto;text-align: center;">
                <img src="<%=basePath%>static/img/loading.gif">
            </div>

        </div>
    </div>

    <div class=" margin-210">
        <a href="#" id="rePublish" class="tzs-btn btn-xlarge dark-blue">保存并发布</a>
    </div>
    <%--<div id="retry_div" style="text-align: center;display: none;margin:25px auto;"><a href="javascript:void(0);" class="tzs-btn btn-large dark-blue retry_btn" class="tzs-btn btn-xlarge dark-blue">重新发布</a></div>--%>
</div>
<script id="edit_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var img = list[i];%}
    {%if(img && img.length > 0){%}
    <div class="module">
        <ul class="tools" style="top: 10px;">
            <li>
                <a href="#" class="up">上移</a>
            </li>
            <li>
                <a href="#" class="down">下移</a>
            </li>
            <li>
                <a href="#" class="delete">删除</a>
            </li>
        </ul>
        <div class="template-1">
            <img src="{%=img%}" class="wapImg" width="520px"  style="cursor:pointer" onerror="javascript:this.src='{%=baseUrl%}static/img/noPic.jpg'" />
        </div>
        <div class="cover"></div>
    </div>
    {%}%}
    {%}%}
    {%}else{%}
    <div style="padding: 20px;">没有生成图文或图片……</div>
    {%}%}

</script>