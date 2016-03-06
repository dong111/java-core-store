/**
 * Created by Administrator on 14-5-27.
 */
//文档加载事件
var page_size = 5;
var page_num = 0;
$(function(){

    //天猫用户控制
    if(userShopTypeControl()) return;
    if(versionControl(3)) return;
    var params = {
        "status":-2,
        "size": page_size,
        "num": 1
    };
    loadTaskList(params);
});


/**
 * 加载工单列表
 */
function loadTaskList(params){
    wx_loading("亲，正在同步信息，请稍候...");
    $.ajax({
        url:System.baseUrl +"api/v1/task/page",
        type : "GET",
        cache: false,
        data:params,
        success : function(data){
            if (data.success) {
                //数据表格初始化
                initTable(data);
            }else{
                wx_alert("刷新失败！");
            }
            wx_loading_close();
        }
    });
}

/**
 * 初始化table
 * @param data
 */
function initTable(data){
    var tasklist = data.result.content;
    var taskHtml = "";
    $.each(tasklist,function(n,task) {
        if(task.skipCsv=="no"){
            return true;
        }
        var status = task.status;

        var array =  task.filepath.split("/");
        var fileName =  array[array.length-1];
        //0：开始，1，执行中，2：成功，3：完成(部分成功),4.失败
        var statusDesc = "";
        switch (status){
            case 0:statusDesc="开始"; break;
            case 1:statusDesc="执行中.."; break;
            case 2:statusDesc="成功"; break;
            case 3:statusDesc="部分成功"; break;
            case 4:statusDesc="失败"; break;
        }
        //进度显示
        var percent = 0;
        if(0 != task.totalCount){
            percent = (task.successCount*1.0/task.totalCount)*100+"";
            percent = percent.substring(0,4);
        }
        //可執行操作設置
        var opration = "";
        if(3==status||2==status){
            percent = 100;
            opration = "<a href=javascript:downLoad("+task.taskId+")>下载</a>";
        }else if(4==status){
            opration = "下载失败";
        }
        else{
            opration = "等待下载";
        }
        var index = page_size*page_num+n+1;
          taskHtml = taskHtml +  "<tr>"
            +"<td>"+index+"</td>"
            +"<td>"+fileName+"</td>"
            +"<td>"+task.createTime+"</td>"
            +"<td>"+statusDesc+"</td>"
            +"<td>"+percent+"%</td>"
            +"<td>"+opration+"</td>"
            +"</tr>";
    });
    if(taskHtml==""){
       clearPage();
    }else{
        $("#taskDetails").append(taskHtml)
            initPage(data);
    }
}
function initPage(data){
    if(data.result.content == null || data.result.content.length < 1)
        return;
    var total_page = data.result.totalPages;
    var cur_page = data.result.number;
    var count=0;
    var pg = {
        "current_page" : cur_page,
        "items_per_page" : 1,
        "num_display_entries" : 5,
        link_to : "javascript:void(0);",
        total_page : total_page,
        global_select_id:"select_item_id",
        global_variable_size:page_size,
        callback : function(new_current_page,
                            containers) {
            var myReg=/^(0|([1-9]\d*))$/;
            var isNumber = myReg.test(new_current_page);
            if(!isNumber && new_current_page!="" && new_current_page!=null){
                wx_alert("请输入正整数！");
                return false;
            }
            history_pageselectCallback(new_current_page,pg);
            return true;
        }
    };
    $("#pager_history").pagination(total_page, pg);
}
/**
 * 清空表格中(表头以外)所有行数据
 */
function clearTable(){
    $("#taskDetails tr:gt(0)").remove();
}

function clearPage(){
    $("#pager_history").html("亲，没有找到您要的记录！");
}


/**
 *根据工单下载文件
 * @param taskid
 */
function downLoad(taskid){
    var floderCtrol =  $("#floderCtrol").val();
    window.location.href = System.baseUrl+floderCtrol+"/task/download?taskId="+taskid;
}


function history_pageselectCallback(page_index, jq) {
    if($("#select_item_id")!=undefined){
        page_size=$("#select_item_id").val();
    }
    if(page_index!=null&&page_index!=undefined){
        page_num = page_index;
    }

    var status = $("#proStyleState").val();
    var params = {
        "status":status,
        "size": page_size,
        "num": page_index+1
    };
    clearTable();
    loadTaskList(params);

}


//还未使用
function refresh(){
    //天猫用户控制
    if(userShopTypeControl()) return;
    if(versionControl(3)) return;
    var status = $("#proStyleState").val();
    var params = {
        "status":status,
        "size": page_size,
        "num": 1
    };
    clearTable();
    loadTaskList(params);
}

//用户版本控制，暂不支持天猫用户
function userShopTypeControl(){
    //天猫用户true，淘宝用户false
    var shopType = $("#userShopType").val();
    if(shopType=="B"||shopType=="b"){
        wx_alert("手机详情暂不支持天猫用户使用！");
        return true;
    }
    return false;
}