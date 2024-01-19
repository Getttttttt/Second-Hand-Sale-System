package com.SecondHandSystem.controller.Customer;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Merchant;
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
import java.util.ArrayList;
import java.util.List;

@WebServlet("/customer/lastMessage")
public class CustomerLastMessageServlet extends HttpServlet {
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
        List<Merchant> M = new ArrayList<>();
        String lastMessage = null;
        String time = null;
        String imageM = null;
        String nicknameM = null;

        try{
            ICommunicationDAO communicationDAO = DAOFactory.getICommunicationDAOInstance();
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            last = communicationDAO.searchLastMessage(merchantID,customerId);
            M = merchantDAO.searchByIdMerchant(merchantID);
            lastMessage = last[0];
            time = last[1];
            for(Merchant m: M){
                imageM = m.getPicUrl();
                nicknameM = m.getNickname();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        try{
            JSONObject json = new JSONObject();
            JSONArray jsonArray = new JSONArray();
            json.put("lastMessage",lastMessage);
            json.put("time",time.substring(0,19));
            json.put("imageM",imageM);
            json.put("nicknameM",nicknameM);
            jsonArray.put(json);
            System.out.println(jsonArray);
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();
            System.out.println(jsonString);
            // 设置响应类型和状态
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonString);

        } catch(JSONException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);

        // 设置响应类型和状态
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Hello World");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
