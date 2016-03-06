


var HistorysFinder = function () {
    this.$listDiv = $(".list-div");
    this.$listTmp = $("#template-history-list");
    this.$page = $("#history-pagination");
    this.init();
};

HistorysFinder.prototype = {
    PAGE_SIZE : 10,
    PAGE_INDEX : 1,
    QUERY_PARAMS:{},
    init:function(){
        this.bindCommonEve();
        this.loadList();
    },
    bindCommonEve:function(){
      var that = this;
        $(".sync-history").bind("click",function(){
            that.loadList();
        });
      return that;
    },
    loadList:function(){//加载宝贝列表
        var that = this;
        that.clearTable();
        that.loadingTable();
        that.QUERY_PARAMS['num'] = that.PAGE_INDEX;
        that.QUERY_PARAMS['size'] = that.PAGE_SIZE;
        $.ajax({
            url:System.baseUrl +"api/v1/task/page.json",
            data:that.QUERY_PARAMS,
            cache: false,
            type : "GET",
            success : function(data){
                if (data.success) {
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
        var listTemplate = _.template(that.$listTmp.html());
        var lists = that.predulLists(data.result.content);
        var listTmpHtml = listTemplate({"lists": lists});
        that.$listDiv.html(listTmpHtml);
        that.initItemsPage(data.result.number+1,data.result.totalPages
            ,data.result.size,data.result.totalElements);
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
        this.$listDiv.html("<tr><td colspan='7' style='text-align: center;'>" +
        "<img src='"+System.baseUrl+"static/imges/loading.gif' alt='努力加载中...';/>" +
        "</td></tr>");
    },
};
