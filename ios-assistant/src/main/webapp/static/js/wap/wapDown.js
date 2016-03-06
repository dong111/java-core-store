var pageSize = 10;
var curPageNo =1;
$(function () {
    load();

});

function load(page){
    var that = this;
    var param = {
        size: pageSize,
        num: curPageNo,
        status:-2
    };
    $("#wap_container").html('<tr > <td colspan="6" style="text-align: center;"> <img src="'+System.baseUrl+'static/img/loading.gif"></td></tr>');
    $.ajax({
        url:System.baseUrl+'api/v1/task/oldpage',
        data:param,
        type:'GET',
        dataType:'JSON',
        cache: false,
        ifModified: true,
        success: function(data){
            var pageContent = data.result, template = $('#wap_template').html();
            var csvList =  pageContent.content;
            csvListInit(csvList);
            $('#wap_container').html(_.template(template, {
                list:csvList
            }));
            if (pageContent.totalElements < 1) {
                $("#listItemsPager").empty();
                return false;
            }
            $("#listItemsPager").pagination(pageContent.totalPages, {
                items_per_page: 1,
                num_display_entries: 5,
                link_to: "javascript:void(0);",
                current_page: pageContent.number,
                total_page: pageContent.totalPages,
                global_select_id: "select-item-id",
                global_variable_size: pageContent.size,
                callback: function (pageNum) {
                    if (!$.isNumeric(pageNum) && pageNum != null) {
                        wx_alert("请输入正整数！");
                        return false;
                    }
                    pageSize = $('#select-item-id').val() || pageSize;
                    curPageNo = ++pageNum;
                    load(that.curPageNo);
                    return true;
                }
            });
        },
        error: function(data){
            if (data.responseText != '') wx_alert(data.responseText);
        }
    });
}


function csvListInit(csvList){
    for(var i=0;i<csvList.length;i++){
        var csv = csvList[i];
        switch (csv.status){
            case 0:csv["statusDesc"]="开始"; break;
            case 1:csv["statusDesc"]="执行中.."; break;
            case 2:csv["statusDesc"]="成功"; break;
            case 3:csv["statusDesc"]="部分成功"; break;
            case 4:csv["statusDesc"]="失败"; break;
        }


        //进度显示
        var percent = 0;
        if(0 != csv.totalCount){
            percent = (csv.successCount*1.0/csv.totalCount)*100+"";
            percent = percent.substring(0,4);
        }
        csv["percent"] = percent;

        //可執行操作設置
        var opration = "";
        if(3==csv.status||2==csv.status){
            csv["percent"] = 100;
            opration = "<a href=javascript:downLoad("+csv.taskId+")>下载</a>";
        }else if(4==csv.status){
            opration = "下载失败";
        }
        else{
            opration = "等待下载";
        }

        csv["opration"] = opration;
        csvList[i] = csv;

        csv["index"] = pageSize*(curPageNo-1)+i+1;

    }
}


/**
 *根据工单下载文件
 * @param taskid
 */
function downLoad(taskid){
    var floderCtrol =  $("#floderCtrol").val();
    window.location.href = System.baseUrl+floderCtrol+"/task/download?taskId="+taskid;
}
