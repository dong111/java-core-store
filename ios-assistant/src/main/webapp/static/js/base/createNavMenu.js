function getNavHtml(menuContent)
{
	var nav_content = menuContent.nav;
	var nav_class = menuContent.class_name.nav_class_name;
	
	var nav_html = "<ul class='"+nav_class+"' id='ul_nav'>";
	$.each(nav_content,function(index,value){
		nav_html = nav_html +"<li title='"+value.name+"' id='"+index+"'><a href="+value.url+">"+value.name+"</a></li>";
	});
	return nav_html+"</ul>";
}

function initSonNav(menuContent)
{
	var nav_crrent = "son_"+$("#ul_nav>li[class='current']").attr("id");
	var son_nav_content = menuContent.son_nav[nav_crrent];
	var son_nav_class = menuContent.class_name.son_nav_class_name;
	var son_nav_html = "<ul id='ul_son_nav' class='"+son_nav_class+"'>";
	$.each(son_nav_content,function(indx,value){
		son_nav_html = son_nav_html + "<li title='"+value.name+"'><a href='"+value.url+"'>"+value.name+"</a></li><li class='son_nav_FG'></li>";
	});
	son_nav_html = son_nav_html + "</ul>";
	return son_nav_html;
}

function getNavLinkHtml(menuContent)
{
		var nav_link_content = 	menuContent.nav_link;
		var nav_link_class_name = 	menuContent.class_name.nav_link_class_name;
		
		var nav_link_html = "<ul class='"+nav_link_class_name+"'>";
		$.each(nav_link_content,function(index,value){
			nav_link_html = nav_link_html + "<li class='"+value.class_name+"'><a href='"+value.url+"'>"+value.name+"</a></li>";
		});
		return nav_link_html+"</ul>";
}

function initMenu(current)
{
	var menuContent = {
		nav:{
			nav_0:{name:"首页",url:"index.jsp"},
			nav_1:{name:"自动橱窗",url:"auto.jsp"},
			nav_2:{name:"自动评价",url:"auto.jsp"}
		},
		son_nav:{
			son_nav_0:{
				son_nav_0_0:{name:"自动评价开关",url:"open.jsp"},
				son_nav_0_1:{name:"配置自动评价",url:"config.jsp"}
			},
			son_nav_1:{
				son_nav_1_0:{name:"自动橱窗",url:"nav.jsp"},
				son_nav_1_1:{name:"配置自动橱窗",url:"navTest.jsp"}
			}
		},
		nav_link:{
			link_0:{name:"淘帮派",url:"",class_name:"nav_link_BPai"},
			link_1:{name:"帮助中心",url:"",class_name:"nav_link_help"}
		},
		class_name:{
			nav_class_name:"nav",
			son_nav_class_name:"son_nav",
			nav_link_class_name:"nav_link"
		}
	};
	var menu_html = getNavHtml(menuContent)+getNavLinkHtml(menuContent);
	$('#div_menu').html(menu_html);
	setNavCurrent(current);
	//$('#div_menu').append(initSonNav(menuContent));
	//setSonNavCurrent(current);
}

function setNavCurrent(current)
{
	var nav_current_name = current.nav_current;
	$('#ul_nav>li[title="'+nav_current_name+'"]').attr("class","current");
}

function setSonNavCurrent(current)
{
	var nav_current_name = current.son_nav_current;
	$('#ul_son_nav>li[title="'+nav_current_name+'"]').attr("class","current");
}