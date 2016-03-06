package com.cdong.controller;

import com.cdong.common.BaseController;
import com.cdong.entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chendong on 16/3/6.
 */
@RequestMapping(value = "api/v1/ios",produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
public class JsonDataContoller extends BaseController {

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    @ResponseBody
    public String iosJsonData(){
        List<User> users = buildUsers();
        JSONArray jsonArray = JSONArray.fromObject(users);


        return jsonArray.toString();
    }




    public List<User> buildUsers(){

        List<User> users = new ArrayList<>();

        for (int i=0;i<10;i++){
            User user = new User();
            user.setName("name"+i);
            user.setAge(i);
            users.add(user);
        }

        return users;
    }


}
