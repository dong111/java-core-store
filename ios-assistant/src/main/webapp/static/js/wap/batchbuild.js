/**
 * Created by Administrator on 14-5-27.
 */
//文档加载事件
var page_size = 10;
var pageIndex = 1;
var DEFAULT_KEYWORDS = "输入宝贝关键字或链接";
var single_iid ="";
var selectedIids = [];
var batchSaveFlag = false;
var authorityCount = 0;
!window.SelectItem && (window.SelectItem = {});
if (!SelectItem.existIid) {
    SelectItem.existIid = function (iid) {
        return Array.contains(selectedIids, iid);
    };
    SelectItem.addIid = function (iid) {
        if(!Array.contains(selectedIids, iid)){
            selectedIids.push(iid);
        }
    };
    SelectItem.removeIid = function (iid) {
        if(Array.contains(selectedIids, iid)){
            return Array.remove(selectedIids, iid);
        }
    };
    SelectItem.clear = function () {
        Array.clear(selectedIids);
    };
    SelectItem.getSelectedItemsSize = function () {
        return selectedIids.length;
    };
    SelectItem.getAllIids = function () {
        return selectedIids.length;
    };
    SelectItem.toString = function(){
        return selectedIids.toString();
    };
}



$(function(){
    loadItemList();
    recordList = new RecordList();
    Imitate_select(".sort_select_05", "sort_select_id_05", "sort_select_id_06", "approveStatus", loadItemList, recordList);
    Imitate_select(".sort_select_07", "sort_select_id_07", "sort_select_id_08", "wapStatus", loadItemList, recordList);
    queryTopCategory();
    querySellerCategory();
    //搜索按钮初始化
    bindCommonEvents();
});

var RecordList = function () {

};



/**
 * 绑定全选当前页事件
 */
function initSelectCurrentPage(){

}

/**
 * 加载工单列表
 */
function loadItemList(pageIndex,forceSync){
    var wapStatus = $("#wapStatus").val();
    var params = {
        "keywords": $("#search-key").val(),
        "approveStatus": $("#approveStatus").val(),
        "topCatId": $("#top_seller_cid").val(),
        "sellerCatId": $("#seller_cid").val(),
        "wapDescType": wapStatus,
        "pageSize": page_size
    };
    if (params['keywords'] == DEFAULT_KEYWORDS) {
        delete params['keywords'];
    }
    if(pageIndex!=null){
        params['pageNum'] = pageIndex;
    }
    if(forceSync!=null){
        params['forceSync'] = "true";
    }
    if(wapStatus==0){
        $("label[name='SelectAll']").hide();
        $("label[name='SelectCurrentPage']").hide();
        $("#btn-center").hide();
        $("#batch-chk").hide();
    }else{
        $("label[name='SelectAll']").show();
        $("label[name='SelectCurrentPage']").show();
        $("#btn-center").show();
        $("#batch-chk").show();
    }
    clearTable();
    $("label[class^='checkbox-fx'][name='SelectAll']").addClass("checked-fx");
    if(forceSync!=null){
        $('#itemList').append("<tr><td colspan='5' style='text-align: center;'><span style='color: #FE8B00;font-weight: bold;'>亲，正在同步宝贝信息，请稍候...</span></td></tr>");
    }else{
        $('#itemList').append("<tr><td colspan='5' style='text-align: center;'><span style='color: #FE8B00;font-weight: bold;'>亲，正在加载宝贝信息，请稍候...</span></td></tr>");
    }

    $.ajax({
        url:System.baseUrl +"api/v1/item/page.json",
        data:params,
        cache: false,
        type : "GET",
        success : function(data){
            if (data.success) {
                initTable(data);
            }else{
                wx_alert("刷新失败！");
            }
        }
    });
}

function selectAll(flag){
    var params = {
        "keywords": $("#search-key").val(),
        "approveStatus": $("#approveStatus").val(),
        "topCatId": $("#top_seller_cid").val(),
        "sellerCatId": $("#seller_cid").val(),
        "wapDescType": $("#wapStatus").val(),
        "pageSize":100000
    };
    if (params['keywords'] == DEFAULT_KEYWORDS) {
        delete params['keywords'];
    }
    $.ajax({
        url:System.baseUrl +"api/v1/item/page.json",
        data:params,
        cache: false,
        async:false,
        type : "GET",
        success : function(data){
            if (data.success) {
                if(flag){
                    //全选中
                    $.each(data.result.content,function(i,item){
                            SelectItem.addIid(item.IID);
                    });
                }else{
                    //全取消
                    $.each(data.result.content,function(i,item){
                            SelectItem.removeIid(item.IID);
                    });
                }
            }else{
                wx_alert("全选失败！");
            }
        }
    });
}

/**
 * 初始化table
 * @param data
 */
function initTable(data){
    $("label[name='SelectCurrentPage']").addClass("checked-fx");
    clearTable();
    var itemlist = data.result.content;
    if(itemlist.length<1){
        $('#itemList').append('<tr > <td colspan="5" style="text-align: center;"><span style="color: #FE8B00;font-weight: bold;">没有找到您要发布的宝贝。</span></td></tr>');
        $("#pager_history").empty();
        return;
    }
    //手机详情宝贝列表
    $.each(itemlist,function(n,item) {
        var updTime = "无";
        if(item.UPDATE_DATETIME!=null){
              updTime = item.UPDATE_DATETIME;
        }
        var chklist = "<td><span class='chklist'><label class='checkbox-fx checked-fx' data-iid='"+item.IID+"' data-status='"+item.ITEM_STATUS_TYPE+"' name='wapBatchItem'></label></span></td>";
        var  pubWap = "<td><a class='opacity' href='javascript:showPubWapDialog("+item.IID+")'><img src='"+System.baseUrl+"static/imges/compile.png'></a></td>"
        if(item.STATUS==0){
            chklist = "<td></td>";
            pubWap = "";
        }
        $('#itemList').append("<tr>"
            +chklist
            +"<td><span class='item_img'><a href='http://item.taobao.com/item.htm?id="+item.IID+"' target='_blank'><img src='"+item.PIC_URL+"'></a></span>"
                   +"<div class='vertical-center'>"
                        +"<a href='http://item.taobao.com/item.htm?id="+item.IID+"' target='_blank'>"+item.TITLE+"</a>"
                    +"</div>"
                +"</td>"
            +"<td>"+updTime+"</td>"
            +" <td>"+convertStatusAndType(item.STATUS,item.DESC_NODE_TYPE,item.IID)+"</td>"
            +pubWap
            +"</tr>");
    });
    bindTableCommonEvents();
    initPage(data);
}



function  bindTableCommonEvents(){

    //单个宝贝选择
    $("label[name='wapBatchItem'][class^='checkbox-fx']").click(function(){
        var itemLab = $(this);
        var iid = itemLab.data("iid");
        if(itemLab.hasClass("checked-fx")){      //包含没有选中样式
            //选中
            SelectItem.addIid(iid);
            currentPageBtnControl();
        }else{
            SelectItem.removeIid(iid);
            $("label[name='SelectCurrentPage']").addClass("checked-fx");
            itemLab.addClass("checked-fx");
        }
    });
    currentPageBtnControl();

    $(".preview_btn").on("click",function(){
        wapPreview($(this).data("val"));
        showPreviewWapDialog();
    });
}

function currentPageBtnControl(){
    //判断宝贝是否选择，增加样式
    var total = $("label[name='wapBatchItem'][class^='checkbox-fx']").length;
    var count = 0;
    $("label[name='wapBatchItem'][class^='checkbox-fx']").each(function(i,item){
        var iid =  $(item).data("iid");
        if(SelectItem.existIid(iid)){
            $(item).removeClass("checked-fx");
            count++;
        }
    });
    //当前页选中
//    if(total!=0&&total==count){
//        $("label[name='SelectCurrentPage']").removeClass("checked-fx");
//    }
}


function convertStatusAndType(status,descType,iid){
    var statusDesc = "未发布";
    if(status==-1){
        statusDesc = "未发布";
    }else if(status==0){
        statusDesc = "发布中";
    }else if(status==6){
        statusDesc = "已有手机详情<br><a href='javascript:void(0);' class='preview_btn' data-val='"+iid+"'>查看已有手机详情</a>";
    }else if(status==2){
        if(descType==0){
            statusDesc = "已发布图片<br><a href='javascript:void(0);' class='preview_btn' data-val='"+iid+"'>查看手机详情</a>";
        }else{
            statusDesc = "已发布图文<br><a href='javascript:void(0);' class='preview_btn' data-val='"+iid+"'>查看手机详情</a>";
        }
    }

    return statusDesc;
}

//搜索关键字事件方法
function bindCommonEvents(){
    wx_dialog('filt_module_dialog_div', {
        title : "指定单个生成手机详情",
        height:600,
        width:600,
        autoOpen : false,
        close:"close_filt_module_dialog_div"
    });


     //全选当前页
    $("label[class^='checkbox-fx'][name='SelectCurrentPage']").click(function(){
          if($(this).hasClass("checked-fx")){
              //选中
              $("label[name='wapBatchItem'][class^='checkbox-fx']").each(function(i,item){
                  if($(item).data("status")!=0){
                      SelectItem.addIid($(item).data("iid"));
                  }
              });
              $("label[name='wapBatchItem'][class^='checkbox-fx']").removeClass("checked-fx");
          }else{
              $("label[name='wapBatchItem'][class^='checkbox-fx']").each(function(i,item){
                  SelectItem.removeIid($(item).data("iid"));
              });
              $("label[name='wapBatchItem'][class^='checkbox-fx']").addClass("checked-fx");
          }
    });
    //全选所有
    $("label[class^='checkbox-fx'][name='SelectAll']").click(function(){
        if($(this).hasClass("checked-fx")){
            //选中
                selectAll(true);
            $("label[name='wapBatchItem'][class^='checkbox-fx']").removeClass("checked-fx");
        }else{
            selectAll(false);
            $("label[name='wapBatchItem'][class^='checkbox-fx']").addClass("checked-fx");
        }

    });




    //搜索关键字事件方法
    $('#search-key').click(function () {
        var self = $(this);
        if (self.val() == DEFAULT_KEYWORDS) {
            self.val('');
        }
    }).blur(function () {
            var self = $(this);
            if (self.val() == '') {
                self.val(DEFAULT_KEYWORDS);
            }
        });
    //快速切换搜索宝贝展示模式的切换事件
    $('#search-icon').click(function () {
        loadItemList();
    });



    //选择创建活动条件
    $("label[class^='checkbox-fx']").click(function(){
        $(this).toggleClass("checked-fx");
    });

    //单个发布手机详情
    $("#publish_wap").click(function(){
        publishWap();
    });


    //选择发布类型
    $("label[name='nodeTypeLab']").click(function(){
        var index = $("label[name='nodeTypeLab']").index($(this));
        $("[name='nodeTypeDiv']").removeClass("current").eq(index).addClass("current");
        $("[name='nodeTypeLab']").addClass("checked").eq(index).removeClass("checked");
    });
    //过滤模板
    $("li[class^='filter-module']").click(function(){
        var val = $(this).data("val");
        var index = $("li[class^='filter-module']").index($(this));
        if(val == "1"){
            $(".template-1 img").attr("src",baseUrl+"static/img/moban2.jpg");
            $("li[class^='filter-module']").removeClass("right-current").eq(index).addClass("left-current");
            $("#filtModuleHtml").html("您选择了过滤模板，模板内容将过滤不显示");
        }else{
            $(".template-1 img").attr("src",baseUrl+"static/img/moban1.jpg");
            $("li[class^='filter-module']").removeClass("left-current").eq(index).addClass("right-current");
            $("#filtModuleHtml").html("您选择了保留模板，模板内容会保留显示");
        }
        $("#filtModuleSingle").val(val);
    });
    $("li[name='radius']").click(function(){
        var index = $("li[name^='radius']").index($(this));
        if(index==0){
            $("li[name^='radius']").eq(0).addClass("left-current");
            $("li[name^='radius']").eq(1).removeClass("right-current");
            $("#templateImg").attr("src",System.baseUrl+"static/imges/unmodule.jpg");
        }
        else{
            $("li[name^='radius']").eq(0).removeClass("left-current");
            $("li[name^='radius']").eq(1).addClass("right-current");
            $("#templateImg").attr("src",System.baseUrl+"static/imges/module.jpg");
        }
    });



}

function publishWap(){

    if(single_iid == "" || single_iid == undefined){
        wx_alert("请选择要发布的宝贝！");
        return false;
    }
    wx_loading("亲，正在发布中。。。");
    wx_dialog_close('filt_module_dialog_div');
    var param = {
        userId: System.user.userId,
        descType:$("label[name='nodeTypeLab'][class='checkbox']").prev().val(),
        filtModule:$("#filtModuleSingle").val(),
        iids:single_iid,
        name:"单个生成手机详情"
    };
    var retFlag = false;
    $.ajax({
        url: baseUrl + "api/v1/task/save",
        data:param,
        type: "POST",
        dataType: "json",
        cache: false,
        ifModified: true,
        success: function (data) {
            if(data.result==-9999){//还有发布中任务
                retFlag = true;
                wx_alert(data.message);
                batchSaveFlag = false;
                return false;
            }
            if(data.result==-8888){
                wx_alert(data.message);
                setTimeout("flushList()",3000)
            }

//            wx_alert(data.message);
        },
        error: function(data){
            wx_loading_close();
            if (data.responseText != '') wx_alert(data.responseText);
        }
    });

    if(retFlag){
        return;
    }
}


function flushList(){
    loadItemList(pageIndex);
    wx_loading_close();
}


function showPubWapDialog(iid){
    $("#filtModuleSingle").val("1");
    $("[name='nodeTypeChck']").next().addClass("checked");
    $("[name='nodeTypeChck'][value='1']").next().removeClass("checked");
    $("li[class^='filter-module']").removeClass("right-current").eq(0).addClass("left-current");
    $("#filtModuleHtml").html("您选择了过滤模板，模板内容将过滤不显示");
    $(".template-1 img").attr("src",baseUrl+"static/img/moban2.jpg");
    single_iid = iid;
    wx_dialog_show('filt_module_dialog_div');
    $("#filt_module_demo_div").css("top","50px").css("left","700px");
}


function close_filt_module_dialog_div(){
    wx_dialog_close('filt_module_dialog_div');
}

/**
 * 初始化分页
 * @param data
 */
function initPage(data){
    if(data.result.content == null || data.result.content.length < 1)
        return;
    var total_page = data.result.totalPages;
    var cur_page = data.result.number;
    pageIndex = cur_page+1;
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
            //跳转到下一页前，保存当前页被选中项
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
    $("#itemList tr:gt(0)").remove();
}

function clearPage(){
    $("#pager_history").html("亲，没有找到您要的宝贝！");
}



function history_pageselectCallback(page_index, jq) {
    if($("#select_item_id")!=undefined){
        page_size=$("#select_item_id").val();
    }
    pageIndex = page_index+1;
    loadItemList(pageIndex);
//    refresh(params);

}


//刷新功能
function refresh(){
    if(userShopTypeControl()) return;
    if(versionControl(3)) return;
    var params = {
        "keywords": $("input[name='keywords']").val(),
        "approveStatus": $("#actStatus").val(),
        "forceSync": "true",
        "topCatId": $("#select-top-cat").val(),
        "sellerCatId": $("#select-seller-cat").val(),
        "wapDescType": $("#select-act").val(),
        "fromPrice": $("#fromPrice").val(),
        "pageSize": page_size,
        "toPrice": $("#toPrice").val()
    };
    if (params['keywords'] == DEFAULT_KEYWORDS) {
        delete params['keywords'];
    }
    clearTable();
    loadItemList(params);
}





function batchTwSave(){    //批量生成图文
     batchSave(1);
}

function batchTpSave(){  //批量生成图片
    batchSave(0);
}

//批量保存
function batchSave(descType){
    //用户权限验证
    if(batchSaveFlag){
        return;
    }
    batchSaveFlag = true;
    if(descType!=0&&descType!=1){
        wx_alert("未选择发布类型");
        batchSaveFlag = false;
        return;
    }
    if(SelectItem.getSelectedItemsSize()<1){
        wx_alert("您还没有选择要发布的宝贝！");
        batchSaveFlag = false;
        return;
    }

    authorityCount = 0;


        var skip = $("#skip").hasClass("checked-fx")==true?false:true;//已生成跳过控制
        var filtModule = $("#filtModule").hasClass("checked-fx")==true?0:1;
        var params = {'skip': skip,
            'name':"批量生成手机详情",
            'descType':descType,
            'iids':SelectItem.toString(),
            'filtModule':filtModule
        };
        var retFlag = false;

        $.ajax({
            url:System.baseUrl + "api/v1/task/save??timestamp="+timestamp(),
            data:params,
            type : "POST",
            asyn:true,
            success :function (data) {
                if(data&&data.success){
                    if(data.result==-9999){//还有发布中任务
                        retFlag = true;
                        wx_alert(data.message);
                        batchSaveFlag = false;
                        return false;
                    }
                    if(data.result==-8888){
                        wx_alert(data.message);
                        setTimeout("gotoList()",3000)
                    }
                    gotoList();
                }else{
                    if(data.message==""){
                        wx_alert("很抱歉，任务创建失败，请联系管理员！");
                    }else{
                        wx_alert(data.message);
                    }
                }
                batchSaveFlag = false;
            }
        });

        if(retFlag){
            return;
        }

}

function gotoList(){
    window.location.href = System.baseUrl+$("#floderCtrol").val()+"/task/list";
}




//自动类目
function queryTopCategory() {
    var that = this;
    $.ajax({
        url: baseUrl + 'api/v1/cat/list',
        data:{approveStatus:$("#approveStatus").val()},
        type: "GET",
        dataType: "json",
        cache: false,
        ifModified: true,
        success: function (data) {
            if (data.code == Http.SUCCESS) {
                var container = $("#top_seller_cids_ul"), template = _.template($("#top_cats_list_template").html());
                container.html("<li data='-8'>自动分类类目</li>" + template({"list": data.result}));
                Imitate_select(".sort_select_03", "sort_select_id_03", "sort_select_id_04", "top_seller_cid", loadItemList, recordList);
            } else {
                Msg.error(data.message);
            }
        }
    });
}

//自定义类目
function querySellerCategory() {
    $.ajax({
        url: baseUrl + 'api/v1/cat/list/by/seller',
        data:{approveStatus:$("#approveStatus").val()},
        type: "GET",
        dataType: "json",
        cache: false,
        ifModified: true,
        success: function (data) {
            if (data.code == Http.SUCCESS) {
                var container = $("#seller_cids_ul"), template = _.template($("#cats_list_template").html());
                container.html("<li data='-8'>自定义类目</li>" + template({"list": data.result}));
                Imitate_select(".sort_select_01", "sort_select_id_01", "sort_select_id_02", "seller_cid", loadItemList, recordList);
            } else {
                Msg.error(data.message);
            }
        }
    });
}



//自定义类目
function queryUserWapCount() {
    var dfd = $.Deferred();
    $.ajax({
        url: baseUrl + 'api/v1/item/count',
        data:{userId:$("#userId").val()},
        type: "GET",
        dataType: "json",
        cache: false,
        ifModified: true,
        success: function (data) {
            if (data.code == Http.SUCCESS) {
                authorityCount = data.result;
            } else {
                authorityCount = -1;
            }
            dfd.resolve();
        }
    });

    return dfd.promise();
}


function syncItemList(){
    loadItemList(null,"true");
}


/**
 * 清空表格中(表头以外)所有行数据
 */
function clearTable(){
    $("#itemList tr:gt(1)").remove();
}
