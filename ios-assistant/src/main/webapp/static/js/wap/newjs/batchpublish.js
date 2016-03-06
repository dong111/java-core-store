var itemsFinder;
var publisher;
var historysFinder;
$(function () {
    publisher = new Publisher();
    historysFinder = new HistorysFinder();
    itemsFinder = new ItemsFinder(publisher,historysFinder);
    if($("#type_hid").val()=="history"){
        itemsFinder.gotoHistoryTab();
    }
});

var ItemsFinder =function (publisher,historysFinder) {
    this.publisher = publisher;
    this.historysFinder = historysFinder;
    this.$tabGroup = $(".nav-tabs a");
    this.$conditionDiv = $(".item-condition");
    this.$itemsTb = $("#item-list-tb");
    this.$itemsDiv = $(".items-div");
    this.$historyDiv = $(".history-div");
    this.$detailsDiv = $(".details-div");
    this.$sellerCats = $('#seller_cats');
    this.$itemCats = $('#item_cats');
    this.$wapStatuBtns = $('.item-wap-status a');
    this.$approveStatuBtns = $('.approve_Status a');
    this.init();
    return this;
};

ItemsFinder.prototype = {
    PAGE_SIZE_ITEMS : 10,
    PAGE_INDEX_ITEMS : 1,
    DEFAULT_KEYWORDS : "输入宝贝关键字或链接",
    ITEM_CATS : '',
    SELLER_CATS : '',
    FILT_MODULE:0,
    SKIP_EXISTITEM:true,
    DESC_NODE_TYPE :1,
    CLIPS_DESC:0,
    INSELECT_SELLERCATS : [],
    QUERY_ITEMS_PARAMS : {wapDescType: -8,approveStatus: ""},
    INTERVAL_LIST:{},
    DELET_IID:0,
    EDIT_IID:0,
    DEL_WAP_FLAG:true,
    EDIT_WAP_FLAG:true,
    init:function(){//对象初始化方法glyphicon-qrcode
        this.bindTabchange()
            .bindCommonEve()
            .bindBatchPublish()
            .bindSellerCatsClick()
            .bindSettingBtn()
            .bindApproveStatusBtns()
            .bindWapStatusBtns()
            .bindTopCatsClick();
        this.loadItemList()
            .loadUserSetting()
            .loadTopCategory()
            .loadSellerCategory();
    },
    bindEditPicurls:function(){
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
        picLyaer.remove();
    });


    $(".details-img-div").hover(function(){
        $(this).find(".shade").show();
    },function(){
        $(this).find(".shade").hide();
    });



    },
    bindCommonEve:function(){
        var that = this;
        $(".sync-items-btn").bind("click",function(){
           that.loadItemList(true);
        });
        $(".glyphicon-search").bind("click",function(){
            that.loadItemList();
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
                        }
                        that.SKIP_EXISTITEM = settings.skipExistItem;
                        if(that.SKIP_EXISTITEM == false){
                            $("#skip-options").prop('checked', false).iCheck('update');
                        }
                        that.DESC_NODE_TYPE = settings.descNodeType;
                        $("[name='desc-node-type']").prop('checked', false).iCheck('update');
                        $("[name='desc-node-type'][data-type='"+that.DESC_NODE_TYPE+"']").prop('checked', true).iCheck('update');
                        that.CLIPS_DESC = settings.clipsDesc;
                        if(that.CLIPS_DESC == 1){
                            $("#del-more-options").prop('checked', true).iCheck('update');
                        }
                    }
                }else{
                    YTMsg.error('用户设置信息加载失败！', 10);
                }
            }
        });
        return that;
    },
    bindSettingBtn:function(){
        var that = this;
        $(".settings-btn").click(function(){
            $(this).next().toggle();
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
    bindBatchPublish:function(){
        var that = this;
        $(".batch-publish-btn").bind("click",function(){
            var iids =  that.publisher.iidsToString().trim();
            if(iids==undefined||iids==""){
                YTDialog.alert('您还没有选中宝贝');
                return false;
            }
            var params = {
                skip:that.SKIP_EXISTITEM,
                descType:that.DESC_NODE_TYPE,
                filtModule:that.FILT_MODULE,
                clipsDesc:that.CLIPS_DESC,
                iids:iids,
                name:"批量生成手机详情"
            };
            $.ajax({
                url:System.baseUrl + "api/v1/task/save??timestamp="+that.timestamp(),
                data:params,
                type : "POST",
                asyn:true,
                success :function (data) {
                    if(data&&data.success){
                        YTMsg.info(data.message);
                        //您当前还有手机详情任务在执行，请稍后再创建活动！
                        if(data.result==-9999){
                            return false;
                        }
                        //清空数据
                        that.publisher.clear();
                        //取消全选
                        $('.item-select-all').prop('checked', false).iCheck('update');
                        that.loadItemList();
                        //切换tab
                        that.gotoHistoryTab();
                    }else{
                        if(data.message==""){
                            YTMsg.error("很抱歉，任务创建失败，请联系管理员！");
                        }else{
                            YTMsg.error(data.message);
                        }
                    }
                }
            });
        });
        return that;
    },
    bindOnePublish:function(){
        var that = this;
      $(".one-publish").bind("click",function(){
          $(this).button('loading');
          var iid = $(this).data("iid");
          $("."+iid+"-status-bar").html("发布中……");
          var params = {
              skip:that.SKIP_EXISTITEM,
              descType:that.DESC_NODE_TYPE,
              filtModule:that.FILT_MODULE,
              clipsDesc:that.CLIPS_DESC,
              iids:iid,
              name:"单个生成手机详情"
          };
          $.ajax({
              url: System.baseUrl + "api/v1/task/save",
              data:params,
              type: "POST",
              dataType: "json",
              cache: false,
              ifModified: true,
              success: function (data) {
                  YTMsg.info(data.message);
                  that.gotoHistoryTab();
                  //不需要实施显示效果了
                  //that.INTERVAL_LIST[iid] = setInterval("itemsFinder.loadItemWapStauts("+iid+")",3000);//1000为1秒钟
              },
              error: function(data){
                  if (data.responseText != '') YTMsg.error(data.responseText);
              }
          });


      });
    },
    loadItemWapStauts:function(iid){
        var that = this;
        $.ajax({
            url:System.baseUrl +"api/v1/item/wldesc/onePreview.json",
            data:{iid:iid},
            cache: false,
            type : "GET",
            success : function(data){
                if (data.success) {
                    if(data.result.status==2){
                        $("."+iid+"-status-bar").html("已完成");
                        $("#"+iid+"-one-publish").button("reset");
                        clearInterval(that.INTERVAL_LIST[iid]);
                    }else{
                        var text = "发布中……";
                        if($("."+iid+"-status-bar").html()==text){
                            $("."+iid+"-status-bar").html("发布中…");
                        }else{
                            $("."+iid+"-status-bar").html(text);
                        }

                    }
                }else{
                    YTMsg.error('没有找到您要的手机详情！', 10);
                }
            }
        });
       return that;
    },
    bindQrcodeShow:function(){
        var that = this;
        var $qrcode = $(".glyphicon-qrcode");
        $qrcode.mousemove(function(){
            $("#"+$(this).data("iid")+"-qrcode").show();
        }).mouseout(function(){
            $("#"+$(this).data("iid")+"-qrcode").hide();
        });

        return that;
    },
    bindMoreBtns:function(){
        var that = this;
        var $moreBtns = $(".promo-btn");
        $moreBtns.mousemove(function(){
          $(this).find(".promo-type-item").show();
        }).mouseout(function(){
            $(this).find(".promo-type-item").hide();
        });


        $(".look-wap-btn").bind("click",function(){
            var iid = $(this).data("iid");
            $.ajax({
                url:System.baseUrl +"api/v1/item/wldesc/onePreview.json",
                data:{iid:iid},
                cache: false,
                type : "GET",
                success : function(data){
                    if (data.success) {
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
                    }else{
                        YTMsg.error('没有找到您要的手机详情！', 10);
                    }
                }
            });
        });

        $(".edit-wap-btn").bind("click",function(){
            var iid = $(this).data("iid");
            that.EDIT_IID = iid;
            $.ajax({
                url:System.baseUrl +"api/v1/item/wldesc/onePreview.json",
                data:{iid:iid},
                cache: false,
                type : "GET",
                success : function(data){
                    if (data.success) {
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
                        $(".edit-wap-dialog").modal("show");
                        that.bindEditPicurls();
                    }else{
                        YTMsg.error('没有找到您要的手机详情！', 10);
                    }
                }
            });
        });

        $(".del-wap-btn").bind("click",function(){
             that.DELET_IID = $(this).data("iid");
            $(".del-wap-dialog").modal("show");
        });
        //确定删除
        $(".del-item-btn").bind("click",function(){
            if(that.DEL_WAP_FLAG == true){
                that.DEL_WAP_FLAG = false;
            }else{
                return false;
            }
            $.ajax({
                url:System.baseUrl +"api/v1/item/update.json",
                data:{iid:that.DELET_IID
                        ,pics:""},
                cache: false,
                type : "POST",
                success : function(data){
                    if (data.success) {
                        if(data.result){
                            YTMsg.success('成功删除手机详情!', 3);
                            $("."+that.DELET_IID+"-status-bar").html("未发布");
                        }else{
                            YTMsg.error('手机详情删除失败啦!请重试', 3);
                        }
                    }else{
                        YTMsg.error('手机详情删除失败啦!请重试', 3);
                    }
                    that.loadItemList();
                    that.DEL_WAP_FLAG = true;
                }
            });
            $(".del-wap-dialog").modal("hide");
            return this;
        });

        //确定编辑
        $(".edit-item-btn").bind("click",function(){
            if(that.EDIT_WAP_FLAG == true){
                that.EDIT_WAP_FLAG = false;
            }else{
                return false;
            }
            var picUrls = "";
            $(".edit-img").each(function(){
                if($(this).find("img").length>0){
                    picUrls += $(this).find("img").attr("src")+",";
                }
            });
            $.ajax({
                url:System.baseUrl +"api/v1/item/update.json",
                data:{iid:that.EDIT_IID
                    ,pics:picUrls},
                cache: false,
                type : "POST",
                success : function(data){
                    if (data.success) {
                        if(data.result){
                            YTMsg.success('编辑手机详情成功!', 3);
                        }else{
                            YTMsg.error('手机详情编辑失败啦!请重试', 3);
                        }
                    }else{
                        YTMsg.error('手机详情编辑失败啦!请重试', 3);
                    }
                    that.loadItemList();
                    that.EDIT_WAP_FLAG = true;
                }
            });
            $(".edit-wap-dialog").modal("hide");
        });

        //关闭按钮
        $(".close-dialog").bind("click",function(){
           var name = $(this).data("name");
            $("."+name).modal("hide");
        });

        return that;
    },
    bindWapStatusBtns:function(){
        var that = this;
        this.$wapStatuBtns.bind("click",function(){
          that.QUERY_ITEMS_PARAMS["wapDescType"] = $(this).data("status");
          that.loadItemList();
          //变更样式
          that.$wapStatuBtns.removeClass("current");
          $(this).addClass("current");
        });
        return that;
    },
    bindApproveStatusBtns:function(){
        var that = this;
        this.$approveStatuBtns.bind("click",function(){
            that.QUERY_ITEMS_PARAMS["approveStatus"] = $(this).data("status");
            that.loadItemList();
            //变更样式
            that.$approveStatuBtns.removeClass("current");
            $(this).addClass("current");
        });
        return that;
    },
    bindTabchange:function(){//绑定table切换事件
        var that = this;
        this.$tabGroup.bind("click",function(){
           if($(this).data("tag")=="publish"){
                //显示选择条件区域
                that.$conditionDiv.show();
               //同步宝贝按钮显示
               $(".sync-items-btn").show();
               $(".post-settings").show();
               //展示宝贝列表
                that.$itemsDiv.show();
               //隐藏历史记录列表
               that.$historyDiv.hide();
               //隐藏详情列表
               that.$detailsDiv.hide();
           }else if($(this).data("tag")=="history"){
                that.gotoHistoryTab();
           }else if($(this).data("tag")=="details"){
               //隐藏选择条件区域
               that.$conditionDiv.hide();
               $(".sync-items-btn").hide();
               //隐藏宝贝列表
               that.$itemsDiv.hide();
               //隐藏历史记录列表
               that.$historyDiv.hide();
               //显示详情列表
               that.$detailsDiv.show();
           }
        });
        return that;
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
    loadItemList:function(async){//加载宝贝列表
        var that = this;
        that.clearTable();
        that.loadingTable();
        if(async){
            that.QUERY_ITEMS_PARAMS['forceSync'] = true;
        }
         var keyW = $("#item_keywords").val().trim();
        if (keyW == that.DEFAULT_KEYWORDS) {
            delete that.QUERY_ITEMS_PARAMS['keywords'];
        }else{
            that.QUERY_ITEMS_PARAMS['keywords'] = keyW;
        }
        that.QUERY_ITEMS_PARAMS['pageNum'] = that.PAGE_INDEX_ITEMS;
        that.QUERY_ITEMS_PARAMS['pageSize'] = that.PAGE_SIZE_ITEMS;
        if(that.getSellectSellerCats().length>0){
            that.QUERY_ITEMS_PARAMS['sellerCatId'] = that.getSellectSellerCats().join(",");
        }else{
            that.QUERY_ITEMS_PARAMS['sellerCatId'] = "-8";
        }
        if(that.getSelectItemCats().length>0){
            that.QUERY_ITEMS_PARAMS['topCatId'] = that.getSelectItemCats().join(",");
        }else{
            that.QUERY_ITEMS_PARAMS['topCatId'] = "-8";
        }
        $.ajax({
            url:System.baseUrl +"api/v1/item/page.json",
            data:that.QUERY_ITEMS_PARAMS,
            cache: false,
            type : "GET",
            success : function(data){
                if (data.success) {
                    that.clearTable();
                    that.initItemsTable(data);
                }else{
                    YTMsg.error('刷新失败！', 10);
                }
            }
        });
        return that;
    },
    initItemsTable:function(data){//初始化table
        var that = this;
        var listTemplate = _.template($("#template-item-list").html());
        var items = that.predulItems(data.result.content);
        var listTmpHtml = listTemplate({"items": items});
        that.$itemsTb.html(listTmpHtml);
        that.bindQrcodeShow().bindMoreBtns().bindOnePublish();
        that.publisher.binditemChecks();
        that.initItemsPage(data.result.number+1,data.result.totalPages
                            ,data.result.size,data.result.totalElements);
        return that;
    },
    initItemsPage: function (currPage, totalPage, pageSize, totalElements) {
        var that = this;
        var $page = $("#items-pagination");
        $page.show().bs_pagination({
            currentPage: currPage, // 当前页
            rowsPerPage: pageSize,// 每页显示多少条
            sizeList: [10,20,50,200],// size下拉框
            totalRows: totalElements, //总条说
            totalPages: totalPage, //总页数
            showRowsInfo: false,
            showTopPage: true,
            onChangePage: function (event, data) {
                if(data.currentPage){
                    that.PAGE_INDEX_ITEMS = data.currentPage;
                }
                if(data.rowsPerPage){
                    that.PAGE_SIZE_ITEMS = data.rowsPerPage;
                }
                that.loadItemList();
            }
        });
        return that;
    },
    predulItems:function(items){
        var that = this;
        if(items==undefined||items.length<1){
            return items;
        }
        for(var i = 0;i<items.length;i++){
            var item = items[i];
            items[i]["STATUS_DESC"] = that.convertItemStatusAndType(item.STATUS,item.DESC_NODE_TYPE,item.IID,item.PIC_URL);
        }
        return items;
    },
    convertItemStatusAndType:function(status,descType,iid,pics){
        var statusDesc = "未发布";
        if(status==-1){
            statusDesc = "未发布";
        }else if(status==0){
            statusDesc = "发布中";
        }else if(status==6){
            statusDesc = "已有手机详情";
        }else if(status==2){
            if(descType==0){
                statusDesc = "已发布图片";
            }else{
                statusDesc = "已发布图文";
            }
        }else if(status==7){
            statusDesc = "未发布";
        }

        return statusDesc;
    },
    clearTable:function(){//清空表格中(表头以外)所有行数据
        this.$itemsTb.children().remove();
    },
    loadingTable:function(){//清空表格中(表头以外)所有行数据
        this.$itemsTb.html("<tr><td colspan='4' style='text-align: center;'>" +
        "<img src='"+System.baseUrl+"static/imges/loading.gif' alt='努力加载中...';/>" +
        "</td></tr>");
    },
    refresh:function(){//刷新按钮

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
            that.loadItemList();
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
    cleanKeyword:function(){
        $('#item_keywords').val(this.DEFAULT_KEYWORDS);
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
    changeTabByName:function(name){
        var that = this;
        that.$tabGroup.each(function(){
           if($(this).data("tag")==name){
               $(this).parent().addClass("active");
           }else{
               $(this).parent().removeClass("active");
           }
        });
        return this;
    },
    wapInfoFormat: function(result){
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
    },
    gotoHistoryTab:function(){
        var that = this;
        that.historysFinder.loadList();
        that.changeTabByName("history");
        //隐藏选择条件区域
        that.$conditionDiv.hide();
        $(".sync-items-btn").hide();
        $(".post-settings").hide();
        //隐藏宝贝列表
        that.$itemsDiv.hide();
        //展示历史记录列表
        that.$historyDiv.show();
        //隐藏详情列表
        that.$detailsDiv.hide();
        return that;
    },
    timestamp:function(){
        return new Date().getTime();
    }


};





//负责手机详情活动发布创建
var Publisher = function () {
    this.init();
};

Publisher.prototype = {
    SELECTED_IIDS:[],
    init:function(){//对象初始化方法
        this.bindItemsSelectAll();
    },
    binditemChecks:function(){
        var that = this;
        $(".item-chk").iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                that.addIid($(this).data("iid"));
            }else{
                that.removeIid($(this).data("iid"));
            }
        });
        return that;
    },
    bindItemsSelectAll:function(){
        var that = this;
        $(".item-select-all").iCheck().on('ifChanged', function() {
            if($(this).prop('checked')){
                $(".item-chk").each(function(){
                    that.addIid($(this).data("iid"));
                    $(this).iCheck('check');
                });
            }else{
                $(".item-chk").each(function(){
                    that.removeIid($(this).data("iid"));
                    $(this).iCheck('uncheck');
                });
            }
        });
        return that;
    },
    batchTwSave:function(){//批量保存方法

    },
    gotoList:function(){//跳转到任务列表
        window.location.href = System.baseUrl+$("#floderCtrol").val()+"/task/list";
    },
    /************************选中宝贝集合方法***************************************/
    existIid : function (iid) {
    return Array.contains(this.SELECTED_IIDS, iid);
    },
    addIid:function(iid){
        if(!Array.contains(this.SELECTED_IIDS, iid)){
            this.SELECTED_IIDS.push(iid);
        }
    },
    removeIid : function (iid) {
    if(Array.contains(this.SELECTED_IIDS, iid)){
        return Array.remove(this.SELECTED_IIDS, iid);
    }},
    clear : function () {
        Array.clear(this.SELECTED_IIDS);
    },
    getSelectedItemsSize : function () {
    return this.SELECTED_IIDS.length;
    },
    getAllIids :function () {
        return this.SELECTED_IIDS.length;
    },
    iidsToString : function(){
        return this.SELECTED_IIDS.toString();
    }
};






