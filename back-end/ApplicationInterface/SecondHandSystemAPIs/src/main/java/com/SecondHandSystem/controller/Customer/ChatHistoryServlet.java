package com.SecondHandSystem.controller.Customer;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Customer;
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
import java.util.Date;
import java.util.List;

@WebServlet("/customer/chatHistory")
public class ChatHistoryServlet extends HttpServlet {
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

        //传入的customerId和merchantId
        String customerId = jsonObject.optString("customerId");
        String merchantId = jsonObject.optString("merchantId");

        String[][] chatHistory = new String[300][8];
        String[][] communication = new String[300][5];
        List<Customer> C = new ArrayList<>();
        List<Merchant> M = new ArrayList<>();
        String imageM = null;
        String nicknameM = null;
        String imageC = null;
        String nicknameC = null;
        String time = null;
        String message = null;
        String from = null;

        int i = 0;
        try {
            System.out.println(1111111);
            ICommunicationDAO communicationDAO = DAOFactory.getICommunicationDAOInstance();
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            ICustomerDAO customerDAO = DAOFactory.getICustomerDAOInstance();
            communication = communicationDAO.searchCommunication(merchantId, customerId);
            M = merchantDAO.searchByIdMerchant(merchantId);
            C = customerDAO.searchByIdCustomer(customerId);
            for(Merchant m: M){
                imageM = m.getPicUrl();
                nicknameM = m.getNickname();
            }
            for(Customer c: C){
                imageC = c.getPicUrl();
                nicknameC = c.getNickname();
            }
            for(String[] c : communication) {
                if(c[4]!=null){
                    time = c[0];
                    message = c[1];
                    from = c[2];
                    chatHistory[i][0] = merchantId;
                    chatHistory[i][1] = nicknameM;
                    chatHistory[i][2] = customerId;
                    chatHistory[i][3] = nicknameC;
                    chatHistory[i][4] = message;
                    chatHistory[i][5] = from;
                    chatHistory[i][6] = imageM;
                    chatHistory[i][7] = imageC;
                    i++;
                }
            }
            System.out.println(i);
        } catch (Exception e) {
            e.printStackTrace();
        }


        try {
            JSONArray jsonArray = new JSONArray();
            int j = 0;
            for (String[] ch : chatHistory) {
                if(ch[0]!=null && j<i) {
                    JSONObject json = new JSONObject();
                    json.put("merchantId",ch[0].trim());
                    json.put("nicknameM",ch[1].trim());
                    json.put("customerId",ch[2].trim());
                    json.put("nicknameC",ch[3].trim());
                    json.put("message",ch[4].trim());
                    json.put("from",ch[5].trim());
                    json.put("imageM",ch[6].trim());
                    json.put("imageC",ch[7].trim());
                    jsonArray.put(json);
                    j++;
                }
                else{
                    break;
                }
            }
            System.out.println("out the for block");
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();
            System.out.println(jsonString);

            // 设置响应类型和状态
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonString);

        } catch (JSONException e) {
            e.printStackTrace();
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
