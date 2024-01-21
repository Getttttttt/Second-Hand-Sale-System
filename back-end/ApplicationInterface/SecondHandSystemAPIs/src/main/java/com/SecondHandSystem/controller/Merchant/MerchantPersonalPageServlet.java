package com.SecondHandSystem.controller.Merchant;

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
import java.util.List;

@WebServlet("/merchant/personalPage")
public class MerchantPersonalPageServlet extends HttpServlet {

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

        // 传入的customerId
        String merchantId = jsonObject.optString("merchantId");
        System.out.println(merchantId);
        Merchant merchant = new Merchant();
        try{
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            List<Merchant> m = merchantDAO.searchByIdMerchant(merchantId);
            merchant = m.get(0);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(merchant.getNickname());
        try{
            JSONArray jsonArray = new JSONArray();
            JSONObject json = new JSONObject();
            json.put("merchantId",merchantId.trim());
            json.put("nickname",merchant.getNickname().trim());
            json.put("password",merchant.getPassword().trim());
            json.put("number", merchant.getNumOfBooksOnsale());
            json.put("level",merchant.getTrustLevel().trim());
            json.put("time",merchant.getLength());
            json.put("avatarImage",merchant.getPicUrl().trim());
            System.out.println("地址 "+merchant.getLength());
            // 将JSON数组转换为字符串
            String jsonString = json.toString();
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
