package com.SecondHandSystem.controller.Merchant;

import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/merchant/updateInformation")
public class MerchantUpdateInformationServlet extends HttpServlet {
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

        // 传入的merchantId,nickname,password,level,number,time,image
        String merchantId = jsonObject.optString("merchantId");
        String nickname = jsonObject.optString("nickname");
        String password = jsonObject.optString("password");
        String level = jsonObject.optString("level");
        int number = Integer.parseInt(jsonObject.optString("number"));
        int time = Integer.parseInt(jsonObject.optString("time"));
        String image = jsonObject.optString("image");
        System.out.println(merchantId);

        String rs = null;

        try{
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            rs = merchantDAO.updateMerchant(merchantId,nickname,password,level,number,time,image);
            System.out.println(rs);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try{
            JSONObject json = new JSONObject();
            json.put("result",rs);
            // 将JSON对象转换为字符串
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
