function createDialogTag()
{
	if($('#myDialog').html()!=null)
	{
		return;
	}
	var div = document.createElement("div");
	div.setAttribute("id","myDialog");
	div.style.display="none";
	document.body.appendChild(div);
}
function initDialog(dialogInfo)
{
	createDialogTag();
	var text = dialogInfo["context"];
	var imagePath = dialogInfo["pic_url"];
	var div = $('#myDialog');
	if(imagePath)
	{
		div.append("<img src='"+imagePath+"'>");
	}
	if(text)
	{
		div.append(text);
	}
	if((imagePath==""||imagePath==null)&&(text==""||text==null))
	{
		div.html('');
	}
	$('#myDialog').dialog({
			autoOpen: false,
			title:"系统提示",
            closeOnEscape:true,
            draggable:false,
            resizable:false,
            modal:true
  });
}

function hiddenMyDialog()
{
	$('#myDialog').dialog("close");
	
}

function showMyDialog(context)
{
	var str = $('#myDialog').html();
	if(str==null||str=="")
	{
		if(context==""||context==null)
		{
			context = "<span style='margin:40px;color:blue;font-size:15px;font-weight:bold;'>系统正在处理，请稍后....</span>";
		}
		initDialog({"context":context});
	}
	$('#myDialog').dialog("open");
}