package com.SecondHandSystem.controller.Customer;

import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Order;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/customer/orderList")
public class CustomerOrdersServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);

        // 获取用户ID参数
        String customerID = request.getParameter("customerID");
        System.out.println(customerID);
        try {
            IOrderDAO orderDAOProxy = DAOFactory.getIOrderDAOInstance();
            ArrayList<Order> orderList = orderDAOProxy.selectByCustomer(customerID);
            JSONArray jsonArray = new JSONArray();
            for (Order order : orderList) {
                // 创建JSON对象
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("MainData", order.getOrderID());
                jsonObject.put("bookID", order.getBookID());
                jsonObject.put("merchantNumber", order.getMerchantID());
                jsonObject.put("bookName", order.getBookName());
                jsonObject.put("orderPrice", order.getTradingPrice());
                jsonObject.put("orderNum", order.getTradingNum());
                jsonObject.put("orderStatus", order.getTradingStatus());
                jsonObject.put("orderTime", order.getTradingTime());
                jsonObject.put("bookSurfacePic", order.getBookSurfacePic());
                jsonObject.put("bookAuthor", order.getBookAuthor());
                jsonObject.put("bookISBN", order.getBookISBN());
                jsonObject.put("bookPublisher", order.getBookPublisher());
                jsonObject.put("bookPublishTime", order.getBookPublishTime());
                jsonObject.put("bookdegree", order.getBookdegree());
                jsonObject.put("bookLabels", new JSONArray(order.getBookLabels()));
                jsonObject.put("bookImages", new JSONArray(order.getBookImages()));
                jsonObject.put("estimationScale", order.getEstimationScale());
                jsonObject.put("evaluation", order.getEvaluation());
                // 将JSON对象添加到JSON数组中
                jsonArray.put(jsonObject);
            }
            System.out.println(jsonArray);
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();

            System.out.println(jsonString);


            // 设置响应内容类型和编码
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // 返回响应结果
            response.getWriter().write(jsonString);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
