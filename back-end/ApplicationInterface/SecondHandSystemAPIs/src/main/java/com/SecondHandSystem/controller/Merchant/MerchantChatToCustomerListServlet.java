package com.SecondHandSystem.controller.Merchant;

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
import java.util.Arrays;

@WebServlet("/merchant/chatToCustomerList")
public class MerchantChatToCustomerListServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9001"); // 允许的来源，根据需要更改
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

        // 传入的merchantId
        String merchantId = jsonObject.optString("merchantId");

        String[][] content = new String[300][5];
        String[] allCustomerList = new String[5];

        try{
            int i=0;
            ICommunicationDAO communicationDAO = DAOFactory.getICommunicationDAOInstance();
            content = communicationDAO.searchByCustomerId(merchantId,"merchant");
            for(String[] c : content){
                if((Arrays.asList(allCustomerList)).contains(c[3].trim())){
                    continue;
                }
                allCustomerList[i] = c[3].trim();
                i++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        JSONArray jsonArray = new JSONArray();
        try{
            for (String customer : allCustomerList) {
                JSONObject json = new JSONObject();
                System.out.println(customer);
                if (customer == null) {
                    continue;
                }
                json.put("customerId",customer);
                //System.out.println(json);
                //将JSON对象添加到JSON数组中
                jsonArray.put(json);
            }
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
