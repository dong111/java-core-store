<%@ page language="java" pageEncoding="UTF-8" %>
<div class="center clearfix">
    <div class="copyRight">
        <div class="foot_logo"></div>
        <ul>
            <li>
                Copyright © 2010 - 2012 YITAOSOFT. All Rights Reserved.
            </li>
            <li>
                易淘软件科技有限公司&nbsp; 版权所有 浙ICP备11061471号-2
            </li>
        </ul>
    </div>
</div>
<input type="hidden" id="versionId" value="1"/>
<input type="hidden" id="versionName"
       value="${sessionScope.SESSION_USER_SUBSCRIBE.msg}"/>
<input type="hidden" id="charge_item_code"
       value="${sessionScope.SESSION_USER_DATA.ITEM_CODE}"/>
<script type="text/javascript">
    // <![CDATA[
    initHeader("doctor", {
        nav_current: "基础工具",
        son_nav_current: "属性检测"
    });
    function bookmark() {
        var title = document.title
        var url = document.location.href
        if (window.sidebar)
            window.sidebar.addPanel(title, url, "");
        else if (window.opera && window.print) {
            var mbm = document.createElement('a');
            mbm.setAttribute('rel', 'sidebar');
            mbm.setAttribute('href', url);
            mbm.setAttribute('title', title);
            mbm.click();
        } else if (document.all)
            window.external.AddFavorite(url, title);
    }
    // ]]>
</script>
