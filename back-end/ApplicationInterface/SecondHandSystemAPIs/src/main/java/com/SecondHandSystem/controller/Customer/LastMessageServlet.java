package com.SecondHandSystem.controller.Customer;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.factory.DAOFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/customer/lastMessage")
public class LastMessageServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        setAccessControlHeaders(response);

        // 处理请求数据
        StringBuilder requestBody = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                requestBody.append(line).append('\n');
            }
        }

        // 打印接收到的数据
        System.out.println("Received data: " + requestBody.toString());

        String jsonData = requestBody.toString();
        System.out.println("Received data: " + jsonData);

        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonData);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        //传入的customerId和merchantId
        String customerId = jsonObject.optString("customerId");
        String merchantID = jsonObject.optString("merchantId");

        String[] last = new String[2];
        String lastMessage;
        String time;

        try{
            ICommunicationDAO communicationDAO = DAOFactory.getICommunicationDAOInstance();
            last = communicationDAO.searchLastMessage(merchantID,customerId);
            lastMessage = last[0];
            time = last[1];
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 设置响应类型和状态
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        JSONObject json = new JSONObject();

        JSONArray jsonArray = new JSONArray();
        for (String i : last) {
            jsonArray.put(i);
        }

        try{
            json.put("lastMessage", jsonArray);
        } catch(JSONException e) {
            throw new RuntimeException(e);
        }












    }

}
