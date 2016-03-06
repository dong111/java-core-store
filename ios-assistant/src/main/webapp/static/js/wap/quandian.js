var timer = null;
$(function () {
    shopBuild = new ShopBuild();
    shopBuild.pieLoad();
    bindCommonEvents();
    findquandian();
    timer = setInterval(findquandian, 3000);


    wx_dialog('quandianConfirmDialog', {
        title : "温馨提示",
        height:200,
        width:500,
        autoOpen : false,
        close:"close_quandianConfirmDialog"
    });
//    wx_dialog('quandianConfirmDialog', {
//        title: "温馨提示",
//        autoOpen: false,
//        width: 500,
//        close: "close_quandianConfirmDialog"
//    });
});
function saveConfirm(){
//    wx_confirm({"title":"全店发布操作会替换宝贝原手机详情，请谨慎操作！","subTitle":"","callback":"save"});
    wx_dialog_show("quandianConfirmDialog");
}

function close_quandianConfirmDialog() {
    wx_dialog_close("quandianConfirmDialog");
}

function bindCommonEvents(){



    //选择发布类型
     $("div[name='nodeTypeDiv']").click(function(){
         var index = $("div[name='nodeTypeDiv']").index($(this));
         $("[name='nodeTypeDiv']").removeClass("current").eq(index).addClass("current");
         $("[name='nodeTypeLab']").addClass("checked").eq(index).removeClass("checked");
     });
    //选择创建活动条件
    $("label[class^='checkbox-fx']").click(function(){
        $(this).toggleClass("checked-fx");
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



//查询全店活动
function findquandian(){
    $.ajax({
        url:System.baseUrl +"api/v1/task/findquandian",
        async:false,
        cache: false,
        type : "GET",
        success : function(data){
            if(data&&data.success){
                quandianShow(data.result.content);
            }else{
                wx_alert("查询全店记录失败!请联系客服");
            }
        }
    });
}


function quandianShow(qdlist){
        $.each(qdlist,function(n,task) {
            var statusTd = "";
            var statusDesc = "";
            if(task.status==0||task.status==1){
                statusTd ="<td><span class='b-green'>"+(task.successCount+task.failCount)+"</span>/"+task.totalCount+"</td>";
                statusDesc ="<td>执行中……</td>";
                $("#quandianBtn").removeAttr("href").removeClass("dark-green").addClass("dark-gray-btn").html("&nbsp;&nbsp;&nbsp;全店发布进行中&nbsp;&nbsp;&nbsp;");
            }else{
                $("#quandianBtn").attr("href","javascript:saveConfirm()").removeClass("dark-gray-btn").addClass("dark-green").html("&nbsp;&nbsp;&nbsp;全店一键发布&nbsp;&nbsp;&nbsp;");
                statusDesc ="<td>已完成</td>";
                if(task.failCount > 0){
                    statusTd ="<td><a href='javascript:gotoTaskList("+task.id+",4)' class='tzs-btn btn-middle blue'>查看失败宝贝</a></td>";
                }else{
                    statusTd ="<td><a href='javascript:gotoTaskList("+task.id+")' class='tzs-btn btn-middle blue'>查看详情</a></td>";
                }

                if(timer!=null){
                    clearInterval(timer);
                    timer = null;
                }
            }
            $("#quandianList tr:gt(0)").remove();
            $("#quandianList").append("<tr>"
            +" <td height='45'>"+task.createDateTime+"</td>"
            +"<td><a class='b-green' href='javascript:gotoTaskList("+task.id+",2)' style='text-decoration:underline;'>"+task.successCount+"</a></td>"
            +"<td><a class='b-red' href='javascript:gotoTaskList("+task.id+",4)' style='text-decoration:underline;'>"+task.failCount+"</a></td>"
            +statusDesc
            +statusTd
            +"</tr>");
        });
}



function gotoTaskList(taskId,status){

    if(typeof (status) != "undefined")
        window.location.href = System.baseUrl+$("#floderCtrol").val()+"/wap/recordList?taskId="+taskId+"&status="+status;
    else
        window.location.href = System.baseUrl+$("#floderCtrol").val()+"/wap/recordList?taskId="+taskId;
}



//保存活动
function save(){
    //用户权限验证

    wx_alert("很抱歉，任务创建失败，请联系管理员！");
    return;
    close_quandianConfirmDialog();
    $("#quandianBtn").removeAttr("href").removeClass("dark-green").addClass("dark-gray-btn");
    var params = {};
    params["iids"] = "";
    params["descType"] = $("label[name='nodeTypeLab'][class='checkbox']").data("value");
    params["skip"] = $("#skip").hasClass("checked-fx")==true?false:true;
    params["filtModule"] = $("#filtModule").hasClass("checked-fx")==true?0:1;
    $.post(System.baseUrl + "api/v1/task/save",
        params,
        function (data) {
            if(data&&data.success){
                findquandian();
                timer = setInterval(findquandian, 3000);
            }else{
                if(data.message==""){
                    wx_alert("很抱歉，任务创建失败，请联系管理员！");
                }else{
                    wx_alert(data.message);
                }

            }
        }
    );
}






var ShopBuild = function(){

};

function syncWapInfo(){
    shopBuild.pieLoad(true);
}

ShopBuild.prototype = {
    pieLoad:function(flag){
        var param = {};
        if(flag==true){
            param["sync"] = flag;
            $("#pieArea").html("<div style='text-align: center;padding-top: 100px;'><span style='color: #FE8B00;font-weight: bold;'>亲，正在获取您店铺最新手机详情数据，请稍候...</span></div>");
        }

        $.ajax({
            url:System.baseUrl+'api/v1/user/wap/info',
            data:param,
            type:'GET',
            dataType:'JSON',
            cache: false,
            ifModified: true,
            success: function(data){
                if(data.result==null){
                    syncWapInfo();
                   return;

                }
                $("#pieArea").html("");
                $("#syn_date").html(data.result.updateDatetime);
                if(data.result.totalCount == 0){
                    $("#pieArea").html("<span style='background-color: antiquewhite;'>没有出售中的宝贝，请添加出售中的宝贝！</span>");
                    return true;
                }
                $('#pieArea').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: ''
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function() {
                                    return '<b style="color:#000;">'+ this.point.name +'</b>: '+Highcharts.numberFormat(this.y, 0, ',');

                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: [
                            ['已生成手机详情',  data.result.wapCount],
                            ['未生成手机详情',  data.result.unwapCount]
                        ]
                    }],
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
            }
         });
    }
}