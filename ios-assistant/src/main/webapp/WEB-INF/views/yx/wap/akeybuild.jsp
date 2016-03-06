<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("basePath",basePath);
//    String portalPath = "http://yinliu.zhushou001.com/";
%>
<html>
<head>
    <link href="<%=basePath%>/static/css/wap.css" rel="stylesheet" type="text/css" />
   <script type="text/javascript" src="<%=basePath%>/static/js/wap/akeybuild.js"></script>
</head>

<body>
<div class="right index_right">
    <div class="right_title"></div>
    <div id="yes" style="display:block; padding-top:70px; border:1px solid #FFF;">
        <div class="winxintips_phone" style="width:730px; margin:auto;">
            <h3>温馨提示</h3>
            <ol>
                <li>1.根据您店铺的宝贝数量，生成手机详情的时间在<span style="color:red;font-size: 12px;">几分钟~几小时不等</span>，您可以关闭本窗口或浏览器，这不会影响到生成手机详情。
                    <span style="color:red;font-size: 12px;">强烈建议在生成手机详情前,请先在淘宝助理中选择所有出售中的宝贝导出csv文件作为备份！</span>
                </li>
                <li>2.在生成手机详情文件的过程中，系统会在图片空间中生成一个名为<span style="color:red;font-size: 12px;">
                ”淘助手手机详情请勿删除“</span>的文件，
                    <span style="color:red;font-size: 12px;"> 所有的手机图片都保存在此文件夹中，切勿删除！</span>
                </li>
                <li>3.<span style="color:red;font-size: 12px;">若想删除宝贝的手机详情</span>，可以将未生成手机详情前备份过的csv文件重新导入到淘宝助理并上传即可！
                </li>
            </ol>
        </div>



        <section class="spacing ks-clear">
            <input type="hidden" value="1" id="J_IsRate">

            <div class="prompt" style="display:none;/* float:none; */width:630px;margin-left: 32px;">
                <em>注意：</em><br>
                <ul>
                    <li><span>开启（保存设置）后将在20分钟内生效！</span></li>
                    <li><span>默认不评价黑名单中的用户，黑名单用户<a target="_blank" href="http://tbgr.huanleguang.com/setting/black/index/?zid=160856&amp;type_id=3" style="padding:0 3px;font-weight:bold;">0</a>人</span></li>
                    <li><a style="font-size: 12px;" target="_blank" href="http://bangpai.taobao.com/group/thread/609027-275262844.htm?spm=0.0.0.0.VkOXXo">两种评价方式的差异</a></li>
                </ul>
            </div>
            <ul class="ui-about-list">
            <li>
                <div class="ui-side-list" style="width:15px;">&nbsp;</div>
                <div class="ui-side-list" style="width:200px ">
                    <input type="checkbox" checked="checked" id="skip" name="skip" value="false"/>
                    <span id="shipSpan" name="skipSpan">跳过已有手机详情的宝贝</span>
                </div>
                <div class="ui-side-list" style="margin-left:2px;width:10px;">&nbsp;</div>
                <div class="ui-side-list">
                    <button class="button button-blue" onclick="javascript:save()">一键生成</button>
                </div>
                <div class="ui-side-list" style="margin-left:2px;width:10px;">&nbsp;</div>
                <div class="ui-side-list">
                    <a href="javascript:advCtrol()">高级设置</a>
                </div>
            </li>

            <div id="advanDiv" name="advanDiv" style="display: none">
            <li style="margin-left: 32px;margin-top: 20px;">
                <div class="ui-side-list">生成的内容：</div>
                <div id="chklist1" class="phone_radio">
                    <div style="float: left;">
                        <label class="akeyCheckbox" name="descType" value="0">手机图片和文字</label>
                    </div>
                    <div  style="float: left;margin-left: 6px;">
                        <label class="akeyCheckbox checked" name="descType" value="1">手机图片</label>
                        <label class="akeyCheckbox checked" name="descType" value="2">手机文字</label>
                    </div>
                </div>
            </li>
                <li style="margin-left: 32px;margin-top: 20px;">
                    <div class="ui-side-list">生成的范围：</div>
                    <div style="float: left;line-height: 36px;font-size: 14px;text-align: right;">
                        <select id="actStatus" name="actStatus">
                            <option value="onsale">出售中</option>
                            <option value="instock">仓库中</option>
                        </select>
                    </div>

                </li>
            </div>
                <li>&nbsp;</li>
                <li>&nbsp;</li>
            </ul>
        </section>


        <div class="rate-cont">
            <div class="rate-cont-2">
                <b>一键生成手机详情的步骤:</b>
                <ul>
                    <li><em></em><div class="fl pl5">1.在当前页制作手机详情，“一键生成”后进入到手机详情生成记录列表中进行下载</div></li>
                    <li><em></em><div class="fl pl5">2.下载淘宝助理（5.5版本以上），下载地址：
                    <a href="http://zhuli.taobao.com/" target="_blank">http://zhuli.taobao.com/</a></div></li>
                    <li><em></em><div class="fl pl5">3.将在步骤1中下载的数据包导入到淘宝助理出售中的宝贝并上传!</div></li>
                </ul>
            </div>
        </div>

    </div>
</div>
<div id="version_dialog_divs">
 <div id="insufficient_permission_dialog_div"></div>
 <div id="continue_subsc_dialog_div"></div>
 <div id="update_version"></div>
</div>
<input type="hidden" id="left_nav_current_id" value="left_nav_1_1">
<div id="dialog" style="display: none">
    <div id="dialog_context"></div>
</div>
<input type="hidden" id="hd_frist_use" value="false">
<input type="hidden" id="defalut_config" value="false">
</body>
</html>