package com.SecondHandSystem.controller.BookBucket;

import com.SecondHandSystem.dao.ICustomerDAO;
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

@WebServlet("/BookBacket/deleteBook")
public class DeleteBookServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response); // 设置跨域访问控制头部
        // 从请求参数中获取评价数据
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

        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonData);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        String customerID = jsonObject.optString("customerID");
        String bookID= jsonObject.optString("bookID");
        ICustomerDAO customerDAOProxy = null;
        try {
            customerDAOProxy = DAOFactory.getICustomerDAOInstance();
            boolean result = customerDAOProxy.deleteBookBucket(customerID,bookID);
            String jsonString;
            if(result==true){
                jsonString="success";
            }
            else{
                jsonString="fail";
            }
            System.out.println(result);

            JSONObject json = new JSONObject();

            try {
                json.put("message", jsonString);
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(json.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}