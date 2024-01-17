package com.SecondHandSystem.controller.Customer;

import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.dao.proxy.CustomerDAOProxy;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Customer;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.util.Objects;

@WebServlet("/customer/signUpNewUser")
public class CustomerSignUpServlet extends HttpServlet {


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

        // analysis variable
        String telephone = jsonObject.optString("telephone"); // 使用 optString 避免 JSONException
        String password = jsonObject.optString("password");
        String nickname = jsonObject.optString("nickname");
        String address = jsonObject.optString("address");

        String returnMessage;

        try {
            ICustomerDAO cuatomerDAO = DAOFactory.getICustomerDAOInstance();
            if (Objects.equals(password, "")) throw new Exception();
            if (Objects.equals(telephone, "")) throw new Exception();
            if (Objects.equals(nickname, "")) throw new Exception();
            cuatomerDAO.insertCustomer(telephone,nickname,password,telephone,address,"");
            returnMessage = "Insert Successful";
        } catch (Exception e) {
            returnMessage = "Insert failure: "+e.toString();
        }

        // 设置响应类型和状态
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        JSONObject json = new JSONObject();

        try {
            json.put("message", returnMessage);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        response.getWriter().write(json.toString());

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
