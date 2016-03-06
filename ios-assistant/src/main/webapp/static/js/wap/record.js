
$(function () {
    record = new Record();
    record.load();
    $("#syn_task").on("click",function(){
        record.load();
    });
});
var Record = function () {
};

Record.prototype = {
    pageSize: 10,
    curPageNo: '',
    load: function(page){
        var that = this;
        var param = {
            size: that.pageSize,
            num: that.curPageNo
        };
        $("#tasks_container").html('<tr > <td colspan="7" style="text-align: center;"> <img src="'+System.baseUrl+'static/img/loading.gif"></td></tr>');
        $.ajax({
            url:System.baseUrl+'api/v1/task/page',
            data:param,
            type:'GET',
            dataType:'JSON',
            cache: false,
            ifModified: true,
            success: function(data){

                var pageContent = data.result, template = $('#record_template').html();
                $('#tasks_container').html(_.template(template, {
                    list: pageContent.content
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
                        that.pageSize = $('#select-item-id').val() || that.pageSize;
                        that.curPageNo = ++pageNum;
                        that.load(that.curPageNo);
                        return true;
                    }
                });
            },
            error: function(data){
                if (data.responseText != '') wx_alert(data.responseText);
            }
        });
    }
}