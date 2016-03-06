<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<div class="modal fade edit-wap-dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-dialog" data-name="edit-wap-dialog" data-dixsiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">编辑手机详情</h4>
            </div>
            <div class="modal-body clearfix" style="max-height: 560px;overflow: auto;">
                <div class="hint" id="edit-wap-stabar" style="display: none">手机详情图片大小：已输入
                    <span id="picSize" class="color-red" style="color: red"></span>
                    /最多输入<span style="font-size: 14px;padding: 0 5px;font-weight: bold;color: green">2560</span>KB
                </div>
                <div class="device-status clearfix" id="edit_preview">

                </div>
            </div>
            <div class="modal-footer">
                <div class="col-xs-4 col-xs-offset-3">
                    <button type="button" class="btn btn-primary edit-item-btn" data-name="edit-wap-dialog">保存</button>
                    <button type="button" class="btn btn-default close-dialog" data-name="edit-wap-dialog" data-dixsiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>




<div class="modal fade look-wap-dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-dialog" data-name="look-wap-dialog"  data-dixsiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">查看手机详情</h4>
            </div>
            <div class="modal-body clearfix" style="max-height: 560px;overflow: auto;">
                <div class="device-status" id="look_preview">
                </div>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>


<div class="modal fade del-wap-dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-dialog" data-name="del-wap-dialog"  data-dixsiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">删除手机详情</h4>
            </div>
            <div class="modal-body clearfix" style="max-height: 560px;overflow: auto;">
                <div class="delete-prompt clearfix">
                    <div class="pull-left"><i class="glyphicon glyphicon-trash text-primary" style="font-size: 32px;"></i></div>
                    <div class="pull-left">
                        <div class="delete-former">确定需要删除之前生成的手机详情？</div>
                        <div class="after-deleting">删除后，手机上查看仅显示电脑版详情哦</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-xs-4 col-xs-offset-3">
                    <button type="button" class="btn btn-primary del-item-btn"  data-name="edit-wap-dialog">确定</button>
                    <button type="button" class="btn btn-default close-dialog" data-name="del-wap-dialog" data-dixsiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>



<script id="look_preview_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var img = list[i];%}
    {%if(img && img.length > 0){%}
    <img src="{%=img%}" class="details-group-nobot" width="521">
    {%}%}
    {%}%}
    {%}else{%}
    <div style="padding: 20px;">没有生成图文或图片……</div>
    {%}%}

</script>




<script id="edit_preview_template" type="text/template">
    {%if(list && list.length > 0){%}
    {%for(var i = 0; i < list.length; i++){%}
    {%var img = list[i];%}
    {%if(img && img.length > 0){%}
    <div class="details-group edit-img details-img-div" data-index="{%=i%}">
        <div class="details-group">
            <img src="{%=img%}" width="521">
        </div>
        <div class="shade" style="display: none">
            <div style="position: absolute;width: 521px;cursor: pointer;">
                <i class="glyphicon glyphicon-arrow-up"></i>
                <i class="glyphicon glyphicon-arrow-down"></i>
                <i class="glyphicon glyphicon-remove"></i>
            </div>
        </div>
    </div>
    {%}%}
    {%}%}
    {%}else{%}
    <div style="padding: 20px;">没有生成图文或图片……</div>
    {%}%}

</script>