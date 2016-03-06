function showDialogAndMessage(msg,width,height){
	var item_code=$("#charge_item_code").val();
	var version_name = $("#versionName").val();
	var version_id = $("#versionId").val();
	pop_insufficient_permission_dialog('',version_id,'',item_code,"温馨提示","<span style='font-size:12px;color:#008B45'>亲！您当前使用的是"+formatStr(version_name)+"，"+msg+"</span>",width,height);
}

function formatStr(str)
{
	return "<span style='font-size:15px;font-weight:bold;color:#CD3700'>"+str+"</span>";
}
//校验是否可以使用橱窗白名单
function checkCanUseMustRecommend()
{
	return checkCanUseRecommend("橱窗白名单",2);
}
//校验是否可以使用橱窗黑名单
function checkCanUseNoNeedRecommend()
{
	return checkCanUseRecommend("橱窗黑名单",2);
}
//str：更能名称 lev：该功能最低使用的用户级别
function checkCanUseRecommend(str,lev)
{
	var version_id = parseInt($("#versionId").val());
	if(version_id<lev)
	{
		showDialogAndMessage("不能使用"+formatStr(str)+"，如需使用，请升级为高级版！",300,200);
		return false;
	}
	return true;
}

//校验是否可以使用高级设置
function checkCanUseAdvancedSet()
{
	return checkCanUseRecommend("高级设置",3);
}

function checkUserOpenSwitch(){
	return checkCanUseRecommend("开启自动橱窗开关",1);
}

