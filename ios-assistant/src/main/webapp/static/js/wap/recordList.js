var keyVal = "关键字、链接";
var picTotalSize = 0;
$(function () {
    recordList = new RecordList();
    Imitate_select(".sort_select_05", "sort_select_id_05", "sort_select_id_06", "approveStatus", recordList.load, recordList);
    recordList.init();


    $('input[id = keywords]').on('focus', function () {
        var self = $(this);
        self.val(self.val() == keyVal ? "" : self.val());
    }).on('blur', function () {
        var self = $(this);
        self.val(self.val() == "" ? keyVal : self.val());
    });


    //重新发布事件
    $("#rePublish").click(function(){
        if(Math.ceil(picTotalSize/1000)>2560){
            wx_alert("详情图片不能超过2560KB");
            return;
        }
         var pics = "";
        $("img[class^='wapImg']").each(function(){
            pics += $(this).attr("src");
            pics +=",";
        });
        close_edit_wap_dialog_div();
        wx_loading("正在发布手机详情……");
        $.ajax({
            url: System.baseUrl + 'api/v1/task/sub/uploadOne',
            data:{subTaskId:$(this).data("subId"),
                pics:pics,
                iidStr:$(this).data("iid")},
            type: "POST",
            dataType: "json",
            cache: false,
            success: function (data) {
                recordList.load();
                wx_loading_close();
                wx_alert(data.message);
            },
            error: function(data){
                wx_loading_close();
                if (data.responseText != '') wx_alert(data.responseText);
            }
        });
    });
});


var RecordList = function () {

};

RecordList.prototype = {
    pageSize: 10,
    curPageNo: 1,
    status:"",
    taskId: "",
    subTaskId: "",//重新发布时候需要
    init:function(){
        var that =this;
        that.locationParam(); //获取初始化参数
        that.load(that.getParam());
        that.getExistCids();
        that.getExistTopCids();


        // 选项卡切换
        $("#type_option").children().click(function () {
            var $self = $(this), val = $self.data("val");
            that.curPageNo = "1";
            var param = that.getParam();
            if(typeof(val) !=undefined){
                param["status"] = val;
                that.status = val;
            }else{
                that.status = "";
            }
            that.load(param);
            $self.addClass('current').siblings().removeClass('current');
        });

        $("#search").on("click",function(){
           that.load(that.getParam(1));
        });
    },
    locationParam: function(){
        var that = this;
        var search = window.location.search.substring(1);
        if(search.length > 0){
            var args = search.split('&');
            that.taskId = args[0].split("=")[1];
            if(args.length > 1)
            that.status = args[1].split("=")[1];
            //选项卡默认值
            $("#type_option #status_"+that.status+"").addClass('current').siblings().removeClass('current');
        }
    },
    load: function(param){
        var that = this;
        if(typeof(param) == 'undefined' )
            param = that.getParam(that.curPageNo);
        $("#record_list_count").html("0");
        $("#taskList_container").html(' <tr > <td colspan="7" style="text-align: center;"> <img src="'+System.baseUrl+'static/img/loading.gif"></td></tr>');
        $.ajax({
            url:System.baseUrl+'api/v1/task/sub/page.json?timestamp='+that.timestamp(),
            data:param,
            type:'GET',
            dataType:'JSON',
            cache: false,
            ifModified: true,
            success: function(data){
                data = that.preDulSubData(data);
                if(data == null){
                    $("#taskList_container").html(' <tr > <td colspan="7" style="text-align: center;">暂时没有手机详情发布记录.</td></tr>');
                    $("#listItemsPager").empty();
                    return false;
                }
                var pageContent = data.content, template = $('#record_list_template').html();
                $('#taskList_container').html(_.template(template, {
                    list: pageContent,
                    status:that.status || ""
                }));
                if (data.totalElements < 1) {
                    $("#listItemsPager").empty();
                    return false;
                }
                $("#record_list_count").html(data.totalElements);
                //绑定事件
                that.bindEvent();

                $("#listItemsPager").pagination(data.totalPages, {
                    items_per_page: 1,
                    num_display_entries: 5,
                    link_to: "javascript:void(0);",
                    current_page: data.number,
                    total_page: data.totalPages,
                    global_select_id: "select-item-id",
                    global_variable_size: data.size,
                    callback: function (pageNum) {
                        if (!$.isNumeric(pageNum) && pageNum != null) {
                            wx_alert("请输入正整数！");
                            return false;
                        }
                        that.pageSize = $('#select-item-id').val() || that.pageSize;
                        that.curPageNo = ++pageNum;
                        that.load(that.getParam(that.curPageNo));
                        return true;
                    }
                });
            },
            error: function(data){
                if (data.responseText != '') wx_alert(data.responseText);
            }
        });
    },
    preDulSubData:function(data){//移除在Java里面的js代码(真恶心)
        if(undefined==data||undefined==data.content
            ||data.content.length<1){
            return data;
        }
        for(var i=0;i<data.content.length;i++){
            var task = data.content[i];

            //                针对不同错误原因  设置不同的操作
            if(task.status==4){
                task["deploy"] = "<a href='javascript:recordList.retry(" + task.id + "," + task.iid + ");'>重试</a>";
                if(task.exeMessage.indexOf("商品已被删除")>0){
                    task["deploy"] ="--";
                }else if(task.exeMessage.indexOf("宝贝手机详情内容中图片大小不合法")>0){
                    task["deploy"] ="<a href='javascript:recordList.editWap(" + task.id + "," + task.iid + ");'>编辑</a>"
                }else if(task.exeMessage.indexOf("大小不能超过1.5M")>0
                    ||task.exeMessage.indexOf("大小不能超过2.5M")>0){
                    task["deploy"] ="<a href='javascript:recordList.editWap(" + task.id + "," + task.iid + ");'>编辑</a>"
                }if(task.exeMessage.indexOf("宝贝手机详情内容中图片大小不合法")>0&&task.descNodeType==0){
                    task["exeMessage"] ="建议使用图文方式发布。";
                }if(task.exeMessage.indexOf("宝贝手机详情内容中图片大小不合法")>0&&task.descNodeType==1){
                    task["exeMessage"] ="描述内容过多，请删除部分描述后重试！";
                }
            }
            data.content[i] = task;

        }
        return data;

    },
    bindEvent: function(){
        var that = this;
        $(".preview_btn").on("click",function(){
            that.subTaskId = $(this).data("id");
            wapPreviewByTask($(this).data("val"),that.subTaskId);
            showPreviewWapDialog();
        });

//        $(".retry_btn").on("click",function(){
//            that.retry(that.subTaskId);
//        });
    },
    retry: function(subTaskId,iid){
        var that = this;
        if(subTaskId == ""){
            wx_alert("重新发布的活动ID不能为空！");
            return false;
        }
        wx_loading("亲，正在执行中。。。");
//        wx_dialog_close('preview_wap_dialog_div');
        $.ajax({
            url: System.baseUrl + 'api/v1/task/sub/retry',
            data:{subTaskId:subTaskId,
                userId:System.user.userId,
                itemId:iid},
            type: "POST",
            dataType: "json",
            cache: false,
            ifModified: true,
            success: function (data) {
                wx_loading_close();
                wx_alert(data.message);
                that.load();
            },
            error: function(data){
                wx_loading_close();
                if (data.responseText != '') wx_alert(data.responseText);
            }
        });

    },
    editWap: function(subTaskId,iid){
        var that = this;
        if(subTaskId == ""){
            wx_alert("重新发布的活动ID不能为空！");
            return false;
        }
        wapeditByTask(iid,subTaskId);
        showEditWapDialog();

    },
    getParam: function(page){
        // login?taskId=100&status=1
        var that =this;
        var keyWords = $("#keywords").val();
        var param = {
            size: that.pageSize,
            num: page ||that.curPageNo,
            searchKey: keyWords == keyVal ? "" : keyWords,
            sellerCatId:$("#seller_cid").val(),
            topCatId:$("#top_seller_cid").val(),
            approStatu:$("#approveStatus").val(),
            taskId: that.taskId
        };
        if(that.status !== "")
            param["status"] = that.status;
        return param;
    },
    getExistCids: function () {
        $.ajax({
            url: System.baseUrl + 'api/v1/cat/list/by/seller',
            data:{approveStatus:$("#approveStatus").val()},
            type: "GET",
            dataType: "json",
            cache: false,
            ifModified: true,
            success: function (data) {
                if (data.code == Http.SUCCESS) {
                    var container = $("#seller_cids_ul"), template = _.template($("#cats_list_template").html());
                    container.html("<li data='-8'>自定义类目</li>" + template({"list": data.result}));
                    Imitate_select(".sort_select_01", "sort_select_id_01", "sort_select_id_02", "seller_cid", recordList.load, recordList);
                } else {
                    Msg.error(data.message);
                }
            }
        });
    },
    getExistTopCids: function () {
        var that = this;
        $.ajax({
            url: System.baseUrl + 'api/v1/cat/list',
            data:{approveStatus:$("#approveStatus").val()},
            type: "GET",
            dataType: "json",
            cache: false,
            ifModified: true,
            success: function (data) {
                if (data.code == Http.SUCCESS) {
                    var container = $("#top_seller_cids_ul"), template = _.template($("#top_cats_list_template").html());
                    container.html("<li data='-8'>自动分类类目</li>" + template({"list": data.result}));
                    Imitate_select(".sort_select_03", "sort_select_id_03", "sort_select_id_04", "top_seller_cid", recordList.load, recordList);
                } else {
                    Msg.error(data.message);
                }
            }
        });
    },
    timestamp:function(){
        return new Date().getTime();
    }
}