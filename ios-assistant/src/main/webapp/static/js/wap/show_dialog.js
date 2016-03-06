var clickA = false;
function showPreviewWapDialog(){
    wx_dialog_show('preview_wap_dialog_div');
    $("#filt_module_demo_div").css("top","50px").css("left","700px");
}

function showEditWapDialog(){
    wx_dialog_show('edit_wap_dialog_div');
    $("#filt_module_demo_div").css("top","50px").css("left","700px");
}


$(function(){
    wx_dialog('preview_wap_dialog_div', {
        title : "查看手机详情",
        height:600,
        width:600,
        autoOpen : false,
        close:"close_preview_wap_dialog_div"
    });
    wx_dialog('edit_wap_dialog_div', {
        title : "编辑手机详情",
        height:600,
        width:600,
        autoOpen : false,
        close:"close_edit_wap_dialog_div"
    });
});

function close_preview_wap_dialog_div(){
    wx_dialog_close('preview_wap_dialog_div');
}

function close_edit_wap_dialog_div(){
    wx_dialog_close('edit_wap_dialog_div');
}
//type  判断是在详情记录页面还是批量修改页面  批量页面不需要重新发布
function wapPreview(iid){
    $('#preview').html("");
    $.ajax({
        url:System.baseUrl+'api/v1/item/wldesc/onePreview?timestamp='+new Date().getTime(),
        data:{iid:iid},
        type:'GET',
        dataType:'JSON',
        cache: false,
        ifModified: true,
        success: function(data){
            var template = $('#preview_template').html();
            var result = data.result;
            var pics ="";
            if(null != result && null !=result.picUrls){
                pics = wapInfoFormat(result);
            }
            $('#preview').html(_.template(template, {
                list: pics,
                baseUrl:baseUrl
            }));
        },
        error: function(data){
            if (data.responseText != '') wx_alert(data.responseText);
        }
    });
}


//type  判断是在详情记录页面还是批量修改页面  批量页面不需要重新发布
function wapPreviewByTask(iid,subTaskId){
    $('#preview').html("");
    $.ajax({
        url:baseUrl+'api/v1/task/sub/onePreview/task',
        data:{iid:iid,id:subTaskId},
        type:'GET',
        dataType:'JSON',
        cache: false,
        ifModified: true,
        success: function(data){
            var template = $('#preview_template').html();
            var result = data.result;
            var pics ="";
            if(null != result && null !=result.picUrls){
                pics = wapInfoFormat(result);
            }
            $('#preview').html(_.template(template, {
                list: pics,
                baseUrl:System.baseUrl
            }));
//            $("#retry_div").show();
        },
        error: function(data){
            if (data.responseText != '') wx_alert(data.responseText);
        }
    });
}


//type  手机详情编辑
function wapeditByTask(iid,subTaskId){
    $('#edit').html("");
    $.ajax({
        url:baseUrl+'api/v1/task/sub/onePreview/task.json',
        data:{iid:iid,id:subTaskId},
        type:'GET',
        dataType:'JSON',
        cache: false,
        ifModified: true,
        success: function(data){
            var template = $('#edit_template').html();
            var result = data.result;
            var pics ="";
            if(null != result && null !=result.picUrls){
                pics = wapInfoFormat(result);
                $('#edit').html(_.template(template, {
                    list: pics,
                    baseUrl:System.baseUrl
                }));
                if(result.edit){//可以编辑图片数据格式不同（不是字符串，改成json，需要预处理）
                    var picObjList = JSON.parse(result.picUrls);
                    picTotalSize = 0;
                    for(var i=0;i<picObjList.length;i++){
                        var size = picObjList[i].sizes;
                        $("img[class^='wapImg']").eq(i).attr("size",size);
                         picTotalSize += size;
                    }
                }else{
                    wx_alert("手机详情格式异常，无法编辑，请联系客服！");
                }
            }

            $("#picSize").attr("class", "color-red").html(Math.ceil(picTotalSize / 1000));
            $("#rePublish").data("iid", iid).data("subId", subTaskId);
            bindImgCommonEvents();

        },
        error: function(data){
            if (data.responseText != '') wx_alert(data.responseText);
        }
    });
}

//图片移动事件
function bindImgCommonEvents(){
    //样式控制
    $("div[class^='module']").click(function(){
        if(clickA){
            clickA = false;
            return;
        }
        var index = $("div[class^='module']").index($(this));
        if(index==0){
            $(this).find("a[class^='up']").css("display","none");
        }
        if(index==$("div[class^='module']").length-1){
            $(this).find("a[class^='down']").css("display","none");
        }
        $("div[class^='module']").removeClass("m-image current").eq(index).addClass("m-image current");
    });

    //图片上移
    $("a[class^='up']").click(function(){
        var index = $("a[class^='up']").index($(this));
        if(index<1){
            wx_alert("已经在顶部，不能上移");
            return;
        }
        var temp = $("div[class^='template-1']").eq(index-1).children();
        $("div[class^='template-1']").eq(index-1).html($("div[class^='template-1']").eq(index).children());
        $("div[class^='template-1']").eq(index).html(temp);
        $("div[class^='module']").removeClass("m-image current").eq(index-1).addClass("m-image current");
        clickA = true;
    });
    //图片下移
    $("a[class^='down']").click(function(){
        var index = $("a[class^='down']").index($(this));
        if(index> $("a[class^='down']").length-2){
            wx_alert("已经在底部，不能下移");
            return;
        }
        var temp = $("div[class^='template-1']").eq(index+1).children();
        $("div[class^='template-1']").eq(index+1).html($("div[class^='template-1']").eq(index).children());
        $("div[class^='template-1']").eq(index).html(temp);
        $("div[class^='module']").removeClass("m-image current").eq(index+1).addClass("m-image current");
        clickA = true;
    });

    //图片 删除
    $("a[class^='delete']").click(function(){
        var index = $("a[class^='delete']").index($(this));
        picTotalSize -= $("img[class^='wapImg']").eq(index).attr("size");
        if(Math.ceil(picTotalSize/1000)>2560){
            $("#picSize").attr("class","color-red");
        }else{
            $("#picSize").attr("class","color-green");
        }
        $("#picSize").html(Math.ceil(picTotalSize/1000));
        $("div[class^='module']").eq(index).remove();
    });

}

//针对手机详情数据格式不同，进行处理
function wapInfoFormat(result){
    var pics = "";
    if(result.edit){//可以编辑图片数据格式不同（不是字符串，改成json，需要预处理）
        var picObjList = JSON.parse(result.picUrls);
        for(var i=0;i<picObjList.length;i++){
            if(i==(picObjList.length-1)){
                pics +=  picObjList[i].picturePath;
                continue;
            }
            pics +=  picObjList[i].picturePath+",";
        }
        pics = pics.split(",");
    } else {
        pics = result.picUrls.split(",");
    }
    return pics;
}
