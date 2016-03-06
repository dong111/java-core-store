<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<div id="header">
    <div class="top">
        <div class="topnav">
            <div style="float: right;">
                <a style="color: black;" href="javascript:bookmark();">收藏</a>
            </div>
            <div style="float: right; margin-right: 5px; width: 20px;">
                <img src="http://zhushou001.com/images/shoucang.png"
                     style="width: 15px; height: 15px; margin-top: 2px;"/>
            </div>
            <div class="new"
                 style="float: right; height: 15px; text-align: right;">
                <marquee direction="up" onmouseover=this.stop(); Height="15"
                         onmouseout=this.start(); Scrollamount="1">
                    <p style="text-align: right;">
                        <strong>公告</strong>：最新版父亲节海报上线啦,最新版父亲节海报上线啦
                        <img src="http://zhushou001.com/images/hot.png" width="21" height="9"/>
                    </p>

                    <p style="text-align: right;">
                        <strong>公告</strong>：最新版父亲节海报上线啦,最新版父亲节海报上线啦
                        <img src="http://zhushou001.com/images/hot.png" width="21" height="9"/>
                    </p>

                    <p style="text-align: right;">
                        <strong>公告</strong>：最新版父亲节海报上线啦,最新版父亲节海报上线啦
                        <img src="http://zhushou001.com/images/hot.png" width="21" height="9"/>
                    </p>
                </marquee>
            </div>
        </div>
    </div>
    <div class="nav">
        <span><a href="#">首页</a> </span>
        <span><a href="#a"> 产品专区</a> </span>
        <span><a href="#b">专题推荐</a> </span>
        <span><a href="#friendship">帮助中心</a> </span>
    </div>
</div>
