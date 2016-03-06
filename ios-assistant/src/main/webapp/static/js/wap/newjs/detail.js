var detailsFinder;
var recordList;
$(function () {
    detailsFinder = new DetailsFinder();
    recordList = new RecordList();
});


var RecordList = function () {

    this.init();
};
RecordList.prototype = {
    EDIT_IID:0,
    SUBTASK_ID:0,
    picTotalSize:0,
    RETRY_PARAMS:{},
    init:function(){
        this.bindCommonEve();
    },
    bindCommonEve:function(){
        var that = this;

        //确定编辑
        $(".sure-retry").bind("click",function(){
            var name = $(this).data("name");
            $("."+name).modal("hide");
            that.retryAjax();
        });
        return that;
    },
    editWap: function(subTaskId,iid){
        var that = this;
        if(subTaskId == ""){
            YTDialog.alert("重新发布的活动ID不能为空！");
            return false;
        }
        that.wapeditByTask(iid,subTaskId);
        return that;
    },
    bindEditPicurls:function(){
        var that = this;
        $(".glyphicon-arrow-up").bind("click",function(){
            var picLyaer = $(this).parent().parent().parent();
            if(picLyaer.prev().length>0){
                //存在上一级元素
                picLyaer.insertBefore(picLyaer.prev());
            }else{
                //已经是最顶部了

            }

        });
        $(".glyphicon-arrow-down").bind("click",function(){
            var picLyaer = $(this).parent().parent().parent();
            if(picLyaer.next().length>0){
                //存在下一级元素
                picLyaer.next().insertBefore(picLyaer);
            }else{
                //已经是最底部了

            }
        });
        $(".glyphicon-remove").bind("click",function(){
            var picLyaer = $(this).parent().parent().parent();
            that.picTotalSize -= picLyaer.attr("size");
            if(Math.ceil(that.picTotalSize/1000)>2560){
                $("#picSize").css("color","red");
            }else{
                $("#picSize").css("color","green");
            }
            $("#picSize").html(Math.ceil(that.picTotalSize/1000));
            picLyaer.remove();
        });


        $(".details-img-div").hover(function(){
            $(this).find(".shade").show();
        },function(){
            $(this).find(".shade").hide();
        });


        //确定编辑
        $(".edit-item-btn").bind("click",function(){
            var picUrls = "";
            $(".edit-img").each(function(){
                if($(this).find("img").length>0){
                    picUrls += $(this).find("img").attr("src")+",";
                }
            });
            $.ajax({
                url:System.baseUrl +"api/v1/task/sub/uploadOne",
                data:{subTaskId:that.SUBTASK_ID,
                    iidStr:that.EDIT_IID
                    ,pics:picUrls},
                dataType: "json",
                cache: false,
                type : "POST",
                success : function(data){
                    if (data.success) {
                        if(data.result){
                            YTMsg.success('编辑手机详情成功!', 3);
                            detailsFinder.loadList();
                        }else{
                            YTMsg.error('手机详情编辑失败啦!请重试', 3);
                        }
                    }else{
                        YTMsg.error('手机详情编辑失败啦!请重试', 3);
                    }
                }
            });
            $(".task-setttings").modal("hide");
        });



        return that;
    },
    wapeditByTask:function(iid,subTaskId){
        var that = this;
        that.EDIT_IID = iid;
        that.SUBTASK_ID = subTaskId;
        $.ajax({
            url:baseUrl+'api/v1/task/sub/onePreview/task',
            data:{iid:iid,id:subTaskId},
            type:'GET',
            dataType:'JSON',
            cache: false,
            ifModified: true,
            success: function(data){
                var template = $('#edit_preview_template').html();
                var result = data.result;

                var pics ="";
                if(null != result && null !=result.picUrls){
                    pics = that.wapInfoFormat(result);
                }
                $('#edit_preview').html(_.template(template, {
                    list: pics,
                    baseUrl:baseUrl
                }));

                if(result.picUrls.indexOf("sizes")>0){//可以编辑图片数据格式不同（不是字符串，改成json，需要预处理）
                    var picObjList = JSON.parse(result.picUrls);
                    that.picTotalSize = 0;
                    for(var i=0;i<picObjList.length;i++){
                        var size = picObjList[i].sizes;
                        $(".edit-img").eq(i).attr("size",size);
                        that.picTotalSize += size;
                    }
                    $("#picSize").attr("class", "color-red").html(Math.ceil(that.picTotalSize / 1000));
                    $("#edit-wap-stabar").show();
                }else{
                    YTDialog.alert("手机详情格式异常，无法编辑，请联系客服！");
                    return false;
                }


                that.bindEditPicurls();
                $(".edit-wap-dialog").modal("show");
                //            $("#retry_div").show();
            },
            error: function(data){
                if (data.responseText != '') YTDialog.alert(data.responseText);
            }
        });
        return that;
    },
    wapInfoFormat: function(result){
        var pics = "";
        if(result.edit||result.picUrls.indexOf("picturePath")>0){//可以编辑图片数据格式不同（不是字符串，改成json，需要预处理）
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
            if(result.picUrls.indexOf("http")>0){
                pics = result.picUrls.split(",");
            }else{
                return [];
            }
        }
        return pics;
    },
    bindRetryA:function(){//兼容ie8
        var that = this;
        $(".retry-a").bind("click",function(){
            var subTaskId = $(this).data("subid");
            var iid = $(this).data("iid");
            that.retry(subTaskId,iid);
        });
        $(".editWap-a").bind("click",function(){
            var subTaskId = $(this).data("subid");
            var iid = $(this).data("iid");
            that.editWap(subTaskId,iid);
        });
        return that;
    },
    retry: function(subTaskId,iid){
        var that = this;
        if(subTaskId == ""){
            YTDialog.alert("重新发布的活动ID不能为空！");
            return false;
        }

        var params = {subTaskId:subTaskId,
            itemId:iid};

        if($("."+iid+"-retry").data("value")=="unfitmod"){
            params["isUnFitMod"] = true;
            $(".task-setttings").modal("show");
        }else{
            that.retryAjax();
        }
        that.RETRY_PARAMS = params;

        return that;

    },
    retryAjax:function(){
        var that = this;
        $.ajax({
            url: System.baseUrl + 'api/v1/task/sub/retry',
            data:that.RETRY_PARAMS,
            type: "POST",
            dataType: "json",
            cache: false,
            ifModified: true,
            success: function (data) {
                YTMsg.success('重新发布成功!');
                detailsFinder.loadList();
            },
            error: function(data){
                if (data.responseText != '') YTMsg.error(data.responseText);
            }
        });
        return that;
    },
    timestamp:function(){
        return new Date().getTime();
    }
};



var DetailsFinder = function () {
    this.STATUS = $("#status_hid").val();
    this.TASK_ID = $("#taskId_hid").val();
    this.$listDiv = $(".details-list");
    this.$listTmp = $("#detail_list_template");
    this.$sellerCats = $('#seller_cats');
    this.$itemCats = $('#item_cats');
    this.$wapStatuBtns = $('.item-wap-status a');
    this.$approveStatuBtns = $('.approve_Status a');
    this.$page = $("#details-pagination");
    this.init();
};

DetailsFinder.prototype = {
    PAGE_SIZE : 10,
    PAGE_INDEX : 1,
    DEFAULT_KEYWORDS : "输入宝贝关键字或链接",
    ITEM_CATS : '',
    SELLER_CATS : '',
    STATUS:"",
    TASK_ID:"",
    subTaskId:"",
    QUERY_PARAMS:{status: 3,approveStatus: ""},
    FILT_MODULE:0,
    SKIP_EXISTITEM:true,
    DESC_NODE_TYPE :1,
    CLIPS_DESC:0,
    init:function(){
        this.bindCommonEve()
            .bindSellerCatsClick()
            .bindSettingBtn()
            .bindApproveStatusBtns()
            .bindWapStatusBtns()
            .bindTopCatsClick();
        this.loadList()
            .loadTopCategory()
            .loadSellerCategory();

    },
    bindOldCommon:function(){
        var that = this;
        $(".preview_btn").on("click",function(){
            that.subTaskId = $(this).data("id");
            that.wapPreviewByTask($(this).data("val"),that.subTaskId);
        });
        //关闭按钮
        $(".close-dialog").bind("click",function(){
            var name = $(this).data("name");
            $("."+name).modal("hide");
        });

        //状态栏显示
        that.$wapStatuBtns.each(function(){
            if($(this).data("status")==that.STATUS){
                $(this).addClass("current");
            }else{
                $(this).removeClass("current");
            }
        });


        return that;
    },
    wapPreviewByTask: function(iid,subTaskId){
        var that = this;
        $.ajax({
            url:baseUrl+'api/v1/task/sub/onePreview/task',
            data:{iid:iid,id:subTaskId},
            type:'GET',
            dataType:'JSON',
            cache: false,
            ifModified: true,
            success: function(data){
                    var template = $('#look_preview_template').html();
                    var result = data.result;
                    var pics ="";
                    if(null != result && null !=result.picUrls){
                        pics = that.wapInfoFormat(result);
                    }
                    $('#look_preview').html(_.template(template, {
                        list: pics,
                        baseUrl:baseUrl
                    }));
                    $(".look-wap-dialog").modal("show");
    //            $("#retry_div").show();
            },
            error: function(data){
                if (data.responseText != '') YTDialog.alert(data.responseText);
            }
        });
            return that;
    },
    wapInfoFormat: function(result){
        var pics = "";
        if(result.edit||result.picUrls.indexOf("picturePath")>0){//可以编辑图片数据格式不同（不是字符串，改成json，需要预处理）
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
            if(result.picUrls.indexOf("http")>0){
                pics = result.picUrls.split(",");
            }else{
                return [];
            }
        }
        return pics;
    },
    bindCommonEve:function(){
      var that = this;
        $(".glyphicon-search").bind("click",function(){
           that.loadList();
        });
        $(".sync-btn").bind("click",function(){
            that.loadList();
        });

        //搜索关键字事件方法
        $('#item_keywords').click(function () {
            var self = $(this);
            if (self.val() == that.DEFAULT_KEYWORDS) {
                self.val('');
            }
        }).blur(function () {
            var self = $(this);
            if (self.val() == '') {
                self.val(that.DEFAULT_KEYWORDS);
            }
        });

      return that;
    },
    bindSettingBtn:function(){
        var that = this;
        $(".settings-btn").click(function(){
            $(".task-setttings").modal("show");
        });
        $(".ui-close").click(function(){
            $(this).parent().toggle();
        });
        $(".settings-save").click(function(){
            var params = {skip:that.SKIP_EXISTITEM
                ,descType:that.DESC_NODE_TYPE
                ,filtModule:that.FILT_MODULE
                ,clipsDesc:that.CLIPS_DESC};
            $.ajax({
                url:System.baseUrl +"api/v1/user/setting/save",
                data:params,
                cache: false,
                dataType: "json",
                type : "POST",
                success : function(data){
                    if (data.success) {
                        YTMsg.success('保存成功!');
                        $(".release-way").hide();
                    }else{
                        YTMsg.error('用户设置信息加载失败！', 10);
                    }
                }
            });
        });
        $('#fltmod-options').iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                that.FILT_MODULE = 1;
            }else{
                that.FILT_MODULE = 0;
            }
        });
        $('#skip-options').iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                that.SKIP_EXISTITEM = 1;
            }else{
                that.SKIP_EXISTITEM = 0;
            }
        });
        $('#del-more-options').iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                that.CLIPS_DESC = 1;
            }else{
                that.CLIPS_DESC = 0;
            }
        });
        $('[name="desc-node-type"]').iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                that.DESC_NODE_TYPE =$(this).data("type");
            }
        });

        return that;
    },
    loadUserSetting :function(){
        var that = this;
        $.ajax({
            url:System.baseUrl +"api/v1/user/setting/query.json",
            cache: false,
            type : "GET",
            success : function(data){
                if (data.success) {
                    var settings = data.result;
                    if(settings){
                        that.FILT_MODULE = settings.filtModule;
                        if(that.FILT_MODULE == 1){
                            $("#fltmod-options").prop('checked', true).iCheck('update');
                        }else{
                            $("#fltmod-options").prop('checked', false).iCheck('update');
                        }
                        that.SKIP_EXISTITEM = settings.skipExistItem;
                        if(that.SKIP_EXISTITEM == false){
                            $("#skip-options").prop('checked', false).iCheck('update');
                        }else{
                            $("#skip-options").prop('checked', true).iCheck('update');
                        }
                        that.DESC_NODE_TYPE = settings.descNodeType;
                        $("[name='desc-node-type']").prop('checked', false).iCheck('update');
                        $("[name='desc-node-type'][data-type='"+that.DESC_NODE_TYPE+"']").prop('checked', true).iCheck('update');
                        that.CLIPS_DESC = settings.clipsDesc;
                        if(that.CLIPS_DESC == 1){
                            $("#del-more-options").prop('checked', true).iCheck('update');
                        }else{
                            $("#del-more-options").prop('checked', false).iCheck('update');
                        }
                    }
                }else{
                    YTMsg.error('用户设置信息加载失败！', 10);
                }
            }
        });
        return that;
    },
    loadList:function(){//加载宝贝列表
        var that = this;
        that.clearTable();
        that.loadingTable();
        that.QUERY_PARAMS['num'] = that.PAGE_INDEX;
        that.QUERY_PARAMS['size'] = that.PAGE_SIZE;
        that.QUERY_PARAMS['taskId'] = that.TASK_ID;
        if(Number(that.STATUS)==3){
            delete that.QUERY_PARAMS['status'];
        }else{
            that.QUERY_PARAMS['status'] = that.STATUS;
        }

        var keyW = $("#item_keywords").val().trim();
        if (keyW == that.DEFAULT_KEYWORDS) {
            delete that.QUERY_PARAMS['searchKey'];
        }else{
            that.QUERY_PARAMS['searchKey'] = keyW;
        }

        if(that.getSellectSellerCats().length>0){
            that.QUERY_PARAMS['sellerCatId'] = that.getSellectSellerCats().join(",");
        }else{
            that.QUERY_PARAMS['sellerCatId'] = "-8";
        }
        if(that.getSelectItemCats().length>0){
            that.QUERY_PARAMS['topCatId'] = that.getSelectItemCats().join(",");
        }else{
            that.QUERY_PARAMS['topCatId'] = "-8";
        }
        $.ajax({
            url:System.baseUrl +"api/v1/task/sub/page.json?timestamp="+that.timestamp(),
            data:that.QUERY_PARAMS,
            cache: false,
            type : "GET",
            success : function(data){
                if (data) {
                    that.initItemsTable(that.preDulSubData(data));
                    recordList.bindRetryA();
                }else{
                    YTMsg.error('没有找到您需要的宝贝！', 10);
                }
            }
        });
        return that;
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
                //task["deploy"] = "<a href='javascript:recordList.retry(" + task.id + "," + task.iid + ");'>重试</a>";
                task["deploy"] = "<a class='retry-a'  data-subid='"+task.id+"' data-iid='"+task.iid +"'>重试</a>";
                if(task.exeMessage.indexOf("商品已被删除")>0){
                    task["deploy"] ="--";
                }else if(task.exeMessage.indexOf("宝贝手机详情内容中图片大小不合法")>0){
                    task["deploy"] = "<a class='editWap-a'  data-subid='"+task.id+"' data-iid='"+task.iid +"'>编辑</a>";
                    //task["deploy"] ="<a href='javascript:recordList.editWap(" + task.id + "," + task.iid + ");'>编辑</a>"
                }else if(task.exeMessage.indexOf("大小不能超过1.5M")>0
                        ||task.exeMessage.indexOf("大小不能超过2.5M")>0){
                    task["deploy"] = "<a class='editWap-a'  data-subid='"+task.id+"' data-iid='"+task.iid +"'>编辑</a>";
                    //task["deploy"] ="<a href='javascript:recordList.editWap(" + task.id + "," + task.iid + ");'>编辑</a>"
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
    initItemsTable:function(data){//初始化table
        var that = this;
        $("#count-lab").html(data.totalElements);
        var listTemplate = _.template(that.$listTmp.html());
        var lists = that.predulLists(data.content);
        var labStauts = that.STATUS;
        if(labStauts==3){
            labStauts = "";
        }
        var listTmpHtml = listTemplate({"list": lists,status:labStauts || ""});
        that.$listDiv.html(listTmpHtml);
        that.bindOldCommon();
        that.initItemsPage(data.number+1,data.totalPages
            ,data.size,data.totalElements);
        return that;
    },
    predulLists:function(lists){//预处理数据,默认不处理
        return lists;
    },
    initItemsPage: function (currPage, totalPage, pageSize, totalElements) {
        var that = this;
        that.$page.show().bs_pagination({
            currentPage: currPage, // 当前页
            rowsPerPage: pageSize,// 每页显示多少条
            sizeList: [10,20,50],// size下拉框
            totalRows: totalElements, //总条说
            totalPages: totalPage, //总页数
            showRowsInfo: false,
            showTopPage: false,
            onChangePage: function (event, data) {
                if(data.currentPage){
                    that.PAGE_INDEX = data.currentPage;
                }
                if(data.rowsPerPage){
                    that.PAGE_SIZE = data.rowsPerPage;
                }
                that.loadList();
            }
        });
        return that;
    },
    clearTable:function(){//清空表格中(表头以外)所有行数据
        this.$listDiv.children().remove();
    },
    loadingTable:function(){//清空表格中(表头以外)所有行数据
        this.$listDiv.html("<tr><td colspan='4' style='text-align: center;'>" +
        "<img src='"+System.baseUrl+"static/imges/loading.gif' alt='努力加载中...';/>" +
        "</td></tr>");
    },
    bindTopCatsClick:function(){
        var that = this;
        //自动类目触发事件
        $('.js-display-item-cat').click(function () {
            $(this).find('.js-cat-name').removeClass('todo').addClass('current');
            $('.js-display-seller-cat').find('.js-cat-name').removeClass('current').addClass('todo');
            that.$sellerCats.find('.js-yt-icheck').prop('checked', false);
            that.$sellerCats.find('.js-yt-icheck').iCheck('update');
            that.$itemCats.find('.js-yt-icheck').each(function (i, ele) {
                if ($(ele).prop('checked')) {
                    that.INSELECT_ITEMCATS = _.union(that.INSELECT_ITEMCATS, $(ele).val());
                } else {
                    that.INSELECT_ITEMCATS = _.without(that.INSELECT_ITEMCATS, $(ele).val());
                }
            });
            that.$itemCats.find('.js-yt-icheck').iCheck('update');
            that.$sellerCats.slideUp();
            that.$itemCats.slideDown();
        });
        return that;
    },
    bindSellerCatsClick:function(){
        var that = this;
        //自定义类目触发事件
        $('.js-display-seller-cat').click(function () {
            $(this).find('.js-cat-name').removeClass('todo').addClass('current');
            $('.js-display-item-cat').find('.js-cat-name').removeClass('current').addClass('todo');
            that.$itemCats.find('.js-yt-icheck').prop('checked', false);
            that.$itemCats.find('.js-yt-icheck').iCheck('update');
            that.$sellerCats.find('.js-yt-icheck').each(function (i, ele) {
                if ($(ele).prop('checked')) {
                    that.INSELECT_SELLERCATS = _.union(that.INSELECT_SELLERCATS, $(ele).val());
                } else {
                    that.INSELECT_SELLERCATS = _.without(that.INSELECT_SELLERCATS, $(ele).val());
                }
            });
            that.$sellerCats.find('.js-yt-icheck').iCheck('update');
            that.$itemCats.slideUp();
            that.$sellerCats.slideDown();

        });
        return that;
    },
    bindWapStatusBtns:function(){
        var that = this;
        this.$wapStatuBtns.bind("click",function(){
            that.STATUS = $(this).data("status");
            that.loadList();
            //变更样式
            that.$wapStatuBtns.removeClass("current");
            $(this).addClass("current");
        });
        return that;
    },
    bindApproveStatusBtns:function(){
        var that = this;
        this.$approveStatuBtns.bind("click",function(){
            that.QUERY_PARAMS["approveStatus"] = $(this).data("status");
            that.loadList();
            //变更样式
            that.$approveStatuBtns.removeClass("current");
            $(this).addClass("current");
        });
        return that;
    },
    loadTopCategory:function(){//加载自动类目
        var that = this;
        if (that.ITEM_CATS != '') {
            this.buildItemCats(that.ITEM_CATS);
            return;
        }
        $.ajax({
            url: System.baseUrl + "api/v1/cat/list.json",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data.code != Http.SUCCESS) {
                    YTMsg.error(data.message);
                    return;
                }
                that.buildItemCats(data.result);
                that.ITEM_CATS = data.result;
            },
            error: function (data) {
            }
        });
        return that;
    },
    loadSellerCategory:function(){//加载自定义类目
        var that = this;
        if (that.SELLER_CATS != '') {
            that.buildSellerCats(that.SELLER_CATS);
            return;
        }
        $.ajax({
            url: System.baseUrl + "api/v1/cat/list/by/seller.json",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data.code != Http.SUCCESS) {
                    YTMsg.error(data.message);
                    return;
                }
                that.SELLER_CATS = data.result;
                that.buildSellerCats(data.result);
            },
            error: function (data) {
            }
        });

        return that;
    },
    buildItemCats:function(itemCats){
        var that = this;
        var html = '<div class="select-cat"><input class="js-yt-icheck js-select-all-item-cats" type="checkbox" value="" />全部</div>';
        for (var i = 0, length = itemCats.length; i < length; i++) {
            var itemCat = itemCats[i];
            html += '<div class="select-cat"><input data-cat-name="' + itemCat.name + '" class="js-yt-icheck js-item-cat" type="checkbox" value="' + itemCat.cid + '">' + itemCat.name + '(<i class="text-danger">' + itemCat.count + '</i>个宝贝)</div>';
        }
        html += '<div><button class="btn btn-primary btn-sm js-search-item-cats" style="margin: 10px;">确定</button>' +
        '<button class="btn btn-default btn-sm js-cancel-search-item-cats" style="margin: 10px;">取消</button></div>';
        $('#item_cats').html(html);
        $('#item_cats .js-yt-icheck').iCheck();
        that.bindItemCatsEvent();
        return that;
    },
    bindItemCatsEvent:function(){
        var that = this;
        var $itemCats = that.$itemCats;
        $itemCats.find('.js-select-all-item-cats').on('ifChanged', function (event) {
            if ($(this).prop('checked')) {
                $itemCats.find('.js-yt-icheck').prop('checked', true);
            } else {
                $itemCats.find('.js-yt-icheck').prop('checked', false);
            }
            $itemCats.find('.js-yt-icheck').iCheck('update');
        });

        $itemCats.find('.js-search-item-cats').click(function () {
            that.cleanKeyword();
            $('.js-display-seller-cat').find('.js-display-names').val('全部');
            that.loadList();
            $itemCats.slideUp();
        });

        $itemCats.find('.js-cancel-search-item-cats').click(function () {
            $('.js-select-all-item-cats').prop('checked', false);
            $itemCats.find('.js-yt-icheck').each(function (i, ele) {
                if (that.INSELECT_ITEMCATS.length > 0 &&
                    _.indexOf(that.INSELECT_ITEMCATS, $(ele).val()) >= 0) {
                    $(ele).prop('checked', true);
                } else {
                    $(ele).prop('checked', false);
                }
            });
            $itemCats.find('.js-yt-icheck').iCheck('update');
            $itemCats.slideUp();
        });
        return that;
    },
    buildSellerCats: function (sellerCats) {
        var that = this;
        var html = '<div class="select-cat"><input class="js-yt-icheck js-select-all-seller-cats" type="checkbox" value="" />全部</div>';
        for (var i = 0, length = sellerCats.length; i < length; i++) {
            var sellerCat = sellerCats[i];
            html += '<div class="select-cat"><input data-cat-name="' + sellerCat.name + '"  class="js-yt-icheck js-seller-cat" type="checkbox" value="' + sellerCat.cid + '">' + sellerCat.name + '(<i class="text-danger">' + sellerCat.count + '</i>个宝贝)</div>';
        }
        html += '<div><button class="btn btn-primary btn-sm js-search-seller-cats" style="margin: 10px;">确定</button>' +
        '<button class="btn btn-default btn-sm js-cancel-search-seller-cats" style="margin: 10px;">取消</button></div>';
        $('#seller_cats').html(html);
        $('#seller_cats .js-yt-icheck').iCheck();
        that.bindSellerCatsEvent();
        return that;
    },
    bindSellerCatsEvent: function () {
        var that = this;
        var $sellerCats = that.$sellerCats;
        $sellerCats.find('.js-select-all-seller-cats').on('ifChanged', function (event) {
            if ($(this).prop('checked')) {
                $sellerCats.find('.js-yt-icheck').prop('checked', true);
            } else {
                $sellerCats.find('.js-yt-icheck').prop('checked', false);
            }
            $sellerCats.find('.js-yt-icheck').iCheck('update');
        });

        $sellerCats.find('.js-search-seller-cats').click(function () {
            that.cleanKeyword();
            $('.js-display-item-cat').find('.js-display-names').val('全部');
            that.loadItemList();
            $sellerCats.slideUp();
        });

        $sellerCats.find('.js-cancel-search-seller-cats').click(function () {
            $sellerCats.find('.js-yt-icheck').each(function (i, ele) {
                if (that.INSELECT_SELLERCATS.length > 0 &&
                    _.indexOf(that.INSELECT_SELLERCATS, $(ele).val()) >= 0) {
                    $(ele).prop('checked', true);
                } else {
                    $(ele).prop('checked', false);
                }
            });
            $sellerCats.find('.js-yt-icheck').iCheck('update');
            $sellerCats.slideUp();
            // 取消已经选在的类目
            // $('#seller_cats :checked').iCheck('uncheck');
        });
        return that;
    },
    getSellectSellerCats: function () {
        var that = this;
        var selectSellerCats = [];
        var isSelectAll = true;
        that.$sellerCats.find('.js-seller-cat').each(function (i, ele) {
            if ($(ele).prop('checked')) {
                selectSellerCats.push($(ele).val());
            } else {
                isSelectAll = false;
            }
        });
        $('.js-display-seller-cat').find('.js-display-names').val(that.getSelectSellerCatNames(isSelectAll));
        return selectSellerCats;
    },
    getSelectSellerCatNames: function (isSelectAll) {
        if ($('#seller_cats').parent().find('.js-cat-name.current').length <= 0) {
            return '全部';
        }
        var selectSellerCatNames = '', j = 0;
        $('#seller_cats').find('.js-seller-cat').each(function (i, ele) {
            if ($(ele).prop('checked')) {
                j++;
                selectSellerCatNames += $(ele).data('cat-name') + ' ';
            }
        });
        if (j > 3 || selectSellerCatNames == '') {
            selectSellerCatNames = '已选' + j + '个类目';
        }
        if (j <= 0 || isSelectAll) {
            selectSellerCatNames = '全部';
        }
        return selectSellerCatNames;
    },
    getSelectItemCats: function () {
        var that = this;
        var selectItemCats = [];
        var isSelectAll = true;
        that.$itemCats.find('.js-item-cat').each(function (i, ele) {
            if ($(ele).prop('checked')) {
                selectItemCats.push($(ele).val());
            } else {
                isSelectAll = false;
            }
        });
        $('.js-display-item-cat').find('.js-display-names').val(that.getSelectItemCatNames(isSelectAll));
        return selectItemCats;
    },
    getSelectItemCatNames: function (isSelectAll) {
        if ($('#item_cats').parent().find('.js-cat-name.current').length <= 0) {
            return '全部';
        }
        var selectItemCatNames = '', j = 0;
        $('#item_cats').find('.js-item-cat').each(function (i, ele) {
            if ($(ele).prop('checked')) {
                j++;
                selectItemCatNames += $(ele).data('cat-name') + ' ';
            }
        });
        if (j > 3 || selectItemCatNames == '') {
            selectItemCatNames = '已选' + j + '个类目';
        }
        if (j <= 0 || isSelectAll) {
            selectItemCatNames = '全部';
        }
        return selectItemCatNames;
    },
    retry: function(subTaskId,iid){
        var that = this;
        if(subTaskId == ""){
            YTDialog.alert("重新发布的活动ID不能为空！");
            return false;
        }

        var params = {subTaskId:subTaskId,
                        itemId:iid};
        if($("."+iid+"-retry").data("value")=="unfitmod"){
            params["isUnFitMod"] = true;
        }
        $.ajax({
            url: System.baseUrl + 'api/v1/task/sub/retry',
            data:params,
            type: "POST",
            dataType: "json",
            cache: false,
            ifModified: true,
            success: function (data) {
                YTDialog.alert(data.message);
                that.loadList();
            },
            error: function(data){
                if (data.responseText != '') YTMsg.error(data.responseText);
            }
        });

    },
    timestamp:function(){
        return new Date().getTime();
    }
};
