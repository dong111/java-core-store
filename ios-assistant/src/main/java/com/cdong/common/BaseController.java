package com.cdong.common;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * 默认所有控制器的基类
 */
@Controller
public abstract class BaseController {

    protected static Logger logger = LoggerFactory.getLogger(BaseController.class);

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpSession session;

    @Autowired
    private ServletContext application;

    private Date time;

    protected ServletContext getApplication() {
        return application;
    }

    protected HttpSession getSession() {
        return session;
    }

    protected HttpServletRequest getRequest() {
        return request;
    }

    protected Object getRequestAttribute(String attrName) {
        return this.getRequest().getAttribute(attrName);
    }

    protected void setRequestAttribute(String attrName, Object value) {
        this.getRequest().setAttribute(attrName, value);
    }

    protected String getRequestParameter(String attrName) {
        return this.getRequest().getParameter(attrName);
    }

    protected void RemoveRequestAttribute(String attrName) {
        this.getRequest().removeAttribute(attrName);
    }

    public Object getSessionAttribute(String attrName) {
        return this.getSession().getAttribute(attrName);
    }

    public void setSessionAttribute(String attrName, Object value) {
        this.getSession().setAttribute(attrName, value);
    }

    public void RemoveSessionAttribute(String attrName) {
        this.getSession().removeAttribute(attrName);
    }

    protected Object getApplicationAttribute(String attrName) {
        return this.getApplication().getAttribute(attrName);
    }

    protected void setApplicationAttribute(String attrName, Object value) {
        this.getApplication().setAttribute(attrName, value);
    }

    protected void RemoveApplicationAttribute(String attrName) {
        this.getApplication().removeAttribute(attrName);
    }





}
