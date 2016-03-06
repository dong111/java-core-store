<%@ page language="java" pageEncoding="UTF-8"%>
<div id="preview_wap_dialog_div" class="dialog_default" style="display: none; overflow: hidden;">
    <div></div>
    <div id="preview" style="width:590px;max-height:560px;overflow: auto;text-align: center;">
            <img src="<%=basePath%>static/img/loading.gif">
    </div>
    <%--<div id="retry_div" style="text-align: center;display: none;margin:25px auto;"><a href="javascript:void(0);" class="tzs-btn btn-large dark-blue retry_btn" class="tzs-btn btn-xlarge dark-blue">重新发布</a></div>--%>
</div>

<script id="preview_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var img = list[i];%}
    {%if(img && img.length > 0){%}
    <img src="{%=img%}" width="520px" onerror="javascript:this.src='{%=baseUrl%}static/img/noPic.jpg'"/>
    {%}%}
    {%}%}
    {%}else{%}
    <div style="padding: 20px;">没有生成图文或图片……</div>
    {%}%}

</script>